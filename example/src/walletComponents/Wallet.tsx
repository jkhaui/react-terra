import React from 'react'
import { TerraAsset, useLiveBalances, useTerraStore } from '@react-terra/hooks'
import { Stablecoin } from './Stablecoin'

const truncate = (text = '', [h, t] = [6, 6]) => {
  const head = text.slice(0, h)
  const tail = text.slice(-1 * t, text.length)
  return text.length > h + t ? [head, tail].join('...') : text
}

export const Wallet = () => {
  const terraStore = useTerraStore()

  const liveBalances = useLiveBalances({
    showLuna: false
  })

  return (
    <div className='Wallet'>
      <div className='WalletAddress-wrapper'>
        <code className='WalletAddress'>
          {truncate(terraStore.walletAddress)}
        </code>
      </div>
      <ul
        className='flex flex-col'
        style={{
          alignItems: 'stretch',
          width: 268,
          listStyle: 'none'
        }}
      >
        {liveBalances.map(
          ({
             terraSymbol,
             currencySymbol,
             denomToUSTExchangeRate,
             formattedAmount,
             amount,
             img
           }: TerraAsset) => (
            <Stablecoin
              key={terraSymbol}
              currencySymbol={currencySymbol}
              terraSymbol={terraSymbol}
              amount={amount}
              formattedAmount={formattedAmount}
              denomToUSTExchangeRate={denomToUSTExchangeRate}
              img={img}
            />
          )
        )}
      </ul>
    </div>
  )
}
