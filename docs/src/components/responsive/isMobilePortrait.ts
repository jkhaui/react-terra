import { useMediaQuery } from 'react-responsive'

export const isMobilePortrait = () => {
  const isMobile = useMediaQuery({ maxWidth: 420 })
  const isOrientationPortrait = useMediaQuery({ orientation: 'portrait' })

  return isMobile && isOrientationPortrait
}
