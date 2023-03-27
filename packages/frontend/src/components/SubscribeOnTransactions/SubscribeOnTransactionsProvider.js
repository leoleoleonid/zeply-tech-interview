import React, {useState, useEffect, useContext} from 'react';

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
