import React, {useContext} from "react";
import {SubscribedAddressesContext} from "./SubscribedAddressProvider";
import Box from "@mui/material/Box";
import Table from "../common/Table";

export function SubscribedAddressesList() {
    const { subscribedAddresses } = useContext(SubscribedAddressesContext);
    const parsedSubscribedAddresses = subscribedAddresses.map((item, i ) => ([i, item]));

    return (
        <Box marginTop={3}>
            <Table
                data={parsedSubscribedAddresses}
                title="Subscribed addresses"
                headers={["№", "Address"]}
            />
        </Box>
    );
}