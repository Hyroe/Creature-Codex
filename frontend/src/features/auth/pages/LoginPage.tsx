import { Box, Container, Paper, Stack, Typography } from '@mui/material';

import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: { xs: 3, sm: 5 },
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h3">
                Welcome back
              </Typography>

              <Typography color="text.secondary">
                Sign in to your Creature Codex account.
              </Typography>
            </Stack>

            <LoginForm />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}