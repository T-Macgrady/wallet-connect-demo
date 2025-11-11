// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import { registerWalletConnectWallet } from "@mysten/walletconnect-wallet";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

const queryClient = new QueryClient();

registerWalletConnectWallet({
  projectId: "f159157f4c1712474ef534f308390772",
  getClient: (chain) =>
    new SuiClient({ network: chain, url: getFullnodeUrl(chain) }),
  metadata: {
    walletName: "Wallet Connect",
    icon: "https://walletconnect.org/walletconnect-logo.png",
    enabled: true,
    id: "walletconnect",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
          <WalletProvider autoConnect>
            <App />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
