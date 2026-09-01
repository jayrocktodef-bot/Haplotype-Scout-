export interface PhylotreeMutation {
  position: number;
  ancestral: string;
  derived: string;
  rawString: string;
  isTransversion: boolean;
  weight: number;
}

export interface PhylotreeBranch {
  branchName: string;
  mutations: string[];
}

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

    return {
      position: pos,
      ancestral,
      derived,
      rawString: raw,
      isTransversion: !isTransition,
      weight: isTransition ? 1.0 : 4.5
    };
  }

  // Fallback for indels / deletions (e.g. 524d)
  const indelMatch = clean.match(/^(\d+)/);
  if (indelMatch) {
    return {
      position: parseInt(indelMatch[1], 10),
      ancestral: '-',
      derived: '+',
      rawString: raw,
      isTransversion: true,
      weight: 3.0
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
 * Applies 4.5x weight to transversions and penalizes mismatch deviations.
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
        score -= 0.5;
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
