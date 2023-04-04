import React, {useState, useEffect} from 'react';
import currencyApi from "./currencyApi";

export const CURRENCIES = {
    BTC: 'BTC',
    EUR: 'EUR',
    USD: 'USD',
};

const PAIRS = ['BTC-USD', 'BTC-EUR']
export const CurrencyContext = React.createContext(CURRENCIES.BTC);

function CurrencyProvider({children}) {
    const [currency, setCurrency] = useState(CURRENCIES.BTC);
    const [tickers, setTickers] = useState(null);

    const calculatePrice = (price) => {
        if (currency === CURRENCIES.BTC) return price/100000000;
        if (currency === CURRENCIES.EUR) return price * tickers['BTC-EUR']/100000000;
        return price * tickers['BTC-USD']/100000000;
    }

    useEffect(() => {
        currencyApi.getTickers().then(response => {
            const tickers = {};
            response.data
                .filter(ticker => PAIRS.includes(ticker.symbol))
                .map(ticker => tickers[ticker.symbol] = ticker.price_24h)

            setTickers(tickers)
        })
    }, [])

    return (
        <CurrencyContext.Provider
            value={{currency, setCurrency, tickers, calculatePrice}}>
            {children}
        </CurrencyContext.Provider>
    );
}

export default CurrencyProvider;