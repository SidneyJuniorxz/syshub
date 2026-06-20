'use client'

import { motion } from 'framer-motion'
import {
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineServer,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineTerminal,
  HiOutlineCode,
} from 'react-icons/hi'
import { BsRobot, BsHddNetwork } from 'react-icons/bs'

const specs = [
  { label: 'CPU', value: 'Intel Core i5 (6 cores)', subtitle: 'Exemplo de hardware', icon: HiOutlineChip, color: 'text-neon-cyan' },
  { label: 'RAM', value: '16 GiB', icon: HiOutlineServer, color: 'text-neon-purple' },
  { label: 'Disco', value: 'SSD 256 GB', subtitle: 'NVMe', icon: BsHddNetwork, color: 'text-neon-pink' },
  { label: 'SO', value: 'Ubuntu 24.04', subtitle: 'Linux', icon: HiOutlineTerminal, color: 'text-orange-400' },
  { label: 'Virtualização', value: 'Docker', subtitle: 'containerd + runc', icon: HiOutlineCube, color: 'text-blue-400' },
]

const highlights = [
  {
    title: 'Laboratório de IA e Agentes',
    desc: 'Este computador funciona como um laboratório de desenvolvimento de IA, agentes autônomos e automação. Aqui rodam simultaneamente dezenas de serviços entre frontends, backends, bancos de dados e agentes de IA.',
    icon: BsRobot,
    color: 'text-neon-cyan',
  },
  {
    title: '30+ Processos PM2',
    desc: 'Gerenciados pelo PM2 com auto-restart e persistência. Inclui bots WhatsApp, APIs FastAPI, frontends React/Vite/Next.js, relays de webhook e túneis Cloudflare.',
    icon: HiOutlineCode,
    color: 'text-neon-purple',
  },
  {
    title: '10 Containers Docker',
    desc: 'Bancos PostgreSQL (com pgvector para embeddings), Redis, Portainer, n8n e mais. Tudo orquestrado via docker-compose.',
    icon: HiOutlineCube,
    color: 'text-neon-pink',
  },
  {
    title: 'Cloudflare Tunnels',
    desc: 'Todos os serviços expostos via Cloudflare Tunnels (cloudflared), sem abrir portas no roteador. Domínios configurados com proxy DDoS protection.',
    icon: HiOutlineShieldCheck,
    color: 'text-green-400',
  },
]

export function HomeClient() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white">SysHub</h1>
        <p className="text-gray-400 text-lg mt-2">
          Hub de controle do servidor de desenvolvimento e staging
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
            Ubuntu 24.04
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-neon-purple/10 text-neon-purple border border-neon-purple/30">
            Node.js 22
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-neon-pink/10 text-neon-pink border border-neon-pink/30">
            Docker 29
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/30">
            PM2 6
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30">
            Cloudflare Tunnels
          </span>
        </div>
      </motion.div>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-6">Sobre Este Servidor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 glow-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-6">Especificações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
              <p className="text-white font-medium mt-2">{item.value}</p>
              {item.subtitle && (
                <p className="text-xs text-gray-600 mt-0.5">{item.subtitle}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-6">Ecossistema de Projetos</h2>
        <div className="glass rounded-2xl p-6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-dark-border">
                  <th className="text-left py-3 px-2">Projeto</th>
                  <th className="text-left py-3 px-2">Função</th>
                  <th className="text-left py-3 px-2 hidden sm:table-cell">Porta</th>
                  <th className="text-left py-3 px-2 hidden md:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['n8n', 'Automação visual de workflows', '5678', '✅'],
                  ['Vehicle Prospect', 'Prospecção automotiva c/ scraping', '3002', '✅'],
                  ['ZapTickets', 'Sistema de tickets WhatsApp', '3000', '✅'],
                  ['GetSamurai', 'Marketplace / ServiceHub', '3001', '✅'],
                  ['Second Brain', 'Knowledge base / IA', '3003', '✅'],
                  ['Telemetria', 'Monitoramento web', '8004', '✅'],
                  ['TMS', 'Task Management System', '8000', '✅'],
                  ['ChatSSVS', 'Chat multi-tenant c/ RAG', '5173', '⚠️'],
                  ['LabAgents', 'Plataforma multi-agente', '5180', '⚠️'],
                  ['SidneyBot v2', 'Bot WhatsApp evoluído', '3007', '✅'],
                  ['xCripto', 'Trading bot', '8002', '⚠️'],
                  ['Procedure Core', 'Gestão de procedimentos', '8014', '✅'],
                  ['Espetinho Agent', 'Agente especializado', '3006', '✅'],
                  ['Assistente Virtual', 'Assistente IA (FastAPI)', '8787', '❌'],
                ].map(([projeto, funcao, porta, status], i) => (
                  <tr key={projeto} className="border-b border-dark-border/50 last:border-0 hover:bg-white/5">
                    <td className="py-3 px-2 text-white font-medium">{projeto}</td>
                    <td className="py-3 px-2 text-gray-400">{funcao}</td>
                    <td className="py-3 px-2 text-gray-500 hidden sm:table-cell">{porta}</td>
                    <td className="py-3 px-2 hidden md:table-cell">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
