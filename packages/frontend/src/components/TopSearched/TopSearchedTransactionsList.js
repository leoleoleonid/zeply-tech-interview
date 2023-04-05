import Table from "../common/Table";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import topTransactionsApi from "./topTransactionsApi";

export const TopSearchedTransactionsList = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        topTransactionsApi.getTopTransactions()
            .then(({data}) => {
                const scoreToAddr = data.map(({score, transaction}) => {
                    return [score, transaction]
                })
                setResponse(scoreToAddr);
                setIsLoading(false);
            })
            .catch(e => {
                setError(e)
                setIsLoading(false);
            })
    }, [])


    return (
        <>
            {response && !isLoading && !error && (
                <>
                    <Table
                        data={response}
                        title="Top 5 Searched transactions"
                        headers={["score", "Transaction"]}
                    />
                    <Divider style={{marginTop: '1rem', marginBottom: '1rem'}}/>
                </>
            )}

            {error && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>
                    {JSON.stringify(error.message)}
                </Alert>
            )}
            {isLoading && <CircularProgress data-testid='loader' style={{ marginTop: '1rem' }} />}
        </>
    )
}