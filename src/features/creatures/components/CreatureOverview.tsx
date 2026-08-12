import { Box, Divider, Grid, Typography } from '@mui/material';

import type { Creature } from '../types/creature';
import { getCreatureHabitats } from '../selectors/creatureSelectors';

interface CreatureOverviewProps {
  creature: Creature;
}

export function CreatureOverview({ creature }: CreatureOverviewProps) {
  const habitats = getCreatureHabitats(creature);
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
        Overview
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="overline" color="text.secondary">
            HABITAT
          </Typography>

          <Typography variant="h6">
            {habitats.map((habitat) => habitat.name).join(', ')}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="overline" color="text.secondary">
            THREAT LEVEL
          </Typography>

          <Typography variant="h6">{creature.threatLevel}</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="overline" color="text.secondary">
            RECORD ID
          </Typography>

          <Typography variant="h6">{creature.id}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 6 }} />
    </Box>
  );
}
