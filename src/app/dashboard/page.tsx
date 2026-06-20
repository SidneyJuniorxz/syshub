import { ThreeBackground } from '@/components/ThreeBackground'
import { DashboardClient } from '../DashboardClient'
import { getSystemInfo } from '@/lib/system'
import { getDockerContainers } from '@/lib/docker'
import { getPm2Processes } from '@/lib/pm2'
import { registeredApps } from '@/lib/apps'

export default async function DashboardPage() {
  const [system, dockers, pm2] = await Promise.all([
    getSystemInfo(),
    getDockerContainers(),
    getPm2Processes(),
  ])

  return (
    <>
      <ThreeBackground />
      <DashboardClient
        system={system}
        dockers={dockers}
        pm2={pm2}
        apps={registeredApps}
      />
    </>
  )
}
