// analytics.js (improved GA4-friendly A/B helpers)
(function(global){
  const KEY = 'ab_variant';

  function read() {
    try { return localStorage.getItem(KEY); } catch(_) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch(_) {}
    return v;
  }
  function forcedFromURL() {
    try {
      const p = new URL(location.href).searchParams.get('v');
      return (p === 'A' || p === 'B') ? p : null;
    } catch(_) { return null; }
  }

  // Call this ON EACH VARIANT PAGE with its own letter: initFor('A' or 'B')
  function initFor(pageVariant) {
    const forced = forcedFromURL();
    let v = read();
    if (forced) v = write(forced);
    if (!v) v = write(pageVariant);

    if (global.gtag) {
      // Make sure this runs AFTER gtag('config', 'G-XXXX')
      global.gtag('set', 'user_properties', { ab_variant: v });
    }
    return v;
  }

  // Track CTA clicks with a minimal GA4-friendly payload
  function trackCTA(position) {
    const v = read() || 'A';
    if (!global.gtag) return;
    global.gtag('event', 'cta_click', {
      ab_variant: v,
      position: position || 'primary'
    });
  }

  // Optional: final conversion event
  function trackSignupComplete() {
    const v = read() || 'A';
    if (!global.gtag) return;
    global.gtag('event', 'signup_complete', { ab_variant: v });
  }

  global.ABTest = { initFor, trackCTA, trackSignupComplete };
})(window);
