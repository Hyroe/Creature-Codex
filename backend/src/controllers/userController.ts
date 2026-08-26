import type { Request, Response } from 'express';

import { z } from 'zod';
import { getUsers, updateUserProfile,changeUserPassword } from '../services/userService';
import { updateProfileSchema, changePasswordSchema } from '../schemas/authSchemas';

export async function listUsers(
  _req: Request,
  res: Response,
) {
  const users = await getUsers();

  res.json(users);
}

export async function updateMe(
  req: Request,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const result = updateProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  const user = await updateUserProfile(
    req.user.userId,
    result.data,
  );

  res.status(200).json({
    user,
  });
}

export async function changePassword(
  req: Request,
  res: Response,
) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const result = changePasswordSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  try {
    await changeUserPassword(
      req.user.userId,
      result.data,
    );

    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'INVALID_CURRENT_PASSWORD'
    ) {
      res.status(400).json({
        message: 'Current password is incorrect',
      });
      return;
    }

    if (
      error instanceof Error &&
      error.message === 'USER_NOT_FOUND'
    ) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    throw error;
  }
}