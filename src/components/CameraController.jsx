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

    camera.position.lerp(pos, 0.08)
    camera.lookAt(target)
  })

  return null
}
