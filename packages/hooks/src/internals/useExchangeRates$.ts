import { useObservable } from 'observable-hooks'
import { filter, switchMap, tap } from 'rxjs/operators'
import { from } from 'rxjs'
import { LCDClient } from '@terra-money/terra.js'
import { useTerra$ } from '../shared/use-terra-store/useTerraStore'
import {
  ChainStateAction,
  dispatch
} from '../shared/use-terra-store/terra-store'
import { Denom, ICoin } from '../types'

export const useExchangeRates$ = (showLuna: boolean) => {
  const terra$ = useTerra$()

  return useObservable(() =>
    terra$.pipe(
      filter((terra: LCDClient | undefined) => terra !== undefined),
      switchMap((terra: LCDClient) =>
        // `from` is initially used to convert a promise into an Observable.
        // TODO: investigate duplicate network requests
        from(terra.oracle.exchangeRates().then((coins) => coins.toData())).pipe(
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
          // We then use `from` to stream in Terra asset balances returned by
          // the promise.
          tap(() => console.log(terra)),
          switchMap((coins) => from(coins))
        )
      )
    )
  )
}
