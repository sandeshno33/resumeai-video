import React from "react";
import { COLORS, FONTS, MOCK_ATS } from "../config/config";

interface ATSUIProps {
  scale?: number;
  scoreProgress?: number; // 0 to 1, animates the score ring
}

export const ATSUI: React.FC<ATSUIProps> = ({ scale = 1, scoreProgress = 1 }) => {
  const s = scale;
  const px = (n: number) => n * s;

  const displayScore = Math.round(MOCK_ATS.score * scoreProgress);
  const circumference = 2 * Math.PI * px(52);
  const strokeDash = circumference * scoreProgress * (MOCK_ATS.score / 100);

  const scoreColor = displayScore >= 80 ? COLORS.accentGreen : displayScore >= 60 ? COLORS.yellow : COLORS.red;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.97)",
        borderRadius: px(12),
        width:  px(540),
        height: px(340),
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
        boxShadow: `0 ${px(24)}px ${px(60)}px rgba(0,0,0,0.4), 0 0 0 ${px(1)}px rgba(255,255,255,0.1)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.navyDeep,
          height: px(44),
          display: "flex",
          alignItems: "center",
          padding: `0 ${px(16)}`,
          gap: px(10),
        }}
      >
        <div style={{ display: "flex", gap: px(5) }}>
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: px(8), height: px(8), borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: px(11), color: "rgba(255,255,255,0.8)", fontWeight: 600, marginLeft: px(8) }}>
          ATS Resume Checker
        </span>
        <div
          style={{
            marginLeft: "auto",
            background: `${COLORS.accentGreen}22`,
            border: `${px(1)}px solid ${COLORS.accentGreen}55`,
            borderRadius: px(4),
            padding: `${px(3)} ${px(8)}`,
            fontSize: px(9),
            color: COLORS.accentGreen,
            fontWeight: 600,
          }}
        >
          LIVE SCAN
        </div>
      </div>

      <div style={{ display: "flex", height: `calc(100% - ${px(44)}px)` }}>
        {/* Score panel */}
        <div
          style={{
            width: px(180),
            background: "#f8f9fc",
            borderRight: `${px(1)}px solid #e5e7eb`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: px(12),
            padding: px(16),
          }}
        >
          <div style={{ fontSize: px(10), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            ATS Score
          </div>

          {/* Circular score ring */}
          <div style={{ position: "relative", width: px(110), height: px(110) }}>
            <svg width={px(110)} height={px(110)} viewBox={`0 0 ${px(110)} ${px(110)}`}>
              {/* Track */}
              <circle
                cx={px(55)} cy={px(55)} r={px(52)}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={px(8)}
              />
              {/* Progress */}
              <circle
                cx={px(55)} cy={px(55)} r={px(52)}
                fill="none"
                stroke={scoreColor}
                strokeWidth={px(8)}
                strokeLinecap="round"
                strokeDasharray={`${strokeDash} ${circumference}`}
                transform={`rotate(-90 ${px(55)} ${px(55)})`}
                style={{ filter: `drop-shadow(0 0 ${px(4)}px ${scoreColor}88)` }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: px(28), fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                {displayScore}
              </span>
              <span style={{ fontSize: px(10), color: "#9ca3af", fontWeight: 500 }}>/ 100</span>
            </div>
          </div>

          <div
            style={{
              background: `${scoreColor}18`,
              border: `${px(1)}px solid ${scoreColor}44`,
              borderRadius: px(6),
              padding: `${px(5)} ${px(12)}`,
              fontSize: px(10),
              fontWeight: 700,
              color: scoreColor,
            }}
          >
            ATS-Ready ✓
          </div>
        </div>

        {/* Results panel */}
        <div style={{ flex: 1, padding: px(16), overflowY: "hidden" }}>
          {/* Passed checks */}
          <div style={{ marginBottom: px(14) }}>
            <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(8) }}>
              Passed Checks
            </div>
            {MOCK_ATS.passedChecks.map((check, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: px(8),
                  marginBottom: px(6),
                  opacity: scoreProgress > (i * 0.2 + 0.3) ? 1 : 0,
                }}
              >
                <div
                  style={{
                    width: px(16),
                    height: px(16),
                    borderRadius: "50%",
                    background: `${COLORS.accentGreen}22`,
                    border: `${px(1)}px solid ${COLORS.accentGreen}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width={px(9)} height={px(9)} viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke={COLORS.accentGreen} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontSize: px(10), color: "#374151" }}>{check}</span>
              </div>
            ))}
          </div>

          {/* Warnings */}
          <div style={{ marginBottom: px(14) }}>
            <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(8) }}>
              Suggestions
            </div>
            {MOCK_ATS.warnings.map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: px(8), marginBottom: px(5) }}>
                <div
                  style={{
                    width: px(16),
                    height: px(16),
                    borderRadius: "50%",
                    background: "#fffbeb",
                    border: `${px(1)}px solid #fcd34d`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: px(8), color: "#f59e0b", fontWeight: 700 }}>!</span>
                </div>
                <span style={{ fontSize: px(10), color: "#6b7280" }}>{w}</span>
              </div>
            ))}
          </div>

          {/* Keywords */}
          <div>
            <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(6) }}>
              Keywords Matched
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: px(4) }}>
              {MOCK_ATS.keywords.map((kw) => (
                <span
                  key={kw}
                  style={{
                    background: "#fff5eb",
                    color: COLORS.accentBlue,
                    borderRadius: px(4),
                    padding: `${px(2)} ${px(7)}`,
                    fontSize: px(9),
                    fontWeight: 500,
                    border: `${px(0.5)}px solid #fdd8a8`,
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
