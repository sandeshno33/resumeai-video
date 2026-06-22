import React from "react";
import { interpolate, staticFile, Easing } from "remotion";
import { COLORS, FONTS } from "../config/config";

interface ChromeExtensionPopoverProps {
  scale?: number;
  localFrame: number; // local frame in SceneFlexNew (192 to 387)
}

export const ChromeExtensionPopover: React.FC<ChromeExtensionPopoverProps> = ({
  scale = 1,
  localFrame,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  // Timings:
  // localFrame goes from 170 to 280 (shown inside Phase B1)
  const entryStart = 180;
  const clickFrame = 210;
  const progressStart = 218;
  const progressDur = 25;

  // Reveal animation
  const revealProgress = interpolate(localFrame, [entryStart, entryStart + 15], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const yOffset = interpolate(revealProgress, [0, 1], [30, 0]);

  // Button click scale
  const buttonScale = interpolate(localFrame, [clickFrame, clickFrame + 5, clickFrame + 12], [1, 0.94, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Progress count and fill animation
  const progressPercent = interpolate(localFrame, [progressStart, progressStart + progressDur], [48, 52], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  
  const currentCount = localFrame >= progressStart + progressDur ? 13 : 12;

  // Button background color and text change post-apply
  const appliedProgress = interpolate(localFrame, [clickFrame + 8, clickFrame + 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const buttonBg = interpolate(appliedProgress, [0, 1], [0, 1]); // transitions to green
  const buttonColor = buttonBg > 0.5 ? "#ffffff" : "#ffffff";
  const buttonText = buttonBg > 0.5 ? "Applied Successfully! ✓" : "Auto-applying...";

  return (
    <div
      style={{
        background: "#ffffff",
        border: `1px solid #e5edf5`,
        borderRadius: px(8),
        boxShadow: `0 ${px(14)}px ${px(28)}px rgba(3, 3, 39, 0.12), 0 0 0 ${px(1)}px rgba(0,0,0,0.05)`,
        padding: px(18),
        width: px(360),
        fontFamily: FONTS.body,
        textAlign: "left",
        opacity: revealProgress,
        transform: `translateY(${yOffset}px)`,
        position: "relative",
      }}
    >
      {/* Popover Header */}
      <div style={{ display: "flex", alignItems: "center", gap: px(10), marginBottom: px(14) }}>
        <img
          src={staticFile("logo.webp")}
          style={{ width: px(32), height: px(32), objectFit: "contain", borderRadius: px(6) }}
          alt="Resume AI Logo"
        />
        <div style={{ fontSize: px(14), fontWeight: 600, color: "#061b31", fontFamily: FONTS.display }}>
          Resume AI
        </div>
        <span
          style={{
            marginLeft: "auto",
            fontSize: px(11),
            color: COLORS.accentGreen,
            display: "inline-flex",
            alignItems: "center",
            gap: px(4),
            fontWeight: 600,
          }}
        >
          {/* Active pulse */}
          <span
            style={{
              display: "inline-block",
              width: px(6),
              height: px(6),
              borderRadius: "50%",
              background: COLORS.accentGreen,
              boxShadow: `0 0 ${px(6)}px ${COLORS.accentGreen}`,
            }}
          />
          Active
        </span>
      </div>

      {/* Match Score */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: px(12),
          background: "rgba(21, 190, 83, 0.10)",
          border: `1px solid rgba(21, 190, 83, 0.25)`,
          borderRadius: px(6),
          marginBottom: px(12),
        }}
      >
        <span style={{ fontSize: px(13), color: COLORS.accentGreen, fontWeight: 500 }}>
          Strong match for your profile
        </span>
        <span style={{ fontSize: px(18), color: COLORS.accentGreen, fontWeight: 700 }}>
          94%
        </span>
      </div>

      {/* Matched Keywords Title */}
      <div
        style={{
          fontSize: px(12),
          color: "#273951",
          marginBottom: px(6),
          fontWeight: 600,
        }}
      >
        Matched keywords
      </div>

      {/* Badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: px(4), marginBottom: px(14) }}>
        {["React", "TypeScript", "Node.js", "Docker", "PostgreSQL"].map((kw) => (
          <span
            key={kw}
            style={{
              background: "rgba(21, 190, 83, 0.15)",
              color: COLORS.accentGreen,
              border: "1px solid rgba(21, 190, 83, 0.3)",
              borderRadius: px(4),
              padding: `${px(2)}px ${px(6)}px`,
              fontSize: px(11),
              fontWeight: 500,
            }}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Action panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
        <button
          style={{
            width: "100%",
            background: buttonBg > 0.5 ? COLORS.accentGreen : "linear-gradient(135deg, #533afd 0%, #2e2b8c 100%)",
            color: buttonColor,
            border: "none",
            borderRadius: px(6),
            padding: `${px(10)}px ${px(16)}px`,
            fontSize: px(13),
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: px(6),
            boxShadow: buttonBg > 0.5 
              ? `0 ${px(4)}px ${px(16)}px rgba(21, 190, 83, 0.4)` 
              : `0 ${px(4)}px ${px(12)}px rgba(83, 58, 253, 0.2)`,
            transform: `scale(${buttonScale})`,
            fontFamily: FONTS.display,
            transition: "background-color 0.2s, box-shadow 0.2s",
          }}
        >
          {localFrame < clickFrame ? (
            <>
              <svg width={px(12)} height={px(12)} viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-apply with Senior FS — v3
            </>
          ) : (
            buttonText
          )}
        </button>

        {/* Progress Tracker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: px(8),
            fontSize: px(12),
            color: "#64748d",
            marginTop: px(4),
          }}
        >
          <span>{currentCount} / 25 today</span>
          <div
            style={{
              flex: 1,
              height: px(4),
              background: "#eff1fd",
              borderRadius: px(999),
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #533afd, #2e2b8c)",
                borderRadius: px(999),
                width: `${progressPercent}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
