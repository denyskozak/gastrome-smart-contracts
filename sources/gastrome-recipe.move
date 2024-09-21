/// Module: recipe
module gastrome::recipe {
    use std::string::{Self, String};
    use sui::object::{Self, UID};
    use sui::event;

    use gastrome::user;

    public struct Step has store {
        description: String,
        ingredients_ids: vector<u64>,
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
        author: &user::User,
        filters: vector<String>,
        steps: vector<Step>,
        ingredients: vector<Ingredient>,
    }

    public struct ViewsCounter has store {
        id: UID,
        recipe_id: address,
        views: u64,
    }

    // Events
    public struct RecipeMinted {
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
        author: &user::User,
        filters: vector<String>,
        steps: vector<Step>,
        ingredients: vector<Ingredient>,
        ctx: &mut TxContext
    ) {
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
        };

        event::emit(RecipeMinted {
            object_id: object::id(&Recipe),
            creator: sender,
            title: recipe.title,
        });

        transfer::public_transfer(recipe, sender);
    }
}

