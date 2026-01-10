import type { Request, Response } from 'express';
import { db } from '../config/firebase.js';

const COLLECTION_BUILDS = 'builds';

export const getRepositories = async (_req: Request, res: Response) => {
  try {
    const snapshots = await db.collection(COLLECTION_BUILDS).orderBy('updated_at', 'desc').get();

    const reposMap = new Map();

    snapshots.forEach((doc) => {
      const data = doc.data();
      const repoName = data.repoName;
      if (!repoName) return;

      if (!reposMap.has(repoName)) {
        reposMap.set(repoName, {
          name: repoName,
          last_build: data.conclusion || data.status,
          updated_at: data.updated_at,
          build_count: 1,
        });
      } else {
        const existing = reposMap.get(repoName);
        existing.build_count++;
        // Summary: we already ordered by updated_at desc, so the first one we encounter is the latest
      }
    });

    res.json(Array.from(reposMap.values()));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
};

export const getWorkflows = async (req: Request, res: Response) => {
  try {
    const { repo } = req.query;
    let query: any = db.collection(COLLECTION_BUILDS).orderBy('updated_at', 'desc');

    if (repo) {
      query = query.where('repoName', '==', repo);
    }

    const snapshot = await query.limit(50).get();

    const workflows = snapshot.docs.map((doc: any) => ({
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
