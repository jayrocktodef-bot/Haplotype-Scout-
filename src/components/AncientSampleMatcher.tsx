import React, { useState, useMemo } from 'react';
import { HaplogroupDefinition } from '../types/haplogroup';
import { computeAncientMatches, AncientMatchScore } from '../services/ancientMatchEngine';
import { AncientSampleSpecimen } from '../data/ancientDnaDatabase';
import {
  Landmark,
  MapPin,
  Clock,
  Sparkles,
  Dna,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

interface AncientSampleMatcherProps {
  paternalHaplo?: HaplogroupDefinition | null;
  maternalHaplo?: HaplogroupDefinition | null;
}

export const AncientSampleMatcher: React.FC<AncientSampleMatcherProps> = ({
  paternalHaplo,
  maternalHaplo
}) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<AncientSampleSpecimen | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'YDNA' | 'MTDNA'>('ALL');

  const matches: AncientMatchScore[] = useMemo(() => {
    return computeAncientMatches(paternalHaplo, maternalHaplo);
  }, [paternalHaplo, maternalHaplo]);

  const filteredMatches = useMemo(() => {
    if (filterType === 'YDNA') {
      return matches.filter((m) => m.paternalMatchQuality !== 'NONE');
    }
    if (filterType === 'MTDNA') {
      return matches.filter((m) => m.maternalMatchQuality !== 'NONE');
    }
    return matches;
  }, [matches, filterType]);

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 via-cyan-500/20 to-violet-500/20 border border-indigo-500/30 text-indigo-300">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Ancient Archaeological Sample Matcher
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                Paleogenomics Database
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct phylogenetic and haplogroup comparison against published ancient human remains.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex rounded-xl bg-slate-900/90 border border-white/[0.08] p-1">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Samples
          </button>
          <button
            onClick={() => setFilterType('YDNA')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterType === 'YDNA'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Y-DNA Matches
          </button>
          <button
            onClick={() => setFilterType('MTDNA')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              filterType === 'MTDNA'
                ? 'bg-rose-500 text-white font-extrabold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            mtDNA Matches
          </button>
        </div>
      </div>

      {/* Ancient Specimen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMatches.map((match) => {
          const { specimen, sharedAncestryScore, paternalMatchQuality, maternalMatchQuality } = match;
          const isHighMatch = sharedAncestryScore >= 30;

          return (
            <div
              key={specimen.id}
              onClick={() => setSelectedSpecimen(specimen)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.01] flex flex-col justify-between space-y-4 ${
                isHighMatch
                  ? 'bg-slate-950/70 border-cyan-500/30 hover:border-cyan-500/60 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {specimen.name}
                  </span>
                  {sharedAncestryScore > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {sharedAncestryScore}% Affinity
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{specimen.country} ({specimen.excavationSite})</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{specimen.ageYearsBp} ({specimen.calibratedBceDate})</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-[11px] text-slate-300 leading-relaxed">
                  {specimen.summaryDescription}
                </div>
              </div>

              {/* Lineage Badges */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Paternal (Y):</span>
                  <span
                    className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                      paternalMatchQuality === 'EXACT_SUBCLADE'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : paternalMatchQuality === 'ANCESTRAL_MACROCLADE'
                        ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                        : 'text-slate-400'
                    }`}
                  >
                    {specimen.paternalYdna}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Maternal (mt):</span>
                  <span
                    className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                      maternalMatchQuality === 'EXACT_SUBCLADE'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : maternalMatchQuality === 'ANCESTRAL_MACROCLADE'
                        ? 'bg-pink-500/10 text-pink-300 border border-pink-500/20'
                        : 'text-slate-400'
                    }`}
                  >
                    {specimen.maternalMtdna}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specimen Detail Modal */}
      {selectedSpecimen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#0d1424] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">{selectedSpecimen.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {selectedSpecimen.archaeologicalCulture}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{selectedSpecimen.excavationSite}, {selectedSpecimen.country}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpecimen(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Specimen Details */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Paternal Lineage</span>
                  <div className="text-sm font-bold font-mono text-cyan-300">{selectedSpecimen.paternalYdna}</div>
                  <div className="text-[10px] text-slate-400">{selectedSpecimen.yDnaCladeName}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Maternal Lineage</span>
                  <div className="text-sm font-bold font-mono text-rose-300">{selectedSpecimen.maternalMtdna}</div>
                  <div className="text-[10px] text-slate-400">{selectedSpecimen.mtDnaCladeName}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-200">Archaeological &amp; Genomic Context</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSpecimen.summaryDescription}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-1.5">
                <div className="font-bold text-cyan-300">Notable Paleogenetic Findings</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedSpecimen.notableFindings}</p>
              </div>

              <div className="text-[10px] text-slate-500 font-mono">
                Study Reference: {selectedSpecimen.studyCitation}
              </div>
            </div>

            {/* Close */}
            <div className="flex justify-end pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setSelectedSpecimen(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-xs font-bold text-white transition-all cursor-pointer"
              >
                Close Specimen Card
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
