// ============================================================
// SHENU FASHION STORE — App Router & Utilities
// ============================================================

// ---- Page Loader ----
function dismissLoader() {
  const loader = document.getElementById('page-loader');
  if (loader && !loader.classList.contains('loaded')) {
    loader.classList.add('loaded');
    setTimeout(() => {
      if (loader.parentNode) loader.style.display = 'none';
    }, 400);
  }
}
if (document.readyState === 'complete') {
  dismissLoader();
} else {
  window.addEventListener('load', dismissLoader);
  document.addEventListener('DOMContentLoaded', () => setTimeout(dismissLoader, 300));
}
setTimeout(dismissLoader, 800);

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

// ---- User dropdown ----
const userMenuBtn = document.getElementById('user-menu-btn');
const userDropdown = document.getElementById('user-dropdown');
if (userMenuBtn && userDropdown) {
  userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => userDropdown.classList.remove('open'));
}

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================

/**
 * Show a toast notification
 * @param {string} message - Toast message
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - Optional title
 * @param {number} duration - Duration in ms (default: 4000)
 */
window.showToast = function(message, type = 'info', title = '', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    info:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  };

  const titles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || icons.info}</div>
    <div class="toast-content">
      <div class="toast-title">${title || titles[type]}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="toast-bar"></div>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 350);
  }, duration);
};

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ============================================================
// ACTIVE NAV LINK
// ============================================================
function setActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ============================================================
// CART COUNT (from localStorage)
// ============================================================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('shenu_cart') || '[]');
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}
updateCartCount();

// Listen for cart changes
window.addEventListener('storage', updateCartCount);
window.addEventListener('cart-updated', updateCartCount);

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/** Format currency */
window.formatCurrency = function(amount) {
  const num = Number(amount) || 0;
  return 'Rs. ' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/** Format date */
window.formatDate = function(timestamp) {
  const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

/** Debounce */
window.debounce = function(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** Truncate text */
window.truncate = function(text, maxLength = 80) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/** Generate star HTML */
window.renderStars = function(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${i <= Math.round(rating) ? '' : 'empty'}">★</span>`;
  }
  html += '</div>';
  return html;
};

/** Order status badge */
window.statusBadge = function(status) {
  const map = {
    'pending':    ['warning', 'Pending'],
    'processing': ['info',    'Processing'],
    'shipped':    ['gold',    'Shipped'],
    'delivered':  ['success', 'Delivered'],
    'cancelled':  ['error',   'Cancelled'],
  };
  const [type, label] = map[status] || ['', status];
  return `<span class="badge badge-${type}">${label}</span>`;
};

/** Get user initials for avatar fallback */
window.getInitials = function(name) {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
};

/** Smooth scroll to element */
window.scrollToEl = function(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
};

// ============================================================
// LIGHT / DARK THEME MANAGER
// ============================================================
export function initTheme() {
  const savedTheme = localStorage.getItem('shenu_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (document.body) {
    document.body.setAttribute('data-theme', savedTheme);
  }
  updateThemeIcons(savedTheme);
}

export function updateThemeIcons(theme) {
  const isLight = theme === 'light';
  document.querySelectorAll('.theme-icon-sun').forEach(i => {
    i.style.display = isLight ? 'none' : 'inline-block';
  });
  document.querySelectorAll('.theme-icon-moon').forEach(i => {
    i.style.display = isLight ? 'inline-block' : 'none';
  });
}

window.updateThemeIcons = updateThemeIcons;

window.toggleTheme = function() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  if (document.body) {
    document.body.setAttribute('data-theme', next);
  }
  try {
    localStorage.setItem('shenu_theme', next);
  } catch (e) {}
  updateThemeIcons(next);
  if (typeof window.showToast === 'function') {
    showToast(`${next === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'} Activated`, 'info');
  }
};

// Immediate execution
initTheme();
document.addEventListener('DOMContentLoaded', initTheme);
