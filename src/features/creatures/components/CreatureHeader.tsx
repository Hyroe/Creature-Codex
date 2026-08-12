import { Box, Chip, Stack, Typography } from '@mui/material';

import type { Creature } from '../types/creature';
import { getCreatureHabitats } from '../selectors/creatureSelectors';

interface CreatureHeaderProps {
  creature: Creature;
}

export function CreatureHeader({ creature }: CreatureHeaderProps) {
  const habitats = getCreatureHabitats(creature);
  return (
    <Box>
      <Typography
        variant="overline"
        color="primary"
        sx={{ letterSpacing: '0.2em' }}
      >
        CREATURE RECORD
      </Typography>

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

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 3, fontStyle: 'italic' }}
      >
        {creature.scientificName}
      </Typography>

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

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        {habitats.map((habitat) => (
          <Chip key={habitat.id} label={`Habitat: ${habitat.name}`} />
        ))}
        <Chip
          label={`Threat: ${creature.threatLevel}`}
          color={creature.threatLevel === 'Extreme' ? 'error' : 'default'}
        />
      </Stack>
    </Box>
  );
}
