import React from "react";
import { FONTS } from "../config/config";

interface LinkedInCardProps {
  scale?: number;
  applicantCount?: number;
}

export const LinkedInCard: React.FC<LinkedInCardProps> = ({
  scale = 1,
  applicantCount = 214,
}) => {
  const s = scale;
  const px = (n: number) => n * s;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: px(8),
        padding: `${px(20)}px ${px(24)}px`,
        display: "flex",
        gap: px(16),
        boxShadow: "0 0 0 1px #e0dfdc",
        fontFamily: FONTS.body,
        textAlign: "left",
        width: px(500),
      }}
    >
      {/* Company Logo */}
      <div
        style={{
          width: px(56),
          height: px(56),
          borderRadius: px(8),
          background: "linear-gradient(135deg, #0a66c2, #084a93)",
          color: "#ffffff",
          display: "grid",
          placeItems: "center",
          fontWeight: 600,
          fontSize: px(20),
          fontFamily: FONTS.display,
          flexShrink: 0,
        }}
      >
        AC
      </div>

      {/* Meta Content */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            fontSize: px(20),
            color: "#000000",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Senior Full-Stack Engineer
        </div>
        <div
          style={{
            fontSize: px(14),
            color: "#000000",
            marginTop: px(4),
          }}
        >
          Acme Cloud
        </div>
        <div
          style={{
            fontSize: px(12),
            color: "#666666",
            marginTop: px(2),
          }}
        >
          San Francisco, CA · Remote · {applicantCount} applicants
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: px(8), marginTop: px(10) }}>
          {["Full-time", "Senior", "Remote"].map((tag) => (
            <span
              key={tag}
              style={{
                padding: `${px(3)}px ${px(10)}px`,
                background: "#eef3f8",
                color: "#0a66c2",
                borderRadius: px(999),
                fontSize: px(11),
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Easy Apply Button */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: px(6),
            padding: `${px(8)}px ${px(16)}px`,
            background: "#0a66c2",
            color: "#ffffff",
            borderRadius: px(999),
            fontSize: px(14),
            fontWeight: 600,
            alignSelf: "flex-start",
            marginTop: px(14),
          }}
        >
          {/* LinkedIn Zap Icon */}
          <svg
            width={px(12)}
            height={px(12)}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ flexShrink: 0 }}
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Easy Apply
        </div>
      </div>
    </div>
  );
};
