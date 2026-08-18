import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

interface LibraryEntityDetailsProps {
  eyebrow: string;
  name: string;
  description: string;
  type?: string;
  children?: React.ReactNode;
}

export function LibraryEntityDetails({
  eyebrow,
  name,
  description,
  type,
  children,
}: LibraryEntityDetailsProps) {
  return (
    <Box component="section">
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 5, md: 8 }}>
          <Stack spacing={2} sx={{ maxWidth: 800 }}>
            <Typography
              variant="overline"
              color="text.secondary"
            >
              {eyebrow}
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h1">
                {name}
              </Typography>

              {type && (
                <Chip
                  label={type}
                  variant="outlined"
                />
              )}
            </Stack>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          </Stack>

          <Divider />

          {children}
        </Stack>
      </Container>
    </Box>
  );
}