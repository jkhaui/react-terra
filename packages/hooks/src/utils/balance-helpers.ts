import { NumberFormatter } from '@internationalized/number'
import { Denom, TerraAsset } from '../types'
import { LUNA_TICKER } from './constants'

export const formatBalance = (
  currency: string,
  value: number,
  locale: string = 'en-US'
) =>
  new NumberFormatter(locale, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency'
  }).format(value)

export const updateBalance = (
  {
    denomBalance,
    amountBalance,
    denomExchangeRate,
    amountExchangeRate,
    showLuna
  }: { [key: string]: string },
  ustToLunaExchangeRate: number,
  balances: Map<string, TerraAsset>
) => {
  const balanceKey = balances.get(denomBalance)
  const balanceAmount = parseInt(amountBalance, 10) / 1000000

  if (balanceKey) {
    if (denomBalance !== Denom.LUNA) {
      balanceKey.formattedAmount = formatBalance(
        balanceKey.currencySymbol,
        balanceAmount
      )
    } else if (showLuna) {
      // TODO: in future, add support for other CW20-compliant tokens on Terra.
      balanceKey.formattedAmount = `${LUNA_TICKER} ${balanceAmount}`
    }
    balanceKey.amount = balanceAmount
  }

  const exchangeRateKey = balances.get(denomExchangeRate)

  if (exchangeRateKey) {
    if (denomExchangeRate === Denom.LUNA) {
      exchangeRateKey.denomToUSTExchangeRate = ustToLunaExchangeRate
      return
    }
    exchangeRateKey.denomToUSTExchangeRate =
      ustToLunaExchangeRate / parseFloat(amountExchangeRate)
  }
}

export const sortBalancesByUSTValue = (balances: TerraAsset[]) =>
  balances.sort((coinA, coinB) =>
    coinA.amount * coinA.denomToUSTExchangeRate <
    coinB.amount * coinB.denomToUSTExchangeRate
      ? 1
      : -1
  )
