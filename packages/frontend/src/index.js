import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import SearchBitcoinAddress from "./pages/SerchAddress";
import SearchBitcoinTransaction from "./pages/SearchTransaction";
import SubscribedAddressesProvider from "./components/SubcribedAddresses/SubscribedAddressProvider";
import WSConnectionProvider from "./components/WSConnectionProvider";
import SubscribeOnTransactionsProvider from "./components/SubscribeOnTransactions/SubscribeOnTransactionsProvider";
import CurrencyProvider from "./components/Currency/CurrencyProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CurrencyProvider>
          <WSConnectionProvider>
              <SubscribedAddressesProvider>
                  <SubscribeOnTransactionsProvider>
                      <BrowserRouter>
                          <NavBar />
                          <Routes>
                              <Route exact path="/" element={<SearchBitcoinAddress/>}/>
                              <Route exact path="/search-address" element={<SearchBitcoinAddress/>}/>
                              <Route exact path="/search-transaction" element={<SearchBitcoinTransaction/>} />
                          </Routes>
                      </BrowserRouter>
                  </SubscribeOnTransactionsProvider>
              </SubscribedAddressesProvider>
          </WSConnectionProvider>
      </CurrencyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
