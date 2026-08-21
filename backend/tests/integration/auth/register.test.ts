import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { cleanupDatabase } from '../../helpers/cleanupDatabase';

import { app } from '../../../src/app';

describe('POST /api/auth/register', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });
  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'test_hunter',
      displayName: 'Test Hunter',
      email: 'test-hunter@example.com',
      password: 'TestPassword123',
    });

    expect(response.status).toBe(201);

    expect(response.body.user).toMatchObject({
      username: 'test_hunter',
      displayName: 'Test Hunter',
      email: 'test-hunter@example.com',
    });

    expect(response.body.user.passwordHash).toBeUndefined();
  });

  it('should reject a duplicate email', async () => {
    const user = {
      username: 'duplicate_email_user',
      displayName: 'Duplicate Email User',
      email: 'duplicate@example.com',
      password: 'TestPassword123',
    };

    await request(app).post('/api/auth/register').send(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        username: 'another_username',
      });

    expect(response.status).toBe(409);

    expect(response.body).toEqual({
      message: 'Username or email already exists',
    });
  });
  it('should reject a duplicate username', async () => {
    const user = {
      username: 'duplicate_username',
      displayName: 'Duplicate Username',
      email: 'first@example.com',
      password: 'TestPassword123',
    };

    await request(app).post('/api/auth/register').send(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'second@example.com',
      });

    expect(response.status).toBe(409);

    expect(response.body).toEqual({
      message: 'Username or email already exists',
    });
  });
  it('should reject invalid registration data', async () => {
    const response = await request(app).post('/api/auth/register').send({
      username: 'ab',
      displayName: '',
      email: 'invalid-email',
      password: '123',
    });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe('Validation failed');
  });
});
