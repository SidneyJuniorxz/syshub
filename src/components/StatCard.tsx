'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  color?: string
}

export function StatCard({ title, value, subtitle, icon, color = 'neon-purple' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 glow-border hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className={`text-${color}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold mt-4 text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
      )}
    </motion.div>
  )
}
