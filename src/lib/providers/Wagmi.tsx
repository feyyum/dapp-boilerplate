"use client";

import { ReactNode } from "react";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
});

interface WagmiProviderProps {
  children: ReactNode;
}

function WagmiProvider({ children }: WagmiProviderProps) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}

export default WagmiProvider;
