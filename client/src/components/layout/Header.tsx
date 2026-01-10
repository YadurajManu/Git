import React from 'react';
import { Bell, Search, Terminal, LogOut } from 'lucide-react';
import { useAuth } from '../../services/auth.service';

export const Header: React.FC = () => {
  const { logout, user } = useAuth();
  return (
    <header className="h-20 glass border-b border-card-border sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search pipelines, repositories..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary/50 focus:bg-white/10 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-foreground/40 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
          <Terminal className="w-3 h-3 text-secondary" />
          <span>v1.0.0-stable</span>
        </div>

        <button className="relative p-2 text-foreground/60 hover:text-foreground transition-colors group">
          <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
        </button>

        <div className="h-8 w-[1px] bg-card-border" />

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.displayName || 'Status'}</p>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-wider">
              Connected
            </p>
          </div>
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>

        <button
          onClick={() => logout()}
          className="p-2 hover:bg-red-500/10 text-foreground/40 hover:text-red-500 rounded-lg transition-all"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
