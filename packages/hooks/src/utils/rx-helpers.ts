import {
  catchError,
  finalize,
  mergeMap,
  of,
  pipe,
  tap,
  throwError,
  timer
} from 'rxjs'
import {
  dispatch,
  initialState
} from '../shared/use-terra-store/terra-store'

export const catchErrorGracefully = catchError((error: string) => {
  console.log(error)

  return of(initialState)
})

// TODO
export const dispatchAction = <T>(
  action: any,
  payload?: any
  // @ts-ignore
): MonoTypeOperatorFunction<T> => pipe(tap(dispatch(action, payload)))

/**
 * Credit to https://gist.github.com/tanem/011a950b93a89e43cfc335f617dbb230
 */
export const genericRetryStrategy =
  ({ maxRetryAttempts = 3, scalingDuration = 5000 } = {}) =>
  (errors: { pipe: (arg0: any, arg1: any) => any }) =>
    errors.pipe(
      mergeMap((error: any, index: number) => {
        const retryAttempt = index + 1
        if (retryAttempt > maxRetryAttempts) {
          return throwError(error)
        }
        console.log(
          `Attempt ${retryAttempt}: Retrying in ${
            retryAttempt * scalingDuration
          }ms`
        )
        return timer(retryAttempt * scalingDuration)
      }),
      finalize(() => console.log("Couldn't query the chain state."))
    )
