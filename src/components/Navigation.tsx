import React, { useState } from 'react';
import { 
  Dna, BookOpen, ExternalLink, ShieldCheck, Heart, Coffee, 
  Sparkles, RefreshCw, Layers, GitCompare, Home, GitBranch, ArrowUpRight
} from 'lucide-react';
import { forceClearCacheAndReload } from '../utils/storage';

export type NavTab = 'home' | 'result' | 'comparison' | 'encyclopedia';

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
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 bg-[#09090b]/85 backdrop-blur-xl border-b border-white/[0.08] transition-colors"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Left Brand Identity with official blog logo and link */}
        <div className="flex items-center gap-3">
          <a
            href="https://writteninthegenome.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group select-none active:scale-95 transition-transform"
            title="Written In The Genome Official Blog"
          >
            <div className="relative flex items-center justify-center">
              <img
                src="https://writteninthegenome.blog/wp-content/uploads/2026/03/cropped-1000055020-e1773637919503.webp"
                alt="Written In The Genome"
                className="w-7 h-7 rounded-lg ring-1 ring-teal-500/30 group-hover:ring-teal-400 transition-all shadow-sm object-cover"
                onError={(e) => {
                  // Fallback icon if offline
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#09090b]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-white leading-none group-hover:text-teal-400 transition-colors">
                  Haplotype Scout
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  v1.2
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                Written In The Genome
              </span>
            </div>
          </a>
        </div>

        {/* Center / Quick Ecosystem Links (Hidden on small mobile) */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs">
          <a
            href="https://writteninthegenome.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-teal-400 font-bold transition-colors"
          >
            <span>Blog</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://writteninthegenome.blog/dispatches-archives/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-teal-400 font-bold transition-colors"
          >
            <span>Dispatches</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://writteninthegenome.blog/sources-research-library/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-teal-400 font-bold transition-colors"
          >
            <span>Research Library</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://github.com/jayrocktodef-bot/Haplotype-Scout-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-slate-300 hover:text-teal-400 font-bold transition-colors"
          >
            <GitBranch className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Center/Right Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentTab === 'home'
                ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Workspace</span>
          </button>

          {hasActiveResult && (
            <button
              onClick={() => onSelectTab('result')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                currentTab === 'result'
                  ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lineage</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentTab === 'comparison'
                ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => onSelectTab('encyclopedia')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              currentTab === 'encyclopedia'
                ? 'bg-teal-500 text-slate-950 shadow-sm shadow-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clades</span>
          </button>
        </nav>

        {/* Right Controls: Donation Button & Cache Flush */}
        <div className="flex items-center gap-2">
          {onOpenDonation && (
            <button
              onClick={onOpenDonation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-amber-500/15 text-amber-300 hover:from-amber-500/25 hover:to-rose-500/25 border border-amber-500/30 text-xs font-bold transition-all shadow-sm active:scale-95"
              title="Support open-source development and research"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span className="hidden md:inline">Support Project</span>
            </button>
          )}

          <button
            onClick={handleClearCache}
            disabled={clearing}
            title="Force Flush PWA Cache & Update App"
            className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-white/[0.06] border border-white/[0.08] transition-all text-xs flex items-center"
          >
            <RefreshCw className={`w-4 h-4 ${clearing ? 'animate-spin text-teal-400' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
};
