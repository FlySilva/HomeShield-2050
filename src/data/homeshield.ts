export type NodeId =
  | "internet"
  | "firewall"
  | "server"
  | "iot"
  | "pc"
  | "backup"
  | "kali";

export interface TopologyNode {
  id: NodeId;
  label: string;
  sub: string;
  zone: "externa" | "perimetro" | "core" | "isolada" | "confiavel" | "lab";
  x: number;
  y: number;
  detail: string;
  specs: string[];
}

export const topologyNodes: TopologyNode[] = [
  {
    id: "internet",
    label: "Internet / WAN",
    sub: "ISP · 300 Mbps",
    zone: "externa",
    x: 50,
    y: 8,
    detail:
      "Ponto de entrada não confiável. Todo tráfego chega via link do provedor e é obrigatoriamente inspecionado pelo perímetro antes de tocar qualquer host interno.",
    specs: ["IP dinâmico + DDNS", "Sem port-forward direto", "Somente VPN exposta (UDP/51820)"],
  },
  {
    id: "firewall",
    label: "Firewall pfSense",
    sub: "Perímetro · IDS/IPS",
    zone: "perimetro",
    x: 50,
    y: 30,
    detail:
      "pfSense 2.7 com Suricata em modo IPS, filtragem DNS (pfBlockerNG) e concentrador WireGuard. Segmenta a rede em VLANs e aplica política de negação padrão entre elas.",
    specs: [
      "VLAN 10 Confiável · VLAN 20 IoT · VLAN 30 Backup · VLAN 99 Lab",
      "Suricata (ET Open) em modo bloqueio na WAN",
      "pfBlockerNG: DNSBL + GeoIP",
      "WireGuard peer-to-site",
    ],
  },
  {
    id: "server",
    label: "Windows Server 2022 (VM)",
    sub: "AD DS · DNS · Hyper-V",
    zone: "core",
    x: 50,
    y: 54,
    detail:
      "Núcleo de serviços: Active Directory, DNS interno com forwarders DoT, GPOs de hardening e coleta centralizada de eventos encaminhados para o SIEM (Wazuh).",
    specs: [
      "AD DS domínio homeshield.local",
      "DNS interno + forwarder DoT (Cloudflare/Quad9)",
      "GPO: LAPS, AppLocker, SMB signing",
      "Agente Wazuh + Windows Event Forwarding",
    ],
  },
  {
    id: "iot",
    label: "Rede IoT Isolada",
    sub: "VLAN 20 · sem rota lateral",
    zone: "isolada",
    x: 15,
    y: 80,
    detail:
      "Câmeras, lâmpadas, assistentes e TV. VLAN sem rota para a VLAN confiável, apenas saída controlada para nuvem dos fabricantes e mDNS proxy para descoberta.",
    specs: [
      "Bloqueio total IoT → VLAN 10/30",
      "Proxy mDNS unidirecional",
      "Rate limit de upload 5 Mbps",
      "Inventário MAC com alerta de dispositivo novo",
    ],
  },
  {
    id: "pc",
    label: "Estações de Trabalho",
    sub: "VLAN 10 · endpoints",
    zone: "confiavel",
    x: 38,
    y: 80,
    detail:
      "Notebooks e desktops da família, ingressados no domínio, com disco cifrado, EDR ativo e acesso remoto exclusivamente por VPN.",
    specs: [
      "BitLocker + TPM 2.0",
      "Defender for Endpoint / Wazuh agent",
      "Contas padrão sem privilégio local",
      "MFA no logon do domínio",
    ],
  },
  {
    id: "backup",
    label: "NAS de Backup",
    sub: "VLAN 30 · 3-2-1",
    zone: "confiavel",
    x: 63,
    y: 80,
    detail:
      "Repositório imutável com snapshots. Recebe backups do servidor e dos endpoints; só o servidor de backup pode iniciar conexão, evitando criptografia por ransomware.",
    specs: [
      "Estratégia 3-2-1-1 (1 cópia offline)",
      "Snapshots imutáveis 30 dias",
      "Restic + verificação de integridade diária",
      "Teste de restauração mensal documentado",
    ],
  },
  {
    id: "kali",
    label: "Kali Linux (Lab)",
    sub: "VLAN 99 · red team",
    zone: "lab",
    x: 86,
    y: 80,
    detail:
      "Máquina ofensiva usada apenas em janelas de teste autorizadas. Simula reconhecimento, exploração e movimentação lateral para validar as defesas do HomeShield.",
    specs: [
      "Nmap, OpenVAS, Hydra, Metasploit",
      "Acesso liberado só na janela de teste",
      "Todo tráfego logado e correlacionado",
      "Relatório antes/depois obrigatório",
    ],
  },
];

export const topologyLinks: Array<{ from: NodeId; to: NodeId; label: string }> = [
  { from: "internet", to: "firewall", label: "WAN inspecionada" },
  { from: "firewall", to: "server", label: "Trunk 802.1Q" },
  { from: "server", to: "iot", label: "DHCP/DNS restrito" },
  { from: "server", to: "pc", label: "AD / GPO" },
  { from: "server", to: "backup", label: "Backup cifrado" },
  { from: "server", to: "kali", label: "Janela de teste" },
];

export interface Member {
  name: string;
  role: string;
  focus: string;
  color: "cyan" | "violet" | "amber" | "success" | "danger";
  responsibilities: string[];
  evidences: string[];
}

export const members: Member[] = [
  {
    name: "Integrante 1",
    role: "Arquiteto de Rede",
    focus: "Topologia, VLANs e roteamento",
    color: "cyan",
    responsibilities: [
      "Desenhar a topologia física e lógica do HomeShield",
      "Definir plano de endereçamento e segmentação em VLANs",
      "Configurar switch gerenciado e trunks 802.1Q",
      "Validar isolamento entre segmentos com testes de rota",
    ],
    evidences: [
      "Diagrama de topologia exportado (PDF + fonte editável)",
      "Tabela de endereçamento IP com VLAN, gateway e escopo DHCP",
      "Prints das configurações de VLAN no switch e no pfSense",
      "Saída de traceroute/ping provando isolamento IoT → LAN",
      "Ata de decisão de arquitetura assinada pelo grupo",
    ],
  },
  {
    name: "Integrante 2",
    role: "Especialista em Firewall e VPN",
    focus: "pfSense, IPS e acesso remoto",
    color: "violet",
    responsibilities: [
      "Implementar regras de firewall com negação padrão",
      "Configurar Suricata em modo IPS na interface WAN",
      "Publicar e documentar o túnel WireGuard",
      "Manter o versionamento das regras e o changelog",
    ],
    evidences: [
      "Export XML do pfSense com as regras finais",
      "Tabela de regras comentada (origem, destino, porta, justificativa)",
      "Print de alerta do Suricata bloqueando o scan do Kali",
      "Arquivo de configuração WireGuard (chaves ocultadas)",
      "Vídeo curto de handshake VPN a partir de rede externa",
    ],
  },
  {
    name: "Integrante 3",
    role: "Administrador de Servidor e Identidade",
    focus: "Windows Server, AD DS e DNS seguro",
    color: "amber",
    responsibilities: [
      "Instalar e promover o Windows Server como controlador de domínio",
      "Criar unidades organizacionais, grupos e GPOs de hardening",
      "Configurar DNS interno com forwarders cifrados e bloqueio de domínios",
      "Habilitar auditoria e encaminhamento de eventos",
    ],
    evidences: [
      "Print do AD DS com OUs, grupos e usuários de teste",
      "Relatório GPO (gpresult /h) antes e depois do hardening",
      "Configuração de DNS com DoT/DoH e listas de bloqueio",
      "Log de auditoria mostrando eventos 4624/4625 coletados",
      "Checklist CIS Benchmark preenchido com nível de conformidade",
    ],
  },
  {
    name: "Integrante 4",
    role: "Analista de Segurança Ofensiva",
    focus: "Kali Linux, Nmap e OpenVAS",
    color: "danger",
    responsibilities: [
      "Executar reconhecimento e varredura autorizada da rede",
      "Rodar varredura de vulnerabilidades com OpenVAS",
      "Tentar movimentação lateral a partir da VLAN IoT",
      "Produzir relatório comparativo antes/depois das correções",
    ],
    evidences: [
      "Saídas brutas de Nmap (-sV -sC) em arquivo .txt e .xml",
      "Relatório OpenVAS em PDF com CVSS por host",
      "Evidência de tentativa de pivot bloqueada pelo firewall",
      "Planilha comparativa de vulnerabilidades: antes x depois",
      "Termo de autorização de teste assinado pelo grupo",
    ],
  },
  {
    name: "Integrante 5",
    role: "Engenheiro de Automação e Resposta",
    focus: "Scripts Python, backup e resposta a incidentes",
    color: "success",
    responsibilities: [
      "Desenvolver scripts Python de monitoramento e alerta",
      "Automatizar rotina de backup e verificação de integridade",
      "Escrever o playbook de resposta a incidentes",
      "Conduzir o teste de restauração documentado",
    ],
    evidences: [
      "Repositório com scripts Python comentados e README",
      "Log de execução do script de varredura de hosts novos",
      "Relatório de backup com hash de verificação",
      "Vídeo/print da restauração completa cronometrada (RTO real)",
      "Playbook de incidente em PDF com fluxograma de decisão",
    ],
  },
];

export interface IncidentStage {
  id: string;
  title: string;
  short: string;
  time: string;
  status: "seguro" | "critico" | "resposta" | "recuperado";
  narrative: string;
  metrics: Array<{ label: string; value: string }>;
  logs: Array<{ t: string; src: string; level: "info" | "warn" | "crit" | "ok"; msg: string }>;
  actions: string[];
}

export const incidentStages: IncidentStage[] = [
  {
    id: "normalidade",
    title: "1. Normalidade",
    short: "Operação estável",
    time: "T-00:00",
    status: "seguro",
    narrative:
      "A casa opera em regime normal. Dispositivos IoT conversam apenas com seus serviços autorizados, endpoints estão autenticados no domínio e o backup noturno concluiu com verificação de integridade bem-sucedida.",
    metrics: [
      { label: "Postura", value: "Estável" },
      { label: "Alertas 24h", value: "0 críticos" },
      { label: "Último backup", value: "03:00 · OK" },
      { label: "Hosts ativos", value: "17" },
    ],
    logs: [
      { t: "02:59:58", src: "backup", level: "info", msg: "restic backup iniciado — repositório NAS-30" },
      { t: "03:07:12", src: "backup", level: "ok", msg: "snapshot a91f3c criado · 412 arquivos · integridade OK" },
      { t: "07:14:02", src: "pfsense", level: "info", msg: "DHCP lease 10.10.20.44 → camera-hall (VLAN IoT)" },
      { t: "08:02:41", src: "winsrv", level: "ok", msg: "Event 4624 logon interativo aprovado · MFA satisfeito" },
    ],
    actions: [
      "Monitoramento contínuo com Wazuh + Suricata",
      "Backup diário verificado por hash",
      "Inventário de dispositivos sincronizado",
    ],
  },
  {
    id: "ataque",
    title: "2. Simulação de ataque",
    short: "Kali Linux em ação",
    time: "T+00:04",
    status: "critico",
    narrative:
      "A partir da VLAN 99, o Kali Linux inicia varredura de portas na faixa interna, identifica um dispositivo IoT com telnet exposto e tenta usá-lo como ponte para alcançar o servidor de arquivos e o NAS de backup.",
    metrics: [
      { label: "Postura", value: "Sob ataque" },
      { label: "Pacotes/s", value: "12.400" },
      { label: "Portas varridas", value: "8.912" },
      { label: "Tentativas de pivot", value: "37" },
    ],
    logs: [
      { t: "10:04:03", src: "kali", level: "warn", msg: "nmap -sS -p- 10.10.10.0/24 — varredura SYN iniciada" },
      { t: "10:04:19", src: "suricata", level: "warn", msg: "ET SCAN Potential SYN Flood/Portscan · src 10.10.99.10" },
      { t: "10:05:47", src: "kali", level: "crit", msg: "hydra telnet://10.10.20.44 — 240 tentativas de credencial" },
      { t: "10:06:22", src: "pfsense", level: "crit", msg: "DROP 10.10.20.44 → 10.10.30.5:445 (política IoT→Backup)" },
    ],
    actions: [
      "Reconhecimento com Nmap na faixa interna",
      "Brute force em serviço telnet legado de câmera",
      "Tentativa de movimentação lateral para VLAN 30",
    ],
  },
  {
    id: "contencao",
    title: "3. Ação e contenção",
    short: "HomeShield responde",
    time: "T+00:06",
    status: "resposta",
    narrative:
      "O IPS correlaciona o volume anômalo com as falhas de autenticação e dispara a automação: o host ofensor entra em quarentena por regra dinâmica, a VLAN IoT tem saída suspensa e o time recebe alerta com o contexto completo do incidente.",
    metrics: [
      { label: "Postura", value: "Contenção" },
      { label: "Tempo de detecção", value: "16 s" },
      { label: "Tempo de contenção", value: "1 m 43 s" },
      { label: "Hosts isolados", value: "2" },
    ],
    logs: [
      { t: "10:06:24", src: "suricata", level: "crit", msg: "IPS BLOCK · assinatura 2010935 · host adicionado à tabela quarentena" },
      { t: "10:06:31", src: "python", level: "info", msg: "auto_response.py: regra dinâmica aplicada em pfSense via API" },
      { t: "10:07:02", src: "pfsense", level: "ok", msg: "VLAN 20 saída WAN suspensa · modo contenção ativo" },
      { t: "10:07:46", src: "python", level: "ok", msg: "Alerta enviado (Telegram + e-mail) com pacote de evidências" },
    ],
    actions: [
      "Quarentena automática do host ofensor",
      "Suspensão temporária da saída da VLAN IoT",
      "Captura de pacotes preservada para perícia",
      "Notificação da equipe com contexto do alerta",
    ],
  },
  {
    id: "posincidente",
    title: "4. Pós-incidente",
    short: "Logs e restauração",
    time: "T+01:20",
    status: "recuperado",
    narrative:
      "Com o ataque contido, a equipe analisa a linha do tempo consolidada, remove o serviço telnet legado, restaura a câmera comprometida a partir do snapshot íntegro e registra as lições aprendidas no relatório da banca.",
    metrics: [
      { label: "Postura", value: "Recuperado" },
      { label: "RTO real", value: "18 min" },
      { label: "Perda de dados", value: "0 byte" },
      { label: "Correções aplicadas", value: "6" },
    ],
    logs: [
      { t: "10:41:10", src: "backup", level: "info", msg: "restic restore a91f3c → /srv/iot-config (verificação de hash)" },
      { t: "10:59:04", src: "backup", level: "ok", msg: "Restauração concluída · 412/412 arquivos íntegros" },
      { t: "11:12:33", src: "winsrv", level: "ok", msg: "GPO atualizada: telnet desabilitado em todo o parque" },
      { t: "11:20:00", src: "python", level: "ok", msg: "report_generator.py: relatório de incidente v1.0 publicado" },
    ],
    actions: [
      "Análise de causa raiz com linha do tempo consolidada",
      "Remoção do serviço legado e rotação de credenciais",
      "Restauração validada a partir de snapshot imutável",
      "Atualização do playbook e nova varredura de confirmação",
    ],
  },
];

export interface DocTab {
  id: string;
  label: string;
  title: string;
  description: string;
  lang: string;
  filename: string;
  code: string;
  notes: string[];
}

export const docTabs: DocTab[] = [
  {
    id: "firewall",
    label: "Regras de Firewall",
    title: "Política de negação padrão com segmentação por VLAN",
    description:
      "Regras aplicadas no pfSense. A ordem importa: bloqueios inter-VLAN vêm antes de qualquer liberação de saída.",
    lang: "pf",
    filename: "pfsense/rules.conf",
    code: `# ---- HomeShield 2050 :: política base ----
# Negação padrão em todas as interfaces
block in  log all
block out log all

# WAN: nada entra, exceto o túnel VPN
pass in  on wan proto udp to (wan) port 51820 keep state   # WireGuard

# VLAN 10 (Confiável) -> Internet e serviços internos
pass in on vlan10 from vlan10:network to !rfc1918 keep state
pass in on vlan10 proto tcp to 10.10.10.5 port { 53 88 389 445 } keep state

# VLAN 20 (IoT) -> apenas saída HTTPS/NTP, nunca rede interna
block in  on vlan20 from vlan20:network to { vlan10:network vlan30:network } label "IoT-lateral-block"
pass  in  on vlan20 proto tcp to !rfc1918 port { 443 8883 } keep state
pass  in  on vlan20 proto udp to 10.10.20.1 port 123 keep state

# VLAN 30 (Backup) -> somente o servidor inicia conexão
pass in on vlan10 proto tcp from 10.10.10.5 to 10.10.30.5 port 8000 keep state
block in on vlan30 from vlan30:network to any label "Backup-egress-block"

# VLAN 99 (Lab/Kali) -> liberada apenas na janela de teste
block in on vlan99 all label "Lab-default-deny"
# pass in on vlan99 all  # habilitar somente durante teste autorizado

# Quarentena dinâmica alimentada pelo Suricata / auto_response.py
table <quarentena> persist
block in quick from <quarentena> label "IPS-quarantine"`,
    notes: [
      "Toda regra possui label para rastreio no relatório da banca",
      "Alterações versionadas em Git com changelog assinado",
      "Revisão de regras órfãs a cada sprint do projeto",
    ],
  },
  {
    id: "dns",
    label: "DNS Seguro",
    title: "Resolução interna com forwarders cifrados e filtragem",
    description:
      "DNS interno do Windows Server encaminha para o pfSense, que resolve via DNS over TLS e aplica listas de bloqueio.",
    lang: "powershell",
    filename: "winsrv/dns-hardening.ps1",
    code: `# Zona interna autoritativa
Add-DnsServerPrimaryZone -Name "homeshield.local" \`
  -ReplicationScope "Domain" -DynamicUpdate Secure

# Encaminhadores apontam para o resolvedor DoT do perímetro
Set-DnsServerForwarder -IPAddress 10.10.10.1 -UseRootHint $false

# Bloqueia resolução de domínios de comando e controle conhecidos
Add-DnsServerQueryResolutionPolicy -Name "Block-C2" -Action DENY \`
  -FQDN "EQ,*.no-ip.biz,*.duckdns.org,*.ngrok.io"

# Proteção contra cache poisoning e amplificação
Set-DnsServerCache -MaxTtl 01:00:00 -MaxNegativeTtl 00:05:00
Set-DnsServerRecursion -Enable $true -SecureResponse $true

# Auditoria de consultas para o SIEM
Set-DnsServerDiagnostics -EnableLoggingForLocalLookupEvent $true \`
  -EnableLoggingToFile $true -LogFilePath "C:\\Logs\\dns-audit.log"

# --- pfSense / Unbound: DNS over TLS ---
# server:
#   ssl-upstream: yes
# forward-zone:
#   name: "."
#   forward-tls-upstream: yes
#   forward-addr: 1.1.1.1@853#cloudflare-dns.com
#   forward-addr: 9.9.9.9@853#dns.quad9.net`,
    notes: [
      "Nenhum cliente pode consultar DNS externo diretamente (redirect NAT porta 53)",
      "DNSBL bloqueia ~180 mil domínios de malware e rastreio",
      "Consultas auditadas e correlacionadas no Wazuh",
    ],
  },
  {
    id: "vpn",
    label: "Configurações de VPN",
    title: "WireGuard peer-to-site com acesso restrito por rota",
    description:
      "Único serviço publicado na WAN. Cada integrante possui um peer com chave própria e escopo de rede mínimo.",
    lang: "ini",
    filename: "vpn/wg0.conf",
    code: `[Interface]
# Concentrador no pfSense (VLAN de gerência)
Address    = 10.10.90.1/24
ListenPort = 51820
PrivateKey = <SERVER_PRIVATE_KEY>
MTU        = 1420

# Peer 1 — acesso administrativo completo (Integrante 2)
[Peer]
PublicKey           = <PEER1_PUBLIC_KEY>
PresharedKey        = <PEER1_PSK>
AllowedIPs          = 10.10.90.11/32
PersistentKeepalive = 25

# Peer 2 — acesso somente ao servidor de arquivos
[Peer]
PublicKey    = <PEER2_PUBLIC_KEY>
PresharedKey = <PEER2_PSK>
AllowedIPs   = 10.10.90.12/32

# --- Cliente (perfil do integrante) ---
# [Interface]
# Address    = 10.10.90.11/32
# DNS        = 10.10.10.5          # DNS interno, evita vazamento
# PrivateKey = <CLIENT_PRIVATE_KEY>
#
# [Peer]
# PublicKey  = <SERVER_PUBLIC_KEY>
# Endpoint   = homeshield.ddns.net:51820
# AllowedIPs = 10.10.10.0/24, 10.10.90.0/24   # split tunnel controlado`,
    notes: [
      "Chaves pré-compartilhadas adicionam resistência pós-quântica básica",
      "Rotação de chaves a cada 90 dias registrada em planilha",
      "Firewall na interface VPN limita cada peer aos hosts necessários",
    ],
  },
  {
    id: "python",
    label: "Scripts Python",
    title: "Automação de monitoramento, resposta e backup",
    description:
      "Scripts executados como serviço no servidor, responsáveis por detectar hosts novos e acionar contenção automática.",
    lang: "python",
    filename: "automation/auto_response.py",
    code: `#!/usr/bin/env python3
"""HomeShield 2050 — detecção de host novo e contenção automática."""
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

import requests

INVENTORY = Path("/opt/homeshield/inventory.json")
PFSENSE_API = "https://10.10.10.1/api/v2/firewall/alias"
QUARANTINE_ALIAS = "quarentena"


def scan(network: str = "10.10.20.0/24") -> dict[str, str]:
    """Descoberta ARP rápida na VLAN IoT."""
    out = subprocess.run(
        ["nmap", "-sn", "-oX", "-", network],
        capture_output=True, text=True, check=True,
    ).stdout
    hosts = {}
    for line in out.splitlines():
        if 'addrtype="ipv4"' in line:
            ip = line.split('addr="')[1].split('"')[0]
        if 'addrtype="mac"' in line:
            hosts[line.split('addr="')[1].split('"')[0]] = ip
    return hosts


def quarantine(ip: str, token: str) -> None:
    """Adiciona o host à tabela de quarentena do pfSense."""
    requests.patch(
        PFSENSE_API,
        headers={"Authorization": f"Bearer {token}"},
        json={"name": QUARANTINE_ALIAS, "address": [ip]},
        timeout=10, verify="/etc/ssl/homeshield-ca.pem",
    ).raise_for_status()
    log(f"host {ip} colocado em quarentena")


def log(msg: str) -> None:
    stamp = datetime.now(timezone.utc).isoformat(timespec="seconds")
    print(f"[{stamp}] auto_response :: {msg}", flush=True)


def main() -> None:
    known = json.loads(INVENTORY.read_text()) if INVENTORY.exists() else {}
    current = scan()
    for mac, ip in current.items():
        if mac not in known:
            log(f"DISPOSITIVO DESCONHECIDO {mac} ({ip})")
            quarantine(ip, token=Path("/etc/homeshield/token").read_text().strip())
    INVENTORY.write_text(json.dumps({**known, **current}, indent=2))


if __name__ == "__main__":
    main()`,
    notes: [
      "Executado por systemd timer a cada 5 minutos",
      "Credenciais lidas de arquivo com permissão 0600, nunca no código",
      "Cobertura de testes com pytest e execução em modo dry-run",
    ],
  },
  {
    id: "relatorios",
    label: "Relatórios Nmap/OpenVAS",
    title: "Comparativo antes e depois do hardening",
    description:
      "Resultado consolidado das varreduras autorizadas executadas a partir do Kali Linux nas duas janelas de teste.",
    lang: "text",
    filename: "reports/comparativo.txt",
    code: `HomeShield 2050 — Comparativo de varredura autorizada
Escopo: 10.10.10.0/24, 10.10.20.0/24, 10.10.30.0/24
Ferramentas: nmap 7.94 (-sV -sC -p-) · OpenVAS / GVM 22.5

+----------------------------+-----------+-----------+
| Métrica                    |   ANTES   |  DEPOIS   |
+----------------------------+-----------+-----------+
| Portas abertas (total)     |    41     |     7     |
| Serviços legados (telnet)  |     3     |     0     |
| Vulnerabilidades Críticas  |     4     |     0     |
| Vulnerabilidades Altas     |     9     |     1     |
| Vulnerabilidades Médias    |    16     |     5     |
| CVSS médio do ambiente     |    7.8    |    3.1    |
| Hosts alcançáveis da IoT   |    12     |     0     |
+----------------------------+-----------+-----------+

Principais achados corrigidos
  [CRIT] CVE-2023-1389  Câmera IoT — injeção de comando ......... corrigido (firmware 1.4.2)
  [CRIT] Telnet 23/tcp aberto em 3 dispositivos ................. serviço removido via GPO/VLAN
  [CRIT] SMBv1 habilitado no servidor de arquivos ............... desabilitado + SMB signing
  [ALTO] Credencial padrão em DVR ............................... rotacionada + cofre de senhas
  [ALTO] TLS 1.0/1.1 aceitos no painel de gerência .............. somente TLS 1.3 (pendente 1 host)

Residual aceito
  [MÉDIO] Assistente de voz mantém telemetria em nuvem — mitigado por VLAN isolada
          e rate limit; risco aceito e registrado na matriz de riscos.`,
    notes: [
      "Todas as varreduras cobertas por termo de autorização assinado",
      "Arquivos brutos .xml/.pdf anexados ao repositório de evidências",
      "Nova varredura de confirmação agendada após cada mudança crítica",
    ],
  },
];
