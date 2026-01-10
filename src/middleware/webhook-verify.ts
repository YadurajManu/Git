import express, { type Request, type Response, type NextFunction } from 'express';
import { verify } from '@octokit/webhooks-methods';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'development-secret';

// Middleware to capture the raw body for signature verification
export const captureRawBody = express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  },
});

export const verifyWebhookSignature = async (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-hub-signature-256'] as string;
  const id = req.headers['x-github-delivery'] as string;
  const event = req.headers['x-github-event'] as string;

  const rawBody = (req as any).rawBody;

  if (!signature) {
    // eslint-disable-next-line no-console
    console.warn('Missing X-Hub-Signature-256 header');
    return res.status(401).send('Missing signature');
  }

  if (!rawBody) {
    // eslint-disable-next-line no-console
    console.error('Raw body not captured. Ensure express.json({ verify }) is used.');
    return res.status(500).send('Internal Server Error: Raw body missing');
  }

  try {
    const isValid = await verify(WEBHOOK_SECRET, rawBody, signature);

    if (!isValid) {
      // eslint-disable-next-line no-console
      console.warn('Invalid signature for webhook', id);
      return res.status(401).send('Invalid signature');
    }

    // eslint-disable-next-line no-console
    console.log(`Webhook verified: ${event} (${id})`);
    next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error verifying webhook signature', error);
    return res.status(400).send('Error verifying signature');
  }
};
