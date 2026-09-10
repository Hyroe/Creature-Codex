import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

import {
  CreatureFilters,
  type ThreatFilter,
} from '../features/creatures/components/CreatureFilters';

import { CreatureGrid } from '../features/creatures/components/CreatureGrid';

import { getCreatures } from '../features/creatures/services/creatureService';

import type { Creature } from '../features/creatures/types/creature';

import { useDebounce } from '../hooks/useDebounce';

function mapThreatFilter(
  threat: ThreatFilter,
): 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME' | undefined {
  switch (threat) {
    case 'Low':
      return 'LOW';

    case 'Moderate':
      return 'MODERATE';

    case 'High':
      return 'HIGH';

    case 'Extreme':
      return 'EXTREME';

    case 'All':
    default:
      return undefined;
  }
}

export function CreaturesPage() {
  const [creatures, setCreatures] = useState<Creature[]>([]);

  const [search, setSearch] = useState('');

  const [threat, setThreat] = useState<ThreatFilter>('All');

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let active = true;

    async function loadCreatures() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getCreatures({
          search: debouncedSearch.trim() || undefined,

          threatLevel: mapThreatFilter(threat),

          page,

          limit: 12,
        });

        if (!active) {
          return;
        }

        setCreatures(result.creatures);

        setTotalPages(result.pagination.totalPages);

        setTotal(result.pagination.total);
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error ? error.message : 'Unable to load creatures',
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadCreatures();

    return () => {
      active = false;
    };
  }, [debouncedSearch, threat, page]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleThreatChange(value: ThreatFilter) {
    setThreat(value);
    setPage(1);
  }

  return (
    <Box>
      {/* HEADER */}
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

      {/* FILTERS */}
      <CreatureFilters
        search={search}
        threat={threat}
        onSearchChange={handleSearchChange}
        onThreatChange={handleThreatChange}
      />

      {/* ERROR */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {/* CONTENT */}
      <Box
        sx={{
          mt: 4,
          minHeight: 300,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        ) : creatures.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              No creatures found
            </Typography>

            <Typography color="text.secondary">
              Try changing your search or threat level.
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {total === 1 ? '1 creature' : `${total} creatures`}
              </Typography>
            </Box>

            <CreatureGrid creatures={creatures} />
          </>
        )}
      </Box>

      {/* PAGINATION */}
      {!isLoading && !error && totalPages > 1 && (
        <Stack
          sx={{
            alignItems: 'center',
            mt: 5,
            mb: 2,
          }}
        >
          <Pagination
            page={page}
            count={totalPages}
            onChange={(_event, value) => {
              setPage(value);

              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </Box>
  );
}
