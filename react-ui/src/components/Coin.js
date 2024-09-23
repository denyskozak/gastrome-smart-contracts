import React, { useState } from 'react';
import {
    Button, TextField, Grid, Typography, Container, Paper, Box,
} from '@mui/material';
import { Transaction } from '@mysten/sui/transactions';
import {Connect} from "./Connect";
import {useCurrentAccount, useSignTransaction, useSuiClient} from "@mysten/dapp-kit";
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

import { be } from '@mysten/sui/cryptography'
import {decodeSuiPrivateKey} from "@mysten/sui/cryptography";

export const Coin = () => {
    const { mutateAsync: signTransaction } = useSignTransaction();
    const client = useSuiClient();

    // State to hold form inputs
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    // Function to handle form submission
    const mint = async (e) => {
        e.preventDefault();
        try {
            const tx = new Transaction();
            const keypair = Ed25519Keypair.fromSecretKey(decodeSuiPrivateKey(process.env.REACT_APP_PRIVATE_KEY).secretKey);

            tx.moveCall({
                target: '0x1710a9b077a433087d0b4f73603ca2ffcfd83a25780b46ccc3d153894786d822::coin::mint', // Your Move module call
                arguments: [
                    tx.object('0x6e1a3309393661df220c5c5741edd88e5c4702d41d77489e06f3fd4287efc5d0'),  // Replace with actual TreasuryCap object ID
                    tx.pure.u64(Number(amount)),  // The amount to mint
                    tx.pure.address(recipient),  // The recipient address
                ],
            });

            const executeResult = client.signAndExecuteTransaction({ signer: keypair, transaction: tx });


            console.log('Transaction Result:', executeResult);
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