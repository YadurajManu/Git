import { Router } from 'express';
import { handleWebhook } from '../controllers/webhooks.controller.js';
import { verifyWebhookSignature } from '../middleware/webhook-verify.js';

const router = Router();

// Route: POST /api/webhooks/github
// 1. Verify Signature
// 2. Handle Logic
router.post('/github', verifyWebhookSignature, handleWebhook);

export default router;
