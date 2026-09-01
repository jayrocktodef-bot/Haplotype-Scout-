import React, { useEffect, useState } from 'react';
import { Navigation, NavTab } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AnalysisResultScreen } from './components/AnalysisResultScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { EncyclopediaScreen } from './components/EncyclopediaScreen';
import { PhylogeneticTreeViewer } from './components/PhylogeneticTreeViewer';
import { DonationModal } from './components/DonationModal';
import { DnaAnalysisResult } from './types/haplogroup';
import { getAllSavedKits, saveAnalysisResult, deleteSavedKit } from './utils/storage';
import { SAMPLE_DNA_KITS } from './data/sampleDnaKits';
import { Heart, ExternalLink, GitBranch, ShieldCheck, Compass, Sparkles, Activity, Dna, Database } from 'lucide-react';

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
      console.warn('Failed to fetch saved kits from IndexedDB:', e);
    }
  };

  const handleFileUpload = (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingMessage('Initializing bioinformatics worker...');

    const worker = new Worker(new URL('./workers/dnaWorker.ts', import.meta.url), {
      type: 'module'
    });

    worker.onmessage = async (e) => {
      const { type, progress, message, result, error } = e.data;

      if (type === 'PROGRESS') {
        if (progress !== undefined) setProcessingProgress(progress);
        if (message) setProcessingMessage(message);
      } else if (type === 'SUCCESS' && result) {
        setIsProcessing(false);
        setActiveResult(result);
        await saveAnalysisResult(result);
        await loadSavedKits();
        setCurrentTab('result');
        worker.terminate();
      } else if (type === 'ERROR') {
        setIsProcessing(false);
        alert(`Analysis failed: ${error}`);
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      setIsProcessing(false);
      alert(`Worker error: ${err.message}`);
      worker.terminate();
    };

    worker.postMessage({
      type: 'PARSE_FILE',
      file,
      fileName: file.name
    });
  };

  const handleRawTextSubmit = (rawText: string, kitName: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setProcessingMessage('Initializing analysis worker...');

    const worker = new Worker(new URL('./workers/dnaWorker.ts', import.meta.url), {
      type: 'module'
    });

    worker.onmessage = async (e) => {
      const { type, progress, message, result, error } = e.data;

      if (type === 'PROGRESS') {
        if (progress !== undefined) setProcessingProgress(progress);
        if (message) setProcessingMessage(message);
      } else if (type === 'SUCCESS' && result) {
        setIsProcessing(false);
        setActiveResult(result);
        await saveAnalysisResult(result);
        await loadSavedKits();
        setCurrentTab('result');
        worker.terminate();
      } else if (type === 'ERROR') {
        setIsProcessing(false);
        alert(`Analysis failed: ${error}`);
        worker.terminate();
      }
    };

    worker.postMessage({
      type: 'PARSE_TEXT',
      text: rawText,
      fileName: kitName
    });
  };

  const handleSelectSampleKit = (kitKey: string) => {
    const sample = SAMPLE_DNA_KITS.find(k => k.id === kitKey);
    if (!sample) return;

    handleRawTextSubmit(sample.rawSnippetContent, sample.title);
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
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
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
            onExploreTree={() => setCurrentTab('tree')}
          />
        )}

        {currentTab === 'tree' && (
          <PhylogeneticTreeViewer
            activeResult={activeResult}
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

      {/* Rich Footer with Branding & Cross-Tool Integration */}
      <footer className="border-t border-white/[0.08] py-12 px-4 sm:px-6 bg-[#080c14]/90 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="https://writteninthegenome.blog/wp-content/uploads/2026/03/cropped-1000055020-e1773637919503.webp"
                alt="Written In The Genome"
                className="w-7 h-7 rounded-lg ring-1 ring-cyan-500/30 object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-base font-extrabold text-white">Written In The Genome</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Pioneering private, client-side bioinformatics tools and publishing independent genomic research exploring ancient DNA, population genetics, and deep phylogenetic history.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDonationModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-rose-500/15 text-amber-300 hover:from-amber-500/25 hover:to-rose-500/25 border border-amber-500/30 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
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
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
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
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
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
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <span>Sources &amp; Research Library</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Suite & Cross-Tool Integration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Genomic Suite Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://scout.writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-cyan-400 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-teal-400" />
                  <span>Genotype Scout (Ancestry &amp; Health)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://haplotype.writteninthegenome.blog"
                  className="text-cyan-400 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Haplotype Scout (Y &amp; mtDNA Studio)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://merge.writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-amber-400 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Dna className="w-3.5 h-3.5 text-amber-400" />
                  <span>DNA SuperKit Builder (Raw Merger)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://familyarchive.writteninthegenome.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-indigo-400 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Family Archive &amp; Records</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jayrocktodef-bot/Haplotype-Scout-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <GitBranch className="w-3 h-3 opacity-60" />
                  <span>Open Source Engine (GitHub)</span>
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline &amp; Zero-Upload
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
