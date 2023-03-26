import React, {useContext, useState} from "react";
import {SubscribedAddressesContext} from "./SubscribedAddressProvider";

export function SubscribedAddressesList() {
    const { subscribedAddresses } = useContext(SubscribedAddressesContext);

    return (
        <div>
            {subscribedAddresses.map(address => (
                <div key={address}>{address}</div>
            ))}
        </div>
    );
}