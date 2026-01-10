import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Loader2, GitBranch } from 'lucide-react';
import { useAuth } from '../services/auth.service';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_15%)] bg-no-repeat bg-[length:100%_100%] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md relative z-10 p-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-2 shadow-lg shadow-primary/10">
            <GitBranch className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent">
            GitFlow Visualizer
          </h1>
          <p className="text-foreground/60 text-sm">
            Monitor, analyze, and optimize your CI/CD pipelines with real-time intelligence.
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full btn-primary h-14 text-lg flex items-center justify-center space-x-3 group relative overflow-hidden"
        >
          {isLoggingIn ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Continue with GitHub</span>
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-foreground/30 uppercase tracking-[0.2em] font-bold">
          Trusted by top engineering teams
        </p>
      </motion.div>
    </div>
  );
};
