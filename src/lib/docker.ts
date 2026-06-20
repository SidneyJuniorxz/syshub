import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export interface ContainerInfo {
  id: string
  name: string
  image: string
  state: string
  status: string
  ports: string
}

export async function getDockerContainers(): Promise<ContainerInfo[]> {
  try {
    const { stdout } = await execAsync(
      'docker ps -a --format \'{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.State}}\t{{.Status}}\t{{.Ports}}\''
    )
    if (!stdout.trim()) return []

    return stdout.trim().split('\n').map((line) => {
      const [id, name, image, state, ...rest] = line.split('\t')
      const status = rest.slice(0, -1).join('\t')
      const ports = rest[rest.length - 1] || ''
      return { id: id.slice(0, 12), name, image, state, status, ports }
    })
  } catch {
    return []
  }
}
