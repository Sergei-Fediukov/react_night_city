import { FC, useEffect, useRef } from 'react'

import * as THREE from 'three'

import Windows from './Windows'

const Building: FC = () => {
  const meshRef = useRef(null)
  const wireframeRef = useRef(null)
  const baseRef = useRef(null)
  const mathRandom = (num = 8) => -Math.random() * num + Math.random() * num

  useEffect(() => {
    const height = 1 + Math.abs(mathRandom(8))
    const scaleX = 0.9 + mathRandom(0.1)
    const scaleZ = 0.9 + mathRandom(0.1)
    const posX = Math.round(mathRandom(8))
    const posZ = Math.round(mathRandom(8))

    meshRef.current.scale.set(scaleX, height, scaleZ)
    meshRef.current.position.set(posX, height / 2, posZ)

    wireframeRef.current.scale.copy(meshRef.current.scale)
    wireframeRef.current.position.copy(meshRef.current.position)

    baseRef.current.scale.set(scaleX * 1.5, 1, scaleZ * 1.5)
    baseRef.current.position.set(posX, -0.01, posZ)
  }, [])

  return (
    <>
      <mesh ref={baseRef} receiveShadow>
        <boxGeometry args={[1, 0.02, 1]} />
        <meshStandardMaterial toneMapped color="#000000" emissiveIntensity={Math.random() * 2} metalness={0.3} roughness={0.8} />
      </mesh>

      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={0x000000} metalness={0.7} roughness={0.1} emissive={0x727272} emissiveIntensity={Math.random() * 1.5} /> */}
        <meshStandardMaterial toneMapped color={0x000000} emissive={0x151515} emissiveIntensity={Math.random() * 2} metalness={0.7} roughness={0.1} />
        <Windows buildingHeight={0.25} />
      </mesh>

      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} attach="geometry" />
        <lineBasicMaterial attach="material" color={0x5c1b1d} />
      </lineSegments>
    </>
  )
}

export default Building
