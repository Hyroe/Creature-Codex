import { Router } from 'express';

import {
  changePassword,
  listUsers,
  updateMe,
} from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', listUsers);
router.patch('/me', authenticateToken, updateMe);
router.patch('/me/password', authenticateToken, changePassword);

export default router;
