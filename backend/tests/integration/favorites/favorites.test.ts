import request from 'supertest';

import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../../src/app';

import { cleanupDatabase } from '../../helpers/cleanupDatabase';

import { createAuthenticatedUser } from '../../helpers/createAuthenticatedUser';

import { createTestCreature } from '../../helpers/createTestCreature';

describe('Creature favorites', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/creatures/:slug/favorite', () => {
    it('should allow an authenticated user to favorite a published creature', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(201);

      expect(response.body).toMatchObject({
        userId: user.user.id,
        creatureId: creature.id,
      });
    });

    it('should not create duplicate favorites', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const first = await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      const second = await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(first.status).toBe(201);
      expect(second.status).toBe(201);

      expect(second.body.id).toBe(first.body.id);
    });

    it('should reject unauthenticated users', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app).post(
        `/api/creatures/${creature.slug}/favorite`,
      );

      expect(response.status).toBe(401);
    });

    it('should not allow favoriting a draft creature', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'DRAFT',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(404);

      expect(response.body.message).toBe('Creature not found');
    });

    it('should not allow favoriting an archived creature', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
        archived: true,
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/creatures/:slug/favorite', () => {
    it('should allow a user to remove a favorite', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      const response = await request(app)
        .delete(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(204);
    });

    it('should be idempotent when removing a favorite that does not exist', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .delete(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(204);
    });

    it('should reject unauthenticated users', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app).delete(
        `/api/creatures/${creature.slug}/favorite`,
      );

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/users/me/favorites', () => {
    it('should return only the authenticated user favorites', async () => {
      const owner = await createAuthenticatedUser();

      const userA = await createAuthenticatedUser();

      const userB = await createAuthenticatedUser();

      const creatureA = await createTestCreature({
        authorId: owner.user.id,
        name: 'Saved Creature',
        status: 'PUBLISHED',
      });

      const creatureB = await createTestCreature({
        authorId: owner.user.id,
        name: 'Other Creature',
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creatureA.slug}/favorite`)
        .set('Authorization', `Bearer ${userA.accessToken}`);

      await request(app)
        .post(`/api/creatures/${creatureB.slug}/favorite`)
        .set('Authorization', `Bearer ${userB.accessToken}`);

      const response = await request(app)
        .get('/api/users/me/favorites')
        .set('Authorization', `Bearer ${userA.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toHaveLength(1);

      expect(response.body[0].creature).toMatchObject({
        id: creatureA.id,
        name: 'Saved Creature',
      });
    });

    it('should return an empty array when the user has no favorites', async () => {
      const user = await createAuthenticatedUser();

      const response = await request(app)
        .get('/api/users/me/favorites')
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual([]);
    });

    it('should reject unauthenticated users', async () => {
      const response = await request(app).get('/api/users/me/favorites');

      expect(response.status).toBe(401);
    });

    it('should not return archived creatures', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      // Archive after it has already been favorited.
      // Use your actual archive endpoint if it differs.
      await request(app)
        .delete(`/api/creatures/${creature.id}`)
        .set('Authorization', `Bearer ${owner.accessToken}`);

      const response = await request(app)
        .get('/api/users/me/favorites')
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual([]);
    });
  });
  describe('GET /api/creatures/:slug/favorite', () => {
    it('should return false when the creature is not favorited', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        isFavorite: false,
      });
    });

    it('should return true when the creature is favorited', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      const response = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        isFavorite: true,
      });
    });

    it('should return false after removing the favorite', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      await request(app)
        .delete(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      const response = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        isFavorite: false,
      });
    });

    it('should keep favorite status isolated between users', async () => {
      const owner = await createAuthenticatedUser();

      const userA = await createAuthenticatedUser();

      const userB = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${userA.accessToken}`);

      const userAResponse = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${userA.accessToken}`);

      const userBResponse = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${userB.accessToken}`);

      expect(userAResponse.body).toEqual({
        isFavorite: true,
      });

      expect(userBResponse.body).toEqual({
        isFavorite: false,
      });
    });

    it('should reject unauthenticated users', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app).get(
        `/api/creatures/${creature.slug}/favorite`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 404 for a draft creature', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'DRAFT',
      });

      const response = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(404);

      expect(response.body.message).toBe('Creature not found');
    });

    it('should return 404 for an archived creature', async () => {
      const owner = await createAuthenticatedUser();

      const user = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
        archived: true,
      });

      const response = await request(app)
        .get(`/api/creatures/${creature.slug}/favorite`)
        .set('Authorization', `Bearer ${user.accessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
