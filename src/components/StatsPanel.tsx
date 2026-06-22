import React from "react";
import { interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../config/config";

interface StatsPanelProps {
  scale?: number;
  localFrame: number; // local frame in SceneStatsNew (0 to 300)
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ scale = 1, localFrame }) => {
  const s = scale;
  const px = (n: number) => n * s;

  // Timings:
  // Col 1:
  const col1Reveal = interpolate(localFrame, [6, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const col1Y = interpolate(col1Reveal, [0, 1], [44, 0]);
  const rule1Scale = interpolate(localFrame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const num1Val = Math.round(interpolate(localFrame, [10, 40], [0, 47], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }));
  const num1Scale = interpolate(localFrame, [40, 45, 52], [1, 1.10, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Col 2:
  const col2Reveal = interpolate(localFrame, [35, 49], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const col2Y = interpolate(col2Reveal, [0, 1], [44, 0]);
  const rule2Scale = interpolate(localFrame, [41, 53], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const num2Val = Math.round(interpolate(localFrame, [39, 58], [0, 6], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }));
  const num2Scale = interpolate(localFrame, [58, 63, 70], [1, 1.10, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Col 3:
  const col3Reveal = interpolate(localFrame, [63, 77], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const col3Y = interpolate(col3Reveal, [0, 1], [44, 0]);
  const rule3Scale = interpolate(localFrame, [69, 81], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const num3Val = Math.round(interpolate(localFrame, [67, 88], [12, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }));
  const num3Scale = interpolate(localFrame, [88, 93, 100], [1, 1.10, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: px(100),
        fontFamily: FONTS.body,
        textAlign: "center",
      }}
    >
      {/* Stat 1 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: px(14),
          opacity: col1Reveal,
          transform: `translateY(${px(col1Y)}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: px(150),
            fontWeight: 200,
            letterSpacing: px(-5),
            lineHeight: 1,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
            display: "inline-block",
            transform: `scale(${num1Scale})`,
          }}
        >
          {num1Val}
        </span>
        <div
          style={{
            width: px(64),
            height: px(2),
            background: "#533afd",
            transform: `scaleX(${rule1Scale})`,
            transformOrigin: "50% 50%",
          }}
        />
        <div
          style={{
            fontSize: px(16),
            fontWeight: 400,
            letterSpacing: px(2.4),
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.55)",
            lineHeight: 1.5,
          }}
        >
          Applications
          <br />a week
        </div>
      </div>

      {/* Stat 2 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: px(14),
          opacity: col2Reveal,
          transform: `translateY(${px(col2Y)}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: px(150),
            fontWeight: 200,
            letterSpacing: px(-5),
            lineHeight: 1,
            color: "#f96bee", // Magenta Accent color
            fontVariantNumeric: "tabular-nums",
            display: "inline-block",
            transform: `scale(${num2Scale})`,
          }}
        >
          {num2Val}
        </span>
        <div
          style={{
            width: px(64),
            height: px(2),
            background: "#533afd",
            transform: `scaleX(${rule2Scale})`,
            transformOrigin: "50% 50%",
          }}
        />
        <div
          style={{
            fontSize: px(16),
            fontWeight: 400,
            letterSpacing: px(2.4),
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.55)",
            lineHeight: 1.5,
          }}
        >
          Interviews
          <br />
          this month
        </div>
      </div>

      {/* Stat 3 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: px(14),
          opacity: col3Reveal,
          transform: `translateY(${px(col3Y)}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: px(150),
            fontWeight: 200,
            letterSpacing: px(-5),
            lineHeight: 1,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
            display: "inline-block",
            transform: `scale(${num3Scale})`,
          }}
        >
          {num3Val}
        </span>
        <div
          style={{
            width: px(64),
            height: px(2),
            background: "#533afd",
            transform: `scaleX(${rule3Scale})`,
            transformOrigin: "50% 50%",
          }}
        />
        <div
          style={{
            fontSize: px(16),
            fontWeight: 400,
            letterSpacing: px(2.4),
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.55)",
            lineHeight: 1.5,
          }}
        >
          Hours
          <br />
          lost
        </div>
      </div>
    </div>
  );
};
