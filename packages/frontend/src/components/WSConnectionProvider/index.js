import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const WSConnectionContext = React.createContext([]);

function WSConnectionProvider({ children }) {
    const [ws, setWSConnected] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(`wss://ws.blockchain.info/inv`);
        ws.addEventListener('open', () => {
            if(ws.readyState === WebSocket.OPEN) {
                console.log('ws.readyState', ws.readyState)
                setWSConnected(ws);
                ws.onmessage = event => {
                    const data = JSON.parse(event.data);
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

    return (
        <WSConnectionContext.Provider value={{ ws }}>
            <ToastContainer />
            {children}
        </WSConnectionContext.Provider>
    );
}

export default WSConnectionProvider;
