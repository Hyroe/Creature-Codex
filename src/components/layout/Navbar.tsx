import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 4 }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.08em',
              mr: 2,
            }}
          >
            CREATURE CODEX
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/creatures">
              Creatures
            </Button>

            <Button color="inherit" component={Link} to="/library">
              Library
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}