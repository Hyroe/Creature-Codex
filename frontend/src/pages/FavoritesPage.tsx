import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import BookmarkBorderOutlined from '@mui/icons-material/BookmarkBorderOutlined';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { CreatureGrid } from '../features/creatures/components/CreatureGrid';

import { getMyFavorites } from '../features/favorites/services/favoriteService';

import type { Creature } from '../features/creatures/types/creature';

export function FavoritesPage() {
  const navigate = useNavigate();

  const [creatures, setCreatures] = useState<Creature[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      try {
        setIsLoading(true);
        setError(null);

        const favorites = await getMyFavorites();

        if (active) {
          setCreatures(favorites.map((favorite) => favorite.creature));
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : 'Unable to load saved creatures',
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      active = false;
    };
  }, []);

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
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="overline" color="primary">
          YOUR COLLECTION
        </Typography>

        <Typography
          variant="h2"
          component="h1"
          sx={{
            mt: 0.5,
            mb: 1,
          }}
        >
          Saved Creatures
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 560,
          }}
        >
          Creatures you have saved for quick access and future reference.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!error && creatures.length === 0 && (
        <Box
          sx={{
            py: 10,
            textAlign: 'center',

            border: 1,
            borderStyle: 'dashed',
            borderColor: 'divider',

            borderRadius: 2,
          }}
        >
          <BookmarkBorderOutlined
            sx={{
              fontSize: 44,
              color: 'text.secondary',
              mb: 2,
            }}
          />

          <Typography variant="h5" sx={{ mb: 1 }}>
            No saved creatures
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Save creatures from the Codex and they will appear here.
          </Typography>

          <Button variant="outlined" onClick={() => navigate('/creatures')}>
            Explore Creatures
          </Button>
        </Box>
      )}

      {!error && creatures.length > 0 && (
        <Stack spacing={2.5}>
          <Typography variant="body2" color="text.secondary">
            {creatures.length === 1
              ? '1 saved creature'
              : `${creatures.length} saved creatures`}
          </Typography>

          <CreatureGrid creatures={creatures} />
        </Stack>
      )}
    </Box>
  );
}
