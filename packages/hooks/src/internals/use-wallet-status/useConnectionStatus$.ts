import { pluckFirst, useObservable } from 'observable-hooks'
import { useWallet } from '@terra-money/wallet-provider'
import { shareReplay } from 'rxjs'

export const useConnectionStatus$ = () => {
  const { status } = useWallet()

  const connectionStatus$ = useObservable(pluckFirst, [status])

  return useObservable(() => connectionStatus$.pipe(shareReplay()))
}
