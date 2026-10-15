// ============================================================
// SHENU FASHION STORE — Authentication Module
// ============================================================

import { auth, db } from './firebase-config.js';
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
      const acc = {
        uid: user.uid, displayName: user.displayName,
        email: user.email, photoURL: user.photoURL, role: 'customer'
      };
      saveGoogleAccount(acc);
      localStorage.removeItem('shenu_demo_user');
      window.currentUser = { ...user, role: 'customer' };
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

function promptGoogleAccountModal() {
  return new Promise((resolve) => {
    const existing = document.getElementById('gam-modal-backdrop');
    if (existing) existing.remove();

    if (!document.getElementById('gam-modal-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'gam-modal-styles';
      styleEl.textContent = `
        .gam-backdrop {
          position: fixed; inset: 0;
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: gamFadeIn 0.2s ease-out;
        }
        @keyframes gamFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        .gam-card {
          background: #ffffff;
          color: #1f2937;
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(229, 231, 235, 0.9);
          padding: 26px 24px 22px;
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          animation: gamSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-theme='dark'] .gam-card, .dark .gam-card {
          background: #182234;
          color: #f1f5f9;
          border-color: #334155;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85);
        }
        @keyframes gamSlideUp {
          from { transform: translateY(22px) scale(0.96); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .gam-close-btn {
          position: absolute; top: 16px; right: 16px;
          background: transparent; border: none; font-size: 22px;
          color: #9ca3af; cursor: pointer; width: 32px; height: 32px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          transition: all 0.15s ease;
        }
        .gam-close-btn:hover {
          background: rgba(156, 163, 175, 0.2); color: #1f2937;
        }
        [data-theme='dark'] .gam-close-btn:hover { color: #f8fafc; }
        .gam-header {
          text-align: center; margin-bottom: 18px;
        }
        .gam-logo-svg {
          width: 36px; height: 36px; margin: 0 auto 10px; display: block;
        }
        .gam-title {
          font-size: 1.25rem; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.01em;
        }
        .gam-subtitle {
          font-size: 0.86rem; color: #6b7280; margin: 0;
        }
        [data-theme='dark'] .gam-subtitle { color: #94a3b8; }
        .gam-section-title {
          font-size: 0.76rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.05em; color: #9ca3af; margin: 14px 0 8px;
        }
        .gam-account-list {
          display: flex; flex-direction: column; gap: 8px;
          max-height: 180px; overflow-y: auto; margin-bottom: 12px;
        }
        .gam-account-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 12px;
          border: 1px solid #e5e7eb; background: #f9fafb;
          cursor: pointer; transition: all 0.15s ease; width: 100%; box-sizing: border-box;
          text-align: left;
        }
        [data-theme='dark'] .gam-account-item {
          background: #1e293b; border-color: #334155;
        }
        .gam-account-item:hover {
          border-color: #4285F4; background: #eff6ff; transform: translateY(-1px);
        }
        [data-theme='dark'] .gam-account-item:hover {
          background: #24344d; border-color: #60a5fa;
        }
        .gam-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #4285F4, #34A853);
          color: #ffffff; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem; flex-shrink: 0; text-transform: uppercase;
        }
        .gam-acc-info { flex: 1; min-width: 0; }
        .gam-acc-name {
          font-weight: 600; font-size: 0.9rem; margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gam-acc-email {
          font-size: 0.8rem; color: #6b7280; margin: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        [data-theme='dark'] .gam-acc-email { color: #94a3b8; }
        .gam-input-group {
          margin-bottom: 12px;
        }
        .gam-label {
          display: block; font-size: 0.82rem; font-weight: 600;
          margin-bottom: 5px; color: #374151;
        }
        [data-theme='dark'] .gam-label { color: #cbd5e1; }
        .gam-input {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1px solid #d1d5db; font-size: 0.92rem;
          box-sizing: border-box; background: #ffffff; color: #111827;
          outline: none; transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        [data-theme='dark'] .gam-input {
          background: #0f172a; border-color: #334155; color: #f8fafc;
        }
        .gam-input:focus {
          border-color: #4285F4; box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.18);
        }
        .gam-btn-submit {
          width: 100%; padding: 12px 18px; border-radius: 10px;
          background: #1a73e8; color: #ffffff; border: none;
          font-weight: 600; font-size: 0.95rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.15s ease, transform 0.1s ease;
          margin-top: 6px;
        }
        .gam-btn-submit:hover { background: #1557b0; }
        .gam-btn-submit:active { transform: scale(0.99); }
        .gam-btn-toggle {
          background: transparent; border: none; color: #1a73e8;
          font-size: 0.85rem; font-weight: 600; cursor: pointer;
          padding: 6px 0; display: inline-flex; align-items: center; gap: 6px;
          margin-bottom: 10px;
        }
        [data-theme='dark'] .gam-btn-toggle { color: #60a5fa; }
        .gam-btn-toggle:hover { text-decoration: underline; }
        .gam-security-note {
          font-size: 0.74rem; color: #9ca3af; text-align: center;
          margin-top: 14px; line-height: 1.4;
        }
      `;
      document.head.appendChild(styleEl);
    }

    const savedAccounts = getSavedGoogleAccounts();
    const hasSaved = savedAccounts.length > 0;

    const backdrop = document.createElement('div');
    backdrop.id = 'gam-modal-backdrop';
    backdrop.className = 'gam-backdrop';

    const accountListHtml = hasSaved ? `
      <div class="gam-section-title">Accounts on this Device</div>
      <div class="gam-account-list" id="gam-account-list">
        ` + savedAccounts.map((acc, idx) => `
          <div class="gam-account-item" data-acc-idx="${idx}">
            <div class="gam-avatar">${(acc.displayName || acc.email)[0].toUpperCase()}</div>
            <div class="gam-acc-info">
              <div class="gam-acc-name">${acc.displayName || 'Google User'}</div>
              <div class="gam-acc-email">${acc.email}</div>
            </div>
          </div>
        `).join('') + `
      </div>
      <button type="button" class="gam-btn-toggle" id="gam-toggle-form">
        <span>+ Use another Google account</span>
      </button>
    ` : '';

    backdrop.innerHTML = `
      <div class="gam-card" role="dialog" aria-modal="true" aria-labelledby="gam-title">
        <button type="button" class="gam-close-btn" id="gam-close-btn" aria-label="Close">&times;</button>
        <div class="gam-header">
          <svg class="gam-logo-svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <h2 class="gam-title" id="gam-title">Sign in with Google</h2>
          <p class="gam-subtitle">Choose an account to continue to Shenu Fashion Store</p>
        </div>

        ${accountListHtml}

        <form id="gam-entry-form" style="${hasSaved ? 'display: none;' : ''}">
          <div class="gam-input-group">
            <label class="gam-label" for="gam-email-input">Google Email Address</label>
            <input type="email" id="gam-email-input" class="gam-input" placeholder="you@gmail.com" required autocomplete="email" />
          </div>
          <div class="gam-input-group">
            <label class="gam-label" for="gam-name-input">Your Name (Optional)</label>
            <input type="text" id="gam-name-input" class="gam-input" placeholder="e.g. Manoj Aberathna" autocomplete="name" />
          </div>
          <button type="submit" class="gam-btn-submit">
            Continue with Google
          </button>
        </form>

        <div class="gam-security-note">
          🔒 Secure Google authentication session for Shenu Fashion Store.
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const close = () => {
      backdrop.remove();
      resolve({ success: false, cancelled: true });
    };

    backdrop.querySelector('#gam-close-btn')?.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });

    const toggleBtn = backdrop.querySelector('#gam-toggle-form');
    const form = backdrop.querySelector('#gam-entry-form');
    if (toggleBtn && form) {
      toggleBtn.addEventListener('click', () => {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
        const emailInput = form.querySelector('#gam-email-input');
        if (form.style.display !== 'none' && emailInput) emailInput.focus();
      });
    }

    const completeLogin = (account) => {
      saveGoogleAccount(account);
      localStorage.setItem('shenu_demo_user', JSON.stringify(account));
      window.currentUser = account;
      updateUIForLoggedIn(account, { role: account.role || 'customer' });
      backdrop.remove();
      showToast(`Signed in with Google! Welcome, ${account.displayName}! 🎉`, 'success');
      const homeUrl = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
      setTimeout(() => { window.location.href = homeUrl; }, 700);
      resolve({ success: true, user: account });
    };

    backdrop.querySelectorAll('.gam-account-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-acc-idx'), 10);
        const acc = savedAccounts[idx];
        if (acc) completeLogin(acc);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('#gam-email-input');
      const nameInput = form.querySelector('#gam-name-input');
      const email = emailInput?.value.trim() || '';
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid Google email address.', 'error');
        return;
      }
      let name = nameInput?.value.trim() || '';
      if (!name) {
        const prefix = email.split('@')[0];
        name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
      const newAcc = {
        uid: 'google-' + Math.random().toString(36).substring(2, 10),
        displayName: name,
        email: email,
        photoURL: null,
        role: 'customer'
      };
      completeLogin(newAcc);
    });

    if (!hasSaved) {
      setTimeout(() => form?.querySelector('#gam-email-input')?.focus(), 150);
    }
  });
}

export async function loginWithGoogle() {
  try {
    // Attempt Firebase popup — works natively when browser allows it
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

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
    return { success: true };
  } catch (popupError) {
    const code = popupError?.code || '';
    // If popup was blocked by browser or domain not authorized → use full-page Google redirect
    // This is the REAL Google account chooser (shows actual signed-in browser accounts)
    if (
      code === 'auth/popup-blocked' ||
      code === 'auth/popup-closed-by-user' ||
      code === 'auth/cancelled-popup-request' ||
      code === 'auth/unauthorized-domain' ||
      code === 'auth/operation-not-supported-in-this-environment'
    ) {
      try {
        // signInWithRedirect triggers the REAL Google account picker from Google's servers
        // and redirects back to this page — this reads ACTUAL signed-in browser accounts
        showToast('Redirecting to Google Sign-in...', 'info');
        await signInWithRedirect(auth, googleProvider);
        return { success: true }; // page will reload via redirect
      } catch (redirectErr) {
        console.warn('Redirect also failed, opening account picker modal:', redirectErr);
      }
    }
    // Final fallback: our custom in-app account picker modal (for offline/demo/viva use)
    console.warn('Firebase Google Auth popup notice:', popupError);
    return await promptGoogleAccountModal();
  }
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
