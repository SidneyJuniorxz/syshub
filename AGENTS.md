<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:syshub-deployment -->
# SysHub — Hub de Controle do Sistema

## Descrição
Dashboard centralizado que redireciona para aplicações PM2/Docker, exibe informações do sistema, terminal web e admin.

## Stack
- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** (tema dark, glassmorphism, neon)
- **Three.js** + react-three-fiber (fundo 3D partículas)
- **Framer Motion** (animações)
- **react-icons** (Heroicons)

## Porta
3004 (produção, via PM2)

## Deploy
```bash
cd /caminho/do/projeto/syshub
npm run build                    # Build de produção
pm2 start ecosystem.config.js    # Inicia web + tunnel
pm2 save                         # Persiste no reboot
```

## PM2
- `syshub-web`: Next.js production (porta 3004)
- `syshub-tunnel`: Cloudflare Tunnel

## Túnel Cloudflare
- **Domínio:** (configurado via Cloudflare)
- **Tunnel ID:** (removido — sensível)
- **Config:** ~/.cloudflared/syshub_config.yml

## API Routes
| Rota | Função |
|------|--------|
| `/api/system` | CPU, memória, disco, uptime, rede |
| `/api/docker` | Lista containers (docker ps) |
| `/api/pm2` | Lista processos PM2 (pm2 jlist) |
| `/api/apps` | Apps registrados (config em src/lib/apps.ts) |
| `/api/terminal` | Executa comandos no servidor |

## Manutenção
- **Adicionar apps:** editar `src/lib/apps.ts`
- **Sistema não usa banco de dados**
- **Dados vêm de:** systeminformation (server), docker ps (shell), pm2 jlist (shell)

## Acesso
- Local: http://localhost:3004
