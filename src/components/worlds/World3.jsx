import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function StarField() {
  const { count, positions, sizes, colors } = useMemo(() => {
    const c = 2000
    const pos = new Float32Array(c * 3)
    const siz = new Float32Array(c)
    const col = new Float32Array(c * 3)

    for (let i = 0; i < c; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 12 + Math.random() * 25
      pos[i3] = Math.sin(phi) * Math.cos(theta) * r + 26
      pos[i3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.4
      pos[i3 + 2] = Math.cos(phi) * r

      siz[i] = 0.03 + Math.random() * 0.15

      const starColor = new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.5, 0.5 + Math.random() * 0.5)
      col[i3] = starColor.r
      col[i3 + 1] = starColor.g
      col[i3 + 2] = starColor.b
    }

    return { count: c, positions: pos, sizes: siz, colors: col }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function AuroraWave({ position, color, offset, scale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const pos = ref.current.geometry.attributes.position
    const array = pos.array

    for (let i = 0; i < pos.count; i++) {
      const i3 = i * 3
      const x = array[i3]
      const z = array[i3 + 2]
      array[i3 + 1] = (
        Math.sin(x * 0.4 + t * 0.3 + offset) * 0.12
        + Math.sin(z * 0.25 + t * 0.2 + offset) * 0.08
        + Math.sin((x + z) * 0.3 + t * 0.15) * 0.06
      )
    }
    pos.needsUpdate = true
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0.2, 0.1]} position={position} scale={scale}>
      <planeGeometry args={[12, 7, 64, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function OrbitalRing({ radius, color, speed, tilt, phase }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = tilt
    ref.current.rotation.z += 0.005 * speed
  })

  return (
    <mesh ref={ref} position={[26, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.015, 80]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

function InnerGlow() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.08
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <mesh ref={ref} position={[26, 0.5, 0]}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial
        color="#7b2ff7"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function World3({ scroll }) {
  const groupRef = useRef()
  const wireframeRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.03
    groupRef.current.visible = scroll.offset > 0.58

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = Math.sin(t * 0.08) * 0.15
      wireframeRef.current.rotation.z = Math.cos(t * 0.06) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <StarField />
      <InnerGlow />

      <AuroraWave
        position={[26, -1, 0]}
        color="#a855f7"
        offset={0}
        scale={1.2}
      />
      <AuroraWave
        position={[26, -0.8, 0.5]}
        color="#7b2ff7"
        offset={2}
        scale={1.0}
      />
      <AuroraWave
        position={[26, -1.2, -0.5]}
        color="#c084fc"
        offset={4}
        scale={0.9}
      />

      <OrbitalRing radius={2.2} color="#7b2ff7" speed={1} tilt={0.2} />
      <OrbitalRing radius={2.8} color="#a855f7" speed={1.4} tilt={0.8} />
      <OrbitalRing radius={3.5} color="#c084fc" speed={0.7} tilt={-0.3} />
      <OrbitalRing radius={4.2} color="#e0aaff" speed={0.5} tilt={1.1} />

      <group position={[26, 0.5, 0]}>
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.8, 2]} />
          <meshStandardMaterial
            color="#7b2ff7"
            wireframe
            emissive="#7b2ff7"
            emissiveIntensity={0.4}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        <mesh ref={ringRef}>
          <icosahedronGeometry args={[1.0, 0]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </group>
  )
}
