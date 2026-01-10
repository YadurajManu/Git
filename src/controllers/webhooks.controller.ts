import type { Request, Response } from 'express';

export const handleWebhook = async (req: Request, res: Response) => {
  const event = req.headers['x-github-event'] as string;
  const deliveryId = req.headers['x-github-delivery'] as string;
  const payload = req.body;

  // eslint-disable-next-line no-console
  console.log(`Received GitHub Webhook: ${event} [${deliveryId}]`);

  if (event === 'ping') {
    // eslint-disable-next-line no-console
    console.log('Ping event received from GitHub. Repository:', payload.repository?.full_name);
    return res.status(200).send('PONG');
  }

  // Placeholder for future event handling
  // TODO: Add Phase 4 ingestion logic here

  res.status(202).send('Accepted');
};
