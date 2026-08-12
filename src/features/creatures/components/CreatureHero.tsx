import { Box, Container } from '@mui/material';

import type { Creature } from '../types/creature';
import { CreatureHeader } from './CreatureHeader';

interface CreatureHeroProps {
  creature: Creature;
}

export function CreatureHero({ creature }: CreatureHeroProps) {
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
          <Box
            component="img"
            src={creature.gallery.coverImage.url}
            alt={creature.name}
            sx={{
              width: '100%',
              height: { xs: 350, md: 550 },
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />

          <CreatureHeader creature={creature} />
        </Box>
      </Container>
    </Box>
  );
}