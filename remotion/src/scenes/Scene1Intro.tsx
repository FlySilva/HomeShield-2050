import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, displayFont, monoFont } from "../theme";

const TITLE = "HOMESHIELD 2050";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sub = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [50, 90], [0, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const badges = ["pfSense + Suricata IPS", "Active Directory", "WireGuard VPN", "Backup 3-2-1"];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8 }}>
        {TITLE.split("").map((ch, i) => {
          const s = spring({ frame: frame - i * 2, fps, config: { damping: 16, stiffness: 160 } });
          return (
            <span
              key={i}
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 110,
                letterSpacing: 4,
                color: ch === " " ? "transparent" : i >= 11 ? C.cyan : C.text,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
                textShadow: i >= 11 ? `0 0 40px ${C.cyan}66` : "none",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 34,
          fontFamily: monoFont,
          fontSize: 30,
          color: C.muted,
          letterSpacing: 6,
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [24, 0])}px)`,
        }}
      >
        SMART HOME SEGURA · INFRAESTRUTURA & CIBERSEGURANÇA
      </div>

      <div style={{ marginTop: 26, width: lineW, height: 3, background: `linear-gradient(90deg, ${C.cyan}, ${C.violet})` }} />

      <div style={{ display: "flex", gap: 18, marginTop: 44 }}>
        {badges.map((b, i) => {
          const s = spring({ frame: frame - 70 - i * 7, fps, config: { damping: 18, stiffness: 200 } });
          return (
            <div
              key={b}
              style={{
                fontFamily: monoFont,
                fontSize: 21,
                color: C.cyan,
                border: `1px solid ${C.cyan}55`,
                background: `${C.cyan}0d`,
                borderRadius: 999,
                padding: "10px 22px",
                opacity: s,
                transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
              }}
            >
              {b}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
