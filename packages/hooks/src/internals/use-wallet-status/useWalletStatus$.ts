import { useObservable } from 'observable-hooks'
import {
  combineLatestWith,
  distinctUntilChanged,
  filter,
  shareReplay,
  skipWhile,
  tap
} from 'rxjs/operators'
import { WalletInfo, WalletStatus } from '@terra-money/wallet-provider'

import { LCDClient } from '@terra-money/terra.js'
import { deepEqual } from 'fast-equals'
import { useConnectionStatus$ } from './useConnectionStatus$'
import { useConnectedWallet$ } from './useConnectedWallet$'
import {
  ConnectionDataAction,
  dispatch
} from '../../shared/use-terra-store/terra-store'
import { useTerra$ } from '../../shared/use-terra-store/useTerraStore'
import { NETWORK_TESTNET } from '../../utils/constants'

const predicate = (
  connectionStatus: WalletStatus,
  connectedWallet: WalletInfo
) =>
  connectionStatus !== WalletStatus.INITIALIZING &&
  connectedWallet !== undefined

export const useWalletStatus$ = () => {
  const connectionStatus$ = useConnectionStatus$()
  const connectedWallet$ = useConnectedWallet$()
  const terra$ = useTerra$()

  return useObservable(() =>
    connectionStatus$.pipe(
      combineLatestWith(connectedWallet$, terra$),
      // Only emit after a successful connection.
      filter(([connectionStatus, connectedWallet]: any[]) =>
        predicate(connectionStatus, connectedWallet)
      ),
      tap(
        ([
           _,
           {
             network: { name, lcd, chainID },
             walletAddress,
             connectType,
             post,
             sign
           },
           terra
         ]) =>
          // Null-check is essential here otherwise the observable pipeline
          // will be thrown into an infinite loop.
          !terra &&
          dispatch(ConnectionDataAction.Update, {
            terra: new LCDClient({
              chainID,
              URL: lcd
            }),
            post,
            sign,
            isTestnet: name === NETWORK_TESTNET,
            walletAddress,
            connectType
          })
      ),
      skipWhile(([_, __, terra]) => terra === undefined),
      distinctUntilChanged((prev: any[], current: any[]) =>
        deepEqual(prev, current)
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    )
  )
}
