import {useState, useEffect, useContext} from 'react';
import {debounce} from 'lodash';
import {SubscribedAddressesList} from '../components/SubcribedAddresses/SubscribedAddressesList'
import {SubscribedAddressesContext} from "../components/SubcribedAddresses/SubscribedAddressProvider";
import {CurrencyContext} from "../components/Currency/CurrencyProvider";

function SearchBitcoinAddress() {

    const { addSubscribedAddress , subscribedAddresses } = useContext(SubscribedAddressesContext);
    const { currency, rawCalculatePrice: calculatePrice } = useContext(CurrencyContext);

    const [bitcoinAddress, setBitcoinAddress] = useState('');
    const [response, setResponse] = useState(null);
    const [responseForCurrency, setResponseForCurrency] = useState(response);
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(response) {
            const newResponse = {...response}
            newResponse.total_received = calculatePrice(response.total_received);
            newResponse.total_sent = calculatePrice(response.total_sent);
            newResponse.final_balance = calculatePrice(response.final_balance);
            setResponseForCurrency(newResponse);
        }
    },[currency])

    const handleSearch = () => {
        if (bitcoinAddress && !validationError) {
            setValidationError(false)
            setIsLoading(true);
            fetch(`https://blockchain.info/rawaddr/${bitcoinAddress}`)
                .then(response => response.json())
                .then(data => {
                    data.confirmed_txs = (data.txs.filter(tx => tx.double_spend === false)).length;
                    setIsLoading(false);
                    setResponse({...data});
                    data.total_received = calculatePrice(data.total_received);
                    data.total_sent = calculatePrice(data.total_sent);
                    data.final_balance = calculatePrice(data.final_balance);
                    setResponseForCurrency(data);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }
    const handleAddrChange = (e) => {
        const addr = e.target.value.trim();
        setValidationError(false)
        const isValidAddress = (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(addr));
        if (!isValidAddress && addr) setValidationError('BTC address in not valid!');

        setBitcoinAddress(addr)
    }

    const debouncedHandleSearch = debounce(handleSearch, 300);

    const handleSubscribe = () => {
        if (!subscribedAddresses.includes(bitcoinAddress) && !validationError) {
            // TODO send new addr on server
            addSubscribedAddress(bitcoinAddress)
        }
    };

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <input type="text" value={bitcoinAddress} onChange={handleAddrChange} />
            <button onClick={debouncedHandleSearch}>Search</button>
            <button onClick={handleSubscribe}>Subscribe</button>
            {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
            {error && <p style={{ color: 'red' }}>{JSON.stringify(error)}</p>}
            {isLoading && <p>Loading...</p>}
            {!isLoading && !validationError && !error && response && (
                <div>
                    <p>Number of confirmed transactions: {responseForCurrency.confirmed_txs}</p>
                    <p>Total {currency} received: {responseForCurrency.total_received}</p>
                    <p>Total {currency} spent: {responseForCurrency.total_sent}</p>
                    <p>Total {currency} unspent: {responseForCurrency.final_balance}</p>
                    <p>Current address balance ({currency}): {responseForCurrency.final_balance}</p>
                </div>
            )}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <SubscribedAddressesList/>
        </div>

    );
}

export default SearchBitcoinAddress;
