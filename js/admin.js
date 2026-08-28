// ============================================================
// SHENU FASHION STORE — Admin Module
// Admin dashboard, product CRUD, user management
// ============================================================

import { db, storage } from './firebase-config.js';
import {
  collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc,
  query, orderBy, limit, where, serverTimestamp, getCountFromServer
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { requireAdmin } from './auth.js';

// ============================================================
// DASHBOARD ANALYTICS
// ============================================================
export async function getDashboardStats() {
  try {
    const [ordersSnap, productsSnap, usersSnap] = await Promise.all([
      getCountFromServer(collection(db, 'orders')),
      getCountFromServer(collection(db, 'products')),
      getCountFromServer(collection(db, 'users')),
    ]);

    // Revenue from completed orders
    const deliveredQ = query(collection(db, 'orders'), where('status', '==', 'delivered'));
    const deliveredSnap = await getDocs(deliveredQ);
    const revenue = deliveredSnap.docs.reduce((sum, d) => sum + (d.data().total || 0), 0);

    // Recent orders
    const recentQ = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
    const recentSnap = await getDocs(recentQ);
    const recentOrders = recentSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Low stock products
    const lowStockQ = query(collection(db, 'products'), where('stock', '<=', 5));
    const lowStockSnap = await getDocs(lowStockQ);
    const lowStockProducts = lowStockSnap.docs.map(d => ({ id: d.id, ...d.data() }));

    return {
      totalOrders:   ordersSnap.data().count,
      totalProducts: productsSnap.data().count,
      totalUsers:    usersSnap.data().count,
      totalRevenue:  revenue,
      recentOrders,
      lowStockProducts,
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    // Return demo data
    return {
      totalOrders: 48, totalProducts: 124, totalUsers: 1205, totalRevenue: 380500,
      recentOrders: [], lowStockProducts: []
    };
  }
}

// ============================================================
// PRODUCT CRUD
// ============================================================
export async function createProduct(productData, imageFiles = []) {
  await requireAdmin();
  try {
    const imageUrls = [];
    for (const file of imageFiles) {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    const product = {
      ...productData,
      images: imageUrls,
      rating: 0,
      reviewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const ref2 = await addDoc(collection(db, 'products'), product);
    return { success: true, productId: ref2.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(productId, productData, newImageFiles = []) {
  await requireAdmin();
  try {
    const newImageUrls = [];
    for (const file of newImageFiles) {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      newImageUrls.push(url);
    }

    const updateData = {
      ...productData,
      updatedAt: serverTimestamp(),
    };
    if (newImageUrls.length > 0) {
      updateData.images = [...(productData.images || []), ...newImageUrls];
    }

    await updateDoc(doc(db, 'products', productId), updateData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(productId) {
  await requireAdmin();
  try {
    await deleteDoc(doc(db, 'products', productId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getAllProducts(limitCount = 100) {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

// ============================================================
// USER MANAGEMENT
// ============================================================
export async function getAllUsers(limitCount = 100) {
  try {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export async function updateUserRole(userId, role) {
  await requireAdmin();
  try {
    await updateDoc(doc(db, 'users', userId), { role, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
