import type { Request, Response } from 'express';

import {
  favoriteCreature,
  getCreatureFavoriteStatus,
  getUserFavorites,
  unfavoriteCreature,
} from '../services/favoriteService';

export async function addFavorite(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const favorite = await favoriteCreature(
    req.user.userId,
    String(req.params.slug),
  );

  if (!favorite) {
    return res.status(404).json({
      message: 'Creature not found',
    });
  }

  return res.status(201).json(favorite);
}

export async function removeFavorite(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const result = await unfavoriteCreature(
    req.user.userId,
    String(req.params.slug),
  );

  if (!result) {
    return res.status(404).json({
      message: 'Creature not found',
    });
  }

  return res.status(204).send();
}

export async function listMyFavorites(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const favorites = await getUserFavorites(req.user.userId);

  return res.json(favorites);
}

export async function getFavoriteStatus(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  const result = await getCreatureFavoriteStatus(
    req.user.userId,
    String(req.params.slug),
  );

  if (!result) {
    return res.status(404).json({
      message: 'Creature not found',
    });
  }

  return res.json(result);
}
