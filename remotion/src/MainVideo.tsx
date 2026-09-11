import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { Background } from "./components/Background";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Topology } from "./scenes/Scene2Topology";
import { Scene3Segmentation } from "./scenes/Scene3Segmentation";
import { Scene4Defense } from "./scenes/Scene4Defense";
import { Scene5Results } from "./scenes/Scene5Results";

const T = 20; // frames de transição

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={180}>
        <Scene1Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
      />
      <TransitionSeries.Sequence durationInFrames={220}>
        <Scene2Topology />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-right" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
      />
      <TransitionSeries.Sequence durationInFrames={220}>
        <Scene3Segmentation />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
      />
      <TransitionSeries.Sequence durationInFrames={200}>
        <Scene4Defense />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe({ direction: "from-bottom-left" })}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
      />
      <TransitionSeries.Sequence durationInFrames={160}>
        <Scene5Results />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
