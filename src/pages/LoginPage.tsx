import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store/store";
import { login } from "../store/auth-state";
import { useNavigate } from "react-router";

export default function LoginPage() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: IRootState) => state.auth.errorMsg)
    const navigate = useNavigate()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login({ username, password })).then(
            (res) => {
                if (res.type === 'login/fulfilled')
                    navigate('/app')
            })
            .catch((error) => {
                console.error(error);
            })
    };

    return (
        <Container maxWidth="xs" >
            <Box sx={{
                marginTop: '30px'
            }}>
                <Typography variant="h6">
                    Welcome to map-demo app! Please login
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 5
                }}
            >

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}