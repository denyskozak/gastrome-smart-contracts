module bar::coin {
    use std::option;
    use sui::coin::{Self, TreasuryCap};
    use sui::transfer;

    public struct COIN has drop {}

    fun init(witness: COIN, ctx: &mut TxContext) {
        let (
            treasury,
            metadata
        ) = coin::create_currency(
            witness,
            6, // 0.000001
            b"BAR",
            b"Bar coin",
            b"Description text",
            option::none(),
            ctx,
        );

        transfer::public_freeze_object(
            metadata
        );
        transfer::public_transfer(
            treasury,
            ctx.sender()
        );
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<COIN>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let coin = coin::mint(
            treasury_cap,
            amount,
            ctx
        );
        transfer::public_transfer(
            coin,
            recipient
        );
    }
}