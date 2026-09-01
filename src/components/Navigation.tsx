import React from 'react';
import { ShieldCheck, RefreshCw, Layers, BookOpen, GitCompare, Home, ExternalLink, Dna } from 'lucide-react';
import { forceClearCacheAndReload } from '../utils/storage';

export type NavTab = 'home' | 'result' | 'comparison' | 'encyclopedia';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasActiveResult: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  hasActiveResult
}) => {
  const [clearing, setClearing] = React.useState(false);

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
        
        {/* Left Brand Identity matching Genotype Scout */}
        <div 
          onClick={() => onSelectTab('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none active:scale-95 transition-transform"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-indigo-600 p-[1.5px] shadow-sm group-hover:ring-2 group-hover:ring-teal-400/50 transition-all">
              <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center">
                <Dna className="w-4 h-4 text-teal-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#09090b]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black tracking-tight text-white leading-none group-hover:text-teal-400 transition-colors">
                Haplotype Scout
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                PWA v1.1
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              Y-DNA &amp; mtDNA Phylogenetic Sandbox
            </span>
          </div>
        </div>

        {/* Center Navigation Tabs */}
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
            <span className="hidden sm:inline">Encyclopedia</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Client-Side Private</span>
          </div>

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
