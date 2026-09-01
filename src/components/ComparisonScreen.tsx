import React, { useState } from 'react';
import { GitCompare, Dna, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { DnaAnalysisResult } from '../types/haplogroup';

interface ComparisonScreenProps {
  savedKits: DnaAnalysisResult[];
  onSelectKit: (kit: DnaAnalysisResult) => void;
}

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({
  savedKits,
  onSelectKit
}) => {
  const [kitAId, setKitAId] = useState<string>(savedKits[0]?.id || '');
  const [kitBId, setKitBId] = useState<string>(savedKits[1]?.id || savedKits[0]?.id || '');

  const kitA = savedKits.find(k => k.id === kitAId);
  const kitB = savedKits.find(k => k.id === kitBId);

  if (savedKits.length < 1) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <GitCompare className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Dual Lineage Comparison</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Analyze two profiles side-by-side to compare branch divergence, shared mutations, and migration splits. 
          Upload or select sample kits from the Workspace to begin.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-semibold">
          <GitCompare className="w-3.5 h-3.5" />
          <span>Cross-Kit Lineage Comparator</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Compare Two Profiles
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Evaluate shared ancestral origins, common phylogenetic nodes, and divergent migration paths.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Kit A Selector */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">
            Profile A (Sample 1)
          </label>
          <select
            value={kitAId}
            onChange={(e) => setKitAId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
          >
            {savedKits.map(k => (
              <option key={k.id} value={k.id}>
                {k.kitName} ({new Date(k.timestamp).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        {/* Kit B Selector */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-purple-400">
            Profile B (Sample 2)
          </label>
          <select
            value={kitBId}
            onChange={(e) => setKitBId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-purple-500 font-medium"
          >
            {savedKits.map(k => (
              <option key={k.id} value={k.id}>
                {k.kitName} ({new Date(k.timestamp).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side by Side Detailed Comparison Cards */}
      {kitA && kitB && (
        <div className="space-y-8">
          
          {/* Y-DNA Paternal Comparison */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base sm:text-lg text-white">Paternal Lineage (Y-DNA) Divergence</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Profile A Y-DNA */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-cyan-900/30">
                <span className="text-xs font-bold text-cyan-400">{kitA.kitName}</span>
                {kitA.paternalLineage ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold font-mono text-cyan-300">
                        {kitA.paternalLineage.terminalHaplogroup.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({kitA.paternalLineage.terminalHaplogroup.cladeName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {kitA.paternalLineage.terminalHaplogroup.historicalDescription}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      Origin: <strong>{kitA.paternalLineage.terminalHaplogroup.originRegion}</strong> • {kitA.paternalLineage.terminalHaplogroup.ageYearsBp}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No Y-DNA detected (Female sample or missing markers)</p>
                )}
              </div>

              {/* Profile B Y-DNA */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-purple-900/30">
                <span className="text-xs font-bold text-purple-400">{kitB.kitName}</span>
                {kitB.paternalLineage ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold font-mono text-purple-300">
                        {kitB.paternalLineage.terminalHaplogroup.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({kitB.paternalLineage.terminalHaplogroup.cladeName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {kitB.paternalLineage.terminalHaplogroup.historicalDescription}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      Origin: <strong>{kitB.paternalLineage.terminalHaplogroup.originRegion}</strong> • {kitB.paternalLineage.terminalHaplogroup.ageYearsBp}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No Y-DNA detected (Female sample or missing markers)</p>
                )}
              </div>
            </div>
          </div>

          {/* mtDNA Maternal Comparison */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Dna className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-base sm:text-lg text-white">Maternal Lineage (mtDNA) Divergence</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Profile A mtDNA */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-cyan-900/30">
                <span className="text-xs font-bold text-cyan-400">{kitA.kitName}</span>
                {kitA.maternalLineage ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold font-mono text-rose-300">
                        {kitA.maternalLineage.terminalHaplogroup.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({kitA.maternalLineage.terminalHaplogroup.cladeName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {kitA.maternalLineage.terminalHaplogroup.historicalDescription}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      Origin: <strong>{kitA.maternalLineage.terminalHaplogroup.originRegion}</strong> • {kitA.maternalLineage.terminalHaplogroup.ageYearsBp}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No mtDNA data available</p>
                )}
              </div>

              {/* Profile B mtDNA */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-purple-900/30">
                <span className="text-xs font-bold text-purple-400">{kitB.kitName}</span>
                {kitB.maternalLineage ? (
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-extrabold font-mono text-rose-300">
                        {kitB.maternalLineage.terminalHaplogroup.code}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({kitB.maternalLineage.terminalHaplogroup.cladeName})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {kitB.maternalLineage.terminalHaplogroup.historicalDescription}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      Origin: <strong>{kitB.maternalLineage.terminalHaplogroup.originRegion}</strong> • {kitB.maternalLineage.terminalHaplogroup.ageYearsBp}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No mtDNA data available</p>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
