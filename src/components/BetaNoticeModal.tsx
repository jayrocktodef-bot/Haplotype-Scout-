import React from 'react';
import { ShieldCheck, AlertTriangle, Dna, Lock, Sparkles, Check } from 'lucide-react';

interface BetaNoticeModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  targetActionName?: string;
}

export const BetaNoticeModal: React.FC<BetaNoticeModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  targetActionName = 'Upload & Analyze DNA'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0d1424] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 space-y-6 text-left">
        
        {/* Header with Badges */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                Experimental • Beta Studio
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> 100% In-Browser
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Genomic Analysis Notice
            </h3>
          </div>
        </div>

        {/* Advisory Body */}
        <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/[0.08] space-y-2">
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <Dna className="w-4 h-4 text-cyan-400" />
              <span>Microarray Inferred Classification</span>
            </div>
            <p className="text-slate-300">
              Haplotype Scout classifies haplogroups by extracting sparse Y-chromosome and mtDNA markers from standard consumer autosomal microarray files (such as 23andMe, AncestryDNA, or MyHeritage).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 space-y-2">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Dedicated Sequencing vs. Microarray</span>
            </div>
            <p className="text-slate-300">
              For definitive, deep phylogenetic sub-branching and medical-grade accuracy, taking a <strong>dedicated Full mtDNA Sequence (FMS)</strong> or <strong>Next-Gen Y-DNA Sequencing (e.g. BigY / WGS)</strong> is significantly more comprehensive than consumer microarray chips.
            </p>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Zero server uploads — all processing occurs privately on your local CPU.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-white/[0.08]">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>I Understand, Proceed to {targetActionName}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
