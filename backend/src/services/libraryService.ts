import { getPrisma } from '../lib/prisma';

export async function getElements() {
  return getPrisma().element.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getDamageTypes() {
  return getPrisma().damageType.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getBodyParts() {
  return getPrisma().bodyPart.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getHabitats() {
  return getPrisma().habitat.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getDiets() {
  return getPrisma().diet.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getLibrarySummary() {
  const prisma = getPrisma();

  const [elements, damageTypes, bodyParts, habitats, diets] = await Promise.all(
    [
      prisma.element.count(),
      prisma.damageType.count(),
      prisma.bodyPart.count(),
      prisma.habitat.count(),
      prisma.diet.count(),
    ],
  );

  return {
    elements,
    damageTypes,
    bodyParts,
    habitats,
    diets,
  };
}

export async function getElementById(id: string) {
  const prisma = getPrisma();

  const element = await prisma.element.findUnique({
    where: { id },
  });

  if (!element) {
    return null;
  }

  const affinities = await prisma.creatureAffinity.findMany({
    where: {
      targetType: 'ELEMENT',
      targetId: id,
      creature: {
        status: 'PUBLISHED',
        archivedAt: null,
      },
    },
    include: {
      creature: {
        include: {
          images: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
          habitats: true,
          diets: true,
          affinities: true,
        },
      },
    },
  });

  return {
    entity: element,
    weaknesses: affinities
      .filter((affinity) => affinity.type === 'WEAKNESS')
      .map((affinity) => affinity.creature),
    resistances: affinities
      .filter((affinity) => affinity.type === 'RESISTANCE')
      .map((affinity) => affinity.creature),
  };
}

export async function getBodyPartById(id: string) {
  const prisma = getPrisma();

  const bodyPart = await prisma.bodyPart.findUnique({
    where: { id },
  });

  if (!bodyPart) {
    return null;
  }

  const affinities = await prisma.creatureAffinity.findMany({
    where: {
      targetType: 'BODY_PART',
      targetId: id,
      creature: {
        status: 'PUBLISHED',
        archivedAt: null,
      },
    },
    include: {
      creature: {
        include: {
          images: true,
          habitats: true,
          diets: true,
          affinities: true,
        },
      },
    },
  });

  return {
    entity: bodyPart,
    weaknesses: affinities
      .filter((affinity) => affinity.type === 'WEAKNESS')
      .map((affinity) => affinity.creature),

    resistances: affinities
      .filter((affinity) => affinity.type === 'RESISTANCE')
      .map((affinity) => affinity.creature),
  };
}

export async function getHabitatById(id: string) {
  const prisma = getPrisma();

  const habitat = await prisma.habitat.findUnique({
    where: { id },

    include: {
      creatures: {
        where: {
          creature: {
            status: 'PUBLISHED',
            archivedAt: null,
          },
        },
        include: {
          creature: {
            include: {
              images: true,
              habitats: true,
              diets: true,
              affinities: true,
            },
          },
        },
      },
    },
  });

  if (!habitat) {
    return null;
  }

  return {
    entity: habitat,
    creatures: habitat.creatures.map((relation) => relation.creature),
  };
}

export async function getDietById(id: string) {
  const prisma = getPrisma();

  const diet = await prisma.diet.findUnique({
    where: { id },

    include: {
      creatures: {
        where: {
          creature: {
            status: 'PUBLISHED',
            archivedAt: null,
          },
        },
        include: {
          creature: {
            include: {
              images: true,
              habitats: true,
              diets: true,
              affinities: true,
            },
          },
        },
      },
    },
  });

  if (!diet) {
    return null;
  }

  return {
    entity: diet,
    creatures: diet.creatures.map((relation) => relation.creature),
  };
}

export async function getDamageTypeById(id: string) {
  const prisma = getPrisma();

  const damageType = await prisma.damageType.findUnique({
    where: { id },
  });

  if (!damageType) {
    return null;
  }

  const affinities = await prisma.creatureAffinity.findMany({
    where: {
      targetType: 'DAMAGE_TYPE',
      targetId: id,
      creature: {
        status: 'PUBLISHED',
        archivedAt: null,
      },
    },
    include: {
      creature: {
        include: {
          images: true,
          habitats: true,
          diets: true,
          affinities: true,
        },
      },
    },
  });

  return {
    entity: damageType,
    weaknesses: affinities
      .filter((affinity) => affinity.type === 'WEAKNESS')
      .map((affinity) => affinity.creature),

    resistances: affinities
      .filter((affinity) => affinity.type === 'RESISTANCE')
      .map((affinity) => affinity.creature),
  };
}
