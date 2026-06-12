import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";
import { COLORS, FONTS, COPY, TIMING } from "../config/config";

interface SceneHookProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneHook: React.FC<SceneHookProps> = ({ width, height, isPortrait, isSquare }) => {
  const frame = useCurrentFrame();
  const isActive = frame < TIMING.SCENE_BUILDER;
  const sceneEnd = TIMING.SCENE_BUILDER;

  // Big number entrance
  const numScale = spring({
    frame: frame - 4,
    fps: 30,
    config: { damping: 12, stiffness: 180, mass: 1 },
    from: 0.4,
    to: 1,
  });

  const numOpacity = interpolate(frame, [4, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Supporting text stagger
  const unitOpacity = interpolate(frame, [18, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const unitY = interpolate(frame, [18, 30], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const contextOpacity = interpolate(frame, [28, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const contextY = interpolate(frame, [28, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [44, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tick marks — 7 ticks appearing one by one
  const ticksVisible = Math.min(7, Math.floor((frame - 10) * 0.8));

  // Scene fade out
  const sceneOpacity = interpolate(frame, [sceneEnd - 10, sceneEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const numFontSize  = isPortrait ? 220 : isSquare ? 230 : 280;
  const unitFontSize = isPortrait ? 56  : isSquare ? 60  : 72;
  const ctxFontSize  = isPortrait ? 32  : isSquare ? 34  : 40;
  const subFontSize  = isPortrait ? 24  : isSquare ? 26  : 28;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneOpacity,
        gap: 0,
      }}
    >
      {/* Tick marks row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, height: 40, alignItems: "flex-end" }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            style={{
              width: isPortrait ? 18 : 22,
              height: i === 6 ? 40 : 28,
              borderRadius: 3,
              background: i < ticksVisible
                ? (i === 6
                    ? `linear-gradient(180deg, ${COLORS.accentCyan}, ${COLORS.accentBlue})`
                    : COLORS.accentBlue)
                : COLORS.border,
              opacity: i < ticksVisible ? 1 : 0.3,
              transition: "all 0.1s",
            }}
          />
        ))}
      </div>

      {/* Big "7" */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize:   numFontSize,
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          background: `linear-gradient(135deg, ${COLORS.textWhite} 0%, ${COLORS.accentCyan} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${numScale})`,
          opacity:   numOpacity,
        }}
      >
        {COPY.hook.stat}
      </div>

      {/* "seconds" */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize:   unitFontSize,
          fontWeight: 700,
          color: COLORS.accentCyan,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: unitOpacity,
          transform: `translateY(${unitY}px)`,
          marginTop: 8,
        }}
      >
        {COPY.hook.unit}
      </div>

      {/* Divider */}
      <div
        style={{
          width:  isPortrait ? 180 : 240,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.accentBlue}, transparent)`,
          margin: "28px 0",
          opacity: contextOpacity,
        }}
      />

      {/* Context line */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize:   ctxFontSize,
          fontWeight: 400,
          color: COLORS.textWhite,
          textAlign: "center",
          maxWidth: isPortrait ? width * 0.85 : width * 0.55,
          opacity: contextOpacity,
          transform: `translateY(${contextY}px)`,
          lineHeight: 1.4,
        }}
      >
        {COPY.hook.context}
      </div>

      {/* Sub line */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize:   subFontSize,
          fontWeight: 500,
          color: COLORS.accentCyan,
          marginTop: 14,
          opacity: subOpacity,
          letterSpacing: "0.02em",
        }}
      >
        {COPY.hook.sub}
      </div>
    </div>
  );
};
