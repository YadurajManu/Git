import React from 'react';
import { Clock, Terminal, Github } from 'lucide-react';

export const ActivityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Activity Feed</h2>
        <p className="text-foreground/40 text-sm">Real-time stream of your pipeline events</p>
      </div>

      <div className="glass-card p-0 overflow-hidden">
        <div className="divide-y divide-white/5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 flex items-start space-x-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">
                    Build job started: <span className="text-primary">deploy-production</span>
                  </p>
                  <span className="text-[10px] text-foreground/30 font-mono">14:0{i}:22</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-foreground/40">
                  <span className="flex items-center space-x-1.5 font-mono">
                    <Github className="w-3 h-3" />
                    <span>sujeet-repo/main</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3 h-3" />
                    <span>2 mins ago</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-20 text-center space-y-4 opacity-40 italic">
        <p className="text-sm">More historical events will appear as you trigger builds...</p>
      </div>
    </div>
  );
};
