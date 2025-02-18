import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Outlet,
} from "react-router";
import Footer from './components/Footer';
const theme = createTheme();
export default function AuthRouterOutlet() {
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
            <Container >
                <Outlet />
            </Container>
            <Footer />
        </ThemeProvider>
    </main>
}