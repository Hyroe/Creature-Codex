import type { Prisma } from '@prisma/client';

export interface PublishValidationResult {
  canPublish: boolean;
  missingFields: string[];
}

type CreatureForPublish = Prisma.CreatureGetPayload<{
  include: {
    habitats: true;
    diets: true;
    images: true;
  };
}>;

export function validateCreatureForPublish(
  creature: CreatureForPublish,
): PublishValidationResult {
  const missingFields: string[] = [];

  if (!creature.name.trim()) {
    missingFields.push('name');
  }

  if (!creature.description.trim()) {
    missingFields.push('description');
  }

  if (creature.habitats.length === 0) {
    missingFields.push('habitat');
  }

  if (creature.diets.length === 0) {
    missingFields.push('diet');
  }

  if (!creature.attackStyle?.trim()) {
    missingFields.push('attack style');
  }

  const hasCoverImage = creature.images.some((image) => image.isCover);

  if (!hasCoverImage) {
    missingFields.push('cover image');
  }

  return {
    canPublish: missingFields.length === 0,

    missingFields,
  };
}
