// @ts-nocheck
import React from 'react'
import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider'
import ReactDOM from 'react-dom'

import App from './App'
import './styles.css'

getChainOptions().then((chainOptions) =>
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root')
  )
)
