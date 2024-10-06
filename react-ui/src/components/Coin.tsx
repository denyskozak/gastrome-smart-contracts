import React, { useState, useEffect,useCallback } from 'react';
import {
    Button, TextField, Grid, Typography, Container, Paper, Box,
} from '@mui/material';
import { Transaction } from '@mysten/sui/transactions';
import {useCurrentAccount, useSuiClient} from "@mysten/dapp-kit";
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

import {decodeSuiPrivateKey} from "@mysten/sui/cryptography";
import {GastroSuiAddresses} from "../const";
import {getContractMethod, getTotalBalance, MIST_PER_GASTROME_COIN} from "../utilities";

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
                .then(balance => {
                        console.log(1, balance);
                    setBalance(getTotalBalance(balance))
                });
        }
    }, [client, setBalance, account]);

    useEffect(() => {
        updateBalance();
    }, [updateBalance]);

    // State to hold form inputs
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    // Function to handle form submission
    const mint = async (event: any) => {
        event.preventDefault();

        try {
            const tx = new Transaction();
            const keypair = Ed25519Keypair.fromSecretKey(decodeSuiPrivateKey(String(process.env.REACT_APP_PRIVATE_KEY)).secretKey);

            tx.moveCall({
                target: getContractMethod(GastroSuiAddresses.package, 'coin', 'mint'),
                arguments: [
                    tx.object(GastroSuiAddresses.treasuryCap),
                    tx.pure.u64(Number(amount) * Math.pow(10, MIST_PER_GASTROME_COIN)),
                    tx.pure.address(recipient),
                ],
            });

            const executeResult = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx });
            await client.waitForTransaction({ timeout: 10000, digest: executeResult.digest });
            console.log('Transaction Result:', executeResult);
            updateBalance();
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box p={4}>
                    <Typography variant="h4" gutterBottom>
                        Mint Gastro Tokens
                    </Typography>
                    <Typography gutterBottom>
                        Your $GASTRO coins: {balance}
                    </Typography>
                    <form onSubmit={mint}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Amount"
                                    fullWidth
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Recipient Address"
                                    fullWidth
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit" fullWidth>
                                    Mint Tokens
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Container>
    )
}