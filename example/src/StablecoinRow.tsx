import React from 'react'
import { TerraAsset } from '@react-terra/hooks'

export const StablecoinRow = ({
                                terraSymbol,
                                denomToUSTExchangeRate,
                                amount,
                                formattedAmount,
                                img
                              }: TerraAsset) => (
  <li
    style={{
      flexGrow: 1,
      display: 'flex',
      padding: '0.5em 0'
      //...(amount < 0.005 && { opacity: 0.6 })
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <img width={40} src={img} alt={`${terraSymbol} stablecoin`} />
      <label
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          fontSize: 'smaller',
          fontWeight: 600
        }}
      >
        {terraSymbol}
      </label>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 'large',
        paddingLeft: '0.5em'
      }}
    >
      {formattedAmount}
    </div>
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: 'small',
        opacity: 0.6
      }}
    >
      ≈{denomToUSTExchangeRate * amount} UST
    </div>
  </li>
)

