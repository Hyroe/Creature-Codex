import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { CreatureFilters, type ThreatFilter } from '../features/creatures/components/CreatureFilters';
import { CreatureGrid } from '../features/creatures/components/CreatureGrid';
import { creatures } from '../features/creatures/data/creatures';

export function CreaturesPage() {
  const [search, setSearch] = useState('');
  const [threat, setThreat] = useState<ThreatFilter>('All');

  const filteredCreatures = useMemo(() => {
    return creatures.filter((creature) => {
      const matchesSearch =
        creature.name.toLowerCase().includes(search.toLowerCase()) ||
        creature.scientificName.toLowerCase().includes(search.toLowerCase());

      const matchesThreat =
        threat === 'All' || creature.threatLevel === threat;

      return matchesSearch && matchesThreat;
    });
  }, [search, threat]);

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