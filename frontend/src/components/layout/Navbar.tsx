import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../../features/auth/context/AuthContext';
import { Add } from '@mui/icons-material';

export function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();

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
            <Button color="inherit" component={Link} to="/my-creatures">
              My Creatures
            </Button>
            <Button color="inherit" component={Link} to="/library">
              Library
            </Button>
            <Button color="inherit" component={Link} to="/favorites">
              Saved
            </Button>
          </Box>

          <Box
            sx={{
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {!isLoading && !isAuthenticated && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>

                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}

            <Tooltip title="Create creature">
              <IconButton
                color="inherit"
                component={Link}
                to="/creatures/new"
                aria-label="Create creature"
              >
                <Add />
              </IconButton>
            </Tooltip>

            {!isLoading && isAuthenticated && user && (
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                startIcon={
                  <Avatar
                    src={user.avatarUrl ?? undefined}
                    sx={{
                      width: 28,
                      height: 28,
                    }}
                  >
                    {user.displayName?.[0] ?? user.username[0]}
                  </Avatar>
                }
              >
                Profile
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
