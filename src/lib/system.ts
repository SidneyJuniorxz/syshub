import si from 'systeminformation'

export interface SystemInfo {
  os: string
  hostname: string
  kernel: string
  uptime: number
  cpu: string
  cpuLoad: number
  cpuCores: number
  memTotal: number
  memUsed: number
  memFree: number
  diskTotal: number
  diskUsed: number
  diskFree: number
  network: { iface: string; ip4: string }[]
}

export async function getSystemInfo(): Promise<SystemInfo> {
  const [osInfo, cpuInfo, cpuLoad, mem, disks, network, time] =
    await Promise.all([
      si.osInfo(),
      si.cpu(),
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkInterfaces(),
      si.time(),
    ])

  const disk = disks[0] || { size: 0, used: 0, available: 0 }

  return {
    os: `${osInfo.distro} ${osInfo.release}`,
    hostname: osInfo.hostname,
    kernel: osInfo.kernel,
    uptime: time.uptime,
    cpu: `${cpuInfo.manufacturer} ${cpuInfo.brand}`,
    cpuLoad: Math.round(cpuLoad.currentLoad * 100) / 100,
    cpuCores: cpuInfo.cores,
    memTotal: mem.total,
    memUsed: mem.used,
    memFree: mem.free,
    diskTotal: disk.size,
    diskUsed: disk.used,
    diskFree: disk.available,
    network: network
      .filter((n) => n.ip4)
      .map((n) => ({ iface: n.iface, ip4: n.ip4 })),
  }
}
