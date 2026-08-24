/**
 * Theme Management Engine
 * Supports Light Mode [Default] and Dark Mode with persistent localStorage preference.
 */

window.ThemeManager = {
  currentTheme: localStorage.getItem('oidc_hub_theme') || 'light',

  init() {
    this.applyTheme(this.currentTheme);
  },

  applyTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('oidc_hub_theme', theme);

    const htmlEl = document.documentElement;
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    this.updateThemeButton();
  },

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  },

  updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    const isDark = this.currentTheme === 'dark';
    const isAr = (window.i18n && window.i18n.currentLang === 'ar');

    if (isDark) {
      btn.innerHTML = `
        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
        <span>${isAr ? 'الوضع المضيء' : 'Light Mode'}</span>
      `;
    } else {
      btn.innerHTML = `
        <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        <span>${isAr ? 'الوضع الليلي' : 'Dark Mode'}</span>
      `;
    }
  }
};

// Initialize Theme immediately
window.ThemeManager.init();
