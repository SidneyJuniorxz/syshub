'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineCube,
  HiOutlineCode,
  HiOutlineServer,
  HiOutlineGlobe,
  HiOutlineChevronDown,
  HiOutlineLightningBolt,
} from 'react-icons/hi'
import { BsRobot, BsGraphUp, BsBox, BsLightning } from 'react-icons/bs'

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'automacao', label: 'Automação' },
  { id: 'agentes', label: 'Agentes IA' },
  { id: 'web', label: 'Web Apps' },
  { id: 'infra', label: 'Infraestrutura' },
]

const systems = [
  {
    name: 'n8n',
    url: 'https://n8n.example.com',
    desc: 'Plataforma de automação visual de workflows. Conecta APIs, bancos e serviços sem código. Usado para pipelines de dados, integrações e automações de processos.',
    tech: 'Docker (n8nio/n8n:2.20.9)',
    port: '5678',
    category: 'automacao',
    icon: HiOutlineLightningBolt,
    color: 'text-red-400',
    status: '✅ Produção',
  },
  {
    name: 'Vehicle Prospect',
    url: 'https://prospect.example.com',
    desc: 'Sistema de prospecção automotiva com scrapers inteligentes (OLX, Webmotors, Mercado Livre). Coleta anúncios, enriquece dados de contato e exibe dashboard em tempo real.',
    tech: 'Next.js + tRPC + Drizzle + Playwright + PostgreSQL',
    port: '3002',
    category: 'web',
    icon: HiOutlineGlobe,
    color: 'text-blue-400',
    status: '✅ Produção',
  },
  {
    name: 'ZapTickets',
    url: 'https://ticket.example.com',
    desc: 'Sistema de abertura e gestão de chamados via WhatsApp. Integração direta com WhatsApp Web para criar, atualizar e fechar tickets por mensagem.',
    tech: 'Node.js + WhatsApp Web.js',
    port: '3000',
    category: 'agentes',
    icon: HiOutlineCube,
    color: 'text-green-400',
    status: '✅ Produção',
  },
  {
    name: 'GetSamurai',
    url: 'https://samurai.example.com',
    desc: 'Marketplace / ServiceHub. Plataforma de serviços com frontend Vite e backend FastAPI. Painel para gerenciamento de serviços e usuários.',
    tech: 'React/Vite + FastAPI (Python)',
    port: '3001',
    category: 'web',
    icon: HiOutlineGlobe,
    color: 'text-orange-400',
    status: '✅ Frontend ativo',
  },
  {
    name: 'Second Brain',
    url: 'https://brain.example.com',
    desc: 'Knowledge base pessoal com IA. Segunda mente digital para armazenar, organizar e consultar informações usando linguagem natural com embeddings e RAG.',
    tech: 'FastAPI (Python) + React/Vite',
    port: '3003',
    category: 'agentes',
    icon: BsRobot,
    color: 'text-neon-purple',
    status: '✅ Web ativo',
  },
  {
    name: 'Telemetria',
    url: 'https://telemetria.example.com',
    desc: 'Sistema de telemetria e monitoramento web. Coleta e exibe métricas de sistemas, disponibilidade e performance em tempo real.',
    tech: 'Python + API REST',
    port: '8004',
    category: 'infra',
    icon: BsGraphUp,
    color: 'text-neon-cyan',
    status: '✅ Produção',
  },
  {
    name: 'TMS',
    url: 'https://tms.example.com',
    desc: 'Task Management System — sistema de planejamento logístico e gestão de tarefas. FastAPI com banco PostgreSQL.',
    tech: 'FastAPI (Python)',
    port: '8000',
    category: 'web',
    icon: HiOutlineCube,
    color: 'text-yellow-400',
    status: '✅ Produção',
  },
  {
    name: 'ChatSSVS',
    url: 'http://localhost:5173',
    desc: 'Chat multi-tenant com RAG (Retrieval-Augmented Generation). Usa pgvector para embeddings e Ollama para LLM local. Admin panel em React.',
    tech: 'FastAPI + React + pgvector + Ollama + Redis',
    port: '5173 (admin)',
    category: 'agentes',
    icon: BsRobot,
    color: 'text-pink-400',
    status: '⚠️ Admin ativo, API parada',
  },
  {
    name: 'LabAgents',
    url: 'http://127.0.0.1:5180',
    desc: 'Plataforma multi-agente para desenvolvimento e orquestração de agentes de IA. Inclui frontend, gateway WhatsApp e banco pgvector.',
    tech: 'Python + React + pgvector + Redis',
    port: '5180, 3020',
    category: 'agentes',
    icon: BsRobot,
    color: 'text-neon-cyan',
    status: '⚠️ Frontend + Gateway ativos',
  },
  {
    name: 'SidneyBot v2',
    url: 'http://localhost:3007',
    desc: 'Bot WhatsApp evoluído em TypeScript. Automação de mensagens, respostas inteligentes e integração com outros sistemas.',
    tech: 'Node.js + TypeScript',
    port: '3007',
    category: 'agentes',
    icon: HiOutlineCube,
    color: 'text-green-400',
    status: '✅ Produção',
  },
  {
    name: 'xCripto',
    url: 'https://xcripto.example.com',
    desc: 'Trading bot para criptomoedas. Opera em modo Paper/Live com estratégias automatizadas. Banco PostgreSQL dedicado.',
    tech: 'Python + PostgreSQL',
    port: '8002',
    category: 'automacao',
    icon: BsGraphUp,
    color: 'text-yellow-400',
    status: '⚠️ Agent ativo',
  },
  {
    name: 'Procedure Core',
    url: 'https://procedimentos.example.com',
    desc: 'Sistema de gestão de procedimentos. Cadastro, acompanhamento e relatórios de procedimentos operacionais.',
    tech: 'Python + API REST',
    port: '8014',
    category: 'web',
    icon: HiOutlineServer,
    color: 'text-blue-400',
    status: '✅ Produção',
  },
  {
    name: 'Espetinho Agent',
    url: 'http://localhost:3006',
    desc: 'Agente especializado versão 2.0. Automação de tarefas específicas com Node.js.',
    tech: 'Node.js',
    port: '3006',
    category: 'agentes',
    icon: BsRobot,
    color: 'text-orange-400',
    status: '✅ Produção',
  },
  {
    name: 'n8n Webhook Relay',
    url: 'https://n8n-hooks.example.com',
    desc: 'Relay de webhooks para o n8n. Recebe webhooks externos e encaminha para o n8n processar.',
    tech: 'Node.js',
    port: '9001',
    category: 'automacao',
    icon: HiOutlineLightningBolt,
    color: 'text-red-400',
    status: '✅ Produção',
  },
  {
    name: 'Portainer',
    url: 'http://localhost:9000',
    desc: 'Interface web para gerenciamento do Docker. Visualiza containers, imagens, volumes e redes.',
    tech: 'Docker (portainer/portainer-ce)',
    port: '9000',
    category: 'infra',
    icon: BsBox,
    color: 'text-blue-400',
    status: '✅ Produção',
  },
  {
    name: 'OpenCode Web',
    url: 'https://opencode.example.com',
    desc: 'Interface web do OpenCode — coding agent open-source. Acesso remoto ao agente via navegador.',
    tech: 'Node.js (Web)',
    port: '4096',
    category: 'infra',
    icon: HiOutlineCode,
    color: 'text-neon-purple',
    status: '✅ Produção',
  },
  {
    name: 'Assistente Virtual',
    url: 'http://localhost:8787',
    desc: 'Assistente virtual baseado em FastAPI. Atualmente offline, aguardando reativação.',
    tech: 'FastAPI (Python)',
    port: '8787',
    category: 'agentes',
    icon: BsRobot,
    color: 'text-gray-500',
    status: '❌ Parado',
  },
]

export function SistemasClient() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? systems : systems.filter(s => s.category === filter)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white">Sistemas</h1>
        <p className="text-gray-500 mt-1">Todos os projetos rodando neste servidor</p>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                : 'glass text-gray-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((sys, i) => (
            <motion.div
              key={sys.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === sys.name ? null : sys.name)}
                className="w-full text-left p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <sys.icon className={`w-5 h-5 ${sys.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{sys.name}</h3>
                      <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{sys.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{sys.tech}</p>
                  </div>
                  <HiOutlineChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${
                      expanded === sys.name ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {expanded === sys.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-3 border-t border-dark-border pt-3">
                      <p className="text-sm text-gray-400 leading-relaxed">{sys.desc}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="text-gray-500">Porta: {sys.port}</span>
                        <span className="text-gray-500">|</span>
                        <span>{sys.status}</span>
                      </div>
                      <a
                        href={sys.url}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs text-neon-cyan hover:text-neon-purple transition-colors"
                      >
                        <HiOutlineGlobe className="w-3.5 h-3.5" />
                        {sys.url}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center text-xs text-gray-600">
        {filtered.length} sistema{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
