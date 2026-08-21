import { prisma } from '../lib/prisma';

export async function getUsers() {
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