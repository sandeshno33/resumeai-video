import React from "react";
import { COLORS, FONTS } from "../config/config";

interface RecruiterUIProps {
  scale?: number;
  searchQuery?: string;
  resultsVisible?: number; // how many result cards are shown
}

const CANDIDATES = [
  { name: "Alex Chen",    title: "Sr. Software Engineer",    match: 94, skills: ["React","Node.js","AWS"],      location: "Remote · USA" },
  { name: "Priya Sharma", title: "Full Stack Developer",     match: 91, skills: ["TypeScript","Kubernetes","Go"], location: "Remote · India" },
  { name: "James Liu",    title: "Backend Engineer",         match: 88, skills: ["Python","AWS","PostgreSQL"],   location: "Remote · Singapore" },
];

export const RecruiterUI: React.FC<RecruiterUIProps> = ({
  scale = 1,
  searchQuery = "React developer with Kubernetes",
  resultsVisible = 3,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.97)",
        borderRadius: px(12),
        width:  px(560),
        height: px(360),
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
          Recruiter Search — Semantic AI
        </span>
      </div>

      {/* Search bar */}
      <div
        style={{
          padding: `${px(12)} ${px(16)} ${px(10)}`,
          background: "#f8f9fc",
          borderBottom: `${px(1)}px solid #e5e7eb`,
        }}
      >
        <div
          style={{
            background: "white",
            border: `${px(1.5)}px solid ${COLORS.accentBlue}`,
            borderRadius: px(8),
            display: "flex",
            alignItems: "center",
            padding: `${px(7)} ${px(12)}`,
            gap: px(8),
            boxShadow: `0 0 0 ${px(3)}px ${COLORS.accentBlue}18`,
          }}
        >
          {/* Search icon */}
          <svg width={px(14)} height={px(14)} viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke={COLORS.accentBlue} strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke={COLORS.accentBlue} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: px(11), color: "#374151", flex: 1 }}>
            {searchQuery}
          </span>
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
              borderRadius: px(5),
              padding: `${px(4)} ${px(10)}`,
              fontSize: px(9),
              fontWeight: 700,
              color: "white",
            }}
          >
            Search
          </div>
        </div>

        {/* Semantic match badge */}
        <div style={{ marginTop: px(6), display: "flex", alignItems: "center", gap: px(6) }}>
          <div
            style={{
              background: `${COLORS.accentCyan}18`,
              border: `${px(0.5)}px solid ${COLORS.accentCyan}55`,
              borderRadius: px(4),
              padding: `${px(2)} ${px(7)}`,
              fontSize: px(8.5),
              color: COLORS.accentCyan,
              fontWeight: 600,
            }}
          >
            Semantic match: "EKS" → "Kubernetes" ✓
          </div>
          <div
            style={{
              background: `${COLORS.accentCyan}18`,
              border: `${px(0.5)}px solid ${COLORS.accentCyan}55`,
              borderRadius: px(4),
              padding: `${px(2)} ${px(7)}`,
              fontSize: px(8.5),
              color: COLORS.accentCyan,
              fontWeight: 600,
            }}
          >
            "REST" ↔ "GraphQL" ✓
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: `${px(10)} ${px(16)}`, overflowY: "hidden" }}>
        <div style={{ fontSize: px(9), fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: px(8) }}>
          {resultsVisible} candidates found
        </div>
        {CANDIDATES.slice(0, resultsVisible).map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: `${px(8)} ${px(10)}`,
              borderRadius: px(8),
              background: i === 0 ? "#fff5eb" : "white",
              border: `${px(0.5)}px solid ${i === 0 ? COLORS.accentBlue + "33" : "#e5e7eb"}`,
              marginBottom: px(6),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: px(10) }}>
              {/* Avatar */}
              <div
                style={{
                  width: px(28),
                  height: px(28),
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: px(10),
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {c.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: px(11), fontWeight: 600, color: "#111827" }}>{c.name}</div>
                <div style={{ fontSize: px(9), color: "#6b7280" }}>{c.title} · {c.location}</div>
                <div style={{ display: "flex", gap: px(3), marginTop: px(3) }}>
                  {c.skills.map(sk => (
                    <span
                      key={sk}
                      style={{
                        background: "#f3f4f6",
                        color: "#4b5563",
                        borderRadius: px(3),
                        padding: `${px(1)} ${px(5)}`,
                        fontSize: px(8),
                        fontWeight: 500,
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Match score */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontSize: px(18), fontWeight: 800, color: COLORS.accentGreen, lineHeight: 1 }}>{c.match}%</div>
              <div style={{ fontSize: px(8), color: "#9ca3af", fontWeight: 500 }}>match</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
