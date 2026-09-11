import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C } from "../theme";

// Fundo persistente: gradiente + grid + linha de scan
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const scanY = interpolate(frame % 240, [0, 240], [-100, 1180]);
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(1200px 700px at 70% 20%, #0B1B33 0%, ${C.bg} 60%)`,
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${C.line}55 1px, transparent 1px), linear-gradient(90deg, ${C.line}55 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${C.cyan}66, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
