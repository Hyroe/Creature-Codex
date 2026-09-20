import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
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

  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialThreat = searchParams.get('threat') as ThreatFilter | null;

  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  const [threat, setThreat] = useState<ThreatFilter>(
    initialThreat &&
      ['All', 'Low', 'Moderate', 'High', 'Extreme'].includes(initialThreat)
      ? initialThreat
      : 'All',
  );

  const [page, setPage] = useState(() => {
    const value = Number(searchParams.get('page'));

    return Number.isInteger(value) && value > 0 ? value : 1;
  });

  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) {
      params.set('search', debouncedSearch.trim());
    }

    if (threat !== 'All') {
      params.set('threat', threat);
    }

    if (page > 1) {
      params.set('page', String(page));
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [debouncedSearch, threat, page, setSearchParams]);

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

  function handleClearFilters() {
    setSearch('');
    setThreat('All');
    setPage(1);
  }

  function handleThreatChange(value: ThreatFilter) {
    setThreat(value);
    setPage(1);
  }

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: {
            xs: 4,
            md: 5,
          },
        }}
      >
        <Typography
          variant="overline"
          color="primary"
          sx={{
            letterSpacing: '0.1em',
          }}
        >
          THE BESTIARY
        </Typography>

        <Typography
          variant="h2"
          component="h1"
          sx={{
            mt: 0.5,
            mb: 1,
          }}
        >
          Creature Library
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 560,
            fontSize: {
              md: '1.05rem',
            },
          }}
        >
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
              py: {
                xs: 7,
                md: 10,
              },

              px: 3,

              border: 1,
              borderStyle: 'dashed',
              borderColor: 'divider',
              borderRadius: 2,

              textAlign: 'center',

              backgroundColor: 'rgba(255, 255, 255, 0.015)',
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
              No creatures found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mb: 3,
                maxWidth: 420,
                mx: 'auto',
              }}
            >
              No creatures match your current search and threat level.
            </Typography>

            {(search || threat !== 'All') && (
              <Button variant="outlined" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
          </Box>
        ) : (
          <>
            <Stack
              component="div"
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                mb: 2.5,
              }}
            >
              <Box>
                <Typography variant="h6" component="h2">
                  Creatures
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {total === 1
                    ? '1 creature found'
                    : `${total} creatures found`}
                </Typography>
              </Box>
            </Stack>

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
