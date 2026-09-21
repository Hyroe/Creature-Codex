import { getPrisma } from '../lib/prisma';

export async function favoriteCreature(userId: string, slug: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      archivedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!creature) {
    return null;
  }

  const favorite = await prisma.creatureFavorite.upsert({
    where: {
      userId_creatureId: {
        userId,
        creatureId: creature.id,
      },
    },

    update: {},

    create: {
      userId,
      creatureId: creature.id,
    },
  });

  return favorite;
}

export async function unfavoriteCreature(userId: string, slug: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      archivedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!creature) {
    return null;
  }

  await prisma.creatureFavorite.deleteMany({
    where: {
      userId,
      creatureId: creature.id,
    },
  });

  return true;
}

export async function getUserFavorites(userId: string) {
  const prisma = getPrisma();

  return prisma.creatureFavorite.findMany({
    where: {
      userId,

      creature: {
        status: 'PUBLISHED',
        archivedAt: null,
      },
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      creature: {
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
      },
    },
  });
}
