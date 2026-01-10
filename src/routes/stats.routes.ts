import { Router } from 'express';
import { getStats } from '../controllers/stats.controller.js';
import { verifyAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyAuth);

// GET /api/stats
router.get('/', getStats);

export default router;
