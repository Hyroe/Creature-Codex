import type { Request, Response } from 'express';

import {
  createCommentSchema,
  updateCommentSchema,
} from '../schemas/commentSchemas';

import {
  createCreatureComment,
  deleteComment,
  getCreatureComments,
  updateComment,
} from '../services/commentService';
import { getPrismaClient } from '../lib/prisma';

export async function listCreatureComments(req: Request, res: Response) {
  const { slug } = req.params;

  if (typeof slug !== 'string') {
    return res.status(400).json({
      message: 'Invalid creature slug',
    });
  }

  const comments = await getCreatureComments(slug);

  if (!comments) {
    return res.status(404).json({
      message: 'Creature not found',
    });
  }

  return res.json(comments);
}

export async function createComment(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const { slug } = req.params;

  if (typeof slug !== 'string') {
    return res.status(400).json({
      message: 'Invalid creature slug',
    });
  }

  const result = createCommentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.flatten(),
    });
  }

  const comment = await createCreatureComment(
    req.user.userId,
    slug,
    result.data.content,
  );

  if (!comment) {
    return res.status(404).json({
      message: 'Creature not found',
    });
  }

  return res.status(201).json(comment);
}

export async function editComment(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      message: 'Invalid comment id',
    });
  }

  const result = updateCommentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: result.error.flatten(),
    });
  }

  const comment = await updateComment(req.user.userId, id, result.data.content);

  if (!comment) {
    return res.status(404).json({
      message: 'Comment not found',
    });
  }

  return res.json(comment);
}

export async function removeComment(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({
      message: 'Invalid comment id',
    });
  }

  const deleted = await deleteComment(req.user.userId, id);

  if (!deleted) {
    return res.status(404).json({
      message: 'Comment not found',
    });
  }

  return res.status(204).send();
}
