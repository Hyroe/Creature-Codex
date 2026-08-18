import { Box, Container, Grid, Stack } from '@mui/material';

import { LibraryHero } from '../features/library/components/LibraryHero';
import { LibraryCategoryCard } from '../features/library/components/LibraryCategoryCard';

export function LibraryPage() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 6, md: 8 }}>
          <LibraryHero />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Elements"
                description="Elemental affinities and interactions found throughout the creature ecosystem."
                count={6}
                path="/library/elements"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Damage Types"
                description="Different forms of physical and special damage used in combat."
                count={4}
                path="/library/damage-types"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Body Parts"
                description="Anatomical targets that can influence creature combat."
                count={12}
                path="/library/body-parts"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Habitats"
                description="Environments and regions where creatures can be found."
                count={8}
                path="/library/habitats"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Diets"
                description="Dietary classifications used to describe creature behavior and ecology."
                count={5}
                path="/library/diets"
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}