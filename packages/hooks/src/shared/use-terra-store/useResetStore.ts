import { useCallback } from 'react'
import { of } from 'rxjs'
import {
  ConnectionDataAction,
  dispatch,
  initialState,
  BalancesAction,
  ChainStateAction
} from './terra-store'

export const useResetStore = () =>
  useCallback(() => {
    dispatch(BalancesAction.Reset)
    dispatch(ChainStateAction.Reset)
    dispatch(ConnectionDataAction.Reset)

    return of(initialState)
  }, [])
