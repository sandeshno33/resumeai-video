import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONTS, TIMING_NEW, COPY_NEW } from "../config/config";
import { StatsPanel } from "../components/StatsPanel";
import { useFadeIn, useSlideUp, useSceneTransition } from "../components/utils";

interface SceneProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneStatsNew: React.FC<SceneProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  const sceneStart = TIMING_NEW.SCENE_STATS;
  const sceneEnd = TIMING_NEW.SCENE_CTA;

  // Scene transition
  const { opacity, tx, scale: transitionScale } = useSceneTransition(sceneStart, sceneEnd, 8);

  // Local frame count
  const localFrame = frame - sceneStart;

  // Title animations
  const titleOp = useFadeIn(5, 12);
  const titleY = useSlideUp(5, 16);

  // Stats panel scale/zoom camera push at the end (from frame 100 onwards)
  const scaleProg = interpolate(localFrame, [100, 300], [1, 1.03], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const titleSize = isPortrait ? 48 : isSquare ? 44 : 64;
  const statsScale = isPortrait ? 0.75 : isSquare ? 0.9 : 1.15;

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
        gap: isPortrait ? 60 : isSquare ? 50 : 80,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
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
          }}
        >
          {COPY_NEW.stats.title}
        </h1>
      </div>

      {/* Stats Panel */}
      <div
        style={{
          transform: `scale(${statsScale * scaleProg})`,
          transformOrigin: "50% 50%",
        }}
      >
        <StatsPanel scale={1} localFrame={localFrame} />
      </div>
    </div>
  );
};
