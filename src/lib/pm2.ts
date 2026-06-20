import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface Pm2Process {
  id: number
  name: string
  status: 'online' | 'stopped' | 'errored'
  cpu: number
  memory: number
  uptime: string
  pm2Env?: {
    status: string
    pm_uptime: number
  }
}

export async function getPm2Processes(): Promise<Pm2Process[]> {
  try {
    const { stdout } = await execAsync('pm2 jlist')
    const list = JSON.parse(stdout)
    return list.map((p: any) => ({
      id: p.pm_id,
      name: p.name,
      status: p.pm2_env?.status || 'stopped',
      cpu: p.monit?.cpu ?? 0,
      memory: p.monit?.memory ?? 0,
      uptime: p.pm2_env?.pm_uptime
        ? formatUptime(p.pm2_env.pm_uptime)
        : 'N/A',
    }))
  } catch {
    return []
  }
}

function formatUptime(timestamp: number): string {
  const diff = Date.now() - timestamp
  const hrs = Math.floor(diff / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  return `${hrs}h ${mins}m`
}
