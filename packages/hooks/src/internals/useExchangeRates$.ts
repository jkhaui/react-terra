import { useState } from 'react'
import { useObservable } from 'observable-hooks'
import {
  shareReplay,
  skipWhile,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'
import { defer, from, iif } from 'rxjs'
import { Coin, LCDClient } from '@terra-money/terra.js'
import { useTerra$ } from '../shared/use-terra-store/useTerraStore'
import {
  ChainStateAction,
  dispatch
} from '../shared/use-terra-store/terra-store'
import { Denom, ICoin } from '../types'
import { logWithDebugger, withStatefulEffect } from '../utils/rx-helpers'
import { useDebouncedEffect } from './useDebouncedEffect'

export const useExchangeRates$ = (showLuna: boolean) => {
  const terra$ = useTerra$()

  const [fetching, setFetching] = useState(false)
  const [exchangeRates, setExchangeRates] = useState([])

  useDebouncedEffect(() => {
    if (fetching) {
      setFetching(false)
    }
  }, [fetching], 1000)

  return useObservable((inputs$) =>
    terra$.pipe(
      skipWhile((terra: LCDClient | undefined) => terra === undefined),
      // Certain conditions can cause multiple emissions to occur, triggering
      // excessive network requests to the oracle API.
      // Setting a boolean flag allows for control and short-circuiting of
      // this unwanted behaviour.
      withStatefulEffect(setFetching, true),
      withLatestFrom(inputs$),
      switchMap(
        ([terra, [fetchingState, exchangeRatesState]]:
           [LCDClient, [boolean, Coin[]]]
        ) =>
          iif(
            () => !fetchingState,
            defer(() => from(terra.oracle.exchangeRates()
              .then((coins) => coins.toData()))).pipe(
              withStatefulEffect(setExchangeRates),
              tap((coins: ICoin[]) =>
                coins.find(
                  ({ denom, amount }) =>
                    denom === Denom.USD &&
                    dispatch(ChainStateAction.Update, {
                      ustToLunaExchangeRate: {
                        amount: parseFloat(amount),
                        showLuna
                      }
                    })
                )
              ),
              logWithDebugger('Exchange rates'),
              // Stream in exchange rates for each coin denomination.
              switchMap((coins) => from(coins)),
              shareReplay({ bufferSize: 1, refCount: true })
            ),
            from(exchangeRatesState)
          )
      )
    ), [fetching, exchangeRates])
}
