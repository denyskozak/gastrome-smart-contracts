import React from "react";
import {useCurrentAccount} from '@mysten/dapp-kit';

import {CoinForm} from "../components/forms/CoinForm";
import {RecipeForm} from "../components/forms/RecipeForm";
import {useSignAndExecuteTx} from "../hooks";
import {handleContractError, mintCoin} from "../contracts";
import {Coin} from "../components/Coin";

export function HomePage() {
    const currentAccount = useCurrentAccount();
    const signAndExecuteTx = useSignAndExecuteTx();

    const handleCoinForm = (amount: number, address: string) => {
        const tx = mintCoin(amount, address);
        signAndExecuteTx(tx).catch(handleContractError);
    }

    return (
        <>
            <header>
                <span>Account: {currentAccount?.address}</span>
            </header>
            <Coin/>
            <CoinForm onSubmit={handleCoinForm}/>
            <RecipeForm onSubmit={recipe => console.log(recipe)}/>
        </>
    );
}