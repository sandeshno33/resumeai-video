import { Composition, registerRoot } from "remotion";
import { ResumeAIVideo } from "./compositions/ResumeAIVideo";
import { TOTAL_FRAMES, FPS, COMPOSITIONS } from "./config/config";
import "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};

registerRoot(RemotionRoot);
