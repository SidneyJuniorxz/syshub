'use client'

import { motion } from 'framer-motion'
import { HiOutlineChip, HiOutlineServer, HiOutlineCube, HiOutlineCode, HiOutlineGlobe, HiOutlineClock, HiOutlineStatusOnline } from 'react-icons/hi'
import { BsHddNetwork, BsBox } from 'react-icons/bs'
import { StatCard } from '@/components/StatCard'
import { AutoRefetch } from '@/components/AutoRefetch'

function formatBytes(bytes: number) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
}

function formatUptime(seconds: number) {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${d}d ${h}h ${m}m`
}

function AppCard({ app }: { app: any }) {
  const stageColors: Record<string, string> = {
    dev: 'bg-yellow-500',
    staging: 'bg-blue-500',
    production: 'bg-green-500',
  }

  const displayUrl = app.tunnelUrl || app.url

  return (
    <motion.a
      href={displayUrl}
      target="_blank"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl p-5 glow-border block cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center shrink-0">
          {app.type === 'docker' ? (
            <BsBox className="w-5 h-5 text-neon-cyan" />
          ) : (
            <HiOutlineCode className="w-5 h-5 text-neon-purple" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{app.name}</h3>
          <p className="text-xs text-gray-500 truncate">{app.description}</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${stageColors[app.stage] || 'bg-gray-500'} text-white`}>
          {app.stage}
        </span>
      </div>
      {displayUrl.startsWith('http') && (
        <p className="text-[10px] text-gray-600 truncate">{displayUrl}</p>
      )}
    </motion.a>
  )
}

function DockerRow({ container }: { container: any }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-dark-border last:border-0">
      <span className={`w-2 h-2 rounded-full ${container.state === 'running' ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className="flex-1 text-sm font-medium text-white">{container.name}</span>
      <span className="text-xs text-gray-400">{container.image}</span>
      <span className="text-xs text-gray-500">{container.status}</span>
    </div>
  )
}

function Pm2Row({ process }: { process: any }) {
  const statusColors: Record<string, string> = {
    online: 'bg-green-500',
    stopped: 'bg-gray-500',
    errored: 'bg-red-500',
  }

  return (
    <div className="flex items-center gap-4 py-3 border-b border-dark-border last:border-0">
      <span className={`w-2 h-2 rounded-full ${statusColors[process.status]}`} />
      <span className="flex-1 text-sm font-medium text-white">{process.name}</span>
      <span className="text-xs text-gray-400">CPU: {process.cpu}%</span>
      <span className="text-xs text-gray-400">{formatBytes(process.memory)}</span>
      <span className="text-xs text-gray-500">{process.uptime}</span>
    </div>
  )
}

export function DashboardClient({
  system: initialSystem,
  dockers: initialDockers,
  pm2: initialPm2,
  apps,
}: {
  system: any
  dockers: any[]
  pm2: any[]
  apps: any[]
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do sistema</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AutoRefetch
          initialData={initialSystem}
          fetchFn={() => fetch('/api/system').then(r => r.json())}
          render={(sys) => (
            <>
              <StatCard
                title="CPU Load"
                value={`${sys.cpuLoad}%`}
                subtitle={sys.cpu?.split(' ').slice(0, 2).join(' ')}
                icon={<HiOutlineChip className="w-6 h-6" />}
                color="neon-cyan"
              />
              <StatCard
                title="Memória"
                value={formatBytes(sys.memUsed)}
                subtitle={`de ${formatBytes(sys.memTotal)}`}
                icon={<HiOutlineServer className="w-6 h-6" />}
                color="neon-purple"
              />
              <StatCard
                title="Disco"
                value={formatBytes(sys.diskUsed)}
                subtitle={`de ${formatBytes(sys.diskTotal)}`}
                icon={<BsHddNetwork className="w-6 h-6" />}
                color="neon-pink"
              />
              <StatCard
                title="Uptime"
                value={formatUptime(sys.uptime)}
                subtitle={sys.hostname}
                icon={<HiOutlineClock className="w-6 h-6" />}
                color="green"
              />
            </>
          )}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineCube className="w-5 h-5 text-neon-cyan" />
            <h2 className="text-lg font-semibold text-white">Docker</h2>
          </div>
          <AutoRefetch
            initialData={initialDockers}
            fetchFn={() => fetch('/api/docker').then(r => r.json())}
            render={(containers) => (
              <div>
                {containers.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum container encontrado</p>
                ) : (
                  containers.map((c: any) => <DockerRow key={c.id} container={c} />)
                )}
              </div>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineStatusOnline className="w-5 h-5 text-neon-purple" />
            <h2 className="text-lg font-semibold text-white">PM2</h2>
          </div>
          <AutoRefetch
            initialData={initialPm2}
            fetchFn={() => fetch('/api/pm2').then(r => r.json())}
            render={(processes) => (
              <div>
                {processes.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum processo PM2</p>
                ) : (
                  processes.map((p: any) => <Pm2Row key={p.id} process={p} />)
                )}
              </div>
            )}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineGlobe className="w-5 h-5 text-neon-pink" />
          <h2 className="text-lg font-semibold text-white">Aplicações</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <AppCard key={app.name} app={app} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
