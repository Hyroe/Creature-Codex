import crypto from 'node:crypto';

import { getPrisma } from '../../src/lib/prisma';

export async function createTestTaxonomy() {
  const prisma = getPrisma();

  const id = crypto.randomUUID().slice(0, 8);

  const habitat = await prisma.habitat.create({
    data: {
      name: `Test Forest ${id}`,
      description: 'Test habitat',
    },
  });

  const diet = await prisma.diet.create({
    data: {
      name: `Test Carnivore ${id}`,
      description: 'Test diet',
    },
  });

  const element = await prisma.element.create({
    data: {
      name: `Test Fire ${id}`,
      description: 'Test element',
    },
  });

  const damageType = await prisma.damageType.create({
    data: {
      name: `Test Slash ${id}`,
      description: 'Test damage type',
    },
  });

  const bodyPart = await prisma.bodyPart.create({
    data: {
      name: `Test Wing ${id}`,
      description: 'Test body part',
    },
  });

  return {
    habitat,
    diet,
    element,
    damageType,
    bodyPart,
  };
}
