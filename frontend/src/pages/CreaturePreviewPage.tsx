import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { Creature } from '../features/creatures/types/creature';

import {
  getMyCreatureById,
  updateCreatureStatus,
} from '../features/creatures/services/creatureService';

import { CreatureHero } from '../features/creatures/components/CreatureHero';
import { CreatureOverview } from '../features/creatures/components/CreatureOverview';
import { CreatureEcology } from '../features/creatures/components/CreatureEcology';
import { CreatureCombat } from '../features/creatures/components/CreatureCombat';
import { CreatureGallery } from '../features/creatures/components/CreatureGallery';

export function CreaturePreviewPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [creature, setCreature] = useState<Creature | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isPublishing, setIsPublishing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid creature id');
      setIsLoading(false);
      return;
    }

    async function loadCreature() {
      try {
        const data = await getMyCreatureById(id!);

        setCreature(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unable to load creature',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCreature();
  }, [id]);

  async function handlePublish() {
    if (!id || !creature) {
      return;
    }

    setError(null);
    setIsPublishing(true);

    try {
      await updateCreatureStatus(id, 'PUBLISHED');

      navigate(`/creatures/${creature.slug}`, {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to publish creature',
      );
    } finally {
      setIsPublishing(false);
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!creature) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error ?? 'Creature not found'}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Stack spacing={2}>
          <Alert severity="info">
            Preview mode — this creature is not public yet.
          </Alert>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(`/creatures/${creature.id}/edit`)}
            >
              Edit
            </Button>

            {creature.status === 'Draft' && (
              <Button
                variant="contained"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>

      <CreatureHero creature={creature} />

      <CreatureOverview creature={creature} />

      <CreatureEcology creature={creature} />

      <CreatureCombat creature={creature} />

      <CreatureGallery creature={creature} />
    </>
  );
}
