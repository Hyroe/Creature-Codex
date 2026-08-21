import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters'),

  displayName: z
    .string()
    .trim()
    .min(1, 'Display name is required')
    .max(50, 'Display name must not exceed 50 characters'),

  email: z
    .email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;