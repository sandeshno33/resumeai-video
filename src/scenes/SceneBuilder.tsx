import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";
import { COLORS, FONTS, COPY, TIMING } from "../config/config";
import { ResumeUI } from "../components/ResumeUI";
import { MOCK_RESUME } from "../config/config";

interface SceneBuilderProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneBuilder: React.FC<SceneBuilderProps> = ({ width, height, isPortrait, isSquare }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMING.SCENE_BUILDER;
  const sceneEnd = TIMING.SCENE_ATS;
  const sceneDuration = sceneEnd - TIMING.SCENE_BUILDER;

  // Scene in/out opacity
  const opacity = interpolate(
    frame,
    [TIMING.SCENE_BUILDER, TIMING.SCENE_BUILDER + 10, sceneEnd - 10, sceneEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Label pill entrance
  const labelY = interpolate(localFrame, [0, 14], [-20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Title entrance
  const titleY = interpolate(localFrame, [8, 22], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(localFrame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // UI card slide in
  const cardX = interpolate(localFrame, [14, 34], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardOp = interpolate(localFrame, [14, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing animation — which bullet is being typed
  const bulletIdx = Math.floor(localFrame / 32) % 3;
  const charFrame = localFrame % 32;
  const fullText = MOCK_RESUME.bullets[bulletIdx] || "";
  const typedChars = Math.min(fullText.length, Math.floor(charFrame * 1.8));
  const typingText = fullText.slice(0, typedChars);

  // AI badge pulse
  const badgeScale = spring({
    frame: localFrame - 20,
    fps: 30,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
    from: 0.8,
    to: 1,
  });

  // 1.5x Responsive Scales & Positions
  const layoutRow = !isPortrait && !isSquare;

  const uiScale = isPortrait ? 1.25 : isSquare ? 1.15 : 1.32;
  const labelSize = isPortrait ? 24 : isSquare ? 18 : 24;
  const titleSize = isPortrait ? 54 : isSquare ? 48 : 72;
  const subSize = isPortrait ? 28 : isSquare ? 24 : 33;
  const badgeSize = isPortrait ? 20 : isSquare ? 16 : 21;

  const containerPadding = isPortrait 
    ? `${height * 0.08}px ${width * 0.06}px`
    : isSquare 
      ? `${height * 0.08}px ${width * 0.07}px`
      : `0 ${width * 0.05}px`;

  const textMaxWidth = layoutRow ? width * 0.44 : width * 0.9;
  const layoutGap = isPortrait ? 48 : isSquare ? 32 : 0;

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
      {/* Left / Top: Copy */}
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
        {/* Label pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${COLORS.accentBlue}22`,
            border: `1px solid ${COLORS.accentBlue}55`,
            borderRadius: 100,
            padding: "6px 16px",
            transform: `translateY(${labelY}px)`,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: COLORS.accentBlue,
              boxShadow: `0 0 8px ${COLORS.accentBlue}`,
            }}
          />
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: labelSize,
              fontWeight: 600,
              color: COLORS.accentCyan,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {COPY.builder.label}
          </span>
        </div>

        {/* Title */}
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
          {COPY.builder.title}
        </div>

        {/* Sub */}
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: subSize,
            color: COLORS.textMuted,
            lineHeight: 1.5,
            opacity: titleOp,
          }}
        >
          {COPY.builder.sub}
        </div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${COLORS.accentGreen}18`,
            border: `1px solid ${COLORS.accentGreen}44`,
            borderRadius: 8,
            padding: "8px 16px",
            transform: `scale(${badgeScale})`,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 16 16" fill={COLORS.accentGreen}>
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.2 5.2l-3.7 3.7a.7.7 0 01-1 0L4.8 8.1a.7.7 0 011-1l1.2 1.2 3.2-3.2a.7.7 0 011 1z" />
          </svg>
          <span style={{ fontFamily: FONTS.body, fontSize: badgeSize, fontWeight: 500, color: COLORS.accentGreen }}>
            {COPY.builder.badge}
          </span>
        </div>
      </div>

      {/* Right / Bottom: UI Preview */}
      <div
        style={{
          transform: `translateX(${cardX}px)`,
          opacity: cardOp,
          flexShrink: 0,
        }}
      >
        <ResumeUI
          scale={uiScale}
          highlightBullet={bulletIdx}
          typingText={typingText}
          showAI={true}
        />
      </div>
    </div>
  );
};
