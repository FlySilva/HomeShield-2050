import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  FileStack,
  Lock,
  Network,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { Topology } from "@/components/homeshield/Topology";
import { TeamMatrix } from "@/components/homeshield/TeamMatrix";
import { IncidentSimulator } from "@/components/homeshield/IncidentSimulator";
import { DocsTabs } from "@/components/homeshield/DocsTabs";

const TITLE = "HomeShield 2050 — Documentação Técnica de Smart Home Segura";
const DESCRIPTION =
  "Documentação técnica do HomeShield 2050: arquitetura de rede segmentada, firewall, DNS seguro, VPN, automação em Python e simulação de incidente para smart home.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Network,
    title: "Segmentação por zonas",
    text: "VLANs separam IoT, estações, backup e laboratório. Nenhum segmento fala com o outro sem uma regra explícita e justificada.",
  },
  {
    icon: Lock,
    title: "Zero trust doméstico",
    text: "Autenticação no domínio, MFA, disco cifrado e VPN como único caminho remoto. Confiança nunca é herdada da rede local.",
  },
  {
    icon: Activity,
    title: "Detecção e resposta",
    text: "Suricata em modo IPS, SIEM centralizado e automação em Python que coloca hosts suspeitos em quarentena em segundos.",
  },
  {
    icon: Boxes,
    title: "Resiliência 3-2-1-1",
    text: "Backups imutáveis com verificação diária de integridade e teste de restauração cronometrado registrado em relatório.",
  },
];

const stats = [
  { value: "5", label: "zonas de rede" },
  { value: "16 s", label: "detecção média" },
  { value: "0", label: "vulns críticas residuais" },
  { value: "18 min", label: "RTO comprovado" },
];

function Section({
  id,
  eyebrow,
  title,
  lead,
  icon: Icon,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  icon: typeof Network;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mb-9 max-w-3xl">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-cyan uppercase">
            <Icon className="h-3.5 w-3.5" /> {eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{lead}</p>
        </header>
        {children}
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#topo" className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-cyan" />
            <span className="font-mono text-sm font-semibold tracking-widest text-foreground uppercase">
              HomeShield<span className="text-cyan">_2050</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["Arquitetura", "#arquitetura"],
              ["Topologia", "#topologia"],
              ["Equipe", "#equipe"],
              ["Incidente", "#incidente"],
              ["Documentação", "#documentacao"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-cyan"
              >
                {label}
              </a>
            ))}
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/45 bg-success/10 px-3 py-1 font-mono text-[10px] tracking-widest text-success uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> operacional
          </span>
        </div>
      </header>

      <main id="topo">
        <section className="relative overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
              Projeto integrador · infraestrutura & cibersegurança
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
              <span className="text-gradient">HomeShield 2050</span>
              <span className="block text-foreground">
                a casa inteligente que se defende sozinha
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Documentação técnica completa de uma residência conectada protegida por
              segmentação de rede, firewall com IPS, identidade centralizada, DNS cifrado,
              automação de resposta e backups imutáveis — validada por testes ofensivos reais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#topologia"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Network className="h-4 w-4" /> Ver topologia interativa
              </a>
              <a
                href="#incidente"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                <Siren className="h-4 w-4 text-danger" /> Simular incidente
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-surface px-5 py-6">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="mt-1.5 text-3xl font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section
          id="arquitetura"
          eyebrow="visão geral"
          icon={ShieldCheck}
          title="Uma arquitetura defensiva pensada em camadas"
          lead="O HomeShield 2050 traduz práticas de ambiente corporativo para a escala doméstica: perímetro inspecionado, identidade forte, isolamento de dispositivos vulneráveis e capacidade comprovada de recuperação."
        >
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((p) => (
              <article key={p.title} className="glass rounded-xl p-5">
                <p.icon className="h-5 w-5 text-cyan" strokeWidth={1.8} />
                <h3 className="mt-4 text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="topologia"
          eyebrow="topologia de rede"
          icon={Network}
          title="Internet → Firewall → Servidor → zonas segmentadas"
          lead="O fluxo é sempre de fora para dentro passando por inspeção. Cada zona tem uma função e um nível de confiança distintos — selecione um nó para ver as configurações aplicadas."
        >
          <Topology />
        </Section>

        <Section
          id="equipe"
          eyebrow="matriz de responsabilidades"
          icon={Users}
          title="Cinco integrantes, cinco frentes, evidências individuais"
          lead="Cada integrante responde por uma camada do projeto e entrega artefatos próprios. Marque os itens conforme as evidências forem produzidas para acompanhar a preparação para a banca."
        >
          <TeamMatrix />
        </Section>

        <Section
          id="incidente"
          eyebrow="simulador de narrativa"
          icon={Siren}
          title="Da normalidade à recuperação em quatro etapas"
          lead="A narrativa demonstra o comportamento do HomeShield sob ataque real simulado a partir do Kali Linux, com logs, métricas e ações de contenção a cada etapa."
        >
          <IncidentSimulator />
        </Section>

        <Section
          id="documentacao"
          eyebrow="documentação técnica"
          icon={FileStack}
          title="Configurações, scripts e relatórios do projeto"
          lead="Trechos reais das configurações aplicadas no ambiente, prontos para anexar ao caderno técnico e reproduzir em laboratório."
        >
          <DocsTabs />
        </Section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            HomeShield 2050 · caderno técnico v1.0
          </p>
          <p className="text-xs text-muted-foreground">
            Todos os testes ofensivos foram executados em laboratório próprio, com autorização
            documentada.
          </p>
        </div>
      </footer>
    </div>
  );
}
