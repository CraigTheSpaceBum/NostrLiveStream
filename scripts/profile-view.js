(function () {
  const ns = window.SifakaPageViews = window.SifakaPageViews || {};

  ns.prepareProfileLayout = function prepareProfileLayout(ctx = {}) {
    const qs = ctx.qs || ((sel, p) => (p || document).querySelector(sel));
    const home = qs('#homePage');
    const video = qs('#videoPage');
    const profile = qs('#profilePage');
    const communities = qs('#communitiesPage');
    const messages = qs('#messagesPage');
    const faq = qs('#faqPage');

    if (typeof ctx.setActiveViewerAddress === 'function') ctx.setActiveViewerAddress('');

    if (home) home.classList.remove('active');
    if (video) video.style.display = 'none';
    if (profile) profile.style.display = 'block';
    if (communities) communities.style.display = 'none';
    if (messages) messages.style.display = 'none';
    if (faq) faq.style.display = 'none';

    if (typeof ctx.stopHeroCycle === 'function') ctx.stopHeroCycle();
    if (typeof ctx.stopAllAudio === 'function') ctx.stopAllAudio('profile');
  };
})();

