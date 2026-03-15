(function () {
  const KEY = 'sifaka_theme_v1';
  const root = document.documentElement;

  function normalize(theme) {
    const val = String(theme || '').trim().toLowerCase();
    if (val === 'light' || val === 'midnight' || val === 'dark') return val;
    return 'dark';
  }

  function applyTheme(theme, persist = true) {
    const t = normalize(theme);
    if (t === 'dark') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', t);
    if (persist) {
      try { localStorage.setItem(KEY, t); } catch (_) {}
    }
    return t;
  }

  function currentTheme() {
    return normalize(root.getAttribute('data-theme') || 'dark');
  }

  function cycleTheme() {
    const order = ['dark', 'midnight', 'light'];
    const cur = currentTheme();
    const idx = order.indexOf(cur);
    const next = order[(idx + 1) % order.length];
    return applyTheme(next, true);
  }

  window.SifakaTheme = {
    apply: applyTheme,
    current: currentTheme,
    cycle: cycleTheme
  };

  window.setSifakaTheme = applyTheme;

  document.addEventListener('DOMContentLoaded', () => {
    let saved = 'dark';
    try { saved = localStorage.getItem(KEY) || 'dark'; } catch (_) {}
    applyTheme(saved, false);
  });
})();
