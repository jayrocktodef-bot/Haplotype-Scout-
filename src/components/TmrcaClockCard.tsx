import React, { useMemo } from 'react';
import { HaplogroupDefinition, LineageType } from '../types/haplogroup';
import { calculateTmrcaEstimate, HISTORICAL_ERA_HORIZONS } from '../services/tmrcaEngine';
import { Clock, Hourglass, Calendar, Sparkles, Compass, ShieldCheck, Milestone } from 'lucide-react';

interface TmrcaClockCardProps {
  clade: HaplogroupDefinition;
  lineageType: LineageType;
  positiveMarkerCount?: number;
}

export const TmrcaClockCard: React.FC<TmrcaClockCardProps> = ({
  clade,
  lineageType,
  positiveMarkerCount = 0
}) => {
  const estimate = useMemo(() => {
    return calculateTmrcaEstimate(clade, lineageType, positiveMarkerCount);
  }, [clade, lineageType, positiveMarkerCount]);

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/30 text-amber-300">
            <Hourglass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Evolutionary Coalescence &amp; TMRCA Clock
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold uppercase">
                Molecular Clock Model
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Time to Most Recent Common Ancestor and genealogical era estimation.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/[0.08] text-[11px] font-mono text-slate-400">
          ~{estimate.estimatedGenerations} Ancestral Generations
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Branch Formed Age */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
            Branch Formed Age
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
            {estimate.formattedFormedAge}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The formative phylogenetic mutation split that established clade <strong className="text-slate-200">{clade.code}</strong>.
          </p>
        </div>

        {/* Coalescence TMRCA */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-amber-500/30 space-y-2 shadow-lg shadow-amber-500/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
              Clade TMRCA
            </span>
            <span className="text-[10px] font-mono text-amber-300 font-bold">{estimate.calibratedEraBceCe}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            {estimate.formattedTmrcaAge}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            95% Confidence Interval: <strong className="text-slate-200 font-mono">~{estimate.ci95MinYearsBp.toLocaleString()} – {estimate.ci95MaxYearsBp.toLocaleString()} BP</strong>
          </p>
        </div>

        {/* Historical Horizon Horizon */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Archaeological Epoch
            </span>
            <div className="text-base font-extrabold text-white mt-1">
              {estimate.activeHistoricalEra.name}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {estimate.activeHistoricalEra.culturalPhenomenon}
          </p>
        </div>

      </div>

      {/* Epoch Horizon Timeline Bar */}
      <div className="p-5 rounded-2xl bg-slate-950/40 border border-white/[0.06] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Milestone className="w-4 h-4 text-cyan-400" />
          <span>Human Archaeological Epoch Horizon Timeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {HISTORICAL_ERA_HORIZONS.map((era) => {
            const isCurrent = era.id === estimate.activeHistoricalEra.id;
            return (
              <div
                key={era.id}
                className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-200 shadow-md shadow-amber-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="font-bold text-[11px] truncate" title={era.name}>
                  {era.name.split('(')[0].trim()}
                </div>
                <div className="text-[9px] font-mono text-slate-500">
                  {era.startYearsBp >= 1000 ? `~${era.startYearsBp / 1000}k` : `~${era.startYearsBp}`} – {era.endYearsBp >= 1000 ? `~${era.endYearsBp / 1000}k` : `~${era.endYearsBp}`} BP
                </div>
                {isCurrent && (
                  <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-extrabold bg-amber-500 text-slate-950">
                    Your Founder
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-white/[0.04] text-[10px] text-slate-500 font-mono text-right">
          {estimate.mutationClockRateNotice}
        </div>
      </div>

    </div>
  );
};
