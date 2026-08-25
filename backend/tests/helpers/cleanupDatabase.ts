// test/helpers/cleanupDatabase.ts
import { getPrismaClient } from '../../src/lib/prisma';

export async function cleanupDatabase() {
  try {
    const prisma = getPrismaClient();
    
    // Use raw SQL for faster cleanup with CASCADE
    await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
    
    console.log(`[Worker ${process.env.VITEST_WORKER_ID}] Database cleaned up`);
  } catch (error) {
    console.error('Error cleaning up database:', error);
    throw error;
  }
}

// Alternative: cleanup specific tables
export async function cleanupSpecificTables(tables: string[]) {
  const prisma = getPrismaClient();
  const queries = tables.map(table => 
    prisma.$executeRaw`TRUNCATE TABLE "${table}" CASCADE;`
  );
  await Promise.all(queries);
}