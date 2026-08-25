import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export function createPrismaClient(databaseUrl?: string) {
  const connectionString =
    databaseUrl || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      'DATABASE_URL environment variable is not defined',
    );
  }

  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

let prismaInstance: PrismaClient | null = null;

export function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = createPrismaClient();
  }

  return prismaInstance;
}

export function getPrisma() {
  return getPrismaClient();
}

export async function setTestDatabase(databaseUrl: string) {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
  }

  prismaInstance = createPrismaClient(databaseUrl);
}

export async function disconnectPrisma() {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = null;
  }
}