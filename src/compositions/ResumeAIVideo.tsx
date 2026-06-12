import React from "react";
import { AbsoluteFill, useCurrentFrame, Audio, staticFile, Sequence } from "remotion";
import { AnimatedBackground } from "../components/Background";
import { Logo } from "../components/Logo";
import { SceneHook } from "../scenes/SceneHook";
import { SceneBuilder } from "../scenes/SceneBuilder";
import { SceneATS } from "../scenes/SceneATS";
import { SceneRecruiter } from "../scenes/SceneRecruiter";
import { SceneCTA } from "../scenes/SceneCTA";
import { TIMING, COLORS, FONTS, TOTAL_FRAMES, FPS } from "../config/config";
import { interpolate } from "remotion";

interface VideoProps {
  width: number;
  height: number;
  isPortrait?: boolean;
  isSquare?: boolean;
}

export const ResumeAIVideo: React.FC<VideoProps> = ({
  width,
  height,
  isPortrait = false,
  isSquare = false,
}) => {
  const frame = useCurrentFrame();

  // Logo appears on all scenes except the final CTA (which has its own large logo)
  const logoOp = interpolate(
    frame,
    [TIMING.SCENE_CTA - 8, TIMING.SCENE_CTA],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const logoPad = isPortrait ? 32 : 24;
  const logoScale = isPortrait ? 0.75 : isSquare ? 0.85 : 0.7;

  // Scene progress bar
  const progressW = (frame / TOTAL_FRAMES) * width;

  // Background music volume fade out at the very end of the video
  const musicVolume = interpolate(
    frame,
    [TOTAL_FRAMES - 30, TOTAL_FRAMES - 5],
    [0.12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ fontFamily: FONTS.body }}>
      {/* Background */}
      <AnimatedBackground width={width} height={height} />

      {/* Voiceover audio track */}
      <Audio src={staticFile("voice over.wav")} />

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

      {/* Transition to Builder (Scene 2) */}
      <Sequence from={140} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 2.mp3")} volume={0.2} />
      </Sequence>

      {/* Mechanical Keyboard Typing loop (Scene 2) */}
      <Sequence from={150} durationInFrames={150}>
        <Audio
          src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Keyboard Typing Treble Version.wav")}
          volume={0.08}
        />
      </Sequence>

      {/* Transition to ATS (Scene 3) */}
      <Sequence from={290} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 3.mp3")} volume={0.2} />
      </Sequence>

      {/* ATS Success Focus Beep (Scene 3) */}
      <Sequence from={355} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Camera Sounds/Sony A7III Focus Beep.wav")} volume={0.25} />
      </Sequence>

      {/* Transition to Recruiter (Scene 4) */}
      <Sequence from={410} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 1.mp3")} volume={0.2} />
      </Sequence>

      {/* Recruiter Search Results Cards Tactile Clicks (Scene 4) */}
      <Sequence from={446} durationInFrames={30}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Key Medium by Bigmonmulgrew.wav")} volume={0.15} />
      </Sequence>
      <Sequence from={458} durationInFrames={30}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Key Medium by Bigmonmulgrew.wav")} volume={0.15} />
      </Sequence>
      <Sequence from={470} durationInFrames={30}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Keyboard Typing/Mechanical Key Medium by Bigmonmulgrew.wav")} volume={0.15} />
      </Sequence>

      {/* Transition to CTA (Scene 5) */}
      <Sequence from={530} durationInFrames={60}>
        <Audio src={staticFile("music for edit/Social SFX Pack - Collection 1/Whooshs/Whoosh 2.mp3")} volume={0.2} />
      </Sequence>

      {/* CTA Finale Pitch Hit / Chord Boom (Scene 5) */}
      <Sequence from={540} durationInFrames={120}>
        <Audio src={staticFile("music for edit/Ping Boom Major_Minor/Ping Boom Major_Minor G.wav")} volume={0.3} />
      </Sequence>

      {/* All scenes — they handle their own in/out opacity */}
      <SceneHook width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneBuilder width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneATS width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneRecruiter width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />
      <SceneCTA width={width} height={height} isPortrait={isPortrait} isSquare={isSquare} />


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
          {[TIMING.SCENE_HOOK, TIMING.SCENE_BUILDER, TIMING.SCENE_ATS, TIMING.SCENE_RECRUITER, TIMING.SCENE_CTA].map((t, i) => {
            const nextT = [TIMING.SCENE_BUILDER, TIMING.SCENE_ATS, TIMING.SCENE_RECRUITER, TIMING.SCENE_CTA, TOTAL_FRAMES][i];
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
