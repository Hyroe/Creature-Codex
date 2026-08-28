import { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

import {
  getHabitat,
  type RelationLibraryDetails,
} from '../services/libraryService';

export function HabitatDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<RelationLibraryDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    getHabitat(id)
      .then(setData)
      .catch((error) => {
        if (error instanceof Error && error.message === 'NOT_FOUND') {
          setNotFound(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !data) {
    return (
      <EmptyState
        title="Habitat Not Found"
        description="This habitat does not exist in the Creature Codex."
        actionLabel="Back to Habitats"
        actionTo="/library/habitats"
      />
    );
  }

  return (
    <LibraryEntityDetails
      eyebrow="Library / Habitats"
      name={data.entity.name}
      description={data.entity.description ?? ''}
      type="Habitat"
    >
      <Stack spacing={3}>
        <Typography variant="h4">Documented Creatures</Typography>

        {data.creatures.length === 0 ? (
          <Typography color="text.secondary">
            No creatures have been documented in this habitat.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {data.creatures.map((creature) => (
              <Grid
                key={creature.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <LibraryCreatureCard creature={creature} />
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </LibraryEntityDetails>
  );
}
