import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, displayFont, monoFont } from "../theme";

const LAYERS = [
  { name: "Suricata IPS", desc: "bloqueio inline na WAN", color: C.amber },
  { name: "pfBlockerNG", desc: "DNSBL + GeoIP", color: C.amber },
  { name: "WireGuard", desc: "única porta exposta (UDP/51820)", color: C.cyan },
  { name: "AD DS + GPO", desc: "LAPS · AppLocker · SMB signing", color: C.cyan },
  { name: "Wazuh SIEM", desc: "correlação de eventos", color: C.violet },
  { name: "Restic + Snapshots", desc: "backup imutável 3-2-1", color: C.green },
];

const LOGS: Array<{ t: string; src: string; level: string; color: string; msg: string }> = [
  { t: "10:04:19", src: "suricata", level: "WARN", color: C.amber, msg: "ET SCAN Potential Portscan · src 10.10.99.10" },
  { t: "10:06:22", src: "pfsense", level: "CRIT", color: C.red, msg: "DROP 10.10.20.44 → 10.10.30.5:445 (IoT→Backup)" },
  { t: "10:06:24", src: "suricata", level: "CRIT", color: C.red, msg: "IPS BLOCK · host adicionado à quarentena" },
  { t: "10:07:46", src: "python", level: "OK", color: C.green, msg: "auto_response.py · alerta enviado com evidências" },
  { t: "10:59:04", src: "backup", level: "OK", color: C.green, msg: "restore concluído · 412/412 arquivos íntegros" },
];

export const Scene4Defense: React.FC = () => {
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
        }}
      >
        Defesa em <span style={{ color: C.amber }}>profundidade</span> + resposta automática
      </div>

      <div
        style={{
          position: "absolute",
          top: 190,
          left: 120,
          width: 660,
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
        }}
      >
        {LAYERS.map((l, i) => {
          const s = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 18, stiffness: 180 } });
          return (
            <div
              key={l.name}
              style={{
                width: 320,
                opacity: s,
                transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)`,
                background: `${C.panel}ee`,
                border: `1.5px solid ${l.color}55`,
                borderRadius: 14,
                padding: "20px 22px",
              }}
            >
              <div style={{ fontFamily: displayFont, fontWeight: 700, fontSize: 26, color: l.color }}>{l.name}</div>
              <div style={{ fontFamily: monoFont, fontSize: 18, color: C.muted, marginTop: 6 }}>{l.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Terminal de logs */}
      <div
        style={{
          position: "absolute",
          top: 190,
          right: 120,
          width: 880,
          background: "#03070F",
          border: `1.5px solid ${C.line}`,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 20px 60px #00000088",
        }}
      >
        <div style={{ display: "flex", gap: 8, padding: "14px 18px", borderBottom: `1px solid ${C.line}` }}>
          {[C.red, C.amber, C.green].map((c) => (
            <div key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
          ))}
          <div style={{ marginLeft: 14, fontFamily: monoFont, fontSize: 17, color: C.muted }}>siem — homeshield.log</div>
        </div>
        <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {LOGS.map((log, i) => {
            const s = spring({ frame: frame - 26 - i * 14, fps, config: { damping: 200 } });
            return (
              <div key={i} style={{ fontFamily: monoFont, fontSize: 21, opacity: s, display: "flex", gap: 14 }}>
                <span style={{ color: C.muted }}>{log.t}</span>
                <span style={{ color: C.cyan }}>{log.src.padEnd(9)}</span>
                <span style={{ color: log.color, fontWeight: 600 }}>{log.level}</span>
                <span style={{ color: C.text }}>{log.msg}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 120,
          fontFamily: monoFont,
          fontSize: 24,
          color: C.green,
          opacity: spring({ frame: frame - 110, fps, config: { damping: 200 } }),
        }}
      >
        ▸ detecção em 16s · contenção automática em 1m43s · 0 byte perdido
      </div>
    </AbsoluteFill>
  );
};
