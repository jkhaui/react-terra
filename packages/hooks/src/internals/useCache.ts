import { useCallback } from 'react'
import { stringify } from 'flatted'

import createPersistedState from './use-persisted-state'
import { LOCAL_STORAGE_BALANCES_KEY } from '../utils/constants'
import { initialCacheState } from './cache'
import { TerraAsset } from '../types'

const useBalancesState = createPersistedState(LOCAL_STORAGE_BALANCES_KEY)

export const useCache = () => {
  const [cacheState, setCacheState] = useBalancesState(initialCacheState)

  return {
    cacheState,
    handleCacheState: useCallback((state: Map<string, TerraAsset>) => {
      if (state) {
        setCacheState(stringify(Array.from(state)))
      }
    }, [])
  }
}
