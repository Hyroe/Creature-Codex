// vitest.setup.ts
import { afterAll, beforeAll } from 'vitest';
import { setupTestDatabase, teardownTestDatabase } from './tests/helpers/dbManager';

beforeAll(async () => {
  await setupTestDatabase();
});

afterAll(async () => {
  await teardownTestDatabase();
});