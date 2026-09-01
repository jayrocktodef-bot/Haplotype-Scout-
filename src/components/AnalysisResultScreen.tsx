import React, { useState } from 'react';
import { 
  Dna, Sparkles, CheckCircle2, MinusCircle, HelpCircle, XCircle, 
  MapPin, Clock, Users, ArrowRight, ShieldCheck, Search, Filter, Share2, Download
} from 'lucide-react';
import { DnaAnalysisResult, LineageType } from '../types/haplogroup';

interface AnalysisResultScreenProps {
  result: DnaAnalysisResult;
  onReset: () => void;
}

export const AnalysisResultScreen: React.FC<AnalysisResultScreenProps> = ({
  result,
  onReset
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
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4 sm:px-6 animate-fade-up">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">
              {result.rawFileFormat} Format Verified
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {result.totalSnpsParsed.toLocaleString()} Variants Decoded
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{result.kitName}</h1>
          <p className="text-xs text-slate-400">
            Analyzed on {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-4 py-2 bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-white/[0.08] self-start sm:self-auto"
        >
          Analyze Another Kit
        </button>
      </div>

      {/* Lineage Tab Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => setActiveLineage('PATERNAL_YDNA')}
            disabled={!result.paternalLineage}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeLineage === 'PATERNAL_YDNA'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>Paternal Lineage (Y-DNA)</span>
            {result.paternalLineage && (
              <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-slate-950/60 font-mono font-bold">
                {result.paternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveLineage('MATERNAL_MTDNA')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              activeLineage === 'MATERNAL_MTDNA'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Maternal Lineage (mtDNA)</span>
            {result.maternalLineage && (
              <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full bg-slate-950/60 font-mono font-bold">
                {result.maternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Microhaplotype Phased Ancestry Section */}
      {result.microhaplotypes && result.microhaplotypes.length > 0 && (
        <div className="premium-card p-6 sm:p-8 space-y-4 border border-teal-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-black text-white">Microhaplotype Phased Ancestry</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Top 100 Multi-SNP Haplotype Blocks</span>
          </div>
          <p className="text-xs text-slate-400">
            Reconstructed short-range phased haplotypes indicating fine-scale genetic affinity across reference continental populations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {result.microhaplotypes.map((hap) => (
              <div key={hap.popCode} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{hap.name}</span>
                  <span className="font-mono font-bold text-teal-400">{hap.percentage}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${hap.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lineage Core Details */}
      {currentAnalysis ? (
        <div className="space-y-8">
          
          {/* Executive Clade Card */}
          <div className="premium-card p-6 sm:p-8 border border-white/[0.08] relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Terminal Clade Assignment
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
                    {currentAnalysis.confidenceScore}% Confidence (DAG Validated)
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl sm:text-5xl font-black font-mono text-teal-300">
                    {currentAnalysis.terminalHaplogroup.code}
                  </h2>
                  <span className="text-lg sm:text-xl text-slate-300 font-medium">
                    ({currentAnalysis.terminalHaplogroup.cladeName})
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  {currentAnalysis.terminalHaplogroup.historicalDescription}
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="flex md:flex-col gap-3 shrink-0">
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[120px]">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Positive Mutations</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">
                    {currentAnalysis.positiveCount}
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 text-center min-w-[120px]">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Ancestral State</span>
                  <span className="text-xl font-black text-slate-400 font-mono">
                    {currentAnalysis.negativeCount}
                  </span>
                </div>
              </div>

            </div>

            {/* Geographical & Historical Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/[0.08]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Formative Era</span>
                  <p className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.ageYearsBp}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Geographic Origin</span>
                  <p className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.originRegion}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Ancient Horizons</span>
                  <p className="text-xs font-bold text-slate-200">
                    {currentAnalysis.terminalHaplogroup.ancientCultures.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phylogenetic Lineage Tree Breadcrumb */}
          <div className="premium-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Phylogenetic Tree Path (Root to Terminal)
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {currentAnalysis.lineageTreePath.map((node, index) => {
                const isTerminal = index === currentAnalysis.lineageTreePath.length - 1;
                return (
                  <React.Fragment key={node.code}>
                    <div
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                        isTerminal
                          ? 'bg-teal-500 text-slate-950 font-black border-teal-400 shadow-md shadow-teal-500/20'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{node.code}</span>
                      {!isTerminal && (
                        <span className="text-[10px] text-slate-500 ml-1.5">({node.shortName})</span>
                      )}
                    </div>

                    {!isTerminal && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Marker Inspector */}
          <div className="premium-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Diagnostic Marker Inspector
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect raw base calls, LD proxy imputations, and transversion weighting across your phylogenetic lineage.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(['ALL', 'POSITIVE', 'NEGATIVE', 'NO_CALL', 'IMPUTED'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all ${
                      statusFilter === filter
                        ? 'bg-teal-500 text-slate-950'
                        : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
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
              placeholder="Search by SNP name (e.g. M269, U152), rsID (e.g. rs9786184), or clade..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
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
                          <span className="block text-[10px] text-slate-400 uppercase">Your Genotype</span>
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
        <div className="premium-card p-12 text-center space-y-3">
          <p className="text-sm text-slate-400">
            No diagnostic markers available for this lineage type in the uploaded raw DNA file.
          </p>
        </div>
      )}

    </div>
  );
};
