import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import {useState} from "react";

export const Connect = () => {
    const currentAccount = useCurrentAccount();
    const [open, setOpen] = useState(false);

    return (
        <ConnectModal
            trigger={
                <button disabled={!!currentAccount}> {currentAccount ? 'Connected' : 'Connect'}</button>
            }
            open={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
        />
    );
};
