import { useCallback } from 'react'
import { of } from 'rxjs'
import {
  ConnectionDataAction,
  dispatch,
  initialState,
  BalancesAction,
  USTToLunaExchangeRateAction
} from './terra-store'

export const useResetStore = () =>
  useCallback(() => {
    dispatch(BalancesAction.Reset)
    dispatch(USTToLunaExchangeRateAction.Reset)
    dispatch(ConnectionDataAction.Reset)

    return of(initialState)
  }, [])
