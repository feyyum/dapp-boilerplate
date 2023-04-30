"use client";

import { ReactNode } from "react";
import { DAppProvider, Mainnet, Sepolia, Config } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Sepolia.chainId]: getDefaultProvider("sepolia"),
  },
};

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  return <DAppProvider config={config}>{children}</DAppProvider>;
}

export default Provider;
