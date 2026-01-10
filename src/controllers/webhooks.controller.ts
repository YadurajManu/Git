import type { Request, Response } from 'express';
import { handleWorkflowRun, handleWorkflowJob } from '../services/ingestion.service.js';
import type { WorkflowRunEvent, WorkflowJobEvent } from '../types/github.js';

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

  // Phase 4: Async Ingestion
  if (event === 'workflow_run') {
    handleWorkflowRun(payload as WorkflowRunEvent).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error handling workflow_run:', err);
    });
  } else if (event === 'workflow_job') {
    handleWorkflowJob(payload as WorkflowJobEvent).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error handling workflow_job:', err);
    });
  }

  res.status(202).send('Accepted');
};
