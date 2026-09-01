import React from 'react';
import { ArchaicAffinityResult, MicroHapResult } from '../types/haplogroup';
import { ArchaicIntrogressionCard } from './ArchaicIntrogressionCard';
import { Dna, Sparkles, Activity, Layers, ArrowRight } from 'lucide-react';

interface ArchaicAndPhasedScreenProps {
  archaicResult?: ArchaicAffinityResult;
  microhaplotypes?: MicroHapResult[];
  onExploreTree?: () => void;
}

export const ArchaicAndPhasedScreen: React.FC<ArchaicAndPhasedScreenProps> = ({
  archaicResult,
  microhaplotypes = [],
  onExploreTree
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300">
              <Dna className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Archaic Hominin &amp; Phased Ancestry Studio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            High-resolution deconvolution of Neanderthal (*Vindija 33.19*) and Denisovan (*Denisova 3*) admixture alongside phased microhaplotype ancestral signatures.
          </p>
        </div>
      </div>

      {/* Archaic Introgression Gauges & Loci Inspector */}
      {archaicResult ? (
        <ArchaicIntrogressionCard archaicData={archaicResult} />
      ) : (
        <div className="bento-card p-8 text-center text-slate-400 space-y-2">
          <Activity className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold">Archaic Introgression Data Unavailable</p>
          <p className="text-xs text-slate-500">Upload a raw DNA file to calculate archaic hominin percentages.</p>
        </div>
      )}

      {/* Phased Microhaplotype Ancestry Blocks */}
      {microhaplotypes.length > 0 && (
        <div className="bento-card p-6 sm:p-8 space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white">
                  Phased Microhaplotype Ancestry Signatures
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Short phased block alleles across global ancestral population reference clusters.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
              {microhaplotypes.length} Reference Clusters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {microhaplotypes.map((block) => (
              <div
                key={block.popCode}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{block.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                    {block.percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${block.percentage}%` }}
                  />
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Cluster Code: <span className="text-slate-300">{block.popCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
