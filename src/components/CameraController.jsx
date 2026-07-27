import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'
import { CAMERA_POINTS, LOOK_POINTS } from '../utils/constants'

export default function CameraController({ scroll }) {
  const { camera } = useThree()

  const cameraPath = useMemo(() => {
    const pts = CAMERA_POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  const lookPath = useMemo(() => {
    const pts = LOOK_POINTS.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
    return new THREE.CatmullRomCurve3(pts)
  }, [])

  useFrame((state) => {
    const t = scroll.offset
    const pos = cameraPath.getPoint(t)
    const target = lookPath.getPoint(t)

    if (t > 0.75) {
      const drift = (t - 0.75) / 0.25
      const wave = Math.sin(state.clock.elapsedTime * 0.3) * 0.15 * drift
      const posDrift = pos.clone()
      posDrift.y += wave
      posDrift.x += Math.cos(state.clock.elapsedTime * 0.2) * 0.1 * drift
      camera.position.lerp(posDrift, 0.08)
      const lookDrift = target.clone()
      lookDrift.y += Math.sin(state.clock.elapsedTime * 0.15 + 1) * 0.08 * drift
      camera.lookAt(lookDrift)
    } else {
      camera.position.lerp(pos, 0.1)
      camera.lookAt(target)
    }
  })

  return null
}
