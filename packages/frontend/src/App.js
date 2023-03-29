import CurrencyProvider from "./components/Currency/CurrencyProvider";
import WSConnectionProvider from "./components/WSConnectionProvider";
import SubscribedAddressesProvider from "./components/SubcribedAddresses/SubscribedAddressProvider";
import SubscribeOnTransactionsProvider from "./components/SubscribeOnTransactions/SubscribeOnTransactionsProvider";
import {Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import SearchBitcoinAddress from "./pages/SerchAddress";
import SearchBitcoinTransaction from "./pages/SearchTransaction";
import React, {useContext} from "react";
import {AuthContext} from "./components/Auth/AuthProvider";
import Login from "./components/Auth/Login";

function App() {
    const {user, isLoadingUser} = useContext(AuthContext);


    return (
        <>
            {user && (
                <CurrencyProvider>
                    <WSConnectionProvider>
                        <SubscribedAddressesProvider>
                            <SubscribeOnTransactionsProvider>
                                <NavBar/>
                                <Routes>
                                    <Route exact path="/" element={<SearchBitcoinAddress/>}/>
                                    <Route exact path="/search-address" element={<SearchBitcoinAddress/>}/>
                                    <Route exact path="/search-transaction" element={<SearchBitcoinTransaction/>}/>
                                </Routes>
                            </SubscribeOnTransactionsProvider>
                        </SubscribedAddressesProvider>
                    </WSConnectionProvider>
                </CurrencyProvider>
            )}
            {!user && !isLoadingUser && (
                <Login/>
            )}
        </>
    )
}

export default App;
