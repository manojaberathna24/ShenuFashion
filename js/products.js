// ============================================================
// SHENU FASHION STORE — Products Module
// Fetch, filter, search products from Firestore
// ============================================================

import { db } from './firebase-config.js';
import {
  collection, query, where, orderBy, limit, getDocs,
  doc, getDoc, startAfter, documentId
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const PRODUCTS_PER_PAGE = 12;
let lastDoc = null;
let isLoading = false;

// ============================================================
// GET ALL PRODUCTS (with filters)
// ============================================================
let allProductsCache = null;

export async function getProducts({
  category = null,
  search = null,
  minPrice = null,
  maxPrice = null,
  sizes = [],
  colors = [],
  sortBy = 'createdAt',
  sortDir = 'desc',
  isNew = false,
  onSale = false,
  pageSize = PRODUCTS_PER_PAGE,
  afterDoc = null,
} = {}) {
  try {
    if (!allProductsCache) {
      const q = query(collection(db, 'products'));
      const snap = await getDocs(q);
      allProductsCache = snap.docs.map(d => ({ id: d.id, ...d.data(), _doc: d }));
    }

    let products = [...allProductsCache];

    // Filters
    if (category) products = products.filter(p => p.category === category);
    if (isNew) products = products.filter(p => p.isNew);
    if (onSale) products = products.filter(p => p.onSale);
    if (minPrice !== null) products = products.filter(p => p.price >= minPrice);
    if (maxPrice !== null) products = products.filter(p => p.price <= maxPrice);
    if (sizes.length > 0) products = products.filter(p => p.sizes?.some(s => sizes.includes(s)));
    if (colors.length > 0) products = products.filter(p => p.colors?.some(c => colors.includes(c)));

    // Search
    if (search) {
      const term = search.toLowerCase();
      products = products.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.tags?.some(t => t.toLowerCase().includes(term)) ||
        p.category?.toLowerCase().includes(term)
      );
    }

    // Sort
    if (sortBy === 'price') {
      products.sort((a, b) => sortDir === 'asc' ? a.price - b.price : b.price - a.price);
    } else {
      products.sort((a, b) => {
        const t1 = a.createdAt?.seconds || 0;
        const t2 = b.createdAt?.seconds || 0;
        return sortDir === 'asc' ? t1 - t2 : t2 - t1;
      });
    }

    // Pagination
    let startIndex = 0;
    if (afterDoc) {
      const idx = products.findIndex(p => p.id === afterDoc.id);
      if (idx !== -1) startIndex = idx + 1;
    }

    const paginated = products.slice(startIndex, startIndex + pageSize);
    const newLastDoc = paginated.length > 0 ? paginated[paginated.length - 1] : null;

    return { products: paginated, lastDoc: newLastDoc, hasMore: startIndex + pageSize < products.length };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], lastDoc: null, hasMore: false };
  }
}


// ============================================================
// GET SINGLE PRODUCT
// ============================================================
export async function getProduct(productId) {
  try {
    const snap = await getDoc(doc(db, 'products', productId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ============================================================
// GET MULTIPLE PRODUCTS BY IDS (for cart/wishlist)
// ============================================================
export async function getProductsByIds(ids) {
  if (!ids || ids.length === 0) return [];
  try {
    // Firestore 'in' query supports up to 30 items
    const chunks = [];
    for (let i = 0; i < ids.length; i += 30) chunks.push(ids.slice(i, i + 30));

    const allProducts = [];
    for (const chunk of chunks) {
      const q = query(collection(db, 'products'), where(documentId(), 'in', chunk));
      const snap = await getDocs(q);
      snap.forEach(d => allProducts.push({ id: d.id, ...d.data() }));
    }
    return allProducts;
  } catch {
    return [];
  }
}

// ============================================================
// GET RELATED PRODUCTS (by category/tags)
// ============================================================
export async function getRelatedProducts(product, limitCount = 4) {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', product.category),
      orderBy('rating', 'desc'),
      limit(limitCount + 1)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(p => p.id !== product.id)
      .slice(0, limitCount);
  } catch {
    return [];
  }
}

// ============================================================
// GET PRODUCT REVIEWS
// ============================================================
export async function getProductReviews(productId, limitCount = 10) {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

// ============================================================
// GET CATEGORIES
// ============================================================
export async function getCategories() {
  try {
    const snap = await getDocs(collection(db, 'categories'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

// ============================================================
// PRODUCT CARD HTML RENDERER
// ============================================================
export function renderProductCard(product) {
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  return `
    <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'" data-product-id="${product.id}">
      <div class="product-card-image">
        ${product.images?.[0]
          ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy" />`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--color-surface-2);">
               <i data-lucide="image" width="40" height="40" style="color:var(--color-text-faint);"></i>
             </div>`
        }
        <div class="product-card-badges">
          ${product.isNew   ? '<span class="badge badge-gold">New</span>'          : ''}
          ${product.onSale  ? '<span class="badge badge-accent">Sale</span>'        : ''}
          ${discount > 0    ? `<span class="badge badge-accent">-${discount}%</span>` : ''}
        </div>
        ${product.stock === 0
          ? '<div style="position:absolute;inset:0;background:rgba(15,15,26,0.7);display:flex;align-items:center;justify-content:center;"><span class="badge badge-accent">Out of Stock</span></div>'
          : ''
        }
        <div class="product-card-actions">
          <button class="product-action-btn wishlist-btn" data-id="${product.id}" title="Add to Wishlist"
            onclick="event.stopPropagation(); wishlistAction('${product.id}', this)">
            <i data-lucide="heart" width="16" height="16"></i>
          </button>
          <button class="product-action-btn" title="Quick View"
            onclick="event.stopPropagation(); openQuickView('${product.id}')">
            <i data-lucide="eye" width="16" height="16"></i>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category || 'Fashion'}</div>
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-rating">
          ${window.renderStars(product.rating || 0)}
          <span class="rating-count">(${product.reviewCount || 0})</span>
        </div>
        <div class="product-card-price">
          <span class="price-current">${window.formatCurrency(product.salePrice || product.price)}</span>
          ${product.salePrice ? `<span class="price-original">${window.formatCurrency(product.price)}</span>` : ''}
          ${discount > 0 ? `<span class="price-discount">${discount}% off</span>` : ''}
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn-add-cart" ${product.stock === 0 ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}
          onclick="event.stopPropagation(); cartAction('${product.id}')">
          <i data-lucide="${product.stock === 0 ? 'x-circle' : 'shopping-cart'}" width="15" height="15"></i>
          ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// SKELETON LOADER HTML
// ============================================================
export function renderProductSkeletons(count = 4) {
  return Array(count).fill(0).map(() => `
    <div>
      <div class="skeleton" style="height:280px; border-radius:var(--radius-xl); margin-bottom:12px;"></div>
      <div class="skeleton skeleton-text" style="width:60%;"></div>
      <div class="skeleton skeleton-text" style="width:80%;"></div>
      <div class="skeleton skeleton-text" style="width:40%;"></div>
    </div>
  `).join('');
}

export { lastDoc };
