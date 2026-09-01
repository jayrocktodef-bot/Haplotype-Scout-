import React, { useState } from 'react';
import { 
  Dna, Sparkles, CheckCircle2, MinusCircle, HelpCircle, XCircle, 
  MapPin, Clock, Users, ArrowRight, Compass, Filter
} from 'lucide-react';
import { DnaAnalysisResult, LineageType } from '../types/haplogroup';
import { ArchaicIntrogressionCard } from './ArchaicIntrogressionCard';
import { TmrcaClockCard } from './TmrcaClockCard';

interface AnalysisResultScreenProps {
  result: DnaAnalysisResult;
  onReset: () => void;
  onExploreTree?: (lineage: LineageType) => void;
}

export const AnalysisResultScreen: React.FC<AnalysisResultScreenProps> = ({
  result,
  onReset,
  onExploreTree
}) => {
  const [activeLineage, setActiveLineage] = useState<LineageType>('PATERNAL_YDNA');
  const [markerSearch, setMarkerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'POSITIVE' | 'NEGATIVE' | 'NO_CALL' | 'IMPUTED'>('ALL');

  const currentAnalysis = activeLineage === 'PATERNAL_YDNA' 
    ? result.paternalLineage 
    : result.maternalLineage;

  const filteredMarkers = (currentAnalysis?.evaluatedMarkers || []).filter(m => {
    const matchesSearch = 
      m.snp.name.toLowerCase().includes(markerSearch.toLowerCase()) ||
      m.snp.rsid.toLowerCase().includes(markerSearch.toLowerCase()) ||
      m.snp.haplogroup.toLowerCase().includes(markerSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'POSITIVE') return m.status === 'POSITIVE_DERIVED';
    if (statusFilter === 'NEGATIVE') return m.status === 'NEGATIVE_ANCESTRAL';
    if (statusFilter === 'NO_CALL') return m.status === 'NO_CALL';
    if (statusFilter === 'IMPUTED') return m.isImputed === true;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4 animate-fade-up text-left">
      
      {/* Studio Header Strip */}
      <div className="bento-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
              {result.rawFileFormat} Profile
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {result.totalSnpsParsed.toLocaleString()} Loci Analyzed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{result.kitName}</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluated on {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700/60 self-start sm:self-auto cursor-pointer"
        >
          Load Different Sample
        </button>
      </div>

      {/* Lineage Tab Selector */}
      <div className="flex justify-start">
        <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            onClick={() => setActiveLineage('PATERNAL_YDNA')}
            disabled={!result.paternalLineage}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeLineage === 'PATERNAL_YDNA'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Paternal (Y-DNA)</span>
            {result.paternalLineage && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-slate-950/60 font-mono font-bold">
                {result.paternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveLineage('MATERNAL_MTDNA')}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeLineage === 'MATERNAL_MTDNA'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Maternal (mtDNA)</span>
            {result.maternalLineage && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-slate-950/60 font-mono font-bold">
                {result.maternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Lineage Analysis Details (Haplogroups First) */}
      {currentAnalysis ? (
        <div className="space-y-6">
          
          {/* Executive Clade Card */}
          <div className="bento-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Terminal Clade Assignment
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
                    {currentAnalysis.confidenceScore}% Confidence (DAG Verified)
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300">
                    {currentAnalysis.terminalHaplogroup.code}
                  </h2>
                  <span className="text-base text-slate-300 font-medium">
                    ({currentAnalysis.terminalHaplogroup.cladeName})
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {currentAnalysis.terminalHaplogroup.historicalDescription}
                </p>
              </div>


              {/* Metrics */}
              <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-white/[0.08] pt-4 sm:pt-0 sm:pl-6 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Estimated Age</span>
                  <div className="text-sm font-extrabold font-mono text-amber-300">
                    {currentAnalysis.terminalHaplogroup.ageYearsBp}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Origin Focus</span>
                  <div className="text-xs font-semibold text-slate-200">
                    {currentAnalysis.terminalHaplogroup.originRegion}
                  </div>
                </div>

                {onExploreTree && (
                  <button
                    onClick={() => onExploreTree(activeLineage)}
                    className="mt-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Explore on Tree</span>
                  </button>
                )}
              </div>

            </div>

            {/* Geographical & Historical Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/[0.06]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Formative Era</span>
                  <p className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.ageYearsBp}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Origin Region</span>
                  <p className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.originRegion}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Associated Horizons</span>
                  <p className="text-xs font-bold text-slate-200">
                    {currentAnalysis.terminalHaplogroup.ancientCultures.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Evolutionary Coalescence & TMRCA Clock Bento Card */}
          <TmrcaClockCard
            clade={currentAnalysis.terminalHaplogroup}
            lineageType={activeLineage}
            positiveMarkerCount={currentAnalysis.positiveCount}
          />

          {/* Phylogenetic Lineage Path */}
          <div className="bento-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Phylogenetic Tree Traversal Path
                </h3>
              </div>
              {onExploreTree && (
                <button
                  onClick={() => onExploreTree(activeLineage)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Explore on Full Tree</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {currentAnalysis.lineageTreePath.map((node, index) => {
                const isTerminal = index === currentAnalysis.lineageTreePath.length - 1;
                return (
                  <React.Fragment key={node.code}>
                    <div
                      className={`px-3 py-1 rounded-lg border text-xs font-mono transition-all ${
                        isTerminal
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{node.code}</span>
                      {!isTerminal && (
                        <span className="text-[10px] text-slate-500 ml-1">({node.shortName})</span>
                      )}
                    </div>

                    {!isTerminal && (
                      <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Marker Inspector */}
          <div className="bento-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Diagnostic Marker Loci
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect raw base calls, LD proxy imputations, and transversion weighting across your phylogenetic lineage.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1 text-xs">
                {(['ALL', 'POSITIVE', 'NEGATIVE', 'NO_CALL', 'IMPUTED'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all ${
                      statusFilter === filter
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={markerSearch}
              onChange={(e) => setMarkerSearch(e.target.value)}
              placeholder="Search SNP name (e.g. M269, U152), rsID, or clade..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />

            {/* Marker List */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filteredMarkers.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No markers match the active filter criteria.</p>
              ) : (
                filteredMarkers.map((m) => {
                  const isPos = m.status === 'POSITIVE_DERIVED';
                  const isNeg = m.status === 'NEGATIVE_ANCESTRAL';
                  const isNoCall = m.status === 'NO_CALL';

                  return (
                    <div
                      key={`${m.snp.name}_${m.snp.rsid}`}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-all ${
                        isPos
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                          : isNeg
                          ? 'bg-slate-950/40 border-slate-800/60 text-slate-300'
                          : 'bg-slate-950/20 border-slate-800/40 text-slate-500'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-white font-mono">{m.snp.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">({m.snp.rsid})</span>
                          <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
                            Chr {m.snp.chromosome}:{m.snp.position.toLocaleString()}
                          </span>
                          {m.isImputed && (
                            <span className="px-1.5 py-0.2 text-[10px] rounded bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-semibold">
                              LD Imputed
                            </span>
                          )}
                          {(m.mutationWeight || 1.0) > 2.0 && (
                            <span className="px-1.5 py-0.2 text-[10px] rounded bg-amber-950/80 border border-amber-700/60 text-amber-300 font-semibold">
                              Transversion (4.5x)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{m.details}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 uppercase">Call</span>
                          <span className="font-bold font-mono text-white">{m.userGenotype}</span>
                        </div>

                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-950 border border-slate-800">
                          {isPos && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {isNeg && <MinusCircle className="w-4 h-4 text-slate-400" />}
                          {isNoCall && <HelpCircle className="w-4 h-4 text-slate-600" />}
                          {m.status === 'MISMATCH' && <XCircle className="w-4 h-4 text-rose-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>
      ) : (
        <div className="bento-card p-12 text-center space-y-3">
          <p className="text-sm text-slate-400">
            No diagnostic markers available for this lineage type in the uploaded raw DNA file.
          </p>
        </div>
      )}

      {/* Archaic DNA Introgression & Hominin Affinity Bento Card */}
      {result.archaicAffinity && (
        <ArchaicIntrogressionCard archaicData={result.archaicAffinity} />
      )}

      {/* Microhaplotype Phased Ancestry Bento Card */}
      {result.microhaplotypes && result.microhaplotypes.length > 0 && (
        <div className="bento-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Microhaplotype Phased Affinity
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">100-Block Phased Kernel</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.microhaplotypes.map((hap) => (
              <div key={hap.popCode} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{hap.name}</span>
                  <span className="font-mono font-bold text-cyan-300">{hap.percentage}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                    style={{ width: `${hap.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
