import React from "react";
import { Img } from "react-image";
import { TerraAsset } from "@react-terra/hooks";
// import { StablecoinImageLoader } from "./StablecoinImageLoader";
// import { StablecoinImage } from "./StablecoinImage";

const SIZE_AS_INT = 40;

export const Stablecoin = ({
                             terraSymbol,
                             denomToUSTExchangeRate,
                             amount,
                             formattedAmount,
                             img
                           }: TerraAsset) => (
  <li
    className="flex flex-grow-1 select-none"
    style={{
      padding: "0.5em 0"
    }}
  >
    <div className="flex flex-col justify-center">
      <Img width={SIZE_AS_INT} height={SIZE_AS_INT} src={img} />
      <span
        className="flex flex-grow-1"
        style={{
          justifyContent: "center",
          fontSize: "small",
          fontWeight: 600
        }}
      >
        {terraSymbol}
      </span>
    </div>
    <div
      className="flex items-center"
      style={{
        paddingLeft: "0.5em"
      }}
    >
      {formattedAmount}
    </div>
    <div
      className="flex items-center flex-grow-1 truncate"
      style={{
        justifyContent: "flex-end",
        fontSize: "small",
        opacity: 0.6
      }}
    >
      ≈{(denomToUSTExchangeRate * amount).toFixed(6)} UST
    </div>
  </li>
);
