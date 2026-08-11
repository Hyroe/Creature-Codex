import { Box, Grid, Typography } from '@mui/material';

import { creatures } from '../data/creatures';
import { CreatureCard } from './CreatureCard';

export function FeaturedCreatures() {
  return (
    <Box component="section">
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Creatures
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Discover some of the most remarkable creatures documented in the
        Codex.
      </Typography>

      <Grid container spacing={3}>
        {creatures.map((creature) => (
          <Grid key={creature.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CreatureCard creature={creature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}