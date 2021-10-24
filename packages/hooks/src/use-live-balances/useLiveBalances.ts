import { useObservableState } from 'observable-hooks'
import { usePollBalances$ } from '../internals/usePollBalances$'
import { LiveBalanceOptions, TerraAsset } from '../types'
import { TERRA_BLOCK_TIME } from '../utils/constants'
import { sortBalancesByUSTValue } from '../utils/balance-helpers'
import { initialState } from '../shared/use-terra-store/terra-store'

export const useLiveBalances=(options: LiveBalanceOptions) => {
  const latestBalances$ = usePollBalances$({
    ...{
      showLuna: false,
      disableCaching: false,
      // TODO: Create type for strings of whitelisted CW20 tokens
      showTokenList: [],
      refetchInterval: TERRA_BLOCK_TIME
    },
    ...options
  })

  return useObservableState(
    // N.b. Do NOT pipe any operators here or it will cause unnecessary
    // emissions.
    latestBalances$,
    sortBalancesByUSTValue(Array.from(initialState.balances.values()))
  ) as TerraAsset[]
}
