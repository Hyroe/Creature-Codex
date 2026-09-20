import { describe, expect, it } from 'vitest';

import { registerSchema } from '../../../src/schemas/authSchemas';

describe('registerSchema', () => {
  it('should accept valid registration data', () => {
    const result = registerSchema.safeParse({
      username: 'ashen_hunter',
      displayName: 'Ashen Hunter',
      email: 'hunter@example.com',
      password: 'MySecurePassword123',
    });

    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = registerSchema.safeParse({
      username: 'ashen_hunter',
      displayName: 'Ashen Hunter',
      email: 'not-an-email',
      password: 'MySecurePassword123',
    });

    expect(result.success).toBe(false);
  });

  it('should reject a password shorter than 8 characters', () => {
    const result = registerSchema.safeParse({
      username: 'ashen_hunter',
      displayName: 'Ashen Hunter',
      email: 'hunter@example.com',
      password: '1234567',
    });

    expect(result.success).toBe(false);
  });

  it('should reject a username shorter than 3 characters', () => {
    const result = registerSchema.safeParse({
      username: 'ab',
      displayName: 'Ashen Hunter',
      email: 'hunter@example.com',
      password: 'MySecurePassword123',
    });

    expect(result.success).toBe(false);
  });
});