import { FC, useRef } from 'react'

import { useFrame } from 'react-three-fiber'

const MovingLines: FC<any> = ({ n, y, c }) => {
  const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num
  const linesRef = useRef(null)

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.children.forEach((plane: any) => {
        plane.position.x += plane.userData.directionZ * plane.userData.speedFactor
        plane.position.z += plane.userData.directionX * plane.userData.speedFactor

        if (plane.position.x < -10) {
          plane.position.x = 10
          plane.position.z = mathRandom(8)
        }
        if (plane.position.x > 10) {
          plane.position.x = -10
          plane.position.z = mathRandom(8)
        }
        if (plane.position.z < -10) {
          plane.position.z = 10
          plane.position.x = mathRandom(8)
        }
        if (plane.position.z > 10) {
          plane.position.z = -10
          plane.position.x = mathRandom(8)
        }
      })
    }
  })

  return (
    <group ref={linesRef}>
      {[...Array(n)].map((_, i) => {
        const direction = Math.random() > 0.5 ? 'x' : 'z'
        const directionValue = Math.random() > 0.5 ? 1 : -1
        const offset = Math.random() * 20 - 10
        const posY = y || 2 + Math.random() * 5
        const posX = direction === 'x' ? offset : Math.random() * 10
        const posZ = direction === 'z' ? offset : Math.random() * 10
        const speedFactor = 0.06 + Math.random() * 0.15

        return (
          <mesh
            key={i}
            receiveShadow
            position={[posX, posY, posZ]}
            rotation={direction === 'x' ? [0, Math.PI / 2, 0] : [0, 0, 0]}
            userData={{
              directionX: direction === 'x' ? directionValue : 0,
              directionZ: direction === 'z' ? directionValue : 0,
              speedFactor
            }}
          >
            <boxGeometry args={[Math.random() > 0.5 ? 3 : 0.5, 0.02, 0.02]} />
            <meshBasicMaterial transparent color={c ? `0x${c}` : Math.random() > 0.5 ? 0xff0008 : 0xffff00} opacity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}
export default MovingLines
