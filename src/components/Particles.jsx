import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 4000

export default function Particles({ scroll }) {
  const meshRef = useRef()

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    const siz = new Float32Array(COUNT)

    const warm = new THREE.Color('#ff6b9d')
    const neon = new THREE.Color('#00ffff')
    const cosmic = new THREE.Color('#a855f7')

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const x = (Math.random() - 0.5) * 44
      const y = Math.random() * 9 - 1
      const z = (Math.random() - 0.5) * 14

      pos[i3] = x
      pos[i3 + 1] = y
      pos[i3 + 2] = z

      const t = (x + 22) / 40
      const c = new THREE.Color().lerpColors(warm, neon, Math.min(t, 0.5) * 2)
      c.lerp(cosmic, Math.max(t - 0.5, 0) * 2)

      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b

      siz[i] = 0.01 + Math.random() * 0.08
    }

    return { positions: pos, colors: col, sizes: siz }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position
    const array = posAttr.array

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      array[i3 + 1] += Math.sin(time * 0.4 + array[i3] * 0.3) * 0.004 + 0.003
      if (array[i3 + 1] > 8) array[i3 + 1] = -1
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
