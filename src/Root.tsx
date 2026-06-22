import { Composition, registerRoot } from "remotion";
import { ResumeAIVideo } from "./compositions/ResumeAIVideo";
import { ResumeAINewVideo } from "./compositions/ResumeAINewVideo";
import { TOTAL_FRAMES, TOTAL_FRAMES_NEW, FPS, COMPOSITIONS, COMPOSITIONS_NEW } from "./config/config";
import "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ────────────────── ORIGINAL 15S VIDEO ────────────────── */}
      {/* 16:9 — 1920×1080 — YouTube, Display, Pre-roll */}
      <Composition
        id={COMPOSITIONS.landscape.id}
        component={ResumeAIVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMPOSITIONS.landscape.width}
        height={COMPOSITIONS.landscape.height}
        defaultProps={{
          width:      COMPOSITIONS.landscape.width,
          height:     COMPOSITIONS.landscape.height,
          isPortrait: false,
          isSquare:   false,
        }}
      />

      {/* 9:16 — 1080×1920 — Shorts, Stories, Reels */}
      <Composition
        id={COMPOSITIONS.portrait.id}
        component={ResumeAIVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMPOSITIONS.portrait.width}
        height={COMPOSITIONS.portrait.height}
        defaultProps={{
          width:      COMPOSITIONS.portrait.width,
          height:     COMPOSITIONS.portrait.height,
          isPortrait: true,
          isSquare:   false,
        }}
      />

      {/* 1:1 — 1080×1080 — Feed, Discovery */}
      <Composition
        id={COMPOSITIONS.square.id}
        component={ResumeAIVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={COMPOSITIONS.square.width}
        height={COMPOSITIONS.square.height}
        defaultProps={{
          width:      COMPOSITIONS.square.width,
          height:     COMPOSITIONS.square.height,
          isPortrait: false,
          isSquare:   true,
        }}
      />

      {/* ────────────────── NEW NEPALI VO (37.52S) VIDEO ────────────────── */}
      {/* 16:9 Landscape */}
      <Composition
        id={COMPOSITIONS_NEW.landscape.id}
        component={ResumeAINewVideo}
        durationInFrames={TOTAL_FRAMES_NEW}
        fps={FPS}
        width={COMPOSITIONS_NEW.landscape.width}
        height={COMPOSITIONS_NEW.landscape.height}
        defaultProps={{
          width:      COMPOSITIONS_NEW.landscape.width,
          height:     COMPOSITIONS_NEW.landscape.height,
          isPortrait: false,
          isSquare:   false,
        }}
      />

      {/* 9:16 Portrait */}
      <Composition
        id={COMPOSITIONS_NEW.portrait.id}
        component={ResumeAINewVideo}
        durationInFrames={TOTAL_FRAMES_NEW}
        fps={FPS}
        width={COMPOSITIONS_NEW.portrait.width}
        height={COMPOSITIONS_NEW.portrait.height}
        defaultProps={{
          width:      COMPOSITIONS_NEW.portrait.width,
          height:     COMPOSITIONS_NEW.portrait.height,
          isPortrait: true,
          isSquare:   false,
        }}
      />

      {/* 1:1 Square */}
      <Composition
        id={COMPOSITIONS_NEW.square.id}
        component={ResumeAINewVideo}
        durationInFrames={TOTAL_FRAMES_NEW}
        fps={FPS}
        width={COMPOSITIONS_NEW.square.width}
        height={COMPOSITIONS_NEW.square.height}
        defaultProps={{
          width:      COMPOSITIONS_NEW.square.width,
          height:     COMPOSITIONS_NEW.square.height,
          isPortrait: false,
          isSquare:   true,
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);

