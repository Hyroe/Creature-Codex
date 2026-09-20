import { Router } from 'express';

import {
  createComment,
  editComment,
  listCreatureComments,
  removeComment,
} from '../controllers/commentController';

import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/creatures/:slug/comments', listCreatureComments);

router.post('/creatures/:slug/comments', authenticateToken, createComment);

router.patch('/comments/:id', authenticateToken, editComment);

router.delete('/comments/:id', authenticateToken, removeComment);

export default router;
