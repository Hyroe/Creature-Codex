import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';

import type { Creature } from '../types/creature';
import {
  getCreatureHabitats,
  getCreatureDiets,
} from '../selectors/creatureSelectors';
import { Link } from 'react-router-dom';

interface CreatureEcologyProps {
  creature: Creature;
}

export function CreatureEcology({ creature }: CreatureEcologyProps) {
  const habitats = getCreatureHabitats(creature);
  const diets = getCreatureDiets(creature);

  return (
    <Box component="section">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">Ecology</Typography>
        </Box>

        <Divider />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Habitat
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                {habitats.map((habitat) => (
                  <Chip
                    key={habitat.id}
                    label={habitat.name}
                    component={Link}
                    clickable
                    to={`/library/habitats/${habitat.id}`}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Diet
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                {diets.map((diet) => (
                  <Chip
                    key={diet.id}
                    label={diet.name}
                    component={Link}
                    clickable
                    to={`/library/diets/${diet.id}`}
                  />
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Behavior
              </Typography>

              <Typography>{creature.ecology.behavior}</Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" color="text.secondary">
                Life Cycle
              </Typography>

              <Typography>{creature.ecology.lifeCycle}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
