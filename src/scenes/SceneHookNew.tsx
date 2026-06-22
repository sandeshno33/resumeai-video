import React from "react";
import { useCurrentFrame, interpolate, spring, Easing, staticFile } from "remotion";
import { COLORS, FONTS, TIMING_NEW, COPY_NEW } from "../config/config";
import { ApplicationTrackerHook } from "../components/ApplicationTrackerHook";
import { useFadeIn, useSlideUp, useSceneTransition } from "../components/utils";

interface SceneProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneHookNew: React.FC<SceneProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  const sceneStart = TIMING_NEW.SCENE_HOOK;
  const sceneEnd = TIMING_NEW.SCENE_FLEX; // 329

  // ─── PART A: THE STRUGGLE (frame 0 to 258) ───
  const isPartA = frame < 258;
  
  // Part A transition (entry from 0 to 8, exit from 250 to 258)
  const partAEntryProgress = interpolate(frame, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const partAExitProgress = interpolate(frame, [250, 258], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const partAOpacity = partAEntryProgress * (1 - partAExitProgress);
  const partATx = interpolate(partAEntryProgress, [0, 1], [300, 0]) + interpolate(partAExitProgress, [0, 1], [0, -300]);
  const partAScale = interpolate(partAEntryProgress, [0, 1], [0.96, 1]) * interpolate(partAExitProgress, [0, 1], [1, 0.96]);

  // Part A Text animations
  const text1Op = useFadeIn(10, 12);
  const text1Y = useSlideUp(10, 20);

  const text2Op = useFadeIn(90, 12);
  const text2Y = useSlideUp(90, 20);

  // Animation for the Application tracker
  const trackerOp = useFadeIn(25, 12);
  const trackerY = useSlideUp(25, 30);

  // ─── PART B: INTRODUCING RESUME AI (frame 258 to 329) ───
  const isPartB = frame >= 258;

  // Part B transition (entry from 258 to 266, exit from 321 to 329)
  const partBEntryProgress = interpolate(frame, [258, 266], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const partBExitProgress = interpolate(frame, [321, 329], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const partBOpacity = partBEntryProgress * (1 - partBExitProgress);
  const partBTx = interpolate(partBEntryProgress, [0, 1], [300, 0]) + interpolate(partBExitProgress, [0, 1], [0, -300]);
  const partBScale = interpolate(partBEntryProgress, [0, 1], [0.96, 1]) * interpolate(partBExitProgress, [0, 1], [1, 0.96]);

  // Logo Scale Spring
  const logoSpring = spring({
    frame: frame - 258,
    fps: 30,
    config: { damping: 11, stiffness: 180 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1.3]); // slightly larger centered logo

  // Text slide-up spring
  const textProgress = spring({
    frame: frame - 264,
    fps: 30,
    config: { damping: 14, stiffness: 150 },
  });
  const textOp = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [24, 0]);

  const isRow = !isPortrait && !isSquare;

  // Responsive sizes
  const titleSize = isPortrait ? 52 : isSquare ? 48 : 64;
  const subSize = isPortrait ? 28 : isSquare ? 24 : 32;
  const trackerScale = isPortrait ? 1.4 : isSquare ? 1.3 : 1.55;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* ═══════════ PART A: THE HOOK STRUGGLE ═══════════ */}
      {isPartA && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: isRow ? "row" : "column",
            alignItems: "center",
            justifyContent: isRow ? "space-between" : "center",
            padding: isRow ? `0 ${width * 0.08}px` : `0 ${width * 0.05}px`,
            opacity: partAOpacity,
            transform: `translateX(${partATx}px) scale(${partAScale})`,
            gap: isPortrait ? 60 : isSquare ? 40 : 0,
          }}
        >
          {/* Left Column (Text) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: isRow ? width * 0.45 : width * 0.9,
              textAlign: isRow ? "left" : "center",
              alignItems: isRow ? "flex-start" : "center",
            }}
          >
            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: titleSize,
                fontWeight: 700,
                color: COLORS.textWhite,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                opacity: text1Op,
                transform: `translateY(${text1Y}px)`,
              }}
            >
              {COPY_NEW.hook.main}
            </h1>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: subSize,
                fontWeight: 500,
                color: COLORS.accentCyan,
                opacity: text2Op,
                transform: `translateY(${text2Y}px)`,
                lineHeight: 1.3,
              }}
            >
              {COPY_NEW.hook.sub}
            </p>
          </div>

          {/* Right Column (Application Tracker) */}
          <div
            style={{
              opacity: trackerOp,
              transform: `translateY(${trackerY}px)`,
              flexShrink: 0,
            }}
          >
            <ApplicationTrackerHook scale={trackerScale} frame={frame} />
          </div>
        </div>
      )}

      {/* ═══════════ PART B: INTRODUCING RESUME AI ═══════════ */}
      {isPartB && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: partBOpacity,
            transform: `translateX(${partBTx}px) scale(${partBScale})`,
            gap: 28,
            padding: `0 ${width * 0.05}px`,
          }}
        >
          {/* Glowing App Logo */}
          <div style={{ transform: `scale(${logoScale})`, display: "flex", justifyContent: "center" }}>
            <img
              src={staticFile("logo.webp")}
              style={{
                width: 120,
                height: 120,
                objectFit: "contain",
                borderRadius: 24,
                boxShadow: `0 24px 60px rgba(232, 93, 4, 0.35), 0 0 0 1px rgba(255,255,255,0.1)`,
              }}
              alt="Resume AI Logo"
            />
          </div>

          {/* On-screen text "Introducing Resume AI" */}
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: isPortrait ? 58 : isSquare ? 64 : 84,
              fontWeight: 800,
              color: COLORS.textWhite,
              textAlign: "center",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: 0,
              opacity: textOp,
              transform: `translateY(${textY}px)`,
            }}
          >
            Introducing{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Resume AI
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: isPortrait ? 24 : isSquare ? 26 : 30,
              color: COLORS.textMuted,
              textAlign: "center",
              margin: 0,
              opacity: textOp,
              transform: `translateY(${textY}px)`,
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Build smarter. Get hired faster.
          </p>
        </div>
      )}
    </div>
  );
};
