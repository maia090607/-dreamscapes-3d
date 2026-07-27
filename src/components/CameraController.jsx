import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { CAMERA_POINTS, LOOK_POINTS } from '../utils/constants'

export default function CameraController({ scroll }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

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
    camera.position.lerp(pos, 0.1)

    const target = lookPath.getPoint(t)
    camera.lookAt(target)
  })

  return null
}
