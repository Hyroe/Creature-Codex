import { useEffect, useMemo, useState } from 'react';

import { Alert, Box, CircularProgress, Typography } from '@mui/material';

import {
  CreatureFilters,
  type ThreatFilter,
} from '../features/creatures/components/CreatureFilters';

import { CreatureGrid } from '../features/creatures/components/CreatureGrid';

import { getCreatures } from '../features/creatures/services/creatureService';

import type { Creature } from '../features/creatures/types/creature';

export function CreaturesPage() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [search, setSearch] = useState('');
  const [threat, setThreat] = useState<ThreatFilter>('All');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCreatures() {
      try {
        const data = await getCreatures();
        setCreatures(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Unable to load creatures',
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCreatures();
  }, []);

  const filteredCreatures = useMemo(() => {
    return creatures.filter((creature) => {
      const matchesSearch =
        creature.name.toLowerCase().includes(search.toLowerCase()) ||
        creature.scientificName?.toLowerCase().includes(search.toLowerCase());

      const matchesThreat = threat === 'All' || creature.threatLevel === threat;

      return matchesSearch && matchesThreat;
    });
  }, [creatures, search, threat]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary">
          THE BESTIARY
        </Typography>

        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Creature Library
        </Typography>

        <Typography color="text.secondary">
          Explore the creatures documented within the Codex.
        </Typography>
      </Box>

      <CreatureFilters
        search={search}
        threat={threat}
        onSearchChange={setSearch}
        onThreatChange={setThreat}
      />

      <CreatureGrid creatures={filteredCreatures} />
    </Box>
  );
}
