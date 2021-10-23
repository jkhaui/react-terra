import { useMediaQuery } from 'react-responsive'

export const isMobileLandscape = () => {
  const isMobileLandscape = useMediaQuery({ minWidth: 421, maxWidth: 750 })
  const isOrientationLandscape = useMediaQuery({ orientation: 'landscape' })

  return isMobileLandscape && isOrientationLandscape
}
