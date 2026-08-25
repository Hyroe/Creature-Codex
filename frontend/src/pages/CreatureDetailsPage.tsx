import {
  Box,
  Container,
  Stack,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { creatures } from '../features/creatures/data/creatures';

import { CreatureHero } from '../features/creatures/components/CreatureHero';
import { CreatureOverview } from '../features/creatures/components/CreatureOverview';
import { CreatureEcology } from '../features/creatures/components/CreatureEcology';
import { CreatureCombat } from '../features/creatures/components/CreatureCombat';
import { CreatureGallery } from '../features/creatures/components/CreatureGallery';
import { EmptyState } from '../components/common/EmptyState';

export function CreatureDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const creature = creatures.find(
    (creature) => creature.id === id,
  );

  if (!creature) {
    return (
      <EmptyState
        title="Creature Not Found"
        description="This creature does not exist in the Creature Codex."
        actionLabel="Back to Creatures"
        actionTo="/creatures"
      />
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