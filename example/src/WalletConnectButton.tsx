import React from "react";
export const WalletConnectButton = ({
                                      status,
                                      install,
                                      connect,
                                      disconnect,
                                      availableConnectTypes,
                                      availableInstallTypes,
                                      WalletStatus
                                    }) => {
  return (
    <div>
      {status === WalletStatus.WALLET_NOT_CONNECTED && (
        <>
          {availableInstallTypes.map((connectType) => (
            <button
              key={"install-" + connectType}
              onClick={() => install(connectType)}
            >
              Install
            </button>
          ))}
          {availableConnectTypes.map((connectType) => (
            <button
              key={"connect-" + connectType}
              className={connectType}
              onClick={() => connect(connectType)}
            >
              Connect
            </button>
          ))}
        </>
      )}
      {status === WalletStatus.WALLET_CONNECTED && (
        <button data-disconnected onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  );
};
