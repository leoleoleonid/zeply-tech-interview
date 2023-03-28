import {useContext} from "react";
import {AuthContext} from "./AuthProvider";
import Button from "@mui/material/Button";
import * as React from "react";

export default function Logout() {
    const {logout} = useContext(AuthContext);

    return (
        <Button
            onClick={logout}
            sx={{
                mx: 2,
                color: '#FFFFFF',
                textDecoration: 'none'
            }}
        >
            LogOut
        </Button>
    )
}