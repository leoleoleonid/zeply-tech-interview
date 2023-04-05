import React, {useState, useEffect, useContext} from 'react';
import {WSConnectionContext} from "../WSConnectionProvider";
import {toast} from "react-toastify";
import subscribedAddressApi from "./subscribedAddressApi";

export const SubscribedAddressesContext = React.createContext([]);

function SubscribedAddressesProvider({children}) {
    const {ws} = useContext(WSConnectionContext);
    const [subscribedAddresses, setSubscribedAddresses] = useState([]);

    useEffect(() => {
        if (ws) {
            subscribedAddressApi.getSubscribedAddress()
                .then(({data: addresses}) => {
                    setSubscribedAddresses(addresses);
                    addresses.forEach((addr) => {
                        ws.send(JSON.stringify({
                            op: "addr_sub",
                            addr
                        }))
                    })
                })
                .catch(e => {
                    toast.error(JSON.stringify(e.message))
                })
        }
    }, [ws])

    const addSubscribedAddress = (address) => {
        subscribedAddressApi.subscribeOnAddress(address)
            .then(() => {
                const newSubscribedAddresses = [...subscribedAddresses, address];
                setSubscribedAddresses(newSubscribedAddresses);
                ws.send(JSON.stringify({
                    op: "addr_sub",
                    addr: address
                }))
            })
            .catch(e => {
                toast.error(JSON.stringify(e.message))
            })
    };

    return (
        <SubscribedAddressesContext.Provider
            value={{subscribedAddresses, addSubscribedAddress}}>
            {children}
        </SubscribedAddressesContext.Provider>
    );
}

export default SubscribedAddressesProvider;
