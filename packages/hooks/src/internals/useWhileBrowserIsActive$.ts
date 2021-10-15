import { useObservable } from 'observable-hooks'
import {
  debounceTime,
  fromEvent,
  partition,
  pipe,
  repeatWhen,
  shareReplay,
  takeUntil
} from 'rxjs'

/**
 * The primary use-case for monitoring the browser's active state is to
 * determine whether polling of the Terra blockchain should occur (i.e. we
 * obviously want to stop network requests and save resources if the browser is
 * inactive).
 */
export const useWhileBrowserIsActive$ = () => {
  const visibilityChange$ = useObservable(() =>
    fromEvent(document, 'visibilitychange').pipe(
      // Throttle the event in cases where the user might be frequently
      // toggling between windows.
      debounceTime(1000),
      shareReplay({ refCount: true, bufferSize: 1 })
    )
  )
  const [browserActive$, browserInactive$] = useObservable(() =>
    partition(visibilityChange$, () => document.visibilityState === 'visible')
  )

  return useObservable(() =>
    pipe(
      takeUntil(browserInactive$),
      repeatWhen(() => browserActive$)
    )
  )
}
