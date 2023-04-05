import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import topTransactionsApi from './topTransactionsApi';
import {TopSearchedTransactionsList} from "./TopSearchedTransactionsList";
jest.mock('./topTransactionsApi', () => ({
    getTopTransactions: jest.fn(),
}))

describe('TopSearchedTransactionsList', () => {
    it('renders the top 5 searched transactions when data is available', async () => {
        const data = [
            { score: 10, transaction: 'tx1' },
            { score: 20, transaction: 'tx2' },
            { score: 30, transaction: 'tx3' },
            { score: 40, transaction: 'tx4' },
            { score: 50, transaction: 'tx5' },
        ];
        topTransactionsApi.getTopTransactions.mockResolvedValueOnce({ data });

        render(<TopSearchedTransactionsList />);

        await waitFor(() => {
            expect(screen.getByText('Top 5 Searched transactions')).toBeInTheDocument();
        });
        expect(screen.getByText(/score/)).toBeInTheDocument();
        expect(screen.getByText(/transaction/)).toBeInTheDocument();
        data.forEach(({score, transaction}) => {
            expect(screen.getByText(new RegExp(score))).toBeInTheDocument();
            expect(screen.getByText(new RegExp(transaction))).toBeInTheDocument();
        });
    });

    it('renders an error message', async () => {
        const errorMessage = 'Error fetching data';
        topTransactionsApi.getTopTransactions.mockRejectedValueOnce(new Error(errorMessage));

        render(<TopSearchedTransactionsList />);
        await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
        });
    });
});
