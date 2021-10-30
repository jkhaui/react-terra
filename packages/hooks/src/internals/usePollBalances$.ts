import { useObservable } from 'observable-hooks'
import { BehaviorSubject, from, of, switchMap, timer, zip } from 'rxjs'
import {
  ConnectedWallet,
  ConnectType,
  WalletStatus
} from '@terra-money/wallet-provider'
import { Coins, LCDClient } from '@terra-money/terra.js'
import { Pagination } from '@terra-money/terra.js/dist/client/lcd/APIRequester'
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
import { ICoin, LiveBalanceOptions, TerraAsset } from '../types'
import { useResetStore } from '../shared/use-terra-store/useResetStore'
import { isIframe } from '../utils/isIframe'

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
      switchMap(([coins, connectionStatus]: [TerraAsset[], WalletStatus]) =>
        connectionStatus !== WalletStatus.WALLET_NOT_CONNECTED
          // Combine a stream of balances from Terra stablecoin
          // denominations, LUNA, and custom CW20 tokens with a stream of
          // the latest exchanges rates (provided by validator oracles) from
          // the LCD client.

          // Note that one of these conditions must have been met to reach
          // this stage:
          // 1) this is the initial load
          // 2) a change in denom balances has been detected
          // 3) the browser has returned to an active state after being inactive
          ? zip(
            from(coins).pipe(
              // The combined balances and exchange rates streams may be of
              // different lengths if a wallet does not have all the
              // denominations returned by the LCD exchange rates API.

              // Therefore, it is necessary to repeat the shorter stream
              // when merging the streams to prevent the combined observable
              // stream from prematurely terminating.
              repeatWhen(() => exchangeRates$)
            ),
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
      // Due to the unpredictable nature of browser events and latency from
      // network requests, observables may emit more frequently than desired.
      // Debouncing emissions can guard against unintended performance
      // degradation.
      // However, even frequent emissions should not redraw React's state
      // tree and is thus unlikely to compromise performance.
      debounceTime(500),
      switchMap(({ balances }: { balances: Map<string, TerraAsset> }) => {
        // Client applications can pass callbacks here to execute UI-related
        // side-effects (e.g. showing a toast notification if a user's
        // balance changes.
        if (isInitialFetch$.getValue()) {
          isInitialFetch$.next(false)
          if (cw20TokenList) {
            // noop
            // TODO
          }
          if (onBalanceChange && typeof onBalanceChange() === 'function') {
            // TODO: pass in args for the denomination whose balance has
            //  changed and its previous and current amounts.
            onBalanceChange()
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
