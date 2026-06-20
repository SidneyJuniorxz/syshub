import { registeredApps } from '@/lib/apps'

export async function GET() {
  return Response.json(registeredApps)
}
