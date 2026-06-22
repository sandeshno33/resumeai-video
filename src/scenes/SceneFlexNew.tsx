import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONTS, TIMING_NEW, COPY_NEW } from "../config/config";
import { ATSOptimizerCard } from "../components/ATSOptimizerCard";
import { ChromeExtensionPopover } from "../components/ChromeExtensionPopover";
import { LinkedInCard } from "../components/LinkedInCard";
import { JobApplicationsBoard } from "../components/JobApplicationsBoard";
import { useFadeIn, useSlideUp, useSceneTransition } from "../components/utils";

interface SceneProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const SceneFlexNew: React.FC<SceneProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  const sceneStart = TIMING_NEW.SCENE_FLEX;
  const sceneEnd = TIMING_NEW.SCENE_STATS;

  // Scene transition
  const { opacity, tx, scale } = useSceneTransition(sceneStart, sceneEnd, 8);

  // Local frame count starting at 0 (from frame 258 to 716)
  const localFrame = frame - sceneStart;

  // ─── PART A: ATS OPTIMIZER (localFrame 0 to 170) ───
  const isPartA = localFrame < 170;
  const partAOpacity = interpolate(localFrame, [162, 170], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const partATx = interpolate(localFrame, [162, 170], [0, -300], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const partAScale = interpolate(localFrame, [162, 170], [1, 0.96], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Part A Text animations
  const badgeAOp = useFadeIn(10, 8);
  const titleAOp = useFadeIn(18, 10);
  const titleAY = useSlideUp(18, 16);
  const subAOp = useFadeIn(26, 10);

  // Part A Card animation
  const cardAOp = useFadeIn(15, 12);
  const cardAY = useSlideUp(15, 30);

  // ─── PART B: CHROME EXTENSION & KANBAN (localFrame 170 to 387) ───
  const isPartB = localFrame >= 170;
  const partBOpacity = interpolate(localFrame, [170, 178], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Phase B1: Extension on LinkedIn (localFrame 170 to 280)
  const isB1 = localFrame < 280;
  const b1Opacity = localFrame < 280
    ? interpolate(localFrame, [190, 198], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(localFrame, [280, 288], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b1Tx = localFrame < 280
    ? interpolate(localFrame, [190, 198], [300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })
    : interpolate(localFrame, [280, 288], [0, -300], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const b1Scale = localFrame < 280
    ? interpolate(localFrame, [190, 198], [0.96, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(localFrame, [280, 288], [1, 0.96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text B1 animations
  const badgeB1Op = interpolate(localFrame, [178, 186], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleB1Op = interpolate(localFrame, [184, 194], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleB1Y = interpolate(localFrame, [184, 196], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const subB1Op = interpolate(localFrame, [190, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Card B1 Browser mock reveal
  const browserOp = localFrame < 280
    ? interpolate(localFrame, [176, 190], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(localFrame, [280, 292], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const browserY = interpolate(localFrame, [176, 190], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Phase B2: Kanban board (localFrame 280 to 387)
  const isB2 = localFrame >= 280;
  const b2Opacity = interpolate(localFrame, [280, 288], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b2Tx = interpolate(localFrame, [280, 288], [300, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const b2Scale = interpolate(localFrame, [280, 288], [0.96, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Text B2 animations (starts post-280)
  const badgeB2Op = interpolate(localFrame, [290, 298], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleB2Op = interpolate(localFrame, [295, 305], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleB2Y = interpolate(localFrame, [295, 307], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const subB2Op = interpolate(localFrame, [302, 312], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Kanban Board reveal
  const boardOp = interpolate(localFrame, [284, 298], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const boardY = interpolate(localFrame, [284, 298], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  const isRow = !isPortrait && !isSquare;

  // Responsive sizes
  const titleSize = isPortrait ? 48 : isSquare ? 42 : 58;
  const subSize = isPortrait ? 26 : isSquare ? 22 : 28;
  
  // Increased scales
  const scaleFactor = isPortrait ? 1.65 : isSquare ? 1.55 : 1.75;
  const browserWidth = isPortrait ? width * 0.94 : isSquare ? width * 0.94 : 960;
  const browserHeight = isPortrait ? height * 0.48 : isSquare ? height * 0.52 : 640;
  const innerCardScale = isPortrait ? 1.3 : isSquare ? 1.25 : 1.45;
  const innerPopoverScale = isPortrait ? 1.25 : isSquare ? 1.2 : 1.35;
  const innerBoardScale = isPortrait ? 1.3 : isSquare ? 1.25 : 1.4;

  const bs = isPortrait ? 1.3 : isSquare ? 1.2 : 1.35;
  const bpx = (n: number) => n * bs;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateX(${tx}px) scale(${scale})`,
      }}
    >
      {/* ═══════════ PART A: ATS OPTIMIZER ═══════════ */}
      {isPartA && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: isRow ? "row" : "column",
            alignItems: "center",
            justifyContent: isRow ? "space-between" : "center",
            padding: isRow ? `0 ${width * 0.08}px` : `0 ${width * 0.05}px`,
            opacity: partAOpacity,
            transform: `translateX(${partATx}px) scale(${partAScale})`,
            gap: isPortrait ? 40 : isSquare ? 30 : 0,
          }}
        >
          {/* Left Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              maxWidth: isRow ? width * 0.45 : width * 0.9,
              textAlign: isRow ? "left" : "center",
              alignItems: isRow ? "flex-start" : "center",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: `${COLORS.accentGreen}1a`,
                border: `1px solid ${COLORS.accentGreen}44`,
                borderRadius: 100,
                padding: "6px 14px",
                opacity: badgeAOp,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentGreen }} />
              <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.accentGreen, letterSpacing: "0.06em" }}>
                {COPY_NEW.flex.atsLabel}
              </span>
            </div>

            <h1
              style={{
                fontFamily: FONTS.display,
                fontSize: titleSize,
                fontWeight: 700,
                color: COLORS.textWhite,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                opacity: titleAOp,
                transform: `translateY(${titleAY}px)`,
              }}
            >
              {COPY_NEW.flex.atsTitle}
            </h1>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: subSize,
                color: COLORS.textMuted,
                opacity: subAOp,
                lineHeight: 1.4,
              }}
            >
              {COPY_NEW.flex.atsSub}
            </p>
          </div>

          {/* ATS UI Card */}
          <div
            style={{
              opacity: cardAOp,
              transform: `translateY(${cardAY}px)`,
              flexShrink: 0,
            }}
          >
            <ATSOptimizerCard scale={scaleFactor} localFrame={localFrame} />
          </div>
        </div>
      )}

      {/* ═══════════ PART B: CHROME EXTENSION & KANBAN ═══════════ */}
      {isPartB && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: partBOpacity,
          }}
        >
          {/* Phase B1: Extension popover */}
          {!isB2 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: isRow ? "row" : "column",
                alignItems: "center",
                justifyContent: isRow ? "space-between" : "center",
                padding: isRow ? `0 ${width * 0.08}px` : `0 ${width * 0.05}px`,
                opacity: b1Opacity,
                transform: `translateX(${b1Tx}px) scale(${b1Scale})`,
                gap: isPortrait ? 40 : isSquare ? 30 : 0,
              }}
            >
              {/* Left Text */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  maxWidth: isRow ? width * 0.45 : width * 0.9,
                  textAlign: isRow ? "left" : "center",
                  alignItems: isRow ? "flex-start" : "center",
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: `${COLORS.accentCyan}1a`,
                    border: `1px solid ${COLORS.accentCyan}44`,
                    borderRadius: 100,
                    padding: "6px 14px",
                    opacity: badgeB1Op,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentCyan }} />
                  <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.accentCyan, letterSpacing: "0.06em" }}>
                    {COPY_NEW.flex.extLabel}
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: titleSize,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    opacity: titleB1Op,
                    transform: `translateY(${titleB1Y}px)`,
                  }}
                >
                  {COPY_NEW.flex.extTitle}
                </h1>

                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: subSize,
                    color: COLORS.textMuted,
                    opacity: subB1Op,
                    lineHeight: 1.4,
                  }}
                >
                  {COPY_NEW.flex.extSub}
                </p>
              </div>

              {/* Browser Mock Frame on Right */}
              <div
                style={{
                  opacity: browserOp,
                  transform: `translateY(${browserY}px)`,
                  flexShrink: 0,
                  position: "relative",
                  width: browserWidth,
                  height: browserHeight,
                  background: "#ffffff",
                  borderRadius: bpx(12),
                  boxShadow: `0 ${bpx(24)}px ${bpx(60)}px rgba(0,0,0,0.35), 0 0 0 ${bpx(1)}px rgba(255,255,255,0.1)`,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Browser Header */}
                <div
                  style={{
                    background: "#f3f5fe",
                    height: bpx(44),
                    display: "flex",
                    alignItems: "center",
                    padding: `0 ${bpx(16)}px`,
                    gap: bpx(12),
                    borderBottom: `${bpx(1)}px solid #e5edf5`,
                  }}
                >
                  <div style={{ display: "flex", gap: bpx(5) }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <div key={i} style={{ width: bpx(8), height: bpx(8), borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: bpx(999),
                      flex: 1,
                      fontSize: bpx(11),
                      color: "#64748d",
                      padding: `${bpx(4)}px ${bpx(16)}px`,
                      display: "flex",
                      alignItems: "center",
                      gap: bpx(6),
                      border: `${bpx(1)}px solid #e5edf5`,
                      fontFamily: FONTS.mono,
                      height: bpx(28),
                    }}
                  >
                    <span style={{ fontSize: bpx(11) }}>🔒</span>
                    linkedin.com/jobs/view/3914872660
                  </div>
                </div>

                {/* LinkedIn Card Background */}
                <div style={{ flex: 1, padding: bpx(20), background: "#f3f2ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LinkedInCard scale={innerCardScale} />
                </div>

                {/* Floating Chrome Extension Popover Overlaid */}
                <div
                  style={{
                    position: "absolute",
                    top: bpx(52),
                    right: bpx(16),
                    zIndex: 10,
                  }}
                >
                  <ChromeExtensionPopover scale={innerPopoverScale} localFrame={localFrame} />
                </div>
              </div>
            </div>
          )}

          {/* Phase B2: Applications Kanban Board */}
          {isB2 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: isRow ? "row" : "column",
                alignItems: "center",
                justifyContent: isRow ? "space-between" : "center",
                padding: isRow ? `0 ${width * 0.08}px` : `0 ${width * 0.05}px`,
                opacity: b2Opacity,
                transform: `translateX(${b2Tx}px) scale(${b2Scale})`,
                gap: isPortrait ? 40 : isSquare ? 30 : 0,
              }}
            >
              {/* Left Text */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  maxWidth: isRow ? width * 0.45 : width * 0.9,
                  textAlign: isRow ? "left" : "center",
                  alignItems: isRow ? "flex-start" : "center",
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: `${COLORS.accentBlue}1a`,
                    border: `1px solid ${COLORS.accentBlue}44`,
                    borderRadius: 100,
                    padding: "6px 14px",
                    opacity: badgeB2Op,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accentBlue }} />
                  <span style={{ fontFamily: FONTS.body, fontSize: 13, fontWeight: 700, color: COLORS.accentBlue, letterSpacing: "0.06em" }}>
                    APPLICATION TRACKER
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: titleSize,
                    fontWeight: 700,
                    color: COLORS.textWhite,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    opacity: titleB2Op,
                    transform: `translateY(${titleB2Y}px)`,
                  }}
                >
                  {COPY_NEW.flex.boardTitle}
                </h1>

                <p
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: subSize,
                    color: COLORS.textMuted,
                    opacity: subB2Op,
                    lineHeight: 1.4,
                  }}
                >
                  {COPY_NEW.flex.boardSub}
                </p>
              </div>

              {/* Kanban Board Mockup on Right */}
              <div
                style={{
                  opacity: boardOp,
                  transform: `translateY(${boardY}px)`,
                  flexShrink: 0,
                  position: "relative",
                  width: browserWidth,
                  height: browserHeight,
                  background: "#ffffff",
                  borderRadius: bpx(12),
                  boxShadow: `0 ${bpx(24)}px ${bpx(60)}px rgba(0,0,0,0.35), 0 0 0 ${bpx(1)}px rgba(255,255,255,0.1)`,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Board Mock Header */}
                <div
                  style={{
                    background: "#1c1e54",
                    height: bpx(44),
                    display: "flex",
                    alignItems: "center",
                    padding: `0 ${bpx(16)}px`,
                    gap: bpx(10),
                    borderBottom: `${bpx(1)}px solid rgba(255,255,255,0.08)`,
                  }}
                >
                  <div style={{ display: "flex", gap: bpx(5) }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                      <div key={i} style={{ width: bpx(8), height: bpx(8), borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: bpx(12),
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 600,
                      marginLeft: bpx(8),
                      fontFamily: FONTS.display,
                    }}
                  >
                    {COPY_NEW.flex.boardLabel}
                  </span>
                  <div
                    style={{
                      marginLeft: "auto",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: bpx(4),
                      padding: `${bpx(3)}px ${bpx(8)}px`,
                      fontSize: bpx(10),
                      color: "#ffffff",
                      fontWeight: 600,
                    }}
                  >
                    Refresh
                  </div>
                </div>

                {/* Kanban content */}
                <div style={{ flex: 1, padding: bpx(16), background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <JobApplicationsBoard scale={innerBoardScale} localFrame={localFrame} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper scale function local
const px = (n: number) => n;
