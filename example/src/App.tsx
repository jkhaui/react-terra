// @ts-nocheck
import React from 'react'
import { useWallet, WalletStatus } from '@terra-money/wallet-provider'
import { useLiveBalances } from '@react-terra/hooks'

const App = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect
  } = useWallet()
  // @ts-ignore
  const latestBalances = useLiveBalances()
  console.log(latestBalances, 'latestBalances')
  return (
    <div>
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
               denomToUSTExchangeRate,
               formattedAmount,
               amount,
               img
             }: any) => (
              <StablecoinRow
                key={terraSymbol}
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
  )
}

const StablecoinRow = ({
                         terraSymbol,
                         denomToUSTExchangeRate,
                         amount,
                         formattedAmount,
                         img
                       }: any) => (
  <li
    style={{
      flexGrow: 1,
      display: 'flex',
      padding: '0.5em 0'
      //...(amount < 0.005 && { opacity: 0.6 })
    }}
  >
    {/*{console.log(denomToUSTExchangeRate, amount)}*/}
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

export default App
