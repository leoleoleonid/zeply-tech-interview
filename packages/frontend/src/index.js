import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import SearchBitcoinAddress from "./pages/SerchAddress";
import SearchBitcoinTransaction from "./pages/SearchTransaction";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import SubscribedAddressesProvider from "./components/SubcribedAddresses/SubscribedAddressProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/*<SubscribedAddressesProvider>*/}
          <ToastContainer/>
          <BrowserRouter>
              <NavBar />
              <Routes>
                  <Route exact path="/" element={<SearchBitcoinAddress/>}/>
                  <Route exact path="/search-address" element={<SearchBitcoinAddress/>}/>
                  <Route exact path="/search-transaction" element={<SearchBitcoinTransaction/>} />
              </Routes>
          </BrowserRouter>
      {/*</SubscribedAddressesProvider>*/}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
