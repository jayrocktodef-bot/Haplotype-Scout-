import { MicroHapResult } from '../types/haplogroup';

export interface MicroHapLocus {
  id: string;
  chrom: string;
  pos: number;
  snps: string[];
  global_ae: number;
  weights: Record<string, Record<string, number>>;
}

const POP_LABEL_MAP: Record<string, string> = {
  'EUR': 'European Reference (EUR)',
  'AFR': 'African Reference (AFR)',
  'EAS': 'East Asian Reference (EAS)',
  'SAS': 'South Asian Reference (SAS)',
  'AMR': 'Indigenous American (AMR)',
  'MENA': 'Middle East & North Africa (MENA)'
};

/**
 * MicroPhaser & Haplotype Deconvolution:
 * Reconstructs short-range haplotype blocks across high-diversity microhap loci.
 */
export function deconvolveMicrohaplotypes(
  userSnps: Record<string, string>,
  microHapDb: MicroHapLocus[]
): MicroHapResult[] {
  const normalizedSnps = Object.fromEntries(
    Object.entries(userSnps).map(([k, v]) => [k.toLowerCase(), v])
  );

  const matchedHaps: Array<{
    id: string;
    observedAllele: string;
    freqs: Record<string, number>;
  }> = [];

  for (const hap of microHapDb) {
    let haplotypeString = '';
    let hasAll = true;

    for (const rsid of hap.snps) {
      const g = normalizedSnps[rsid.toLowerCase()];
      if (!g || g === '--' || g === '00' || g === '??') {
        hasAll = false;
        break;
      }
      const cleanG = g.toUpperCase().replace(/[\s\/_]/g, '');
      haplotypeString += cleanG[0] || '';
    }

    if (!hasAll || !haplotypeString) continue;

    // Collect population frequency distributions for this haplotype configuration
    const freqs: Record<string, number> = {};
    for (const [pop, alleleMap] of Object.entries(hap.weights)) {
      freqs[pop] = alleleMap[haplotypeString] || 0.001; // Epsilon smoothing
    }

    matchedHaps.push({
      id: hap.id,
      observedAllele: haplotypeString,
      freqs
    });
  }

  if (matchedHaps.length === 0) return [];

  // Compute log-likelihood proportions
  const popScores: Record<string, number> = {};
  const populations = Object.keys(POP_LABEL_MAP);

  for (const pop of populations) {
    let logLikelihood = 0;
    for (const m of matchedHaps) {
      const p = m.freqs[pop] || 0.001;
      logLikelihood += Math.log(p);
    }
    popScores[pop] = Math.exp(logLikelihood / Math.max(1, matchedHaps.length));
  }

  const sumScore = Object.values(popScores).reduce((a, b) => a + b, 0) || 1;

  const results: MicroHapResult[] = populations.map(pop => ({
    popCode: pop,
    name: POP_LABEL_MAP[pop] || pop,
    percentage: Math.round(((popScores[pop] || 0) / sumScore) * 1000) / 10
  }));

  return results.filter(r => r.percentage > 0).sort((a, b) => b.percentage - a.percentage);
}
