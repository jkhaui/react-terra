import { useObservableEagerState } from 'observable-hooks'
import { useIsOnline$ } from '../internals/useIsOnline$'

export const useIsOnline = () => {
  const isOnline$ = useIsOnline$()

  return useObservableEagerState(isOnline$)
}
