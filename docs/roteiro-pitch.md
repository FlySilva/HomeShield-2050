# Roteiro de Pitch — HomeShield 2050 (5 minutos)

> Duração alvo: ~5 minutos falados (ritmo calmo, ~130 palavras/min).
> Sugestão: reproduzir o vídeo `homeshield2050-pitch.mp4` (30 s) durante a **Abertura** ou como encerramento, e conduzir o restante com a landing page do projeto na tela.

---

## 1. Abertura — o problema (0:00 – 0:40)

"Quantos dispositivos conectados existem na sua casa hoje? Câmeras, lâmpadas, assistentes de voz, TVs, notebooks… Uma residência moderna tem facilmente 15 a 20 dispositivos na rede — e a maioria deles com segurança frágil, credenciais padrão e firmware desatualizado.

O **HomeShield 2050** nasce para responder a uma pergunta simples: e se uma casa inteligente tivesse o mesmo nível de defesa de uma empresa? Nosso projeto projeta, implementa e **testa de verdade** uma infraestrutura residencial com padrão corporativo de segurança."

*[Opcional: reproduzir o vídeo de 30 s aqui.]*

## 2. Visão geral da arquitetura (0:40 – 2:00)

"Nossa arquitetura é organizada em **camadas de defesa**. Todo o tráfego entra por um único ponto: o link da operadora, que consideramos não confiável. Nenhuma porta fica exposta — a única exceção é o túnel **WireGuard**, nosso acesso remoto cifrado.

Na borda, um **firewall pfSense** atua como perímetro: roda o **Suricata em modo IPS**, bloqueando ataques inline, e o **pfBlockerNG**, que filtra DNS com listas de domínios maliciosos e bloqueio geográfico.

Atrás do firewall, um **Windows Server 2022** é o núcleo de serviços: Active Directory para identidade, DNS interno com encaminhamento cifrado via DNS-over-TLS, e políticas de grupo de hardening — LAPS, AppLocker e assinatura SMB.

E aqui está a decisão mais importante: a rede é **segmentada em quatro VLANs**. A VLAN 10 abriga as estações da família; a VLAN 20 isola todos os dispositivos IoT; a VLAN 30 é exclusiva do backup; e a VLAN 99 é nosso laboratório de testes. Entre elas vale a **negação padrão**: um segmento não conversa com o outro sem uma regra explícita."

## 3. Segmentação e defesa em profundidade (2:00 – 3:00)

"Por que isso importa? Porque o elo mais fraco de uma casa inteligente é o dispositivo IoT. No HomeShield, uma câmera comprometida **não enxerga** o notebook de ninguém, nem o servidor, nem o backup. A IoT só sai para a nuvem do fabricante, com limite de banda e inventário por endereço MAC — qualquer dispositivo novo gera alerta e entra em quarentena automaticamente.

O backup segue a estratégia **3-2-1 com snapshots imutáveis**: só o servidor pode iniciar conexão com o NAS, o que impede que um ransomware criptografe as cópias. E todo o monitoramento é centralizado no **Wazuh**, que correlaciona eventos do firewall, do servidor e dos endpoints."

## 4. A prova: simulação de ataque (3:00 – 4:00)

"E nós não pedimos que vocês confiem apenas no desenho — nós **atacamos a nossa própria rede**. A partir da VLAN 99, um Kali Linux executou varredura completa com Nmap, brute force contra um serviço telnet legado de uma câmera e tentativas de movimentação lateral.

O resultado: o Suricata detectou a varredura em **16 segundos**; a automação em Python colocou o host ofensor em quarentena e suspendeu a saída da VLAN IoT em **1 minuto e 43 segundos**; e a câmera comprometida foi restaurada a partir de um snapshot íntegro, com **zero bytes perdidos** e RTO real de 18 minutos."

## 5. Resultados e encerramento (4:00 – 5:00)

"O comparativo das varreduras Nmap e OpenVAS, antes e depois do hardening, resume o projeto: as portas abertas caíram de **41 para 7**; as vulnerabilidades críticas, de **4 para zero**; o CVSS médio do ambiente, de **7.8 para 3.1**; e o número de hosts alcançáveis a partir da rede IoT foi de 12 para **zero**.

Cada um dos cinco integrantes respondeu por um pilar — rede, firewall, identidade, segurança ofensiva e automação — e cada entrega está documentada com evidências: diagramas, exports de configuração, relatórios e scripts versionados.

O HomeShield 2050 prova que segurança de nível corporativo não é exclusividade de grandes empresas: com arquitetura correta, segmentação e resposta automatizada, **uma casa comum pode ser um ambiente genuinamente seguro**. Obrigado — ficamos à disposição para perguntas."

---

## Dicas de apresentação

- **0:00–0:40** — falar olhando para a banca; vídeo ou slide de título ao fundo.
- **0:40–3:00** — mostrar a seção de topologia interativa da landing page; clicar nos nós enquanto explica.
- **3:00–4:00** — abrir o simulador de incidente e avançar as 4 etapas ao vivo.
- **4:00–5:00** — exibir a aba "Relatórios Nmap/OpenVAS" com o comparativo antes × depois.
