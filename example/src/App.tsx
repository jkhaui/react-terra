import React from 'react'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import { TerraAsset, useIsOnline, useLiveBalances } from '@react-terra/hooks'

import { StablecoinRow } from './StablecoinRow'
import './index.css'

const App = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect
  } = useWallet()
  // const store = useTerraStore()
  // console.log(store,'store')
  const latestBalances = useLiveBalances()
  // const { connected, error, blockNumber } = useBlockNumber()
  const isOnline = useIsOnline()
  console.log(latestBalances)
  return (
    <>
      <div
        className='status-bar' style={{
        backgroundColor: isOnline ? '#A4F9AC' : '#FCBBBB'
      }}
      >
        Connection status: {isOnline ? '✅' : '❌'}
      </div>
      <div className='container'>
        <div className='flex flex-grow-1 space-between'>
          <div className='block-number'>
            <span>Block height:</span>
            {/*<code>*/}
            {/*  {connected && (*/}
            {/*    (blockNumber &&*/}
            {/*      blockNumber.last_commit &&*/}
            {/*      blockNumber.last_commit.height) || error || 'fetching data...')}*/}
            {/*</code>*/}
          </div>
          <div>
            {status === WalletStatus.WALLET_NOT_CONNECTED && (
              <>
                {availableInstallTypes.map((connectType) => (
                  <button
                    key={'install-' + connectType}
                    onClick={() => install(connectType)}
                  >
                    Install {connectType}
                  </button>
                ))}
                {availableConnectTypes.map((connectType) => (
                  <button
                    key={'connect-' + connectType}
                    className={connectType}
                    onClick={() => connect(connectType)}
                  >
                    Connect {connectType}
                  </button>
                ))}
              </>
            )}
            {status === WalletStatus.WALLET_CONNECTED && (
              <button onClick={() => disconnect()}>Disconnect</button>
            )}
          </div>
        </div>
        <div>
          <h1>Your Wallet</h1>
          <ul
            style={{
              display: 'flex',
              alignItems: 'stretch',
              flexDirection: 'column',
              width: 380,
              fontFamily: 'Gotham,sans-serif',
              listStyle: 'none'
            }}
          >
            {latestBalances.map(
              ({
                 terraSymbol,
                 currencySymbol,
                 denomToUSTExchangeRate,
                 formattedAmount,
                 amount,
                 img
               }: TerraAsset) => (
                <StablecoinRow
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
      </div>
    </>
  )
}

export default App
