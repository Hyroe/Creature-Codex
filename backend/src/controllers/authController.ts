import type { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../schemas/authSchemas';
import {
  loginUser,
  registerUser,
  refreshAccessToken,
} from '../services/authService';
import { z } from 'zod';
import { getUserById } from '../services/userService';

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  try {
    const { user, accessToken, refreshToken } = await registerUser(result.data);

    res.status(201).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_ALREADY_EXISTS') {
      res.status(409).json({
        message: 'Username or email already exists',
      });
      return;
    }

    throw error;
  }
}

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  try {
    const { user, accessToken, refreshToken } = await loginUser(result.data);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      res.status(401).json({
        message: 'Invalid email or password',
      });
      return;
    }

    throw error;
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  res.status(204).send();
}

export async function refresh(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(400).json({
      message: 'Refresh token required',
    });
    return;
  }

  try {
    const tokens = refreshAccessToken(refreshToken);

    res.status(200).json(tokens);
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_REFRESH_TOKEN') {
      res.status(403).json({
        message: 'Invalid refresh token',
      });
      return;
    }

    throw error;
  }
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });

    return;
  }

  const user = await getUserById(req.user.userId);

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    });

    return;
  }

  res.status(200).json({
    user,
  });
}
