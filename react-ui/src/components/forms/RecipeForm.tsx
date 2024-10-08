import React from 'react';
import {useForm, useFieldArray, Controller, SubmitHandler} from 'react-hook-form';
import {TextField, Button, Grid, Typography, Container, Divider} from '@mui/material';
import {Recipe} from "../../types";

type RecipeForm = Omit<Recipe, 'filters'> & {
    filters: string;
}

interface RecipeFormProps {
    onSubmit: (data: Recipe) => void;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({onSubmit}) => {
    const {control, handleSubmit, register, reset} = useForm<RecipeForm>({
        defaultValues: {
            title: '',
            description: '',
            image_url: '',
            level: '',
            servings: 0,
            time: 0,
            priority: 1,
            author: '',
            filters: '',
            steps: [{description: '', video_url: '', duration: 0}],
            ingredients: [{title: '', quantity: 1, unit: 1}],
        },
    });

    const {fields: stepFields, append: appendStep} = useFieldArray({
        control,
        name: 'steps',
    });

    const {fields: ingredientFields, append: appendIngredient} = useFieldArray({
        control,
        name: 'ingredients',
    });

    const handleFormSubmit: SubmitHandler<RecipeForm> = (data) => {
        const recipe: Recipe = {
            ...data,
            servings: data.servings,
            time: data.time,
            priority: data.priority,
            steps: data.steps,
            ingredients: data.ingredients,
            filters: data.filters.split(',').map((filter) => filter.trim()),
        };

        onSubmit(recipe);
        reset(); // Reset form after successful submission
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
                Mint a New Recipe
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Controller
                            name="title"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Title" fullWidth required/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Description" fullWidth required multiline rows={4}/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="image_url"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Image URL" fullWidth/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="level"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Level" fullWidth required/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="servings"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Servings" fullWidth required type="number"/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="time"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Time (minutes)" fullWidth required type="number"/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="priority"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Priority" fullWidth required type="number"/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="author"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Author Address" fullWidth required/>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="filters"
                            control={control}
                            render={({field}) => (
                                <TextField {...field} label="Filters (comma separated)" fullWidth/>
                            )}
                        />
                    </Grid>
                    <Divider style={{width: '100%', margin: '20px 0'}}/>
                    <Typography variant="h6">Steps</Typography>
                    {stepFields.map((step, index) => (
                        <Grid container spacing={2} key={step.id}>
                            <Grid item xs={6}>
                                <Controller
                                    name={`steps.${index}.description`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Step Description" fullWidth/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    name={`steps.${index}.video_url`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Video URL" fullWidth/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    name={`steps.${index}.duration`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Duration (seconds)" fullWidth type="number"/>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="contained"
                            onClick={() => appendStep({description: '', video_url: '', duration: 0})}
                            style={{margin: '10px 0'}}>
                        Add Step
                    </Button>
                    <Divider style={{width: '100%', margin: '20px 0'}}/>
                    <Typography variant="h6">Ingredients</Typography>
                    {ingredientFields.map((ingredient, index) => (
                        <Grid container spacing={2} key={ingredient.id}>
                            <Grid item xs={4}>
                                <Controller
                                    name={`ingredients.${index}.title`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Ingredient Title" fullWidth/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name={`ingredients.${index}.quantity`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Quantity" fullWidth type="number"/>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controller
                                    name={`ingredients.${index}.unit`}
                                    control={control}
                                    render={({field}) => (
                                        <TextField {...field} label="Unit" fullWidth/>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="contained" onClick={() => appendIngredient({title: '', quantity: 0, unit: 0})}
                            style={{margin: '10px 0'}}>
                        Add Ingredient
                    </Button>
                    <Grid item xs={12} style={{marginTop: '20px'}}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Mint Recipe
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
