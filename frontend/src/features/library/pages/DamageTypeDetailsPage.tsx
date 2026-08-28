import { useEffect, useState } from 'react';

import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';

import { useParams } from 'react-router-dom';

import { LibraryEntityDetails } from '../components/LibraryEntityDetails';
import { LibraryCreatureCard } from '../components/LibraryCreatureCard';
import { EmptyState } from '../../../components/common/EmptyState';

import {
  getDamageType,
  type AffinityLibraryDetails,
} from '../services/libraryService';

export function DamageTypeDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<AffinityLibraryDetails | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    getDamageType(id)
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
        title="Damage Type Not Found"
        description="This damage type does not exist in the Creature Codex."
        actionLabel="Back to Damage Types"
        actionTo="/library/damage-types"
      />
    );
  }

  return (
    <LibraryEntityDetails
      eyebrow="Library / Damage Types"
      name={data.entity.name}
      description={data.entity.description ?? ''}
      type="Damage Type"
    >
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Typography variant="h4">Weakness</Typography>

          {data.weaknesses.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures are weak to this damage type.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {data.weaknesses.map((creature) => (
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

        <Stack spacing={3}>
          <Typography variant="h4">Resistance</Typography>

          {data.resistances.length === 0 ? (
            <Typography color="text.secondary">
              No documented creatures resist this damage type.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {data.resistances.map((creature) => (
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
      </Stack>
    </LibraryEntityDetails>
  );
}
