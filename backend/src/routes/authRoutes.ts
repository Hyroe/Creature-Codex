import { Router } from 'express';

import { login, me, refresh, register } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.get('/me', authenticateToken, me);

export default router;