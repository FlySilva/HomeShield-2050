import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { members } from "@/data/homeshield";
import { cn } from "@/lib/utils";

const accent: Record<string, string> = {
  cyan: "border-cyan/45 text-cyan",
  violet: "border-violet/45 text-violet",
  amber: "border-amber/45 text-amber",
  success: "border-success/45 text-success",
  danger: "border-danger/45 text-danger",
};

export function TeamMatrix() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const total = members.reduce((acc, m) => acc + m.evidences.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="glass mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg px-5 py-4">
        <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
          Progresso de evidências para a banca
        </p>
        <div className="flex items-center gap-3">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-violet transition-all"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
          <span className="font-mono text-sm text-foreground">
            {done}/{total}
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {members.map((m) => {
          const memberDone = m.evidences.filter((e) => checked[`${m.name}-${e}`]).length;
          return (
            <article
              key={m.name}
              className={cn("glass rounded-xl border-t-2 p-5", accent[m.color])}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{m.role}</h3>
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                    {m.name} · {m.focus}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded border px-2 py-0.5 font-mono text-[10px]",
                    accent[m.color],
                  )}
                >
                  {memberDone}/{m.evidences.length}
                </span>
              </div>

              <h4 className="mt-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                Responsabilidades
              </h4>
              <ul className="mt-2 space-y-1.5">
                {m.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-foreground/85">
                    <span className={cn("mt-0.5", accent[m.color])}>▸</span>
                    {r}
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                Checklist de evidências
              </h4>
              <ul className="mt-2 space-y-1">
                {m.evidences.map((e) => {
                  const key = `${m.name}-${e}`;
                  const on = !!checked[key];
                  return (
                    <li key={e}>
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-pressed={on}
                        className="flex w-full items-start gap-2 rounded px-1.5 py-1 text-left text-[13px] transition-colors hover:bg-surface-2"
                      >
                        {on ? (
                          <CheckSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                        ) : (
                          <Square className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            on ? "text-muted-foreground line-through" : "text-foreground/85",
                          )}
                        >
                          {e}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
