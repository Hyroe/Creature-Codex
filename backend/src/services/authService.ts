import argon2 from 'argon2';

import { getPrisma } from '../lib/prisma';
import type { RegisterInput, LoginInput } from '../schemas/authSchemas';

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

  return user;
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

  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}