/// Module: users
module gastrome::user {
    use std::string::{String};
    use sui::object;
    use sui::event;

    public struct User has key, store {
        id: UID,
        name: String,
        instagram: String,
        views: u64,
    }

    // Events
    public struct MintUserEvent has copy, drop {
        object_id: ID,
        creator: address,
        name: String,
    }

    // Functions
    public fun mint_to_sender(
        name: String,
        instagram: String,
        ctx: &mut TxContext
    ): User {
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

        user
    }
}

