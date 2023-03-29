import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Grid} from "@mui/material";
import React from "react";

export default function Table({title, data, headers}) {
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <Grid container spacing={3} alignItems="center">
                {headers && headers.length && (
                    <>
                        <TableLine
                            column1={headers[0]}
                            column2={headers[1]}
                        />
                        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    </>
                )}
                {
                    data.map(([key, value]) => (
                        <TableLine
                            column1={key}
                            column2={value}
                        />
                    ))
                }
            </Grid>
        </>
    )
}
export const TableLine = ({column1, column2}) => {
    return (
        <>
            <Grid item xs={12} md={3} key={`col1_${column1}_${column2}`} >
                <Typography>{column1} : </Typography>
            </Grid>
            <Grid item xs={12} md={9} key={`col2_${column1}_${column2}`}>
                <Typography>{column2}</Typography>
            </Grid>
        </>
    )
}