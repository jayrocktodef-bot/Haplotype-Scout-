import React, { useState } from 'react';
import { 
  Dna, 
  MapPin, 
  Calendar, 
  History, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  Share2,
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';
import { DnaAnalysisResult, LineageAnalysis, MarkerStatus } from '../types/haplogroup';

interface AnalysisResultScreenProps {
  result: DnaAnalysisResult;
  onBack: () => void;
}

export const AnalysisResultScreen: React.FC<AnalysisResultScreenProps> = ({
  result,
  onBack
}) => {
  const [activeLineage, setActiveLineage] = useState<'PATERNAL_YDNA' | 'MATERNAL_MTDNA'>(
    result.paternalLineage ? 'PATERNAL_YDNA' : 'MATERNAL_MTDNA'
  );

  const [markerFilter, setMarkerFilter] = useState<MarkerStatus | 'ALL'>('ALL');
  const [markerSearch, setMarkerSearch] = useState('');
  const [copied, setCopied] = useState(false);

  const currentAnalysis: LineageAnalysis | null = 
    activeLineage === 'PATERNAL_YDNA' ? result.paternalLineage : result.maternalLineage;

  const handleCopySummary = () => {
    const pCode = result.paternalLineage?.terminalHaplogroup.code || 'N/A';
    const mCode = result.maternalLineage?.terminalHaplogroup.code || 'N/A';
    const summary = `🧬 Haplotype Scout Lineage Report for ${result.kitName}\n` +
      `• Paternal Lineage (Y-DNA): ${pCode} (${result.paternalLineage?.terminalHaplogroup.cladeName || ''})\n` +
      `• Maternal Lineage (mtDNA): ${mCode} (${result.maternalLineage?.terminalHaplogroup.cladeName || ''})\n` +
      `• Total Evaluated SNPs: ${result.totalSnpsParsed.toLocaleString()}\n` +
      `• Format: ${result.rawFileFormat}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredMarkers = (currentAnalysis?.evaluatedMarkers || []).filter(m => {
    const matchesFilter = markerFilter === 'ALL' || m.status === markerFilter;
    const q = markerSearch.trim().toLowerCase();
    const matchesSearch = !q || 
      m.snp.name.toLowerCase().includes(q) || 
      m.snp.rsid.toLowerCase().includes(q) ||
      m.snp.haplogroup.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto px-4">
      
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-slate-400 font-mono">
            {result.rawFileFormat} • {result.totalSnpsParsed.toLocaleString()} SNPs
          </span>
          <button
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Report!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Kit Title & Executive Clade Badge */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-3 py-1 rounded-full">
          Lineage Discovery Report
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {result.kitName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Analyzed on {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
        </p>
      </div>

      {/* Lineage Tab Selector (Y-DNA vs mtDNA) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveLineage('PATERNAL_YDNA')}
            disabled={!result.paternalLineage}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeLineage === 'PATERNAL_YDNA'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>Paternal Lineage (Y-DNA)</span>
            {result.paternalLineage && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-slate-950/40 font-mono">
                {result.paternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveLineage('MATERNAL_MTDNA')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeLineage === 'MATERNAL_MTDNA'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Maternal Lineage (mtDNA)</span>
            {result.maternalLineage && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] rounded bg-slate-950/40 font-mono">
                {result.maternalLineage.terminalHaplogroup.code}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Microhaplotype Deconvolution Section (from Genotype Scout) */}
      {result.microhaplotypes && result.microhaplotypes.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">Microhaplotype Phased Ancestry</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Top 100 Multi-SNP Haplotype Blocks</span>
          </div>
          <p className="text-xs text-slate-400">
            Reconstructed short-range phased haplotypes indicating fine-scale genetic affinity across reference continental populations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {result.microhaplotypes.map((hap) => (
              <div key={hap.popCode} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{hap.name}</span>
                  <span className="font-mono font-bold text-cyan-300">{hap.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
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

      {/* Lineage Core Details */}
      {currentAnalysis ? (
        <div className="space-y-8">
          
          {/* Executive Clade Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Terminal Clade Assignment
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
                    {currentAnalysis.confidenceScore}% Confidence
                  </span>
                </div>

                <div className="flex items-baseline space-x-3">
                  <h2 className="text-3xl sm:text-5xl font-extrabold font-mono text-cyan-300">
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
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center min-w-[110px]">
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">Positive Mutations</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    +{currentAnalysis.positiveCount}
                  </span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center min-w-[110px]">
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">Tested Markers</span>
                  <span className="text-xl font-extrabold text-slate-200 font-mono">
                    {currentAnalysis.totalTestedMarkers}
                  </span>
                </div>
              </div>

            </div>

            {/* Clade Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
              <div className="flex items-center space-x-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Estimated Era / Age</span>
                  <span className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.ageYearsBp}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Geographic Origin</span>
                  <span className="text-xs font-bold text-slate-200">{currentAnalysis.terminalHaplogroup.originRegion}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <History className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Ancient Cultures</span>
                  <span className="text-xs font-bold text-slate-200 truncate block max-w-[200px]">
                    {currentAnalysis.terminalHaplogroup.ancientCultures.join(', ')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Lineage Phylotree Path */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">Phylogenetic Lineage Trajectory</h3>
            </div>
            <p className="text-xs text-slate-400">
              Stepped hierarchical descent from archaic common ancestors down to your terminal branch.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {currentAnalysis.lineageTreePath.map((step, idx) => {
                const isTerminal = idx === currentAnalysis.lineageTreePath.length - 1;
                return (
                  <React.Fragment key={step.code}>
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      isTerminal
                        ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200 font-bold shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}>
                      <span className="font-mono">{step.code}</span>
                      <span className="text-[10px] text-slate-400">({step.originRegion})</span>
                    </div>
                    {!isTerminal && (
                      <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Historical Migration Timeline */}
          {currentAnalysis.terminalHaplogroup.migrationPath.length > 0 && (
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">Ancestral Migration Milestones</h3>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {currentAnalysis.terminalHaplogroup.migrationPath.map((step) => (
                  <div key={step.order} className="relative space-y-1">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#090d16]" />
                    <div className="flex items-baseline space-x-2">
                      <span className="font-bold text-sm text-slate-100">{step.region}</span>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                        {step.timePeriod}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Defining SNP Marker Inspector */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                  <Dna className="w-5 h-5 text-indigo-400" />
                  <span>Diagnostic Marker Inspection</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Individual alleles identified across diagnostic loci
                </p>
              </div>

              {/* Marker Filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['ALL', 'POSITIVE_DERIVED', 'NEGATIVE_ANCESTRAL', 'NO_CALL'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMarkerFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      markerFilter === filter
                        ? 'bg-slate-700 text-white border border-slate-600'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                    }`}
                  >
                    {filter === 'ALL' ? 'All' : filter === 'POSITIVE_DERIVED' ? 'Derived (+)' : filter === 'NEGATIVE_ANCESTRAL' ? 'Ancestral (-)' : 'Uncalled'}
                  </button>
                ))}
              </div>
            </div>

            {/* Marker Search */}
            <input
              type="text"
              value={markerSearch}
              onChange={(e) => setMarkerSearch(e.target.value)}
              placeholder="Search by SNP name (e.g. M269, U152), rsID (e.g. rs9786184), or clade..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
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
                          ? 'bg-slate-900/40 border-slate-800/60 text-slate-300'
                          : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-100 font-mono">{m.snp.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">({m.snp.rsid})</span>
                          <span className="px-1.5 py-0.2 text-[10px] rounded bg-slate-950/60 border border-slate-800 text-slate-300 font-mono">
                            Chr {m.snp.chromosome}:{m.snp.position.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{m.details}</p>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <div className="text-right">
                          <span className="block text-[10px] text-slate-400 uppercase">Your Genotype</span>
                          <span className="font-bold font-mono text-slate-100">{m.userGenotype}</span>
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
        <div className="glass-panel rounded-2xl p-12 text-center space-y-3">
          <p className="text-sm text-slate-400">
            No diagnostic markers available for this lineage type in the uploaded raw DNA file.
          </p>
        </div>
      )}

    </div>
  );
};
