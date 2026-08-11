import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 720 }}>
          <Typography
            variant="overline"
            color="primary"
            sx={{ letterSpacing: '0.25em' }}
          >
            THE BESTIARY
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: {
                xs: '3rem',
                md: '5rem',
              },
              lineHeight: 1,
              my: 2,
            }}
          >
            Creature
            <br />
            Codex
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            A living catalogue of imagined creatures, their anatomy,
            behaviour, habitats, and forgotten histories.
          </Typography>

          <Button
            component={Link}
            to="/creatures"
            variant="contained"
            size="large"
          >
            Explore the Codex
          </Button>
        </Box>
      </Container>
    </Box>
  );
}