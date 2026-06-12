import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";
import { COLORS, FONTS, COPY, TIMING } from "../config/config";
import { RecruiterUI } from "../components/RecruiterUI";

interface SceneRecruiterProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneRecruiter: React.FC<SceneRecruiterProps> = ({ width, height, isPortrait, isSquare }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMING.SCENE_RECRUITER;
  const sceneEnd = TIMING.SCENE_CTA;

  const opacity = interpolate(
    frame,
    [TIMING.SCENE_RECRUITER, TIMING.SCENE_RECRUITER + 10, sceneEnd - 10, sceneEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const labelOp = interpolate(localFrame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOp = interpolate(localFrame, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY  = interpolate(localFrame, [8, 22], [24, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOp = interpolate(localFrame, [14, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardX  = interpolate(localFrame, [14, 32], [60, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Results cards cascade in
  const resultsVisible = Math.min(3, Math.floor((localFrame - 26) / 12) + 1);

  const matchBadgeScale = spring({
    frame: localFrame - 30,
    fps: 30,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
    from: 0.6,
    to: 1,
  });

  // 1.5x Responsive Scales & Positions
  const layoutRow = !isPortrait && !isSquare;

  const uiScale = isPortrait ? 1.22 : isSquare ? 1.12 : 1.29;
  const labelSize = isPortrait ? 24 : isSquare ? 18 : 24;
  const titleSize = isPortrait ? 50 : isSquare ? 44 : 66;
  const subSize = isPortrait ? 26 : isSquare ? 23 : 31;
  const badgeNumSize = isPortrait ? 46 : isSquare ? 42 : 54;
  const badgeTextSize = isPortrait ? 18 : isSquare ? 16 : 21;
  const badgeMaxWidth = isPortrait ? 160 : isSquare ? 140 : 180;

  const containerPadding = isPortrait 
    ? `${height * 0.07}px ${width * 0.06}px`
    : isSquare 
      ? `${height * 0.08}px ${width * 0.07}px`
      : `0 ${width * 0.05}px`;

  const textMaxWidth = layoutRow ? width * 0.44 : width * 0.9;
  const layoutGap = isPortrait ? 36 : isSquare ? 32 : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: layoutRow ? "row" : "column",
        alignItems: "center",
        justifyContent: layoutRow ? "space-between" : "center",
        padding: containerPadding,
        opacity,
        gap: layoutGap,
      }}
    >
      {/* Copy */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: textMaxWidth,
          textAlign: layoutRow ? "left" : "center",
          alignItems: layoutRow ? "flex-start" : "center",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${COLORS.accentCyan}1a`,
            border: `1px solid ${COLORS.accentCyan}44`,
            borderRadius: 100,
            padding: "6px 16px",
            opacity: labelOp,
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accentCyan, boxShadow: `0 0 8px ${COLORS.accentCyan}` }} />
          <span style={{ fontFamily: FONTS.body, fontSize: labelSize, fontWeight: 600, color: COLORS.accentCyan, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {COPY.recruiter.label}
          </span>
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: titleSize,
            fontWeight: 700,
            color: COLORS.textWhite,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
          }}
        >
          {COPY.recruiter.title}
        </div>

        <div style={{ fontFamily: FONTS.body, fontSize: subSize, color: COLORS.textMuted, lineHeight: 1.5, opacity: titleOp }}>
          {COPY.recruiter.sub}
        </div>

        {/* 3.2x match badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${COLORS.accentCyan}12`,
            border: `1px solid ${COLORS.accentCyan}33`,
            borderRadius: 10,
            padding: "12px 20px",
            transform: `scale(${matchBadgeScale})`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: badgeNumSize,
              fontWeight: 800,
              color: COLORS.accentCyan,
              lineHeight: 1,
            }}
          >
            3.2×
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: badgeTextSize, color: COLORS.textMuted, lineHeight: 1.4, maxWidth: badgeMaxWidth }}>
            more relevant job matches
          </div>
        </div>
      </div>

      {/* Recruiter UI */}
      <div
        style={{
          transform: `translateX(${cardX}px)`,
          opacity: cardOp,
          flexShrink: 0,
        }}
      >
        <RecruiterUI
          scale={uiScale}
          searchQuery="React developer with Kubernetes"
          resultsVisible={Math.max(1, resultsVisible)}
        />
      </div>
    </div>
  );
};
