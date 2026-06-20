'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThreeBackground } from '@/components/ThreeBackground'
import { HiOutlineCog, HiOutlineServer, HiOutlineShieldCheck, HiOutlineUser } from 'react-icons/hi'

const adminTools = [
  {
    name: 'Cockpit',
    description: 'Gerenciamento completo do sistema via web',
    url: 'https://localhost:9090',
    icon: HiOutlineServer,
    color: 'text-neon-cyan',
  },
  {
    name: 'Portainer',
    description: 'Gerenciamento de containers Docker',
    url: 'http://localhost:9000',
    icon: HiOutlineCog,
    color: 'text-neon-purple',
  },
  {
    name: 'PM2 Plus',
    description: 'Monitoramento avançado de processos',
    url: 'https://app.pm2.io',
    icon: HiOutlineShieldCheck,
    color: 'text-neon-pink',
  },
  {
    name: 'Gerenciar Usuários',
    description: 'Gerenciamento de usuários do sistema',
    url: '#',
    icon: HiOutlineUser,
    color: 'text-green-400',
  },
]

export default function AdminPage() {
  return (
    <>
      <ThreeBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-8"
      >
        <h1 className="text-3xl font-bold text-white">Admin</h1>
        <p className="text-gray-500">Ferramentas de administração do sistema</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminTools.map((tool) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-2xl p-6 glow-border block"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{tool.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Informações do Sistema</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Sistema</p>
              <p className="text-white" id="sys-info">Carregando...</p>
            </div>
            <div>
              <p className="text-gray-500">Kernel</p>
              <p className="text-white" id="kernel-info">Carregando...</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
