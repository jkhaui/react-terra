import React from "react";

export const DisconnectedPlaceholder = () => {
  return (
    <div className="DisconnectedPlaceholder select-none">
      <p>
        <span>
          Unlock your wallet to view your balances, or create a new one&nbsp;
        </span>
        <span role="img" aria-label="index-up-emoji">
          ☝️
        </span>
      </p>
    </div>
  );
};
