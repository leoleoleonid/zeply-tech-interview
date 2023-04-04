import CurrencyProvider from "./components/Currency/CurrencyProvider";
import WSConnectionProvider from "./components/WSConnectionProvider";
import SubscribedAddressesProvider from "./components/SubcribedAddresses/SubscribedAddressProvider";
import SubscribeOnTransactionsProvider from "./components/SubscribeOnTransactions/SubscribeOnTransactionsProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import SearchBitcoinAddress from "./pages/SerchAddress";
import SearchBitcoinTransaction from "./pages/SearchTransaction";
import React from "react";
import AuthProvider from "./components/Auth/AuthProvider";


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
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
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
