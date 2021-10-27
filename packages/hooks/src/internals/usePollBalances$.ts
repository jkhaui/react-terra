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
  debounceTime,
  distinctUntilChanged,
  repeatWhen,
  scan,
  shareReplay,
  switchMapTo,
  withLatestFrom
} from 'rxjs/operators'
import { deepEqual } from 'fast-equals'
import { useConnectionStatus$ } from './use-wallet-status/useConnectionStatus$'
import { useWhileBrowserIsActive$ } from './useWhileBrowserIsActive$'
import { useWalletStatus$ } from './use-wallet-status/useWalletStatus$'
import { sortBalancesByUSTValue } from '../utils/balance-helpers'
import { catchErrorGracefully } from '../utils/rx-helpers'
import { useExchangeRates$ } from './useExchangeRates$'
import { useCache } from './useCache'
import {
  BalancesAction,
  dispatch,
  state$
} from '../shared/use-terra-store/terra-store'
import { ICoin, LiveBalanceOptions } from '../types'
import { useResetStore } from '../shared/use-terra-store/useResetStore'
import { isIframe } from '../utils/isIframe'
import { Pagination } from '@terra-money/terra.js/dist/client/lcd/APIRequester'

enableMapSet()

export const usePollBalances$ = ({
                                   showLuna,
                                   disableCaching,
                                   cw20TokenList,
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
  const { handleCacheState } = useCache()

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
                  .then((res: [Coins, Pagination]) => res[0].toData())
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
      distinctUntilChanged((prev: any[], current: any[]) =>
        deepEqual(prev, current)
      ),
      catchErrorGracefully,
      // whileUserIsActive,
      whileBrowserIsActive,
      shareReplay({ bufferSize: 1, refCount: true })
    )
  )

  return useObservable(() =>
    pollBalances$.pipe(
      debounceTime(50),
      switchMap(({ balances }: any) => {
        if (isInitialFetch$.getValue()) {
          isInitialFetch$.next(false)
          if (cw20TokenList) {
            // noop
            // TODO
          }
          if (onBalanceChange) {
            // noop
            // TODO
          }
        }

        if (!isIframe() && !disableCaching) {
          handleCacheState(balances)
        }

        return of(sortBalancesByUSTValue(Array.from(balances.values())))
      })
    )
  )
}
