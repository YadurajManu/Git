import { Router } from 'express';
import { getWorkflows, getWorkflowDetails } from '../controllers/workflows.controller.js';
import { verifyAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Protect all routes below
router.use(verifyAuth);

// GET /api/workflows
router.get('/', getWorkflows);

// GET /api/workflows/:id
router.get('/:id', getWorkflowDetails);

export default router;
