// @ts-nocheck

import { useObservable } from 'observable-hooks'
import { BehaviorSubject, from, of, switchMap, timer, zip } from 'rxjs'
import {
  ConnectedWallet,
  ConnectType,
  WalletStatus
} from '@terra-money/wallet-provider'
import { Coins, LCDClient } from '@terra-money/terra.js'
import { enableMapSet } from 'immer'
import {
  distinctUntilChanged,
  repeatWhen,
  retryWhen,
  scan,
  shareReplay,
  startWith,
  switchMapTo, throttleTime,
  withLatestFrom
} from 'rxjs/operators'
import { deepEqual } from 'fast-equals'
import { useConnectionStatus$ } from './use-wallet-status/useConnectionStatus$'
import { useWhileBrowserIsActive$ } from './useWhileBrowserIsActive$'
import { useWalletStatus$ } from './use-wallet-status/useWalletStatus$'
import { sortBalancesByUSTValue } from '../utils/balance-helpers'
import { catchErrorGracefully, genericRetryStrategy } from '../utils/rx-helpers'
import { useExchangeRates$ } from './useExchangeRates$'
// import { useCache } from './useCache'
import {
  BalancesAction,
  dispatch,
  initialState,
  state$
} from '../shared/use-terra-store/terra-store'
import { ICoin, LiveBalanceOptions } from '../types'
import { useResetStore } from '../shared/use-terra-store/useResetStore'

enableMapSet()

export const usePollBalances$ = ({
  showLuna,
  showTokenList,
  refetchInterval,
  onBalanceChange
}: LiveBalanceOptions) => {
  const store$ = useObservable(() => state$)

  const exchangeRates$ = useExchangeRates$(showLuna)
  const walletStatus$ = useWalletStatus$()
  const connectionStatus$ = useConnectionStatus$()
  // const whileUserIsActive = useWhileUserIsActive$()
  const whileBrowserIsActive = useWhileBrowserIsActive$()
  const resetStore$ = useResetStore()
  // const { handleCacheState } = useCache()

  const isInitialFetch$ = useObservable(() => new BehaviorSubject(false))

  const pollBalances$ = useObservable(() =>
    walletStatus$.pipe(
      switchMap(
        ([_, connectedWallet, terra]: [
          ConnectType,
          ConnectedWallet,
          LCDClient
        ]) =>
          timer(0, refetchInterval).pipe(
            switchMap(() =>
              from(
                terra.bank
                  .balance(connectedWallet.walletAddress)
                  .then((coins: Coins) => coins.toData())
              ).pipe(
                retryWhen(
                  genericRetryStrategy({
                    maxRetryAttempts: 3,
                    scalingDuration: refetchInterval
                  })
                )
              )
            )
          )
      ),
      // Re-subscribe to the connection status so we can react to user
      // actions (i.e. connecting/disconnecting their wallet).
      withLatestFrom(connectionStatus$),
      distinctUntilChanged((prev: any[], current: any[]) =>
        deepEqual(prev, current)
      ),
      switchMap(([coins, connectionStatus]: any) =>
        connectionStatus !== WalletStatus.WALLET_NOT_CONNECTED
          ? zip(
              from(coins).pipe(repeatWhen(() => exchangeRates$)),
              exchangeRates$
            ).pipe(
              scan(
                (
                  _acc: any[],
                  [
                    { denom: denomBalance, amount: amountBalance },
                    { denom: denomExchangeRate, amount: amountExchangeRate }
                  ]: ICoin[]
                ) =>
                  dispatch(BalancesAction.Update, {
                    denomBalance,
                    amountBalance,
                    denomExchangeRate,
                    amountExchangeRate,

                    showLuna
                  })
              )
            )
          : resetStore$()
      ),
      switchMapTo(store$),
      catchErrorGracefully,
      // whileUserIsActive,
      whileBrowserIsActive,
      distinctUntilChanged((prev: any[], current: any[]) =>
        deepEqual(prev, current)
      ),
      startWith(initialState),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  )

  return useObservable(() =>
    pollBalances$.pipe(
      throttleTime(520),
      switchMap(({ balances }: any) => {
console.log(balances)
        if (isInitialFetch$.getValue()) {
          isInitialFetch$.next(false)
          if (showTokenList) {
            // noop
            // TODO
          }
          if (onBalanceChange) {
            // noop
            // TODO
          }
        }

        // handleCacheState(balances)

        return of(sortBalancesByUSTValue([...balances.values()]))
      })
    )
  )
}