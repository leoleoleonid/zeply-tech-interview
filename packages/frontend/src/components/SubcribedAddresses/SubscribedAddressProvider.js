import React, {useState, useEffect, useContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {WSConnectionContext} from "../WSConnectionProvider";

export const SubscribedAddressesContext = React.createContext([]);

function SubscribedAddressesProvider({children}) {
    const {ws} = useContext(WSConnectionContext);
    const [subscribedAddresses, setSubscribedAddresses] = useState([]);

    useEffect(() => {
        //TODO get subscribed addresses from backend
        if (ws) {
            subscribedAddresses.forEach((addr) => {
                ws.send(JSON.stringify({
                    op: "addr_sub",
                    addr
                }))
            })
        }
    }, [ws])

    const addSubscribedAddress = (address) => {
        //TODO add subscribed addresses on backend
        const newSubscribedAddresses = [...subscribedAddresses, address];
        setSubscribedAddresses(newSubscribedAddresses);
        ws.send(JSON.stringify({
            op: "addr_sub",
            addr: address
        }))
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
