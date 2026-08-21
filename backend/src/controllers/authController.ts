import type { Request, Response } from 'express';

import { registerSchema } from '../schemas/authSchemas';
import { registerUser } from '../services/authService';
import { z } from 'zod';

export async function register(
  req: Request,
  res: Response,
) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });

    return;
  }

  try {
    const user = await registerUser(result.data);

    res.status(201).json({
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'USER_ALREADY_EXISTS'
    ) {
      res.status(409).json({
        message: 'Username or email already exists',
      });

      return;
    }

    throw error;
  }
}