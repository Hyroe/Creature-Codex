import { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

import { CreatureHero } from '../features/creatures/components/CreatureHero';
import { CreatureOverview } from '../features/creatures/components/CreatureOverview';
import { CreatureEcology } from '../features/creatures/components/CreatureEcology';
import { CreatureCombat } from '../features/creatures/components/CreatureCombat';
import { CreatureGallery } from '../features/creatures/components/CreatureGallery';
import { EmptyState } from '../components/common/EmptyState';

import { getCreatureBySlug } from '../features/creatures/services/creatureService';

import type { Creature } from '../features/creatures/types/creature';
import { CreatureComments } from '../features/comments/components/CreatureComments';
import { FavoriteButton } from '../features/favorites/components/FavoriteButton';

export function CreatureDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [creature, setCreature] = useState<Creature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    async function loadCreature() {
      try {
        const data = await getCreatureBySlug(slug!);
        setCreature(data);
      } catch (error) {
        if (error instanceof Error && error.message === 'CREATURE_NOT_FOUND') {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCreature();
  }, [slug]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound || !creature) {
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
          <CreatureHero
            creature={creature}
            actions={<FavoriteButton slug={creature.slug} />}
          />
          <CreatureOverview creature={creature} />
          <CreatureEcology creature={creature} />
          <CreatureCombat creature={creature} />
          <CreatureGallery creature={creature} />
          <CreatureComments slug={creature.slug} />
        </Stack>
      </Container>
    </Box>
  );
}
