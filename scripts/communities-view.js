(function () {
  const ns = window.SifakaPageViews = window.SifakaPageViews || {};

  ns.mountCommunities = function mountCommunities() {
    try {
      if (window.SifakaCommunities && typeof window.SifakaCommunities.mount === 'function') {
        window.SifakaCommunities.mount();
        return Promise.resolve(true);
      }
    } catch (err) {
      console.error('Communities mount failed', err);
    }

    return import('./communities/boot.js')
      .then(() => {
        if (window.SifakaCommunities && typeof window.SifakaCommunities.mount === 'function') {
          window.SifakaCommunities.mount();
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.error('Communities module load failed', err);
        const root = document.getElementById('communitiesRoot');
        if (root && !root.innerHTML.trim()) {
          root.innerHTML = '<div class="live-grid-loading" style="padding:1rem;">Unable to load Communities right now.</div>';
        }
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
