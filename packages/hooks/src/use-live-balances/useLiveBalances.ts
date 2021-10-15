import { useObservableEagerState } from 'observable-hooks'
import { usePollBalances$ } from '../internals/usePollBalances$'
import { LiveBalanceOptions, TerraAsset } from '../types'
import { TERRA_BLOCK_TIME } from '../utils/constants'

export const useLiveBalances = (
  options: LiveBalanceOptions = { showLuna: false }
) => {
  const latestBalances$ = usePollBalances$({
    ...{
      showLuna: false,
      showTokenList: [],
      refetchInterval: TERRA_BLOCK_TIME
    },
    ...options
  })

  return useObservableEagerState(latestBalances$) as TerraAsset[]
}
