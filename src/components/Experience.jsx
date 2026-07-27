import { useScroll, Scroll, Environment } from '@react-three/drei'
import CameraController from './CameraController'
import LightingController from './effects/LightingController'
import PostProcessing from './effects/PostProcessing'
import ScrollOverlay from './ScrollOverlay'
import LoadingScreen from './LoadingScreen'
import Particles from './Particles'
import World1 from './worlds/World1'
import World2 from './worlds/World2'
import World3 from './worlds/World3'
import ProjectInfo from './ProjectInfo'

export default function Experience() {
  const scroll = useScroll()

  return (
    <>
      <LoadingScreen />

      <CameraController scroll={scroll} />
      <LightingController scroll={scroll} />
      <PostProcessing scroll={scroll} />

      <World1 scroll={scroll} />
      <World2 scroll={scroll} />
      <World3 scroll={scroll} />

      <Particles scroll={scroll} />

      <Environment preset="night" background blur={0.5} />

      <ScrollOverlay scroll={scroll} />

      <Scroll html>
        <div style={{ height: '600vh' }}>
          <div style={{ height: '500vh' }} />
          <ProjectInfo />
        </div>
      </Scroll>
    </>
  )
}
