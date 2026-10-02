import { ALL_DEFINING_SNPS } from '../data/snpDatabase';
import { Y_DNA_HAPLOGROUPS, MT_DNA_HAPLOGROUPS } from '../data/haplogroupTree';
import { DIAGNOSTIC_LD_PROXIES } from '../data/ldProxies';
import { snpAliasResolver } from '../data/snpAliasIndex';
import { ParsedDnaData } from './dnaParser';
import {
  DnaAnalysisResult,
  EvaluatedMarker,
  HaplogroupDefinition,
  LineageAnalysis,
  LineageType,
  MarkerStatus
} from '../types/haplogroup';

// IUPAC heteroplasmy codes for mixture positions in full-sequence files.
// Excludes 'D' (deletion call — handled by the DEL branch) and 'N'
// (no-call — must never match).
export const IUPAC_HETEROZYGOTES: Record<string, string> = {
  R: 'AG', Y: 'CT', S: 'GC', W: 'AT', K: 'GT', M: 'AC',
  B: 'CGT', H: 'ACT', V: 'ACG',
};

export function expandIupacHeteroplasmy(genotype: string): string {
  const u = genotype.toUpperCase();
  return IUPAC_HETEROZYGOTES[u] ?? u;
}

interface HaploScore {
  haplogroup: HaplogroupDefinition;
  positives: number;
  imputedPositives: number;
  weightedScore: number;
  negatives: number;
  totalMarkers: number;
  depth: number;
  hasAncestralConflict: boolean;
}

export class HaplogroupClassifier {
  public static analyze(kitName: string, parsedData: ParsedDnaData): DnaAnalysisResult {
    // 1. Evaluate all defining SNPs against user genomic data (with LD Proxy Imputation)
    const evaluatedMarkers = this.evaluateMarkersWithLD(parsedData);

    // 2. Classify Paternal Lineage (Y-DNA) with DAG Tree Walking & Negative Guarding
    const yMarkers = evaluatedMarkers.filter(m => m.snp.lineageType === 'PATERNAL_YDNA');
    const hasYData = parsedData.yDnaSnps > 0 || yMarkers.some(m => m.status !== 'NO_CALL');
    const paternalLineage = hasYData ? this.classifyLineage('PATERNAL_YDNA', yMarkers) : null;

    // 3. Classify Maternal Lineage (mtDNA) with Weighted Transversion Matrix
    const mtMarkers = evaluatedMarkers.filter(m => m.snp.lineageType === 'MATERNAL_MTDNA');
    const maternalLineage = this.classifyLineage('MATERNAL_MTDNA', mtMarkers);

    const isMale = paternalLineage !== null && yMarkers.some(m => m.status === 'POSITIVE_DERIVED');

    return {
      id: `kit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      kitName,
      timestamp: Date.now(),
      rawFileFormat: parsedData.format,
      totalSnpsParsed: parsedData.totalSnps,
      yDnaSnpsCount: parsedData.yDnaSnps,
      mtDnaSnpsCount: parsedData.mtDnaSnps,
      paternalLineage,
      maternalLineage,
      isMaleSample: isMale
    };
  }

  public static evaluateMarkersWithLD(parsedData: ParsedDnaData): EvaluatedMarker[] {
    const result: EvaluatedMarker[] = [];

    for (const snp of ALL_DEFINING_SNPS) {
      const rsidKey = snp.rsid.toLowerCase();
      const posKey = `${snp.chromosome.toLowerCase()}:${snp.position}`;

      let userGenotype = parsedData.snpByRsid[rsidKey] || parsedData.snpByPosition[posKey];

      // Multi-Vendor Alias Resolution: Check synonymous rsIDs, P-markers, CTS-numbers if uncalled
      if (!userGenotype || userGenotype === '--') {
        const aliasEntry = snpAliasResolver.resolveName(snp.name) || snpAliasResolver.resolveName(snp.rsid);
        if (aliasEntry) {
          for (const alias of aliasEntry.aliases) {
            const val = parsedData.snpByRsid[alias.toLowerCase()];
            if (val && val !== '--' && val !== '00' && val !== '??') {
              userGenotype = val;
              break;
            }
          }
        }
      }

      if (!userGenotype) userGenotype = '--';
      let isImputed = false;
      let imputedFrom = undefined;

      // LD Proxy Imputation: If primary SNP is uncalled or missing from commercial chip, test high r² proxies
      if ((userGenotype === '--' || !userGenotype) && DIAGNOSTIC_LD_PROXIES[snp.rsid]) {
        const proxies = DIAGNOSTIC_LD_PROXIES[snp.rsid];
        for (const proxy of proxies) {
          const proxyRsidKey = proxy.proxyRsid.toLowerCase();
          const proxyPosKey = `${proxy.proxyChr.toLowerCase()}:${proxy.proxyPos}`;
          const proxyGenotype = parsedData.snpByRsid[proxyRsidKey] || parsedData.snpByPosition[proxyPosKey];

          if (proxyGenotype && proxyGenotype !== '--' && proxyGenotype !== '00' && proxyGenotype !== '??') {
            if (this.isGenotypeMatching(proxyGenotype, proxy.proxyDerived)) {
              userGenotype = snp.derivedAllele;
              isImputed = true;
              imputedFrom = `${proxy.proxyRsid} (r²=${proxy.r2})`;
              break;
            } else if (this.isGenotypeMatching(proxyGenotype, proxy.proxyAncestral)) {
              userGenotype = snp.ancestralAllele;
              isImputed = true;
              imputedFrom = `${proxy.proxyRsid} (r²=${proxy.r2})`;
              break;
            }
          }
        }
      }

      let status: MarkerStatus = 'NO_CALL';
      let details = '';

      // Calculate mutation weight: Transversions (A<->C, G<->T) get 5x weight; Transitions (A<->G, C<->T) get 1x
      const mutationWeight = this.getMutationWeight(snp.ancestralAllele, snp.derivedAllele);

      if (!userGenotype || userGenotype === '--' || userGenotype === 'N' || userGenotype === 'NN' || userGenotype === '00' || userGenotype === '??') {
        status = 'NO_CALL';
        details = 'Marker uncalled or not covered in raw data.';
      } else if (this.isGenotypeMatching(userGenotype, snp.derivedAllele)) {
        status = 'POSITIVE_DERIVED';
        details = isImputed 
          ? `Derived allele [${snp.derivedAllele}] imputed via high LD proxy ${imputedFrom}. Positive for clade ${snp.haplogroup}.`
          : `Derived mutation detected (${snp.derivedAllele}). Positive for clade ${snp.haplogroup}.`;
      } else if (this.isGenotypeMatching(userGenotype, snp.ancestralAllele)) {
        status = 'NEGATIVE_ANCESTRAL';
        details = isImputed 
          ? `Ancestral base [${snp.ancestralAllele}] inferred via LD proxy ${imputedFrom}. Unmutated.`
          : `Ancestral allele observed (${snp.ancestralAllele}). Unmutated.`;
      } else {
        status = 'MISMATCH';
        details = `Genotype '${userGenotype}' differs from expected ancestral (${snp.ancestralAllele}) & derived (${snp.derivedAllele}).`;
      }

      const u = userGenotype.toUpperCase();
      const isMixture = IUPAC_HETEROZYGOTES[u] !== undefined || (/^[ACGT]{2}$/.test(u) && u[0] !== u[1]);
      const isHeteroplasmic = status === 'POSITIVE_DERIVED' && isMixture;

      result.push({
        snp,
        userGenotype,
        status,
        details,
        isImputed,
        imputedFrom,
        isHeteroplasmic,
        mutationWeight
      });
    }

    return result;
  }

  private static getMutationWeight(ancestral: string, derived: string): number {
    const a = ancestral.toUpperCase();
    const d = derived.toUpperCase();
    
    // Transitions: A <-> G, C <-> T (weight = 1.0)
    if ((a === 'A' && d === 'G') || (a === 'G' && d === 'A') ||
        (a === 'C' && d === 'T') || (a === 'T' && d === 'C')) {
      return 1.0;
    }
    // Transversions: A <-> C, A <-> T, C <-> G, G <-> T, Indels (weight = 4.5)
    return 4.5;
  }

  public static isGenotypeMatching(userGenotype: string, targetAllele: string): boolean {
    const u = userGenotype.toUpperCase();
    const t = targetAllele.toUpperCase();

    if (t === 'INS' || t === 'I') return u.includes('I') || u.includes('INS');
    if (t === 'DEL' || t === 'D') return u.includes('D') || u.includes('DEL');

    // Heteroplasmy: a mixed position carrying the target base counts as a match.
    // 'D' and 'N' are absent from the map above, so deletion calls and no-calls
    // can never match through expansion.
    return expandIupacHeteroplasmy(u).includes(t);
  }

  public static classifyLineage(type: LineageType, markers: EvaluatedMarker[]): LineageAnalysis | null {
    const haplogroups = type === 'PATERNAL_YDNA' ? Y_DNA_HAPLOGROUPS : MT_DNA_HAPLOGROUPS;

    // Check ancestral status of major root clades to guard against false descendant matching
    const ancestralBlockedClades = new Set<string>();
    for (const m of markers) {
      if (m.status === 'NEGATIVE_ANCESTRAL') {
        ancestralBlockedClades.add(m.snp.haplogroup.toLowerCase());
      }
    }

    const scoredHaplos: HaploScore[] = haplogroups.map(haplo => {
      const haploMarkers = markers.filter(m => 
        haplo.definingSnps.some(s => 
          s.toLowerCase() === m.snp.name.toLowerCase() ||
          s.toLowerCase() === m.snp.rsid.toLowerCase() ||
          s.toLowerCase() === m.snp.haplogroup.toLowerCase() ||
          haplo.code.toLowerCase() === m.snp.haplogroup.toLowerCase()
        )
      );

      const positives = haploMarkers.filter(m => m.status === 'POSITIVE_DERIVED').length;
      const imputedPositives = haploMarkers.filter(m => m.status === 'POSITIVE_DERIVED' && m.isImputed).length;
      const negatives = haploMarkers.filter(m => m.status === 'NEGATIVE_ANCESTRAL').length;

      // Calculate weighted mutational support: imputed markers contribute half their mutationWeight
      const weightedScore = haploMarkers
        .filter(m => m.status === 'POSITIVE_DERIVED')
        .reduce((sum, m) => {
          const w = m.mutationWeight || 1.0;
          return sum + (m.isImputed ? w * 0.5 : w);
        }, 0);

      // Check if any ancestor on the path was definitively negative (Ancestral Guard)
      const path = this.buildLineagePath(haplo, haplogroups);
      const hasAncestralConflict = path.some(p => ancestralBlockedClades.has(p.code.toLowerCase()) && p.code !== haplo.code);

      return {
        haplogroup: haplo,
        positives,
        imputedPositives,
        weightedScore,
        negatives,
        totalMarkers: haploMarkers.length,
        depth: this.calculateCladeDepth(haplo, haplogroups),
        hasAncestralConflict
      };
    });

    // Valid candidates must not violate ancestral root boundaries and must have positive support
    const validCandidates = scoredHaplos.filter(h => h.positives > 0 && !h.hasAncestralConflict);

    validCandidates.sort((a, b) => {
      if (b.weightedScore !== a.weightedScore) return b.weightedScore - a.weightedScore;
      if (b.depth !== a.depth) return b.depth - a.depth;
      return a.negatives - b.negatives;
    });

    // Lineage-Consistency Gate: Candidates must have at least one non-recurrent derived marker
    // on their lineage path to guard against lateral wins on recurrent transversion weight alone.
    const anchoredCandidates = validCandidates.filter(h => this.hasNonRecurrentPathSupport(h, haplogroups, markers));
    const bestCandidate = anchoredCandidates[0] || null;
    if (!bestCandidate) {
      return null;
    }

    const treePath = this.buildLineagePath(bestCandidate.haplogroup, haplogroups);

    const totalPos = markers.filter(m => m.status === 'POSITIVE_DERIVED').length;
    const totalNeg = markers.filter(m => m.status === 'NEGATIVE_ANCESTRAL').length;

    // Confidence ladder uses effective positives = observed positives + 0.5 * imputed positives
    // Starting thresholds:
    // effective >= 3 -> 99
    // effective >= 2 -> 96
    // effective >= 1 -> 80 (down from 90: a single supporting marker, however observed, should not claim 90%)
    // 0 < effective < 1 -> 65 (single imputed proxy with no direct observation)
    // minus 8 per negative as today, floor 50.
    const observedPositives = bestCandidate.positives - bestCandidate.imputedPositives;
    const effectivePositives = observedPositives + 0.5 * bestCandidate.imputedPositives;

    let baseConfidence = 50;
    if (effectivePositives >= 3) {
      baseConfidence = 99;
    } else if (effectivePositives >= 2) {
      baseConfidence = 96;
    } else if (effectivePositives >= 1) {
      baseConfidence = 80;
    } else if (effectivePositives > 0) {
      baseConfidence = 65;
    }

    const confidence = Math.max(50, Math.min(99, baseConfidence - (bestCandidate.negatives * 8)));

    return {
      lineageType: type,
      terminalHaplogroup: bestCandidate.haplogroup,
      confidenceScore: confidence,
      positiveCount: totalPos,
      imputedPositiveCount: bestCandidate.imputedPositives,
      negativeCount: totalNeg,
      totalTestedMarkers: markers.length,
      lineageTreePath: treePath,
      evaluatedMarkers: markers
    };
  }

  private static recurrentMarkersCache: Set<string> | null = null;

  public static isMtHypervariableRegion(position: number): boolean {
    // rCRS coordinates, standard forensic boundaries (inclusive):
    // HVR1: 16024–16383, HVR2: 57–372, HVR3: 438–574
    return (
      (position >= 16024 && position <= 16383) ||
      (position >= 57 && position <= 372) ||
      (position >= 438 && position <= 574)
    );
  }

  private static isAncestorOrSelf(
    ancestorCandidateCode: string,
    descendantCandidateCode: string,
    tree: HaplogroupDefinition[]
  ): boolean {
    const target = ancestorCandidateCode.toLowerCase();
    let currentCode: string | null = descendantCandidateCode.toLowerCase();

    while (currentCode) {
      if (currentCode === target) {
        return true;
      }
      const node = tree.find(h => h.code.toLowerCase() === currentCode);
      currentCode = node?.parentClade ? node.parentClade.toLowerCase() : null;
    }
    return false;
  }

  private static getRecurrentMarkers(): Set<string> {
    if (this.recurrentMarkersCache) {
      return this.recurrentMarkersCache;
    }

    const recurrent = new Set<string>();

    interface MarkerGroup {
      chromosome: string;
      position: number;
      lineageType: LineageType;
      haplogroups: Set<string>;
    }

    const groups = new Map<string, MarkerGroup>();

    for (const snp of ALL_DEFINING_SNPS) {
      const key = `${snp.chromosome.toLowerCase()}:${snp.position}`;
      let group = groups.get(key);
      if (!group) {
        group = {
          chromosome: snp.chromosome.toUpperCase(),
          position: snp.position,
          lineageType: snp.lineageType,
          haplogroups: new Set<string>()
        };
        groups.set(key, group);
      }
      group.haplogroups.add(snp.haplogroup);
    }

    for (const [key, group] of groups.entries()) {
      const isMt = group.chromosome === 'MT' || group.chromosome === 'M';
      const isHvr = isMt && this.isMtHypervariableRegion(group.position);

      let isRecurrentByB = false;
      const haploList = Array.from(group.haplogroups);

      if (haploList.length >= 2) {
        const tree = group.lineageType === 'PATERNAL_YDNA' ? Y_DNA_HAPLOGROUPS : MT_DNA_HAPLOGROUPS;

        for (let i = 0; i < haploList.length; i++) {
          for (let j = i + 1; j < haploList.length; j++) {
            const h1 = haploList[i];
            const h2 = haploList[j];
            const related =
              this.isAncestorOrSelf(h1, h2, tree) ||
              this.isAncestorOrSelf(h2, h1, tree);

            if (!related) {
              isRecurrentByB = true;
              break;
            }
          }
          if (isRecurrentByB) break;
        }
      }

      if (isHvr || isRecurrentByB) {
        recurrent.add(key);
      }

      if (isRecurrentByB && !isHvr) {
        console.debug(
          `[HaplogroupClassifier] Recurrent marker flagged by rule (b) only: ${key} (${haploList.join(', ')})`
        );
      }
    }

    this.recurrentMarkersCache = recurrent;
    return recurrent;
  }

  public static isRecurrentMarker(
    markerOrPos: number | string | { chromosome: string; position: number },
    defaultChromosome: string = 'MT'
  ): boolean {
    let chr: string;
    let pos: number;

    if (typeof markerOrPos === 'number') {
      chr = defaultChromosome;
      pos = markerOrPos;
    } else if (typeof markerOrPos === 'string') {
      if (markerOrPos.includes(':')) {
        const parts = markerOrPos.split(':');
        chr = parts[0];
        pos = parseInt(parts[1], 10);
      } else {
        chr = defaultChromosome;
        pos = parseInt(markerOrPos, 10);
      }
    } else {
      chr = markerOrPos.chromosome;
      pos = markerOrPos.position;
    }

    const isMt = chr.toUpperCase() === 'MT' || chr.toUpperCase() === 'M';
    if (isMt && this.isMtHypervariableRegion(pos)) {
      return true;
    }

    const key = `${chr.toLowerCase()}:${pos}`;
    return this.getRecurrentMarkers().has(key);
  }

  public static isRecurrent = HaplogroupClassifier.isRecurrentMarker;

  private static hasNonRecurrentPathSupport(
    candidate: HaploScore,
    allHaplos: HaplogroupDefinition[],
    markers: EvaluatedMarker[]
  ): boolean {
    const lineagePath = this.buildLineagePath(candidate.haplogroup, allHaplos);
    const pathHaploCodes = new Set(lineagePath.map(h => h.code.toLowerCase()));

    return markers.some(m =>
      m.status === 'POSITIVE_DERIVED' &&
      pathHaploCodes.has(m.snp.haplogroup.toLowerCase()) &&
      !this.isRecurrentMarker(m.snp)
    );
  }

  private static calculateCladeDepth(haplo: HaplogroupDefinition, allHaplos: HaplogroupDefinition[]): number {
    let depth = 1;
    let current: HaplogroupDefinition | undefined = haplo;
    while (current?.parentClade) {
      depth++;
      const parentCode: string = current.parentClade;
      current = allHaplos.find(h => h.code.toLowerCase() === parentCode.toLowerCase());
    }
    return depth;
  }

  private static buildLineagePath(terminal: HaplogroupDefinition, allHaplos: HaplogroupDefinition[]): HaplogroupDefinition[] {
    const path: HaplogroupDefinition[] = [];
    let current: HaplogroupDefinition | undefined = terminal;
    while (current) {
      path.unshift(current);
      if (!current.parentClade) break;
      const parentCode: string = current.parentClade;
      current = allHaplos.find(h => h.code.toLowerCase() === parentCode.toLowerCase());
    }
    return path;
  }
}
