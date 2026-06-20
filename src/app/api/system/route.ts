import { getSystemInfo } from '@/lib/system'

export async function GET() {
  const info = await getSystemInfo()
  return Response.json(info)
}
