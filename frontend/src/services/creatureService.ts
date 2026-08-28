import { apiFetch } from './apiClient';

export interface CreatureListItem {
  id: string;
  slug: string;
  name: string;
  scientificName: string | null;
  description: string;
  threatLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  status: 'DRAFT' | 'PUBLISHED';
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  images: {
    id: string;
    url: string;
    alt: string;
    caption: string | null;
    isCover: boolean;
    sortOrder: number;
  }[];
}

export async function getCreatures(): Promise<{
  creatures: CreatureListItem[];
}> {
  const response = await apiFetch('/api/creatures');

  if (!response.ok) {
    throw new Error('Unable to load creatures');
  }

  return response.json();
}
