// ============================================================
// SHENU FASHION STORE — Authentication Module
// ============================================================

import { auth, db } from './firebase-config.js?v=2';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
googleProvider.setCustomParameters({ prompt: 'select_account' });
// ============================================================
// HANDLE GOOGLE REDIRECT RESULT (runs on page load after redirect-based sign-in)
// ============================================================
(async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      const user = result.user;
      // Handle user data and UI after redirect from Google
      try {
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
      } catch (firestoreErr) {
        console.warn('Firestore redirect sync warning:', firestoreErr);
      }
      const acc = {
        uid: user.uid, displayName: user.displayName,
        email: user.email, photoURL: user.photoURL, role: 'customer'
      };
      saveGoogleAccount(acc);
      localStorage.removeItem('shenu_demo_user');
      window.currentUser = { ...user, role: 'customer' };
      showToast(`Welcome, ${user.displayName?.split(' ')[0] || 'User'}! 🎉`, 'success');
    }
  } catch (e) {
    // Redirect result not available or already handled
  }
})();



// Purge any legacy demo user hardcoded to Ashan
try {
  const d = localStorage.getItem('shenu_demo_user');
  if (d && d.toLowerCase().includes('ashan')) {
    localStorage.removeItem('shenu_demo_user');
  }
} catch (e) {}

// ============================================================
// AUTH STATE OBSERVER
// ============================================================
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await getUserData(user.uid);
    window.currentUser = { ...user, ...userData };
    updateUIForLoggedIn(user, userData);
  } else {
    // Check if demo user is stored in localStorage
    const savedDemo = localStorage.getItem('shenu_demo_user');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        window.currentUser = parsed;
        updateUIForLoggedIn(parsed, { role: parsed.role || 'customer' });
        return;
      } catch (e) {}
    }
    window.currentUser = null;
    updateUIForLoggedOut();
  }
});

// Check demo user on script load
(() => {
  const savedDemo = localStorage.getItem('shenu_demo_user');
  if (savedDemo) {
    try {
      const parsed = JSON.parse(savedDemo);
      window.currentUser = parsed;
      document.addEventListener('DOMContentLoaded', () => {
        updateUIForLoggedIn(parsed, { role: parsed.role || 'customer' });
      });
    } catch (e) {}
  }
})();

// ============================================================
// REGISTER WITH EMAIL/PASSWORD
// ============================================================
export async function registerUser(name, email, password) {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    // Create user document in Firestore (graceful fallback)
    try {
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        photoURL: null,
        role: 'customer',
        addresses: [],
        wishlist: [],
        createdAt: serverTimestamp(),
      });
    } catch (firestoreErr) {
      console.warn('Firestore register profile sync warning:', firestoreErr);
    }

    showToast('Account created successfully! Welcome to Shenu Fashion! 🎉', 'success');
    setTimeout(() => { window.location.href = '../index.html'; }, 1200);
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
    localStorage.removeItem('shenu_demo_user');
    showToast('Welcome back! 👋', 'success');
    setTimeout(() => { window.location.href = '../index.html'; }, 1000);
    return { success: true };
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    showToast(msg, 'error');
    return { success: false, error: msg };
  }
}

// ============================================================
// GOOGLE SIGN IN (Device Account Picker & Seamless Google OAuth)
// ============================================================
function getSavedGoogleAccounts() {
  try {
    const list = JSON.parse(localStorage.getItem('shenu_google_accounts') || '[]');
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveGoogleAccount(account) {
  try {
    let list = getSavedGoogleAccounts().filter(a => a.email.toLowerCase() !== account.email.toLowerCase());
    list.unshift(account);
    if (list.length > 5) list = list.slice(0, 5);
    localStorage.setItem('shenu_google_accounts', JSON.stringify(list));
  } catch (e) {}
}

export async function loginWithGoogle() {
  if (window.location.protocol === 'file:') {
    showToast('Cannot sign in from file:// path. Please open via http://localhost:3000 or GitHub Pages.', 'error');
    return { success: false };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await _handleGoogleUser(user);
    return { success: true };
  } catch (err) {
    const code = err?.code || '';
    const message = err?.message || '';
    console.warn('Google Sign-In error:', code, message);

    // User closed popup
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      showToast('Google Sign-In cancelled. Try again.', 'info');
      return { success: false };
    }

    // Domain not authorized in Firebase Console
    if (code === 'auth/unauthorized-domain') {
      const host = window.location.hostname || 'this domain';
      showToast('Domain unauthorized: Add ' + host + ' in Firebase Console > Auth > Settings > Authorized domains', 'error');
      return { success: false };
    }

    // Browser blocked the popup window -> try redirect
    if (code === 'auth/popup-blocked') {
      try {
        showToast('Popup blocked by browser. Redirecting to Google...', 'info');
        await signInWithRedirect(auth, googleProvider);
        return { success: true };
      } catch (redirectErr) {
        showToast('Browser blocked redirect. Please allow popups for this site.', 'error');
        return { success: false };
      }
    }

    // AdBlocker / Brave Shields / Network blocked
    if (code === 'auth/network-request-failed') {
      showToast('Network request blocked. Please check connection or turn off AdBlockers/Brave shields.', 'error');
      return { success: false };
    }

    showToast('Google Sign-In error: ' + (code || message), 'error');
    return { success: false };
  }
}

async function _handleGoogleUser(user) {
  // Sync to Firestore if permissions allow, but never block login
  try {
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
  } catch (firestoreErr) {
    console.warn('Firestore user profile sync warning (proceeding with login):', firestoreErr);
  }

  const acc = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    role: 'customer'
  };
  saveGoogleAccount(acc);
  localStorage.removeItem('shenu_demo_user');
  window.currentUser = { ...user, role: 'customer' };
  showToast(`Welcome, ${user.displayName?.split(' ')[0] || 'User'}! 🎉`, 'success');
  const homeUrl = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  setTimeout(() => { window.location.href = homeUrl; }, 800);
}

// LOGOUT
// ============================================================
export async function logoutUser() {
  try {
    localStorage.removeItem('shenu_demo_user');
    await signOut(auth);
  } catch (e) {}
  localStorage.removeItem('shenu_cart');
  showToast('Logged out successfully. See you soon!', 'info');
  setTimeout(() => { window.location.href = '../index.html'; }, 800);
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
  const name = user.displayName || userData?.name || 'Customer';
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
      avatarEl.style.display = 'block';
    } else {
      avatarEl.style.display = 'none';
      const initials = document.getElementById('navbar-initials');
      if (initials) {
        initials.textContent = name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
        initials.style.display = 'flex';
      }
    }
  }

  // Update dropdown
  const userName = document.getElementById('dropdown-name');
  const userEmail = document.getElementById('dropdown-email');
  if (userName) userName.textContent = name;
  if (userEmail) userEmail.textContent = user.email || '';
  const profName = document.getElementById('prof-user-name');
  const profEmail = document.getElementById('prof-user-email');
  if (profName) profName.textContent = name;
  if (profEmail) profEmail.textContent = user.email || '';
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
    'auth/unauthorized-domain':     'Localhost is authorizing with demo session.',
  };
  return messages[code] || 'Something went wrong. Please try again.';
}

// ============================================================
// REQUIRE AUTH GUARD
// ============================================================
export function requireAuth(redirectTo = '../pages/login.html') {
  return new Promise((resolve) => {
    const savedDemo = localStorage.getItem('shenu_demo_user');
    if (savedDemo) {
      resolve(JSON.parse(savedDemo));
      return;
    }
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
    setTimeout(() => { window.location.href = '../index.html'; }, 1500);
    return null;
  }
  return { ...user, ...data };
}

export { auth };
