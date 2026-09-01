import React, { useRef, useState } from 'react';
import { UploadCloud, FileCode, CheckCircle2, Shield, Sparkles, AlertCircle, ArrowRight, Trash2, Clock, Activity } from 'lucide-react';
import { SAMPLE_DNA_KITS } from '../data/sampleDnaKits';
import { DnaAnalysisResult, SampleDnaKit } from '../types/haplogroup';

interface HomeScreenProps {
  onAnalyzeFile: (file: File) => void;
  onAnalyzeText: (text: string, title: string) => void;
  isProcessing: boolean;
  processingProgress: number;
  processingMessage: string;
  savedKits: DnaAnalysisResult[];
  onSelectSavedKit: (kit: DnaAnalysisResult) => void;
  onDeleteSavedKit: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onAnalyzeFile,
  onAnalyzeText,
  isProcessing,
  processingProgress,
  processingMessage,
  savedKits,
  onSelectSavedKit,
  onDeleteSavedKit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('Pasted Raw DNA Data');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onAnalyzeFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      e.target.value = ''; // Reset for mobile re-selection
      onAnalyzeFile(file);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteText.trim()) return;
    onAnalyzeText(pasteText, pasteTitle);
    setShowPasteModal(false);
    setPasteText('');
  };

  const handleSelectSample = (sample: SampleDnaKit) => {
    onAnalyzeText(sample.rawSnippetContent, sample.title);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 pb-2 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Phylogenetic Tree Analysis</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Paternal & Maternal Lineage <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Haplogroup Scout
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
          Uncover your deep ancestral origin, ancient migration routes, and branch-defining mutations. 
          100% browser-based, client-side, zero-server DNA processing.
        </p>

        {/* Privacy Pill */}
        <div className="inline-flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-1.5 rounded-full">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Your genetic data never leaves your device or browser RAM</span>
        </div>
      </section>

      {/* Main Upload Zone & Processing Box */}
      <section className="max-w-3xl mx-auto px-4">
        {isProcessing ? (
          <div className="glass-panel rounded-2xl p-8 text-center space-y-6 border border-cyan-500/30 glow-cyan">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto animate-pulse">
              <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Analyzing Genomic Lineage...</h3>
              <p className="text-sm text-cyan-300 font-mono">{processingMessage}</p>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${processingProgress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 font-mono">{processingProgress}% complete</p>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`glass-panel rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 border-2 border-dashed ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-950/20 scale-[1.01]' 
                : 'border-slate-700/80 hover:border-cyan-500/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv,.tsv,.vcf,.zip"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Drop your Raw DNA file here
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-md mx-auto">
              Supports <strong>23andMe</strong>, <strong>AncestryDNA</strong>, <strong>MyHeritage</strong>, <strong>FTDNA</strong>, and <strong>WGS/VCF</strong> (.txt, .csv, .zip)
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Select DNA File</span>
              </button>

              <button
                onClick={() => setShowPasteModal(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium text-sm transition-all flex items-center justify-center space-x-2"
              >
                <FileCode className="w-4 h-4 text-slate-400" />
                <span>Paste DNA Text</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Saved Profiles (IndexedDB) */}
      {savedKits.length > 0 && (
        <section className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">Your Saved Lineage Analyses</h2>
            </div>
            <span className="text-xs text-slate-400">{savedKits.length} cached profiles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedKits.map((kit) => (
              <div 
                key={kit.id}
                onClick={() => onSelectSavedKit(kit)}
                className="glass-panel-interactive rounded-xl p-4 cursor-pointer relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors truncate pr-6">
                      {kit.kitName}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete saved profile "${kit.kitName}"?`)) {
                          onDeleteSavedKit(kit.id);
                        }
                      }}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-3">
                    {new Date(kit.timestamp).toLocaleDateString()} • {kit.totalSnpsParsed.toLocaleString()} SNPs
                  </p>

                  <div className="space-y-1.5 mb-3">
                    {kit.paternalLineage && (
                      <div className="flex items-center justify-between text-xs bg-slate-900/60 rounded px-2 py-1 border border-slate-800">
                        <span className="text-slate-400 font-medium">Y-DNA</span>
                        <span className="text-cyan-300 font-bold font-mono">
                          {kit.paternalLineage.terminalHaplogroup.code}
                        </span>
                      </div>
                    )}
                    {kit.maternalLineage && (
                      <div className="flex items-center justify-between text-xs bg-slate-900/60 rounded px-2 py-1 border border-slate-800">
                        <span className="text-slate-400 font-medium">mtDNA</span>
                        <span className="text-rose-300 font-bold font-mono">
                          {kit.maternalLineage.terminalHaplogroup.code}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-cyan-400 pt-2 border-t border-slate-800/80">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 1-Click Interactive Demo Profiles */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h2 className="text-base sm:text-lg font-bold text-white">1-Click Global Reference Kits</h2>
          </div>
          <span className="text-xs text-slate-400">Instant Demonstration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_DNA_KITS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSelectSample(sample)}
              className="glass-panel-interactive rounded-xl p-4 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors mb-1">
                  {sample.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                  {sample.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                    Y: {sample.paternalHaplo}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/40">
                    mt: {sample.maternalHaplo}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-indigo-400 pt-2 border-t border-slate-800/80 font-medium">
                <span>Load Profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Paste Raw DNA Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 max-w-xl w-full border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <span>Paste Raw DNA Snippet</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kit Title</label>
              <input
                type="text"
                value={pasteTitle}
                onChange={(e) => setPasteTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. My 23andMe Raw Data"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Raw Lines (RSID, Chr, Pos, Genotype)</label>
              <textarea
                rows={8}
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={"# rsid\tchromosome\tposition\tgenotype\nrs9306841\tY\t13533801\tT\nrs2853493\tMT\t769\tA"}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePasteSubmit}
                disabled={!pasteText.trim()}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all disabled:opacity-50"
              >
                Analyze DNA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
