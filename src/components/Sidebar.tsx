'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  HiOutlineHome,
  HiOutlineTerminal,
  HiOutlineCog,
  HiOutlineServer,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineInformationCircle,
  HiOutlineViewGrid,
} from 'react-icons/hi'

const links = [
  { href: '/', label: 'Início', icon: HiOutlineHome },
  { href: '/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { href: '/sistemas', label: 'Sistemas', icon: HiOutlineInformationCircle },
  { href: '/terminal', label: 'Terminal', icon: HiOutlineTerminal },
  { href: '/admin', label: 'Admin', icon: HiOutlineCog },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass text-white"
      >
        {isOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        className="fixed left-0 top-0 h-screen w-64 glass z-50 flex flex-col lg:translate-x-0 lg:static"
      >
        <div className="p-6 border-b border-dark-border">
          <h1 className="text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            SysHub
          </h1>
          <p className="text-sm text-gray-500 mt-1">Painel de Controle</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link key={href} href={href} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-purple"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-dark-border">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <HiOutlineServer className="w-4 h-4" />
            <span>Servidor Online</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </motion.aside>
    </>
  )
}
