import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';

const COLLECTION_BUILDS = 'builds';

export const getWorkflows = async (req: Request, res: Response) => {
  try {
    const snapshots = await db
      .collection(COLLECTION_BUILDS)
      .orderBy('created_at', 'desc')
      .limit(50)
      .get();

    const workflows = snapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(workflows);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching workflows:', error);
    res.status(500).json({ error: 'Failed to fetch workflows' });
  }
};

export const getWorkflowDetails = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const buildDoc = await db.collection(COLLECTION_BUILDS).doc(id).get();

    if (!buildDoc.exists) {
      return res.status(404).json({ error: 'Workflow run not found' });
    }

    const jobsSnapshot = await db.collection(COLLECTION_BUILDS).doc(id).collection('jobs').get();
    const jobs = jobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const details = {
      id: buildDoc.id,
      ...buildDoc.data(),
      jobs,
    };

    res.status(200).json(details);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching workflow details:', error);
    res.status(500).json({ error: 'Failed to fetch workflow details' });
  }
};
