import { FC } from 'react'

import { Cloud } from '@react-three/drei'
import { Canvas } from 'react-three-fiber'

import CityScene from 'src/components/Canvas/CityScene'
import Fog from 'src/components/Canvas/Fog'

export const Home: FC = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 22, 0], fov: 12 }}>
        <color args={[0xf02050]} attach="background" />
        <Cloud opacity={0.06} position={[0, 10, 0]} segments={20} />
        <Fog />
        <directionalLight
          castShadow
          intensity={5}
          position={[5, 30, -5]}
          shadow-bias={-0.0005} // Убирает артефакты
          shadow-mapSize={[1024, 1024]} // Увеличенная детализация теней
        />
        <CityScene />
      </Canvas>
    </>
  )
}

export default Home
