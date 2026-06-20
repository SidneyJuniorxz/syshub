import { exec } from 'child_process'
import { promisify } from 'util'
import { NextRequest } from 'next/server'

const execAsync = promisify(exec)

export async function POST(request: NextRequest) {
  const { command } = await request.json()

  if (!command || typeof command !== 'string') {
    return Response.json({ error: 'Comando inválido' }, { status: 400 })
  }

  try {
    const { stdout, stderr } = await execAsync(command, {
      timeout: 10000,
      maxBuffer: 1024 * 1024,
    })
    return Response.json({ output: stdout + stderr })
  } catch (err: any) {
    return Response.json({ output: err.stdout + err.stderr || err.message })
  }
}
