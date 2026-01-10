import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';

export const getStats = async (_req: Request, res: Response) => {
  try {
    const workflowsRef = db.collection('workflows');
    const snapshot = await workflowsRef.get();

    const totalRuns = snapshot.size;
    let successfulRuns = 0;
    let failedRuns = 0;
    let activeRuns = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.conclusion === 'success') successfulRuns++;
      else if (data.conclusion === 'failure') failedRuns++;

      if (data.status === 'in_progress' || data.status === 'queued') activeRuns++;
    });

    const successRate = totalRuns > 0 ? (successfulRuns / (successfulRuns + failedRuns)) * 100 : 0;

    res.json({
      totalRuns,
      successRate: Math.round(successRate),
      failedRuns,
      activeRuns,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};
