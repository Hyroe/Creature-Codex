import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

import {
  archiveCreature,
  getMyCreatures,
  updateCreatureStatus,
} from '../features/creatures/services/creatureService';

import type { Creature } from '../features/creatures/types/creature';

export function MyCreaturesPage() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCreatures() {
    try {
      const data = await getMyCreatures();
      setCreatures(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to load creatures',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCreatures();
  }, []);

  async function handleStatus(creature: Creature) {
    const nextStatus = creature.status === 'Published' ? 'DRAFT' : 'PUBLISHED';

    try {
      await updateCreatureStatus(creature.id, nextStatus);

      await loadCreatures();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to update creature',
      );
    }
  }

  async function handleArchive(creature: Creature) {
    try {
      await archiveCreature(creature.id);
      await loadCreatures();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to archive creature',
      );
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} sx={{ py: 6 }}>
        <Box>
          <Typography variant="overline" color="primary">
            CREATURE CODEX
          </Typography>

          <Typography variant="h2">My Creatures</Typography>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        {creatures.length === 0 ? (
          <Typography color="text.secondary">
            You have not created any creatures yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {creatures.map((creature) => (
              <Grid
                key={creature.id}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                }}
              >
                <Card variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 2,
                        }}
                      >
                        <Typography variant="h6">{creature.name}</Typography>

                        <Chip size="small" label={creature.status} />
                      </Box>

                      <Typography variant="body2" color="text.secondary">
                        {creature.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ flexWrap: 'wrap' }}
                      >
                        {creature.status === 'Published' && (
                          <Button
                            size="small"
                            component={Link}
                            to={`/creatures/${creature.slug}`}
                          >
                            View
                          </Button>
                        )}

                        <Button
                          size="small"
                          component={Link}
                          to={`/creatures/${creature.id}/edit`}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          onClick={() => handleStatus(creature)}
                        >
                          {creature.status === 'Published'
                            ? 'Unpublish'
                            : 'Publish'}
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleArchive(creature)}
                        >
                          Archive
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
