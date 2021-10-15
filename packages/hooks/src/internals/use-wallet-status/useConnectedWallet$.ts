import { pluckFirst, useObservable } from 'observable-hooks'
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { shareReplay } from 'rxjs/operators'

export const useConnectedWallet$ = () => {
  const connectedWallet = useConnectedWallet()

  const connectionStatus$ = useObservable(pluckFirst, [connectedWallet])

  return useObservable(() =>
    connectionStatus$.pipe(
      // Make the connection status a multicast observable so other
      // hooks/components can subscribe to its state.
      shareReplay({ bufferSize: 1, refCount: true })
    )
  )
}
