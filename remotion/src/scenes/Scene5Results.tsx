import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, displayFont, monoFont } from "../theme";

const METRICS = [
  { label: "Portas abertas", before: "41", after: "7", delay: 10 },
  { label: "Vulns críticas", before: "4", after: "0", delay: 20 },
  { label: "CVSS médio", before: "7.8", after: "3.1", delay: 30 },
  { label: "Hosts visíveis da IoT", before: "12", after: "0", delay: 40 },
];

export const Scene5Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({ frame, fps, config: { damping: 200 } });
  const outro = spring({ frame: frame - 105, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 52,
          color: C.text,
          opacity: title,
        }}
      >
        Varredura autorizada · <span style={{ color: C.red }}>antes</span> × <span style={{ color: C.green }}>depois</span> do hardening
      </div>

      <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40 }}>
        {METRICS.map((m) => {
          const s = spring({ frame: frame - m.delay, fps, config: { damping: 16, stiffness: 160 } });
          return (
            <div
              key={m.label}
              style={{
                width: 340,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
                background: `${C.panel}ee`,
                border: `1.5px solid ${C.line}`,
                borderRadius: 18,
                padding: "34px 30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: monoFont, fontSize: 20, color: C.muted, letterSpacing: 2 }}>{m.label}</div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 18, marginTop: 20 }}>
                <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 56, color: C.red, textDecoration: "line-through", opacity: 0.75 }}>
                  {m.before}
                </span>
                <span style={{ fontFamily: monoFont, fontSize: 34, color: C.muted }}>→</span>
                <span style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 72, color: C.green, textShadow: `0 0 30px ${C.green}55` }}>
                  {m.after}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: outro,
          transform: `translateY(${interpolate(outro, [0, 1], [40, 0])}px)`,
        }}
      >
        <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 64, color: C.text }}>
          HomeShield <span style={{ color: C.cyan }}>2050</span>
        </div>
        <div style={{ fontFamily: monoFont, fontSize: 24, color: C.muted, marginTop: 14, letterSpacing: 3 }}>
          SEGURANÇA RESIDENCIAL COM PADRÃO CORPORATIVO
        </div>
      </div>
    </AbsoluteFill>
  );
};
