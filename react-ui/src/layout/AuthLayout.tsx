import React from "react";
import {Container} from "@mui/material";
import {useCurrentAccount} from '@mysten/dapp-kit';

import {Connect} from "../components/Connect";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
    const currentAccount = useCurrentAccount();
    return (
        <Container maxWidth="md">
            {currentAccount
                ? children
                : <Connect/>}
        </Container>
    );
}