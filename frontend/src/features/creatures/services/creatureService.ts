import { apiFetch } from '../../../services/apiClient';

import type { Creature, ThreatLevel } from '../types/creature';
import { Diet } from '../types/diet';
import { Habitat } from '../types/habitat';

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
    habitat: {
      id: string;
      name: string;
      description: string | null;
      icon: string | null;
    };
  }[];

  diets: {
    dietId: string;
    diet: {
      id: string;
      name: string;
      description: string | null;
      icon: string | null;
    };
  }[];

  affinities: ApiAffinity[];

  images: {
    id: string;
    url: string;
    alt: string;
    caption: string | null;
    isCover: boolean;
    sortOrder: number;
  }[];
}

interface ApiAffinity {
  id: string;
  type: 'WEAKNESS' | 'RESISTANCE';
  targetType: 'ELEMENT' | 'DAMAGE_TYPE' | 'BODY_PART';
  targetId: string;
  description: string | null;

  target: {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
  } | null;
}

export interface CreatureEcology {
  habitatIds: string[];
  dietIds: string[];

  habitats: Habitat[];
  diets: Diet[];

  behavior: string;
  lifeCycle: string;
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

      habitats: creature.habitats.map((item) => ({
        id: item.habitat.id,
        name: item.habitat.name,
        description: item.habitat.description ?? '',
        icon: item.habitat.icon ?? undefined,
      })),

      diets: creature.diets.map((item) => ({
        id: item.diet.id,
        name: item.diet.name,
        description: item.diet.description ?? '',
        icon: item.diet.icon ?? undefined,
      })),

      behavior: creature.behavior ?? '',
      lifeCycle: creature.lifeCycle ?? '',
    },

    combat: {
      attackStyle: creature.attackStyle ?? '',

      affinities: creature.affinities
        .filter((affinity) => affinity.target != null)
        .map((affinity) => ({
          id: affinity.id,
          type: mapAffinityType(affinity.type),
          targetType: mapAffinityTargetType(affinity.targetType),
          targetId: affinity.targetId,
          description: affinity.description ?? undefined,

          target: {
            id: affinity.target!.id,
            name: affinity.target!.name,
            description: affinity.target!.description ?? '',
            icon: affinity.target!.icon ?? undefined,
          },
        })),
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

function mapAffinityType(type: 'WEAKNESS' | 'RESISTANCE') {
  return type === 'WEAKNESS' ? 'Weakness' : 'Resistance';
}

function mapAffinityTargetType(type: 'ELEMENT' | 'DAMAGE_TYPE' | 'BODY_PART') {
  switch (type) {
    case 'ELEMENT':
      return 'Element';

    case 'DAMAGE_TYPE':
      return 'DamageType';

    case 'BODY_PART':
      return 'BodyPart';
  }
}
