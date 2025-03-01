import { useEffect, useRef } from 'react'

import { CameraControls } from '@react-three/drei'
import { useFrame } from 'react-three-fiber'

const CustomCameraControls = () => {
  const cameraControlsRef = useRef<CameraControls | null>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const uSpeed = 0.0005

  useEffect(() => {
    const controls = cameraControlsRef.current
    controls.mouseButtons.left = 0
    controls.mouseButtons.right = 0

    const handleMouseMove = (event: any) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    const controls = cameraControlsRef.current
    if (!controls) return

    const targetAzimuth = controls.azimuthAngle + mouse.current.x * uSpeed * 4
    let targetPolar = controls.polarAngle - mouse.current.y * uSpeed * 4
    targetPolar = Math.max(Math.PI / 60, Math.min(Math.PI / 2.5, targetPolar))
    controls.azimuthAngle = targetAzimuth
    controls.polarAngle = targetPolar
  })

  return <CameraControls ref={cameraControlsRef} enabled distance={22} maxDistance={22} maxPolarAngle={Math.PI / 2.5} minDistance={22} minPolarAngle={Math.PI / 60} smoothTime={0.5} />
}

export default CustomCameraControls
