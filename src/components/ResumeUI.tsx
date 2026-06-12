import React from "react";
import { COLORS, FONTS, MOCK_RESUME } from "../config/config";

interface ResumeUIProps {
  scale?: number;
  highlightBullet?: number; // which bullet is being "AI-generated"
  typingText?: string;      // partial text being typed
  showAI?: boolean;
}

export const ResumeUI: React.FC<ResumeUIProps> = ({
  scale = 1,
  highlightBullet = -1,
  typingText,
  showAI = false,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.97)",
    borderRadius: px(12),
    overflow: "hidden",
    width:  px(560),
    height: px(360),
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: `0 ${px(24)}px ${px(60)}px rgba(0,0,0,0.4), 0 0 0 ${px(1)}px rgba(255,255,255,0.1)`,
  };

  return (
    <div style={cardStyle}>
      {/* App header bar */}
      <div
        style={{
          background: COLORS.navyDeep,
          height: px(36),
          display: "flex",
          alignItems: "center",
          padding: `0 ${px(14)}`,
          gap: px(8),
        }}
      >
        <div style={{ display: "flex", gap: px(5) }}>
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: px(8), height: px(8), borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.1)",
            borderRadius: px(4),
            height: px(18),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: px(8),
          }}
        >
          <span style={{ fontSize: px(9), color: "rgba(255,255,255,0.5)", fontFamily: FONTS.mono }}>
            app.cvai.dev/dashboard/resumes/new
          </span>
        </div>
      </div>

      {/* Two-panel layout */}
      <div style={{ display: "flex", height: `calc(100% - ${px(36)}px)` }}>
        {/* LEFT: Editor panel */}
        <div
          style={{
            width: px(200),
            background: "#f8f9fc",
            borderRight: `${px(1)}px solid #e5e7eb`,
            padding: px(14),
            overflowY: "hidden",
          }}
        >
          <div style={{ fontSize: px(10), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(10) }}>
            Resume Editor
          </div>

          {/* Section blocks */}
          {["Contact", "Experience", "Skills", "Education"].map((sec, i) => (
            <div
              key={sec}
              style={{
                background: i === 1 ? COLORS.navyDeep : "white",
                color: i === 1 ? "white" : "#374151",
                borderRadius: px(6),
                padding: `${px(6)} ${px(10)}`,
                fontSize: px(11),
                fontWeight: 500,
                marginBottom: px(5),
                border: `${px(1)}px solid ${i === 1 ? "transparent" : "#e5e7eb"}`,
                cursor: "pointer",
              }}
            >
              {sec}
            </div>
          ))}

          {/* AI generate button */}
          {showAI && (
            <div
              style={{
                marginTop: px(12),
                background: `linear-gradient(135deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
                borderRadius: px(8),
                padding: `${px(8)} ${px(10)}`,
                display: "flex",
                alignItems: "center",
                gap: px(6),
              }}
            >
              <div style={{ width: px(14), height: px(14), borderRadius: "50%", background: "rgba(255,255,255,0.3)" }}>
                <svg width={px(14)} height={px(14)} viewBox="0 0 16 16" fill="white">
                  <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5z" />
                </svg>
              </div>
              <span style={{ fontSize: px(10), fontWeight: 600, color: "white" }}>
                AI Generate
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: Resume preview */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: px(18),
            overflowY: "hidden",
          }}
        >
          {/* Name & title */}
          <div style={{ marginBottom: px(10) }}>
            <div style={{ fontSize: px(18), fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" }}>
              {MOCK_RESUME.name}
            </div>
            <div style={{ fontSize: px(11), color: COLORS.accentBlue, fontWeight: 500, marginTop: px(1) }}>
              {MOCK_RESUME.title}
            </div>
            <div style={{ fontSize: px(9), color: "#9ca3af", marginTop: px(2) }}>
              {MOCK_RESUME.email} · {MOCK_RESUME.location}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: px(1), background: "#e5e7eb", marginBottom: px(10) }} />

          {/* Skills chips */}
          <div style={{ marginBottom: px(10) }}>
            <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(5) }}>
              Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: px(4) }}>
              {MOCK_RESUME.skills.map((skill) => (
                <span
                  key={skill}
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
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience bullets */}
          <div>
            <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(7) }}>
              Experience
            </div>
            {MOCK_RESUME.bullets.map((bullet, i) => {
              const isActive = i === highlightBullet;
              const text = isActive && typingText !== undefined ? typingText : bullet;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: px(6),
                    marginBottom: px(7),
                    padding: `${px(5)} ${px(7)}`,
                    borderRadius: px(5),
                    background: isActive ? "#fff5eb" : "transparent",
                    border: `${px(0.5)}px solid ${isActive ? COLORS.accentBlue + "44" : "transparent"}`,
                  }}
                >
                  <span style={{ color: COLORS.accentBlue, fontSize: px(12), lineHeight: 1, marginTop: px(1) }}>•</span>
                  <span style={{ fontSize: px(10), color: isActive ? COLORS.accentBlue : "#374151", lineHeight: 1.5 }}>
                    {text}
                    {isActive && typingText !== undefined && (
                      <span style={{
                        display: "inline-block",
                        width: px(1.5),
                        height: px(11),
                        background: COLORS.accentBlue,
                        marginLeft: px(1),
                        verticalAlign: "middle",
                        animation: "blink 0.8s step-end infinite",
                      }} />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
