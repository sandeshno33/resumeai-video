import React from "react";
import { interpolate, Easing } from "remotion";
import { COLORS, FONTS } from "../config/config";

interface JobApplicationsBoardProps {
  scale?: number;
  localFrame: number; // local frame in SceneFlexNew (192 to 387)
}

const SAVED_JOBS = [
  { company: "Lumen & Co", match: 86, location: "London, UK" },
  { company: "Helio", match: 84, location: "Berlin, DE" },
  { company: "GitHub", match: 92, location: "San Francisco, CA" },
  { company: "Retool", match: 89, location: "Remote — US" },
  { company: "Notion", match: 91, location: "San Francisco, CA" },
  { company: "Slack", match: 87, location: "Vancouver, BC" },
  { company: "Airbnb", match: 93, location: "Seattle, WA" },
  { company: "Snowflake", match: 85, location: "Bozeman, MT" },
  { company: "Vercel", match: 90, location: "Remote" },
  { company: "Coinbase", match: 88, location: "Remote — US" },
  { company: "Zoom", match: 83, location: "San Jose, CA" },
  { company: "Spotify", match: 86, location: "Stockholm, SE" },
];

const APPLIED_JOBS = [
  { company: "Northwind Labs", match: 91, location: "Remote — US", auto: true },
  { company: "Strand Financial", match: 88, location: "Singapore", auto: true },
  { company: "Linear", match: 93, location: "SF · Remote", auto: true },
  { company: "Supabase", match: 89, location: "Remote — US", auto: true },
  { company: "PostHog", match: 92, location: "Remote", auto: true },
  { company: "Railway", match: 87, location: "SF · Remote", auto: true },
  { company: "Resend", match: 95, location: "Remote — US", auto: true },
  { company: "Clerk", match: 91, location: "SF · Remote", auto: true },
  { company: "Datadog", match: 86, location: "New York, NY", auto: true },
  { company: "Cloudflare", match: 89, location: "Lisbon, PT", auto: true },
  { company: "Prisma", match: 90, location: "Berlin, DE", auto: true },
  { company: "Vercel", match: 93, location: "Remote", auto: true },
  { company: "1Password", match: 88, location: "Toronto, ON", auto: true },
  { company: "Sentry", match: 92, location: "SF · Remote", auto: true },
  { company: "Chime", match: 85, location: "San Francisco, CA", auto: true },
  { company: "Brex", match: 90, location: "New York, NY", auto: true },
  { company: "Ramp", match: 94, location: "Miami, FL", auto: true },
  { company: "Deel", match: 91, location: "Remote", auto: true },
  { company: "Retool", match: 87, location: "San Francisco, CA", auto: true },
];

const INTERVIEWING_JOBS = [
  { company: "Vector AI", match: 92, location: "New York, NY" },
  { company: "Stripe", match: 95, location: "SF · Remote" },
  { company: "Figma", match: 91, location: "Remote — US" },
  { company: "OpenAI", match: 96, location: "San Francisco, CA" },
  { company: "Anthropic", match: 94, location: "San Francisco, CA" },
  { company: "Netflix", match: 93, location: "Los Gatos, CA" },
];

const INCOMING_JOB = { company: "Acme Cloud", match: 94, location: "SF · Remote", auto: true };

export const JobApplicationsBoard: React.FC<JobApplicationsBoardProps> = ({
  scale = 1,
  localFrame,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  // Timings:
  // Board reveals at local frame 295 (when browser mockup becomes fully visible)
  const boardStart = 295;
  const colStagger = 5;

  // Incoming card timing: drops in at local frame 330
  const dropStart = 330;
  const dropDur = 15;

  // Columns fade-in
  const getColOpacity = (idx: number) => {
    const trigger = boardStart + idx * colStagger;
    return interpolate(localFrame, [trigger, trigger + 10], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  const getColY = (idx: number) => {
    const trigger = boardStart + idx * colStagger;
    const progress = interpolate(localFrame, [trigger, trigger + 12], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return interpolate(progress, [0, 1], [18, 0]);
  };

  // Incoming Card animation
  const dropProgress = interpolate(localFrame, [dropStart, dropStart + dropDur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const incomingOpacity = dropProgress;
  const incomingY = interpolate(dropProgress, [0, 1], [-24, 0]);
  const incomingScale = interpolate(dropProgress, [0, 1], [0.95, 1]);

  // Glow shadow animation for the dropped card
  const glowOpacity = interpolate(localFrame, [dropStart + 2, dropStart + dropDur + 15], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const incomingShadow = `0 0 0 ${px(glowOpacity * 2)}px rgba(83, 58, 253, 0.45), 0 ${px(glowOpacity * 8)}px ${px(glowOpacity * 24)}px rgba(83, 58, 253, 0.25), 0 ${px(2)}px ${px(4)}px rgba(0,0,0,0.05)`;

  // Counter animation: counts Applied from 46 to 47
  const appliedCountProgress = interpolate(localFrame, [dropStart + 5, dropStart + 12], [46, 47], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const currentAppliedCount = Math.round(appliedCountProgress);

  // Staggered initial cards opacity
  const getCardOpacity = (colIdx: number, cardIdx: number) => {
    if (cardIdx >= 4) return 1; // already visible off-screen when scrolled in
    const trigger = boardStart + 8 + colIdx * 6 + cardIdx * 4;
    return interpolate(localFrame, [trigger, trigger + 8], [0, 1], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
  };

  // Column scrolling animations starting after the card drop (frame 345 onwards)
  const savedScroll = interpolate(localFrame, [345, 387], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const appliedScroll = interpolate(localFrame, [345, 387], [0, -450], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const interviewingScroll = interpolate(localFrame, [345, 387], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        display: "flex",
        gap: px(16),
        fontFamily: FONTS.body,
        textAlign: "left",
      }}
    >
      {/* ── Column 1: Saved ── */}
      <div
        style={{
          width: px(170),
          display: "flex",
          flexDirection: "column",
          opacity: getColOpacity(0),
          transform: `translateY(${getColY(0)}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: px(8), padding: `0 ${px(4)}px` }}>
          <span style={{ fontSize: px(12), fontWeight: 700, color: "#273951" }}>Saved</span>
          <span
            style={{
              marginLeft: "auto",
              background: "#eff1fd",
              color: "#273951",
              borderRadius: px(4),
              padding: `${px(1)}px ${px(5)}px`,
              fontSize: px(10),
              fontWeight: 700,
            }}
          >
            12
          </span>
        </div>
        {/* Track */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: px(8),
            padding: px(8),
            background: "#f6f9fc",
            border: "1px solid #e5edf5",
            borderRadius: px(6),
            height: px(320),
            overflow: "hidden",
          }}
        >
          {/* Scrollable Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: px(8),
              transform: `translateY(${px(savedScroll)}px)`,
            }}
          >
            {SAVED_JOBS.map((job, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5edf5",
                  borderRadius: px(5),
                  padding: px(10),
                  display: "flex",
                  flexDirection: "column",
                  gap: px(5),
                  opacity: getCardOpacity(0, idx),
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: px(11), fontWeight: 600, color: "#061b31", lineHeight: 1.2 }}>{job.company}</span>
                  <span style={{ fontSize: px(8), color: "#533afd", background: "rgba(83, 58, 253, 0.08)", padding: `${px(1)}px ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>{job.match}%</span>
                </div>
                <div style={{ fontSize: px(10), color: "#64748d" }}>{job.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 2: Applied ── */}
      <div
        style={{
          width: px(170),
          display: "flex",
          flexDirection: "column",
          opacity: getColOpacity(1),
          transform: `translateY(${getColY(1)}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: px(8), padding: `0 ${px(4)}px` }}>
          <span style={{ fontSize: px(12), fontWeight: 700, color: "#273951" }}>Applied</span>
          <span
            style={{
              marginLeft: "auto",
              background: "#eff1fd",
              color: "#273951",
              borderRadius: px(4),
              padding: `${px(1)}px ${px(5)}px`,
              fontSize: px(10),
              fontWeight: 700,
            }}
          >
            {currentAppliedCount}
          </span>
        </div>
        {/* Track */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: px(8),
            padding: px(8),
            background: "#f6f9fc",
            border: "1px solid #e5edf5",
            borderRadius: px(6),
            height: px(320),
            overflow: "hidden",
          }}
        >
          {/* Scrollable Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: px(8),
              transform: `translateY(${px(appliedScroll)}px)`,
            }}
          >
            {/* Incoming Automated Card */}
            {localFrame >= dropStart && (
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5edf5",
                  borderRadius: px(5),
                  padding: px(10),
                  display: "flex",
                  flexDirection: "column",
                  gap: px(5),
                  opacity: incomingOpacity,
                  transform: `translateY(${px(incomingY)}px) scale(${incomingScale})`,
                  boxShadow: incomingShadow,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: px(11), fontWeight: 600, color: "#061b31", lineHeight: 1.2 }}>{INCOMING_JOB.company}</span>
                  <span style={{ fontSize: px(8), color: "#533afd", background: "rgba(83, 58, 253, 0.08)", padding: `${px(1)}px ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>{INCOMING_JOB.match}%</span>
                </div>
                <div style={{ fontSize: px(10), color: "#64748d", display: "flex", justifyContent: "space-between" }}>
                  <span>{INCOMING_JOB.location}</span>
                  <span style={{ fontSize: px(8), background: "rgba(21, 190, 83, 0.2)", color: "#0d7a35", padding: `0 ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>AUTO</span>
                </div>
              </div>
            )}

            {APPLIED_JOBS.map((job, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5edf5",
                  borderRadius: px(5),
                  padding: px(10),
                  display: "flex",
                  flexDirection: "column",
                  gap: px(5),
                  opacity: getCardOpacity(1, idx),
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: px(11), fontWeight: 600, color: "#061b31", lineHeight: 1.2 }}>{job.company}</span>
                  <span style={{ fontSize: px(8), color: "#533afd", background: "rgba(83, 58, 253, 0.08)", padding: `${px(1)}px ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>{job.match}%</span>
                </div>
                <div style={{ fontSize: px(10), color: "#64748d", display: "flex", justifyContent: "space-between" }}>
                  <span>{job.location}</span>
                  {job.auto && (
                    <span style={{ fontSize: px(8), background: "rgba(21, 190, 83, 0.2)", color: "#0d7a35", padding: `0 ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>AUTO</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Column 3: Interviewing ── */}
      <div
        style={{
          width: px(170),
          display: "flex",
          flexDirection: "column",
          opacity: getColOpacity(2),
          transform: `translateY(${getColY(2)}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: px(8), padding: `0 ${px(4)}px` }}>
          <span style={{ fontSize: px(12), fontWeight: 700, color: "#273951" }}>Interviewing</span>
          <span
            style={{
              marginLeft: "auto",
              background: "#eff1fd",
              color: "#273951",
              borderRadius: px(4),
              padding: `${px(1)}px ${px(5)}px`,
              fontSize: px(10),
              fontWeight: 700,
            }}
          >
            6
          </span>
        </div>
        {/* Track */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: px(8),
            padding: px(8),
            background: "#f6f9fc",
            border: "1px solid #e5edf5",
            borderRadius: px(6),
            height: px(320),
            overflow: "hidden",
          }}
        >
          {/* Scrollable Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: px(8),
              transform: `translateY(${px(interviewingScroll)}px)`,
            }}
          >
            {INTERVIEWING_JOBS.map((job, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5edf5",
                  borderRadius: px(5),
                  padding: px(10),
                  display: "flex",
                  flexDirection: "column",
                  gap: px(5),
                  opacity: getCardOpacity(2, idx),
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: px(11), fontWeight: 600, color: "#061b31", lineHeight: 1.2 }}>{job.company}</span>
                  <span style={{ fontSize: px(8), color: "#533afd", background: "rgba(83, 58, 253, 0.08)", padding: `${px(1)}px ${px(4)}px`, borderRadius: px(3), fontWeight: 700 }}>{job.match}%</span>
                </div>
                <div style={{ fontSize: px(10), color: "#64748d" }}>{job.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
