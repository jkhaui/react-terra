import { useCallback } from 'react'
import { stringify } from 'flatted'

import createPersistedState from './use-persisted-state'
import { LOCAL_STORAGE_BALANCES_KEY } from '../utils/constants'
import { initialCacheState } from './cache'

const useBalancesState = createPersistedState(LOCAL_STORAGE_BALANCES_KEY)

export const useCache = () => {
  const [cacheState, setCacheState] = useBalancesState(initialCacheState)

  return {
    cacheState,
    handleCacheState: useCallback((state: any) => {
      if (state) {
        setCacheState(stringify(Array.from(state)))
      }
    }, [])
  }
}
