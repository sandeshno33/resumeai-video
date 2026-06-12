import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONTS, COPY, TIMING } from "../config/config";
import { ATSUI } from "../components/ATSUI";

interface SceneATSProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneATS: React.FC<SceneATSProps> = ({ width, height, isPortrait, isSquare }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMING.SCENE_ATS;
  const sceneEnd = TIMING.SCENE_RECRUITER;

  const opacity = interpolate(
    frame,
    [TIMING.SCENE_ATS, TIMING.SCENE_ATS + 10, sceneEnd - 10, sceneEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const labelOp = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleOp = interpolate(localFrame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleY = interpolate(localFrame, [8, 22], [24, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOp = interpolate(localFrame, [16, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cardY = interpolate(localFrame, [16, 34], [50, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Score ring animates in
  const scoreProgress = interpolate(localFrame, [24, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 1.5x Responsive Scales & Positions
  const layoutRow = !isPortrait && !isSquare;

  const uiScale = isPortrait ? 1.2 : isSquare ? 1.1 : 1.26;
  const labelSize = isPortrait ? 24 : isSquare ? 18 : 24;
  const titleSize = isPortrait ? 50 : isSquare ? 44 : 66;
  const subSize = isPortrait ? 26 : isSquare ? 23 : 31;
  const calloutNumSize = isPortrait ? 58 : isSquare ? 52 : 72;
  const calloutTextSize = isPortrait ? 20 : isSquare ? 18 : 24;
  const calloutMaxWidth = isPortrait ? 200 : isSquare ? 180 : 240;
  const badgeSize = isPortrait ? 18 : isSquare ? 15 : 19;

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
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${COLORS.accentGreen}1a`,
            border: `1px solid ${COLORS.accentGreen}44`,
            borderRadius: 100,
            padding: "6px 16px",
            opacity: labelOp,
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.accentGreen, boxShadow: `0 0 8px ${COLORS.accentGreen}` }} />
          <span style={{ fontFamily: FONTS.body, fontSize: labelSize, fontWeight: 600, color: COLORS.accentGreen, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {COPY.ats.label}
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
          {COPY.ats.title}
        </div>

        <div style={{ fontFamily: FONTS.body, fontSize: subSize, color: COLORS.textMuted, lineHeight: 1.5, opacity: titleOp }}>
          {COPY.ats.sub}
        </div>

        {/* Stat callout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: titleOp,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: calloutNumSize,
              fontWeight: 800,
              color: COLORS.red,
              lineHeight: 1,
            }}
          >
            73%
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: calloutTextSize,
              color: COLORS.textMuted,
              lineHeight: 1.4,
              maxWidth: calloutMaxWidth,
            }}
          >
            filtered before a human sees them
          </div>
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: badgeSize,
            color: COLORS.textDim,
            opacity: titleOp,
          }}
        >
          {COPY.ats.badge}
        </div>
      </div>

      {/* ATS UI Card */}
      <div
        style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardOp,
          flexShrink: 0,
        }}
      >
        <ATSUI scale={uiScale} scoreProgress={scoreProgress} />
      </div>
    </div>
  );
};
