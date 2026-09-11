import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, displayFont, monoFont } from "../theme";

interface Node {
  id: string;
  label: string;
  sub: string;
  color: string;
  x: number;
  y: number;
  delay: number;
}

const NODES: Node[] = [
  { id: "wan", label: "Internet / WAN", sub: "ISP · não confiável", color: C.red, x: 190, y: 540, delay: 0 },
  { id: "fw", label: "Firewall pfSense", sub: "Perímetro · IDS/IPS · VPN", color: C.amber, x: 620, y: 540, delay: 12 },
  { id: "srv", label: "Windows Server 2022", sub: "AD DS · DNS · GPO · SIEM", color: C.cyan, x: 1050, y: 540, delay: 24 },
  { id: "iot", label: "VLAN 20 · IoT", sub: "isolada · sem rota lateral", color: C.violet, x: 1560, y: 260, delay: 40 },
  { id: "pc", label: "VLAN 10 · Estações", sub: "endpoints no domínio", color: C.green, x: 1560, y: 470, delay: 48 },
  { id: "bk", label: "VLAN 30 · Backup", sub: "NAS imutável · 3-2-1", color: C.green, x: 1560, y: 680, delay: 56 },
  { id: "kali", label: "VLAN 99 · Kali Lab", sub: "red team autorizado", color: C.red, x: 1560, y: 890, delay: 64 },
];

const EDGES: Array<[string, string]> = [
  ["wan", "fw"],
  ["fw", "srv"],
  ["srv", "iot"],
  ["srv", "pc"],
  ["srv", "bk"],
  ["srv", "kali"],
];

const nodeById = (id: string) => NODES.find((n) => n.id === id)!;

export const Scene2Topology: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 120,
          fontFamily: displayFont,
          fontWeight: 700,
          fontSize: 52,
          color: C.text,
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [-30, 0])}px)`,
        }}
      >
        Arquitetura em <span style={{ color: C.cyan }}>camadas de defesa</span>
        <div style={{ fontFamily: monoFont, fontSize: 22, color: C.muted, fontWeight: 400, marginTop: 10 }}>
          todo tráfego é inspecionado no perímetro antes de tocar a rede interna
        </div>
      </div>

      {/* Arestas */}
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        {EDGES.map(([a, b], i) => {
          const na = nodeById(a);
          const nb = nodeById(b);
          const start = Math.max(na.delay, nb.delay) - 6;
          const p = interpolate(frame, [start, start + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x1 = na.x + 150, y1 = na.y, x2 = nb.x - 150, y2 = nb.y;
          const mx = (x1 + x2) / 2;
          const path = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
          const len = 900;
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke={`${C.cyan}88`}
                strokeWidth={2.5}
                strokeDasharray={len}
                strokeDashoffset={len * (1 - p)}
              />
              {/* pulso de tráfego */}
              <circle r={5} fill={C.cyan} opacity={p >= 1 ? 0.9 : 0}>
                <animateMotion dur="2.2s" repeatCount="indefinite" path={path} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Nós */}
      {NODES.map((n) => {
        const s = spring({ frame: frame - n.delay, fps, config: { damping: 15, stiffness: 180 } });
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: n.x,
              top: n.y,
              transform: `translate(-50%, -50%) scale(${interpolate(s, [0, 1], [0.5, 1])})`,
              opacity: s,
              width: 300,
              background: `${C.panel}ee`,
              border: `1.5px solid ${n.color}77`,
              borderRadius: 14,
              padding: "16px 20px",
              boxShadow: `0 0 34px ${n.color}22`,
              textAlign: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: n.color, margin: "0 auto 8px", boxShadow: `0 0 12px ${n.color}` }} />
            <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 25, color: C.text }}>{n.label}</div>
            <div style={{ fontFamily: monoFont, fontSize: 17, color: C.muted, marginTop: 5 }}>{n.sub}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
