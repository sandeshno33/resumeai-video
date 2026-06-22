import React from "react";
import { interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../config/config";

interface ATSOptimizerCardProps {
  scale?: number;
  localFrame: number; // local frame in SceneFlexNew (0 to 192)
}

export const ATSOptimizerCard: React.FC<ATSOptimizerCardProps> = ({
  scale = 1,
  localFrame,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  // Timings:
  const gaugeStart = 10;
  const gaugeDur = 30;
  const fixStart = 85;
  const fixDur = 20;
  const climbStart = 95;
  const climbDur = 20;

  // ─── Score count up ───
  // 0 to 89
  const score1 = interpolate(localFrame, [gaugeStart, gaugeStart + gaugeDur], [0, 89], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // 89 to 96
  const score2 = interpolate(localFrame, [climbStart, climbStart + climbDur], [89, 96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const currentScore = Math.round(localFrame >= climbStart ? score2 : score1);

  // ─── Gauge and Needle rotation ───
  // Dashoffset range: 314 (0%) to 34.5 (89%) to 12.5 (96%)
  const currentDash = 314 * (1 - currentScore / 100);

  // Needle angle: -90 (0%) to 70.2 (89%) to 82.8 (96%)
  const currentNeedle = (currentScore / 100) * 180 - 90;

  // ─── Counts ───
  // Matched: 0 -> 12 -> 17
  const matchedCount1 = interpolate(localFrame, [gaugeStart + 15, gaugeStart + gaugeDur], [0, 12], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const matchedCount2 = interpolate(localFrame, [fixStart + 10, fixStart + fixDur], [12, 17], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const currentMatched = Math.round(localFrame >= fixStart + 10 ? matchedCount2 : matchedCount1);

  // Missing: 0 -> 5 -> 0
  const missingCount1 = interpolate(localFrame, [gaugeStart + 25, gaugeStart + gaugeDur + 10], [0, 5], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const missingCount2 = interpolate(localFrame, [fixStart + 10, fixStart + fixDur], [5, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const currentMissing = Math.round(localFrame >= fixStart + 10 ? missingCount2 : missingCount1);

  // Score pop scale
  const popProgress1 = interpolate(localFrame, [gaugeStart + gaugeDur, gaugeStart + gaugeDur + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const popProgress2 = interpolate(localFrame, [climbStart + climbDur, climbStart + climbDur + 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  let scoreScale = 1;
  if (localFrame >= climbStart + climbDur) {
    scoreScale = interpolate(popProgress2, [0, 0.4, 1], [1, 1.12, 1]);
  } else if (localFrame >= gaugeStart + gaugeDur) {
    scoreScale = interpolate(popProgress1, [0, 0.4, 1], [1, 1.10, 1]);
  }

  // Keywords staggered entrance
  const getKeywordOpacity = (idx: number, isMissing: boolean) => {
    const startOffset = isMissing ? 50 : 35;
    const trigger = startOffset + idx * 4;
    return interpolate(localFrame, [trigger, trigger + 8], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  const getKeywordScale = (idx: number, isMissing: boolean) => {
    const startOffset = isMissing ? 80 : 65;
    const trigger = startOffset + idx * 4;
    const p = interpolate(localFrame, [trigger, trigger + 12], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
    return interpolate(p, [0, 0.7, 1], [0.85, 1.05, 1]);
  };

  // Re-opt panel entry
  const reoptOp = interpolate(localFrame, [75, 87], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const reoptY = interpolate(reoptOp, [0, 1], [12, 0]);

  // Re-opt btn pulse
  const btnPulseVal = Math.sin((localFrame - 80) * 0.08);
  const btnScale = localFrame >= 80 ? interpolate(btnPulseVal, [-1, 1], [0.97, 1.03]) : 1;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: px(8),
        border: "1px solid #e5edf5",
        padding: `${px(18)}px ${px(24)}px`,
        width: px(540),
        height: px(380),
        boxShadow: `0 ${px(14)}px ${px(28)}px rgba(3, 3, 39, 0.08), 0 0 0 ${px(1)}px rgba(0,0,0,0.05)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: FONTS.body,
        textAlign: "left",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <h2 style={{ fontSize: px(20), fontWeight: 300, color: "#061b31", fontFamily: FONTS.display, margin: 0 }}>
          Your ATS Score
        </h2>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: px(2), lineHeight: 1.1 }}>
          <span style={{ fontSize: px(11), textTransform: "uppercase", letterSpacing: px(0.6), color: "#64748d", fontWeight: 600 }}>
            ATS Score
          </span>
          <span style={{ fontSize: px(32), fontWeight: 300, color: "#061b31", transform: `scale(${scoreScale})`, transformOrigin: "right center" }}>
            <span style={{ fontWeight: 700 }}>{currentScore}</span>
            <span style={{ color: "#64748d", fontSize: px(18) }}>/100</span>
          </span>
        </div>
      </div>

      {/* SVG Arc Gauge */}
      <div style={{ display: "flex", justifyContent: "center", padding: `${px(4)}px 0` }}>
        <svg width={px(240)} height={px(120)} viewBox="0 0 240 140" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea2261" />
              <stop offset="40%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#15be53" />
            </linearGradient>
          </defs>
          {/* Background track (semi-circle arc) */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            fill="none"
            stroke="#eff1fd"
            strokeWidth={14}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d="M 20 120 A 100 100 0 0 1 220 120"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray="314"
            strokeDashoffset={currentDash}
          />
          {/* Needle */}
          <g transform={`rotate(${currentNeedle} 120 120)`}>
            <line x1={120} y1={120} x2={120} y2={30} stroke="#061b31" strokeWidth={3} strokeLinecap="round" />
            <circle cx={120} cy={120} r={8} fill="#061b31" />
          </g>
          {/* Tick text labels */}
          <text x={20} y={138} fontSize={11} fontFamily="Inter" fill="#64748d" textAnchor="middle">0</text>
          {/* Middle 50 tick line and label */}
          <line x1={120} y1={13} x2={120} y2={7} stroke="#061b31" strokeWidth={2} strokeLinecap="round" />
          <text x={120} y={4} fontSize={15} fontFamily="Inter" fontWeight={800} fill="#061b31" textAnchor="middle">50</text>
          <text x={220} y={138} fontSize={11} fontFamily="Inter" fill="#64748d" textAnchor="middle">100</text>
        </svg>
      </div>

      {/* Keywords Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: px(20) }}>
        {/* Matched Panel */}
        <div>
          <div
            style={{
              fontSize: px(11),
              fontWeight: 500,
              color: "#0d7a35",
              display: "flex",
              alignItems: "center",
              gap: px(6),
              marginBottom: px(8),
            }}
          >
            {/* Check Icon */}
            <svg width={px(12)} height={px(12)} viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Matched ({currentMatched})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: px(5) }}>
            {["React", "TypeScript", "GraphQL", "AWS", "Docker", "Node.js"].map((kw, idx) => (
              <span
                key={kw}
                style={{
                  background: "rgba(21, 190, 83, 0.15)",
                  color: "#0d7a35",
                  border: "1px solid rgba(21, 190, 83, 0.30)",
                  borderRadius: px(4),
                  padding: `${px(2)}px ${px(6)}px`,
                  fontSize: px(10),
                  fontWeight: 500,
                  opacity: getKeywordOpacity(idx, false),
                  transform: `scale(${getKeywordScale(idx, false)})`,
                }}
              >
                {kw}
              </span>
            ))}
            <span
              style={{
                fontSize: px(10),
                color: "#64748d",
                padding: `${px(2)}px ${px(4)}px`,
                opacity: getKeywordOpacity(6, false),
              }}
            >
              +4
            </span>
          </div>
        </div>

        {/* Missing Panel */}
        <div>
          <div
            style={{
              fontSize: px(11),
              fontWeight: 500,
              color: currentMissing > 0 ? "#ea2261" : "#0d7a35",
              display: "flex",
              alignItems: "center",
              gap: px(6),
              marginBottom: px(8),
              transition: "color 0.2s",
            }}
          >
            {/* Warning or Success Icon */}
            {currentMissing > 0 ? (
              <svg width={px(12)} height={px(12)} viewBox="0 0 12 12" fill="none">
                <path d="M6 9V9.01M6 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 6a5 5 0 1 0 10 0A5 5 0 1 0 1 6z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg width={px(12)} height={px(12)} viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {currentMissing > 0 ? `Missing (${currentMissing})` : "Matched (17)"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: px(5) }}>
            {["Kubernetes", "Terraform", "Kafka", "Redis"].map((kw, idx) => {
              const isFixed = localFrame >= fixStart + idx * 3;
              return (
                <span
                  key={kw}
                  style={{
                    background: isFixed ? "rgba(21, 190, 83, 0.15)" : "rgba(155, 104, 41, 0.12)",
                    color: isFixed ? "#0d7a35" : "#7a4f1c",
                    border: `1px solid ${isFixed ? "rgba(21, 190, 83, 0.30)" : "rgba(155, 104, 41, 0.30)"}`,
                    borderRadius: px(4),
                    padding: `${px(2)}px ${px(6)}px`,
                    fontSize: px(10),
                    fontWeight: 500,
                    opacity: getKeywordOpacity(idx, true),
                    transform: `scale(${
                      localFrame >= fixStart + idx * 3
                        ? interpolate(localFrame - (fixStart + idx * 3), [0, 6, 15], [1, 1.15, 1], {
                            extrapolateLeft: "clamp", extrapolateRight: "clamp",
                          })
                        : getKeywordScale(idx, true)
                    })`,
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                  }}
                >
                  {kw}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action panel */}
      <div
        style={{
          borderTop: "1px solid #e5edf5",
          paddingTop: px(10),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: px(6),
          opacity: reoptOp,
          transform: `translateY(${px(reoptY)}px)`,
        }}
      >
        <button
          style={{
            background: "#533afd",
            color: "#ffffff",
            border: "none",
            borderRadius: px(6),
            padding: `${px(8)}px ${px(20)}px`,
            fontSize: px(13),
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: px(6),
            boxShadow: `0 ${px(4)}px ${px(12)}px rgba(83, 58, 253, 0.2)`,
            fontFamily: FONTS.display,
            transform: `scale(${btnScale})`,
            width: "100%",
            cursor: "pointer",
          }}
        >
          {/* Zap Icon */}
          <svg width={px(12)} height={px(12)} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2v9h8L11 22v-9H3l10-11z" />
          </svg>
          Re-optimize Resume
        </button>
        <div style={{ fontSize: px(11), color: "#64748d", textAlign: "center" }}>
          AI will add missing keywords and improve your content
        </div>
      </div>
    </div>
  );
};
