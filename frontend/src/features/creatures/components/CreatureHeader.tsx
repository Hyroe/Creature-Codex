import type { ReactNode } from 'react';

import { Box, Chip, Stack, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

import type { Creature } from '../types/creature';

import { getCreatureHabitats } from '../selectors/creatureSelectors';

interface CreatureHeaderProps {
  creature: Creature;
  actions?: ReactNode;
}

export function CreatureHeader({ creature, actions }: CreatureHeaderProps) {
  const habitats = getCreatureHabitats(creature);

  return (
    <Box>
      <Typography
        variant="overline"
        color="primary"
        sx={{
          letterSpacing: '0.2em',
        }}
      >
        CREATURE RECORD
      </Typography>

      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        sx={{
          mt: 0.5,
          mb: 3,
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'flex-start',
          },
        }}
      >
        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: 1,
            }}
          >
            {creature.name}
          </Typography>

          {creature.scientificName && (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontStyle: 'italic',
              }}
            >
              {creature.scientificName}
            </Typography>
          )}
        </Box>

        {actions && (
          <Box
            sx={{
              flexShrink: 0,
              pt: {
                sm: 0.75,
              },
            }}
          >
            {actions}
          </Box>
        )}
      </Stack>

      <Typography
        color="text.secondary"
        sx={{
          maxWidth: 650,
          lineHeight: 1.8,
          mb: 3,
        }}
      >
        {creature.description}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{
          flexWrap: 'wrap',
        }}
      >
        {habitats.map((habitat) => (
          <Chip
            key={habitat.id}
            label={`Habitat: ${habitat.name}`}
            component={Link}
            clickable
            to={`/library/habitats/${habitat.id}`}
          />
        ))}

        <Chip
          label={`Threat: ${creature.threatLevel}`}
          color={creature.threatLevel === 'Extreme' ? 'error' : 'default'}
        />
      </Stack>
    </Box>
  );
}
