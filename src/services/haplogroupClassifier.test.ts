import { describe, it, expect } from 'vitest';
import { HaplogroupClassifier, expandIupacHeteroplasmy, IUPAC_HETEROZYGOTES } from './haplogroupClassifier';
import { parseRawDnaText, ParsedDnaData } from './dnaParser';
import { ALL_DEFINING_SNPS } from '../data/snpDatabase';
import { SAMPLE_DNA_KITS } from '../data/sampleDnaKits';
import { EvaluatedMarker, HaplogroupDefinition } from '../types/haplogroup';

/**
 * Helper to construct a realistic chip dataset with dozens of ancestral markers
 * to simulate authentic commercial microarray background.
 */
function createRealisticBackgroundChip(
  overrides: Record<string, string> = {},
  options: { includeY?: boolean; includeMt?: boolean; allNoCall?: boolean } = {}
): ParsedDnaData {
  const includeY = options.includeY ?? true;
  const includeMt = options.includeMt ?? true;
  const allNoCall = options.allNoCall ?? false;

  const snpByRsid: Record<string, string> = {};
  const snpByPosition: Record<string, string> = {};

  let yCount = 0;
  let mtCount = 0;

  for (const snp of ALL_DEFINING_SNPS) {
    const isY = snp.chromosome === 'Y';
    const isMt = snp.chromosome === 'MT' || snp.chromosome === 'M';

    if (isY && !includeY) continue;
    if (isMt && !includeMt) continue;

    if (isY) yCount++;
    if (isMt) mtCount++;

    const rsKey = snp.rsid.toLowerCase();
    const posKey = `${snp.chromosome.toLowerCase()}:${snp.position}`;

    const genotype = allNoCall ? '--' : snp.ancestralAllele;
    snpByRsid[rsKey] = genotype;
    snpByPosition[posKey] = genotype;
  }

  // Apply explicit test overrides
  for (const [key, value] of Object.entries(overrides)) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.startsWith('rs')) {
      snpByRsid[lowerKey] = value;
    } else {
      snpByPosition[lowerKey] = value;
    }
  }

  return {
    format: 'Realistic Microarray Chip Simulation',
    build: 'GRCh37',
    totalSnps: yCount + mtCount,
    yDnaSnps: yCount,
    yDnaCalledSnps: allNoCall ? 0 : yCount,
    mtDnaSnps: mtCount,
    inferredBiologicalSex: yCount > 0 ? 'MALE' : 'FEMALE',
    snpByRsid,
    snpByPosition
  };
}

describe('HaplogroupClassifier — Evidence-Honesty Improvements', () => {

  // =========================================================================
  // FIX 1 — Zero evidence returns undetermined (null), not scoredHaplos[0]
  // =========================================================================
  describe('Fix 1: Zero evidence returns null lineage', () => {
    it('returns maternalLineage === null when mtDNA markers are empty/absent (not L0, not 30% confidence)', () => {
      // Realistic male chip with Y markers but zero mtDNA markers
      const chipNoMt = createRealisticBackgroundChip({}, { includeY: true, includeMt: false });
      const result = HaplogroupClassifier.analyze('Male No-Mt Kit', chipNoMt);

      // Must be null, never fallback to scoredHaplos[0] (which was L0 at 30% confidence)
      expect(result.maternalLineage).toBeNull();
    });

    it('returns maternalLineage === null when all mtDNA markers are all-ancestral with no derived positives', () => {
      // 50+ mtDNA markers present, but all are strictly ancestral (zero positive markers)
      const chipAllAncestral = createRealisticBackgroundChip({}, { includeY: false, includeMt: true });
      const result = HaplogroupClassifier.analyze('All Ancestral Mt Kit', chipAllAncestral);

      expect(result.maternalLineage).toBeNull();
    });

    it('returns null for both paternal and maternal lineages when all markers are NO_CALL (-- or N)', () => {
      const chipAllNoCall = createRealisticBackgroundChip({}, { includeY: true, includeMt: true, allNoCall: true });
      const result = HaplogroupClassifier.analyze('All No-Call Kit', chipAllNoCall);

      expect(result.paternalLineage).toBeNull();
      expect(result.maternalLineage).toBeNull();
    });
  });

  // =========================================================================
  // FIX 2 — Heteroplasmy in isGenotypeMatching and evaluateMarkersWithLD
  // =========================================================================
  describe('Fix 2: Heteroplasmy handling', () => {
    it('expands IUPAC ambiguity codes correctly', () => {
      expect(expandIupacHeteroplasmy('R')).toBe('AG');
      expect(expandIupacHeteroplasmy('Y')).toBe('CT');
      expect(expandIupacHeteroplasmy('S')).toBe('GC');
      expect(expandIupacHeteroplasmy('W')).toBe('AT');
      expect(expandIupacHeteroplasmy('K')).toBe('GT');
      expect(expandIupacHeteroplasmy('M')).toBe('AC');
      expect(expandIupacHeteroplasmy('B')).toBe('CGT');
      expect(expandIupacHeteroplasmy('H')).toBe('ACT');
      expect(expandIupacHeteroplasmy('V')).toBe('ACG');
      // Pass-through non-IUPAC
      expect(expandIupacHeteroplasmy('A')).toBe('A');
      expect(expandIupacHeteroplasmy('D')).toBe('D');
      expect(expandIupacHeteroplasmy('N')).toBe('N');
    });

    it('matches target allele via isGenotypeMatching with IUPAC expansion', () => {
      // R = AG: matches G and A
      expect(HaplogroupClassifier.isGenotypeMatching('R', 'G')).toBe(true);
      expect(HaplogroupClassifier.isGenotypeMatching('R', 'A')).toBe(true);
      expect(HaplogroupClassifier.isGenotypeMatching('R', 'C')).toBe(false);

      // Y = CT: matches C and T
      expect(HaplogroupClassifier.isGenotypeMatching('Y', 'T')).toBe(true);
      expect(HaplogroupClassifier.isGenotypeMatching('Y', 'G')).toBe(false);

      // Verified edge cases:
      // userGenotype 'D', target 'G' -> no match (deletion stays a deletion)
      expect(HaplogroupClassifier.isGenotypeMatching('D', 'G')).toBe(false);
      // userGenotype 'N', target 'G' -> no match (no-call stays a no-call)
      expect(HaplogroupClassifier.isGenotypeMatching('N', 'G')).toBe(false);
      // userGenotype 'R', target 'G' -> match
      expect(HaplogroupClassifier.isGenotypeMatching('R', 'G')).toBe(true);
      // userGenotype 'Y' (CT), target 'G' -> no match
      expect(HaplogroupClassifier.isGenotypeMatching('Y', 'G')).toBe(false);
    });

    it('evaluates single-letter IUPAC at a derived position to POSITIVE_DERIVED with isHeteroplasmic: true', () => {
      // rs2853499 (2706G) is defining for H (ancestral A, derived G)
      const chip = createRealisticBackgroundChip({
        'rs2853499': 'R' // R expands to AG, containing derived G
      });

      const evaluated = HaplogroupClassifier.evaluateMarkersWithLD(chip);
      const hMarker = evaluated.find(m => m.snp.rsid.toLowerCase() === 'rs2853499');

      expect(hMarker).toBeDefined();
      expect(hMarker?.status).toBe('POSITIVE_DERIVED');
      expect(hMarker?.isHeteroplasmic).toBe(true);
    });

    it('evaluates two-letter mixture (AG) at a derived position to derived and flagged isHeteroplasmic', () => {
      const chip = createRealisticBackgroundChip({
        'rs2853499': 'AG' // Two-letter mixture carrying derived G
      });

      const evaluated = HaplogroupClassifier.evaluateMarkersWithLD(chip);
      const hMarker = evaluated.find(m => m.snp.rsid.toLowerCase() === 'rs2853499');

      expect(hMarker).toBeDefined();
      expect(hMarker?.status).toBe('POSITIVE_DERIVED');
      expect(hMarker?.isHeteroplasmic).toBe(true);
    });

    it('does not flag pure homozygous calls as heteroplasmic', () => {
      const chip = createRealisticBackgroundChip({
        'rs2853499': 'G' // Pure single derived base
      });

      const evaluated = HaplogroupClassifier.evaluateMarkersWithLD(chip);
      const hMarker = evaluated.find(m => m.snp.rsid.toLowerCase() === 'rs2853499');

      expect(hMarker).toBeDefined();
      expect(hMarker?.status).toBe('POSITIVE_DERIVED');
      expect(hMarker?.isHeteroplasmic).toBe(false);
    });

    it('treats N, NN, 00, ??, and -- as NO_CALL, never matching derived or flagging heteroplasmic', () => {
      const noCallInputs = ['N', 'NN', '00', '??', '--'];

      for (const call of noCallInputs) {
        const chip = createRealisticBackgroundChip({
          'rs2853499': call
        });

        const evaluated = HaplogroupClassifier.evaluateMarkersWithLD(chip);
        const marker = evaluated.find(m => m.snp.rsid.toLowerCase() === 'rs2853499');

        expect(marker?.status).toBe('NO_CALL');
        expect(marker?.isHeteroplasmic).toBe(false);
      }
    });
  });

  // =========================================================================
  // FIX 3 — Grade imputed evidence instead of counting it at face value
  // =========================================================================
  describe('Fix 3: Honest grading of imputed evidence', () => {
    it('imputed markers contribute half their mutationWeight to weightedScore', () => {
      // 3010A is defining for H1 (ancestral G, derived A). Mutation weight = 1.0.
      const directMarker: EvaluatedMarker = {
        snp: {
          name: '3010A',
          rsid: 'rs28358281',
          chromosome: 'MT',
          position: 3010,
          ancestralAllele: 'G',
          derivedAllele: 'A',
          haplogroup: 'H1',
          lineageType: 'MATERNAL_MTDNA',
          description: 'H1 primary marker'
        },
        userGenotype: 'A',
        status: 'POSITIVE_DERIVED',
        details: 'Direct call',
        isImputed: false,
        mutationWeight: 1.0
      };

      const imputedMarker: EvaluatedMarker = {
        ...directMarker,
        details: 'Imputed via proxy',
        isImputed: true,
        imputedFrom: 'rs2853515 (r²=0.95)'
      };

      // Rival H2 marker with custom weight 0.8
      // Direct H1 (1.0) beats rival H2 (0.8).
      // Imputed H1 (1.0 * 0.5 = 0.5) loses to rival H2 (0.8)!
      const rivalMarker: EvaluatedMarker = {
        snp: {
          name: '1438A',
          rsid: 'rs2853500',
          chromosome: 'MT',
          position: 1438,
          ancestralAllele: 'G',
          derivedAllele: 'A',
          haplogroup: 'H2',
          lineageType: 'MATERNAL_MTDNA',
          description: 'H2 marker'
        },
        userGenotype: 'A',
        status: 'POSITIVE_DERIVED',
        details: 'Direct rival call',
        isImputed: false,
        mutationWeight: 0.8
      };

      // Direct H1 (1.0) vs Rival H2 (0.8) -> H1 wins
      const resDirect = HaplogroupClassifier.classifyLineage('MATERNAL_MTDNA', [directMarker, rivalMarker]);
      expect(resDirect?.terminalHaplogroup.code).toBe('H1');

      // Imputed H1 (1.0 * 0.5 = 0.5) vs Rival H2 (0.8) -> Rival H2 wins!
      const resImputed = HaplogroupClassifier.classifyLineage('MATERNAL_MTDNA', [imputedMarker, rivalMarker]);
      expect(resImputed?.terminalHaplogroup.code).toBe('H2');
    });

    it('grades 2 imputed positives with 0 observed to 80% band and sets imputedPositiveCount === 2 (spec worked example)', () => {
      // Spec worked example: 2 imputed positives, 0 observed -> effective 1 -> 80% with imputation disclosed
      const marker1: EvaluatedMarker = {
        snp: {
          name: 'M343',
          rsid: 'rs2032624',
          chromosome: 'Y',
          position: 18500000,
          ancestralAllele: 'C',
          derivedAllele: 'A',
          haplogroup: 'R1b-M269',
          lineageType: 'PATERNAL_YDNA',
          description: 'R1b root'
        },
        userGenotype: 'A',
        status: 'POSITIVE_DERIVED',
        details: 'Imputed derived',
        isImputed: true,
        imputedFrom: 'rsProxy1 (r²=0.98)',
        mutationWeight: 4.5
      };

      const marker2: EvaluatedMarker = {
        snp: {
          name: 'M269',
          rsid: 'rs9786184',
          chromosome: 'Y',
          position: 18512340,
          ancestralAllele: 'T',
          derivedAllele: 'C',
          haplogroup: 'R1b-M269',
          lineageType: 'PATERNAL_YDNA',
          description: 'M269 marker'
        },
        userGenotype: 'C',
        status: 'POSITIVE_DERIVED',
        details: 'Imputed derived',
        isImputed: true,
        imputedFrom: 'rsProxy2 (r²=0.99)',
        mutationWeight: 1.0
      };

      const lineage = HaplogroupClassifier.classifyLineage('PATERNAL_YDNA', [marker1, marker2]);

      expect(lineage).not.toBeNull();
      expect(lineage?.terminalHaplogroup.code).toBe('R1b-M269');
      expect(lineage?.imputedPositiveCount).toBe(2);
      // Effective positives = 0 + 0.5 * 2 = 1.0 -> 80% band (down from previous 96%)
      expect(lineage?.confidenceScore).toBe(80);
    });

    it('computes confidence ladder thresholds accurately based on effective positives', () => {
      // Helper to generate markers and get confidence
      const testConfidence = (observedCount: number, imputedCount: number, negativeCount: number = 0) => {
        const markers: EvaluatedMarker[] = [];

        for (let i = 0; i < observedCount; i++) {
          markers.push({
            snp: {
              name: `ObsSNP_${i}`,
              rsid: `rsObs_${i}`,
              chromosome: 'Y',
              position: 1000 + i,
              ancestralAllele: 'C',
              derivedAllele: 'T',
              haplogroup: 'R1b-M269',
              lineageType: 'PATERNAL_YDNA',
              description: 'Observed marker'
            },
            userGenotype: 'T',
            status: 'POSITIVE_DERIVED',
            details: 'Observed',
            isImputed: false,
            mutationWeight: 1.0
          });
        }

        for (let i = 0; i < imputedCount; i++) {
          markers.push({
            snp: {
              name: `ImpSNP_${i}`,
              rsid: `rsImp_${i}`,
              chromosome: 'Y',
              position: 2000 + i,
              ancestralAllele: 'C',
              derivedAllele: 'T',
              haplogroup: 'R1b-M269',
              lineageType: 'PATERNAL_YDNA',
              description: 'Imputed marker'
            },
            userGenotype: 'T',
            status: 'POSITIVE_DERIVED',
            details: 'Imputed',
            isImputed: true,
            imputedFrom: 'rsProxy (r²=0.98)',
            mutationWeight: 1.0
          });
        }

        for (let i = 0; i < negativeCount; i++) {
          markers.push({
            snp: {
              name: `NegSNP_${i}`,
              rsid: `rsNeg_${i}`,
              chromosome: 'Y',
              position: 3000 + i,
              ancestralAllele: 'C',
              derivedAllele: 'T',
              haplogroup: 'R1b-M269',
              lineageType: 'PATERNAL_YDNA',
              description: 'Negative marker'
            },
            userGenotype: 'C',
            status: 'NEGATIVE_ANCESTRAL',
            details: 'Negative',
            isImputed: false,
            mutationWeight: 1.0
          });
        }

        return HaplogroupClassifier.classifyLineage('PATERNAL_YDNA', markers);
      };

      // 3 observed -> effective 3 -> 99%
      expect(testConfidence(3, 0)?.confidenceScore).toBe(99);
      // 2 observed + 2 imputed -> effective 2 + 1 = 3 -> 99%
      expect(testConfidence(2, 2)?.confidenceScore).toBe(99);
      // 2 observed -> effective 2 -> 96%
      expect(testConfidence(2, 0)?.confidenceScore).toBe(96);
      // 1 observed + 2 imputed -> effective 1 + 1 = 2 -> 96%
      expect(testConfidence(1, 2)?.confidenceScore).toBe(96);
      // 1 observed -> effective 1 -> 80% (down from 90%)
      expect(testConfidence(1, 0)?.confidenceScore).toBe(80);
      // 0 observed + 2 imputed -> effective 1 -> 80%
      expect(testConfidence(0, 2)?.confidenceScore).toBe(80);
      // 1 imputed only -> effective 0.5 -> 65%
      expect(testConfidence(0, 1)?.confidenceScore).toBe(65);
      // Negative penalty: 3 observed, 1 negative -> 99 - 8 = 91%
      expect(testConfidence(3, 0, 1)?.confidenceScore).toBe(91);
      // Negative penalty floor 50: 1 observed, 5 negatives -> 80 - 40 = 50 (floor 50)
      expect(testConfidence(1, 0, 5)?.confidenceScore).toBe(50);
    });
  });

  // =========================================================================
  // FIX 1 & ANCESTRAL GUARD — Ancestral Conflict Regression
  // =========================================================================
  describe('Ancestral Guard & Conflict Behavior', () => {
    it('disqualifies a candidate when an upstream root ancestor was explicitly negative', () => {
      // In realistic chip:
      // Mark CT root marker (rs9306841, ancestral C, derived T) as NEGATIVE_ANCESTRAL ('C')
      // Mark R1b-U152 downstream marker (rs12338, ancestral C, derived T) as POSITIVE_DERIVED ('T')
      const chip = createRealisticBackgroundChip({
        'rs9306841': 'C', // CT root is negative ancestral!
        'rs12338': 'T'    // Downstream U152 claims derived!
      });

      const result = HaplogroupClassifier.analyze('Ancestral Conflict Kit', chip);

      // R1b-U152 has ancestral conflict because its upstream ancestor CT is negative ancestral.
      // Therefore R1b-U152 must NOT be crowned as the terminal haplogroup!
      if (result.paternalLineage) {
        expect(result.paternalLineage.terminalHaplogroup.code).not.toBe('R1b-U152');
      } else {
        expect(result.paternalLineage).toBeNull();
      }
    });

    it('returns null lineage when the only positive candidates violate the ancestral conflict guard', () => {
      // Create a chip where ONLY R1b-U152 is positive, but its root ancestor CT is negative ancestral
      // and no other clades have positives.
      const chip = createRealisticBackgroundChip({
        'rs9306841': 'C', // CT root is ancestral -> blocks all CT descendants including R1b
        'rs12338': 'T'    // Only positive marker in entire paternal chromosome
      });

      const result = HaplogroupClassifier.analyze('Strict Conflict Kit', chip);

      // The only candidate with positive support fails the ancestral-conflict guard.
      // Under the old bug, the middle fallback (scoredHaplos.filter(h => h.positives > 0)[0])
      // would crown the conflicted branch anyway.
      // Under Fix 1, this must return null!
      expect(result.paternalLineage).toBeNull();
    });
  });

  // =========================================================================
  // REGRESSION ANCHORS — Normal multi-marker files yield identical results
  // =========================================================================
  describe('Regression Anchors with Standard Multi-Marker Kits', () => {
    it('correctly classifies Celtic sample (R1b-M269 core paternal, U5b maternal)', () => {
      const celticKit = SAMPLE_DNA_KITS.find(k => k.id === 'celtic_sample')!;
      const parsed = parseRawDnaText(celticKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(celticKit.title, parsed);

      expect(result.paternalLineage).not.toBeNull();
      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('R1b-M269');

      expect(result.maternalLineage).not.toBeNull();
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('U5b');
    });

    it('correctly classifies Alpine sample (R1b-M269 core paternal, H1 maternal)', () => {
      const alpineKit = SAMPLE_DNA_KITS.find(k => k.id === 'alpine_sample')!;
      const parsed = parseRawDnaText(alpineKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(alpineKit.title, parsed);

      expect(result.paternalLineage).not.toBeNull();
      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('R1b-M269');

      expect(result.maternalLineage).not.toBeNull();
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('H1');
    });

    it('correctly classifies Nordic sample (I core paternal, J1c maternal)', () => {
      const nordicKit = SAMPLE_DNA_KITS.find(k => k.id === 'nordic_sample')!;
      const parsed = parseRawDnaText(nordicKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(nordicKit.title, parsed);

      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('I');
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('J1c');
    });

    it('correctly classifies Slavic sample (R1a-M417 paternal, T2 maternal)', () => {
      const slavicKit = SAMPLE_DNA_KITS.find(k => k.id === 'slavic_sample')!;
      const parsed = parseRawDnaText(slavicKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(slavicKit.title, parsed);

      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('R1a-M417');
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('T2');
    });

    it('correctly classifies Mediterranean sample (E1b1b parent paternal, K1a maternal)', () => {
      const medKit = SAMPLE_DNA_KITS.find(k => k.id === 'mediterranean_sample')!;
      const parsed = parseRawDnaText(medKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(medKit.title, parsed);

      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('E1b1b');
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('K1a');
    });

    it('correctly classifies African sample (E parent paternal, L2 maternal)', () => {
      const africanKit = SAMPLE_DNA_KITS.find(k => k.id === 'african_sample')!;
      const parsed = parseRawDnaText(africanKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(africanKit.title, parsed);

      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('E');
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('L2');
    });

    it('correctly classifies Indigenous American sample (Q-M242 paternal, A2 maternal)', () => {
      const amerKit = SAMPLE_DNA_KITS.find(k => k.id === 'indigenous_american_sample')!;
      const parsed = parseRawDnaText(amerKit.rawSnippetContent);
      const result = HaplogroupClassifier.analyze(amerKit.title, parsed);

      expect(result.paternalLineage?.terminalHaplogroup.code).toBe('Q-M242');
      expect(result.maternalLineage?.terminalHaplogroup.code).toBe('A2');
    });
  });

  // =========================================================================
  // INVESTIGATION ITEM — Can a recurrent marker crown a lateral branch?
  // =========================================================================
  describe('Investigation Item: Recurrent Marker Lateral Branch Vulnerability', () => {
    it('demonstrates that a single recurrent marker can crown a lateral branch if upstream root markers are untested/no-call', () => {
      /**
       * Scenario:
       * User is truly Haplogroup H (has direct derived marker 2706G, weight 1.0 transition).
       * However, user also carries a private or recurrent transversion mutation (weight 4.5)
       * that happens to match a defining transversion marker of a completely distant lateral clade
       * (e.g., L1b marker or similar), but the intermediate/root markers of that lateral clade
       * were NOT tested in the file (NO_CALL, so no negative ancestral call to trigger the ancestral conflict guard).
       * 
       * Scoring:
       * True clade (H): 1 transition -> weightedScore = 1.0
       * Lateral clade: 1 transversion -> weightedScore = 4.5
       * 
       * Sorting: b.weightedScore - a.weightedScore -> 4.5 > 1.0!
       * Result: The lateral branch wins because max(weightedScore) picks it without a lineage-consistency check!
       */
      const mockTrueClade: HaplogroupDefinition = {
        code: 'H-True',
        shortName: 'H True',
        cladeName: 'H-True',
        lineageType: 'MATERNAL_MTDNA',
        parentClade: null,
        definingSnps: ['SNP_TRUE'],
        ageYearsBp: '~20,000 BP',
        originRegion: 'Europe',
        historicalDescription: 'True maternal branch',
        ancientCultures: [],
        highFrequencyModern: [],
        migrationPath: []
      };

      const mockLateralClade: HaplogroupDefinition = {
        code: 'L-Lateral',
        shortName: 'L Lateral',
        cladeName: 'L-Lateral',
        lineageType: 'MATERNAL_MTDNA',
        parentClade: null,
        definingSnps: ['SNP_RECURRENT'],
        ageYearsBp: '~100,000 BP',
        originRegion: 'Africa',
        historicalDescription: 'Distant lateral branch',
        ancientCultures: [],
        highFrequencyModern: [],
        migrationPath: []
      };

      const trueMarker: EvaluatedMarker = {
        snp: {
          name: 'SNP_TRUE',
          rsid: 'rsTrue',
          chromosome: 'MT',
          position: 100,
          ancestralAllele: 'A',
          derivedAllele: 'G', // transition: weight 1.0
          haplogroup: 'H',
          lineageType: 'MATERNAL_MTDNA',
          description: 'True branch transition'
        },
        userGenotype: 'G',
        status: 'POSITIVE_DERIVED',
        details: 'Observed true base',
        mutationWeight: 1.0
      };

      const recurrentLateralMarker: EvaluatedMarker = {
        snp: {
          name: 'SNP_RECURRENT',
          rsid: 'rsRecurrent',
          chromosome: 'MT',
          position: 200,
          ancestralAllele: 'A',
          derivedAllele: 'C', // transversion: weight 4.5
          haplogroup: 'L1b',
          lineageType: 'MATERNAL_MTDNA',
          description: 'Recurrent transversion'
        },
        userGenotype: 'C',
        status: 'POSITIVE_DERIVED',
        details: 'Observed recurrent mutation',
        mutationWeight: 4.5
      };

      // When classified with all markers
      const result = HaplogroupClassifier.classifyLineage('MATERNAL_MTDNA', [trueMarker, recurrentLateralMarker]);

      // Findings:
      // The lateral branch (L1b) scores 4.5 vs H which scores 1.0.
      // Because L1b's root was not explicitly negative (it was untested),
      // the lateral branch wins over the true branch solely due to the higher transversion weight!
      expect(result).not.toBeNull();
      expect(result?.terminalHaplogroup.code).toBe('L1b');
    });
  });

});
