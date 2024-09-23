import React, { useState } from 'react';
import {
    Button, TextField, Grid, Typography, Container, Paper, Box,
} from '@mui/material';
import { Transaction } from '@mysten/sui/transactions';
import {Connect} from "./Connect";
import { useSignTransaction, useSuiClient} from "@mysten/dapp-kit";

export const AddRecipe = () => {

    const { mutateAsync: signTransaction } = useSignTransaction();
    const client = useSuiClient();

    // State to hold the form data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [level, setLevel] = useState('');
    const [servings, setServings] = useState('');
    const [time, setTime] = useState('');
    const [priority, setPriority] = useState('');
    const [author, setAuthor] = useState('');
    const [filters, setFilters] = useState('');
    const [steps, setSteps] = useState([{ description: '', ingredientsIds: '', videoUrl: '', duration: '' }]);
    const [ingredients, setIngredients] = useState([{ title: '', quantity: '', unit: '' }]);

    // Sui provider and signer

    // Function to handle step changes
    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    // Function to handle ingredient changes
    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    // Add new step field
    const addStep = () => {
        setSteps([...steps, { description: '', ingredientsIds: '', videoUrl: '', duration: '' }]);
    };

    // Add new ingredient field
    const addIngredient = () => {
        setIngredients([...ingredients, { title: '', quantity: '', unit: '' }]);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Transform filters into vector format (assuming it's a comma-separated list)
        const filtersVector = filters.split(',').map(f => f.trim());

        // Transform steps and ingredients into vector<u64> and vector<String>
        const stepsData = steps.map(step => ({
            description: step.description,
            ingredients_ids: step.ingredientsIds.split(',').map(id => Number(id.trim())),
            video_url: step.videoUrl,
            duration: Number(step.duration),
        }));

        const ingredientsData = ingredients.map(ing => ({
            title: ing.title,
            quantity: ing.quantity ? { some: Number(ing.quantity) } : { none: null },
            unit: ing.unit ? { some: ing.unit } : { none: null },
        }));

        try {
            const tx = new Transaction();

            tx.moveCall({
                target: 'gastrome::recipe::mint_to_sender', // Your Move module call
                arguments: [
                    tx.pure(title),
                    tx.pure(description),
                    tx.pure(url),
                    tx.pure(level),
                    tx.pure(Number(servings)),
                    tx.pure(Number(time)),
                    tx.pure(Number(priority)),
                    tx.pure(author),
                    tx.pure(filtersVector),
                    tx.pure(stepsData),
                    tx.pure(ingredientsData),
                ],
            });

            const { bytes, signature, reportTransactionEffects } = await signTransaction({
                transaction: tx,
                chain: 'sui:devnet',
            });

            const executeResult = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    showRawEffects: true,
                },
            });

            console.log('Transaction Result:', executeResult);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Connect />
            {currentAccount && (
                <Paper elevation={3}>
                    <Box p={4}>
                        <Typography variant="h4" gutterBottom>
                            Add Recipe
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title"
                                        fullWidth
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="URL"
                                        fullWidth
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Level"
                                        fullWidth
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Servings"
                                        fullWidth
                                        value={servings}
                                        onChange={(e) => setServings(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Time"
                                        fullWidth
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Priority"
                                        fullWidth
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Author (Address)"
                                        fullWidth
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Filters (Comma Separated)"
                                        fullWidth
                                        value={filters}
                                        onChange={(e) => setFilters(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6">Steps</Typography>
                                    {steps.map((step, index) => (
                                        <Box key={index} mb={2}>
                                            <TextField
                                                label="Description"
                                                fullWidth
                                                value={step.description}
                                                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                            />
                                            <TextField
                                                label="Ingredients IDs (Comma Separated)"
                                                fullWidth
                                                value={step.ingredientsIds}
                                                onChange={(e) => handleStepChange(index, 'ingredientsIds', e.target.value)}
                                            />
                                            <TextField
                                                label="Video URL"
                                                fullWidth
                                                value={step.videoUrl}
                                                onChange={(e) => handleStepChange(index, 'videoUrl', e.target.value)}
                                            />
                                            <TextField
                                                label="Duration (in seconds)"
                                                fullWidth
                                                value={step.duration}
                                                onChange={(e) => handleStepChange(index, 'duration', e.target.value)}
                                            />
                                        </Box>
                                    ))}
                                    <Button onClick={addStep}>Add Step</Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6">Ingredients</Typography>
                                    {ingredients.map((ingredient, index) => (
                                        <Box key={index} mb={2}>
                                            <TextField
                                                label="Title"
                                                fullWidth
                                                value={ingredient.title}
                                                onChange={(e) => handleIngredientChange(index, 'title', e.target.value)}
                                            />
                                            <TextField
                                                label="Quantity"
                                                fullWidth
                                                value={ingredient.quantity}
                                                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                                            />
                                            <TextField
                                                label="Unit"
                                                fullWidth
                                                value={ingredient.unit}
                                                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                            />
                                        </Box>
                                    ))}
                                    <Button onClick={addIngredient}>Add Ingredient</Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        Submit Recipe
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};
