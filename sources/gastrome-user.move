/// Module: users
module gastrome::user {
    use std::string::{Self, String};
    use sui::object::{Self, UID};
    use sui::event;
    use sui::coin::{Self, TreasuryCap};

    public struct User has key, store {
        id: UID,
        name: String,
        instagram: String,
        views: u64,
    }

    // Events
    public struct MintUserEvent {
        object_id: ID,
        creator: address,
        name: String,
    }

    // Functions
    public fun mint_to_sender(
        name: String,
        instagram: String,
        ctx: &mut TxContext
    ) {
        let sender = ctx.sender();
        let user = User {
            id: object::new(ctx),
            name,
            instagram,
            views: 0
        };

        event::emit(MintUserEvent {
            object_id: object::id(&user),
            creator: sender,
            name: user.name,
        });

        transfer::public_transfer(user, sender);
    }

    public fun increment_views(user: &mut User, treasury_cap: &mut TreasuryCap<gastrome::coin::COIN>,) {
        user.views = user.views + 1;
        if (user.views % 1000 == 0) {
            gastrome::coin::mint(treasury_cap, 10, user);
        }
    }
}

