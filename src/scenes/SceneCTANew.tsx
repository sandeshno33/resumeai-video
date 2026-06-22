import React from "react";
import { useCurrentFrame, interpolate, spring, Easing, staticFile } from "remotion";
import { COLORS, FONTS, TIMING_NEW, COPY_NEW, BRAND } from "../config/config";
import { useFadeIn, useSlideUp, useSceneTransition } from "../components/utils";

interface SceneProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneCTANew: React.FC<SceneProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  const sceneStart = TIMING_NEW.SCENE_CTA;
  const sceneEnd = TOTAL_FRAMES_NEW_LOCAL; // 1126

  // Scene transition
  const { opacity, tx, scale: transitionScale } = useSceneTransition(sceneStart, sceneEnd, 8);

  const localFrame = frame - sceneStart;

  // Animations
  const logoOp = useFadeIn(5, 12);
  const logoY = useSlideUp(5, 20);

  const subOp = useFadeIn(15, 12);
  const subY = useSlideUp(15, 16);

  const btnOp = useFadeIn(25, 12);
  const btnY = useSlideUp(25, 16);

  // Logo Scale Spring
  const logoScale = spring({
    frame: localFrame - 5,
    fps: 30,
    config: { damping: 14, stiffness: 150 },
    from: 0.8,
    to: 1,
  });

  // Button pulse scaling
  const pulseVal = Math.sin((localFrame - 35) * 0.08); // looping pulse
  const btnScale = localFrame >= 35
    ? interpolate(pulseVal, [-1, 1], [0.98, 1.02])
    : 1;

  const titleSize = isPortrait ? 66 : isSquare ? 72 : 96;
  const tagSize = isPortrait ? 24 : isSquare ? 26 : 32;
  const btnFontSize = isPortrait ? 22 : isSquare ? 24 : 28;

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
        transform: `translateX(${tx}px) scale(${transitionScale})`,
        padding: `0 ${width * 0.05}px`,
        gap: 32,
      }}
    >
      {/* Huge App Title/Wordmark */}
      <div
        style={{
          opacity: logoOp,
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: titleSize,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: COLORS.textWhite,
            display: "inline-flex",
            alignItems: "center",
            gap: isPortrait ? 16 : 24,
          }}
        >
          <img
            src={staticFile("logo.webp")}
            style={{
              width: titleSize * 0.8,
              height: titleSize * 0.8,
              borderRadius: titleSize * 0.18,
              flexShrink: 0,
            }}
            alt="ResumeAI Logo Icon"
          />
          Resume
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI
          </span>
        </span>
      </div>

      {/* Subtitle / Tagline */}
      <div
        style={{
          opacity: subOp,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
          maxWidth: isPortrait ? width * 0.8 : width * 0.6,
        }}
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: tagSize,
            fontWeight: 400,
            color: COLORS.textMuted,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
        >
          {COPY_NEW.cta.sub}
        </p>
      </div>

      {/* Button */}
      <div
        style={{
          opacity: btnOp,
          transform: `translateY(${btnY}px) scale(${btnScale})`,
          marginTop: 16,
        }}
      >
        <a
          href="https://cvai.dev"
          style={{
            textDecoration: "none",
            background: `linear-gradient(135deg, ${COLORS.accentBlue} 0%, ${COLORS.accentCyan} 100%)`,
            color: "#ffffff",
            padding: `${isPortrait ? 16 : 20}px ${isPortrait ? 36 : 48}px`,
            borderRadius: 999,
            fontSize: btnFontSize,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            boxShadow: `0 12px 36px rgba(232, 93, 4, 0.35)`,
            fontFamily: FONTS.display,
            transition: "box-shadow 0.2s",
          }}
        >
          {COPY_NEW.cta.btn}
        </a>
      </div>

      {/* Powered By Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          marginTop: isPortrait ? 40 : isSquare ? 30 : 32,
          opacity: btnOp,
          transform: `translateY(${btnY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: isPortrait ? 13 : 15,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          powered by
        </span>
        <img
          src={staticFile("Brand_Builder.com.np_(Color)-01.png")}
          style={{
            height: titleSize * 0.8,
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
            opacity: 0.85,
          }}
          alt="Brand Builder Logo"
        />
      </div>
    </div>
  );
};

const TOTAL_FRAMES_NEW_LOCAL = 1126;
