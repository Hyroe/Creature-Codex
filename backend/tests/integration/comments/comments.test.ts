import request from 'supertest';

import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../../src/app';

import { cleanupDatabase } from '../../helpers/cleanupDatabase';

import { createAuthenticatedUser } from '../../helpers/createAuthenticatedUser';

import { createTestCreature } from '../../helpers/createTestCreature';

describe('Creature comments', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/creatures/:slug/comments', () => {
    it('should allow an authenticated user to create a comment', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Interesting creature.',
        });

      expect(response.status).toBe(201);

      expect(response.body).toMatchObject({
        content: 'Interesting creature.',

        authorId: commenter.user.id,

        creatureId: creature.id,
      });

      expect(response.body.author).toMatchObject({
        id: commenter.user.id,
        username: commenter.user.username,
      });
    });

    it('should reject unauthenticated users', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .send({
          content: 'Unauthorized comment',
        });

      expect(response.status).toBe(401);
    });

    it('should reject empty comments', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: '   ',
        });

      expect(response.status).toBe(400);

      expect(response.body.message).toBe('Validation failed');
    });

    it('should reject comments longer than 1000 characters', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'a'.repeat(1001),
        });

      expect(response.status).toBe(400);
    });

    it('should not allow comments on draft creatures', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'DRAFT',
      });

      const response = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Should not be created',
        });

      expect(response.status).toBe(404);

      expect(response.body.message).toBe('Creature not found');
    });

    it('should return 404 for an unknown creature', async () => {
      const user = await createAuthenticatedUser();

      const response = await request(app)
        .post('/api/creatures/not-real/comments')
        .set('Authorization', `Bearer ${user.accessToken}`)
        .send({
          content: 'Hello',
        });

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/creatures/:slug/comments', () => {
    it('should list comments for a published creature', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'First observation',
        });

      await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Second observation',
        });

      const response = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(response.status).toBe(200);

      expect(response.body).toHaveLength(2);

      expect(
        response.body.map((comment: { content: string }) => comment.content),
      ).toEqual(
        expect.arrayContaining(['First observation', 'Second observation']),
      );
    });

    it('should allow unauthenticated users to read comments', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(response.status).toBe(200);
    });

    it('should return an empty array when there are no comments', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const response = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(response.status).toBe(200);

      expect(response.body).toEqual([]);
    });

    it('should return 404 for a draft creature', async () => {
      const owner = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'DRAFT',
      });

      const response = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /api/comments/:id', () => {
    it('should allow the author to update their comment', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const createResponse = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Original comment',
        });

      const commentId = createResponse.body.id;

      const response = await request(app)
        .patch(`/api/comments/${commentId}`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Updated comment',
        });

      expect(response.status).toBe(200);

      expect(response.body.content).toBe('Updated comment');
    });

    it('should not allow another user to update a comment', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const otherUser = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const createResponse = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Protected comment',
        });

      const response = await request(app)
        .patch(`/api/comments/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${otherUser.accessToken}`)
        .send({
          content: 'Trying to edit another user comment',
        });

      expect(response.status).toBe(404);
    });

    it('should reject invalid updated content', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const createResponse = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Valid comment',
        });

      const response = await request(app)
        .patch(`/api/comments/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: '',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('should allow the author to delete their comment', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const createResponse = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Comment to delete',
        });

      const response = await request(app)
        .delete(`/api/comments/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${commenter.accessToken}`);

      expect(response.status).toBe(204);

      const commentsResponse = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(commentsResponse.body).toHaveLength(0);
    });

    it('should not allow another user to delete a comment', async () => {
      const owner = await createAuthenticatedUser();

      const commenter = await createAuthenticatedUser();

      const otherUser = await createAuthenticatedUser();

      const creature = await createTestCreature({
        authorId: owner.user.id,
        status: 'PUBLISHED',
      });

      const createResponse = await request(app)
        .post(`/api/creatures/${creature.slug}/comments`)
        .set('Authorization', `Bearer ${commenter.accessToken}`)
        .send({
          content: 'Protected comment',
        });

      const response = await request(app)
        .delete(`/api/comments/${createResponse.body.id}`)
        .set('Authorization', `Bearer ${otherUser.accessToken}`);

      expect(response.status).toBe(404);

      const commentsResponse = await request(app).get(
        `/api/creatures/${creature.slug}/comments`,
      );

      expect(commentsResponse.body).toHaveLength(1);
    });

    it('should reject unauthenticated deletion', async () => {
      const response = await request(app).delete('/api/comments/random-id');

      expect(response.status).toBe(401);
    });
  });
});
