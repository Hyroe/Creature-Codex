import crypto from 'node:crypto';

import { getPrisma } from '../../src/lib/prisma';

interface CreateTestCreatureOptions {
  authorId: string;

  name?: string;

  status?: 'DRAFT' | 'PUBLISHED';

  threatLevel?: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';

  archived?: boolean;

  habitatId?: string;
  dietId?: string;

  withCover?: boolean;

  attackStyle?: string | null;
}

export async function createTestCreature({
  authorId,

  name,

  status = 'PUBLISHED',

  threatLevel = 'LOW',

  archived = false,

  habitatId,
  dietId,

  withCover = false,

  attackStyle = 'Claws and teeth',
}: CreateTestCreatureOptions) {
  const prisma = getPrisma();

  const id = crypto.randomUUID().slice(0, 8);

  const creatureName = name ?? `Test Creature ${id}`;

  return prisma.creature.create({
    data: {
      slug: `test-creature-${id}`,

      name: creatureName,

      scientificName: `Creatura testus ${id}`,

      description: `Description for ${creatureName}`,

      threatLevel,

      status,

      behavior: 'Test behavior',

      lifeCycle: 'Test life cycle',

      attackStyle,

      authorId,

      archivedAt: archived ? new Date() : null,

      ...(habitatId && {
        habitats: {
          create: {
            habitatId,
          },
        },
      }),

      ...(dietId && {
        diets: {
          create: {
            dietId,
          },
        },
      }),

      ...(withCover && {
        images: {
          create: {
            url: `https://example.com/${id}.jpg`,

            alt: creatureName,

            caption: null,

            isCover: true,

            sortOrder: 0,
          },
        },
      }),
    },
  });
}
