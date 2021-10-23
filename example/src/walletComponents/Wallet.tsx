import React from "react";
import { TerraAsset, useLiveBalances } from "@react-terra/hooks";
import { Stablecoin } from "./Stablecoin";

export const Wallet = () => {
  const liveBalances = useLiveBalances({
    showLuna: false
  });

  return (
    <div>
      <h1>Your Wallet</h1>
      <ul
        className="flex flex-col"
        style={{
          alignItems: "stretch",
          width: 268,
          listStyle: "none"
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
  );
};
