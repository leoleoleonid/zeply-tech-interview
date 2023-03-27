import {useState, useContext} from 'react';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {SubscribeOnTransactionsContext} from "../components/SubscribeOnTransactions/SubscribeOnTransactionsProvider";
import {WSConnectionContext} from "../components/WSConnectionProvider";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {debounce} from "lodash";

function SearchBitcoinTransaction() {
    const {subscribedOnTransactions, setSubscribesOnTransactions} = useContext(SubscribeOnTransactionsContext);
    const {ws} = useContext(WSConnectionContext);

    const handleChange = () => {
        setSubscribesOnTransactions(!subscribedOnTransactions);
        ws.send(JSON.stringify({
            op: (!subscribedOnTransactions ? "unconfirmed_sub" : "unconfirmed_unsub")
        }))
    }


    const [transactionHash, setTransactionHash] = useState('');
    const [response, setResponse] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        if (transactionHash && !validationError) {
            setValidationError(false)
            setIsLoading(true);
            fetch(`https://blockchain.info/rawtx/${transactionHash}`)
                .then(response => response.json())
                .then(data => {
                    delete data.tx;
                    console.log('data', data)
                    setIsLoading(false)
                    setResponse(data);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }
    const handleAddrChange = (e) => {
        const hashValue = e.target.value.trim();
        setValidationError(false)
        const isValidHash = (/^[a-fA-F0-9]{64}$/.test(hashValue));
        if (!isValidHash && hashValue) setValidationError('BTC address in not valid!');

        setTransactionHash(hashValue)
    }

    const debouncedHandleSearch = debounce(handleSearch, 300);


    return (
        <Container maxWidth="md">
            <Box marginTop={10}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={12}>
                                <FormControlLabel
                                    control={
                                        <Switch checked={subscribedOnTransactions} onChange={handleChange} name="gilad" />
                                    }
                                    label="Subscribe on all new transactions in BTC blockchain"
                                />
                            </Grid>
                            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                            <Grid item xs={12} md={4}>
                                <TextField
                                    variant='standard'
                                    label="Transaction hash"
                                    fullWidth
                                    value={transactionHash}
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
                                        <Typography>hash:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.hash}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>ver:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.ver}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>vin_sz:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.vin_sz}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>vout_sz:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.vout_sz}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>lock_time:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.lock_time}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>size:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.size}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>relayed_by:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.relayed_by}</Typography>
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <Typography>block_height:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.block_height}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Typography>tx_index:</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography>{response.tx_index}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </FormGroup>
                </FormControl>
            </Box>
        </Container>
    );
}

export default SearchBitcoinTransaction;
