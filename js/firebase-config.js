// ============================================================
// SHENU FASHION STORE — Firebase Configuration
// Replace the firebaseConfig object with your own project values
// from: https://console.firebase.google.com
// ============================================================

// HOW TO SETUP FIREBASE (FREE):
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it "shenu-fashion-store"
// 3. Disable Google Analytics (optional) → click "Create project"
// 4. Click "Web" icon (</>), register app as "shenu-fashion-store"
// 5. Copy the firebaseConfig object below and replace this one
// 6. Go to "Authentication" → Enable "Email/Password" and "Google"
// 7. Go to "Firestore Database" → Create database (Start in test mode)
// 8. Go to "Storage" → Get started

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage }     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ✅ Firebase config — shenu-fashion-store
const firebaseConfig = {
  apiKey: "AIzaSyCsWqwhyUMW35vsYhKmH1e_1qd9HTKc0oc",
  authDomain: "shenu-fashion-store.firebaseapp.com",
  projectId: "shenu-fashion-store",
  storageBucket: "shenu-fashion-store.firebasestorage.app",
  messagingSenderId: "594585662232",
  appId: "1:594585662232:web:f12a754b7a62a2a768646d",
  measurementId: "G-WKWSMBZ5W5"
};

// Initialize Firebase
const app     = initializeApp(firebaseConfig);
const db      = getFirestore(app);
const auth    = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

// ============================================================
// FIRESTORE SECURITY RULES (paste in Firebase Console > Firestore > Rules)
// ============================================================
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users: read own, write own
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Products: anyone can read, only admin can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Reviews: logged in users can read/write their own
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Orders: users can read/create their own orders
    match /orders/{orderId} {
      allow read, create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Cart: users access their own cart
    match /cart/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Categories: anyone reads, admin writes
    match /categories/{catId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
*/
