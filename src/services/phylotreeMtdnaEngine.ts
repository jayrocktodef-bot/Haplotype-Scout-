import { LineageAnalysis } from '../types/haplogroup';

export interface PhylotreeMutation {
  position: number;
  ancestral: string;
  derived: string;
  rawString: string;
  isTransversion: boolean;
  isHotspot: boolean;
  weight: number;
}

export interface PhylotreeBranch {
  branchName: string;
  mutations: string[];
}

// Known hypervariable & homoplastic mutational hotspots (HaploGrep 2 / 3 consensus)
export const MTDNA_MUTATION_HOTSPOTS = new Set<number>([
  146, 152, 195, 309, 315, 524, 525, 16182, 16183, 16189, 16311, 16519
]);

/**
 * Parses mutation string like "G263A", "C1048T", "A263G!", "315.1C", "524-525d"
 */
export function parseMtMutation(raw: string): PhylotreeMutation | null {
  const clean = raw.trim().replace('!', '');
  
  // Format: RefPosAlt (e.g. G263A or C16188G)
  const match = clean.match(/^([ACGT])(\d+)([ACGT])$/i);
  if (match) {
    const ancestral = match[1].toUpperCase();
    const pos = parseInt(match[2], 10);
    const derived = match[3].toUpperCase();

    // Check transition vs transversion
    const isTransition = (ancestral === 'A' && derived === 'G') || (ancestral === 'G' && derived === 'A') ||
                         (ancestral === 'C' && derived === 'T') || (ancestral === 'T' && derived === 'C');

    const isHotspot = MTDNA_MUTATION_HOTSPOTS.has(pos);

    let weight = isTransition ? 1.0 : 4.5;
    if (isHotspot) {
      weight *= 0.35; // Dampen hypervariable mutational hotspots
    }

    return {
      position: pos,
      ancestral,
      derived,
      rawString: raw,
      isTransversion: !isTransition,
      isHotspot,
      weight
    };
  }

  // Fallback for indels / deletions (e.g. 524d)
  const indelMatch = clean.match(/^(\d+)/);
  if (indelMatch) {
    const pos = parseInt(indelMatch[1], 10);
    const isHotspot = MTDNA_MUTATION_HOTSPOTS.has(pos);
    return {
      position: pos,
      ancestral: '-',
      derived: '+',
      rawString: raw,
      isTransversion: true,
      isHotspot,
      weight: isHotspot ? 0.8 : 2.5
    };
  }

  return null;
}

export interface MtDnaMatchScore {
  branchName: string;
  score: number;
  matchedCount: number;
  totalMutations: number;
  matchedMutations: string[];
  transversionsMatched: number;
}

/**
 * Evaluates user's mtDNA mutations against Van Oven PhyloTree Build 17
 * Applies 4.5x weight to transversions, dampens hotspots, and penalizes ancestral clashes.
 */
export function matchPhyloTreeBuild17(
  userPosMap: Record<number, string>, // pos -> userGenotype
  branches: PhylotreeBranch[]
): MtDnaMatchScore[] {
  const results: MtDnaMatchScore[] = [];

  for (const branch of branches) {
    let score = 0;
    let matchedCount = 0;
    let transversionsMatched = 0;
    const matchedMutations: string[] = [];

    for (const rawMut of branch.mutations) {
      const parsed = parseMtMutation(rawMut);
      if (!parsed) continue;

      const userAllele = userPosMap[parsed.position];
      if (!userAllele || userAllele === '--' || userAllele === '00' || userAllele === '??') {
        continue;
      }

      const u = userAllele.toUpperCase();
      if (u.includes(parsed.derived)) {
        matchedCount++;
        score += parsed.weight;
        matchedMutations.push(rawMut);
        if (parsed.isTransversion) {
          transversionsMatched++;
        }
      } else if (u.includes(parsed.ancestral)) {
        // Ancestral observation: slight negative pressure for deeply nested branches
        score -= parsed.isHotspot ? 0.2 : 0.6;
      }
    }

    if (matchedCount > 0) {
      results.push({
        branchName: branch.branchName,
        score,
        matchedCount,
        totalMutations: branch.mutations.length,
        matchedMutations,
        transversionsMatched
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * Dynamically refines maternal lineage if Build 17 discovers a deeper confirmed sub-branch
 */
export function refineMtdnaWithBuild17(
  currentLineage: LineageAnalysis,
  deepMatches: MtDnaMatchScore[]
): LineageAnalysis {
  if (!deepMatches || deepMatches.length === 0 || !currentLineage.terminalHaplogroup) {
    return currentLineage;
  }

  const top = deepMatches[0];
  const currentCode = currentLineage.terminalHaplogroup.code;

  // Check if the top deep match is a descendant or refinement of the current root clade
  const isDescendant = top.branchName.startsWith(currentCode) || 
                       (currentCode === 'N' && top.branchName.startsWith('W')) ||
                       (currentCode === 'R' && (top.branchName.startsWith('H') || top.branchName.startsWith('V') || top.branchName.startsWith('U')));

  if (isDescendant && top.score >= 1.5 && top.matchedCount >= 1) {
    const existingNovel = currentLineage.novelOrUntestedMarkers || [];
    return {
      ...currentLineage,
      terminalHaplogroup: {
        ...currentLineage.terminalHaplogroup,
        code: top.branchName,
        shortName: `Haplogroup ${top.branchName}`,
        cladeName: `mtDNA-${top.branchName}`,
      },
      confidenceScore: Math.min(0.99, currentLineage.confidenceScore + 0.05),
      novelOrUntestedMarkers: Array.from(new Set([...existingNovel, ...top.matchedMutations]))
    };
  }

  return currentLineage;
}
