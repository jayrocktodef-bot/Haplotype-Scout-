import React, { useState, useEffect } from 'react';
import { 
  Compass, ExternalLink, ShieldCheck, Heart, 
  RefreshCw, Layers, GitCompare, Home, GitBranch, BookOpen, Landmark,
  Map, Dna, Menu, X, ChevronRight, Sparkles, Activity
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  // Handle ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClearCache = async () => {
    if (confirm('Clear local cache and reload the application with the latest updates?')) {
      setClearing(true);
      await forceClearCacheAndReload();
    }
  };

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setIsMobileOpen(false);
  };

  const navItems = [
    {
      id: 'home' as NavTab,
      label: 'Studio',
      icon: Home,
      description: 'Upload DNA & Kit Manager',
      show: true
    },
    {
      id: 'result' as NavTab,
      label: 'Haplogroups',
      icon: Layers,
      description: 'Y-DNA & mtDNA Clade Calling',
      show: hasActiveResult,
      badge: 'Active'
    },
    {
      id: 'map' as NavTab,
      label: 'Paleomap',
      icon: Map,
      description: 'Ancient Migration Trails',
      show: hasActiveResult
    },
    {
      id: 'ancient' as NavTab,
      label: 'Ancient DNA',
      icon: Landmark,
      description: 'Archaeological Sample Matches',
      show: true
    },
    {
      id: 'archaic' as NavTab,
      label: 'Archaic & Phased',
      icon: Dna,
      description: 'Neanderthal & Microhaplotypes',
      show: hasActiveResult
    },
    {
      id: 'tree' as NavTab,
      label: 'Phylo-Tree',
      icon: Compass,
      description: 'Interactive Clade Hierarchy',
      show: true
    },
    {
      id: 'comparison' as NavTab,
      label: 'Compare',
      icon: GitCompare,
      description: 'Cross-Sample Genetic Matrix',
      show: true
    },
    {
      id: 'encyclopedia' as NavTab,
      label: 'Encyclopedia',
      icon: BookOpen,
      description: 'Global Clade Compendium',
      show: true
    }
  ];

  return (
    <>
      {/* ── Top Header Navigation Bar ─────────────────────────────── */}
      <header 
        className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-3 sm:px-6 bg-[#080c14]/95 backdrop-blur-xl border-b border-white/[0.08] transition-colors"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Identity */}
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

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold tracking-tight text-white leading-none group-hover:text-cyan-400 transition-colors">
                    Haplotype Scout
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    Studio
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
                  Written In The Genome
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Tabs (Hidden on Mobile/Tablet < lg) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
            {navItems.filter(item => item.show).map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30 font-extrabold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side actions & Mobile Header Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenDonation && (
              <button
                onClick={onOpenDonation}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 text-xs font-bold transition-all cursor-pointer active:scale-95"
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

            {/* Prominent High-Touch Mobile Hamburger Menu Button (Visible on < lg) */}
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden min-h-[40px] px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <Menu className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
              <span className="text-xs font-extrabold text-white tracking-wide">Menu</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Floating Bottom Tab Bar (Quick Thumb Navigation) ── */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080c14]/95 backdrop-blur-2xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-pb"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        {/* Tab 1: Studio / Home */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-cyan-400 bg-cyan-500/15 font-bold shadow-sm shadow-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">Studio</span>
        </button>

        {/* Tab 2: Haplogroups (if active result) or Ancient DNA */}
        {hasActiveResult ? (
          <button
            onClick={() => handleTabClick('result')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl transition-all cursor-pointer relative ${
              currentTab === 'result'
                ? 'text-cyan-400 bg-cyan-500/15 font-bold shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">Clades</span>
            <span className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>
        ) : (
          <button
            onClick={() => handleTabClick('ancient')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
              currentTab === 'ancient'
                ? 'text-cyan-400 bg-cyan-500/15 font-bold shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">Ancient</span>
          </button>
        )}

        {/* Tab 3: Phylo-Tree */}
        <button
          onClick={() => handleTabClick('tree')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'tree'
              ? 'text-cyan-400 bg-cyan-500/15 font-bold shadow-sm shadow-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">Tree</span>
        </button>

        {/* Tab 4: Compare */}
        <button
          onClick={() => handleTabClick('comparison')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'comparison'
              ? 'text-cyan-400 bg-cyan-500/15 font-bold shadow-sm shadow-cyan-500/10'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitCompare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-medium leading-none">Compare</span>
        </button>

        {/* Tab 5: All Modules Drawer Trigger */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-2 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
        >
          <Menu className="w-4 h-4 mb-0.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-slate-200 leading-none">All Tools</span>
        </button>
      </nav>

      {/* ── Mobile Sidebar Overlay & Drawer ───────────────────────── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fade-in"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar Drawer Panel with Generous Touch Targets */}
          <div className="relative w-[88vw] max-w-sm bg-[#080c14] border-r border-white/10 h-full flex flex-col justify-between shadow-2xl z-50 animate-slide-in-left">
            
            {/* Top: Header & Close */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-600 p-[1.5px] shadow-sm">
                  <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                    <Compass className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-white leading-none">Haplotype Scout</h3>
                  <span className="text-[11px] text-cyan-400 font-mono font-semibold mt-0.5 inline-block">Navigation Menu</span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-all cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle: Navigation Items with Large 52px+ Tap Targets */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-left">
              <div className="px-2 pb-1 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                Modules &amp; Tools
              </div>

              {navItems.filter(item => item.show).map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full min-h-[52px] flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer text-left group active:scale-[0.98] ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/15 border border-cyan-500/50 text-white shadow-md shadow-cyan-500/10'
                        : 'text-slate-200 hover:bg-slate-900/90 border border-white/[0.04] hover:border-slate-700/60 bg-slate-950/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30' : 'bg-slate-900 text-cyan-400 group-hover:bg-slate-800 border border-white/[0.06]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-extrabold truncate ${isActive ? 'text-cyan-300' : 'text-white'}`}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom: Ecosystem & Support */}
            <div className="p-4 border-t border-white/[0.08] space-y-3 bg-slate-950/60">
              <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold text-left">
                Genomics Suite
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <a
                  href="https://scout.writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all text-left"
                >
                  <span className="truncate">Genotype Scout</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                </a>

                <a
                  href="https://writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all text-left"
                >
                  <span className="truncate">Research Blog</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                </a>
              </div>

              {onOpenDonation && (
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    onOpenDonation();
                  }}
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-pink-500/15 hover:from-pink-500/25 hover:to-rose-500/25 text-pink-300 border border-pink-500/30 text-xs font-extrabold transition-all cursor-pointer active:scale-95"
                >
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                  <span>Support Written In The Genome</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
