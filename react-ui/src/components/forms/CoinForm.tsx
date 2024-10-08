import React, {useState, FormEventHandler} from 'react';
import {
    Button, TextField, Grid, Container, Paper, Box,
} from '@mui/material';

interface CoinFormProps {
    onSubmit: (amount: number, address: string) => void;
}

export const CoinForm: React.FC<CoinFormProps> = ({ onSubmit }) => {
    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState('');

    const mint: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        onSubmit(amount, recipient);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box p={4}>
                    <form onSubmit={mint}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Amount"
                                    fullWidth
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
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