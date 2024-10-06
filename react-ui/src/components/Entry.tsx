import { getFullnodeUrl } from '@mysten/sui/client';
import {Container} from "@mui/material";
import {useCurrentAccount} from '@mysten/dapp-kit';

import React from "react";
import {Connect} from "./Connect";
import {Coin} from "./Coin";

export function Entry() {
    const currentAccount = useCurrentAccount();

    return (
        <Container maxWidth="md">
            <Connect />
            {currentAccount && (
                <Coin />
            )}
        </Container>
    );
}