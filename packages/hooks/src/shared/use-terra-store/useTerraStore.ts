import {
  pluckFirst,
  useObservable,
  useObservableEagerState
} from 'observable-hooks'
import { state$, TerraState, TerraStore } from './terra-store'
import { Selectors } from '../../internals/terra-store-internal'

const terraSelector: Selectors<TerraState> = {
  connectionInfo: (state: TerraState) => state.terra,
  balances: ({ balances }: TerraState) => balances,
  ustToLunaExchangeRate: ({ ustToLunaExchangeRate }: TerraState) =>
    ustToLunaExchangeRate
}
export const useTerraStore = (selector?: TerraStore) => {
  // All outer observables should be wrapped in the `useObservable` helper
  // hook to avoid unnecessary emissions.
  const store$ = useObservable(() => state$)
  const state = useObservableEagerState(store$)

  switch (selector) {
    case TerraStore.Terra:
      // @ts-ignore
      return terraSelector.connectionInfo(state)
    case TerraStore.Balances:
      // @ts-ignore
      return terraSelector.balances(state)
    case TerraStore.USTToLunaExchangeRate:
      // @ts-ignore
      return terraSelector.ustToLunaExchangeRate(state)
    default:
      return state
  }
}

export const useTerra$ = () => {
  const lcd = useTerraStore(TerraStore.Terra)

  return useObservable(pluckFirst, [lcd])
}
