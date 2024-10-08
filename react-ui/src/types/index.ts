export type Step = {
    description: string;
    video_url: string;
    duration: number;
};

export type Ingredient = {
    title: string;
    quantity?: number;
    unit?: number;
};

export type Recipe = {
    title: string;
    description: string;
    image_url: string;
    level: string;
    servings: number;
    time: number;
    priority: number;
    author: string;
    filters: string[];
    steps: Step[];
    ingredients: Ingredient[];
};
