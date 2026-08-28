import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import { LibrarySection } from '../components/LibrarySection';

import { getBodyParts, type LibraryEntity } from '../services/libraryService';

export function BodyPartsLibraryPage() {
  const [entities, setEntities] = useState<LibraryEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBodyParts()
      .then(setEntities)
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : 'Unable to load body parts',
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
      title="Body Parts"
      description="Anatomical targets documented for creature identification and combat analysis."
      entities={entities}
      basePath="/library/body-parts"
    />
  );
}
