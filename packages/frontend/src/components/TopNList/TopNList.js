import Table from "../common/Table";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export const TopNList = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // axios.get('/top_searched_addresses?limit=5')
        //     .then(({data}) => {
                const data = [
                    {score: 123, address: 'qweqweqwe'}, {score: 32, address: 'dddddd'},{score: 333, address: 'dddddd'}
                ];
                const sorted = data.sort((a,b) => a.score > b.score ? -1 : 1 );
                const scoreToAddr = {};
                sorted.forEach((item) => {
                    scoreToAddr[item.score] = item.address;
                })
                setResponse(scoreToAddr);
                setIsLoading(false);
            // })
            // .catch(e => {
            //     setError(e)
            //     setIsLoading(false);
            // })
    }, [])


    return (
        <>
            {response && !isLoading && !error && (
                <>
                    <Table
                        data={response}
                        title="Top 5 Searched Addresses"
                        headers={["score", "Address"]}
                    />
                    <Divider style={{marginTop: '1rem', marginBottom: '1rem'}}/>
                </>
            )}

            {error && (
                <Alert severity="error" style={{ marginTop: '1rem' }}>
                    {JSON.stringify(error)}
                </Alert>
            )}
            {isLoading && <CircularProgress style={{ marginTop: '1rem' }} />}
        </>
    )
}