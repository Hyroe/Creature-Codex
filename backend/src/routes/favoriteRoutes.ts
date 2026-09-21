import { Router } from 'express';

import {
  addFavorite,
  getFavoriteStatus,
  listMyFavorites,
  removeFavorite,
} from '../controllers/favoriteController';

import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/creatures/:slug/favorite', authenticateToken, addFavorite);

router.delete('/creatures/:slug/favorite', authenticateToken, removeFavorite);

router.get('/users/me/favorites', authenticateToken, listMyFavorites);
router.get('/creatures/:slug/favorite', authenticateToken, getFavoriteStatus);

export default router;
