import { BookmarkBorderOutlined, BookmarkOutlined } from '@mui/icons-material';

import { Button, CircularProgress, Tooltip } from '@mui/material';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../auth/context/AuthContext';

import {
  addFavorite,
  getFavoriteStatus,
  removeFavorite,
} from '../services/favoriteService';

interface FavoriteButtonProps {
  slug: string;
}

export function FavoriteButton({ slug }: FavoriteButtonProps) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);

  const [isLoading, setIsLoading] = useState(Boolean(user));

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      setIsLoading(false);
      return;
    }

    let active = true;

    async function loadStatus() {
      try {
        setIsLoading(true);

        const result = await getFavoriteStatus(slug);

        if (active) {
          setIsFavorite(result);
        }
      } catch {
        if (active) {
          setIsFavorite(false);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadStatus();

    return () => {
      active = false;
    };
  }, [slug, user]);

  async function handleClick() {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isUpdating) {
      return;
    }

    setIsUpdating(true);

    try {
      if (isFavorite) {
        await removeFavorite(slug);
        setIsFavorite(false);
      } else {
        await addFavorite(slug);
        setIsFavorite(true);
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <Tooltip
      title={isFavorite ? 'Remove from saved creatures' : 'Save creature'}
    >
      <span>
        <Button
          variant={isFavorite ? 'contained' : 'outlined'}
          startIcon={
            isLoading || isUpdating ? (
              <CircularProgress size={16} color="inherit" />
            ) : isFavorite ? (
              <BookmarkOutlined />
            ) : (
              <BookmarkBorderOutlined />
            )
          }
          onClick={handleClick}
          disabled={isLoading || isUpdating}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </Button>
      </span>
    </Tooltip>
  );
}
