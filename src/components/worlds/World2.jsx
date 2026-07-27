import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Building({ position, height, color, emissive, delay }) {
  const ref = useRef()
  const baseY = position[1]

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.04
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.35, height, 0.35]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={0.7}
        metalness={0.9}
        roughness={0.15}
      />
    </mesh>
  )
}

function NeonSign({ position, color, text }) {
  return (
    <mesh position={position}>
      <planeGeometry args={[0.6, 0.15]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

function FloatingNeonParticle({ position, color, speed, offset }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y += Math.sin(t * 2) * 0.002
    ref.current.position.x += Math.cos(t * 1.5) * 0.001
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export default function World2({ scroll }) {
  const groupRef = useRef()
  const coreRef = useRef()

  const buildings = useMemo(() => {
    const colors = ['#00ffff', '#ff00ff', '#00ff88', '#ff6600', '#aa00ff', '#00ccff', '#ffff00', '#ff0066']
    return Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2 + Math.random() * 0.1
      const dist = 0.8 + Math.random() * 2.2
      return {
        position: [Math.cos(angle) * dist, Math.random() * 1.5 + 0.3, Math.sin(angle) * dist],
        height: 0.4 + Math.random() * 2.8,
        color: colors[i % colors.length],
        delay: Math.random() * 5,
      }
    })
  }, [])

  const neonParticles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        Math.random() * 3,
        (Math.random() - 0.5) * 6,
      ],
      color: ['#00ffff', '#ff00ff', '#00ff88', '#ff6600'][i % 4],
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    })),
  [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.02
    groupRef.current.visible = scroll.offset > 0.2 && scroll.offset < 0.6

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <group position={[16, -0.1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7, 7]} />
          <meshStandardMaterial
            color="#0a0a1a"
            metalness={0.95}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        <gridHelper args={[7, 20, '#00ffff', '#ff00ff']} position={[0, 0.01, 0]} />

        {buildings.map((b, i) => (
          <Building key={i} {...b} />
        ))}

        <NeonSign position={[-0.8, 1.2, 1.5]} color="#00ffff" />
        <NeonSign position={[1.2, 0.9, -1.0]} color="#ff00ff" />
        <NeonSign position={[-1.5, 0.6, -1.2]} color="#00ff88" />

        {neonParticles.map((p, i) => (
          <FloatingNeonParticle key={i} {...p} />
        ))}

        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.0, 1.03, 64]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
          <ringGeometry args={[2.0, 2.03, 64]} />
          <meshBasicMaterial color="#ff00ff" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, -Math.PI / 4, 0]}>
          <ringGeometry args={[3.0, 3.03, 64]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        <mesh ref={coreRef} position={[0, 2.8, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={1.5}
            metalness={1}
            roughness={0}
          />
        </mesh>

        <mesh position={[0, 2.8, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </group>
  )
}
