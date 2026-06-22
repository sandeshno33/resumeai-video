import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, staticFile, Sequence } from "remotion";
import { AnimatedBackground } from "../components/Background";
import { Logo } from "../components/Logo";
import { SceneHookNew } from "../scenes/SceneHookNew";
import { SceneFlexNew } from "../scenes/SceneFlexNew";
import { SceneStatsNew } from "../scenes/SceneStatsNew";
import { SceneCTANew } from "../scenes/SceneCTANew";
import { TIMING_NEW, COLORS, FONTS, TOTAL_FRAMES_NEW, FPS } from "../config/config";
import { interpolate } from "remotion";

interface VideoProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const ResumeAINewVideo: React.FC<VideoProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  // Logo appears on all scenes except the final CTA (which has its own large title)
  const logoOp = interpolate(
    frame,
    [TIMING_NEW.SCENE_CTA - 8, TIMING_NEW.SCENE_CTA],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoPad = isPortrait ? 32 : 24;
  const logoScale = isPortrait ? 0.75 : isSquare ? 0.85 : 0.7;

  // Scene progress bar
  const progressW = (frame / TOTAL_FRAMES_NEW) * width;

  // Background music volume fade out at the very end of the video
  const musicVolume = interpolate(
    frame,
    [TOTAL_FRAMES_NEW - 30, TOTAL_FRAMES_NEW - 5],
    [0.12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ fontFamily: FONTS.body }}>
      {/* Background */}
      <AnimatedBackground width={width} height={height} />
      {/* Voiceover audio track */}
      <Audio src={staticFile("Generated Audio June 12, 2026 - 5_28PM.wav")} />
      {/* Background Music (Chill Day) - Start 3 seconds in (the drop) with a premium ending fade-out */}
      <Audio src={staticFile("Chill Day.mp3")} volume={musicVolume} startFrom={3 * FPS} />
      {/* ── SOUND DESIGN (SFX) ────────────────────────────────────────────────── */}
      {/* Scene 1 Intro Swoosh & Cinematic Impact */}
      <Sequence from={0} durationInFrames={120}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Impacts/Cinematic Impact.mp3")} volume={0.3} />
      </Sequence>
      <Sequence from={0} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 1.mp3")} volume={0.25} />
      </Sequence>
      {/* Rejected Stamp Slam Impact (Scene 1) */}
      <Sequence from={130} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Impacts/Metal Impact.mp3")} volume={0.35} />
      </Sequence>
      {/* Transition to Flex (Scene 2, Part A) */}
      <Sequence from={321} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 2.mp3")} volume={0.2} />
      </Sequence>
      {/* Mechanical Keyboard Typing loop (Scene 2, Part A) */}
      <Sequence from={329} durationInFrames={170}>
        <Audio
          src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Keyboard Typing Treble Version.wav")}
          volume={0.08}
        />
      </Sequence>
      {/* ATS Success Focus Beep (Scene 2, Part A score update) */}
      <Sequence from={436} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Camera Sounds/Sony A7III Focus Beep.wav")} volume={0.25} />
      </Sequence>
      {/* Transition to Chrome Extension (Scene 2, Part B) */}
      <Sequence from={491} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 3.mp3")} volume={0.2} />
      </Sequence>
      {/* Chrome Auto Apply Click (Scene 2, Part B) */}
      <Sequence from={539} durationInFrames={30}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Key Medium by Bigmonmulgrew.wav")} volume={0.15} />
      </Sequence>
      {/* Kanban Board Card Drop SFX (Scene 2, Part B) */}
      <Sequence from={659} durationInFrames={30}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Drops/Drop 1.mp3")} volume={0.25} />
      </Sequence>
      {/* Transition to Stats (Scene 3) */}
      <Sequence from={706} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 1.mp3")} volume={0.2} />
      </Sequence>
      {/* Stats Payoff Boom (Scene 3) */}
      <Sequence from={716} durationInFrames={120}>
        <Audio src={staticFile("music for edit/Ping Boom Major_Minor/Ping Boom Major_Minor G.wav")} volume={0.3} />
      </Sequence>
      {/* Transition to CTA (Scene 4) */}
      <Sequence from={950} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 2.mp3")} volume={0.2} />
      </Sequence>
      {/* CTA Finale Pitch Hit / Chord Boom (Scene 4) */}
      <Sequence from={960} durationInFrames={120}>
        <Audio src={staticFile("music for edit/Ping Boom Major_Minor/Ping Boom Major_Minor G.wav")} volume={0.3} />
      </Sequence>
      {/* All scenes */}
      <SceneHookNew width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneFlexNew width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneStatsNew width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneCTANew width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      {/* Persistent logo watermark (top-left) */}
      <div
        style={{
          position: "absolute",
          top: logoPad,
          left: logoPad,
          opacity: logoOp,
          zIndex: 100,
        }}
      >
        <Logo scale={logoScale} />
      </div>
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: progressW,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.accentBlue}, ${COLORS.accentCyan})`,
          zIndex: 200,
        }}
      />
      {/* Scene indicator dots (portrait/square only) */}
      {(isPortrait || isSquare) && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            zIndex: 100,
          }}
        >
          {[TIMING_NEW.SCENE_HOOK, TIMING_NEW.SCENE_FLEX, TIMING_NEW.SCENE_STATS, TIMING_NEW.SCENE_CTA].map((t, i) => {
            const nextT = [TIMING_NEW.SCENE_FLEX, TIMING_NEW.SCENE_STATS, TIMING_NEW.SCENE_CTA, TOTAL_FRAMES_NEW][i];
            const active = frame >= t && frame < nextT;
            return (
              <div
                key={i}
                style={{
                  width: active ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: active ? COLORS.accentCyan : COLORS.textDim,
                  transition: "all 0.2s",
                }}
              />
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
