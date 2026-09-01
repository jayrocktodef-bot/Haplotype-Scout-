import React, { useEffect, useState } from 'react';
import { Navigation, NavTab } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AnalysisResultScreen } from './components/AnalysisResultScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { EncyclopediaScreen } from './components/EncyclopediaScreen';
import { DnaAnalysisResult } from './types/haplogroup';
import { getAllSavedKits, saveAnalysisResult, deleteSavedKit } from './utils/storage';
import { SAMPLE_DNA_KITS } from './data/sampleDnaKits';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeResult, setActiveResult] = useState<DnaAnalysisResult | null>(null);
  const [savedKits, setSavedKits] = useState<DnaAnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');

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
      
      {/* Top Header Navigation matching Genotype Scout */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasActiveResult={activeResult !== null}
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

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-slate-500 bg-[#09090b]/80 backdrop-blur-md">
        <p className="max-w-2xl mx-auto px-4">
          <strong>Haplotype Scout PWA</strong> • SOTA In-Browser Phylogenetic Exploration • Written In The Genome
        </p>
      </footer>

    </div>
  );
};

export default App;
