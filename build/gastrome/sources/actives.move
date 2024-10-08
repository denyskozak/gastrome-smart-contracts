module gastrome::actives {
    use std::vector;
    use sui::object::{Self, UID};

    public struct Active has store, drop {
        recipe_address: address,
        owner: address,
        viewed_user: vector<address>
    }

    public struct Actives has key, store {
        id: UID,
        owner: address,
        list: vector<Active>,
    }

    const RecipeNotExistsInListError: u64 = 1;

    fun init(ctx: &mut TxContext) {
        let actives = Actives {
            id: object::new(ctx),
            owner: ctx.sender(),
            list: vector::empty<Active>(),
        };
        transfer::public_transfer(actives, ctx.sender())
    }

    public fun add_recipe(
        actives: &mut Actives,
        recipe_address: address,
        ctx: &mut TxContext,
    ) {
        let owner = ctx.sender();
        let mut viewed_user = vector::empty<address>();

        vector::push_back(&mut viewed_user, owner);
        vector::push_back(&mut actives.list, Active { recipe_address, owner, viewed_user });
    }

    public fun remove_recipe(
        actives: &mut Actives,
        recipe_address: address,
        ctx: &mut TxContext,
    ) {
        let maybeIndex: Option<u64> = find_recipe_index(&actives.list, recipe_address);

        if (maybeIndex.is_some()) {
            let i = *maybeIndex.borrow();
            vector::remove(&mut actives.list, i);
        } else {
            abort RecipeNotExistsInListError;
        }
    }

    // TODO replace to uniform solution, like findByValue
    public fun find_recipe_index(list: &vector<Active>, recipe_id: address): Option<u64> {
        let length = vector::length(list);
        let mut i = 0;
        while (i < length) {
            let active = vector::borrow(list, i);
            if (active.recipe_address == recipe_id) {
                return option::some(i);
            };
            i = i + 1;
        };
        option::none<u64>()
    }
}

