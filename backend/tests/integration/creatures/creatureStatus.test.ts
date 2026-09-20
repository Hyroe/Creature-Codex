import request from 'supertest';

import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../../src/app';

import { cleanupDatabase } from '../../helpers/cleanupDatabase';

import { createAuthenticatedUser } from '../../helpers/createAuthenticatedUser';

import { createTestCreature } from '../../helpers/createTestCreature';

import { createTestTaxonomy } from '../../helpers/createTestTaxonomy';

describe('PATCH /api/creatures/:id/status', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  it('should reject publishing an incomplete creature', async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const creature = await createTestCreature({
      authorId: user.id,

      status: 'DRAFT',

      attackStyle: null,

      withCover: false,
    });

    const response = await request(app)
      .patch(`/api/creatures/${creature.id}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'PUBLISHED',
      });

    expect(response.status).toBe(400);

    expect(response.body.error).toBe('Creature is not ready to publish');

    expect(response.body.missingFields).toEqual(
      expect.arrayContaining([
        'habitat',
        'diet',
        'attack style',
        'cover image',
      ]),
    );
  });

  it('should publish a complete creature', async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const { habitat, diet } = await createTestTaxonomy();

    const creature = await createTestCreature({
      authorId: user.id,

      status: 'DRAFT',

      habitatId: habitat.id,

      dietId: diet.id,

      attackStyle: 'Ambush predator',

      withCover: true,
    });

    const response = await request(app)
      .patch(`/api/creatures/${creature.id}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'PUBLISHED',
      });

    expect(response.status).toBe(200);

    expect(response.body.status).toBe('PUBLISHED');
  });

  it('should allow a published creature to return to draft', async () => {
    const { user, accessToken } = await createAuthenticatedUser();

    const { habitat, diet } = await createTestTaxonomy();

    const creature = await createTestCreature({
      authorId: user.id,

      status: 'PUBLISHED',

      habitatId: habitat.id,

      dietId: diet.id,

      attackStyle: 'Claws and teeth',

      withCover: true,
    });

    const response = await request(app)
      .patch(`/api/creatures/${creature.id}/status`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'DRAFT',
      });

    expect(response.status).toBe(200);

    expect(response.body.status).toBe('DRAFT');
  });

  it('should not allow another user to change creature status', async () => {
    const owner = await createAuthenticatedUser();

    const otherUser = await createAuthenticatedUser();

    const creature = await createTestCreature({
      authorId: owner.user.id,

      status: 'DRAFT',
    });

    const response = await request(app)
      .patch(`/api/creatures/${creature.id}/status`)
      .set('Authorization', `Bearer ${otherUser.accessToken}`)
      .send({
        status: 'PUBLISHED',
      });

    expect([403, 404]).toContain(response.status);
  });
});
