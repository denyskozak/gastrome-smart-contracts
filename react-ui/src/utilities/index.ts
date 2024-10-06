import { CoinBalance } from "@mysten/sui/client";
export const MIST_PER_GASTROME_COIN = 6;

export const getContractMethod = (address: string, packageName: string, method: string) => `${address}::${packageName}::${method}`;
export const getTotalBalance = (balance: CoinBalance) => {
    return Math.floor(Number.parseInt(balance.totalBalance) / Math.pow(10, MIST_PER_GASTROME_COIN - 2)) / 100;
};