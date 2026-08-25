import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import type { Creature } from '../types/creature';
import {
  getCreatureWeaknesses,
  getCreatureResistances,
} from '../selectors/creatureSelectors';

import { CreatureAffinityList } from './CreatureAffinityList';

interface CreatureCombatProps {
  creature: Creature;
}

export function CreatureCombat({
  creature,
}: CreatureCombatProps) {
  const weaknesses = getCreatureWeaknesses(creature);
  const resistances = getCreatureResistances(creature);

  return (
    <Box component="section">
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">
            Combat
          </Typography>
        </Box>

        <Divider />

        <Stack spacing={2}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Attack Style
          </Typography>

          <Typography>
            {creature.combat.attackStyle}
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CreatureAffinityList
              title="Weaknesses"
              affinities={weaknesses}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CreatureAffinityList
              title="Resistances"
              affinities={resistances}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}