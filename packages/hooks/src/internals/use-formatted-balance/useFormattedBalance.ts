import { useNumberFormatter } from './useNumberFormatter'

export const useFormattedBalance = ({
  value = 0,
  currency
}: {
  value: number
  currency: string
}) => useNumberFormatter({ currency }).format(value)
