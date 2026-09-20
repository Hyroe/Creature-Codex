import request from 'supertest';

import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../../src/app';

import { cleanupDatabase } from '../../helpers/cleanupDatabase';

import { createAuthenticatedUser } from '../../helpers/createAuthenticatedUser';

import { createTestCreature } from '../../helpers/createTestCreature';

describe('GET /api/creatures', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  it('should return published creatures', async () => {
    const { user } = await createAuthenticatedUser();

    await createTestCreature({
      authorId: user.id,
      name: 'Ash Wyrm',
      status: 'PUBLISHED',
    });

    const response = await request(app).get('/api/creatures');

    expect(response.status).toBe(200);

    expect(response.body.items).toHaveLength(1);

    expect(response.body.items[0]).toMatchObject({
      name: 'Ash Wyrm',
      status: 'PUBLISHED',
    });
  });

  it('should not return draft creatures', async () => {
    const { user } = await createAuthenticatedUser();

    await createTestCreature({
      authorId: user.id,
      name: 'Published Beast',
      status: 'PUBLISHED',
    });

    await createTestCreature({
      authorId: user.id,
      name: 'Secret Draft',
      status: 'DRAFT',
    });

    const response = await request(app).get('/api/creatures');

    expect(response.status).toBe(200);

    expect(response.body.items).toHaveLength(1);

    expect(response.body.items[0].name).toBe('Published Beast');
  });

  it('should not return archived creatures', async () => {
    const { user } = await createAuthenticatedUser();

    await createTestCreature({
      authorId: user.id,
      name: 'Visible Beast',
    });

    await createTestCreature({
      authorId: user.id,
      name: 'Archived Beast',
      archived: true,
    });

    const response = await request(app).get('/api/creatures');

    expect(response.body.items).toHaveLength(1);

    expect(response.body.items[0].name).toBe('Visible Beast');
  });

  it('should filter creatures by search', async () => {
    const { user } = await createAuthenticatedUser();

    await createTestCreature({
      authorId: user.id,
      name: 'Ash Wyrm',
    });

    await createTestCreature({
      authorId: user.id,
      name: 'Frost Stalker',
    });

    const response = await request(app).get('/api/creatures').query({
      search: 'wyrm',
    });

    expect(response.status).toBe(200);

    expect(response.body.items).toHaveLength(1);

    expect(response.body.items[0].name).toBe('Ash Wyrm');
  });

  it('should filter creatures by threat level', async () => {
    const { user } = await createAuthenticatedUser();

    await createTestCreature({
      authorId: user.id,
      name: 'Harmless Beast',
      threatLevel: 'LOW',
    });

    await createTestCreature({
      authorId: user.id,
      name: 'Dangerous Beast',
      threatLevel: 'HIGH',
    });

    const response = await request(app).get('/api/creatures').query({
      threatLevel: 'HIGH',
    });

    expect(response.status).toBe(200);

    expect(response.body.items).toHaveLength(1);

    expect(response.body.items[0]).toMatchObject({
      name: 'Dangerous Beast',
      threatLevel: 'HIGH',
    });
  });

  it('should paginate creatures', async () => {
    const { user } = await createAuthenticatedUser();

    for (let index = 0; index < 5; index++) {
      await createTestCreature({
        authorId: user.id,
        name: `Creature ${index}`,
      });
    }

    const response = await request(app).get('/api/creatures').query({
      page: 2,
      limit: 2,
    });

    expect(response.status).toBe(200);

    expect(response.body.items).toHaveLength(2);

    expect(response.body.pagination).toEqual({
      page: 2,
      limit: 2,
      total: 5,
      totalPages: 3,
    });
  });

  it('should reject an invalid threat level', async () => {
    const response = await request(app).get('/api/creatures').query({
      threatLevel: 'CATASTROPHIC',
    });

    expect(response.status).toBe(400);
  });

  it('should reject page lower than 1', async () => {
    const response = await request(app).get('/api/creatures').query({
      page: 0,
    });

    expect(response.status).toBe(400);
  });

  it('should reject limit greater than 50', async () => {
    const response = await request(app).get('/api/creatures').query({
      limit: 100,
    });

    expect(response.status).toBe(400);
  });
});
