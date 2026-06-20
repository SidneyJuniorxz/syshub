import { getDockerContainers } from '@/lib/docker'

export async function GET() {
  const containers = await getDockerContainers()
  return Response.json(containers)
}
