import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { LibraryEntityCard } from './LibraryEntityCard';

interface LibraryEntity {
  id: string;
  name: string;
  description: string;
  type?: string;
}

interface LibrarySectionProps {
  eyebrow: string;
  title: string;
  description: string;
  entities: LibraryEntity[];
  basePath: string;
}

export function LibrarySection({
  eyebrow,
  title,
  description,
  entities,
  basePath,
}: LibrarySectionProps) {
  return (
    <Box>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 5, md: 7 }}>
          <Stack
            spacing={2}
            sx={{
              maxWidth: 760,
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
            >
              {eyebrow}
            </Typography>

            <Typography variant="h2">
              {title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
              }}
            >
              {description}
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {entities.map((entity) => (
              <Grid
                key={entity.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <LibraryEntityCard
                  name={entity.name}
                  description={entity.description}
                  type={entity.type}
                  path={`${basePath}/${entity.id}`}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}