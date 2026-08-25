import request from 'supertest';
import { beforeEach, describe, expect, it, afterAll } from 'vitest';

import { app } from '../../../src/app';
import { cleanupDatabase } from '../../helpers/cleanupDatabase';

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
      await cleanupDatabase();
    });

  it('should login with valid credentials', async () => {
  const user = {
    username: 'testuser',
    displayName: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  const registerResponse = await request(app)
    .post('/api/auth/register')
    .send(user);

  expect(registerResponse.status).toBe(201);

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: user.email,
      password: user.password,
    });

  expect(response.status).toBe(200);

  expect(response.body.user).toMatchObject({
    username: user.username,
    displayName: user.displayName,
    email: user.email,
  });

  expect(response.body.user.passwordHash).toBeUndefined();
});

  it('should reject invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrong-password',
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: 'Invalid email or password',
    });
  });
  it('should reject invalid email', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'not-an-email',
      password: 'password123',
    });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe('Validation failed');
  });
  it('should reject empty password', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: '',
    });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe('Validation failed');
  });
});
