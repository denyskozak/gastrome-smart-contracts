import {createNetworkConfig, SuiClientProvider, WalletProvider} from '@mysten/dapp-kit';
import {getFullnodeUrl} from '@mysten/sui/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from "react";

import '@mysten/dapp-kit/dist/index.css';
import {HomePage} from "./pages/Home";
import {AuthLayout} from "./layout/AuthLayout";

// Config options for the networks you want to connect to
const {networkConfig} = createNetworkConfig({
    testnet: {url: getFullnodeUrl('testnet')},
});
const queryClient = new QueryClient();

export function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                <WalletProvider stashedWallet={{
                    name: 'Gastro & Me',
                }}>
                    <AuthLayout>
                        <HomePage/>
                    </AuthLayout>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}