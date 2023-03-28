import {useState, useEffect, useContext} from 'react';
import {debounce} from 'lodash';
import {SubscribedAddressesList} from '../components/SubcribedAddresses/SubscribedAddressesList'
import {SubscribedAddressesContext} from "../components/SubcribedAddresses/SubscribedAddressProvider";
import {CurrencyContext} from "../components/Currency/CurrencyProvider";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {TopSearchesAddressList} from "../components/TopSearched/TopSearchedAddressList";
import $api from "../http";
import {toast} from "react-toastify";
import axios from "axios";

function SearchBitcoinAddress() {

    const { addSubscribedAddress , subscribedAddresses } = useContext(SubscribedAddressesContext);
    const { currency, calculatePrice } = useContext(CurrencyContext);

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
            axios.get(`https://blockchain.info/rawaddr/${bitcoinAddress}`)
                .then(response => response.json())
                .then(data => {
                    data.confirmed_txs = (data.txs.filter(tx => tx.double_spend === false)).length;
                    setIsLoading(false);
                    setResponse({...data});
                    data.total_received = calculatePrice(data.total_received);
                    data.total_sent = calculatePrice(data.total_sent);
                    data.final_balance = calculatePrice(data.final_balance);
                    setResponseForCurrency(data);
                    $api.patch(`/address-search/new-search/${bitcoinAddress}`)
                        .catch(e => toast.error(e.message))
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
            addSubscribedAddress(bitcoinAddress)
        }
    };

    // TODO use Table component

    return (
        <Container maxWidth="md">
            <TopSearchesAddressList/>
            <Box marginTop={10}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField
                            variant='standard'
                            label="Bitcoin address"
                            fullWidth
                            value={bitcoinAddress}
                            onChange={handleAddrChange}
                            error={Boolean(validationError)}
                            helperText={validationError || ' '}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button variant="contained" color="primary" onClick={debouncedHandleSearch}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button variant="contained" color="secondary" onClick={handleSubscribe}>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
                {error && (
                    <Alert severity="error" style={{ marginTop: '1rem' }}>
                        {JSON.stringify(error)}
                    </Alert>
                )}
                {isLoading && <CircularProgress style={{ marginTop: '1rem' }} />}
                {!isLoading && !validationError && !error && response && (
                    <Box marginTop={3}>
                        <Typography variant="h6">Address Information</Typography>
                        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <Typography>Number of confirmed transactions:</Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{responseForCurrency.confirmed_txs}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography>Total {currency} received:</Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{responseForCurrency.total_received}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography>Total {currency} spent:</Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{responseForCurrency.total_sent}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography>Total {currency} unspent:</Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{responseForCurrency.final_balance}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Typography>Current address balance ({currency}):</Typography>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Typography>{responseForCurrency.final_balance}</Typography>
                            </Grid>
                        </Grid>
                        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    </Box>
                )}
                <SubscribedAddressesList />
            </Box>
        </Container>
    );

}

export default SearchBitcoinAddress;
