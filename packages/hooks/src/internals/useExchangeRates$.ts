// @ts-nocheck
import { useObservable } from 'observable-hooks'
import {
  finalize,
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
import { useEffect, useState } from 'react'

export const useExchangeRates$ = (showLuna: boolean) => {
  const terra$ = useTerra$()
  const [isFetching, setIsFetching] = useState(false)
  const [exchangeRates, setExchangeRates] = useState([])
useEffect(()=>{
console.log('$$$$$')
  console.log(exchangeRates)
  console.log(isFetching)
  console.log('$$$$$')
},[isFetching, exchangeRates])
  return useObservable((inputs$) =>
    terra$.pipe(
      skipWhile((terra: LCDClient | undefined) => terra === undefined),
      withStatefulEffect(setIsFetching, true),
      withLatestFrom(inputs$),
      logWithDebugger('xyz'),
      switchMap(([terra, [fetchingState, cachedExchangeRates]]: [LCDClient, [boolean, Coin[]]]) =>
        iif(
          () => !fetchingState,
          defer(() => from(terra.oracle.exchangeRates()
            .then((coins) => coins.toData()))).pipe(
            tap(() => console.log(fetchingState, 'fetchingState')),
            withStatefulEffect(setExchangeRates),
logWithDebugger('it works'),
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
            // Stream in exchange rates from the denomination coins
            switchMap((coins) => from(coins)),
            finalize(() => console.log('DONE')),
            shareReplay({ bufferSize: 1, refCount: true })
          ),
          from(cachedExchangeRates)
        ))
    ), [isFetching, exchangeRates])
}
