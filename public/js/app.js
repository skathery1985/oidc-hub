/**
 * Main Application Orchestrator & UI Router
 */

window.App = {
  currentTab: 'live-lab',
  selectedSdkId: 'spa-oidc-client-ts',
  selectedMobileSdkId: 'mobile-flutter-appauth',
  eventSource: null,

  init() {
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
        entry.level === 'success' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' :
        entry.level === 'error' ? 'bg-rose-950/80 text-rose-300 border-rose-800' :
        entry.level === 'warning' ? 'bg-amber-950/80 text-amber-300 border-amber-800' :
        'bg-indigo-950/80 text-indigo-300 border-indigo-800'
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
  },

  switchTab(tab) {
    this.currentTab = tab;
    
    // Update tab button styles
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const isCurrent = btn.getAttribute('data-tab') === tab;
      if (isCurrent) {
        btn.classList.add('border-indigo-500', 'text-indigo-400', 'bg-indigo-500/10');
        btn.classList.remove('border-transparent', 'text-slate-400');
      } else {
        btn.classList.remove('border-indigo-500', 'text-indigo-400', 'bg-indigo-500/10');
        btn.classList.add('border-transparent', 'text-slate-400');
      }
    });

    this.renderActiveTab();
  },

  renderActiveTab() {
    const main = document.getElementById('main-content-area');
    if (!main) return;

    if (this.currentTab === 'live-lab') {
      main.innerHTML = `<div id="live-lab-root"></div>`;
      window.LiveLab.init();
    } else if (this.currentTab === 'mobile') {
      main.innerHTML = `
        <div class="space-y-8">
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              📱 Mobile (iOS, Android & Flutter) AppAuth Simulators & SDKs
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              RFC 8252 (OAuth 2.0 for Native Apps) & OpenID Foundation standard AppAuth implementations for <strong>Flutter</strong>, <strong>iOS (Swift)</strong>, <strong>Android (Kotlin)</strong>, and <strong>React Native</strong>.
            </p>
          </div>
          
          <!-- Interactive Phone Simulator Frame -->
          <div id="mobile-simulator-root"></div>

          <!-- Mobile SDKs Deep Dive Catalog -->
          <div class="pt-6 border-t border-slate-800">
            <div class="mb-4">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                📦 Mobile & Cross-Platform SDK Configuration Blueprints
              </h3>
              <p class="text-xs text-slate-400">Complete setup, manifest permissions, deep linking, and secure keyrings for mobile platforms.</p>
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
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              🧰 OIDC & PKCE Developer Tools & Threat Matrix
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Interactive cryptographic bitwise calculator, live JWT inspector, remote OIDC discovery analyzer, and architecture threat models.
            </p>
          </div>
          <div id="tools-root"></div>
        </div>
      `;
      window.DevTools.init();
    }
  },

  renderMobileSdkCards() {
    const mobileSdks = window.SDK_CATALOG.filter(s => s.category === 'mobile');
    const selected = mobileSdks.find(s => s.id === this.selectedMobileSdkId) || mobileSdks.find(s => s.id === 'mobile-flutter-appauth') || mobileSdks[0];
    this.selectedMobileSdkId = selected.id;

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Left Selector -->
        <div class="lg:col-span-4 space-y-3">
          ${mobileSdks.map(sdk => `
            <div onclick="window.App.selectedMobileSdkId = '${sdk.id}'; document.getElementById('mobile-catalog-cards').innerHTML = window.App.renderMobileSdkCards()" class="p-4 rounded-2xl border cursor-pointer transition-all ${sdk.id === selected.id ? 'border-sky-500 bg-sky-950/30 shadow-lg shadow-sky-950/30' : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'}">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-white">${sdk.name}</span>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">${sdk.badge}</span>
              </div>
              <div class="text-xs text-slate-400 mt-1">${sdk.framework} &bull; <span class="text-sky-400 font-mono">${sdk.language}</span></div>
            </div>
          `).join('')}
        </div>

        <!-- Right Details -->
        <div class="lg:col-span-8 space-y-6">
          <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-lg font-bold text-white">${selected.name}</h3>
                  <span class="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 text-xs font-semibold rounded-full border border-sky-500/30">${selected.badge}</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">${selected.description}</p>
              </div>
              <a href="${selected.github}" target="_blank" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center gap-2 self-start transition-all">
                GitHub Repo
              </a>
            </div>

            <!-- Security Specs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div><span class="text-slate-400">Client Type:</span> <span class="font-mono text-sky-400 font-bold">${selected.securityModel.type}</span></div>
              <div><span class="text-slate-400">PKCE Enforcement:</span> <span class="font-mono text-emerald-400 font-bold">${selected.securityModel.pkceEnforced}</span></div>
              <div class="col-span-2"><span class="text-slate-400">Token Storage:</span> <span class="font-mono text-amber-300">${selected.securityModel.tokenStorage}</span></div>
            </div>

            <!-- Installation -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-300">1. Dependencies</label>
              <pre class="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto"><code>${this.escapeHtml(selected.installCmd)}</code></pre>
            </div>

            <!-- Configuration / Manifest -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-300">2. Configuration & Platform Deep Links</label>
              <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar"><code>${this.escapeHtml(selected.configCode)}</code></pre>
            </div>

            <!-- Login Code -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-300">3. Execute PKCE Login Flow</label>
              <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar"><code>${this.escapeHtml(selected.loginCode)}</code></pre>
            </div>

            <!-- Storage & Callback -->
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-wider text-slate-300">4. Secure Token Storage & Verification</label>
              <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar"><code>${this.escapeHtml(selected.callbackCode)}</code></pre>
            </div>

          </div>
        </div>

      </div>
    `;
  },

  renderSdkCatalogView(categoryFilter) {
    const main = document.getElementById('main-content-area');
    if (!main) return;

    const filtered = window.SDK_CATALOG.filter(s => s.category === categoryFilter);
    const selected = filtered.find(s => s.id === this.selectedSdkId) || filtered[0];
    this.selectedSdkId = selected.id;

    main.innerHTML = `
      <div class="space-y-6">
        <!-- Title banner -->
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            ${categoryFilter === 'spa' ? '🌐 Certified Single Page Application (SPA) SDKs' : '🖥️ Certified Non-SPA / Traditional Backend SDKs'}
          </h2>
          <p class="text-xs text-slate-400 mt-1">
            ${categoryFilter === 'spa' 
              ? 'Public browser clients without server secrets. Enforces S256 PKCE to prevent authorization code interception.' 
              : 'Confidential & SSR server-side clients. Uses PKCE S256 with HttpOnly secure sessions and JWKS signature verification.'}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Left SDK Selector Column -->
          <div class="lg:col-span-4 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Available Certified SDKs</h3>
            ${filtered.map(sdk => `
              <div onclick="window.App.selectedSdkId = '${sdk.id}'; window.App.renderSdkCatalogView('${categoryFilter}')" class="p-4 rounded-2xl border cursor-pointer transition-all ${sdk.id === selected.id ? 'border-indigo-500 bg-indigo-950/30 shadow-lg shadow-indigo-950/30' : 'border-slate-800 bg-slate-900/60 hover:bg-slate-900'}">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-white">${sdk.name}</span>
                  ${sdk.certified ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">Certified</span>` : ''}
                </div>
                <div class="text-xs text-slate-400 mt-1">${sdk.framework} &bull; <span class="text-indigo-400 font-mono">${sdk.language}</span></div>
              </div>
            `).join('')}
          </div>

          <!-- Right SDK Details & Blueprint Guide -->
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-bold text-white">${selected.name}</h3>
                    <span class="px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">${selected.badge}</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">${selected.description}</p>
                </div>
                <a href="${selected.github}" target="_blank" class="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center gap-2 self-start transition-all">
                  GitHub Repo
                </a>
              </div>

              <!-- Security Specs Summary -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div><span class="text-slate-400">Client Type:</span> <span class="font-mono text-indigo-400 font-bold">${selected.securityModel.type}</span></div>
                <div><span class="text-slate-400">PKCE Enforcement:</span> <span class="font-mono text-emerald-400 font-bold">${selected.securityModel.pkceEnforced}</span></div>
                <div class="col-span-2"><span class="text-slate-400">Token Storage:</span> <span class="font-mono text-amber-300">${selected.securityModel.tokenStorage}</span></div>
              </div>

              <!-- Installation -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-300">1. Installation Command</label>
                  <button onclick="navigator.clipboard.writeText('${selected.installCmd.replace(/`/g, '\\`').replace(/\n/g, ' ')}')" class="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                    Copy Command
                  </button>
                </div>
                <pre class="bg-slate-950 p-3 rounded-xl text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto"><code>${this.escapeHtml(selected.installCmd)}</code></pre>
              </div>

              <!-- Configuration -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-300">2. Configuration & Initialization</label>
                </div>
                <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-72 custom-scrollbar"><code>${this.escapeHtml(selected.configCode)}</code></pre>
              </div>

              <!-- Login Handler -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-300">3. Trigger Login with PKCE</label>
                </div>
                <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar"><code>${this.escapeHtml(selected.loginCode)}</code></pre>
              </div>

              <!-- Callback Handler -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-slate-300">4. Callback & Token Exchange</label>
                </div>
                <pre class="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-200 border border-slate-800 overflow-x-auto max-h-64 custom-scrollbar"><code>${this.escapeHtml(selected.callbackCode)}</code></pre>
              </div>

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
  }
};

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
