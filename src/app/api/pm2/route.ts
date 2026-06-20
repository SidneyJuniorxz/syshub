import { getPm2Processes } from '@/lib/pm2'

export async function GET() {
  const processes = await getPm2Processes()
  return Response.json(processes)
}
