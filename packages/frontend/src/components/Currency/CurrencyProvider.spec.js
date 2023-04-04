import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import currencyApi from './currencyApi';
import CurrencyProvider, { CURRENCIES, CurrencyContext } from './CurrencyProvider';

jest.mock('./currencyApi', () => ({
    getTickers: jest.fn(),
}));

describe('CurrencyProvider', () => {
    beforeEach(() => {
        currencyApi.getTickers.mockResolvedValue({
            data: [
                { symbol: 'BTC-USD', price_24h: 50000 },
                { symbol: 'BTC-EUR', price_24h: 40000 },
            ],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should calculate price based on currency and tickers', async () => {
        const INITIAL_BTC_AMOUNT = 100000000;
        render(
            <CurrencyProvider>
                <CurrencyContext.Consumer>
                    {({ calculatePrice, setCurrency, currency }) => (
                        <>
                            <div data-testid="currency-div">{currency}</div>
                            <div data-testid="price-div">{calculatePrice(INITIAL_BTC_AMOUNT)}</div>
                            <button data-testid="btn-eur" onClick={() => setCurrency(CURRENCIES.EUR)}>Change to EUR</button>
                            <button data-testid="btn-usd" onClick={() => setCurrency(CURRENCIES.USD)}>Change to USD</button>
                            <button data-testid="btn-btc" onClick={() => setCurrency(CURRENCIES.BTC)}>Change to BTC</button>
                        </>
                    )}
                </CurrencyContext.Consumer>
            </CurrencyProvider>
        );


        await waitFor(() => {
            expect(screen.getByTestId('currency-div').textContent).toBe(CURRENCIES.BTC);
        });

        fireEvent.click(screen.getByTestId('btn-eur'))
        expect(screen.getByTestId('currency-div').textContent).toBe(CURRENCIES.EUR);
        expect(screen.getByTestId('price-div').textContent).toBe("40000");

        fireEvent.click(screen.getByTestId('btn-usd'))
        expect(screen.getByTestId('currency-div').textContent).toBe(CURRENCIES.USD);
        expect(screen.getByTestId('price-div').textContent).toBe("50000");

        fireEvent.click(screen.getByTestId('btn-btc'))
        expect(screen.getByTestId('currency-div').textContent).toBe(CURRENCIES.BTC);
        expect(screen.getByTestId('price-div').textContent).toBe("1");
    });
});
