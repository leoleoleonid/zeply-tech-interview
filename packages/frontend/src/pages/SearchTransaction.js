import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
function SearchBitcoinTransaction() {
    const handleOnClick = () => {
        toast.info('TEST TEST TEST', { position: 'top-right' });
    }
    return (
        <div>
            <button onClick={handleOnClick}>toast</button>
            qweqweqweqweqweqwe test
        </div>
    );
}

export default SearchBitcoinTransaction;
