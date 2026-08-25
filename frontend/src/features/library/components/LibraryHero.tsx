import { Box, Stack, Typography } from '@mui/material';

export function LibraryHero() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 760 }}>
        <Typography
          variant="overline"
          color="text.secondary"
        >
          Creature Codex
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '2.5rem',
              md: '4rem',
            },
          }}
        >
          Library
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Explore the classifications, environments and
          systems used to document the creatures of the
          Codex.
        </Typography>
      </Stack>
    </Box>
  );
}