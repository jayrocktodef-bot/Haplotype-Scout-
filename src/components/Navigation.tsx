import React, { useState } from 'react';
import { 
  Compass, ExternalLink, ShieldCheck, Heart, 
  RefreshCw, Layers, GitCompare, Home, GitBranch, BookOpen, Landmark,
  Map, Dna
} from 'lucide-react';
import { forceClearCacheAndReload } from '../utils/storage';

export type NavTab = 'home' | 'result' | 'map' | 'ancient' | 'archaic' | 'tree' | 'comparison' | 'encyclopedia';

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
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-3 sm:px-6 bg-[#080c14]/90 backdrop-blur-xl border-b border-white/[0.06] transition-colors"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
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

        {/* Navigation Tabs - Responsive Scroll Container */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 overflow-x-auto max-w-[calc(100vw-120px)] sm:max-w-none scrollbar-none">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              currentTab === 'home'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Studio</span>
          </button>

          {hasActiveResult && (
            <>
              <button
                onClick={() => onSelectTab('result')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  currentTab === 'result'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Haplogroups</span>
              </button>

              <button
                onClick={() => onSelectTab('map')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  currentTab === 'map'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Paleomap</span>
              </button>
            </>
          )}

          <button
            onClick={() => onSelectTab('ancient')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              currentTab === 'ancient'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Ancient DNA</span>
          </button>

          {hasActiveResult && (
            <button
              onClick={() => onSelectTab('archaic')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentTab === 'archaic'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Dna className="w-3.5 h-3.5" />
              <span>Archaic &amp; Phased</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('tree')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
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
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              currentTab === 'comparison'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Compare</span>
          </button>

          <button
            onClick={() => onSelectTab('encyclopedia')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              currentTab === 'encyclopedia'
                ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Clades</span>
          </button>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenDonation && (
            <button
              onClick={onOpenDonation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 text-xs font-bold transition-all cursor-pointer"
              title="Support Written In The Genome"
            >
              <Heart className="w-3.5 h-3.5 fill-pink-400" />
              <span className="hidden xl:inline">Donate</span>
            </button>
          )}

          <button
            onClick={handleClearCache}
            disabled={clearing}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all cursor-pointer"
            title="Force refresh & clear app cache"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${clearing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
};
