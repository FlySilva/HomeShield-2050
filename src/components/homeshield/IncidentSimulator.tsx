import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { incidentStages } from "@/data/homeshield";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  seguro: "border-success/50 text-success bg-success/10",
  critico: "border-danger/50 text-danger bg-danger/10",
  resposta: "border-amber/50 text-amber bg-amber/10",
  recuperado: "border-cyan/50 text-cyan bg-cyan/10",
};

const levelStyle: Record<string, string> = {
  info: "text-muted-foreground",
  warn: "text-amber",
  crit: "text-danger",
  ok: "text-success",
};

export function IncidentSimulator() {
  const [step, setStep] = useState(0);
  const stage = incidentStages[step]!;

  return (
    <div className="glass rounded-xl p-5 sm:p-7">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {incidentStages.map((s, i) => (
          <li key={s.id} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(i)}
              aria-current={i === step}
              className={cn(
                "flex flex-1 flex-col items-start rounded-lg border px-3 py-2 text-left transition-all",
                i === step
                  ? "glow-cyan border-cyan/60 bg-surface-2"
                  : i < step
                    ? "border-success/40 bg-surface"
                    : "border-border bg-surface/60 hover:border-muted-foreground/50",
              )}
            >
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {s.time}
              </span>
              <span className="text-sm font-semibold text-foreground">{s.title}</span>
              <span className="text-[11px] text-muted-foreground">{s.short}</span>
            </button>
            {i < incidentStages.length - 1 && (
              <ChevronRight className="hidden h-4 w-4 shrink-0 text-border sm:block" />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span
            className={cn(
              "inline-flex rounded border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase",
              statusStyle[stage.status],
            )}
          >
            status: {stage.status}
          </span>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">{stage.narrative}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {stage.metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-border bg-surface-2 p-3">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {m.label}
                </p>
                <p className="mt-1 text-base font-semibold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-6 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Ações desta etapa
          </h4>
          <ul className="mt-2 space-y-1.5">
            {stage.actions.map((a) => (
              <li key={a} className="flex gap-2 text-sm text-foreground/85">
                <span className="text-cyan">›</span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-[oklch(0.13_0.025_258)]">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              siem://homeshield/eventos · {stage.id}
            </span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
            {stage.logs.map((l) => (
              <p key={l.t + l.msg} className="flex flex-wrap gap-2">
                <span className="text-muted-foreground">{l.t}</span>
                <span className="text-violet">[{l.src}]</span>
                <span className={levelStyle[l.level]}>{l.msg}</span>
              </p>
            ))}
            <p className="text-cyan">
              <span className="animate-pulse">▍</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-surface-2 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" /> Etapa anterior
        </button>
        <button
          type="button"
          onClick={() => setStep(0)}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> reiniciar simulação
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(incidentStages.length - 1, s + 1))}
          disabled={step === incidentStages.length - 1}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Próxima etapa <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
