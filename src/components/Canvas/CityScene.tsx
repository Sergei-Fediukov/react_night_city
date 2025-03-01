import Building from './Building'
import CustomCameraControls from './CustomCameraControls'
import FloatingDots from './FloatingDots'
import Grid from './Grid'
import MovingLines from './MovingLines'

const CityScene = () => {
  return (
    <group>
      {[...Array(70)].map((_, i) => (
        <Building key={i} />
      ))}
      <Grid />
      <MovingLines />
      <MovingLines n={40} />
      <MovingLines c="ffffff" n={80} y={0.1} />
      <FloatingDots n={80} />
      <FloatingDots c="ffffff" n={200} y={0.1} />
      <CustomCameraControls />
    </group>
  )
}

export default CityScene
