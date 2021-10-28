import { LCDClient } from '@terra-money/terra.js'
import { ConnectType as TerraConnectType } from '@terra-money/wallet-provider'
import { mapDenomDataToBalances } from '../../utils/mapDenomDataToBalances'
import { LOCAL_STORAGE_BALANCES_KEY } from '../../utils/constants'
import { Actions, Store } from '../../internals/terra-store-internal'
import { Denom, TerraAsset } from '../../types'
import { updateBalance } from '../../utils/balance-helpers'
import { tryCache } from '../../utils/util-fns'

export interface TerraState extends ConnectionData {
  balances: Map<string, TerraAsset>
  walletValueInUST: number

  chainState: ChainState
}

export interface ChainState {
    gasPrice: number
    ustToLunaExchangeRate: number
}

export interface ConnectionData {
  post: any
  sign: any
  terra: LCDClient | undefined
  connectType: TerraConnectType | undefined
  isTestnet: boolean
  walletAddress: string
}

export enum TerraStore {
  Terra = 'terra',
  Balances = 'balances',
  Post = 'post',
  Sign = 'sign',
  ConnectType = 'connectType',
  IsTestnet = 'isTestnet',
  WalletAddress = 'walletAddress',
  WalletValueInUST = 'walletValueInUST',
  ChainState = 'chainState'
}

export const initialState = {
  terra: undefined,
  connectType: undefined,
  post: undefined,
  sign: undefined,
  isTestnet: false,
  walletAddress: '',

  balances: tryCache(),
  walletValueInUST: 0,

  chainState: {
    gasPrice: 0,
    ustToLunaExchangeRate: 0
  }
}

export enum ConnectionDataAction {
  Update = 'connectionData/update',
  Reset = 'connectionData/reset'
}

export enum BalancesAction {
  Update = 'balances/update',
  Reset = 'balances/reset'
}

export enum USTToLunaExchangeRateAction {
  Update = 'ustToLunaExchangeRate/update',
  Reset = 'ustToLunaExchangeRate/reset'
}

export interface ConnectionDataActionPayloads {
  [ConnectionDataAction.Update]: ConnectionData
  [ConnectionDataAction.Reset]: ConnectionData
}

export interface BalancesActionPayloads {
  [BalancesAction.Update]: { [key: string]: string }
  [BalancesAction.Reset]: undefined
}

export interface USTToLunaExchangeRateActionPayloads {
  [USTToLunaExchangeRateAction.Update]: { amount: number; showLuna: boolean }
  [USTToLunaExchangeRateAction.Reset]: undefined
}

const connectionDataActions: Actions<TerraState,
  ConnectionDataAction,
  ConnectionDataActionPayloads> = {
  [ConnectionDataAction.Update]: (payload) => (draftState: TerraState) => {
    for (const [key, value] of Object.entries(payload)) {
      draftState[key] = value
    }

    return draftState
  },
  [ConnectionDataAction.Reset]: () => (draftState: TerraState) => {
    // draftState.terra = undefined
    draftState.connectType = undefined
    draftState.post = undefined
    draftState.sign = undefined
    draftState.isTestnet = false
    draftState.walletAddress = ''

    return draftState
  }
}

const balancesActions: Actions<TerraState,
  BalancesAction,
  BalancesActionPayloads> = {
  [BalancesAction.Update]:
    ({ ...params }) =>
      (draftState: TerraState) => {
        updateBalance(
          { ...params },
          draftState.chainState.ustToLunaExchangeRate,
          draftState.balances
        )

        return draftState
      },
  [BalancesAction.Reset]: () => (draftState: TerraState) => {
    draftState.balances = mapDenomDataToBalances(false)
    localStorage.removeItem(LOCAL_STORAGE_BALANCES_KEY)

    return draftState
  }
}

const ustToLunaExchangeRateActions: Actions<TerraState,
  USTToLunaExchangeRateAction,
  USTToLunaExchangeRateActionPayloads> = {
  [USTToLunaExchangeRateAction.Update]:
    ({ amount, showLuna }) =>
      (draftState: TerraState) => {
        draftState.chainState.ustToLunaExchangeRate = amount
        if (showLuna) {
          const luna = draftState.balances.get(Denom.LUNA)

          if (luna) {
            luna.denomToUSTExchangeRate = amount
          }
        }

        return draftState
      },
  [USTToLunaExchangeRateAction.Reset]: () => (draftState: TerraState) => {
    draftState.chainState.ustToLunaExchangeRate = 0

    return draftState
  }
}

export const { state$, dispatch } = new Store(initialState, {
  ...connectionDataActions,
  ...balancesActions,
  ...ustToLunaExchangeRateActions
  // TODO: fix type defs
} as any)
