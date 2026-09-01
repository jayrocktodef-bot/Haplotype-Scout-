import React, { useState } from 'react';
import { ArchaicAffinityResult, ArchaicLocusMatch } from '../types/haplogroup';
import { Sparkles, Dna, ShieldAlert, ChevronDown, ChevronUp, Info, Activity, Flame } from 'lucide-react';

interface ArchaicIntrogressionCardProps {
  archaicData: ArchaicAffinityResult;
}

export const ArchaicIntrogressionCard: React.FC<ArchaicIntrogressionCardProps> = ({
  archaicData
}) => {
  const [showLociDetails, setShowLociDetails] = useState(false);

  const matchedLociCount = archaicData.functionalLoci.filter((l) => l.isDerivedMatch).length;

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-300">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Archaic Introgression &amp; Hominin Affinity
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold uppercase">
                Vindija &amp; Denisova 3
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Quantified ancient genomic introgression from archaic Neanderthal &amp; Denisovan lineages.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300">
            {archaicData.totalInformativeTested} Informative Loci Evaluated
          </span>
        </div>
      </div>

      {/* Dual Gauges & Percentile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Neanderthal Introgression Gauge */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Neanderthal DNA
            </span>
            <span className="text-[10px] font-mono text-slate-500">Vindija 33.19 Ref</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
              {archaicData.neanderthalPercentage}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Estimated Genome Share</span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (archaicData.neanderthalPercentage / 3.5) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Derived variants detected across Chromosomes 1–22: <strong className="text-slate-200 font-mono">{archaicData.neanderthalVariantCount}</strong>
          </p>
        </div>

        {/* Denisovan Introgression Gauge */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Denisovan DNA
            </span>
            <span className="text-[10px] font-mono text-slate-500">Denisova 3 Ref</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black font-mono text-indigo-400">
              {archaicData.denisovanPercentage}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Estimated Genome Share</span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (archaicData.denisovanPercentage / 3.0) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            High-altitude / archaic markers detected: <strong className="text-slate-200 font-mono">{archaicData.denisovanVariantCount}</strong>
          </p>
        </div>

        {/* Population Percentile Ranking */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Global Ranking
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">1000G Cohort</span>
            </div>

            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                {archaicData.globalPercentile}th
              </span>
              <span className="text-xs text-slate-400 font-medium">Percentile</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            You carry more archaic alleles than approximately <strong className="text-slate-200">{archaicData.globalPercentile}%</strong> of modern global reference individuals.
          </p>
        </div>

      </div>

      {/* Interactive Functional Loci Toggle */}
      <div className="pt-2">
        <button
          onClick={() => setShowLociDetails(!showLociDetails)}
          className="w-full py-3 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-white/[0.08] text-xs font-bold text-slate-200 flex items-center justify-between transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Dna className="w-4 h-4 text-cyan-400" />
            <span>
              Explore {archaicData.functionalLoci.length} Archaic Evolutionary Loci ({matchedLociCount} Derived Matches)
            </span>
          </div>
          {showLociDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showLociDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 animate-in fade-in duration-200">
            {archaicData.functionalLoci.map((locus) => (
              <div
                key={locus.rsid}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                  locus.isDerivedMatch
                    ? 'bg-amber-950/20 border-amber-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{locus.rsid}</span>
                    {locus.gene && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 font-mono font-bold">
                        {locus.gene}
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      locus.isDerivedMatch
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {locus.isDerivedMatch ? 'Derived Archaic Allele' : 'Ancestral Unmutated'}
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed">{locus.traitOrFunction}</p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-white/[0.04]">
                  <span>Hominin: <strong>{locus.hominin}</strong></span>
                  <span>Your Genotype: <strong className="text-slate-300 font-mono">{locus.userGenotype}</strong></span>
                  <span>Modern Freq: {locus.modernFrequencyPct}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
