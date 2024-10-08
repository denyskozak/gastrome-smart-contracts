import { CoinBalance } from "@mysten/sui/client";
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import {decodeSuiPrivateKey} from "@mysten/sui/cryptography";

export const MIST_PER_GASTROME_COIN = 6;

export const getContractMethod = (address: string, packageName: string, method: string) => `${address}::${packageName}::${method}`;
export const getTotalBalance = (balance: CoinBalance) => {
    return Math.floor(Number.parseInt(balance.totalBalance) / Math.pow(10, MIST_PER_GASTROME_COIN - 2)) / 100;
};

export const activeKeyPair =  Ed25519Keypair.fromSecretKey(decodeSuiPrivateKey(String(process.env.REACT_APP_PRIVATE_KEY)).secretKey);