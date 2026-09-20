import crypto from 'node:crypto';

import request from 'supertest';

import { app } from '../../src/app';

interface CreateAuthenticatedUserOptions {
  username?: string;
  displayName?: string;
  email?: string;
  password?: string;
}

export async function createAuthenticatedUser(
  overrides: CreateAuthenticatedUserOptions = {},
) {
  const id = crypto.randomUUID().slice(0, 8);

  const password = overrides.password ?? 'TestPassword123';

  const userData = {
    username: overrides.username ?? `hunter_${id}`,

    displayName: overrides.displayName ?? `Hunter ${id}`,

    email: overrides.email ?? `hunter-${id}@example.com`,

    password,
  };

  const registerResponse = await request(app)
    .post('/api/auth/register')
    .send(userData);

  if (registerResponse.status !== 201) {
    throw new Error(
      `Failed to create test user: ${JSON.stringify(registerResponse.body)}`,
    );
  }

  const loginResponse = await request(app).post('/api/auth/login').send({
    email: userData.email,
    password,
  });

  if (loginResponse.status !== 200) {
    throw new Error(
      `Failed to login test user: ${JSON.stringify(loginResponse.body)}`,
    );
  }

  return {
    user: registerResponse.body.user,
    accessToken: loginResponse.body.accessToken,
    password,
  };
}
