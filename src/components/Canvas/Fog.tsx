import { FC, useEffect } from 'react'

import { useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

const Fog: FC = () => {
  const { scene, camera } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2(0xf02050, 0.05)
  }, [scene])

  useFrame(() => {
    const camHeight = camera.position.y
    const minFogHeight = 2
    const maxFogHeight = 10

    const factor = 1 - Math.max(0, (camHeight - minFogHeight) / (maxFogHeight - minFogHeight))
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = THREE.MathUtils.lerp(0.02, 0.08, Math.max(factor, 0.3))
    }
  })

  return null
}
export default Fog
