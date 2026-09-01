import { ALL_DEFINING_SNPS } from '../data/snpDatabase';
import { Y_DNA_HAPLOGROUPS, MT_DNA_HAPLOGROUPS } from '../data/haplogroupTree';
import { ParsedDnaData } from './dnaParser';
import {
  DnaAnalysisResult,
  EvaluatedMarker,
  HaplogroupDefinition,
  LineageAnalysis,
  LineageType,
  MarkerStatus
} from '../types/haplogroup';

interface HaploScore {
  haplogroup: HaplogroupDefinition;
  positives: number;
  negatives: number;
  totalMarkers: number;
  depth: number;
}

export class HaplogroupClassifier {
  public static analyze(kitName: string, parsedData: ParsedDnaData): DnaAnalysisResult {
    // 1. Evaluate all defining SNPs against the parsed genomic data
    const evaluatedMarkers = this.evaluateMarkers(parsedData);

    // 2. Classify Paternal Lineage (Y-DNA)
    const yMarkers = evaluatedMarkers.filter(m => m.snp.lineageType === 'PATERNAL_YDNA');
    const hasYData = parsedData.yDnaSnps > 0 || yMarkers.some(m => m.status !== 'NO_CALL');
    const paternalLineage = hasYData ? this.classifyLineage('PATERNAL_YDNA', yMarkers) : null;

    // 3. Classify Maternal Lineage (mtDNA)
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

  private static evaluateMarkers(parsedData: ParsedDnaData): EvaluatedMarker[] {
    const result: EvaluatedMarker[] = [];

    for (const snp of ALL_DEFINING_SNPS) {
      const rsidKey = snp.rsid.toLowerCase();
      const posKey = `${snp.chromosome.toLowerCase()}:${snp.position}`;

      const userGenotype = parsedData.snpByRsid[rsidKey] || parsedData.snpByPosition[posKey] || '--';

      let status: MarkerStatus = 'NO_CALL';
      let details = '';

      if (userGenotype === '--' || !userGenotype) {
        status = 'NO_CALL';
        details = 'Marker uncalled or not covered in raw data.';
      } else if (this.isGenotypeMatching(userGenotype, snp.derivedAllele)) {
        status = 'POSITIVE_DERIVED';
        details = `Derived mutation detected (${snp.derivedAllele}). Positive for clade ${snp.haplogroup}.`;
      } else if (this.isGenotypeMatching(userGenotype, snp.ancestralAllele)) {
        status = 'NEGATIVE_ANCESTRAL';
        details = `Ancestral allele observed (${snp.ancestralAllele}). Unmutated.`;
      } else {
        status = 'MISMATCH';
        details = `Genotype '${userGenotype}' differs from expected ancestral (${snp.ancestralAllele}) & derived (${snp.derivedAllele}).`;
      }

      result.push({
        snp,
        userGenotype,
        status,
        details
      });
    }

    return result;
  }

  private static isGenotypeMatching(userGenotype: string, targetAllele: string): boolean {
    const u = userGenotype.toUpperCase();
    const t = targetAllele.toUpperCase();

    if (t === 'INS' || t === 'I') return u.includes('I') || u.includes('INS');
    if (t === 'DEL' || t === 'D') return u.includes('D') || u.includes('DEL');

    return u.includes(t);
  }

  private static classifyLineage(type: LineageType, markers: EvaluatedMarker[]): LineageAnalysis {
    const haplogroups = type === 'PATERNAL_YDNA' ? Y_DNA_HAPLOGROUPS : MT_DNA_HAPLOGROUPS;

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
      const negatives = haploMarkers.filter(m => m.status === 'NEGATIVE_ANCESTRAL').length;

      return {
        haplogroup: haplo,
        positives,
        negatives,
        totalMarkers: haploMarkers.length,
        depth: this.calculateCladeDepth(haplo, haplogroups)
      };
    });

    // Best candidate: max positives -> deepest depth -> min negatives
    const candidates = scoredHaplos.filter(h => h.positives > 0);
    candidates.sort((a, b) => {
      if (b.positives !== a.positives) return b.positives - a.positives;
      if (b.depth !== a.depth) return b.depth - a.depth;
      return a.negatives - b.negatives;
    });

    const bestCandidate = candidates[0] || scoredHaplos[0] || {
      haplogroup: haplogroups[0],
      positives: 0,
      negatives: 0,
      totalMarkers: 0,
      depth: 1
    };

    const treePath = this.buildLineagePath(bestCandidate.haplogroup, haplogroups);

    const totalPos = markers.filter(m => m.status === 'POSITIVE_DERIVED').length;
    const totalNeg = markers.filter(m => m.status === 'NEGATIVE_ANCESTRAL').length;

    let confidence = 30;
    if (bestCandidate.positives > 0) {
      const baseConfidence = bestCandidate.positives >= 3 ? 99 : (bestCandidate.positives === 2 ? 96 : 90);
      confidence = Math.max(50, Math.min(99, baseConfidence - (bestCandidate.negatives * 10)));
    }

    return {
      lineageType: type,
      terminalHaplogroup: bestCandidate.haplogroup,
      confidenceScore: confidence,
      positiveCount: totalPos,
      negativeCount: totalNeg,
      totalTestedMarkers: markers.length,
      lineageTreePath: treePath,
      evaluatedMarkers: markers
    };
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
