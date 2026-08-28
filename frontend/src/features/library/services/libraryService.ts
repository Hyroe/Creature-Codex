import { apiFetch } from '../../../services/apiClient';
import { mapCreature } from '../../creatures/services/creatureService';
import { Creature } from '../../creatures/types/creature';

export interface LibrarySummary {
  elements: number;
  damageTypes: number;
  bodyParts: number;
  habitats: number;
  diets: number;
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

export async function getLibrarySummary(): Promise<LibrarySummary> {
  const response = await apiFetch('/api/library/summary');

  if (!response.ok) {
    throw new Error('Unable to load library');
  }

  return response.json();
}
export async function getElement(id: string): Promise<AffinityLibraryDetails> {
  const response = await apiFetch(`/api/library/elements/${id}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load element');
  }

  const data = await response.json();

  return {
    entity: data.entity,
    weaknesses: data.weaknesses.map(mapCreature),
    resistances: data.resistances.map(mapCreature),
  };
}

export async function getBodyPart(id: string): Promise<AffinityLibraryDetails> {
  const response = await apiFetch(`/api/library/body-parts/${id}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load body part');
  }

  const data = await response.json();

  return {
    entity: data.entity,
    weaknesses: data.weaknesses.map(mapCreature),
    resistances: data.resistances.map(mapCreature),
  };
}

export async function getHabitat(id: string): Promise<RelationLibraryDetails> {
  const response = await apiFetch(`/api/library/habitats/${id}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load habitat');
  }

  const data = await response.json();

  return {
    entity: data.entity,
    creatures: data.creatures.map(mapCreature),
  };
}

export async function getDiet(id: string): Promise<RelationLibraryDetails> {
  const response = await apiFetch(`/api/library/diets/${id}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load diet');
  }

  const data = await response.json();

  return {
    entity: data.entity,
    creatures: data.creatures.map(mapCreature),
  };
}

export async function getElements(): Promise<LibraryEntity[]> {
  const response = await apiFetch('/api/library/elements');

  if (!response.ok) {
    throw new Error('Unable to load elements');
  }

  const data = await response.json();

  return data.elements;
}

export async function getDamageTypes(): Promise<LibraryEntity[]> {
  const response = await apiFetch('/api/library/damage-types');

  if (!response.ok) {
    throw new Error('Unable to load damage types');
  }

  const data = await response.json();

  return data.damageTypes;
}

export async function getBodyParts(): Promise<LibraryEntity[]> {
  const response = await apiFetch('/api/library/body-parts');

  if (!response.ok) {
    throw new Error('Unable to load body parts');
  }

  const data = await response.json();

  return data.bodyParts;
}

export async function getHabitats(): Promise<LibraryEntity[]> {
  const response = await apiFetch('/api/library/habitats');

  if (!response.ok) {
    throw new Error('Unable to load habitats');
  }

  const data = await response.json();

  return data.habitats;
}

export async function getDiets(): Promise<LibraryEntity[]> {
  const response = await apiFetch('/api/library/diets');

  if (!response.ok) {
    throw new Error('Unable to load diets');
  }

  const data = await response.json();

  return data.diets;
}

export async function getDamageType(
  id: string,
): Promise<AffinityLibraryDetails> {
  const response = await apiFetch(`/api/library/damage-types/${id}`);

  if (response.status === 404) {
    throw new Error('NOT_FOUND');
  }

  if (!response.ok) {
    throw new Error('Unable to load damage type');
  }

  const data = await response.json();

  return {
    entity: data.entity,
    weaknesses: data.weaknesses.map(mapCreature),
    resistances: data.resistances.map(mapCreature),
  };
}
