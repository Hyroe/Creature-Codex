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

  const [habitats, diets, elements, damageTypes, bodyParts] = await Promise.all(
    [
      prisma.habitat.findMany({
        where: {
          id: {
            in: input.habitatIds,
          },
        },
        select: { id: true },
      }),

      prisma.diet.findMany({
        where: {
          id: {
            in: input.dietIds,
          },
        },
        select: { id: true },
      }),

      prisma.element.findMany({
        where: {
          id: {
            in: input.affinities
              .filter((item) => item.targetType === 'ELEMENT')
              .map((item) => item.targetId),
          },
        },
        select: { id: true },
      }),

      prisma.damageType.findMany({
        where: {
          id: {
            in: input.affinities
              .filter((item) => item.targetType === 'DAMAGE_TYPE')
              .map((item) => item.targetId),
          },
        },
        select: { id: true },
      }),

      prisma.bodyPart.findMany({
        where: {
          id: {
            in: input.affinities
              .filter((item) => item.targetType === 'BODY_PART')
              .map((item) => item.targetId),
          },
        },
        select: { id: true },
      }),
    ],
  );

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

      habitats: {
        create: input.habitatIds.map((habitatId) => ({
          habitatId,
        })),
      },

      diets: {
        create: input.dietIds.map((dietId) => ({
          dietId,
        })),
      },

      affinities: {
        create: input.affinities.map((affinity) => ({
          type: affinity.type,
          targetType: affinity.targetType,
          targetId: affinity.targetId,
          description: affinity.description ?? null,
        })),
      },

      images: {
        create: [
          ...(input.coverImageUrl
            ? [
                {
                  url: input.coverImageUrl,
                  alt: input.name,
                  caption: null,
                  isCover: true,
                  sortOrder: 0,
                },
              ]
            : []),

          ...input.galleryImages.map((image, index) => ({
            url: image.url,
            alt: image.alt || input.name,
            caption: image.caption ?? null,
            isCover: false,
            sortOrder: index + 1,
          })),
        ],
      },
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
  userId: string,
  creatureId: string,
  input: UpdateCreatureInput,
) {
  const prisma = getPrisma();

  const existing = await prisma.creature.findUnique({
    where: {
      id: creatureId,
    },
  });

  if (!existing) {
    throw new Error('CREATURE_NOT_FOUND');
  }

  if (existing.authorId !== userId) {
    throw new Error('CREATURE_FORBIDDEN');
  }

  return prisma.$transaction(async (tx) => {
    const creature = await tx.creature.update({
      where: {
        id: creatureId,
      },

      data: {
        name: input.name,
        scientificName: input.scientificName,
        description: input.description,
        threatLevel: input.threatLevel,

        behavior: input.behavior,
        lifeCycle: input.lifeCycle,
        attackStyle: input.attackStyle,

        habitats: input.habitatIds
          ? {
              deleteMany: {},
              create: input.habitatIds.map((habitatId) => ({
                habitatId,
              })),
            }
          : undefined,

        diets: input.dietIds
          ? {
              deleteMany: {},
              create: input.dietIds.map((dietId) => ({
                dietId,
              })),
            }
          : undefined,

        affinities: input.affinities
          ? {
              deleteMany: {},
              create: input.affinities.map((affinity) => ({
                type: affinity.type,
                targetType: affinity.targetType,
                targetId: affinity.targetId,
                description: affinity.description ?? null,
              })),
            }
          : undefined,
      },
    });

    if (input.coverImageUrl !== undefined) {
      if (input.coverImageUrl === null) {
        await tx.creatureImage.deleteMany({
          where: {
            creatureId,
            isCover: true,
          },
        });
      } else {
        const cover = await tx.creatureImage.findFirst({
          where: {
            creatureId,
            isCover: true,
          },
        });

        if (cover) {
          await tx.creatureImage.update({
            where: {
              id: cover.id,
            },
            data: {
              url: input.coverImageUrl,
              alt: input.name ?? existing.name,
            },
          });
        } else {
          await tx.creatureImage.create({
            data: {
              creatureId,
              url: input.coverImageUrl,
              alt: input.name ?? existing.name,
              isCover: true,
              sortOrder: 0,
            },
          });
        }
      }

      if (input.galleryImages !== undefined) {
        await tx.creatureImage.deleteMany({
          where: {
            creatureId,
            isCover: false,
          },
        });

        if (input.galleryImages.length > 0) {
          await tx.creatureImage.createMany({
            data: input.galleryImages.map((image, index) => ({
              creatureId,

              url: image.url,

              alt: image.alt || input.name || existing.name,

              caption: image.caption ?? null,

              isCover: false,

              sortOrder: index + 1,
            })),
          });
        }
      }
    }

    return creature;
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

export async function getMyCreatureById(userId: string, creatureId: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      id: creatureId,
      authorId: userId,
      archivedAt: null,
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

  if (!creature) {
    return null;
  }

  const affinities = await resolveAffinityTargets(creature.affinities);

  return {
    ...creature,
    affinities,
  };
}
