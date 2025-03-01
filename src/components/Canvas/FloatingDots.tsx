import { FC, useRef } from 'react'

import { useFrame } from 'react-three-fiber'

const FloatingDots: FC<any> = ({ n, y, c }) => {
  const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num
  const dotsRef = useRef(null)

  useFrame(() => {
    if (dotsRef.current) {
      dotsRef.current.children.forEach((dot: any) => {
        dot.position.x += dot.userData.speedX
        dot.position.y += dot.userData.speedY
        dot.position.z += dot.userData.speedZ
        if (dot.position.x > 10 || dot.position.x < -10) dot.position.x = mathRandom(8)
        if (dot.position.y > 5 || dot.position.y < 0) dot.position.y = Math.random() * 5
        if (dot.position.z > 10 || dot.position.z < -10) dot.position.z = mathRandom(8)
      })
    }
  })

  return (
    <group ref={dotsRef}>
      {[...Array(n)].map((_, i) => {
        const posX = mathRandom(8)
        const posY = y || mathRandom(8)
        const posZ = mathRandom(8)
        const speedX = (Math.random() - 0.5) * 0.1
        const speedY = y ? 0 : (Math.random() - 0.5) * 0.1
        const speedZ = (Math.random() - 0.5) * 0.1

        return (
          <mesh key={i} receiveShadow position={[posX, posY, posZ]} userData={{ speedX, speedY, speedZ }}>
            <sphereGeometry args={[0.01, 6, 6]} />
            <meshBasicMaterial transparent color={c ? `0x${c}` : Math.random() > 0.5 ? 0xff0008 : 0xffff00} opacity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

export default FloatingDots
