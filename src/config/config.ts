// ─────────────────────────────────────────────────────────────────────────────
// RESUMEAI VIDEO — MASTER CONFIG
// Edit this file in Antigravity to change copy, timing, colors, features.
// All three aspect ratios share these tokens.
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "ResumeAI",
  tagline: "Build smarter. Get hired faster.",
  cta: "Start Free at cvai.dev",
  ctaUrl: "https://cvai.dev",
  logoText: "ResumeAI",
  accentWord: "AI", // word to highlight in logo
};

// ── COLORS ────────────────────────────────────────────────────────────────────
export const COLORS = {
  // Brand (warm dark tones matching logo)
  navyDeep:   "#1a0a0a",
  navyMid:    "#2d1117",
  navyLight:  "#4a1a2a",

  // Gradients (warm dark → orange matching logo)
  gradStart:  "#1a0a0a",
  gradMid:    "#3a1520",
  gradEnd:    "#e85d04",

  // Accent (logo orange → magenta → gold)
  accentBlue: "#e85d04",   // Primary orange (was blue)
  accentCyan: "#d4145a",   // Magenta/pink (was cyan)
  accentGreen:"#ffb703",   // Gold/amber (was green)

  // UI surfaces
  surface:    "rgba(255,255,255,0.06)",
  surfaceHov: "rgba(255,255,255,0.10)",
  border:     "rgba(255,255,255,0.12)",
  borderBright:"rgba(232,93,4,0.5)",

  // Text
  textWhite:  "#ffffff",
  textMuted:  "rgba(255,255,255,0.65)",
  textDim:    "rgba(255,255,255,0.35)",

  // Status
  green:      "#ffb703",
  red:        "#d4145a",
  yellow:     "#ffb703",
};

// ── TYPOGRAPHY ────────────────────────────────────────────────────────────────
export const FONTS = {
  display:  "'Sora', sans-serif",
  body:     "'DM Sans', sans-serif",
  mono:     "'JetBrains Mono', monospace",
};

// ── TIMING (in frames @ 30fps) ────────────────────────────────────────────────
export const FPS = 30;
export const DURATION_SEC = 22;
export const TOTAL_FRAMES = FPS * DURATION_SEC; // 660 frames

export const TIMING = {
  // Scene entry/exit (in frames)
  FADE_IN:   8,
  FADE_OUT:  8,
  SLIDE_DUR: 6,

  // Scene start frames (22 sec / 660 frames total)
  SCENE_HOOK:     0,    // 0–5s:   Stat hook — "7 seconds"
  SCENE_BUILDER:  150,  // 5–10s:  AI Resume Builder
  SCENE_ATS:      300,  // 10–14s: ATS Checker
  SCENE_RECRUITER:420,  // 14–18s: Recruiter Search
  SCENE_CTA:      540,  // 18–22s:  CTA
};

// ── COPY ──────────────────────────────────────────────────────────────────────
export const COPY = {
  hook: {
    stat:    "7",
    unit:    "seconds",
    context: "That's how long a recruiter spends on your resume.",
    sub:     "Make every second count.",
  },

  builder: {
    label:  "AI Resume Builder",
    title:  "From blank page to perfect resume",
    sub:    "AI writes your bullet points. You approve them.",
    badge:  "Free • Unlimited resumes",
  },

  ats: {
    label:  "ATS Checker",
    title:  "Beat the bots before humans see you",
    sub:    "73% of qualified candidates get filtered out. Not you.",
    badge:  "Tested on Workday · Greenhouse · Lever",
  },

  recruiter: {
    label:  "Recruiter Search",
    title:  "Real recruiters. Semantic search.",
    sub:    "\"EKS\" matches \"Kubernetes\". Hidden jobs found.",
    badge:  "3.2× more matches",
  },

  cta: {
    headline: "Your next job is one resume away.",
    sub:      "Free forever. No credit card.",
    button:   "Build my resume →",
    url:      "cvai.dev",
  },
};

// ── MOCK DATA (resume preview) ────────────────────────────────────────────────
export const MOCK_RESUME = {
  name:    "Alex Chen",
  title:   "Senior Software Engineer",
  email:   "alex@email.com",
  location:"San Francisco, CA",
  skills:  ["React", "Node.js", "AWS", "TypeScript", "Kubernetes"],
  bullets: [
    "Led migration of monolith to microservices, reducing latency by 40%",
    "Built CI/CD pipeline serving 200+ daily deployments",
    "Mentored team of 6 engineers across 3 time zones",
  ],
  atsScore:  87,
  matchScore:94,
};

// ── MOCK ATS RESULT ───────────────────────────────────────────────────────────
export const MOCK_ATS = {
  score:        87,
  passedChecks: ["ATS-compatible format", "Keywords matched", "Proper sections"],
  warnings:     ["Add measurable metrics", "Include LinkedIn URL"],
  keywords:     ["React", "TypeScript", "AWS", "CI/CD", "Kubernetes"],
};

// ── ASPECT RATIO VARIANTS ─────────────────────────────────────────────────────
export const COMPOSITIONS = {
  landscape: { id: "ResumeAI-16x9", width: 1920, height: 1080, label: "16:9 — YouTube / Display" },
  portrait:  { id: "ResumeAI-9x16", width: 1080, height: 1920, label: "9:16 — Shorts / Stories" },
  square:    { id: "ResumeAI-1x1",  width: 1080, height: 1080, label: "1:1 — Feed / Discovery" },
};

// ── NEW CONFIGS FOR NEPALI VO (37.52s) ─────────────────────────────────────────
export const DURATION_SEC_NEW = 37.52;
export const TOTAL_FRAMES_NEW = Math.ceil(FPS * DURATION_SEC_NEW); // 1126 frames

export const TIMING_NEW = {
  FADE_IN:   8,
  FADE_OUT:  8,
  SLIDE_DUR: 6,

  SCENE_HOOK:     0,    // 0s to 11.0s (329 frames)
  SCENE_FLEX:     329,  // 11.0s to 716 (12.9s)
  SCENE_STATS:    716,  // 23.9s to 960 (8.1s)
  SCENE_CTA:      960,  // 32.0s to 1126 (5.5s)
};

export const COPY_NEW = {
  hook: {
    main: "Struggling to find a perfect job on LinkedIn?",
    sub:  "Isn't there an easier shortcut?",
  },
  flex: {
    atsLabel: "ATS OPTIMIZER",
    atsTitle: "Boost your resume to the next level",
    atsSub:   "Fix missing keywords automatically.",
    extLabel: "CHROME EXTENSION",
    extTitle: "Autofills & applies on LinkedIn",
    extSub:   "Even while you sleep!",
    boardLabel: "APPLICATION TRACKER",
    boardTitle: "Instantly tracked in your dashboard",
    boardSub:   "Watch the auto-apply bot build your pipeline.",
  },
  stats: {
    title: "Real Results, Pure Efficiency",
    applications: "Applications / week",
    interviews: "Interviews / month",
    hoursLost: "Hours lost",
  },
  cta: {
    title: "Resume AI",
    sub: "Build smarter. Get hired faster.",
    btn: "Try Free at cvai.dev",
  }
};

export const COMPOSITIONS_NEW = {
  landscape: { id: "ResumeAI-Nepali-16x9", width: 1920, height: 1080, label: "16:9 — Nepali VO (English Text)" },
  portrait:  { id: "ResumeAI-Nepali-9x16", width: 1080, height: 1920, label: "9:16 — Nepali VO (English Text)" },
  square:    { id: "ResumeAI-Nepali-1x1",  width: 1080, height: 1080, label: "1:1 — Nepali VO (English Text)" },
};

