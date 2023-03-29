import React, {useState, useEffect, useContext} from 'react';
import {WSConnectionContext} from "../WSConnectionProvider";
import $api from "../../http";
import {toast} from "react-toastify";

export const SubscribedAddressesContext = React.createContext([]);

function SubscribedAddressesProvider({children}) {
    const {ws} = useContext(WSConnectionContext);
    const [subscribedAddresses, setSubscribedAddresses] = useState([]);

    useEffect(() => {
        //TODO to model
        if (ws) {
            $api.get('/subscribed-addresses')
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
        //TODO remove to model
        $api.post('/subscribed-addresses', {address})
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

    const removeSubscribedAddress = (addressToRemove) => {
        //TODO rm subscribed addresses on backend
        const newSubscribedAddresses = [...subscribedAddresses.filter(addr => addr !== addressToRemove)];
        setSubscribedAddresses(newSubscribedAddresses);
        ws.send(JSON.stringify({
            op: "addr_unsub",
            addr: addressToRemove
        }))
    };

    return (
        <SubscribedAddressesContext.Provider
            value={{subscribedAddresses, addSubscribedAddress, removeSubscribedAddress}}>
            {children}
        </SubscribedAddressesContext.Provider>
    );
}

export default SubscribedAddressesProvider;
