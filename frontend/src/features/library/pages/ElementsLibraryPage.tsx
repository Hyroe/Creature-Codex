import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import { LibrarySection } from '../components/LibrarySection';

import { getElements, type LibraryEntity } from '../services/libraryService';

export function ElementsLibraryPage() {
  const [entities, setEntities] = useState<LibraryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getElements()
      .then(setEntities)
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : 'Unable to load elements',
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
      title="Elements"
      description="Elemental affinities documented throughout the Creature Codex."
      entities={entities}
      basePath="/library/elements"
    />
  );
}
