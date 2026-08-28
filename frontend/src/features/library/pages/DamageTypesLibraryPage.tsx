import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import { LibrarySection } from '../components/LibrarySection';

import { getDamageTypes, type LibraryEntity } from '../services/libraryService';

export function DamageTypesLibraryPage() {
  const [entities, setEntities] = useState<LibraryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDamageTypes()
      .then(setEntities)
      .catch((error) => {
        setError(
          error instanceof Error
            ? error.message
            : 'Unable to load damage types',
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <LibrarySection
      eyebrow="Library"
      title="Damage Types"
      description="Physical damage classifications used to describe how attacks affect creatures."
      entities={entities}
      basePath="/library/damage-types"
    />
  );
}
