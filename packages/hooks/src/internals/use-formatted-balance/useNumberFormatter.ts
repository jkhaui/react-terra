import { NumberFormatOptions, NumberFormatter } from '@internationalized/number'
import { useMemo } from 'react'

export function useNumberFormatter(
  options: NumberFormatOptions
): Intl.NumberFormat {
  const currencyOptions = useMemo(
    () => ({ ...options, minimumFractionDigits: 2, style: 'currency' }),
    [options]
  )
  const locale = 'en-US'

  return useMemo(
    () =>
      new NumberFormatter(locale, {
        currency,
        minimumFractionDigits: 2,
        style: 'currency'
      }),
    [locale, currency]
  )
}
