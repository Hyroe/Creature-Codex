import { Router } from 'express';

import {
  archive,
  create,
  getCreature,
  listCreatures,
  listMyCreatures,
  update,
  updateStatus,
} from '../controllers/creatureController';

import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listCreatures);
router.get('/mine', authenticateToken, listMyCreatures);
router.get('/:slug', getCreature);
router.patch('/:id/status', authenticateToken, updateStatus);
router.patch('/:id', authenticateToken, update);
router.post('/', authenticateToken, create);
router.delete('/:id', authenticateToken, archive);

export default router;
