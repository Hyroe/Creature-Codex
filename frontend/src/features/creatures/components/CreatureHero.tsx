import { Box, Container } from '@mui/material';

import type { Creature } from '../types/creature';
import { CreatureHeader } from './CreatureHeader';
import { CreatureImage } from './CreatureImage';
import { ReactNode } from 'react';

interface CreatureHeroProps {
  creature: Creature;
  actions?: ReactNode;
}

export function CreatureHero({ creature, actions }: CreatureHeroProps) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'minmax(0, 1fr) minmax(0, 1fr)',
            },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          <CreatureImage
            src={creature.gallery.coverImage?.url}
            alt={creature.gallery.coverImage?.alt ?? creature.name}
            height={550}
          />

          <CreatureHeader creature={creature} actions={actions} />
        </Box>
      </Container>
    </Box>
  );
}
