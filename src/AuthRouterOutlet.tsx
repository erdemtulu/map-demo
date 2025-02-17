import { AppBar, Box, Container, CssBaseline, Link, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Outlet,
} from "react-router";
const theme = createTheme();
export default function AuthRouterOutlet() {
    return <main>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Header */}
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        best
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ minHeight: 632 }}>
                <Outlet />
            </Container>
            <Box sx={{ backgroundColor: '#333', color: 'white', padding: '30px 0', textAlign: 'center' }}>
                <Typography variant="h6">
                    best
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Privacy Policy
                    </Link>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Terms & Conditions
                    </Link>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Help Center
                    </Link>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Contact Us
                    </Link>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{ marginBottom: 1 }}>
                        Follow Us
                    </Typography>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Facebook
                    </Link>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        Twitter
                    </Link>
                    <Link href="#" color="inherit" sx={{ margin: 1 }}>
                        LinkedIn
                    </Link>
                </Box>
            </Box>
        </ThemeProvider>
    </main>
}