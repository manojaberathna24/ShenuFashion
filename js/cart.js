// ============================================================
// SHENU FASHION STORE — Cart Module
// Cart state management with localStorage + Firestore sync
// ============================================================

import { db, auth } from './firebase-config.js';
import {
  doc, setDoc, getDoc, onSnapshot, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const CART_KEY = 'shenu_cart';

// ============================================================
// LOCAL CART OPERATIONS
// ============================================================

/** Get cart from localStorage */
export function getLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

/** Save cart to localStorage and dispatch event */
export function saveLocalCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
}

/** Add item to cart */
window.addToCart = function(productId, quantity = 1, size = null, color = null) { return addToCart(productId, quantity, size, color); };
export function addToCart(productId, quantity = 1, size = null, color = null) {
  const cart = getLocalCart();
  const existingIdx = cart.findIndex(
    i => i.productId === productId && (i.size || null) === (size || null) && (i.color || null) === (color || null)
  );

  if (existingIdx > -1) {
    cart[existingIdx].quantity = (cart[existingIdx].quantity || 1) + quantity;
  } else {
    cart.push({ productId, quantity, size, color, addedAt: Date.now() });
  }

  saveLocalCart(cart);

  // Sync to Firestore if logged in
  syncCartToFirestore();

  return cart;
}

/** Remove item from cart */
export function removeFromCart(productId, size = null, color = null) {
  const cart = getLocalCart().filter(
    i => !(i.productId === productId && (i.size || null) === (size || null) && (i.color || null) === (color || null))
  );
  saveLocalCart(cart);
  syncCartToFirestore();
  return cart;
}

/** Update item quantity */
export function updateQuantity(productId, quantity, size = null, color = null) {
  const cart = getLocalCart();
  const item = cart.find(
    i => i.productId === productId && (i.size || null) === (size || null) && (i.color || null) === (color || null)
  );
  if (item) {
    if (quantity <= 0) return removeFromCart(productId, size, color);
    item.quantity = quantity;
    saveLocalCart(cart);
    syncCartToFirestore();
  }
  return cart;
}

/** Clear entire cart */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cart-updated'));
  syncCartToFirestore(true);
}

/** Get cart item count */
export function getCartCount() {
  return getLocalCart().reduce((sum, i) => sum + (i.quantity || 1), 0);
}

/** Get cart total (requires product prices) */
export function getCartTotal(cartWithProducts) {
  return cartWithProducts.reduce((sum, item) => {
    const price = item.product?.salePrice || item.product?.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);
}

// ============================================================
// FIRESTORE CART SYNC
// ============================================================

/** Sync local cart to Firestore (for logged in users) */
async function syncCartToFirestore(clear = false) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const cartRef = doc(db, 'cart', user.uid);
    await setDoc(cartRef, {
      items: clear ? [] : getLocalCart(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.warn('Cart sync failed:', error);
  }
}

/** Load cart from Firestore (called on login) */
export async function loadCartFromFirestore() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const snap = await getDoc(doc(db, 'cart', user.uid));
    if (snap.exists()) {
      const serverCart = snap.data().items || [];
      const localCart  = getLocalCart();

      // Merge: combine local and server carts (local takes priority for same items)
      const merged = [...serverCart];
      localCart.forEach(localItem => {
        const exists = merged.find(
          i => i.productId === localItem.productId &&
               i.size === localItem.size &&
               i.color === localItem.color
        );
        if (!exists) merged.push(localItem);
        else exists.quantity = Math.max(exists.quantity, localItem.quantity);
      });

      saveLocalCart(merged);
    }
  } catch (error) {
    console.warn('Failed to load cart from Firestore:', error);
  }
}

// Listen for auth state to sync cart
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadCartFromFirestore();
  }
});

// ============================================================
// WISHLIST OPERATIONS
// ============================================================

/** Toggle wishlist item (stored in user doc in Firestore) */
export async function toggleWishlist(productId) {
  const user = auth.currentUser;
  if (!user) {
    showToast('Please sign in to add items to your wishlist.', 'warning');
    return false;
  }

  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    const wishlist = snap.data()?.wishlist || [];
    const isInList = wishlist.includes(productId);

    const newWishlist = isInList
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId];

    await updateDoc(userRef, { wishlist: newWishlist });

    if (isInList) {
      showToast('Removed from wishlist', 'info', 'Wishlist');
    } else {
      showToast('Added to wishlist! ❤️', 'success', 'Wishlist');
    }

    return !isInList; // returns new state (true = now in wishlist)
  } catch (error) {
    showToast('Failed to update wishlist.', 'error');
    return false;
  }
}

/** Get user wishlist */
export async function getWishlist() {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    return snap.data()?.wishlist || [];
  } catch {
    return [];
  }
}

/** Check if product is in wishlist */
export async function isInWishlist(productId) {
  const wishlist = await getWishlist();
  return wishlist.includes(productId);
}

// ============================================================
// CART UI HELPERS (used in cart.html)
// ============================================================

/** Build cart item card HTML */
export function renderCartItem(item, product) {
  const price = product.salePrice || product.price;
  const subtotal = price * (item.quantity || 1);

  return `
    <div class="cart-item" data-product-id="${item.productId}" data-size="${item.size || ''}" data-color="${item.color || ''}">
      <div class="cart-item-image" style="background:var(--color-surface-2); display:flex; align-items:center; justify-content:center; border-radius:var(--radius-lg);">
        ${product.images?.[0]
          ? `<img src="${product.images[0]}" alt="${product.name}" class="cart-item-image" style="width:100px;height:130px;object-fit:cover;border-radius:var(--radius-lg);" />`
          : `<i data-lucide="image" width="32" height="32" style="color:var(--color-text-faint);"></i>`
        }
      </div>
      <div class="cart-item-body">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-meta">
          ${item.size  ? `Size: <strong>${item.size}</strong>  ` : ''}
          ${item.color ? `Color: <strong>${item.color}</strong>` : ''}
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:12px; flex-wrap:wrap;">
          <!-- Quantity Control -->
          <div class="quantity-control">
            <button class="qty-btn" onclick="changeQty('${item.productId}', ${(item.quantity || 1) - 1}, '${item.size || ''}', '${item.color || ''}')">−</button>
            <span class="qty-value">${item.quantity || 1}</span>
            <button class="qty-btn" onclick="changeQty('${item.productId}', ${(item.quantity || 1) + 1}, '${item.size || ''}', '${item.color || ''}')">+</button>
          </div>
          <!-- Price -->
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-family:var(--font-heading); font-size:var(--text-lg); font-weight:700; color:var(--color-gold);">${window.formatCurrency(subtotal)}</span>
            <button style="background:none; border:none; color:var(--color-text-faint); cursor:pointer; transition:color var(--transition-base);" title="Remove"
              onmouseover="this.style.color='var(--color-error)'" onmouseout="this.style.color='var(--color-text-faint)'"
              onclick="removeCartItem('${item.productId}', '${item.size || ''}', '${item.color || ''}')">
              <i data-lucide="trash-2" width="16" height="16"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
