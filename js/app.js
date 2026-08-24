/**
 * Main Application Orchestrator & UI Router
 * Fully localized with Arabic (RTL) [Default] and English (LTR).
 * Fully themed for Light Mode [Default] and Dark Mode.
 */

window.App = {
  currentTab: 'live-lab',
  selectedSdkId: 'spa-oidc-client-ts',
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
    this.renderActiveTab();
  },

  initSseStream() {
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
        console.warn('SSE connection closed, retrying in 5s...');
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
      this.renderSdkCatalogView('spa');
    } else if (this.currentTab === 'backend') {
      this.renderSdkCatalogView('non-spa');
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
    const t = (k) => window.i18n.t(k);
    const isAr = window.i18n.currentLang === 'ar';
    const mobileSdks = window.SDK_CATALOG.filter(s => s.category === 'mobile');
    const selected = mobileSdks.find(s => s.id === this.selectedMobileSdkId) || mobileSdks.find(s => s.id === 'mobile-flutter-appauth') || mobileSdks[0];
    this.selectedMobileSdkId = selected.id;

    const badgeText = isAr && selected.badge_ar ? selected.badge_ar : selected.badge;
    const descText = isAr && selected.description_ar ? selected.description_ar : selected.description;
    const secType = isAr && selected.securityModel.type_ar ? selected.securityModel.type_ar : selected.securityModel.type;
    const secPkce = isAr && selected.securityModel.pkceEnforced_ar ? selected.securityModel.pkceEnforced_ar : selected.securityModel.pkceEnforced;
    const secStorage = isAr && selected.securityModel.tokenStorage_ar ? selected.securityModel.tokenStorage_ar : selected.securityModel.tokenStorage;

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left Selector -->
        <div class="lg:col-span-4 space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">${t('availableSdks')}</h4>
          ${mobileSdks.map(sdk => `
            <div onclick="window.App.selectedMobileSdkId = '${sdk.id}'; document.getElementById('mobile-catalog-cards').innerHTML = window.App.renderMobileSdkCards()" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${sdk.id === selected.id ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 shadow-md shadow-sky-500/10 ring-1 ring-sky-500/30' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900'}">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                  ${window.BRAND_LOGOS && sdk.logoKey ? window.BRAND_LOGOS[sdk.logoKey] : ''}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-sm text-slate-900 dark:text-white truncate">${sdk.shortName || sdk.name}</span>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate" dir="ltr">${sdk.framework} &bull; <span class="text-sky-600 dark:text-sky-400 font-mono">${sdk.language}</span></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Right Details -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div class="flex items-center gap-3.5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 sm:p-2.5 border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
                  ${window.BRAND_LOGOS && selected.logoKey ? window.BRAND_LOGOS[selected.logoKey] : ''}
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">${selected.name}</h3>
                    <span class="px-2.5 py-0.5 bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-full border border-sky-200 dark:border-sky-500/30">${badgeText}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">${descText}</p>
                </div>
              </div>
              <a href="${selected.github}" target="_blank" class="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-2 self-start sm:self-auto transition-all">
                GitHub Repo
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

      </div>
    `;
  },

  renderSdkCatalogView(categoryFilter) {
    const main = document.getElementById('main-content-area');
    if (!main) return;

    const t = (k) => window.i18n.t(k);
    const isAr = window.i18n.currentLang === 'ar';
    const filtered = window.SDK_CATALOG.filter(s => s.category === categoryFilter);
    const selected = filtered.find(s => s.id === this.selectedSdkId) || filtered[0];
    this.selectedSdkId = selected.id;

    const badgeText = isAr && selected.badge_ar ? selected.badge_ar : selected.badge;
    const descText = isAr && selected.description_ar ? selected.description_ar : selected.description;
    const secType = isAr && selected.securityModel.type_ar ? selected.securityModel.type_ar : selected.securityModel.type;
    const secPkce = isAr && selected.securityModel.pkceEnforced_ar ? selected.securityModel.pkceEnforced_ar : selected.securityModel.pkceEnforced;
    const secStorage = isAr && selected.securityModel.tokenStorage_ar ? selected.securityModel.tokenStorage_ar : selected.securityModel.tokenStorage;

    main.innerHTML = `
      <div class="space-y-6">
        <!-- Title banner -->
        <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-xl">
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            ${categoryFilter === 'spa' ? t('spaTitle') : t('backendTitle')}
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            ${categoryFilter === 'spa' ? t('spaSubtitle') : t('backendSubtitle')}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Left SDK Selector Column -->
          <div class="lg:col-span-4 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">${t('availableSdks')}</h3>
            ${filtered.map(sdk => `
              <div onclick="window.App.selectedSdkId = '${sdk.id}'; window.App.renderSdkCatalogView('${categoryFilter}')" class="p-3.5 rounded-2xl border cursor-pointer transition-all ${sdk.id === selected.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/30' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900'}">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-200 dark:border-slate-700 flex-shrink-0">
                    ${window.BRAND_LOGOS && sdk.logoKey ? window.BRAND_LOGOS[sdk.logoKey] : ''}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-sm text-slate-900 dark:text-white truncate">${sdk.shortName || sdk.name}</span>
                      ${sdk.certified ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold flex-shrink-0">${t('certifiedBadge')}</span>` : ''}
                    </div>
                    <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate" dir="ltr">${sdk.framework} &bull; <span class="text-indigo-600 dark:text-indigo-400 font-mono">${sdk.language}</span></div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Right SDK Details & Blueprint Guide -->
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-md dark:shadow-xl space-y-6">
              
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-3.5">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 sm:p-2.5 border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
                    ${window.BRAND_LOGOS && selected.logoKey ? window.BRAND_LOGOS[selected.logoKey] : ''}
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">${selected.name}</h3>
                      <span class="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full border border-indigo-200 dark:border-indigo-500/30">${badgeText}</span>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">${descText}</p>
                  </div>
                </div>
                <a href="${selected.github}" target="_blank" class="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-2 self-start sm:self-auto transition-all">
                  GitHub Repo
                </a>
              </div>

              <!-- Security Specs Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div><span class="text-slate-500 dark:text-slate-400">${t('secClientType')}</span> <span class="font-mono text-indigo-600 dark:text-indigo-400 font-bold">${secType}</span></div>
                <div><span class="text-slate-500 dark:text-slate-400">${t('secPkceEnforcement')}</span> <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">${secPkce}</span></div>
                <div class="col-span-1 md:col-span-2"><span class="text-slate-500 dark:text-slate-400">${t('secStorage')}</span> <span class="font-mono text-amber-700 dark:text-amber-300">${secStorage}</span></div>
              </div>

              <!-- Installation -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionInstall')}</label>
                  <button onclick="navigator.clipboard.writeText('${selected.installCmd.replace(/`/g, '\\`').replace(/\n/g, ' ')}')" class="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1">
                    ${t('copyCmd')}
                  </button>
                </div>
                <pre class="bg-slate-900 p-3 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800 overflow-x-auto" dir="ltr"><code>${this.highlightCode(selected.installCmd)}</code></pre>
              </div>

              <!-- Configuration -->
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionConfig')}</label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.configCode)}</code></pre>
              </div>

              <!-- Login Handler -->
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionLogin')}</label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.loginCode)}</code></pre>
              </div>

              <!-- UserInfo Claims -->
              ${selected.userinfoCode ? `
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  👤 ${t('sectionUserinfo')}
                </label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.userinfoCode)}</code></pre>
              </div>` : ''}

              <!-- Token Refresh & Rotation -->
              ${selected.refreshCode ? `
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  🔄 ${t('sectionRefresh')}
                </label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.refreshCode)}</code></pre>
              </div>` : ''}

              <!-- Logout & Token Revocation -->
              ${selected.logoutCode ? `
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  🛡️ ${t('sectionLogout')}
                </label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-rose-300 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.logoutCode)}</code></pre>
              </div>` : ''}

              <!-- Callback Handler -->
              ${selected.callbackCode ? `
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">${t('sectionCallback')}</label>
                <pre class="bg-slate-900 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar" dir="ltr"><code>${this.highlightCode(selected.callbackCode)}</code></pre>
              </div>` : ''}

            </div>
          </div>

        </div>
      </div>
    `;
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
