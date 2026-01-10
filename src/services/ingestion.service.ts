import { db } from '../config/firebase.js';
import { getIO } from '../lib/socket.js';
import type { WorkflowRunEvent, WorkflowJobEvent } from '../types/github.js';

const COLLECTION_BUILDS = 'builds';

export const handleWorkflowRun = async (payload: WorkflowRunEvent) => {
  const { workflow_run, repository } = payload;
  const buildId = `run_${workflow_run.id}`;

  const buildData = {
    id: workflow_run.id,
    repoId: repository.id,
    repoName: repository.full_name,
    name: workflow_run.name,
    head_branch: workflow_run.head_branch,
    head_sha: workflow_run.head_sha,
    status: workflow_run.status,
    conclusion: workflow_run.conclusion,
    created_at: workflow_run.created_at,
    updated_at: workflow_run.updated_at,
    actor: workflow_run.actor.login,
    actorAvatar: workflow_run.actor.avatar_url,
    url: workflow_run.path, // simplified
    display_title: workflow_run.display_title,
    event: 'workflow_run',
  };

  // Upsert the build document
  await db.collection(COLLECTION_BUILDS).doc(buildId).set(buildData, { merge: true });
  // eslint-disable-next-line no-console
  console.log(`[Ingestion] Upserted build: ${buildId} (${workflow_run.status})`);

  // Emit real-time update
  try {
    getIO().emit('workflow_update', buildData);
  } catch {
    // Ignore if socket not ready
  }
};

export const handleWorkflowJob = async (payload: WorkflowJobEvent) => {
  const { workflow_job } = payload;
  const buildId = `run_${workflow_job.run_id}`;
  const jobId = `job_${workflow_job.id}`;

  const jobData = {
    id: workflow_job.id,
    run_id: workflow_job.run_id,
    name: workflow_job.name,
    status: workflow_job.status,
    conclusion: workflow_job.conclusion,
    started_at: workflow_job.started_at,
    completed_at: workflow_job.completed_at,
    steps: workflow_job.steps.map((step) => ({
      name: step.name,
      status: step.status,
      conclusion: step.conclusion,
      number: step.number,
      started_at: step.started_at || null,
      completed_at: step.completed_at || null,
    })),
  };

  // Upsert into subcollection 'jobs'
  await db
    .collection(COLLECTION_BUILDS)
    .doc(buildId)
    .collection('jobs')
    .doc(jobId)
    .set(jobData, { merge: true });
  // eslint-disable-next-line no-console
  console.log(`[Ingestion] Upserted job: ${jobId} for build ${buildId} (${workflow_job.status})`);

  // Emit real-time update
  try {
    getIO().emit('job_update', jobData);
  } catch {
    // Ignore
  }
};
