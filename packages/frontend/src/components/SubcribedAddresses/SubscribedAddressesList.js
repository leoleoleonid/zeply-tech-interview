import React, {useContext} from "react";
import {SubscribedAddressesContext} from "./SubscribedAddressProvider";
import Box from "@mui/material/Box";
import Table from "../common/Table";

export function SubscribedAddressesList() {
    const { subscribedAddresses } = useContext(SubscribedAddressesContext);

    return (
        <Box marginTop={3}>
            <Table
                data={subscribedAddresses}
                title="Subscribed addresses"
                headers={["№", "Address"]}
            />
        </Box>
    );
}