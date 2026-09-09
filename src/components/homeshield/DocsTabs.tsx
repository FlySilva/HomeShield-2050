import { useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { docTabs } from "@/data/homeshield";
import { cn } from "@/lib/utils";

export function DocsTabs() {
  const [active, setActive] = useState(docTabs[0]!.id);
  const [copied, setCopied] = useState(false);
  const tab = docTabs.find((t) => t.id === active)!;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass rounded-xl p-5 sm:p-7">
      <div className="flex flex-wrap gap-2" role="tablist">
        {docTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-md border px-3.5 py-2 font-mono text-xs transition-all",
              t.id === active
                ? "border-cyan/60 bg-cyan/10 text-cyan"
                : "border-border text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-[oklch(0.13_0.025_258)]">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <FileCode2 className="h-3.5 w-3.5 text-cyan" />
              {tab.filename}
              <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase">
                {tab.lang}
              </span>
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-success" /> copiado
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> copiar
                </>
              )}
            </button>
          </div>
          <pre className="max-h-[26rem] overflow-auto p-4 font-mono text-[11px] leading-relaxed text-foreground/90 sm:text-xs">
            <code>{tab.code}</code>
          </pre>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground">{tab.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tab.description}</p>
          <h4 className="mt-5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Notas de implementação
          </h4>
          <ul className="mt-2 space-y-2">
            {tab.notes.map((n) => (
              <li key={n} className="flex gap-2 text-sm text-foreground/85">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
