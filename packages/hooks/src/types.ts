export enum Denom {
  LUNA = 'uluna',
  AUD = 'uaud',
  CAD = 'ucad',
  CHF = 'uchf',
  CNY = 'ucny',
  DKK = 'udkk',
  EUR = 'ueur',
  GBP = 'ugbp',
  HKD = 'uhkd',
  IDR = 'uidr',
  INR = 'uinr',
  JPY = 'ujpy',
  KRW = 'ukrw',
  MNT = 'umnt',
  NOK = 'unok',
  PHP = 'uphp',
  SDR = 'usdr',
  SEK = 'usek',
  SGD = 'usgd',
  THB = 'uthb',
  USD = 'uusd'
}

export enum TerraStablecoins {
  AUT = 'AUT',
  CAT = 'CAT',
  CHT = 'CHT',
  CNT = 'CNT',
  DKT = 'DKT',
  EUT = 'EUT',
  GBT = 'GBT',
  HKT = 'HKT',
  IDT = 'IDT',
  INT = 'INT',
  JPT = 'JPT',
  MNT = 'MNT',
  KRT = 'KRT',
  NOT = 'NOT',
  PHT = 'PHT',
  SDT = 'SDT',
  SET = 'SET',
  SGT = 'SGT',
  THT = 'THT',
  UST = 'UST'
}

export enum FiatCurrencies {
  AUD = 'AUD',
  CAD = 'CAD',
  CHF = 'CHF',
  CNY = 'CNY',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  HKD = 'HKD',
  IDR = 'IDR',
  INR = 'INR',
  JPY = 'JPY',
  MNT = 'MNT',
  KRW = 'KRW',
  NOK = 'NOK',
  PHP = 'PHP',
  SDR = 'SDR',
  SEK = 'SEK',
  SGD = 'SGD',
  THB = 'THB',
  USD = 'USD'
}

export enum TerraWebSocketEvent {
  CONNECT = 'connect',
  NEW_BLOCK = 'new_block'
}

export type Luna = 'LUNA'

export interface ICoin {
  denom: Denom
  amount: string
}
export interface TerraAsset {
  terraSymbol: TerraStablecoins | Luna
  currencySymbol: FiatCurrencies | Luna
  img: string
  formattedAmount: string
  amount: number
  denomToUSTExchangeRate: number
}

export interface IOptions {
  onBalanceChange?: (newBalances?: any) => void
}

export interface LiveBalanceOptions {
  showLuna: boolean
  disableCaching?: boolean
  cw20TokenList?: any
  refetchInterval?: number

  onBalanceChange?: (data?: any) => void
}
