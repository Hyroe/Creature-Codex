import argon2 from 'argon2';
import { getPrisma } from '../lib/prisma';
import type { ChangePasswordInput, UpdateProfileInput } from '../schemas/authSchemas';


export async function getUsers() {
  const prisma = getPrisma();
  return prisma.user.findMany({
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
}

export async function getUserById(userId: string) {
  const prisma = getPrisma();

  return prisma.user.findUnique({
    where: {
      id: userId,
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
}

export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput,
) {
  const prisma = getPrisma();

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: input,
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
}

export async function changeUserPassword(
  userId: string,
  input: ChangePasswordInput,
) {
  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const validPassword = await argon2.verify(
    user.passwordHash,
    input.currentPassword,
  );

  if (!validPassword) {
    throw new Error('INVALID_CURRENT_PASSWORD');
  }

  const passwordHash = await argon2.hash(
    input.newPassword,
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
    },
  });
}