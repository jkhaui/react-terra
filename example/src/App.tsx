import React from 'react'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import {
  TerraAsset,
  useBlockNumber,
  useIsOnline,
  useLiveBalances
} from '@react-terra/hooks'

import './index.css'

const StablecoinRow = ({
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

const App = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect
  } = useWallet()

  const latestBalances = useLiveBalances()
  const { connected, error, blockNumber } = useBlockNumber()
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
            <code>
              {connected && (
                (blockNumber &&
                  blockNumber.last_commit &&
                  blockNumber.last_commit.height) || error || 'fetching data...')}
            </code>
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
