/// Module: recipes
module gastrome::recipes {
    use std::string::{Self, String};
    use sui::object::{Self, UID};

    // public struct to represent the author
    public struct Author has key, store {
        id: UID,
        name: String,
        instagram: String,
    }

    // public struct to represent individual steps in the recipe
    public struct Step has store {
        description: String,
        ingredients_ids: vector<u64>, // List of ingredient IDs
        duration: u64, // Optional duration field
    }

    // public struct to represent ingredients
    public struct Ingredient has store {
        title: String, // Ingredient name
        quantity: Option<u64>, // Quantity might be optional
        unit: Option<String>, // Unit for measurement (optional)
    }

    // public struct to represent the recipe
    public struct Recipe has key, store {
        id: UID,
        title: String, // Title of the recipe
        description: String, // Description of the recipe
        level: String, // Difficulty level
        servings: u64, // Number of servings
        has_video_steps: bool, // Boolean to indicate if there are video steps
        prep_time: u64, // Preparation time in minutes
        cook_time: u64, // Cooking time in minutes
        time: u64, // Total time in minutes
        priority: u64, // Priority of the recipe
        author: Author, // Author of the recipe
        filters: vector<String>, // Filters (e.g., "Breakfast")
        steps: vector<Step>, // Steps in the recipe
        ingredients: vector<Ingredient>, // Ingredients list
    }


}

