import React from "react";
import { useBlockNumber, useTerraStore } from "@react-terra/hooks";

export const BlockNumber = () => {
  const { connected, error, blockNumber } = useBlockNumber();
  const { terra } = useTerraStore();

  return (
    <aside className="BlockNumber flex items-center">
      <a
        className="BlockNumber-link"
        href={`https://finder.terra.money/${
          (terra && terra.config && terra.config.chainID) || "columbus-5"
        }/blocks/${
          (blockNumber &&
            blockNumber.last_commit &&
            blockNumber.last_commit.height) ||
          ""
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="truncate">Block height:</span>
        <code className="BlockNumber-height">
          {connected &&
          ((blockNumber &&
              blockNumber.last_commit &&
              blockNumber.last_commit.height) ||
            error ||
            "fetching...")}
        </code>
      </a>
    </aside>
  );
};
