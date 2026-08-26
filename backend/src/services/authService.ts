import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { getPrisma } from '../lib/prisma';
import type { RegisterInput, LoginInput } from '../schemas/authSchemas';
import { JWT_CONFIG } from '../config/jwt';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  type: 'access' | 'refresh';
}



export function generateAccessToken(user: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      type: 'access',
    },
    JWT_CONFIG.accessSecret,
    {
      expiresIn: JWT_CONFIG.expiresIn,
    },
  );
}

export function generateRefreshToken(user: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      type: 'refresh',
    },
    JWT_CONFIG.refreshSecret,
    {
      expiresIn: JWT_CONFIG.refreshExpiresIn,
    },
  );
}

export function generateTokens(user: {
  id: string;
  email: string;
  role: string;
}) {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
}

export async function registerUser(input: RegisterInput) {
  const prisma = getPrisma();
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: input.email,
        },
        {
          username: input.username,
        },
      ],
    },
  });

  if (existingUser) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  const passwordHash = await argon2.hash(input.password);

  const user = await prisma.user.create({
    data: {
      username: input.username,
      displayName: input.displayName,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      email: true,
      role: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Generate tokens for the new user
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    ...tokens,
  };
}

export async function loginUser(input: LoginInput) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const validPassword = await argon2.verify(
    user.passwordHash,
    input.password,
  );

  if (!validPassword) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Generate tokens for the logged-in user
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    ...tokens,
  };
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(
      token,
      JWT_CONFIG.accessSecret
    ) as TokenPayload;

    if (payload.type !== 'access') {
      throw new Error();
    }

    return payload;
  } catch {
    throw new Error('INVALID_ACCESS_TOKEN');
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    const payload = jwt.verify(
      token,
      JWT_CONFIG.refreshSecret
    ) as TokenPayload;

    if (payload.type !== 'refresh') {
      throw new Error();
    }

    return payload;
  } catch {
    throw new Error('INVALID_REFRESH_TOKEN');
  }
}

export function refreshAccessToken(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    id: payload.userId,
    email: payload.email,
    role: payload.role,
  });

  return { accessToken };
}