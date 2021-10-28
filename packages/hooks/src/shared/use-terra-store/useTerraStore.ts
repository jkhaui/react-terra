import { pluckFirst, useObservable, useObservableState } from 'observable-hooks'
import { initialState, state$, TerraState, TerraStore } from './terra-store'
import { Selectors } from '../../internals/terra-store-internal'

const terraSelector: Selectors<TerraState> = {
  connectionInfo: (state: TerraState) => state.terra,
  balances: ({ balances }: TerraState) => balances,
  chainState: ({ chainState }: TerraState) => chainState
}

export const useTerraStore = (selector?: TerraStore) => {
  // All outer observables should be wrapped in the `useObservable` helper
  // hook to avoid unnecessary emissions.
  const store$ = useObservable(() => state$)
  const state = useObservableState(store$, initialState)

  switch (selector) {
    case TerraStore.Terra:
      // @ts-ignore
      return terraSelector.connectionInfo(state)
    case TerraStore.Balances:
      // @ts-ignore
      return terraSelector.balances(state)
    case TerraStore.ChainState:
      // @ts-ignore
      return terraSelector.chainState(state)
    default:
      return state
  }
}

export const useTerra$ = () => {
  const lcd = useTerraStore(TerraStore.Terra)

  return useObservable(pluckFirst, [lcd])
}
