import React from "react";
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";
import { COLORS, FONTS, COPY, TIMING, TOTAL_FRAMES } from "../config/config";
import { Logo } from "../components/Logo";

interface SceneCTAProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneCTA: React.FC<SceneCTAProps> = ({ width, height, isPortrait, isSquare }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - TIMING.SCENE_CTA;
  const sceneEnd = TOTAL_FRAMES;

  const opacity = interpolate(
    frame,
    [TIMING.SCENE_CTA, TIMING.SCENE_CTA + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Logo
  const logoScale = spring({
    frame: localFrame - 2,
    fps: 30,
    config: { damping: 14, stiffness: 160, mass: 0.8 },
    from: 0.7,
    to: 1,
  });
  const logoOp = interpolate(localFrame, [2, 14], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Headline
  const headOp = interpolate(localFrame, [12, 24], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const headY = interpolate(localFrame, [12, 26], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Sub
  const subOp = interpolate(localFrame, [20, 32], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Button
  const btnScale = spring({
    frame: localFrame - 26,
    fps: 30,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
    from: 0.7,
    to: 1,
  });
  const btnOp = interpolate(localFrame, [26, 38], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // URL
  const urlOp = interpolate(localFrame, [34, 44], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Free badge
  const freeOp = interpolate(localFrame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Pulse rings on button
  const pulseScale = interpolate(localFrame % 30, [0, 30], [1, 1.6]);
  const pulseOp    = interpolate(localFrame % 30, [0, 30], [0.4, 0]);

  const headSize = isPortrait ? 62 : isSquare ? 50 : 64;
  const subSize  = isPortrait ? 28 : isSquare ? 23 : 26;
  const btnSize  = isPortrait ? 30 : isSquare ? 24 : 28;
  const urlSize  = isPortrait ? 22 : isSquare ? 18 : 20;
  const logoSc   = isPortrait ? 1.4 : isSquare ? 1.05 : 1.2;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        gap: 0,
        textAlign: "center",
        padding: `0 ${width * 0.08}px`,
      }}
    >
      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOp,
          marginBottom: isPortrait ? 40 : 32,
        }}
      >
        <Logo scale={logoSc} showTagline={true} />
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: headSize,
          fontWeight: 700,
          color: COLORS.textWhite,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          maxWidth: isPortrait ? width * 0.88 : width * 0.65,
          opacity: headOp,
          transform: `translateY(${headY}px)`,
          marginBottom: 20,
        }}
      >
        {COPY.cta.headline}
      </div>

      {/* Sub */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: subSize,
          color: COLORS.textMuted,
          marginBottom: 40,
          opacity: subOp,
        }}
      >
        {COPY.cta.sub}
      </div>

      {/* CTA Button with pulse */}
      <div style={{ position: "relative", marginBottom: 24, opacity: btnOp }}>
        {/* Pulse ring */}
        <div
          style={{
            position: "absolute",
            inset: -8,
            borderRadius: 100,
            border: `2px solid ${COLORS.accentBlue}`,
            transform: `scale(${pulseScale})`,
            opacity: pulseOp,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
            borderRadius: 100,
            padding: isPortrait ? "22px 56px" : "18px 48px",
            fontFamily: FONTS.display,
            fontSize: btnSize,
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.01em",
            transform: `scale(${btnScale})`,
            cursor: "pointer",
            boxShadow: `0 8px 32px ${COLORS.accentBlue}55`,
          }}
        >
          {COPY.cta.button}
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: urlSize,
          color: COLORS.accentCyan,
          opacity: urlOp,
          letterSpacing: "0.04em",
          marginBottom: 16,
        }}
      >
        {COPY.cta.url}
      </div>

      {/* Free badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: `${COLORS.accentGreen}18`,
          border: `1px solid ${COLORS.accentGreen}44`,
          borderRadius: 100,
          padding: "8px 20px",
          opacity: freeOp,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 16 16" fill={COLORS.accentGreen}>
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.2 5.2l-3.7 3.7a.7.7 0 01-1 0L4.8 8.1a.7.7 0 011-1l1.2 1.2 3.2-3.2a.7.7 0 011 1z" />
        </svg>
        <span style={{ fontFamily: FONTS.body, fontSize: isPortrait ? 20 : 16, fontWeight: 500, color: COLORS.accentGreen }}>
          Free to start • No credit card
        </span>
      </div>
    </div>
  );
};
