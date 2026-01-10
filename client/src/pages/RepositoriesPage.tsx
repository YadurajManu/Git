import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { workflowsApi } from '../services/api';
import {
  Github,
  Folder,
  Calendar,
  Activity,
  Loader2,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const RepositoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories'],
    queryFn: workflowsApi.listRepositories,
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Integrated Repositories</h2>
        <p className="text-foreground/40 text-sm">
          Select a project to visualize its CI/CD pipelines
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories?.map((repo: any, index: number) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            key={repo.name}
            onClick={() => navigate(`/repo/${encodeURIComponent(repo.name)}`)}
            className="glass-card group cursor-pointer hover:border-primary/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary/10 transition-colors">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <div
                className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  repo.last_build === 'success'
                    ? 'bg-secondary/10 border-secondary/20 text-secondary'
                    : repo.last_build === 'failure'
                      ? 'bg-red-500/10 border-red-500/20 text-red-500'
                      : 'bg-white/5 border-white/10 text-foreground/40'
                }`}
              >
                {repo.last_build === 'success' ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : repo.last_build === 'failure' ? (
                  <XCircle className="w-3 h-3" />
                ) : (
                  <Activity className="w-3 h-3" />
                )}
                <span>{repo.last_build}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors truncate">
              {repo.name.split('/')[1] || repo.name}
            </h3>
            <p className="text-xs text-foreground/30 font-mono mb-6 truncate">{repo.name}</p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center space-x-4 text-xs text-foreground/40">
                <span className="flex items-center space-x-1.5">
                  <Folder className="w-3.5 h-3.5" />
                  <span>{repo.build_count} builds</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}

        {repositories?.length === 0 && (
          <div className="col-span-full glass-card py-20 text-center opacity-40 border-dashed">
            <Folder className="w-12 h-12 mx-auto mb-4 text-foreground/20" />
            <p className="font-semibold text-lg">No repositories connected yet</p>
            <p className="text-sm">Push data to your webhook to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
