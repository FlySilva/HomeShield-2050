# HomeShield 2050 — Smart Home Segura

Landing page técnica e interativa do projeto **HomeShield 2050**, desenvolvida para documentar a arquitetura de infraestrutura e cibersegurança de uma residência inteligente protegida.

## Sobre o projeto

O HomeShield 2050 simula uma rede doméstica moderna com camadas de segurança, incluindo firewall, segmentação de rede, servidor Windows em VM, dispositivos IoT isolados, estações de trabalho, backup e uma máquina Kali Linux para testes ofensivos. A página apresenta a proposta de valor, topologia interativa, matriz da equipe, simulador de incidente e documentação técnica detalhada.

## Funcionalidades

- **Visão geral da arquitetura**: camadas de segurança e proposta de valor.
- **Topologia de rede interativa**: diagrama SVG clicável com detalhes técnicos de cada nó.
- **Matriz da equipe**: 5 integrantes com papéis, responsabilidades e checklist de evidências para a banca.
- **Simulador de incidente**: narrativa em 4 etapas — Normalidade, Ataque Kali, Contenção HomeShield e Pós-incidente.
- **Documentação técnica**: abas com regras de firewall, DNS seguro, VPN, automação Python e relatórios Nmap/OpenVAS.

## Tecnologias

- [TanStack Start](https://tanstack.com/start)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)

## Estrutura do projeto

```text
src/
  components/homeshield/   # Componentes da landing page
    DocsTabs.tsx           # Abas de documentação técnica
    IncidentSimulator.tsx  # Simulador de incidente
    TeamMatrix.tsx         # Matriz de equipe e evidências
    Topology.tsx           # Diagrama de rede interativo
  data/homeshield.ts       # Dados estáticos do projeto
  routes/                  # Rotas do TanStack Start
    __root.tsx             # Layout raiz
    index.tsx              # Landing page principal
  styles.css               # Tokens de tema e utilitários visuais
```

## Desenvolvimento local

Requisitos: Node.js 20+ e Bun ou npm.

```sh
# Clonar o repositório
git clone <repo-url>
cd homeshield2050

# Instalar dependências
bun install
# ou
npm install

# Iniciar o servidor de desenvolvimento
bun dev
# ou
npm run dev
```

O app estará disponível em `http://localhost:8080`.

## Build para produção

```sh
bun run build
# ou
npm run build
```

## Equipe

- Arthur — Líder de Projeto / Arquitetura de Rede
- Breno — Especialista em Firewall / Segurança de Perímetro
- Carlos — Analista de Incidentes / SIEM e Monitoramento
- Daniel — Engenheiro de Backup e Recuperação
- Eduardo — Testador de Intrusão / Kali Linux

## Licença

Projeto acadêmico. Uso educacional e demonstrativo.
