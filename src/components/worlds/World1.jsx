import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function GlassTorus({ position, rotation, args, color, scale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.003
    ref.current.rotation.y += 0.005
    ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.002
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <torusKnotGeometry args={args} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.3}
        thickness={0.6}
        chromaticAberration={0.12}
        anisotropicBlur={0.2}
        clearcoat={0.3}
        color={color}
        envMapIntensity={1.5}
        resolution={256}
        samples={8}
      />
    </mesh>
  )
}

function FloatingOrb({ position, color, size = 0.2 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y += Math.sin(t * 0.7 + position[0]) * 0.001
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.015
  })

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  )
}

function OrbitingRing({ radius, color, speed = 1, tilt = 0 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.1 * speed
    ref.current.rotation.x = tilt
  })

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius, radius + 0.03, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function World1({ scroll }) {
  const groupRef = useRef()

  const orbs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2
      return {
        position: [Math.cos(angle) * 2.8, 0.5 + Math.sin(i * 1.3) * 0.8, Math.sin(angle) * 2.8],
        color: i % 2 === 0 ? '#ff6b9d' : '#ffd166',
        size: 0.1 + Math.random() * 0.12,
      }
    }),
  [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.06
    groupRef.current.visible = scroll.offset < 0.2
  })

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>
      <GlassTorus
        position={[0, 1.5, 0]}
        rotation={[0.3, 0.5, 0]}
        args={[1.2, 0.35, 180, 24]}
        color="#ff6b9d"
      />
      <GlassTorus
        position={[-2.8, 0.8, 1.5]}
        rotation={[0.8, 1.2, 0.5]}
        args={[0.7, 0.2, 100, 16]}
        color="#ffd166"
        scale={0.9}
      />
      <GlassTorus
        position={[2.6, 1.0, -2.0]}
        rotation={[1.5, 0, 0.8]}
        args={[0.6, 0.25, 80, 12]}
        color="#f472b6"
        scale={0.85}
      />

      <OrbitingRing radius={2.0} color="#ff6b9d" speed={0.8} />
      <OrbitingRing radius={2.8} color="#ffd166" speed={1.2} tilt={0.3} />
      <OrbitingRing radius={3.5} color="#f472b6" speed={0.6} tilt={-0.2} />

      {orbs.map((o, i) => (
        <FloatingOrb key={i} {...o} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#1a0a1e"
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
