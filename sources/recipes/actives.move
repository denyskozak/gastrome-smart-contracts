module gastrome::actives {
    use sui::event;

    public struct Actives has key, store {
        id: UID,
        recipes: vector<address>,
    }

    public struct RecipeAddedEvent has copy, drop {
        store_id: address,
        recipe_id: address,
    }

    fun init(ctx: &mut TxContext): Actives {
        Actives {
            id: object::new(ctx),
            recipes: vector::empty<address>(),
        }
    }

    public fun add_recipe(
        actives: &mut Actives,
        recipe_address: address,
        ctx: &mut TxContext,
    ) {
        vector::push_back(&mut actives.recipes, recipe_address);

        event::emit(RecipeAddedEvent {
            store_id: ctx.sender(),
            recipe_id: recipe_address,
        });
    }

    // TODO replace to uniform solution, like findByValue
    fun find_recipe_index(recipes: &vector<address>, recipe_id: address): Option<u64> {
        let length = vector::length(recipes);
        let mut i = 0;
        while (i < length) {
            let recipe = vector::borrow(recipes, i);
            if (recipe == recipe_id) {
                return Option::some(i);
            };
            i = i + 1;
        };
        Option::none()
    }
}

