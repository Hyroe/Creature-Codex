import argon2 from 'argon2';

import { prisma } from '../lib/prisma';
import type { RegisterInput } from '../schemas/authSchemas';

export async function registerUser(input: RegisterInput) {
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