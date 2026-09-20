import { getPrisma } from '../lib/prisma';

export async function getCreatureComments(slug: string) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      archivedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!creature) {
    return null;
  }

  return prisma.comment.findMany({
    where: {
      creatureId: creature.id,
    },

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function createCreatureComment(
  userId: string,
  slug: string,
  content: string,
) {
  const prisma = getPrisma();

  const creature = await prisma.creature.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      archivedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!creature) {
    return null;
  }

  return prisma.comment.create({
    data: {
      content,
      authorId: userId,
      creatureId: creature.id,
    },

    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function updateComment(
  userId: string,
  commentId: string,
  content: string,
) {
  const prisma = getPrisma();

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: userId,
    },

    select: {
      id: true,
    },
  });

  if (!comment) {
    return null;
  }

  return prisma.comment.update({
    where: {
      id: commentId,
    },

    data: {
      content,
    },

    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

export async function deleteComment(userId: string, commentId: string) {
  const prisma = getPrisma();

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId: userId,
    },

    select: {
      id: true,
    },
  });

  if (!comment) {
    return false;
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return true;
}
