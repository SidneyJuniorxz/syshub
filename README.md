<div align="center">
  <h1>SysHub</h1>
  <p><strong>Centralized Server Control Dashboard</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19.2-blue?logo=react" alt="React 19" />
    <img src="https://img.shields.io/badge/Three.js-r184-green?logo=three.js" alt="Three.js" />
    <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss" alt="Tailwind v4" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  </p>
</div>

## Overview

SysHub is a full-stack server monitoring dashboard with a cyberpunk/neon aesthetic. It provides real-time system metrics, Docker container management, PM2 process monitoring, a browsable project catalog, and an in-browser web terminal — all wrapped in a glassmorphism UI with an animated 3D particle background.

## Features

- **Live Dashboard** — Real-time CPU, memory, disk, and uptime monitoring (auto-refresh every 5s)
- **Docker Monitor** — Container status, images, and port mappings
- **PM2 Process Manager** — Live process list with CPU/memory usage
- **Systems Catalog** — Filterable project registry with tech stack, ports, and status
- **Web Terminal** — Execute shell commands directly from the browser
- **Admin Panel** — Quick access to Cockpit, Portainer, and PM2 Plus
- **3D Particle Background** — Animated Three.js starfield effect
- **Glassmorphism UI** — Dark neon theme with frosted glass cards and glow borders

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| 3D | Three.js, react-three-fiber, drei |
| Icons | react-icons (Heroicons, Bootstrap) |
| Monitoring | systeminformation, Docker CLI, PM2 CLI |
| Language | TypeScript |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Server overview with highlights and project ecosystem |
| `/dashboard` | Live metrics (CPU, RAM, disk, Docker, PM2) |
| `/sistemas` | Filterable project catalog with details |
| `/terminal` | In-browser web terminal |
| `/admin` | Admin tools panel |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/system` | CPU, memory, disk, network, hostname |
| GET | `/api/docker` | Docker containers list |
| GET | `/api/pm2` | PM2 process list |
| GET | `/api/apps` | Registered applications |
| POST | `/api/terminal` | Execute shell command |

## Getting Started

```bash
# Install dependencies
npm install

# Development (with Turbopack)
npm run dev

# Production build
npm run build
npm run start -- -p 3004
```

## Architecture

The app uses Next.js App Router with no database — all data is fetched live from the OS via `systeminformation`, Docker, and PM2 CLI tools. API routes run server-side and return JSON consumed by client components with auto-refresh polling.

```
Browser → Next.js Server → systeminformation / Docker CLI / PM2 CLI
                              ↓
                         Live OS Metrics
```

## Deployment

```bash
# Using PM2
pm2 start ecosystem.config.js
pm2 save
```

## License

MIT
