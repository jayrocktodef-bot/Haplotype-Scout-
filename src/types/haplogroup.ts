export type LineageType = 'PATERNAL_YDNA' | 'MATERNAL_MTDNA';

export type MarkerStatus = 
  | 'POSITIVE_DERIVED'   // Matches defining mutation (Derived)
  | 'NEGATIVE_ANCESTRAL'  // Matches ancestral base (Not mutated)
  | 'NO_CALL'             // Missing, uncalled (--), or low quality
  | 'MISMATCH';           // Call differs from both ancestral & expected derived

export interface SnpMarker {
  name: string;             // e.g. "M269", "U152", "7028C", "H1-defining"
  rsid: string;             // e.g. "rs9786184", "rs2853499"
  chromosome: string;       // "Y" or "MT" / "M"
  position: number;         // Genomic coordinate
  ancestralAllele: string;  // e.g. "C"
  derivedAllele: string;    // e.g. "T"
  haplogroup: string;       // Associated clade, e.g. "R1b-U152"
  lineageType: LineageType;
  description: string;
}

export interface EvaluatedMarker {
  snp: SnpMarker;
  userGenotype: string;     // e.g. "T", "TT", "AG", "--"
  status: MarkerStatus;
  details: string;
}

export interface MigrationStep {
  order: number;
  region: string;
  timePeriod: string;
  description: string;
  lat?: number;
  lng?: number;
}

export interface HaplogroupDefinition {
  code: string;             // e.g. "R1b-U152", "H1", "I1-M253", "J1c"
  shortName: string;        // e.g. "R-U152", "H1"
  cladeName: string;        // e.g. "R1b1a1b1a1a2", "H1"
  lineageType: LineageType;
  parentClade: string | null;
  definingSnps: string[];
  ageYearsBp: string;       // e.g. "~4,500 BP (Early Bronze Age)"
  originRegion: string;     // e.g. "Alps / Central Europe"
  historicalDescription: string;
  ancientCultures: string[];
  highFrequencyModern: string[];
  migrationPath: MigrationStep[];
}

export interface LineageAnalysis {
  lineageType: LineageType;
  terminalHaplogroup: HaplogroupDefinition;
  confidenceScore: number;      // 0 - 100%
  positiveCount: number;
  negativeCount: number;
  totalTestedMarkers: number;
  lineageTreePath: HaplogroupDefinition[]; // From root down to terminal
  evaluatedMarkers: EvaluatedMarker[];
  novelOrUntestedMarkers?: string[];
}

export interface MicroHapResult {
  popCode: string;
  name: string;
  percentage: number;
}

export interface DnaAnalysisResult {
  id: string;
  kitName: string;
  timestamp: number;
  rawFileFormat: string;
  totalSnpsParsed: number;
  yDnaSnpsCount: number;
  mtDnaSnpsCount: number;
  paternalLineage: LineageAnalysis | null;
  maternalLineage: LineageAnalysis | null;
  microhaplotypes?: MicroHapResult[];
  isMaleSample: boolean;
}

export interface SampleDnaKit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  paternalHaplo: string;
  maternalHaplo: string;
  rawSnippetContent: string;
}

