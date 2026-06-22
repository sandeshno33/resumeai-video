import React from "react";
import { interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../config/config";

interface ApplicationTrackerHookProps {
  scale?: number;
  frame: number; // local frame in SceneHookNew
}

export const ApplicationTrackerHook: React.FC<ApplicationTrackerHookProps> = ({
  scale = 1,
  frame,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  // Staggered card entrances (relative to localFrame 0)
  const getCardOpacity = (start: number) => {
    return interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };
  const getCardY = (start: number) => {
    const p = interpolate(frame, [start, start + 15], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return interpolate(p, [0, 1], [24, 0]);
  };

  // Status transition animations (blue -> red/gray/red)
  const getRowStatus = (trigger: number, index: number) => {
    const isTriggered = frame >= trigger;
    if (index === 1) {
      return isTriggered ? "Ghosted" : "Applied";
    }
    return isTriggered ? "Declined" : "Applied";
  };

  const getRowStatusStyle = (trigger: number, index: number) => {
    const progress = interpolate(frame, [trigger, trigger + 10], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
    // Color transitions:
    // Applied: blue (#3b82f6)
    // Declined: red (#ef4444)
    // Ghosted: gray (#64748d)
    const activeColor = index === 1 ? "#94a3b8" : "#f87171";
    const bgOpacity = index === 1 ? "rgba(148, 163, 184, 0.15)" : "rgba(248, 113, 113, 0.15)";
    const borderActive = index === 1 ? "rgba(148, 163, 184, 0.3)" : "rgba(248, 113, 113, 0.3)";

    return {
      color: progress > 0.5 ? activeColor : "#38bdf8",
      background: progress > 0.5 ? bgOpacity : "rgba(56, 189, 248, 0.12)",
      border: `1px solid ${progress > 0.5 ? borderActive : "rgba(56, 189, 248, 0.25)"}`,
    };
  };

  const applications = [
    { company: "Google", role: "Senior Developer", start: 30, trigger: 105 },
    { company: "Stripe", role: "Full Stack Dev", start: 45, trigger: 125 },
    { company: "Meta", role: "Product Engineer", start: 60, trigger: 145 },
  ];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: `1px solid rgba(255, 255, 255, 0.08)`,
        borderRadius: px(12),
        padding: px(20),
        width: px(460),
        boxShadow: `0 ${px(16)}px ${px(40)}px rgba(0, 0, 0, 0.3), inset 0 0 0 ${px(1)}px rgba(255, 255, 255, 0.05)`,
        display: "flex",
        flexDirection: "column",
        gap: px(12),
        fontFamily: FONTS.body,
        textAlign: "left",
      }}
    >
      <div style={{ fontSize: px(12), fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: px(1) }}>
        Job Tracker
      </div>

      {applications.map((app, idx) => {
        const op = getCardOpacity(app.start);
        const y = getCardY(app.start);
        const status = getRowStatus(app.trigger, idx);
        const statusStyle = getRowStatusStyle(app.trigger, idx);

        return (
          <div
            key={idx}
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: `1px solid rgba(255, 255, 255, 0.06)`,
              borderRadius: px(8),
              padding: px(14),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: op,
              transform: `translateY(${y}px)`,
              boxShadow: `0 ${px(4)}px ${px(12)}px rgba(0,0,0,0.15)`,
            }}
          >
            <div>
              <div style={{ fontSize: px(15), fontWeight: 600, color: "#ffffff" }}>
                {app.company}
              </div>
              <div style={{ fontSize: px(12), color: "rgba(255,255,255,0.5)", marginTop: px(2) }}>
                {app.role}
              </div>
            </div>

            <span
              style={{
                borderRadius: px(6),
                padding: `${px(4)}px ${px(10)}px`,
                fontSize: px(11),
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: px(0.5),
                transition: "all 0.15s ease-out",
                ...statusStyle,
              }}
            >
              {status}
            </span>
          </div>
        );
      })}
    </div>
  );
};
