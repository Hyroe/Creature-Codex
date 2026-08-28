import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
} from '@mui/material';

import { LibraryHero } from '../features/library/components/LibraryHero';
import { LibraryCategoryCard } from '../features/library/components/LibraryCategoryCard';

import {
  getLibrarySummary,
  type LibrarySummary,
} from '../features/library/services/libraryService';

export function LibraryPage() {
  const [summary, setSummary] = useState<LibrarySummary | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getLibrarySummary();
        setSummary(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unable to load library',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !summary) {
    return <Alert severity="error">{error ?? 'Unable to load library'}</Alert>;
  }

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
                count={summary.elements}
                path="/library/elements"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Damage Types"
                description="Different forms of physical and special damage used in combat."
                count={summary.damageTypes}
                path="/library/damage-types"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Body Parts"
                description="Anatomical targets that can influence creature combat."
                count={summary.bodyParts}
                path="/library/body-parts"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Habitats"
                description="Environments and regions where creatures can be found."
                count={summary.habitats}
                path="/library/habitats"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <LibraryCategoryCard
                title="Diets"
                description="Dietary classifications used to describe creature behavior and ecology."
                count={summary.diets}
                path="/library/diets"
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
