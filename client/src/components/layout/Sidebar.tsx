import React from 'react';
import { LayoutDashboard, Settings, History, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../services/auth.service';
import { NavLink } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Activity, label: 'Activity', path: '/activity' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  return (
    <aside className="w-64 glass h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          GitFlow Visualizer
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/5',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    'w-5 h-5',
                    isActive ? 'text-primary' : 'group-hover:scale-110 transition-transform',
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-card-border">
        <div className="glass p-4 rounded-xl flex items-center space-x-3">
          <img
            src={user?.photoURL || ''}
            alt="Avatar"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate leading-none">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-foreground/40 truncate">Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
