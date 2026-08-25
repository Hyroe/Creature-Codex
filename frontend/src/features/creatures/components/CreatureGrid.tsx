import { Grid } from '@mui/material';

import type { Creature } from '../types/creature';
import { CreatureCard } from './CreatureCard';

interface CreatureGridProps {
  creatures: Creature[];
}

export function CreatureGrid({ creatures }: CreatureGridProps) {
  return (
    <Grid container spacing={3}>
      {creatures.map((creature) => (
        <Grid key={creature.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <CreatureCard creature={creature} />
        </Grid>
      ))}
    </Grid>
  );
}