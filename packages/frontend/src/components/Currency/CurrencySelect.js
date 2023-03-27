import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useContext} from "react";
import {CURRENCIES, CurrencyContext} from "./CurrencyProvider";

export default function CurrencySelect() {
    const {currency, setCurrency} = useContext(CurrencyContext);

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                >
                    <MenuItem value={CURRENCIES.BTC}>{CURRENCIES.BTC}</MenuItem>
                    <MenuItem value={CURRENCIES.USD}>{CURRENCIES.USD}</MenuItem>
                    <MenuItem value={CURRENCIES.EUR}>{CURRENCIES.EUR}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}