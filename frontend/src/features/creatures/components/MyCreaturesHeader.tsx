import { Add } from '@mui/icons-material';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

interface MyCreaturesHeaderProps {
  onCreate: () => void;
}

export function MyCreaturesHeader({ onCreate }: MyCreaturesHeaderProps) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        background:
          'linear-gradient(180deg, rgba(211,163,72,0.05) 0%, rgba(0,0,0,0) 100%)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: 5,
            md: 7,
          },
          pb: 4,
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={3}
          sx={{
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
          }}
        >
          <Box>
            <Typography variant="overline" color="primary">
              CREATURE CODEX
            </Typography>

            <Typography
              variant="h2"
              component="h1"
              sx={{
                mt: 0.5,
                mb: 1,
              }}
            >
              My Creatures
            </Typography>

            <Typography color="text.secondary">
              Create, manage and publish your creatures.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="large"
            startIcon={<Add />}
            onClick={onCreate}
          >
            Create Creature
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
