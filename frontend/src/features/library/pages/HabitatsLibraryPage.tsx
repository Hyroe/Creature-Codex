import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import { LibrarySection } from '../components/LibrarySection';

import { getHabitats, type LibraryEntity } from '../services/libraryService';

export function HabitatsLibraryPage() {
  const [entities, setEntities] = useState<LibraryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHabitats()
      .then(setEntities)
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : 'Unable to load habitats',
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
      title="Habitats"
      description="Known environments and ecosystems inhabited by documented creatures."
      entities={entities}
      basePath="/library/habitats"
    />
  );
}
