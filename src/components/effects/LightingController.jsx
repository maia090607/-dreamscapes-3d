import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PALETTES } from '../../utils/constants'

export default function LightingController({ scroll }) {
  const ambientRef = useRef()
  const dirRef = useRef()

  useFrame(() => {
    const t = scroll.offset
    if (!ambientRef.current) return

    let palette
    if (t < 0.16) palette = PALETTES.dreamscape
    else if (t < 0.56) palette = PALETTES.neon
    else palette = PALETTES.cosmic

    ambientRef.current.color.set(palette.ambient)
    dirRef.current.color.set(palette.directional)
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} />
      <directionalLight ref={dirRef} position={[5, 10, 5]} intensity={1.2} />
      <hemisphereLight args={['#ff6b9d', '#1a0a2e', 0.4]} />
    </>
  )
}
