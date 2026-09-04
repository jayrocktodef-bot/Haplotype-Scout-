import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  isPalindromicMutation,
  matchGenotypeAllele,
  isYAmpliconicRegion,
  isPotentialNumtLocus
} from '../src/utils/genomicMasks.js';
import { YDnaPredictorV2 } from '../src/services/yDnaPredictorV2.js';
import { matchPhyloTreeBuild17, parseMtMutation } from '../src/services/phylotreeMtdnaEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- RUNNING ADVANCED ACCURACY & SIGNAL INTEGRITY TEST SUITE ---');

let passed = 0;
let total = 0;

function assert(condition: boolean, testName: string) {
  total++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    process.exitCode = 1;
  }
}

// 1. Palindromic Mutation Guard Tests
assert(isPalindromicMutation('A', 'T') === true, 'Palindromic A -> T identified');
assert(isPalindromicMutation('T', 'A') === true, 'Palindromic T -> A identified');
assert(isPalindromicMutation('C', 'G') === true, 'Palindromic C -> G identified');
assert(isPalindromicMutation('G', 'C') === true, 'Palindromic G -> C identified');
assert(isPalindromicMutation('A', 'G') === false, 'Transition A -> G is not palindromic');
assert(isPalindromicMutation('C', 'T') === false, 'Transition C -> T is not palindromic');
assert(isPalindromicMutation('A', 'C') === false, 'Transversion A -> C is not palindromic');

// 2. Indel & Multi-Allelic Normalization Tests
assert(matchGenotypeAllele('D', 'del') === true, 'Genotype D matches del');
assert(matchGenotypeAllele('DD', 'del') === true, 'Genotype DD matches del');
assert(matchGenotypeAllele('-', 'del') === true, 'Genotype - matches del');
assert(matchGenotypeAllele('<DEL>', 'del') === true, 'Genotype <DEL> matches del');
assert(matchGenotypeAllele('*', 'del') === true, 'Genotype * matches del');
assert(matchGenotypeAllele('I', 'ins') === true, 'Genotype I matches ins');
assert(matchGenotypeAllele('+', 'ins') === true, 'Genotype + matches ins');
assert(matchGenotypeAllele('<INS>', 'ins') === true, 'Genotype <INS> matches ins');
assert(matchGenotypeAllele('A', 'A') === true, 'Standard nucleotide A matches A');
assert(matchGenotypeAllele('AA', 'A') === true, 'Haploid AA matches A');
assert(matchGenotypeAllele('C', 'T') === false, 'Genotype C does not match T');

// 3. Y Ampliconic / AZF Microdeletion Region Masking Tests
assert(isYAmpliconicRegion(14500000) === true, 'ChrY:14,500,000 (AZFa) is ampliconic');
assert(isYAmpliconicRegion(21000000) === true, 'ChrY:21,000,000 (AZFb) is ampliconic');
assert(isYAmpliconicRegion(26000000) === true, 'ChrY:26,000,000 (AZFc) is ampliconic');
assert(isYAmpliconicRegion(5000000) === false, 'ChrY:5,000,000 is not in ampliconic mask');

// 4. NUMT Hotspot Loci Tests
assert(isPotentialNumtLocus(8285) === true, 'mtDNA 8285 is in 9-bp NUMT hotspot');
assert(isPotentialNumtLocus(5000) === true, 'mtDNA 5000 is in Chr1 NUMT hotspot');
assert(isPotentialNumtLocus(16200) === true, 'mtDNA 16200 is in Chr17 D-loop NUMT hotspot');
assert(isPotentialNumtLocus(263) === false, 'mtDNA 263 is not in NUMT hotspot');

// 5. Test mtDNA Engine with NUMT filtering
const branches = [
  {
    branchName: 'H2a2a1',
    mutations: ['G263A', 'A8285T'] // 263 is genuine, 8285 is NUMT prone
  },
  {
    branchName: 'FalseNumtClade',
    mutations: ['A8285T'] // Only NUMT prone
  }
];

const mockMtMap: Record<number, string> = {
  263: 'A',
  8285: 'T'
};

const mtScores = matchPhyloTreeBuild17(mockMtMap, branches);
const h2a = mtScores.find(s => s.branchName === 'H2a2a1');
const falseClade = mtScores.find(s => s.branchName === 'FalseNumtClade');
assert(h2a !== undefined && h2a.nonNumtMatchedCount === 1, 'H2a2a1 has 1 non-NUMT matched mutation');
assert(falseClade !== undefined && falseClade.nonNumtMatchedCount === 0, 'FalseNumtClade has 0 non-NUMT matched mutations');

// 6. Real ISOGG Y-DNA Tree Traversal with Palindromic & Ampliconic Guards
const treePath = path.resolve(__dirname, '../public/data/y_phylotree.json');
if (fs.existsSync(treePath)) {
  const treeData = JSON.parse(fs.readFileSync(treePath, 'utf8'));
  const predictor = new YDnaPredictorV2(treeData);

  // Simulate R1b-M269 profile with true derived alleles:
  // M207 (R) -> G, M173 (R1) -> C, M343 (R1b) -> A, M269 (R1b1a1b) -> C
  const result = predictor.predict({
    snpByRsid: {
      'm207': 'G',
      'm173': 'C',
      'm343': 'A',
      'm269': 'C'
    },
    snpByPosition: {}
  });

  assert(result.terminalHaplogroup.startsWith('R1b'), 'R1b profile resolves correctly: ' + result.terminalHaplogroup);
  assert(result.derivedSnpCount >= 3, 'R1b derived SNP count >= 3');
  assert(result.nonPalindromicDerivedCount > 0, 'R1b has non-palindromic derived confirmations');
  assert(result.isPalindromicAmbiguous === false, 'R1b is not palindromic ambiguous');
  console.log(`[INFO] Terminal: ${result.terminalHaplogroup}, Derived SNPs: ${result.derivedSnpCount}, Non-palindromic: ${result.nonPalindromicDerivedCount}, Palindromic: ${result.palindromicDerivedCount}`);
} else {
  console.warn('[WARN] y_phylotree.json not found in public/data');
}

console.log(`\nResults: ${passed} / ${total} tests passed.`);
if (passed === total) {
  console.log('ALL ACCURACY & SIGNAL INTEGRITY TESTS PASSED!');
} else {
  console.error('SOME TESTS FAILED.');
  process.exit(1);
}
