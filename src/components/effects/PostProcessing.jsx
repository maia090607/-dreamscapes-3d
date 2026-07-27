import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, ToneMapping } from '@react-three/postprocessing'

export default function PostProcessing({ scroll }) {
  const bloomRef = useRef()

  useFrame(() => {
    if (!bloomRef.current) return
    const t = scroll.offset
    if (t > 0.2 && t < 0.56) {
      bloomRef.current.intensity = 1.5
    } else {
      bloomRef.current.intensity = 0.8
    }
  })

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.85}
        intensity={0.8}
        mipmapBlur
      />
      <ChromaticAberration
        offset={[0.0015, 0.001]}
        radialModulation
        modulationOffset={0.2}
      />
      <ToneMapping mode={2} />
    </EffectComposer>
  )
}
