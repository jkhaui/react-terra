import { useObservable } from 'observable-hooks'
import { fromEvent, map, merge, of } from 'rxjs'

export const useIsOnline$ = () =>
  useObservable(() =>
    merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine))
  )
