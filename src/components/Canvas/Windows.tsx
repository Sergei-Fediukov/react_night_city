import { FC, useEffect, useMemo, useRef } from 'react'

import * as THREE from 'three'

const Windows: FC<any> = ({ buildingHeight }: any) => {
  const windowWidth = 0.025
  const windowHeight = 0.01
  const windowDepth = 0.001
  const count = Math.floor((buildingHeight / 0.08) * 4 * 4 * 0.6)

  const windowGeometry = useMemo(() => new THREE.BoxGeometry(windowWidth, windowHeight, windowDepth), [])
  const windowMaterial = useMemo(() => new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0xffff00), emissiveIntensity: 2 }), [])

  const meshRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (!meshRef.current) return

    const dummy = new THREE.Object3D()
    let index = 0

    const addWindow = (x: number, y: number, z: number, rotationY: number) => {
      if (Math.random() > 0.6 && index < count) {
        dummy.position.set(x, y, z)
        dummy.rotation.y = rotationY
        dummy.updateMatrix()
        meshRef.current!.setMatrixAt(index, dummy.matrix)
        index += 1
      }
    }

    for (let x = -0.4; x <= 0.4; x += 0.2) {
      for (let y = 0; y <= buildingHeight; y += 0.08) {
        addWindow(x, y, 0.51, 0)
        addWindow(x, y, -0.51, 0)
      }
    }

    for (let z = -0.4; z <= 0.4; z += 0.2) {
      for (let y = 0; y <= buildingHeight; y += 0.08) {
        addWindow(-0.51, y, z, Math.PI / 2)
        addWindow(0.51, y, z, Math.PI / 2)
      }
    }

    meshRef.current.count = index
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [buildingHeight, count])

  return count > 0 ? <instancedMesh ref={meshRef} args={[windowGeometry, windowMaterial, count]} /> : null
}

export default Windows
