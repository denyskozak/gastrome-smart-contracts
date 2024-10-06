import {createNetworkConfig, SuiClientProvider, WalletProvider} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";
import {Entry} from "./components/Entry";

import '@mysten/dapp-kit/dist/index.css';

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
});
const queryClient = new QueryClient();

export function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider>
            <Entry />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
  );
}