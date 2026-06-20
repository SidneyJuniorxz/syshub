'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThreeBackground } from '@/components/ThreeBackground'

export default function TerminalPage() {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'SysHub Terminal v1.0' },
    { type: 'output', text: 'Digite "help" para comandos disponíveis.' },
    { type: 'output', text: '' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  async function executeCommand(cmd: string) {
    setHistory((prev) => [...prev, { type: 'input', text: `$ ${cmd}` }])
    setLoading(true)

    try {
      const res = await fetch('/api/terminal', {
        method: 'POST',
        body: JSON.stringify({ command: cmd }),
      })
      const data = await res.json()
      setHistory((prev) => [...prev, { type: 'output', text: data.output }])
    } catch {
      setHistory((prev) => [...prev, { type: 'output', text: 'Erro ao executar comando' }])
    }
    setLoading(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    executeCommand(input.trim())
    setInput('')
  }

  return (
    <>
      <ThreeBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Terminal</h1>

        <div className="glass rounded-2xl overflow-hidden border border-dark-border">
          <div className="bg-black/40 p-4 h-[600px] overflow-y-auto font-mono text-sm">
            {history.map((entry, i) => (
              <div
                key={i}
                className={`mb-1 ${
                  entry.type === 'input' ? 'text-neon-cyan' : 'text-gray-300'
                }`}
              >
                {entry.text.split('\n').map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex border-t border-dark-border">
            <span className="px-4 py-3 text-neon-cyan font-mono text-sm bg-black/20">$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-transparent px-4 py-3 text-white font-mono text-sm outline-none disabled:opacity-50"
              placeholder={loading ? 'Executando...' : 'Digite um comando...'}
              autoFocus
            />
          </form>
        </div>
      </motion.div>
    </>
  )
}
