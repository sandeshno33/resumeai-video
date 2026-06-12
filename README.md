# ResumeAI — Remotion Video Project

15-second Google Ads video in **three aspect ratios**: 16:9 · 9:16 · 1:1 at 1080p.

---

## Quick Start

```bash
# Install dependencies
npm install

# Open Remotion Studio (live preview)
npm start

# Preview a specific composition
# In Studio, select from the dropdown:
#   ResumeAI-16x9  (1920×1080)
#   ResumeAI-9x16  (1080×1920)
#   ResumeAI-1x1   (1080×1080)

# Render all three
npm run build:all
```

Rendered files land in `out/`.

---

## Project Structure

```
resumeai-video/
├── src/
│   ├── config/
│   │   └── config.ts          ← ALL editable tokens live here
│   ├── components/
│   │   ├── Background.tsx     ← Animated gradient + grid background
│   │   ├── Logo.tsx           ← ResumeAI logo with gradient AI wordmark
│   │   ├── ResumeUI.tsx       ← Hi-fi resume builder UI replica
│   │   ├── ATSUI.tsx          ← ATS checker UI with animated score ring
│   │   ├── RecruiterUI.tsx    ← Recruiter semantic search UI
│   │   └── utils.ts           ← Animation hooks (useFadeIn, useSlideUp, etc.)
│   ├── scenes/
│   │   ├── SceneHook.tsx      ← Scene 1: "7 seconds" stat hook (0–3s)
│   │   ├── SceneBuilder.tsx   ← Scene 2: AI Resume Builder demo (3–7s)
│   │   ├── SceneATS.tsx       ← Scene 3: ATS Checker (7–10s)
│   │   ├── SceneRecruiter.tsx ← Scene 4: Recruiter Search (10–13s)
│   │   └── SceneCTA.tsx       ← Scene 5: CTA finale (13–15s)
│   ├── compositions/
│   │   └── ResumeAIVideo.tsx  ← Master composition (composes all scenes)
│   └── Root.tsx               ← Remotion root — registers all 3 compositions
├── VOICEOVER_SCRIPT.md        ← Timed VO script + music brief
├── package.json
└── tsconfig.json
```

---

## Antigravity Editing Guide

**Everything is parameterised in `src/config/config.ts`.**

### Change copy
```ts
export const COPY = {
  hook: { stat: "7", unit: "seconds", context: "..." },
  builder: { title: "...", sub: "...", badge: "..." },
  // etc.
};
```

### Change colors
```ts
export const COLORS = {
  accentBlue: "#0d6efd",   // ← change to your brand color
  accentCyan: "#00d4ff",
  // etc.
};
```

### Change timing (frames @ 30fps)
```ts
export const TIMING = {
  SCENE_HOOK:      0,    // Scene 1 start frame
  SCENE_BUILDER:   90,   // Scene 2 start frame (= 3 seconds)
  SCENE_ATS:       210,  // Scene 3 start frame (= 7 seconds)
  SCENE_RECRUITER: 300,  // Scene 4 start frame (= 10 seconds)
  SCENE_CTA:       390,  // Scene 5 start frame (= 13 seconds)
};
```
Adjust these to rebalance scene durations. Make sure they add up to ≤ TOTAL_FRAMES (450).

### Change mock UI data
```ts
export const MOCK_RESUME = { name: "Alex Chen", ... };
export const MOCK_ATS    = { score: 87, ... };
```

### Change duration
```ts
export const DURATION_SEC  = 15;   // change to 30 for a 30s version
export const TOTAL_FRAMES  = FPS * DURATION_SEC;
```

---

## Adding the Voiceover

1. Record audio per `VOICEOVER_SCRIPT.md`
2. Export as `voiceover.wav` (48kHz, 24-bit)
3. Place at `src/audio/voiceover.wav`
4. In `src/compositions/ResumeAIVideo.tsx`, add:

```tsx
import { Audio, staticFile } from "remotion";
// Inside the AbsoluteFill:
<Audio src={staticFile("audio/voiceover.wav")} />
```

---

## Render Specs (Google Ads)

| Format  | Composition ID  | Size       | Use                          |
|---------|-----------------|------------|------------------------------|
| 16:9    | ResumeAI-16x9   | 1920×1080  | YouTube pre-roll, Display    |
| 9:16    | ResumeAI-9x16   | 1080×1920  | YouTube Shorts, Stories      |
| 1:1     | ResumeAI-1x1    | 1080×1080  | Discovery, Feed ads          |

All render at 30fps, H.264, CRF 18 (high quality). Adjust `--crf` in package.json scripts if file size matters.

---

## Google Ads Requirements Checklist

- [x] ≤15 seconds (15.0s exactly)
- [x] 1080p resolution
- [x] H.264 codec
- [x] All three aspect ratios
- [x] No copyrighted music (use licensed track per VO script)
- [ ] Add voiceover audio (see above)
- [ ] Upload to Google Ads asset library as separate assets per format
