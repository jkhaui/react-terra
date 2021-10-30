import { useTerra$ } from '../shared/use-terra-store/useTerraStore'
import { useObservable } from 'observable-hooks'
import { filter, tap } from 'rxjs/operators'
import { LCDClient } from '@terra-money/terra.js'
import { Denom } from '../types'
import {
  ChainStateAction,
  dispatch
} from '../shared/use-terra-store/terra-store'

export const useGasPrice = () => {
  const terra$ = useTerra$()

  return useObservable(() =>
    terra$.pipe(
      filter((terra: LCDClient | undefined) => terra !== undefined),
      tap((terra: LCDClient) => dispatch(
        ChainStateAction.Update,
        terra.config.gasPrices![Denom.LUNA]
      ))
    )
  )
}
