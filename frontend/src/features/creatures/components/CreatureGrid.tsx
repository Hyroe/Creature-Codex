import { Box } from '@mui/material';

import type { Creature } from '../types/creature';

import { CreatureCard } from './CreatureCard';

interface CreatureGridProps {
  creatures: Creature[];
}

export function CreatureGrid({ creatures }: CreatureGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',

        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
        },

        gap: {
          xs: 2.5,
          md: 3,
        },
      }}
    >
      {creatures.map((creature) => (
        <CreatureCard key={creature.id} creature={creature} />
      ))}
    </Box>
  );
}
