import { FC } from 'react'

const Grid: FC = () => {
  const size = 40
  const divisions = 40
  const spacing = size / divisions
  const lineWidth = 0.005

  const lines = []

  // X
  for (let i = -size / 2; i <= size / 2; i += spacing) {
    lines.push(
      <mesh key={`h-${i}`} position={[0, 0, i]}>
        <boxGeometry args={[size, lineWidth, lineWidth]} />
        <meshStandardMaterial color="#3a3637" />
      </mesh>
    )
  }

  // Z
  for (let i = -size / 2; i <= size / 2; i += spacing) {
    lines.push(
      <mesh key={`v-${i}`} receiveShadow position={[i, 0, 0]}>
        <boxGeometry args={[lineWidth, lineWidth, size]} />
        <meshStandardMaterial color="#3a3637" />
      </mesh>
    )
  }

  // Red X
  lines.push(
    <mesh key="red-x" receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[size, lineWidth * 3, lineWidth * 3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
  // Red Z
  lines.push(
    <mesh key="red-z" receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[lineWidth * 3, lineWidth * 3, size]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )

  lines.push(
    <mesh key="grid-background" receiveShadow position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial color="black" metalness={0.4} roughness={0.6} />
    </mesh>
  )

  return <group position={[0, -0.01, 0]}>{lines}</group>
}
export default Grid
