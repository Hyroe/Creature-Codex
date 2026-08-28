import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import { LibrarySection } from '../components/LibrarySection';

import { getDiets, type LibraryEntity } from '../services/libraryService';

export function DietsLibraryPage() {
  const [entities, setEntities] = useState<LibraryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDiets()
      .then(setEntities)
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : 'Unable to load diets',
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
      title="Diets"
      description="Dietary classifications used to describe the feeding behavior of creatures."
      entities={entities}
      basePath="/library/diets"
    />
  );
}
