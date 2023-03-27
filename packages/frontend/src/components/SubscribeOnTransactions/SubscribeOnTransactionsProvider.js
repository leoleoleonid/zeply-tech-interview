import React, {useState, useEffect, useContext} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {WSConnectionContext} from "../WSConnectionProvider";

export const SubscribeOnTransactionsContext = React.createContext([]);
function SubscribeOnTransactionsProvider({children}) {
    const [subscribedOnTransactions, setSubscribesOnTransactions] = useState(false);

    return (
        <SubscribeOnTransactionsContext.Provider value={{subscribedOnTransactions, setSubscribesOnTransactions}}>
            {children}
        </SubscribeOnTransactionsContext.Provider>
    );
}

export default SubscribeOnTransactionsProvider;
