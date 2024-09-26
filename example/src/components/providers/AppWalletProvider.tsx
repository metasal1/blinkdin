"use client";

import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_RPC!;
  const wallets = useMemo(
    () => [
      // manually add any legacy wallet adapters here
      new TipLinkWalletAdapter({
        title: "Blinkd.in",
        clientId: "166731c5-3737-4128-9cd4-74d998cd1376",
        theme: "system"  // pick between "dark"/"light"/"system"
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
