import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Outlet,
    useNavigate,
} from "react-router";
import AccountMenu from './components/AccountMenu';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { authActions } from './store/auth-state';
const theme = createTheme();

export default function RouterOutlet() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    function handleLogOut() {
        dispatch(authActions.logout())
        navigate('/login');
    }
    return <main>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Header */}
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        map-demo
                    </Typography>
                    <AccountMenu onLogOut={handleLogOut} />
                </Toolbar>
            </AppBar>
            <Outlet />
        </ThemeProvider>
    </main>
}