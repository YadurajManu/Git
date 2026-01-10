import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider, useAuth } from './services/auth.service';
import { workflowsApi } from './services/api';
import { socketService } from './services/socket';
import { PipelineGraph } from './components/visualization/PipelineGraph';
import {
  GitBranch,
  User as UserIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Terminal,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

function Dashboard() {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const {
    data: workflows,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['workflows'],
    queryFn: workflowsApi.list,
    refetchInterval: 10000,
  });

  const { data: workflowDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['workflow', selectedWorkflowId],
    queryFn: () => (selectedWorkflowId ? workflowsApi.getDetails(selectedWorkflowId) : null),
    enabled: !!selectedWorkflowId,
  });

  useEffect(() => {
    socketService.connect();
    socketService.on('workflow_update', () => {
      refetch();
    });
    return () => socketService.disconnect();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (selectedWorkflowId && workflowDetails) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedWorkflowId(null)}
            className="p-2 hover:bg-white/5 rounded-lg border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">
              {workflowDetails.display_title || workflowDetails.name}
            </h2>
            <p className="text-foreground/40 text-sm">
              #{workflowDetails.run_number} • {workflowDetails.head_branch}
            </p>
          </div>
        </div>

        {isLoadingDetails ? (
          <div className="flex items-center justify-center h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <PipelineGraph jobs={workflowDetails.jobs || []} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">
              Run Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground/40">Event</span>
                <span className="font-mono text-xs">{workflowDetails.event}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">Actor</span>
                <span className="text-sm font-medium">{workflowDetails.actor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">Repository</span>
                <span className="text-sm">{workflowDetails.repo}</span>
              </div>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary mb-4">
              Conclusion
            </h3>
            <div
              className={`p-4 rounded-xl border ${
                workflowDetails.conclusion === 'success'
                  ? 'bg-secondary/10 border-secondary/20 text-secondary'
                  : workflowDetails.conclusion === 'failure'
                    ? 'bg-red-500/10 border-red-500/20 text-red-500'
                    : 'bg-primary/10 border-primary/20 text-primary'
              }`}
            >
              <p className="text-lg font-bold capitalize">
                {workflowDetails.conclusion || workflowDetails.status}
              </p>
              <p className="text-xs opacity-60 mt-1">
                Updated at {new Date(workflowDetails.updated_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pipeline Overview</h2>
          <p className="text-foreground/40 text-sm">Monitor your GitHub Actions in real-time</p>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {workflows?.map((workflow: any) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={workflow.id}
              onClick={() => setSelectedWorkflowId(workflow.id)}
              className="glass-card hover:border-primary/30 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div
                    className={`p-4 rounded-2xl shadow-inner ${
                      workflow.conclusion === 'success'
                        ? 'bg-secondary/10 text-secondary border border-secondary/20'
                        : workflow.conclusion === 'failure'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : 'bg-primary/10 text-primary border border-primary/20 animate-pulse'
                    }`}
                  >
                    {workflow.conclusion === 'success' ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : workflow.conclusion === 'failure' ? (
                      <XCircle className="w-7 h-7" />
                    ) : (
                      <GitBranch className="w-7 h-7" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {workflow.display_title || workflow.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-xs text-foreground/40 mt-2 font-medium">
                      <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                        <UserIcon className="w-3.5 h-3.5 text-primary/60" />
                        <span>{workflow.actor}</span>
                      </span>
                      <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 font-mono">
                        <GitBranch className="w-3.5 h-3.5 text-accent/60" />
                        <span>{workflow.head_branch}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(workflow.created_at).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold mb-1.5">
                      Status
                    </p>
                    <span
                      className={`text-xs font-bold px-4 py-1.5 rounded-full border shadow-sm ${
                        workflow.status === 'completed'
                          ? 'bg-white/5 text-foreground/60 border-white/10'
                          : 'bg-primary/20 text-primary border-primary/30 animate-pulse'
                      }`}
                    >
                      {workflow.status.toUpperCase()}
                    </span>
                  </div>
                  <button className="p-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/10 active:scale-90 group-hover:bg-primary/5 group-hover:border-primary/20">
                    <Terminal className="w-5 h-5 group-hover:text-primary" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {workflows?.length === 0 && (
          <div className="glass-card flex flex-col items-center justify-center p-20 text-center space-y-4 border-dashed opacity-60">
            <div className="p-4 rounded-full bg-white/5">
              <GitBranch className="w-10 h-10 text-foreground/20" />
            </div>
            <div>
              <p className="font-semibold text-lg text-foreground/40">No build activity detected</p>
              <p className="text-sm text-foreground/20">
                Trigger a GitHub Action to see real-time updates here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AuthorizedApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthorizedApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
