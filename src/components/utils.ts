import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// ── Smooth fade in from frame `start`, over `dur` frames ─────────────────────
export function useFadeIn(start = 0, dur = 8) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// ── Spring-based slide up from below ─────────────────────────────────────────
export function useSlideUp(startFrame = 0, distance = 40) {
  const frame = useCurrentFrame();
  const progress = spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: 18, stiffness: 120, mass: 0.8 },
  });
  return interpolate(progress, [0, 1], [distance, 0]);
}

// ── Scale spring pop ──────────────────────────────────────────────────────────
export function useScalePop(startFrame = 0) {
  const frame = useCurrentFrame();
  return spring({
    frame: frame - startFrame,
    fps: 30,
    config: { damping: 14, stiffness: 200, mass: 0.6 },
    from: 0.85,
    to: 1,
  });
}

// ── Count up from 0 to value ──────────────────────────────────────────────────
export function useCountUp(
  target: number,
  startFrame: number,
  duration: number
): number {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return Math.round(target * progress);
}

// ── Scene transition opacity ──────────────────────────────────────────────────
export function useSceneOpacity(
  inFrame: number,
  outFrame: number,
  fadeDur = 8
): number {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [inFrame, inFrame + fadeDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [outFrame - fadeDur, outFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
}

// ── Scene transition helper for snappy slides & scale ────────────────────────
export function useSceneTransition(
  inFrame: number,
  outFrame: number,
  transitionDur = 8
) {
  const frame = useCurrentFrame();
  const entryProgress = interpolate(frame, [inFrame, inFrame + transitionDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const exitProgress = interpolate(frame, [outFrame - transitionDur, outFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const opacity = entryProgress * (1 - exitProgress);
  const tx = interpolate(entryProgress, [0, 1], [300, 0]) + interpolate(exitProgress, [0, 1], [0, -300]);
  const scale = interpolate(entryProgress, [0, 1], [0.96, 1]) * interpolate(exitProgress, [0, 1], [1, 0.96]);

  return { opacity, tx, scale };
}

// ── Staggered children delay ──────────────────────────────────────────────────
export function staggerDelay(index: number, stagger = 6): number {
  return index * stagger;
}

// ── Linear interpolate between two values ────────────────────────────────────
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// ── Type-writer text reveal ───────────────────────────────────────────────────
export function useTypewriter(text: string, startFrame: number, charsPerFrame = 2): string {
  const frame = useCurrentFrame();
  const chars = Math.floor((frame - startFrame) * charsPerFrame);
  return text.slice(0, Math.max(0, chars));
}
