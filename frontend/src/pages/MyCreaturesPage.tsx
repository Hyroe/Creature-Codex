import { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import {
  archiveCreature,
  getMyCreatures,
  updateCreatureStatus,
} from '../features/creatures/services/creatureService';

import type { Creature } from '../features/creatures/types/creature';

import { MyCreaturesHeader } from '../features/creatures/components/MyCreaturesHeader';

import { MyCreaturesStats } from '../features/creatures/components/MyCreaturesStats';

import {
  MyCreaturesFilters,
  type SortOption,
  type StatusFilter,
  type ThreatFilter,
} from '../features/creatures/components/MyCreaturesFilters';

import { MyCreatureCard } from '../features/creatures/components/MyCreatureCard';

export function MyCreaturesPage() {
  const navigate = useNavigate();

  const [creatures, setCreatures] = useState<Creature[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const [threatFilter, setThreatFilter] = useState<ThreatFilter>('ALL');

  const [sort, setSort] = useState<SortOption>('UPDATED');

  async function loadCreatures() {
    try {
      setError(null);

      const data = await getMyCreatures();

      setCreatures(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to load creatures',
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCreatures();
  }, []);

  async function handleStatus(creature: Creature) {
    try {
      const nextStatus =
        creature.status === 'Published' ? 'DRAFT' : 'PUBLISHED';

      await updateCreatureStatus(creature.id, nextStatus);

      await loadCreatures();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to update creature',
      );
    }
  }

  async function handleArchive(creature: Creature) {
    const confirmed = window.confirm(`Archive ${creature.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      await archiveCreature(creature.id);

      await loadCreatures();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to archive creature',
      );
    }
  }

  const publishedCount = creatures.filter(
    (creature) => creature.status === 'Published',
  ).length;

  const draftCount = creatures.length - publishedCount;

  const filteredCreatures = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = creatures.filter((creature) => {
      const matchesSearch =
        !normalizedSearch ||
        creature.name.toLowerCase().includes(normalizedSearch) ||
        creature.description.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'PUBLISHED' && creature.status === 'Published') ||
        (statusFilter === 'DRAFT' && creature.status === 'Draft');

      const matchesThreat =
        threatFilter === 'ALL' || creature.threatLevel === threatFilter;

      return matchesSearch && matchesStatus && matchesThreat;
    });

    return [...result].sort((a, b) => {
      if (sort === 'NAME') {
        return a.name.localeCompare(b.name);
      }

      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;

      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

      return bTime - aTime;
    });
  }, [creatures, search, statusFilter, threatFilter, sort]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <MyCreaturesHeader onCreate={() => navigate('/creatures/new')} />

      <Container
        maxWidth="lg"
        sx={{
          pt: 4,
        }}
      >
        <Stack spacing={4}>
          {error && <Alert severity="error">{error}</Alert>}

          <MyCreaturesStats
            total={creatures.length}
            published={publishedCount}
            drafts={draftCount}
          />

          <MyCreaturesFilters
            search={search}
            status={statusFilter}
            threat={threatFilter}
            sort={sort}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
            onThreatChange={setThreatFilter}
            onSortChange={setSort}
          />

          {filteredCreatures.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                No creatures found
              </Typography>

              <Typography color="text.secondary">
                Try changing your filters or create a new creature.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 2.5,
              }}
            >
              {filteredCreatures.map((creature) => (
                <MyCreatureCard
                  key={creature.id}
                  creature={creature}
                  onStatus={() => handleStatus(creature)}
                  onArchive={() => handleArchive(creature)}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
