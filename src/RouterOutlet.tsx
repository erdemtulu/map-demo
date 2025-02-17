import { AppBar, Box, Container, CssBaseline, Link, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Outlet,
} from "react-router";
const theme = createTheme();
export default function RouterOutlet() {
    return <main>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Header */}
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        map-demo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Outlet />
        </ThemeProvider>
    </main>
}