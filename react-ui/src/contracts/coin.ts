import {getContractMethod, MIST_PER_GASTROME_COIN} from "../utilities";
import {GastroSuiAddresses} from "../const";
import { Transaction } from '@mysten/sui/transactions';

export const mintCoin = (amount: number, address: string) => {
    const tx = new Transaction();

    tx.moveCall({
        target: getContractMethod(GastroSuiAddresses.package, 'coin', 'mint'),
        arguments: [
            tx.object(GastroSuiAddresses.treasuryCap),
            tx.pure.u64(Number(amount) * Math.pow(10, MIST_PER_GASTROME_COIN)),
            tx.pure.address(address),
        ],
    });

    return tx;
}

export const handleContractError = (error: Error) => console.error`Error smart contract: ${error}`;