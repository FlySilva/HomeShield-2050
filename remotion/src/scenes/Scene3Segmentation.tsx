import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, displayFont, monoFont } from "../theme";

const VLANS = [
  { id: "VLAN 10", name: "Rede Confiável", rule: "Acesso total via AD + MFA", color: C.green, delay: 8 },
  { id: "VLAN 20", name: "IoT Isolada", rule: "Bloqueio lateral total · só HTTPS/NTP", color: C.violet, delay: 18 },
  { id: "VLAN 30", name: "Backup", rule: "Somente o servidor inicia conexão", color: C.amber, delay: 28 },
  { id: "VLAN 99", name: "Lab / Kali", rule: "Negação padrão · janela de teste", color: C.red, delay: 38 },
];

export const Scene3Segmentation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({ frame, fps, config: { damping: 200 } });
  const deny = spring({ frame: frame - 62, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 120,
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 52,
          color: C.text,
          opacity: title,
        }}
      >
        Segmentação em <span style={{ color: C.violet }}>4 VLANs</span>
        <div style={{ fontFamily: monoFont, fontSize: 22, color: C.muted, fontWeight: 400, marginTop: 10 }}>
          política de negação padrão entre segmentos — zero confiança dentro de casa
        </div>
      </div>

      <div style={{ position: "absolute", top: 300, left: 120, right: 120, display: "flex", gap: 28 }}>
        {VLANS.map((v) => {
          const s = spring({ frame: frame - v.delay, fps, config: { damping: 17, stiffness: 170 } });
          return (
            <div
              key={v.id}
              style={{
                flex: 1,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [70, 0])}px)`,
                background: `${C.panel}ee`,
                border: `1.5px solid ${v.color}66`,
                borderTop: `5px solid ${v.color}`,
                borderRadius: 16,
                padding: "30px 26px",
              }}
            >
              <div style={{ fontFamily: monoFont, fontSize: 20, color: v.color, letterSpacing: 3 }}>{v.id}</div>
              <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 33, color: C.text, marginTop: 12 }}>{v.name}</div>
              <div style={{ fontFamily: monoFont, fontSize: 19, color: C.muted, marginTop: 16, lineHeight: 1.5 }}>{v.rule}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 110,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: deny,
          transform: `scale(${interpolate(deny, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            fontFamily: monoFont,
            fontSize: 27,
            color: C.red,
            border: `1.5px solid ${C.red}66`,
            background: `${C.red}0f`,
            borderRadius: 12,
            padding: "20px 38px",
            boxShadow: `0 0 40px ${C.red}22`,
          }}
        >
          ✕ IoT → Backup · DROP — movimentação lateral bloqueada pelo firewall
        </div>
      </div>
    </AbsoluteFill>
  );
};
