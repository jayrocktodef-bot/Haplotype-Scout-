import React, { useEffect, useState } from 'react';
import { Navigation, NavTab } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AnalysisResultScreen } from './components/AnalysisResultScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { EncyclopediaScreen } from './components/EncyclopediaScreen';
import { DonationModal } from './components/DonationModal';
import { DnaAnalysisResult } from './types/haplogroup';
import { getAllSavedKits, saveAnalysisResult, deleteSavedKit } from './utils/storage';
import { SAMPLE_DNA_KITS } from './data/sampleDnaKits';
import { Heart, ExternalLink, GitBranch, Sparkles, BookOpen, ShieldCheck, Dna } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeResult, setActiveResult] = useState<DnaAnalysisResult | null>(null);
  const [savedKits, setSavedKits] = useState<DnaAnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);

  // Load saved kit results from IndexedDB on startup
  useEffect(() => {
    loadSavedKits();
  }, []);

  const loadSavedKits = async () => {
    try {
      const kits = await getAllSavedKits();
      setSavedKits(kits);
    } catch (e) {
      console.error('Failed to load saved kits:', e);
    }
  };

  const runWorkerAnalysis = (payload: { file?: File; rawText?: string; kitName: string }) => {
    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingMessage('Initializing Web Worker...');

    const worker = new Worker(new URL('./workers/dnaWorker.ts', import.meta.url), { type: 'module' });

    worker.onmessage = async (e: MessageEvent) => {
      const data = e.data;
      if (data.type === 'PROGRESS') {
        setProcessingProgress(data.progress);
        setProcessingMessage(data.message);
      } else if (data.type === 'SUCCESS') {
        const result: DnaAnalysisResult = data.result;
        setActiveResult(result);
        await saveAnalysisResult(result);
        await loadSavedKits();
        setIsProcessing(false);
        setCurrentTab('result');
        worker.terminate();
      } else if (data.type === 'ERROR') {
        alert(`Analysis error: ${data.message}`);
        setIsProcessing(false);
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
      alert('An error occurred during genetic analysis in the Web Worker.');
      setIsProcessing(false);
      worker.terminate();
    };

    worker.postMessage({
      type: 'ANALYZE_DNA',
      ...payload
    });
  };

  const handleFileUpload = (file: File) => {
    const kitName = file.name.replace(/\.[^/.]+$/, '');
    runWorkerAnalysis({ file, kitName });
  };

  const handleRawTextSubmit = (rawText: string, kitName: string) => {
    runWorkerAnalysis({ rawText, kitName: kitName || 'Custom DNA Sample' });
  };

  const handleSelectSampleKit = (kitId: string) => {
    const sample = SAMPLE_DNA_KITS.find(s => s.id === kitId);
    if (!sample) return;
    runWorkerAnalysis({
      rawText: sample.rawSnippetContent,
      kitName: sample.title
    });
  };

  const handleSelectSavedKit = (kit: DnaAnalysisResult) => {
    setActiveResult(kit);
    setCurrentTab('result');
  };

  const handleDeleteSavedKit = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this saved profile?')) {
      await deleteSavedKit(id);
      if (activeResult?.id === id) {
        setActiveResult(null);
        if (currentTab === 'result') setCurrentTab('home');
      }
      await loadSavedKits();
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-100 flex flex-col selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Top Header Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasActiveResult={activeResult !== null}
        onOpenDonation={() => setShowDonationModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-20">
        {currentTab === 'home' && (
          <HomeScreen
            onFileUpload={handleFileUpload}
            onRawTextSubmit={handleRawTextSubmit}
            onSelectSampleKit={handleSelectSampleKit}
            savedResults={savedKits}
            onSelectSavedResult={handleSelectSavedKit}
            onDeleteSavedResult={handleDeleteSavedKit}
            isProcessing={isProcessing}
            progressPercent={processingProgress}
            progressMessage={processingMessage}
          />
        )}

        {currentTab === 'result' && activeResult && (
          <AnalysisResultScreen
            result={activeResult}
            onReset={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'comparison' && (
          <ComparisonScreen
            savedKits={savedKits}
            onSelectKit={handleSelectSavedKit}
          />
        )}

        {currentTab === 'encyclopedia' && (
          <EncyclopediaScreen />
        )}
      </main>

      {/* Rich Footer with Branding & Ecosystem Links */}
      <footer className="border-t border-white/[0.08] py-12 px-4 sm:px-6 bg-[#09090b]/90 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="https://writteninthegenome.blog/wp-content/uploads/2026/03/cropped-1000055020-e1773637919503.webp"
                alt="Written In The Genome"
                className="w-7 h-7 rounded-lg ring-1 ring-teal-500/30 object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-base font-black text-white">Written In The Genome</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Pioneering private, client-side bioinformatics tools and publishing independent genomic research exploring ancient DNA, population genetics, and human history.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDonationModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-300 hover:from-amber-500/25 hover:to-rose-500/25 border border-amber-500/30 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Support Our Research</span>
              </button>
            </div>
          </div>

          {/* Research & Publications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Publications &amp; Dispatches</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>Main Blog Home</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://writteninthegenome.blog/dispatches-archives/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>Dispatches Archive</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://writteninthegenome.blog/sources-research-library/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>Sources &amp; Research Library</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Genomic Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/jayrocktodef-bot/WITG-Genotype-Scout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>Genotype Scout</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jayrocktodef-bot/Haplotype-Scout-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  <span>Haplotype Scout Repository</span>
                  <GitBranch className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline &amp; Private
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/[0.06] text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Written In The Genome. All rights reserved.</p>
        </div>
      </footer>

      {/* Donation & Support Modal */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />

    </div>
  );
};

export default App;
