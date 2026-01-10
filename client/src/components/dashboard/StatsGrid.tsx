import React from 'react';
import { Activity, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: {
    totalRuns: number;
    successRate: number;
    failedRuns: number;
    activeRuns: number;
  };
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const items = [
    { label: 'Total Runs', value: stats.totalRuns, icon: Zap, color: 'text-primary' },
    {
      label: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: CheckCircle2,
      color: 'text-secondary',
    },
    { label: 'Failed Runs', value: stats.failedRuns, icon: XCircle, color: 'text-red-500' },
    { label: 'Active Now', value: stats.activeRuns, icon: Activity, color: 'text-accent' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={item.label}
          className="glass-card flex items-center justify-between group hover:border-primary/20"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold mb-1">
              {item.label}
            </p>
            <p className="text-2xl font-bold tracking-tight">{item.value}</p>
          </div>
          <div
            className={`p-3 rounded-xl bg-white/5 border border-white/5 ${item.color} group-hover:scale-110 transition-transform`}
          >
            <item.icon className="w-5 h-5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
