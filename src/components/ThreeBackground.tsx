'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const count = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.02
    ref.current.rotation.y += delta * 0.015
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        size={0.05}
        color="#8b5cf6"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </Points>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
