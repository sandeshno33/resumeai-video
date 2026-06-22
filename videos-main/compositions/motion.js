// motion.js — Apple-grade easing & timing presets for the Resume AI marketing video.
//
// Why this exists:
//   Apple's universal motion language is springs (SwiftUI's spring(0.55, 0.825) default),
//   not naked cubic-beziers. Using inconsistent eases across scenes is the #1 reason
//   AI-built videos look "smoothed Bootstrap" instead of Cupertino-grade.
//
// Rules for using these:
//   1. Pick a duration FIRST, then a bounce (ease) preset. Never the reverse.
//   2. Springs > smooth eases for 80% of motion (cards landing, badges, popovers).
//   3. Counters/numbers always use `settle` (power4.out) — they decelerate slowly.
//   4. Camera pushes always use `smoothInOut` — never bounce camera moves.
//   5. Stagger 60-120ms between siblings; never land >2 elements simultaneously.
//
// References (see Animation Bible in plan):
//   - WWDC23 "Animate with springs" — duration-first, bounce-second philosophy
//   - SwiftUI spring(response: 0.55, dampingFraction: 0.825) is the gold standard
//   - 0% bounce = brisk, 15% = UI default, 30% = success/badge, 40%+ = playful only

(function () {
  const M = {
    // ─── Spring eases (use these MOST of the time) ─────────────────────────
    // Maps to SwiftUI spring bounce values. Higher = more overshoot.
    springSoft:   "back.out(1.05)",  // ~0%  bounce — smooth, deliberate
    springBrisk:  "back.out(1.2)",   // ~15% bounce — UI default (cards, tiles)
    springLively: "back.out(1.7)",   // ~30% bounce — badges, success moments
    springPop:    "back.out(2.0)",   // peak emphasis — match%, counters flashing

    // ─── Smooth eases (page transitions, camera moves, settles) ────────────
    smoothOut:    "power3.out",      // entrances without bounce
    smoothInOut:  "power2.inOut",    // page slides, camera dolly
    settle:       "power4.out",      // numbers, hero reveals — slow decel
    settleLong:   "expo.out",        // hero counter reveals (very slow tail)

    // ─── Standard durations (seconds) ──────────────────────────────────────
    // Pair with eases above. Don't invent durations — pick from this scale.
    micro:        0.30,   // badges, icons, color shifts
    ui:           0.50,   // cards, tiles entering
    uiSlow:       0.65,   // popovers, sheets, larger panels
    hero:         0.85,   // logos, headlines, big reveals
    counter:      1.20,   // number counters
    counterSlow:  1.40,   // gauge sweeps, score reveals
    camera:       1.50,   // push/dolly/zoom

    // ─── Stagger intervals (seconds) ───────────────────────────────────────
    staggerFast:    0.04,   // letters, badges
    staggerUI:      0.08,   // sibling cards (job listings)
    staggerSlow:    0.10,   // stat tiles (4 in a row, want emphasis on each)
    staggerWave:    0.03,   // sidebar nav reveal (very fast wave)
    staggerCounter: 0.10,   // counter ticks 0->X, offset so they don't compete

    // ─── Initial offset rule ───────────────────────────────────────────────
    // First animation in a scene should start at 0.15-0.25s, not t=0.
    // The brain needs a beat to register the cut before motion starts.
    sceneEntry: 0.20,
  };

  // ─── Counter helper: tween a number with .innerText ────────────────────
  // Usage: window.__motion.counter("#score", 0, 89, { duration: 1.3 });
  M.counter = function (target, from, to, opts) {
    opts = opts || {};
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    const obj = { v: from };
    el.textContent = String(Math.round(from));
    return gsap.to(obj, {
      v: to,
      duration: opts.duration || M.counter,
      ease: opts.ease || M.settle,
      onUpdate: function () {
        el.textContent = String(Math.round(obj.v));
      },
    });
  };

  // ─── Push: subtle camera-style scale (used at end of most scenes) ───────
  // Apple promo videos always end a scene with a slow ~2% scale push to feel "settled."
  M.push = function (target, opts) {
    opts = opts || {};
    return gsap.to(target, {
      scale: opts.to || 1.02,
      duration: opts.duration || M.camera,
      ease: M.smoothInOut,
      transformOrigin: opts.origin || "50% 50%",
    });
  };

  // ─── Pulse: subtle scale-up-and-back for emphasis ──────────────────────
  // Used on CTAs, success badges, "this just changed" moments.
  M.pulse = function (target, opts) {
    opts = opts || {};
    const peak = opts.peak || 1.04;
    return gsap.timeline()
      .to(target, { scale: peak, duration: 0.18, ease: M.springLively, transformOrigin: opts.origin || "50% 50%" })
      .to(target, { scale: 1.00, duration: 0.22, ease: M.smoothOut }, ">");
  };

  // ─── Page slide-in from a side (for scene transitions in root index.html) ─
  M.slideInFrom = function (target, dir, opts) {
    opts = opts || {};
    const map = { right: { x: 80 }, left: { x: -80 }, top: { y: -60 }, bottom: { y: 60 } };
    const from = map[dir] || map.right;
    return gsap.from(target, Object.assign({
      duration: opts.duration || M.ui,
      ease: M.springBrisk,
      opacity: 0,
    }, from));
  };

  window.__motion = M;
})();
