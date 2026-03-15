(function () {
  const ns = window.SifakaPageViews = window.SifakaPageViews || {};

  ns.mountCommunities = function mountCommunities() {
    const showFallback = () => {
      const root = document.getElementById('communitiesRoot');
      if (!root || root.innerHTML.trim()) return;
      if (window.location && window.location.protocol === 'file:') {
        root.innerHTML = '<div class="live-grid-loading" style="padding:1rem;line-height:1.5">Communities could not load in file mode.<br>Run a local server and open http://localhost instead of file://.<br><small>Example: <code>python -m http.server 8080</code></small></div>';
        return;
      }
      root.innerHTML = '<div class="live-grid-loading" style="padding:1rem;">Unable to load Communities right now.</div>';
    };

    const tryMountExisting = () => {
      if (!window.SifakaCommunities || typeof window.SifakaCommunities.mount !== 'function') return false;
      try {
        window.SifakaCommunities.mount();
        return true;
      } catch (err) {
        console.error('Communities mount failed', err);
        return false;
      }
    };

    if (tryMountExisting()) return Promise.resolve(true);

    const tryImportAndMount = (specifier) => import(specifier)
      .then(() => tryMountExisting())
      .catch(() => false);

    const injectModuleScriptAndMount = () => new Promise((resolve) => {
      const existing = document.getElementById('sifaka-communities-boot-retry');
      if (existing) {
        window.setTimeout(() => resolve(tryMountExisting()), 280);
        return;
      }
      const script = document.createElement('script');
      script.id = 'sifaka-communities-boot-retry';
      script.type = 'module';
      script.src = './communities/boot.js?retry=' + Date.now();
      script.onload = () => {
        window.setTimeout(() => resolve(tryMountExisting()), 180);
      };
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

    return tryImportAndMount('../communities/boot.js')
      .then((ok) => (ok ? true : tryImportAndMount('./communities/boot.js')))
      .then((ok) => (ok ? true : injectModuleScriptAndMount()))
      .then((ok) => {
        if (ok) return true;
        return new Promise((resolve) => {
          window.setTimeout(() => resolve(tryMountExisting()), 250);
        });
      })
      .then((ok) => {
        if (!ok) showFallback();
        return !!ok;
      })
      .catch((err) => {
        console.error('Communities module load failed', err);
        showFallback();
        return false;
      });
  };

  ns.openCommunities = function openCommunities(ctx = {}) {
    if (typeof ctx.showPage === 'function') {
      ctx.showPage('communities');
      return;
    }

    const doc = ctx.document || document;
    const home = doc.getElementById('homePage');
    const video = doc.getElementById('videoPage');
    const profile = doc.getElementById('profilePage');
    const communities = doc.getElementById('communitiesPage');

    if (home) home.classList.remove('active');
    if (video) video.style.display = 'none';
    if (profile) profile.style.display = 'none';
    if (communities) communities.style.display = 'block';

    ns.mountCommunities();
  };

  // Stable global trigger used by nav buttons.
  window.showCommunities = function showCommunities() {
    ns.openCommunities({ showPage: window.showPage, document });
  };
})();



