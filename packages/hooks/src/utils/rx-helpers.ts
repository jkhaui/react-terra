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
import { dispatch, initialState } from '../shared/use-terra-store/terra-store'
import { TERRA_BLOCK_TIME } from './constants'
import { Dispatch, SetStateAction } from 'react'

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
 * Log the current observable value with an optional label.
 *
 * ```
 * logWithDebugger('My label')
 * ```
 */
export const logWithDebugger = <T>(
  label: string = ''
  // @ts-ignore
): MonoTypeOperatorFunction<T> => pipe(tap((value: any) => console.log(
  value,
  label
)))

/**
 * A convenient helper to safely trigger React state updates within an
 * observable pipeline.
 *
 * ```
 * withStatefulEffect(setExchangeRates)
 * withStatefulEffect(setIsFetching, true)
 * ```
 */
export const withStatefulEffect = <S>(
  setState: Dispatch<SetStateAction<S | undefined>>,
  state?: S | (() => S)
  // @ts-ignore
): MonoTypeOperatorFunction<S> => pipe(!state
  ? tap(setState)
  : tap(() => setState(state)))

/**
 * Credit to https://gist.github.com/tanem/011a950b93a89e43cfc335f617dbb230
 */
export const genericRetryStrategy =
  ({ maxRetryAttempts = 3, scalingDuration = TERRA_BLOCK_TIME } = {}) =>
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
        finalize(() => console.log('Couldn\'t query the Terra blockchain.'
          + ' Please check your connection.'))
      )
