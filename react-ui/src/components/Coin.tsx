import React, {useState, useEffect, useCallback} from 'react';
import {
    Typography, Container, Paper,
} from '@mui/material';
import {useCurrentAccount, useSuiClient} from "@mysten/dapp-kit";

import {GastroSuiAddresses} from "../const";
import {
    getContractMethod,
    getTotalBalance,
} from "../utilities";

export const Coin = () => {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const [balance, setBalance] = useState(0);

    const updateBalance = useCallback(() => {
        if (account) {
            client.getBalance({
                owner: account.address,
                coinType: getContractMethod(GastroSuiAddresses.package, 'coin', 'COIN')
            })
                .then(balance => setBalance(getTotalBalance(balance)));
        }
    }, [client, setBalance, account]);

    useEffect(() => {
        updateBalance();
    }, [updateBalance]);


    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Typography variant="h4" gutterBottom>
                    Mint Gastro Tokens
                </Typography>
                <Typography gutterBottom>
                    Your $GASTRO coins: {balance}
                </Typography>
            </Paper>
        </Container>
    )
}