import { JSONMap } from '@webreflection/json-map'
import { parse } from 'flatted'
import { LOCAL_STORAGE_BALANCES_KEY } from './constants'
import { mapDenomDataToBalances } from './mapDenomDataToBalances'

const localStorageBalancesKey = localStorage.getItem(LOCAL_STORAGE_BALANCES_KEY)

export const tryCache = () => localStorageBalancesKey
  ? new JSONMap(parse(localStorageBalancesKey!))
  : mapDenomDataToBalances(true)
