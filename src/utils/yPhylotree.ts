/**
 * Y-DNA phylotree types and helpers for ISOGG tree navigation.
 */

export interface YSnpRecord {
  name: string;            // SNP name, e.g. "M269"
  rsid?: string;           // dbSNP id when available
  posHg38?: number;        // GRCh38 chrY position
  posHg19?: number;        // GRCh37 chrY position
  ancestral: string;       // ancestral allele (e.g. "T")
  derived: string;         // derived/mutation allele (e.g. "C")
  isoggHaplogroup?: string;// ISOGG longhand, e.g. "R1b1a1a2"
  mutation?: string;       // human-readable, e.g. "T to C"
}

export type YSnpIndex = Record<string, YSnpRecord>; // keyed by uppercased SNP name

export interface YPhylotreeBranch {
  branchName: string;
  parent: string | null;
  definingSNPs: YSnpRecord[];   // resolved (allele-aware) defining SNPs
  unresolvedSNPs: string[];     // defining SNP names with no allele data yet
  rsids: string[];
}

export interface YPhylotreeDataset {
  version: string;
  source: string;
  generatedAt: string;
  snpCount: number;
  branchCount: number;
  resolvedBranchCount: number;
  branches: YPhylotreeBranch[];
}

/**
 * Derive the parent ISOGG longhand haplogroup name by stripping the last
 * alternating letter/number token. e.g. "R1b1a1a2" -> "R1b1a1a" -> "R1b1a1".
 * Returns null for a single top-level letter (e.g. "R").
 */
export function parentHaplogroup(name: string): string | null {
  if (!name) return null;
  const clean = name.replace(/[~*]+$/, '').trim();
  // Tokens: a leading uppercase letter group, then alternating digit / lowercase runs.
  const tokens = clean.match(/^[A-Z]+|[0-9]+|[a-z]+/g);
  if (!tokens || tokens.length <= 1) return null;
  return tokens.slice(0, -1).join('');
}
