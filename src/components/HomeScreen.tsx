import React, { useRef, useState } from 'react';
import { 
  Upload, Shield, Zap, Lock, Database, Dna, ArrowRight, 
  Sparkles, CheckCircle2, FileText, Trash2, Clock, Globe
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
  const [isDragActive, setIsDragActive] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [customKitName, setCustomKitName] = useState('Pasted Genotype Profile');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    onRawTextSubmit(pastedText, customKitName || 'Custom DNA Sample');
    setShowPasteModal(false);
    setPastedText('');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6 text-center animate-fade-up relative overflow-hidden">
      
      {/* Background ambient lighting matching Genotype Scout */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-teal-500/10 via-emerald-500/5 to-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 space-y-8">
        
        {/* Curated Reference Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-teal-500/15 text-teal-400 rounded-full text-[11px] font-black uppercase tracking-[0.2em] ring-1 ring-teal-500/30 shadow-sm">
          <Database className="w-3.5 h-3.5 text-teal-400" />
          <span>ISOGG &amp; PhyloTree Build 17 Engine Active</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1] text-gradient">
            Trace Your Ancient Lineage <br />
            <span className="text-gradient-teal">
              100% Privately.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Decode your paternal (Y-DNA) and maternal (mtDNA) haplogroups with deep DAG phylogenetic tree traversal, LD proxy imputation, and weighted transversion scoring <span className="text-white font-bold underline decoration-teal-400 decoration-2 underline-offset-4">entirely inside your browser</span>.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
          className={`relative max-w-2xl mx-auto p-8 sm:p-12 rounded-[2.25rem] border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden group ${
            isDragActive 
              ? 'border-teal-400 bg-teal-950/30 glow-teal scale-[1.02]' 
              : 'border-slate-800 bg-[#121216]/80 backdrop-blur-xl hover:border-teal-500/70 hover:shadow-xl'
          } ${isProcessing ? 'pointer-events-none opacity-80' : ''}`}
        >
          {/* Subtle Corner Brackets matching Genotype Scout */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-teal-500/40 rounded-tl-sm pointer-events-none group-hover:border-teal-400 transition-colors" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-teal-500/40 rounded-tr-sm pointer-events-none group-hover:border-teal-400 transition-colors" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-teal-500/40 rounded-bl-sm pointer-events-none group-hover:border-teal-400 transition-colors" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-teal-500/40 rounded-br-sm pointer-events-none group-hover:border-teal-400 transition-colors" />

          {isProcessing ? (
            <div className="space-y-4 py-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center animate-spin">
                <Dna className="w-7 h-7 text-teal-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">{progressMessage}</h3>
                <div className="w-64 max-w-full mx-auto bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-teal-400 font-mono font-bold">{progressPercent}%</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 ${
                isDragActive 
                  ? 'bg-teal-500 text-slate-950 rotate-12 scale-110 shadow-lg shadow-teal-500/40' 
                  : 'bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20 group-hover:scale-110'
              }`}>
                <Upload className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Drop your raw DNA file here
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-sm">
                Supports <strong className="text-teal-400 font-bold">.txt, .csv, or .zip</strong> from 23andMe, Ancestry, MyHeritage, FTDNA &amp; WGS
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-full text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select File from Device</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPasteModal(true);
                  }}
                  className="px-5 py-3 bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-bold rounded-full text-xs uppercase tracking-wider transition-all border border-white/[0.08] flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                  <span>Paste Snippet</span>
                </button>
              </div>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept=".txt,.csv,.tsv,.vcf,.zip"
            className="hidden" 
          />
        </div>

        {/* Privacy & Science Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-2 text-left">
          <div className="premium-card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">100% Client-Side</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Files are processed entirely on your device via isolated Web Workers. Zero genomic data leaves your phone or computer.
            </p>
          </div>

          <div className="premium-card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">DAG Tree Traversal</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navigates directed phylogenetic trees with ancestral guarding, homoplasy mitigation, and 4.5x weighted transversions.
            </p>
          </div>

          <div className="premium-card p-5 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">LD Proxy Imputation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically rescues missing diagnostic markers from commercial microarrays using tight genomic proxies ($r^2 \ge 0.95$).
            </p>
          </div>
        </div>

        {/* Saved Profiles Section */}
        {savedResults.length > 0 && (
          <div className="pt-8 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <h3 className="text-base font-bold text-white">Saved Genomic Profiles</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{savedResults.length} profile(s)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {savedResults.map((saved) => (
                <div
                  key={saved.id}
                  onClick={() => onSelectSavedResult(saved)}
                  className="premium-card-interactive p-4 cursor-pointer relative group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{saved.kitName}</h4>
                      <button
                        onClick={(e) => onDeleteSavedResult(saved.id, e)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {saved.paternalLineage && (
                        <span className="px-2 py-0.5 rounded-md bg-teal-950/60 border border-teal-700/50 text-teal-300 font-bold">
                          Y: {saved.paternalLineage.terminalHaplogroup.code}
                        </span>
                      )}
                      {saved.maternalLineage && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-950/60 border border-rose-700/50 text-rose-300 font-bold">
                          mt: {saved.maternalLineage.terminalHaplogroup.code}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between">
                    <span>{saved.totalSnpsParsed.toLocaleString()} SNPs</span>
                    <span>{new Date(saved.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 1-Click Interactive Reference Sample Kits */}
        <div className="pt-8 space-y-4 text-left">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-400" />
            <h3 className="text-base font-bold text-white">Global Reference Reference Profiles (1-Click Test)</h3>
          </div>
          <p className="text-xs text-slate-400">
            Select a verified benchmark kit to explore ancient phylogenetic trajectories across global populations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {SAMPLE_DNA_KITS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onSelectSampleKit(sample.id)}
                className="premium-card-interactive p-4 text-left flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-teal-400 font-bold tracking-wider">
                    {sample.subtitle}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                    {sample.title}
                  </h4>
                  <div className="flex gap-1.5 pt-1 text-[11px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-teal-400">
                      {sample.paternalHaplo}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-rose-400">
                      {sample.maternalHaplo}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs text-teal-400 font-bold gap-1 mt-4 pt-2 border-t border-white/[0.04]">
                  <span>Analyze Kit</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Raw Snippet Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="premium-card max-w-xl w-full p-6 text-left space-y-4 border border-teal-500/30">
            <h3 className="text-lg font-bold text-white">Paste Raw Genotype Snippet</h3>
            <p className="text-xs text-slate-400">
              Paste rsIDs and allele calls from your 23andMe, Ancestry, or VCF file to test instant in-browser classification.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Profile Name</label>
              <input
                type="text"
                value={customKitName}
                onChange={(e) => setCustomKitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Raw Data Text</label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                rows={8}
                placeholder={"rs9786184\tY\t18515000\tTT\nrs28358280\tMT\t7028\tCC\n..."}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-teal-300 focus:outline-none focus:border-teal-500 font-mono"
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
                className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:opacity-50"
              >
                Parse &amp; Analyze
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
