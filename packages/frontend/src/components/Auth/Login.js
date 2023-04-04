import {useContext, useState} from "react";
import {AuthContext} from "./AuthProvider";
import Container from "@mui/material/Container";
import {CssBaseline, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Login() {
    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h5">
                    Login in
                </Typography>
                    <TextField
                        data-testid='login-input'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="username"
                        name="username"
                        autoFocus
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <Button
                        data-testid="login-btn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => login(username)}
                    >
                        LogIn
                    </Button>
            </div>
        </Container>
    );
}