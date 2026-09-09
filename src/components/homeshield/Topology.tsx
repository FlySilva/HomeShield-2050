import { useState } from "react";
import {
  Globe,
  ShieldCheck,
  Server,
  Cpu,
  Monitor,
  HardDriveDownload,
  Terminal,
} from "lucide-react";
import { topologyLinks, topologyNodes, type NodeId } from "@/data/homeshield";
import { cn } from "@/lib/utils";

const icons: Record<NodeId, typeof Globe> = {
  internet: Globe,
  firewall: ShieldCheck,
  server: Server,
  iot: Cpu,
  pc: Monitor,
  backup: HardDriveDownload,
  kali: Terminal,
};

const zoneStyle: Record<string, string> = {
  externa: "text-muted-foreground border-border",
  perimetro: "text-cyan border-cyan/50",
  core: "text-violet border-violet/50",
  isolada: "text-amber border-amber/50",
  confiavel: "text-success border-success/50",
  lab: "text-danger border-danger/50",
};

export function Topology() {
  const [active, setActive] = useState<NodeId>("firewall");
  const node = topologyNodes.find((n) => n.id === active)!;

  const pos = (id: NodeId) => {
    const n = topologyNodes.find((x) => x.id === id)!;
    return { x: n.x, y: n.y };
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
      <div className="glass scan-line relative overflow-hidden rounded-xl p-4 sm:p-6">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative h-[430px] w-full sm:h-[520px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {topologyLinks.map((l) => {
              const a = pos(l.from);
              const b = pos(l.to);
              const on = active === l.from || active === l.to;
              return (
                <line
                  key={`${l.from}-${l.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  vectorEffect="non-scaling-stroke"
                  className={cn(
                    "dash-flow transition-all",
                    on ? "stroke-cyan" : "stroke-border",
                  )}
                  strokeWidth={on ? 2 : 1.2}
                />
              );
            })}
          </svg>

          {topologyNodes.map((n) => {
            const Icon = icons[n.id];
            const isActive = n.id === active;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setActive(n.id)}
                aria-pressed={isActive}
                className={cn(
                  "absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg border bg-surface-2/90 px-2 py-2.5 text-center transition-all hover:scale-[1.04] sm:w-32",
                  zoneStyle[n.zone],
                  isActive && "glow-cyan pulse-node scale-[1.05]",
                )}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.8} />
                <span className="text-[10px] leading-tight font-semibold text-foreground sm:text-xs">
                  {n.label}
                </span>
                <span className="font-mono text-[8px] tracking-wide uppercase sm:text-[9px]">
                  {n.sub}
                </span>
              </button>
            );
          })}
        </div>
        <p className="relative mt-3 text-center font-mono text-[11px] text-muted-foreground">
          Clique em um nó para inspecionar a zona
        </p>
      </div>

      <aside className="glass rounded-xl p-6">
        <span
          className={cn(
            "inline-flex rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase",
            zoneStyle[node.zone],
          )}
        >
          zona {node.zone}
        </span>
        <h3 className="mt-3 text-xl font-semibold text-foreground">{node.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.detail}</p>
        <ul className="mt-5 space-y-2">
          {node.specs.map((s) => (
            <li key={s} className="flex gap-2 font-mono text-xs text-foreground/85">
              <span className="text-cyan">›</span>
              {s}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
