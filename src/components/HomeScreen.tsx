import React, { useRef, useState } from 'react';
import { 
  Upload, Sparkles, FileText, Lock, Zap, Clock, Globe, 
  ArrowRight, Trash2, Cpu, Compass, CheckCircle2, Binary, ChevronRight,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { SAMPLE_DNA_KITS } from '../data/sampleDnaKits';
import { DnaAnalysisResult } from '../types/haplogroup';

interface HomeScreenProps {
  onFileUpload: (file: File) => void;
  onRawTextSubmit: (rawText: string, kitName: string) => void;
  onSelectSampleKit: (kitId: string) => void;
  savedResults: DnaAnalysisResult[];
  onSelectSavedResult: (result: DnaAnalysisResult) => void;
  onDeleteSavedResult: (id: string, e: React.MouseEvent) => void;
  isProcessing: boolean;
  progressPercent: number;
  progressMessage: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onFileUpload,
  onRawTextSubmit,
  onSelectSampleKit,
  savedResults,
  onSelectSavedResult,
  onDeleteSavedResult,
  isProcessing,
  progressPercent,
  progressMessage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [customKitName, setCustomKitName] = useState('My DNA Profile');
  const [showGlobalReferences, setShowGlobalReferences] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    onRawTextSubmit(pastedText, customKitName || 'Custom Sample');
    setShowPasteModal(false);
    setPastedText('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-up py-4 text-left">
      
      {/* Studio Top Control Strip (Replaces giant drag/drop) */}
      <div className="bento-card p-6 sm:p-8 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Phylogenetic Traversal Studio</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Haplotype <span className="text-gradient-cyan">Studio</span>
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              High-resolution Y-DNA &amp; mtDNA lineage mapping with DAG tree walking, 4.5x weighted transversions, and microhaplotype block phasing.
            </p>
          </div>

          {/* Compact Upload & Ingest Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            
            {isProcessing ? (
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-xs">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0" />
                <div className="space-y-0.5">
                  <div className="font-bold text-white truncate max-w-[200px]">{progressMessage}</div>
                  <div className="text-[10px] text-cyan-400 font-mono font-bold">{progressPercent}% complete</div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Raw DNA File</span>
                </button>

                <button
                  onClick={() => setShowPasteModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Paste Snippet</span>
                </button>
              </>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.csv,.tsv,.vcf,.zip"
              className="hidden"
            />
          </div>

        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/[0.06] text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-medium">100% In-Browser Privacy</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-medium">DAG Negative Guarding</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Binary className="w-4 h-4 text-violet-400 shrink-0" />
            <span className="font-medium">LD Proxy Imputation ($r^2 \ge 0.95$)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium">Build 17 Transversions</span>
          </div>
        </div>

      </div>

      {/* Main Studio 2-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 1-Click Interactive Benchmark Kits (2-col span) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bento-card p-4 sm:p-5">
            <button
              onClick={() => setShowGlobalReferences(!showGlobalReferences)}
              className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                      Global Reference Cohorts
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 font-semibold">
                      {SAMPLE_DNA_KITS.length} Kits
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-loaded archetypal modern & ancient test genomes for 1-click evaluation
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-cyan-300 transition-colors">
                <span className="hidden sm:inline font-mono text-[11px]">
                  {showGlobalReferences ? 'Collapse' : 'Expand'}
                </span>
                <div className="p-1 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 group-hover:text-white transition-colors">
                  {showGlobalReferences ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {showGlobalReferences && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4 pt-4 border-t border-white/[0.06] animate-in fade-in duration-200">
                {SAMPLE_DNA_KITS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => onSelectSampleKit(sample.id)}
                    className="bento-card-interactive p-4 cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                          {sample.subtitle}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </div>

                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {sample.title}
                      </h3>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {sample.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-white/[0.04] text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                        Y: {sample.paternalHaplo}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-rose-300 font-bold">
                        mt: {sample.maternalHaplo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Saved Profiles & Engine Telemetry */}
        <div className="space-y-6">
          
          {/* Saved Profiles */}
          <div className="bento-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Local Profiles</h2>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{savedResults.length} saved</span>
            </div>

            {savedResults.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 space-y-1">
                <p>No analyzed kits saved yet.</p>
                <p className="text-[10px]">Upload a file or pick a benchmark kit above.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {savedResults.map((saved) => (
                  <div
                    key={saved.id}
                    onClick={() => onSelectSavedResult(saved)}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 cursor-pointer group flex items-center justify-between transition-all"
                  >
                    <div className="space-y-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                        {saved.kitName}
                      </h4>
                      <div className="flex gap-1.5 text-[10px] font-mono">
                        {saved.paternalLineage && (
                          <span className="text-cyan-400">{saved.paternalLineage.terminalHaplogroup.code}</span>
                        )}
                        {saved.paternalLineage && saved.maternalLineage && <span className="text-slate-600">/</span>}
                        {saved.maternalLineage && (
                          <span className="text-rose-400">{saved.maternalLineage.terminalHaplogroup.code}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => onDeleteSavedResult(saved.id, e)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-950/40 transition-all opacity-0 group-hover:opacity-100"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Engine Specs */}
          <div className="bento-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Engine Specs</h3>
            </div>
            
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Y-Tree Architecture:</span>
                <span className="font-mono text-cyan-300">ISOGG DAG Radix</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">mtDNA Reference:</span>
                <span className="font-mono text-cyan-300">PhyloTree Build 17</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-slate-400">Imputation Linkage:</span>
                <span className="font-mono text-cyan-300">$r^2 \ge 0.95$ Proxies</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Worker Isolation:</span>
                <span className="font-mono text-emerald-400">Dedicated Thread</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Raw Snippet Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bento-card max-w-lg w-full p-6 text-left space-y-4 border border-cyan-500/40">
            <h3 className="text-base font-bold text-white">Paste Raw Genotype Snippet</h3>
            <p className="text-xs text-slate-400">
              Paste SNP markers with rsIDs or coordinates to execute instant in-browser classification.
            </p>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 leading-normal">
              ⚠️ <strong>Note:</strong> Most consumer microarray tests test only a fraction of Y-DNA &amp; mtDNA markers. Classification depth is strictly determined by the loci included in your pasted data.
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Profile Name</label>
              <input
                type="text"
                value={customKitName}
                onChange={(e) => setCustomKitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Raw Data Text</label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                rows={8}
                placeholder={"rs9786184\tY\t18515000\tTT\nrs28358280\tMT\t7028\tCC\n..."}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPasteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handlePasteSubmit}
                disabled={!pastedText.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
              >
                Run Classification
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
