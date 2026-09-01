import React, { useState, useEffect } from 'react';
import { Navigation, NavTab } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AnalysisResultScreen } from './components/AnalysisResultScreen';
import { ComparisonScreen } from './components/ComparisonScreen';
import { EncyclopediaScreen } from './components/EncyclopediaScreen';
import { DnaAnalysisResult } from './types/haplogroup';
import { getAllSavedKits, saveAnalysisResult, deleteSavedKit } from './utils/storage';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeResult, setActiveResult] = useState<DnaAnalysisResult | null>(null);
  const [savedKits, setSavedKits] = useState<DnaAnalysisResult[]>([]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');

  // Load saved kits on mount
  useEffect(() => {
    loadSavedKits();
  }, []);

  const loadSavedKits = async () => {
    const kits = await getAllSavedKits();
    setSavedKits(kits);
  };

  const runAnalysisWorker = (payload: { file?: File; text?: string; fileName?: string }) => {
    setIsProcessing(true);
    setProcessingProgress(5);
    setProcessingMessage('Spawning dedicated genomic Web Worker...');

    const worker = new Worker(new URL('./workers/dnaWorker.ts', import.meta.url), {
      type: 'module'
    });

    worker.onmessage = async (e) => {
      const { type, progress, message, result, error } = e.data;

      if (type === 'PROGRESS') {
        if (progress !== undefined) setProcessingProgress(progress);
        if (message) setProcessingMessage(message);
      } else if (type === 'SUCCESS') {
        setIsProcessing(false);
        setActiveResult(result);
        await saveAnalysisResult(result);
        await loadSavedKits();
        setCurrentTab('result');

        // Confetti celebration
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (_) {}

        worker.terminate();
      } else if (type === 'ERROR') {
        setIsProcessing(false);
        alert(`Analysis Error: ${error || 'Failed to process raw DNA file.'}`);
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      console.error('Worker error:', err);
      setIsProcessing(false);
      alert('An error occurred inside the DNA analysis worker.');
      worker.terminate();
    };

    if (payload.file) {
      worker.postMessage({
        type: 'PARSE_FILE',
        file: payload.file,
        fileName: payload.file.name
      });
    } else if (payload.text) {
      worker.postMessage({
        type: 'PARSE_TEXT',
        text: payload.text,
        fileName: payload.fileName || 'Pasted Sample'
      });
    }
  };

  const handleAnalyzeFile = (file: File) => {
    runAnalysisWorker({ file });
  };

  const handleAnalyzeText = (text: string, title: string) => {
    runAnalysisWorker({ text, fileName: title });
  };

  const handleSelectSavedKit = (kit: DnaAnalysisResult) => {
    setActiveResult(kit);
    setCurrentTab('result');
  };

  const handleDeleteSavedKit = async (id: string) => {
    await deleteSavedKit(id);
    if (activeResult?.id === id) {
      setActiveResult(null);
      if (currentTab === 'result') setCurrentTab('home');
    }
    await loadSavedKits();
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Header Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasActiveResult={activeResult !== null}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'home' && (
          <HomeScreen
            onAnalyzeFile={handleAnalyzeFile}
            onAnalyzeText={handleAnalyzeText}
            isProcessing={isProcessing}
            processingProgress={processingProgress}
            processingMessage={processingMessage}
            savedKits={savedKits}
            onSelectSavedKit={handleSelectSavedKit}
            onDeleteSavedKit={handleDeleteSavedKit}
          />
        )}

        {currentTab === 'result' && activeResult && (
          <AnalysisResultScreen
            result={activeResult}
            onBack={() => setCurrentTab('home')}
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
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 glass-panel">
        <p className="max-w-2xl mx-auto px-4">
          <strong>Haplotype Scout PWA</strong> • Companion Tool to Genotype Scout • 100% Private Client-Side Genetic Exploration
        </p>
      </footer>

    </div>
  );
};

export default App;
