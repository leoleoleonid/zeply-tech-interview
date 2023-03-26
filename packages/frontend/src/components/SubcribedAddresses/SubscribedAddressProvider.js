import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SubscribedAddressesContext = React.createContext([]);

//TODO split on WS provider (with context), SubscribedAddressesProvider, un/subscribe from new transactions can be done in SearchTransactions component
function SubscribedAddressesProvider({ children }) {
    const [subscribedAddresses, setSubscribedAddresses] = useState([]);
    const [ws, setWSConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(`wss://ws.blockchain.info/inv`);
        ws.addEventListener('open', () => {
            if(ws.readyState === WebSocket.OPEN) {
                console.log('ws.readyState', ws.readyState)
                setWSConnected(ws);
                ws.onmessage = event => {
                    const data = JSON.parse(event.data);
                    console.log(data.op)
                    const message = {
                        hash: data.x.hash,
                        size: data.x.size,
                        inputs: data.x.inputs.length,
                        out: data.x.out.length,
                    }

                    toast.info(JSON.stringify(message), { position: 'top-right'});

                };
            }
        })
    }, [])

    useEffect(() => {
        //TODO get subscribed addresses from backend
        if(ws) {
            subscribedAddresses.forEach((addr) => {
                ws.send(JSON.stringify({
                    op: "addr_sub",
                    addr
                }))
                ws.send(JSON.stringify({
                    "op": "unconfirmed_sub"
                }))
            })
        }
    }, [ws])

    const addSubscribedAddress = (address) => {
        const newSubscribedAddresses = [...subscribedAddresses, address];
        setSubscribedAddresses(newSubscribedAddresses);
        ws.send(JSON.stringify({
            op: "addr_sub",
            addr: address
        }))
    };

    //TODO add removeSubscribedAddress
    //TODO add unsubscribe from new transactions

    return (
        <SubscribedAddressesContext.Provider value={{ subscribedAddresses, addSubscribedAddress }}>
            <ToastContainer />
            {children}
        </SubscribedAddressesContext.Provider>
    );
}

export default SubscribedAddressesProvider;
