import { prisma } from '../../src/lib/prisma';

export async function cleanupDatabase() {
  await prisma.user.deleteMany();
}