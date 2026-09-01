import React, { useState } from 'react';
import { BookOpen, Search, Filter, Dna, MapPin, Calendar, Layers, ChevronRight, X } from 'lucide-react';
import { ALL_HAPLOGROUPS, Y_DNA_HAPLOGROUPS, MT_DNA_HAPLOGROUPS } from '../data/haplogroupTree';
import { HaplogroupDefinition, LineageType } from '../types/haplogroup';

export const EncyclopediaScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lineageFilter, setLineageFilter] = useState<'ALL' | LineageType>('ALL');
  const [selectedClade, setSelectedClade] = useState<HaplogroupDefinition | null>(null);

  const filteredHaplogroups = ALL_HAPLOGROUPS.filter(h => {
    const matchesLineage = lineageFilter === 'ALL' || h.lineageType === lineageFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q ||
      h.code.toLowerCase().includes(q) ||
      h.shortName.toLowerCase().includes(q) ||
      h.originRegion.toLowerCase().includes(q) ||
      h.historicalDescription.toLowerCase().includes(q) ||
      h.definingSnps.some(s => s.toLowerCase().includes(q)) ||
      h.ancientCultures.some(c => c.toLowerCase().includes(q));

    return matchesLineage && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Phylogenetic Clade Reference Encyclopedia</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Haplogroup Encyclopedia
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore global paternal (Y-DNA) and maternal (mtDNA) branches, diagnostic SNP definitions, ancient cultures, and migration timelines.
        </p>
      </div>

      {/* Controls & Search */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Box */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search haplogroup code, SNP (M269, U152), region, or culture..."
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Lineage Filter Buttons */}
          <div className="flex items-center space-x-1.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setLineageFilter('ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-1 sm:flex-initial ${
                lineageFilter === 'ALL'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All ({ALL_HAPLOGROUPS.length})
            </button>

            <button
              onClick={() => setLineageFilter('PATERNAL_YDNA')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-1 sm:flex-initial ${
                lineageFilter === 'PATERNAL_YDNA'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900/60 text-cyan-400 hover:text-cyan-300 border border-slate-800'
              }`}
            >
              Y-DNA ({Y_DNA_HAPLOGROUPS.length})
            </button>

            <button
              onClick={() => setLineageFilter('MATERNAL_MTDNA')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex-1 sm:flex-initial ${
                lineageFilter === 'MATERNAL_MTDNA'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'bg-slate-900/60 text-rose-400 hover:text-rose-300 border border-slate-800'
              }`}
            >
              mtDNA ({MT_DNA_HAPLOGROUPS.length})
            </button>
          </div>

        </div>
      </div>

      {/* Encyclopedia Clade Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHaplogroups.map((haplo) => {
          const isY = haplo.lineageType === 'PATERNAL_YDNA';
          return (
            <div
              key={haplo.code}
              onClick={() => setSelectedClade(haplo)}
              className="glass-panel-interactive rounded-2xl p-5 border border-slate-800 cursor-pointer space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-extrabold font-mono text-white">
                      {haplo.code}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isY 
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/40' 
                        : 'bg-rose-950/80 text-rose-300 border border-rose-800/40'
                    }`}>
                      {isY ? 'Y-DNA' : 'mtDNA'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {haplo.ageYearsBp}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-300 mb-2">
                  {haplo.shortName}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {haplo.historicalDescription}
                </p>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{haplo.originRegion}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>View Clade Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Clade Dossier Detail Modal */}
      {selectedClade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                    {selectedClade.code}
                  </span>
                  <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    selectedClade.lineageType === 'PATERNAL_YDNA'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {selectedClade.lineageType === 'PATERNAL_YDNA' ? 'Paternal Lineage' : 'Maternal Lineage'}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-300">
                  {selectedClade.shortName} ({selectedClade.cladeName})
                </h3>
              </div>

              <button
                onClick={() => setSelectedClade(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {selectedClade.historicalDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Estimated Emergence</span>
                <span className="text-xs font-bold text-slate-200">{selectedClade.ageYearsBp}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Geographic Origin</span>
                <span className="text-xs font-bold text-slate-200">{selectedClade.originRegion}</span>
              </div>
            </div>

            {/* Defining SNPs */}
            <div>
              <span className="block text-xs font-bold text-slate-300 mb-2">Defining Diagnostic SNPs</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedClade.definingSnps.map((snp) => (
                  <span key={snp} className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
                    {snp}
                  </span>
                ))}
              </div>
            </div>

            {/* Ancient Cultures & Modern Frequencies */}
            <div className="space-y-3">
              {selectedClade.ancientCultures.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-slate-300 mb-1">Associated Ancient Cultures</span>
                  <p className="text-xs text-slate-400">{selectedClade.ancientCultures.join(', ')}</p>
                </div>
              )}

              {selectedClade.highFrequencyModern.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-slate-300 mb-1">Modern Populations (Highest Frequencies)</span>
                  <p className="text-xs text-slate-400">{selectedClade.highFrequencyModern.join(' • ')}</p>
                </div>
              )}
            </div>

            {/* Migration Path */}
            {selectedClade.migrationPath.length > 0 && (
              <div>
                <span className="block text-xs font-bold text-slate-300 mb-2">Migration Path</span>
                <div className="space-y-2">
                  {selectedClade.migrationPath.map((step) => (
                    <div key={step.order} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-200">{step.region}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{step.timePeriod}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedClade(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
