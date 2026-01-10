export interface WorkflowRunEvent {
  action: 'requested' | 'completed' | 'in_progress' | 'queued';
  workflow_run: {
    id: number;
    name: string;
    head_branch: string;
    head_sha: string;
    path: string;
    display_title: string;
    status: string;
    conclusion: string | null;
    created_at: string;
    updated_at: string;
    actor: {
      login: string;
      avatar_url: string;
    };
    repository: {
      id: number;
      full_name: string;
    };
  };
  repository: {
    id: number;
    full_name: string;
    owner: {
      login: string;
    };
  };
}

export interface WorkflowJobEvent {
  action: 'queued' | 'in_progress' | 'completed';
  workflow_job: {
    id: number;
    run_id: number;
    name: string;
    status: 'queued' | 'in_progress' | 'completed';
    conclusion: 'success' | 'failure' | 'cancelled' | 'skipped' | null;
    started_at: string;
    completed_at: string | null;
    steps: Array<{
      name: string;
      status: 'queued' | 'in_progress' | 'completed';
      conclusion: string | null;
      number: number;
      started_at?: string | null;
      completed_at?: string | null;
    }>;
  };
  repository: {
    id: number;
    full_name: string;
  };
}
