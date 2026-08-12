import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { creatures } from '../features/creatures/data/creatures';

import { CreatureHero } from '../features/creatures/components/CreatureHero';
import { CreatureOverview } from '../features/creatures/components/CreatureOverview';
import { CreatureEcology } from '../features/creatures/components/CreatureEcology';
import { CreatureCombat } from '../features/creatures/components/CreatureCombat';
import { CreatureGallery } from '../features/creatures/components/CreatureGallery';

export function CreatureDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const creature = creatures.find(
    (creature) => creature.id === id,
  );

  if (!creature) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h4">
            Creature not found
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            The creature you are looking for does not exist.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 6, md: 10 }}>
          <CreatureHero creature={creature} />

          <CreatureOverview creature={creature} />

          <CreatureEcology creature={creature} />

          <CreatureCombat creature={creature} />

          <CreatureGallery creature={creature} />
        </Stack>
      </Container>
    </Box>
  );
}