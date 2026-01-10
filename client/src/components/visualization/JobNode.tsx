import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';

export const JobNode = ({ data }: { data: any }) => {
  const isSuccess = data.conclusion === 'success';
  const isFailure = data.conclusion === 'failure';
  const isRunning = data.status === 'in_progress' || data.status === 'queued';

  return (
    <div
      className={`glass-card min-w-[200px] border-l-4 ${
        isSuccess
          ? 'border-l-secondary'
          : isFailure
            ? 'border-l-red-500'
            : 'border-l-primary animate-pulse'
      } p-3 shadow-2xl`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-card-border" />

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
          Job
        </span>
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-secondary" />}
        {isFailure && <XCircle className="w-4 h-4 text-red-500" />}
        {isRunning && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold truncate pr-2">{data.name}</h4>
        <div className="flex items-center space-x-2 text-[10px] text-foreground/40">
          <Clock className="w-3 h-3" />
          <span>{data.duration || 'Running...'}</span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-card-border" />
    </div>
  );
};
