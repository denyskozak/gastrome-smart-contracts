import {getContractMethod} from "../utilities";
import {GastroSuiAddresses} from "../const";
import { Transaction } from '@mysten/sui/transactions';
import {Recipe} from "../types";

export const mintRecipe = (recipe: Recipe) => {
    const tx = new Transaction();

    tx.moveCall({
        target: getContractMethod(GastroSuiAddresses.package, 'recipe', 'mint_to_sender'),
        arguments: [
        ],
    });

    return tx;
}

export const handleContractError = (error: Error) => console.error`Error smart contract: ${error}`;