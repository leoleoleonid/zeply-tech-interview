import {useState, useEffect, useContext} from 'react';
import {debounce} from 'lodash';
import {SubscribedAddressesList} from '../components/SubcribedAddresses/SubscribedAddressesList'
import {SubscribedAddressesContext} from "../components/SubcribedAddresses/SubscribedAddressProvider";

function SearchBitcoinAddress() {

    const { addSubscribedAddress , subscribedAddresses } = useContext(SubscribedAddressesContext);

    const [bitcoinAddress, setBitcoinAddress] = useState('');
    const [response, setResponse] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {


        if (bitcoinAddress && !validationError) {
            setValidationError(false)
            setIsLoading(true);
            fetch(`https://blockchain.info/rawaddr/${bitcoinAddress}`)
                .then(response => response.json())
                .then(data => {
                    data.confirmed_txs = (data.txs.filter(tx => tx.double_spend === false)).length;
                    setIsLoading(false);
                    setResponse(data);
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
                    <p>Number of confirmed transactions: {response.confirmed_txs}</p>
                    <p>Total BTC received: {response.total_received}</p>
                    <p>Total BTC spent: {response.total_sent}</p>
                    <p>Total BTC unspent: {response.final_balance}</p>
                    <p>Current address balance: {response.final_balance}</p>
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
