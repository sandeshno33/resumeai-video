import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, TOTAL_FRAMES } from "../config/config";

interface BackgroundProps {
  width: number;
  height: number;
}

export const AnimatedBackground: React.FC<BackgroundProps> = ({ width, height }) => {
  const frame = useCurrentFrame();

  // Slowly drifting orb positions
  const orb1x = interpolate(frame, [0, TOTAL_FRAMES], [0.25, 0.35], { extrapolateRight: "clamp" });
  const orb1y = interpolate(frame, [0, TOTAL_FRAMES], [0.2,  0.3 ], { extrapolateRight: "clamp" });
  const orb2x = interpolate(frame, [0, TOTAL_FRAMES], [0.75, 0.65], { extrapolateRight: "clamp" });
  const orb2y = interpolate(frame, [0, TOTAL_FRAMES], [0.8,  0.7 ], { extrapolateRight: "clamp" });

  const orbSize = Math.max(width, height) * 0.7;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, ${COLORS.navyDeep} 0%, ${COLORS.navyMid} 50%, #120508 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Noise grain overlay */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, mixBlendMode: "overlay" }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={width} height={height} filter="url(#noise)" />
      </svg>

      {/* Orb 1 — blue */}
      <div
        style={{
          position: "absolute",
          width:  orbSize,
          height: orbSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentBlue}55 0%, transparent 70%)`,
          left: orb1x * width - orbSize / 2,
          top:  orb1y * height - orbSize / 2,
          pointerEvents: "none",
        }}
      />

      {/* Orb 2 — cyan */}
      <div
        style={{
          position: "absolute",
          width:  orbSize * 0.8,
          height: orbSize * 0.8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentCyan}33 0%, transparent 70%)`,
          left: orb2x * width - (orbSize * 0.8) / 2,
          top:  orb2y * height - (orbSize * 0.8) / 2,
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
        viewBox={`0 0 ${width} ${height}`}
      >
        {Array.from({ length: Math.ceil(width / 80) + 1 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * 80} y1={0} x2={i * 80} y2={height}
            stroke="white" strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: Math.ceil(height / 80) + 1 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={i * 80} x2={width} y2={i * 80}
            stroke="white" strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
};
