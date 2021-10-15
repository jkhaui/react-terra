import { JSONMap } from '@webreflection/json-map'
import { parse } from 'flatted'
import { LOCAL_STORAGE_BALANCES_KEY } from '../utils/constants'
import { mapDenomDataToBalances } from '../utils/mapDenomDataToBalances'

export const localCacheExists =
  localStorage.getItem(LOCAL_STORAGE_BALANCES_KEY) !== null
export const initialCacheState =
  (localCacheExists &&
    new JSONMap(parse(localStorage.getItem(LOCAL_STORAGE_BALANCES_KEY)!))) ||
  mapDenomDataToBalances()
