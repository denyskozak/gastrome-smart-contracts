/// Module: recipe
module gastrome::recipe {
    use std::string::{String};
    use sui::event;

    public struct Step has store {
        description: String,
        ingredients_ids: vector<u64>,
        video_url: String,
        duration: u64,
    }

    public struct Ingredient has store {
        title: String,
        quantity: Option<u64>,
        unit: Option<String>,
    }

    public struct Recipe has key, store {
        id: UID,
        title: String,
        description: String,
        level: String,
        servings: u64,
        time: u64,
        priority: u64,
        author: address,
        filters: vector<String>,
        steps: vector<Step>,
        ingredients: vector<Ingredient>,
        url: String,
    }

    // Events
    public struct RecipeMinted has copy, drop {
        object_id: ID,
        creator: address,
        title: String,
    }

    // Functions
    public fun mint_to_sender(
        title: String,
        description: String,
        url: String,
        level: String,
        servings: u64,
        time: u64,
        priority: u64,
        author: address,
        filters: vector<String>,
        steps: vector<Step>,
        ingredients: vector<Ingredient>,
        ctx: &mut TxContext
    ): Recipe {
        let sender = ctx.sender();
        let recipe = Recipe {
            id: object::new(ctx),
            title,
            description,
            level,
            servings,
            time,
            priority,
            author,
            filters,
            steps,
            ingredients,
            url,
        };

        event::emit(RecipeMinted {
            object_id: object::id(&recipe),
            creator: sender,
            title: recipe.title,
        });

        recipe
    }

    public fun tranfer_to_user(recipe: Recipe, receiver: address) {
        transfer::public_transfer(recipe, receiver);
    }
}

