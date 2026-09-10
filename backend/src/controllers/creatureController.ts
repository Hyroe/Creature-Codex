import type { Request, Response } from 'express';

import { z } from 'zod';

import {
  createCreatureSchema,
  listCreaturesQuerySchema,
  updateCreatureSchema,
  updateCreatureStatusSchema,
} from '../schemas/creatureSchemas';

import {
  createCreature,
  getCreatureBySlug,
  getCreatures,
  updateCreature,
  getMyCreatures,
  updateCreatureStatus,
  archiveCreature,
  getMyCreatureById,
} from '../services/creatureService';
import { error } from 'console';

export async function create(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const result = createCreatureSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  const creature = await createCreature(req.user.userId, result.data);

  res.status(201).json({
    creature,
  });
}

export async function listCreatures(req: Request, res: Response) {
  const result = listCreaturesQuerySchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: result.error.flatten(),
    });
  }

  const creatures = await getCreatures(result.data);

  return res.json(creatures);
}

export async function getCreature(req: Request, res: Response) {
  const { slug } = req.params;

  if (typeof slug !== 'string') {
    res.status(400).json({
      message: 'Invalid creature slug',
    });
    return;
  }

  const creature = await getCreatureBySlug(slug);

  if (!creature) {
    res.status(404).json({
      message: 'Creature not found',
    });
    return;
  }

  res.status(200).json({
    creature,
  });
}

export async function update(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== 'string') {
    res.status(400).json({
      message: 'Invalid creature id',
    });
    return;
  }

  const result = updateCreatureSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  try {
    const creature = await updateCreature(req.user.userId, id, result.data);

    res.status(200).json({
      creature,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'CREATURE_NOT_FOUND') {
      res.status(404).json({
        message: 'Creature not found',
      });
      return;
    }

    if (error instanceof Error && error.message === 'CREATURE_FORBIDDEN') {
      res.status(403).json({
        message: 'You cannot edit this creature',
      });
      return;
    }

    throw error;
  }
}

export async function listMyCreatures(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const creatures = await getMyCreatures(req.user.userId);

  res.status(200).json({
    creatures,
  });
}

export async function updateStatus(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== 'string') {
    res.status(400).json({
      message: 'Invalid creature id',
    });
    return;
  }

  const result = updateCreatureStatusSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: z.treeifyError(result.error),
    });
    return;
  }

  try {
    const creature = await updateCreatureStatus(
      req.user.userId,
      id,
      result.data.status,
    );

    res.json(creature);
  } catch (error) {
    if (error instanceof Error && error.message === 'CREATURE_NOT_FOUND') {
      return res.status(404).json({
        error: 'Creature not found',
      });
    }

    if (error instanceof Error && error.message === 'CREATURE_NOT_READY') {
      const publishError = error as Error & {
        missingFields?: string[];
      };

      return res.status(400).json({
        error: 'Creature is not ready to publish',

        missingFields: publishError.missingFields ?? [],
      });
    }

    throw error;
  }
}

export async function archive(req: Request, res: Response) {
  if (!req.user) {
    res.status(401).json({
      message: 'Authentication required',
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== 'string') {
    res.status(400).json({
      message: 'Invalid creature id',
    });
    return;
  }

  try {
    const creature = await archiveCreature(id, req.user.userId);

    res.status(200).json({
      creature,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'CREATURE_NOT_FOUND') {
      res.status(404).json({
        message: 'Creature not found',
      });
      return;
    }

    if (error instanceof Error && error.message === 'CREATURE_FORBIDDEN') {
      res.status(403).json({
        message: 'You cannot archive this creature',
      });
      return;
    }

    throw error;
  }
}

export async function getMyCreature(req: Request, res: Response) {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    res.status(400).json({
      error: 'Invalid creature id',
    });
    return;
  }

  const creature = await getMyCreatureById(req.user!.userId, id);

  if (!creature) {
    res.status(404).json({
      error: 'Creature not found',
    });
    return;
  }

  res.json({ creature });
}
