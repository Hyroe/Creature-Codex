import { apiFetch } from '../../../services/apiClient';

import {
  mapCreature,
  type ApiCreature,
} from '../../creatures/services/creatureService';

import type { CreatureFavorite } from '../types/favorite';

interface ApiFavorite {
  id: string;
  userId: string;
  creatureId: string;
  createdAt: string;

  creature: ApiCreature;
}

export async function getFavoriteStatus(slug: string): Promise<boolean> {
  const response = await apiFetch(`/api/creatures/${slug}/favorite`);

  if (!response.ok) {
    throw new Error('Unable to load favorite status');
  }

  const data = (await response.json()) as {
    isFavorite: boolean;
  };

  return data.isFavorite;
}

export async function addFavorite(slug: string): Promise<void> {
  const response = await apiFetch(`/api/creatures/${slug}/favorite`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Unable to save creature');
  }
}

export async function removeFavorite(slug: string): Promise<void> {
  const response = await apiFetch(`/api/creatures/${slug}/favorite`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Unable to remove saved creature');
  }
}

export async function getMyFavorites(): Promise<CreatureFavorite[]> {
  const response = await apiFetch('/api/users/me/favorites');

  if (!response.ok) {
    throw new Error('Unable to load saved creatures');
  }

  const data = (await response.json()) as ApiFavorite[];

  return data.map((favorite) => ({
    id: favorite.id,
    userId: favorite.userId,
    creatureId: favorite.creatureId,
    createdAt: favorite.createdAt,

    creature: mapCreature(favorite.creature),
  }));
}
