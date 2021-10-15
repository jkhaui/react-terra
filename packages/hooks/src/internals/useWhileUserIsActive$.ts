// @ts-nocheck

import { useObservable } from 'observable-hooks'
import { fromEvent, merge, of, pipe } from 'rxjs'
import { repeatWhen, tap, throttleTime, timeout } from 'rxjs/operators'

const events = ['mousedown', 'mousemove', 'scroll', 'wheel', 'touchmove']

const eventStreams = events.map((e: string) =>
  fromEvent(document, e).pipe(throttleTime(500))
)

export const useWhileUserIsActive$ = () => {
  const userIsActive$ = useObservable(() => merge(...eventStreams))

  return useObservable(() =>
    pipe(
      userIsActive$.pipe(
        timeout(
          10000,
          // ignoreElements()
          null,
          of('timed out').pipe(tap(() => console.log('timed out!')))
        ),
        repeatWhen(() => userIsActive$)
      )
    )
  )
}
