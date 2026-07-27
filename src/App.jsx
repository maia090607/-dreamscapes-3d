import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { LanguageProvider } from './context/LanguageContext'
import Experience from './components/Experience'

export default function App() {
  return (
    <LanguageProvider>
      <Canvas
        camera={{ fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: 4,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ position: 'fixed', inset: 0 }}
      >
        <ScrollControls pages={8} damping={0.25}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </LanguageProvider>
  )
}
