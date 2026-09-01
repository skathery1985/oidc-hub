/**
 * Main Application Orchestrator & UI Router
 * Fully localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.App = {
  currentTab: 'live-lab',
  selectedSpaSdkId: 'spa-oidc-client-ts',
  selectedBackendSdkId: 'backend-nextjs-auth',
  selectedMobileSdkId: 'mobile-flutter-appauth',
  eventSource: null,

  init() {
    // 1. Initialize Theme (Light default)
    if (window.ThemeManager) {
      window.ThemeManager.init();
    }

    // 2. Initialize Language (Arabic RTL default)
    window.i18n.setLanguage(window.i18n.currentLang);
    this.initSseStream();
    this.setupNavigation();
    this.initScrollCue();
    this.renderActiveTab();
  },

  initScrollCue() {
    const cue = document.getElementById('scroll-cue');
    const cueText = document.getElementById('scroll-cue-text');
    if (!cue) return;

    const updateScrollCue = () => {
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Smart UX threshold: display cue if there is at least 150px of content below the viewport
      const remainingDown = scrollHeight - (scrollTop + clientHeight);
      const hasContentBelow = remainingDown > 150;

      if (hasContentBelow) {
        if (cueText && window.i18n) {
          cueText.textContent = window.i18n.t('scrollDownHint');
        }
        cue.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
        cue.classList.add('opacity-100', 'translate-y-0');
      } else {
        cue.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
        cue.classList.remove('opacity-100', 'translate-y-0');
      }
    };

    window.addEventListener('scroll', updateScrollCue, { passive: true });
    window.addEventListener('resize', updateScrollCue, { passive: true });
    this.updateScrollCue = updateScrollCue;
  },

  scrollToContent() {
    window.scrollBy({
      top: Math.min(window.innerHeight * 0.75, 550),
      behavior: 'smooth'
    });
  },

  initSseStream() {
    if (window.location.protocol === 'file:') return;
    try {
      this.eventSource = new EventSource('/api/events');
      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleLiveEvent(data);
        } catch (e) {
          console.error('SSE JSON error', e);
        }
      };
      this.eventSource.onerror = () => {
        // Soft fallback if server SSE is inactive
        if (this.eventSource) this.eventSource.close();
      };
    } catch (e) {
      console.warn('SSE not supported or failed', e);
    }
  },

  handleLiveEvent(entry) {
    if (entry.type === 'INIT') return;
    const ticker = document.getElementById('live-event-badge');
    if (ticker) {
      ticker.textContent = `[${entry.category}] ${entry.action}`;
      ticker.className = `text-[11px] font-mono px-2.5 py-1 rounded-full border transition-all ${
        entry.level === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
        entry.level === 'error' ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' :
        entry.level === 'warning' ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
        'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
      }`;
    }
  },

  setupNavigation() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        window.i18n.toggleLanguage();
      });
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        window.ThemeManager.toggleTheme();
      });
    }
  },

  switchTab(tab) {
    this.currentTab = tab;
    
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const isCurrent = btn.getAttribute('data-tab') === tab;
      if (isCurrent) {
        btn.classList.add('border-indigo-500', 'text-indigo-600', 'dark:text-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-500/10');
        btn.classList.remove('border-transparent', 'text-slate-600', 'dark:text-slate-400');
      } else {
        btn.classList.remove('border-indigo-500', 'text-indigo-600', 'dark:text-indigo-400', 'bg-indigo-50', 'dark:bg-indigo-500/10');
        btn.classList.add('border-transparent', 'text-slate-600', 'dark:text-slate-400');
      }
    });

    this.renderActiveTab();
    setTimeout(() => this.updateScrollCue && this.updateScrollCue(), 150);
  },

  renderActiveTab() {
    const main = document.getElementById('main-content-area');
    if (!main) return;

    const t = (k) => window.i18n.t(k);

    if (this.currentTab === 'live-lab') {
      main.innerHTML = `<div id="live-lab-root"></div>`;
      window.LiveLab.init();
    } else if (this.currentTab === 'mobile') {
      main.innerHTML = `
        <div class="space-y-8">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ${t('mobileSimTitle')}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ${t('mobileSimSubtitle')}
            </p>
          </div>
          
          <!-- Interactive Phone Simulator Frame -->
          <div id="mobile-simulator-root"></div>

          <!-- Mobile SDKs Deep Dive Catalog -->
          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div class="mb-4">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ${t('mobileBlueprintsTitle')}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${t('mobileBlueprintsDesc')}</p>
            </div>
            <div id="mobile-catalog-cards">
              ${this.renderMobileSdkCards()}
            </div>
          </div>
        </div>
      `;
      window.MobileSimulator.init();
    } else if (this.currentTab === 'spa') {
      main.innerHTML = `
        <div class="space-y-8">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ${t('spaSimTitle')}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ${t('spaSimSubtitle')}
            </p>
          </div>
          
          <!-- Interactive SPA Simulator Frame -->
          <div id="spa-simulator-root"></div>

          <!-- SPA SDKs Deep Dive Catalog -->
          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div class="mb-4">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ${t('spaBlueprintsTitle')}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${t('spaBlueprintsDesc')}</p>
            </div>
            <div id="spa-catalog-cards">
              ${this.renderSdkCatalogCards('spa')}
            </div>
          </div>
        </div>
      `;
      window.SpaSimulator.init();
    } else if (this.currentTab === 'backend') {
      main.innerHTML = `
        <div class="space-y-8">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ${t('backendSimTitle')}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ${t('backendSimSubtitle')}
            </p>
          </div>
          
          <!-- Interactive Backend Simulator Frame -->
          <div id="backend-simulator-root"></div>

          <!-- Backend SDKs Deep Dive Catalog -->
          <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div class="mb-4">
              <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ${t('backendBlueprintsTitle')}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">${t('backendBlueprintsDesc')}</p>
            </div>
            <div id="backend-catalog-cards">
              ${this.renderSdkCatalogCards('non-spa')}
            </div>
          </div>
        </div>
      `;
      window.BackendSimulator.init();
    } else if (this.currentTab === 'tools') {
      main.innerHTML = `
        <div class="space-y-6">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md dark:shadow-xl">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ${t('toolsTitle')}
            </h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ${t('toolsSubtitle')}
            </p>
          </div>
          <div id="tools-root"></div>
        </div>
      `;
      window.DevTools.init();
    }
  },

  renderMobileSdkCards() {
    return this.renderSdkCatalogCards('mobile');
  },

  renderSdkCatalogCards(categoryFilter) {
    const t = (k) => window.i18n.t(k);
    const isAr = window.i18n.currentLang === 'ar';
    const filtered = window.SDK_CATALOG.filter(s => s.category === categoryFilter);
    
    let containerId = 'backend-catalog-cards';
    let propName = 'selectedBackendSdkId';
    let defaultId = 'backend-nextjs-auth';
    
    if (categoryFilter === 'mobile') {
      containerId = 'mobile-catalog-cards';
      propName = 'selectedMobileSdkId';
      defaultId = 'mobile-flutter-appauth';
    } else if (categoryFilter === 'spa') {
      containerId = 'spa-catalog-cards';
      propName = 'selectedSpaSdkId';
      defaultId = 'spa-oidc-client-ts';
    }

    const currentSelectedId = this[propName] || defaultId;
    const selected = filtered.find(s => s.id === currentSelectedId) || filtered[0];
    this[propName] = selected.id;

    const badgeText = isAr && selected.badge_ar ? selected.badge_ar : selected.badge;
    const secType = isAr && selected.securityModel.type_ar ? selected.securityModel.type_ar : selected.securityModel.type;
    const secPkce = isAr && selected.securityModel.pkceEnforced_ar ? selected.securityModel.pkceEnforced_ar : selected.securityModel.pkceEnforced;
    const secStorage = isAr && selected.securityModel.tokenStorage_ar ? selected.securityModel.tokenStorage_ar : selected.securityModel.tokenStorage;

    return `
      <div class="w-full">
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-xl space-y-6">
          
          <!-- Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${selected.brandGradient || 'from-[#0c4a6e] to-[#0284c7]'} flex items-center justify-center p-2 shadow-md flex-shrink-0 text-white font-black text-lg tracking-wider">
                ${(selected.shortName || selected.name).substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '')}
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">${selected.name}</h3>
                  <span class="px-2.5 py-0.5 bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-full border border-sky-200 dark:border-sky-500/30">${badgeText}</span>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono" dir="ltr">📦 Library: <strong class="text-slate-800 dark:text-slate-200">${selected.libName || selected.shortName}</strong> &bull; Framework: <strong class="text-slate-800 dark:text-slate-200">${selected.framework || selected.language}</strong></div>
              </div>
            </div>
            <a href="${selected.github}" target="_blank" class="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-xs font-bold rounded-xl shadow-md border border-slate-800 dark:border-slate-700 flex items-center gap-2 self-start sm:self-auto transition-all hover:scale-105 flex-shrink-0 group">
              <svg class="w-4 h-4 fill-current group-hover:rotate-12 transition-transform flex-shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span>GitHub Repository</span>
              <svg class="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>

          <!-- Security Specs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div><span class="text-slate-500 dark:text-slate-400">${t('secClientType')}</span> <span class="font-mono text-sky-600 dark:text-sky-400 font-bold">${secType}</span></div>
            <div><span class="text-slate-500 dark:text-slate-400">${t('secPkceEnforcement')}</span> <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${secPkce}</span></div>
            <div class="col-span-1 md:col-span-2"><span class="text-slate-500 dark:text-slate-400">${t('secStorage')}</span> <span class="font-mono text-amber-700 dark:text-amber-300">${secStorage}</span></div>
          </div>

          <!-- Installation -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionInstall')}</label>
            <pre class="bg-slate-900 p-3 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800 overflow-x-auto" dir="ltr"><code>${this.highlightCode(selected.installCmd)}</code></pre>
          </div>

          <!-- Configuration / Manifest -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionConfig')}</label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.configCode)}</code></pre>
          </div>

          <!-- Login Code -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionLogin')}</label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.loginCode)}</code></pre>
          </div>

          <!-- UserInfo Claims -->
          ${selected.userinfoCode ? `
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              👤 ${t('sectionUserinfo')}
            </label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.userinfoCode)}</code></pre>
          </div>` : ''}

          <!-- Token Refresh & Rotation -->
          ${selected.refreshCode ? `
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              🔄 ${t('sectionRefresh')}
            </label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.refreshCode)}</code></pre>
          </div>` : ''}

          <!-- Logout & Token Revocation -->
          ${selected.logoutCode ? `
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              🛡️ ${t('sectionLogout')}
            </label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-rose-300 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.logoutCode)}</code></pre>
          </div>` : ''}

          <!-- Storage & Callback -->
          ${selected.callbackCode ? `
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionCallback')}</label>
            <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.callbackCode)}</code></pre>
          </div>` : ''}

        </div>
      </div>
    `;
  },

  syncSdkCatalogFromSimulator(category, platform) {
    let targetId = null;
    if (category === 'mobile') {
      if (platform === 'flutter') targetId = 'mobile-flutter-appauth';
      else if (platform === 'ios') targetId = 'mobile-ios-appauth';
      else if (platform === 'android') targetId = 'mobile-android-appauth';
      else if (platform === 'react-native') targetId = 'mobile-react-native-appauth';
      this.selectedMobileSdkId = targetId;
      const el = document.getElementById('mobile-catalog-cards');
      if (el) el.innerHTML = this.renderSdkCatalogCards('mobile');
    } else if (category === 'spa') {
      if (platform === 'oidc-client-ts') targetId = 'spa-oidc-client-ts';
      else if (platform === 'angular') targetId = 'spa-angular-auth-oidc';
      else if (platform === 'vanilla' || platform === 'vanilla-crypto') targetId = 'spa-vanilla-crypto';
      this.selectedSpaSdkId = targetId;
      const el = document.getElementById('spa-catalog-cards');
      if (el) el.innerHTML = this.renderSdkCatalogCards('spa');
    } else if (category === 'backend') {
      if (platform === 'nextjs') targetId = 'backend-nextjs-auth';
      else if (platform === 'node') targetId = 'backend-node-openid-client';
      else if (platform === 'python') targetId = 'backend-python-authlib';
      else if (platform === 'spring') targetId = 'backend-java-spring';
      else if (platform === 'nimbus') targetId = 'backend-java-nimbusds';
      else if (platform === 'dotnet') targetId = 'backend-dotnet-aspnetcore';
      else if (platform === 'go') targetId = 'backend-go-oidc';
      this.selectedBackendSdkId = targetId;
      const el = document.getElementById('backend-catalog-cards');
      if (el) el.innerHTML = this.renderSdkCatalogCards('backend');
    }
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  highlightCode(str) {
    if (!str) return '';
    if (window.i18n && typeof window.i18n.localizeCodeComments === 'function') {
      str = window.i18n.localizeCodeComments(str);
    }
    const escaped = this.escapeHtml(str);

    return escaped.split('\n').map(line => {
      // 1. XML comments
      if (line.includes('&lt;!--') && line.includes('--&gt;')) {
        return line.replace(/(&lt;!--.*?--&gt;)/g, '<span class="code-comment">$1</span>');
      }

      // 2. Double-slash comments (avoiding URLs like http:// or https://)
      const slashMatch = line.match(/(?<!:)\/\/.*$/);
      if (slashMatch) {
        const comment = slashMatch[0];
        const idx = slashMatch.index;
        return line.substring(0, idx) + '<span class="code-comment">' + comment + '</span>';
      }

      // 3. Hash comments (Python / YAML / Shell)
      const hashMatch = line.match(/^(\s*)#(.*)$/);
      if (hashMatch) {
        return hashMatch[1] + '<span class="code-comment">#' + hashMatch[2] + '</span>';
      }
      const inlineHash = line.match(/\s+#.*$/);
      if (inlineHash) {
        const idx = inlineHash.index;
        return line.substring(0, idx) + '<span class="code-comment">' + inlineHash[0] + '</span>';
      }

      // 4. Block comments
      if (line.includes('/*') && line.includes('*/')) {
        return line.replace(/(\/\*.*?\*\/)/g, '<span class="code-comment">$1</span>');
      }
      if (line.trim().startsWith('*') || line.trim().startsWith('/*') || line.trim().endsWith('*/')) {
        return '<span class="code-comment">' + line + '</span>';
      }

      return line;
    }).join('\n');
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
