import React from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { DisconnectedPlaceholder } from "./walletComponents/DisconnectedPlaceholder";
import { WalletConnectButton } from "./WalletConnectButton";
import { Wallet } from "./walletComponents/Wallet";
import { OnlineStatus } from "./OnlineStatus";
import { BlockNumber } from "./BlockNumber";

import "./styles.css";

const App = () => {
  const {
    status,
    availableConnectTypes,
    availableInstallTypes,
    connect,
    install,
    disconnect
  } = useWallet();

  return (
    <>
      <OnlineStatus />
      <main>
        <div className="container">
          <div className="flex flex-col flex-grow-1 space-between">
            <BlockNumber />
          </div>
          <section>
            <WalletConnectButton
              status={status}
              install={install}
              availableConnectTypes={availableConnectTypes}
              connect={connect}
              disconnect={disconnect}
              availableInstallTypes={availableInstallTypes}
              WalletStatus={WalletStatus}
            />
            {status !== WalletStatus.WALLET_NOT_CONNECTED ? (
              <Wallet />
            ) : (
              <DisconnectedPlaceholder />
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default App;
