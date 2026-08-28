// ============================================================
// SHENU FASHION STORE — Orders Module
// Order creation, tracking, status management
// ============================================================

import { db, auth } from './firebase-config.js';
import {
  collection, doc, addDoc, getDoc, getDocs,
  updateDoc, query, where, orderBy, limit, serverTimestamp
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

    const ref = await addDoc(collection(db, 'orders'), order);

    // Clear cart after successful order
    localStorage.removeItem('shenu_cart');
    window.dispatchEvent(new Event('cart-updated'));

    return { success: true, orderId: ref.id };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, error: error.message };
  }
}

// ============================================================
// GET USER ORDERS
// ============================================================
export async function getUserOrders(limitCount = 20) {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

// ============================================================
// GET SINGLE ORDER
// ============================================================
export async function getOrder(orderId) {
  try {
    const snap = await getDoc(doc(db, 'orders', orderId));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  } catch {
    return null;
  }
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
  try {
    const constraints = [orderBy('createdAt', 'desc'), limit(limitCount)];
    if (status) constraints.unshift(where('status', '==', status));
    const q = query(collection(db, 'orders'), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

// ============================================================
// ADMIN: UPDATE ORDER STATUS
// ============================================================
export async function updateOrderStatus(orderId, newStatus, note = '') {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const snap = await getDoc(orderRef);
    const order = snap.data();

    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
      statusHistory: [
        ...(order.statusHistory || []),
        { status: newStatus, timestamp: new Date(), note }
      ]
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
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
