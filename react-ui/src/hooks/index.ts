import {activeKeyPair} from "../utilities";
import {useSuiClient} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export const useSignAndExecuteTx = () => {
    const client = useSuiClient();

   return async (tx: Transaction) => {
       const executeResult = await client.signAndExecuteTransaction({ signer: activeKeyPair, transaction: tx });
       await client.waitForTransaction({ timeout: 10000, digest: executeResult.digest });
   }
}