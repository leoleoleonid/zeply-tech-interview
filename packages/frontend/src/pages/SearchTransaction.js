import {useState, useEffect, useContext} from 'react';
import {toast} from 'react-toastify'
import Switch from '@mui/material/Switch';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {SubscribeOnTransactionsContext} from "../components/SubscribeOnTransactions/SubscribeOnTransactionsProvider";
import {WSConnectionContext} from "../components/WSConnectionProvider";
function SearchBitcoinTransaction() {
    const {subscribedOnTransactions, setSubscribesOnTransactions} = useContext(SubscribeOnTransactionsContext);
    const {ws} = useContext(WSConnectionContext);
    const handleChange = () => {
        setSubscribesOnTransactions(!subscribedOnTransactions);
        ws.send(JSON.stringify({
            op: (!subscribedOnTransactions ? "unconfirmed_sub" : "unconfirmed_unsub")
        }))
    }

    return (
        <div>
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Search transactions in BTC blockchain</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={subscribedOnTransactions} onChange={handleChange} name="gilad" />
                        }
                        label="Subscribe on all new transactions in BTC blockchain"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}

export default SearchBitcoinTransaction;
