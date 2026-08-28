import { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

import {
  getDiet,
  type RelationLibraryDetails,
} from '../services/libraryService';

export function DietDetailsPage() {
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

    getDiet(id)
      .then(setData)
      .catch((error: unknown) => {
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
        title="Diet Not Found"
        description="This diet does not exist in the Creature Codex."
        actionLabel="Back to Diets"
        actionTo="/library/diets"
      />
    );
  }

  return (
    <LibraryEntityDetails
      eyebrow="Library / Diets"
      name={data.entity.name}
      description={data.entity.description ?? ''}
      type="Diet"
    >
      <Stack spacing={3}>
        <Typography variant="h4">Documented Creatures</Typography>

        {data.creatures.length === 0 ? (
          <Typography color="text.secondary">
            No creatures have been documented with this diet.
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
