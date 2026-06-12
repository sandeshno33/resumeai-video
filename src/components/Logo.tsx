import React from "react";
import { staticFile } from "remotion";
import { COLORS, FONTS, BRAND } from "../config/config";

interface LogoProps {
  scale?: number;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ scale = 1, showTagline = false }) => {
  const fs = Math.round(32 * scale);
  const tag = Math.round(14 * scale);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 * scale }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 * scale }}>
        {/* Icon mark from public/logo.webp */}
        <img
          src={staticFile("logo.webp")}
          style={{
            width: fs * 1.25,
            height: fs * 1.25,
            borderRadius: fs * 0.28,
            flexShrink: 0,
          }}
          alt="ResumeAI Logo Icon"
        />

        {/* Wordmark */}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: fs,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: COLORS.textWhite,
          }}
        >
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

      {showTagline && (
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: tag,
            color: COLORS.textMuted,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {BRAND.tagline}
        </span>
      )}
    </div>
  );
};
