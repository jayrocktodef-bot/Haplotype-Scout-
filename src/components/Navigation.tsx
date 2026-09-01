import React, { useState } from 'react';
import { 
  Compass, ExternalLink, ShieldCheck, Heart, 
  RefreshCw, Layers, GitCompare, Home, GitBranch, BookOpen, Landmark
} from 'lucide-react';
import { forceClearCacheAndReload } from '../utils/storage';

export type NavTab = 'home' | 'result' | 'ancient' | 'tree' | 'comparison' | 'encyclopedia';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasActiveResult: boolean;
  onOpenDonation?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  hasActiveResult,
  onOpenDonation
}) => {
  const [clearing, setClearing] = useState(false);

  const handleClearCache = async () => {
    if (confirm('Clear local cache and reload the application with the latest PWA updates?')) {
      setClearing(true);
      await forceClearCacheAndReload();
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 bg-[#080c14]/85 backdrop-blur-xl border-b border-white/[0.06] transition-colors"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <a
            href="https://writteninthegenome.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group select-none active:scale-95 transition-transform"
            title="Written In The Genome Official Blog"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-600 p-[1.5px] shadow-sm group-hover:ring-2 group-hover:ring-cyan-400/50 transition-all">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Compass className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-tight text-white leading-none group-hover:text-cyan-400 transition-colors">
                  Haplotype Scout
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Studio
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Written In The Genome
              </span>
            </div>
          </a>
        </div>

        {/* Center / Ecosystem Links */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-xs">
          <a
            href="https://writteninthegenome.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-slate-300 hover:text-cyan-400 font-medium transition-colors"
          >
            <span>Blog</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://writteninthegenome.blog/dispatches-archives/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-slate-300 hover:text-cyan-400 font-medium transition-colors"
          >
            <span>Dispatches</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://github.com/jayrocktodef-bot/Haplotype-Scout-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-slate-300 hover:text-cyan-400 font-medium transition-colors"
          >
            <GitBranch className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'home'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Studio</span>
          </button>

          {hasActiveResult && (
            <button
              onClick={() => onSelectTab('result')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentTab === 'result'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Haplogroups</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('ancient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'ancient'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ancient DNA</span>
          </button>

          <button
            onClick={() => onSelectTab('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'tree'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phylo-Tree</span>
          </button>

          <button
            onClick={() => onSelectTab('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'comparison'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => onSelectTab('encyclopedia')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentTab === 'encyclopedia'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clades</span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenDonation && (
            <button
              onClick={onOpenDonation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-amber-300 text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Support research"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span className="hidden md:inline">Support</span>
            </button>
          )}

          <button
            onClick={handleClearCache}
            disabled={clearing}
            title="Flush PWA Cache"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 transition-all text-xs flex items-center"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${clearing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
};
