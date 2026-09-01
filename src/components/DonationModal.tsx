import React from 'react';
import { Heart, Coffee, ExternalLink, ShieldCheck, Sparkles, X, Dna, ArrowUpRight } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="premium-card max-w-lg w-full p-6 sm:p-8 text-left space-y-6 border border-teal-500/30 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/40 flex items-center justify-center text-rose-400">
            <Heart className="w-6 h-6 fill-rose-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Support Written In The Genome</h3>
            <p className="text-xs text-slate-400">Advancing open-source, privacy-first genomic tools</p>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Haplotype Scout</strong> and <strong>Genotype Scout</strong> are completely free, 100% private in-browser tools created to give everyone access to deep ancient phylogenetic analysis without corporate tracking or data selling.
        </p>

        {/* Donation & Support Channels */}
        <div className="space-y-3">
          <a
            href="https://writteninthegenome.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/60 hover:bg-teal-950/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  Subscribe &amp; Read the Blog
                </h4>
                <p className="text-xs text-slate-400">Read in-depth genomic research and dispatches</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://github.com/jayrocktodef-bot/Haplotype-Scout-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/60 hover:bg-indigo-950/20 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Star on GitHub &amp; Contribute
                </h4>
                <p className="text-xs text-slate-400">Open-source code, pull requests, and bug reports</p>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

        {/* Footer info */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-white/[0.06]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free &amp; Private Forever
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 font-bold transition-all text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
