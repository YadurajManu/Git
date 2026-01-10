import { Router } from 'express';
import { getWorkflows, getWorkflowDetails } from '../controllers/workflows.controller.js';

const router = Router();

// GET /api/workflows
router.get('/', getWorkflows);

// GET /api/workflows/:id
router.get('/:id', getWorkflowDetails);

export default router;
