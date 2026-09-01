import React, { useState } from 'react';
import { HaplogroupDefinition } from '../types/haplogroup';
import { getYhrdProfile, YHRD_CORE_LOCI } from '../services/yhrdStrEngine';
import { 
  FileText, Users, Bookmark, ChevronDown, ChevronUp, 
  ExternalLink, Sparkles, Dna, ShieldAlert, ArrowRight
} from 'lucide-react';

interface PatrilinealGenealogyCardProps {
  terminalClade: HaplogroupDefinition;
}

export const PatrilinealGenealogyCard: React.FC<PatrilinealGenealogyCardProps> = ({
  terminalClade
}) => {
  const [showLociDetails, setShowLociDetails] = useState(false);
  const profile = getYhrdProfile(terminalClade.code);

  return (
    <div className="bento-card p-6 sm:p-7 space-y-5 text-left relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">
                Patrilineal Surname &amp; Y-STR Forensic Guide
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold uppercase">
                YHRD / GSU Library Standard
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              How to bridge your deep Y-SNP clade with fast-mutating Y-STRs to break through paper-trail brick walls.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono font-bold text-amber-300 px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/30">
            Modal Clade: {profile.cladeName}
          </span>
        </div>
      </div>

      {/* Core Insight / Brick Wall Breaker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Breaking Paper-Trail "Brick Walls"</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Where birth certificates and 18th/19th century census records were lost to courthouse fires, slavery documentation gaps, or non-paternity events (NPEs), <strong>Y-DNA provides an unbroken biological signature passed identically from father to son</strong>.
          </p>
          <div className="pt-1 text-[11px] text-slate-400 border-t border-white/[0.04]">
            <strong className="text-white">Time Depth:</strong> {profile.genealogicalTimeDepth}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-2">
          <div className="flex items-center gap-2 text-orange-300 font-bold uppercase tracking-wider text-[11px]">
            <Users className="w-3.5 h-3.5" />
            <span>Actionable Surname Project Strategy</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {profile.surnameProjectStrategy}
          </p>
          <div className="pt-1 text-[11px] text-slate-400 border-t border-white/[0.04]">
            <strong className="text-white">Global Frequency:</strong> {profile.yhrdDistributionSummary}
          </div>
        </div>
      </div>

      {/* Modal Forensic Minimal Haplotype Strip */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950/80 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-bold text-amber-200 uppercase tracking-wide font-mono">
            <Dna className="w-3.5 h-3.5 text-amber-400" />
            <span>Expected YHRD Forensic Minimal STR Signature ({profile.clade})</span>
          </div>
          <button
            onClick={() => setShowLociDetails(!showLociDetails)}
            className="text-[10px] font-mono text-amber-300 hover:text-amber-200 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{showLociDetails ? 'Hide Loci Details' : 'View STR Mutation Rates'}</span>
            {showLociDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Horizontal allele chips */}
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 pt-1">
          {Object.entries(profile.modalMinimalHaplotype).map(([locus, repeatCount]) => (
            <div key={locus} className="p-2 rounded-lg bg-slate-950/80 border border-amber-500/30 text-center">
              <div className="text-[9px] font-mono text-slate-400 uppercase">{locus}</div>
              <div className="text-sm font-extrabold font-mono text-amber-300">{repeatCount}</div>
            </div>
          ))}
        </div>

        {/* Detailed Loci Drawer */}
        {showLociDetails && (
          <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {YHRD_CORE_LOCI.map((loc) => (
                <div key={loc.locus} className="p-2.5 rounded-lg bg-slate-950/90 border border-white/[0.04] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-amber-200 text-[11px]">{loc.locus}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {loc.mutationRateClass}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{loc.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
