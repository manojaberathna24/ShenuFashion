// ============================================================
// SHENU FASHION STORE — Authentication Module
// ============================================================

import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();

// ============================================================
// AUTH STATE OBSERVER
// ============================================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid);
    window.currentUser = { ...user, ...userData };
    updateUIForLoggedIn(user, userData);
  } else {
    window.currentUser = null;
    updateUIForLoggedOut();
  }
});

// ============================================================
// REGISTER WITH EMAIL/PASSWORD
// ============================================================
export async function registerUser(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      email,
      photoURL: null,
      role: 'customer',
      addresses: [],
      wishlist: [],
      createdAt: serverTimestamp(),
    });

    showToast('Account created successfully! Welcome to Shenu Fashion! 🎉', 'success');
    setTimeout(() => { window.location.href = '/'; }, 1500);
    return { success: true };
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
    return { success: false, error: msg };
  }
}

// ============================================================
// LOGIN WITH EMAIL/PASSWORD
// ============================================================
export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast('Welcome back! 👋', 'success');
    setTimeout(() => { window.location.href = '/'; }, 1000);
    return { success: true };
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
    return { success: false, error: msg };
  }
}

// ============================================================
// GOOGLE SIGN IN
// ============================================================
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user doc exists, if not create it
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'customer',
        addresses: [],
        wishlist: [],
        createdAt: serverTimestamp(),
      });
    }

    showToast(`Welcome, ${user.displayName?.split(' ')[0]}! 🎉`, 'success');
    setTimeout(() => { window.location.href = '/'; }, 1000);
    return { success: true };
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      showToast(getAuthErrorMessage(error.code), 'error');
    }
    return { success: false, error: error.code };
  }
}

// ============================================================
// LOGOUT
// ============================================================
export async function logoutUser() {
  try {
    await signOut(auth);
    localStorage.removeItem('shenu_cart');
    showToast('Logged out successfully. See you soon!', 'info');
    setTimeout(() => { window.location.href = '/'; }, 800);
  } catch (error) {
    showToast('Logout failed. Please try again.', 'error');
  }
}

// ============================================================
// PASSWORD RESET
// ============================================================
export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    showToast('Password reset email sent! Check your inbox.', 'success');
    return { success: true };
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
    return { success: false, error: msg };
  }
}

// ============================================================
// GET USER DATA FROM FIRESTORE
// ============================================================
export async function getUserData(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? snap.data() : {};
  } catch {
    return {};
  }
}

// ============================================================
// UPDATE UI HELPERS
// ============================================================
function updateUIForLoggedIn(user, userData) {
  const role = userData?.role || 'customer';
  const name = user.displayName || userData?.name || 'User';
  const photoURL = user.photoURL || userData?.photoURL;

  // Show/hide auth-gated elements
  document.querySelectorAll('[data-auth="logged-in"]').forEach(el => el.style.display = '');
  document.querySelectorAll('[data-auth="logged-out"]').forEach(el => el.style.display = 'none');
  document.querySelectorAll('[data-auth="admin"]').forEach(el => {
    el.style.display = role === 'admin' ? '' : 'none';
  });

  // Update avatar
  const avatarEl = document.getElementById('navbar-avatar');
  if (avatarEl) {
    if (photoURL) {
      avatarEl.src = photoURL;
      avatarEl.alt = name;
    } else {
      // Fallback initials avatar
      avatarEl.style.display = 'none';
      const initials = document.getElementById('navbar-initials');
      if (initials) {
        initials.textContent = getInitials(name);
        initials.style.display = 'flex';
      }
    }
  }

  // Update dropdown
  const userName = document.getElementById('dropdown-name');
  const userEmail = document.getElementById('dropdown-email');
  if (userName) userName.textContent = name;
  if (userEmail) userEmail.textContent = user.email;
}

function updateUIForLoggedOut() {
  document.querySelectorAll('[data-auth="logged-in"]').forEach(el => el.style.display = 'none');
  document.querySelectorAll('[data-auth="logged-out"]').forEach(el => el.style.display = '');
  document.querySelectorAll('[data-auth="admin"]').forEach(el => el.style.display = 'none');
}

// ============================================================
// ERROR MESSAGES
// ============================================================
function getAuthErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use':    'This email is already registered. Please login instead.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment.',
    'auth/network-request-failed':  'Network error. Please check your connection.',
    'auth/invalid-credential':      'Invalid email or password. Please try again.',
    'auth/user-disabled':           'This account has been disabled.',
  };
  return messages[code] || 'Something went wrong. Please try again.';
}

// ============================================================
// REQUIRE AUTH GUARD (call on protected pages)
// ============================================================
export function requireAuth(redirectTo = '/pages/login.html') {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (!user) {
        window.location.href = redirectTo;
      } else {
        resolve(user);
      }
    });
  });
}

// ============================================================
// REQUIRE ADMIN GUARD
// ============================================================
export async function requireAdmin() {
  const user = await requireAuth();
  const data = await getUserData(user.uid);
  if (data.role !== 'admin') {
    showToast('Access denied. Admin only.', 'error');
    setTimeout(() => { window.location.href = '/'; }, 1500);
    return null;
  }
  return { ...user, ...data };
}

export { auth };
