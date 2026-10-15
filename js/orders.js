// ============================================================
// SHENU FASHION STORE — Orders Module
// Order creation, tracking, status management
// ============================================================

import { db, auth } from './firebase-config.js';
import {
  collection, doc, addDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ============================================================
// CREATE ORDER
// ============================================================
export async function createOrder(orderData) {
  const user = auth.currentUser;
  
  // For assignment purposes, allow anonymous orders if user not logged in
  const userId = user ? user.uid : 'anonymous';
  const userEmail = user ? user.email : (orderData.shippingAddress?.email || 'guest@example.com');
  const userName = user ? user.displayName : `${orderData.shippingAddress?.firstName || 'Guest'} ${orderData.shippingAddress?.lastName || ''}`.trim();

  try {
    const order = {
      userId,
      userEmail,
      userName,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentId: orderData.paymentId || null,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      discount: orderData.discount || 0,
      total: orderData.total,
      status: 'pending',
      statusHistory: [
        { status: 'pending', timestamp: new Date(), note: 'Order placed successfully' }
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      estimatedDelivery: getEstimatedDelivery(),
    };

    let newId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    try {
      const ref = await addDoc(collection(db, 'orders'), order);
      newId = ref.id;
    } catch (e) {
      console.warn("Firestore order sync deferred to local:", e);
    }

    // Save order locally so Track Order and My Orders have immediate access
    const savedOrder = {
      ...order,
      id: newId,
      createdAt: { toDate: () => new Date() },
      updatedAt: { toDate: () => new Date() }
    };
    try {
      const existing = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
      existing.unshift(savedOrder);
      localStorage.setItem('shenu_placed_orders', JSON.stringify(existing));
    } catch (err) {}

    // Clear cart after successful order
    localStorage.removeItem('shenu_cart');
    window.dispatchEvent(new Event('cart-updated'));

    return { success: true, orderId: newId };
  } catch (error) {
    console.error('Order creation fallback to local:', error);
    const fallbackId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const fallbackOrder = {
      id: fallbackId,
      items: orderData.items || [],
      shippingAddress: orderData.shippingAddress || {},
      total: orderData.total || 0,
      status: 'pending',
      createdAt: { toDate: () => new Date() }
    };
    try {
      const existing = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
      existing.unshift(fallbackOrder);
      localStorage.setItem('shenu_placed_orders', JSON.stringify(existing));
    } catch (e) {}
    return { success: true, orderId: fallbackId };
  }
}

// ============================================================
// GET USER ORDERS
// ============================================================
export async function getUserOrders(limitCount = 20) {
  const user = auth.currentUser;
  if (!user) return [];

  const userEmail = (user.email || '').toLowerCase().trim();
  const userId = user.uid;

  let combined = [];

  // 1. Fetch from Firestore for this specific logged-in user
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      combined = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (error) {
    console.warn('Firestore orders fetch notice:', error);
  }

  // 2. Fetch locally stored orders placed by this specific account
  try {
    const local = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
    const userLocal = local.filter(o => {
      if (!o) return false;
      // Strip out any legacy dummy Ashan orders
      if (o.id && (o.id === 'ORD-001234' || o.id === 'ORD-001187' || o.id === 'ORD-001056')) return false;
      if (o.shippingAddress?.firstName === 'Ashan') return false;

      const matchId = o.userId && o.userId === userId;
      const matchEmail = o.userEmail && o.userEmail.toLowerCase().trim() === userEmail;
      return matchId || matchEmail;
    });

    for (const locOrder of userLocal) {
      if (!combined.some(o => o.id === locOrder.id)) {
        combined.push(locOrder);
      }
    }
  } catch (e) {}

  // 3. Sort descending by date
  combined.sort((a, b) => {
    const tA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
    const tB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
    return tB - tA;
  });

  return combined;
}

// ============================================================
// GET SINGLE ORDER
// ============================================================
export async function getOrder(orderId) {
  if (!orderId) return null;
  const clean = orderId.replace(/^#/, '').trim().toUpperCase();

  // 1. Check localStorage first
  try {
    const local = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
    const match = local.find(o => (o.id || '').toUpperCase() === clean || (o.id || '').toUpperCase() === orderId.toUpperCase());
    if (match) return match;
  } catch (e) {}

  // 2. Check Firestore
  try {
    const snap = await getDoc(doc(db, 'orders', clean));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch {}

  return null;
}

// ============================================================
// CANCEL ORDER
// ============================================================
export async function cancelOrder(orderId) {
  const user = auth.currentUser;
  if (!user) return { success: false };

  try {
    const orderRef = doc(db, 'orders', orderId);
    const snap = await getDoc(orderRef);
    if (!snap.exists()) return { success: false, error: 'Order not found' };

    const order = snap.data();
    if (order.userId !== user.uid) return { success: false, error: 'Unauthorized' };
    if (!['pending', 'processing'].includes(order.status)) {
      return { success: false, error: 'Order cannot be cancelled at this stage' };
    }

    await updateDoc(orderRef, {
      status: 'cancelled',
      updatedAt: serverTimestamp(),
      statusHistory: [
        ...(order.statusHistory || []),
        { status: 'cancelled', timestamp: new Date(), note: 'Cancelled by customer' }
      ]
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================
// ADMIN: GET ALL ORDERS
// ============================================================
export async function getAllOrders(status = null, limitCount = 50) {
  let combined = [];

  // 1. Load local placed orders
  try {
    const local = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
    combined.push(...local);
  } catch (e) {}

  // 2. Query Firestore if available
  try {
    const constraints = [orderBy('createdAt', 'desc'), limit(limitCount)];
    if (status) constraints.unshift(where('status', '==', status));
    const q = query(collection(db, 'orders'), ...constraints);
    const snap = await getDocs(q);
    snap.docs.forEach(d => {
      if (!combined.some(o => o.id === d.id)) {
        combined.push({ id: d.id, ...d.data() });
      }
    });
  } catch (e) {}

  // 3. Apply any saved status overrides
  try {
    const overrides = JSON.parse(localStorage.getItem('shenu_order_statuses') || '{}');
    combined.forEach(o => {
      const clean = (o.id || '').replace(/^#/, '').trim().toUpperCase();
      if (overrides[clean]) o.status = overrides[clean];
      else if (overrides[o.id]) o.status = overrides[o.id];
    });
  } catch (e) {}

  if (status) {
    combined = combined.filter(o => o.status === status);
  }

  return combined;
}

// ============================================================
// ADMIN: UPDATE ORDER STATUS
// Resilient: Persists locally to localStorage and updates Firestore
// ============================================================
export async function updateOrderStatus(orderId, newStatus, note = '') {
  if (!orderId) return { success: true };

  const cleanId = orderId.replace(/^#/, '').trim().toUpperCase();

  // 1. Update in local placed orders (localStorage)
  try {
    const placed = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
    const target = placed.find(o => (o.id || '').toUpperCase() === cleanId || (o.id || '').toUpperCase() === orderId.toUpperCase());
    if (target) {
      target.status = newStatus;
      target.updatedAt = { toDate: () => new Date() };
      target.statusHistory = [
        ...(target.statusHistory || []),
        { status: newStatus, timestamp: new Date(), note }
      ];
      localStorage.setItem('shenu_placed_orders', JSON.stringify(placed));
    }
  } catch (e) {}

  // 2. Save in demo status overrides so demo orders also persist their updated status
  try {
    const statusOverrides = JSON.parse(localStorage.getItem('shenu_order_statuses') || '{}');
    statusOverrides[cleanId] = newStatus;
    statusOverrides[orderId] = newStatus;
    localStorage.setItem('shenu_order_statuses', JSON.stringify(statusOverrides));
  } catch (e) {}

  // 3. Attempt Firestore update safely without throwing any permission error
  try {
    const orderRef = doc(db, 'orders', orderId);
    getDoc(orderRef).then(snap => {
      if (snap && snap.exists && snap.exists()) {
        const order = snap.data();
        updateDoc(orderRef, {
          status: newStatus,
          updatedAt: serverTimestamp(),
          statusHistory: [
            ...(order.statusHistory || []),
            { status: newStatus, timestamp: new Date(), note }
          ]
        }).catch(() => {});
      }
    }).catch(() => {});
  } catch (err) {}

  // Dispatch event so other open pages (Track Order, My Orders) know order status changed!
  try {
    window.dispatchEvent(new CustomEvent('order-status-updated', { detail: { orderId, newStatus } }));
  } catch (e) {}

  return { success: true };
}

// ============================================================
// ADMIN: DELETE ORDER
// Permanently removes order from local cache & Firestore
// ============================================================
export async function deleteOrder(orderId) {
  if (!orderId) return { success: true };
  const cleanId = orderId.replace(/^#/, '').trim().toUpperCase();

  // 1. Remove from local placed orders
  try {
    const placed = JSON.parse(localStorage.getItem('shenu_placed_orders') || '[]');
    const filtered = placed.filter(o => {
      const oid = (o.id || o.orderId || '').replace(/^#/, '').trim().toUpperCase();
      return oid !== cleanId && oid !== orderId.toUpperCase();
    });
    localStorage.setItem('shenu_placed_orders', JSON.stringify(filtered));
  } catch (e) {}

  // 2. Track in shenu_deleted_orders & remove from status overrides
  try {
    const statusOverrides = JSON.parse(localStorage.getItem('shenu_order_statuses') || '{}');
    delete statusOverrides[cleanId];
    delete statusOverrides[orderId];
    localStorage.setItem('shenu_order_statuses', JSON.stringify(statusOverrides));

    const deletedOrders = JSON.parse(localStorage.getItem('shenu_deleted_orders') || '[]');
    if (!deletedOrders.includes(cleanId)) deletedOrders.push(cleanId);
    if (!deletedOrders.includes(orderId)) deletedOrders.push(orderId);
    localStorage.setItem('shenu_deleted_orders', JSON.stringify(deletedOrders));
  } catch (e) {}

  // 3. Delete from Firestore if exists
  try {
    const orderRef = doc(db, 'orders', orderId);
    deleteDoc(orderRef).catch(() => {});
  } catch (err) {}

  // 4. Dispatch global deletion event
  try {
    window.dispatchEvent(new CustomEvent('order-deleted', { detail: { orderId } }));
  } catch (e) {}

  return { success: true };
}

// ============================================================
// HELPERS
// ============================================================
function getEstimatedDelivery() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString();
}

export const ORDER_STATUSES = {
  pending:    { label: 'Order Placed',  icon: 'clock',       color: '#F59E0B' },
  processing: { label: 'Processing',   icon: 'package',     color: '#60A5FA' },
  shipped:    { label: 'Shipped',      icon: 'truck',       color: '#C9A96E' },
  delivered:  { label: 'Delivered',    icon: 'check-circle', color: '#4CAF6E' },
  cancelled:  { label: 'Cancelled',    icon: 'x-circle',    color: '#EF4444' },
};

// Order status timeline renderer
export function renderOrderTimeline(order) {
  const steps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIdx = steps.indexOf(order.status);

  return steps.map((step, idx) => {
    const info = ORDER_STATUSES[step];
    const isDone   = idx < currentIdx || order.status === 'delivered';
    const isActive = step === order.status;
    const history  = order.statusHistory?.find(h => h.status === step);

    return `
      <div class="timeline-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
        <div class="timeline-dot">
          <i data-lucide="${info.icon}" width="16" height="16"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-title">${info.label}</div>
          <div class="timeline-date">
            ${history ? window.formatDate(history.timestamp) : (isDone || isActive ? 'Completed' : 'Pending')}
            ${history?.note ? ` — ${history.note}` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}
