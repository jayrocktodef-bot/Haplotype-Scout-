import React, { useState, useMemo } from 'react';
import { HaplogroupDefinition, EvaluatedMarker, LineageType } from '../types/haplogroup';
import { auditBranchSpineAndPrivateVariants, BranchAuditResult } from '../services/branchAuditEngine';
import { 
  GitCommit, CheckCircle2, XCircle, HelpCircle, AlertTriangle, 
  ChevronDown, ChevronUp, Sparkles, Dna, ShieldCheck, ArrowDown
} from 'lucide-react';

interface BranchSpineAuditCardProps {
  lineagePath: HaplogroupDefinition[];
  evaluatedMarkers: EvaluatedMarker[];
  lineageType: LineageType;
  novelOrUntestedMarkers?: string[];
}

export const BranchSpineAuditCard: React.FC<BranchSpineAuditCardProps> = ({
  lineagePath,
  evaluatedMarkers,
  lineageType,
  novelOrUntestedMarkers = []
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const audit: BranchAuditResult = useMemo(() => {
    return auditBranchSpineAndPrivateVariants(
      lineagePath,
      evaluatedMarkers,
      lineageType,
      novelOrUntestedMarkers
    );
  }, [lineagePath, evaluatedMarkers, lineageType, novelOrUntestedMarkers]);

  const toggleNode = (code: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Phylogenetic Branch Mutation Ladder Audit
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                Spine Integrity: {audit.spineIntegrityScorePct}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Node-by-node verification of every mutation along your ancestral phylogenetic spine.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-xl bg-slate-900 border border-white/[0.08]">
            {audit.totalSpineDerivedMatches} / {audit.totalSpineMarkersTested} Spine Markers Derived
          </span>
        </div>
      </div>

      {/* Homoplasy / Back-mutation Alerts */}
      {audit.homoplasyWarnings.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Phylogenetic Discordance / Homoplasy Warning</span>
          </div>
          {audit.homoplasyWarnings.map((w, idx) => (
            <p key={idx} className="text-slate-300 text-[11px] leading-relaxed">
              • {w}
            </p>
          ))}
        </div>
      )}

      {/* Vertical Spine Step-Ladder */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-emerald-400">
        {audit.ladderNodes.map((node, index) => {
          const isTerminal = index === audit.ladderNodes.length - 1;
          const isExpanded = expandedNodes[node.clade.code] ?? (isTerminal || index === 0);

          let statusBadge = (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Confirmed Derived
            </span>
          );

          if (node.nodeStatus === 'PARTIALLY_CONFIRMED') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
                <AlertTriangle className="w-3 h-3 text-amber-400" /> Mixed Calls
              </span>
            );
          } else if (node.nodeStatus === 'UNTESTED_NO_CALL') {
            statusBadge = (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 font-mono">
                <HelpCircle className="w-3 h-3 text-slate-500" /> Missing / Microarray Gap
              </span>
            );
          }

          return (
            <div
              key={node.clade.code}
              className={`relative rounded-2xl border transition-all ${
                isTerminal
                  ? 'bg-slate-950/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-slate-800/80'
              }`}
            >
              {/* Bullet Node Indicator */}
              <div
                className={`absolute -left-[31px] top-4 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isTerminal
                    ? 'bg-cyan-400 border-white shadow-md shadow-cyan-400/50 animate-pulse'
                    : node.nodeStatus === 'CONFIRMED_POSITIVE'
                    ? 'bg-emerald-500 border-slate-950'
                    : 'bg-slate-800 border-slate-950'
                }`}
              />

              {/* Node Summary Row */}
              <div
                onClick={() => toggleNode(node.clade.code)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500">#{node.depth}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold font-mono text-white">
                        {node.clade.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        ({node.clade.shortName})
                      </span>
                      {isTerminal && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold font-mono bg-cyan-500 text-slate-950">
                          Terminal Clade
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Age: {node.clade.ageYearsBp} • Origin: {node.clade.originRegion}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {statusBadge}
                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Defining Mutation Chips */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-white/[0.04] space-y-2 text-xs">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    Defining Node Mutations ({node.clade.definingSnps.length} SNPs)
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {node.positiveMarkers.map((em) => (
                      <span
                        key={em.snp.name}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 font-mono text-[11px]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="font-bold">{em.snp.name}</span>
                        <span className="text-[9px] text-slate-400">({em.userGenotype})</span>
                      </span>
                    ))}

                    {node.negativeMarkers.map((em) => (
                      <span
                        key={em.snp.name}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-700/50 text-rose-300 font-mono text-[11px]"
                      >
                        <XCircle className="w-3 h-3 text-rose-400" />
                        <span className="font-bold">{em.snp.name}</span>
                        <span className="text-[9px] text-slate-400">Ancestral</span>
                      </span>
                    ))}

                    {node.uncalledMarkers.map((snp) => (
                      <span
                        key={snp}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 font-mono text-[11px]"
                      >
                        <HelpCircle className="w-3 h-3 text-slate-500" />
                        <span>{snp}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Private & Novel Variants Drawer */}
      {audit.potentialPrivateVariants.length > 0 && (
        <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Private &amp; Novel Subclade Markers Detected ({audit.potentialPrivateVariants.length})
              </h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Potential Family Sub-Branch</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            These derived variants in your raw file lie downstream of your confirmed terminal clade and may define private family branches or high-resolution subclades:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {audit.potentialPrivateVariants.map((pv) => (
              <div
                key={pv.rsid}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs font-mono flex items-center gap-2"
              >
                <span className="font-bold text-white">{pv.rsid}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  {pv.observedGenotype}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
