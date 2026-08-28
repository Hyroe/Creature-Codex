import { apiFetch } from '../../../services/apiClient';

import type { Creature, ThreatLevel } from '../types/creature';

interface ApiCreature {
  id: string;
  slug: string;
  name: string;
  scientificName: string | null;
  description: string;
  threatLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';

  authorId: string;
  status: 'DRAFT' | 'PUBLISHED';

  behavior: string | null;
  lifeCycle: string | null;
  attackStyle: string | null;

  habitats: {
    habitatId: string;
  }[];

  diets: {
    dietId: string;
  }[];

  affinities: Creature['combat']['affinities'];

  images: {
    id: string;
    url: string;
    alt: string;
    caption: string | null;
    isCover: boolean;
    sortOrder: number;
  }[];
}

export interface LibraryEntity {
  id: string;
  name: string;
  description: string | null;
  icon?: string | null;
}

export interface AffinityLibraryDetails {
  entity: LibraryEntity;
  weaknesses: Creature[];
  resistances: Creature[];
}

export interface RelationLibraryDetails {
  entity: LibraryEntity;
  creatures: Creature[];
}

function mapThreatLevel(value: ApiCreature['threatLevel']): ThreatLevel {
  const levels: Record<ApiCreature['threatLevel'], ThreatLevel> = {
    LOW: 'Low',
    MODERATE: 'Moderate',
    HIGH: 'High',
    EXTREME: 'Extreme',
  };

  return levels[value];
}

export function mapCreature(creature: ApiCreature): Creature {
  const cover = creature.images.find((image) => image.isCover) ?? null;

  return {
    id: creature.id,
    slug: creature.slug,
    name: creature.name,
    scientificName: creature.scientificName ?? '',
    description: creature.description,
    threatLevel: mapThreatLevel(creature.threatLevel),

    authorId: creature.authorId,
    status: creature.status === 'PUBLISHED' ? 'Published' : 'Draft',

    ecology: {
      habitatIds: creature.habitats.map((item) => item.habitatId),
      dietIds: creature.diets.map((item) => item.dietId),
      behavior: creature.behavior ?? '',
      lifeCycle: creature.lifeCycle ?? '',
    },

    combat: {
      attackStyle: creature.attackStyle ?? '',
      affinities: creature.affinities,
    },

    gallery: {
      coverImage: cover
        ? {
            id: cover.id,
            url: cover.url,
            alt: cover.alt,
            caption: cover.caption ?? undefined,
          }
        : null,

      images: creature.images
        .filter((image) => !image.isCover)
        .map((image) => ({
          id: image.id,
          url: image.url,
          alt: image.alt,
          caption: image.caption ?? undefined,
        })),
    },
  };
}

export async function getCreatures(): Promise<Creature[]> {
  const response = await apiFetch('/api/creatures');

  if (!response.ok) {
    throw new Error('Unable to load creatures');
  }

  const data = await response.json();

  return data.creatures.map(mapCreature);
}

export async function getCreatureBySlug(slug: string): Promise<Creature> {
  const response = await apiFetch(`/api/creatures/${slug}`);

  if (response.status === 404) {
    throw new Error('CREATURE_NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load creature');
  }

  const data = await response.json();

  return mapCreature(data.creature);
}
