import { getPrisma } from '../lib/prisma';

import type {
  CreateCreatureInput,
  UpdateCreatureInput,
  UpdateCreatureStatusInput,
} from '../schemas/creatureSchemas';

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function createCreature(
  authorId: string,
  input: CreateCreatureInput,
) {
  const prisma = getPrisma();

  const baseSlug = createSlug(input.name);

  let slug = baseSlug;
  let suffix = 1;

  while (
    await prisma.creature.findUnique({
      where: { slug },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return prisma.creature.create({
    data: {
      slug,
      name: input.name,
      scientificName: input.scientificName ?? null,
      description: input.description,
      threatLevel: input.threatLevel,
      behavior: input.behavior ?? null,
      lifeCycle: input.lifeCycle ?? null,
      attackStyle: input.attackStyle ?? null,
      authorId,
    },
  });
}

export async function getCreatures() {
  const prisma = getPrisma();

  return prisma.creature.findMany({
    where: {
      status: 'PUBLISHED',
      archivedAt: null,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
      habitats: {
        include: {
          habitat: true,
        },
      },
      diets: {
        include: {
          diet: true,
        },
      },
      affinities: true,
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });
}

export async function getCreatureBySlug(slug: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      archivedAt: null,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
      habitats: {
        include: {
          habitat: true,
        },
      },
      diets: {
        include: {
          diet: true,
        },
      },
      affinities: true,
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });

  if (!creature) {
    return null;
  }

  const affinities = await resolveAffinityTargets(creature.affinities);

  return {
    ...creature,
    affinities,
  };
}

export async function updateCreature(
  creatureId: string,
  authorId: string,
  input: UpdateCreatureInput,
) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!creature) {
    throw new Error('CREATURE_NOT_FOUND');
  }

  if (creature.authorId !== authorId) {
    throw new Error('CREATURE_FORBIDDEN');
  }

  return prisma.creature.update({
    where: {
      id: creatureId,
    },
    data: input,
  });
}

export async function getMyCreatures(authorId: string) {
  const prisma = getPrisma();

  return prisma.creature.findMany({
    where: {
      authorId,
      archivedAt: null,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      habitats: {
        include: {
          habitat: true,
        },
      },
      diets: {
        include: {
          diet: true,
        },
      },
      affinities: true,
      images: {
        orderBy: {
          sortOrder: 'asc',
        },
      },
    },
  });
}

export async function updateCreatureStatus(
  creatureId: string,
  authorId: string,
  input: UpdateCreatureStatusInput,
) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!creature) {
    throw new Error('CREATURE_NOT_FOUND');
  }

  if (creature.authorId !== authorId) {
    throw new Error('CREATURE_FORBIDDEN');
  }

  return prisma.creature.update({
    where: {
      id: creatureId,
    },
    data: {
      status: input.status,
    },
  });
}

export async function archiveCreature(creatureId: string, authorId: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!creature) {
    throw new Error('CREATURE_NOT_FOUND');
  }

  if (creature.authorId !== authorId) {
    throw new Error('CREATURE_FORBIDDEN');
  }

  return prisma.creature.update({
    where: {
      id: creatureId,
    },
    data: {
      archivedAt: new Date(),
    },
  });
}

async function resolveAffinityTargets(
  affinities: {
    id: string;
    type: string;
    targetType: string;
    targetId: string;
    description: string | null;
  }[],
) {
  const prisma = getPrisma();

  return Promise.all(
    affinities.map(async (affinity) => {
      let target = null;

      switch (affinity.targetType) {
        case 'ELEMENT':
          target = await prisma.element.findUnique({
            where: {
              id: affinity.targetId,
            },
          });
          break;

        case 'DAMAGE_TYPE':
          target = await prisma.damageType.findUnique({
            where: {
              id: affinity.targetId,
            },
          });
          break;

        case 'BODY_PART':
          target = await prisma.bodyPart.findUnique({
            where: {
              id: affinity.targetId,
            },
          });
          break;
      }

      return {
        ...affinity,
        target,
      };
    }),
  );
}
