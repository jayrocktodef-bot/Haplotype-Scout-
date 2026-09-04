import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isPlatformNoisyLocus, getPlatformNoiseRecord } from '../src/utils/chipNoiseDatabase.js';
import { matchPhyloTreeBuild17 } from '../src/services/phylotreeMtdnaEngine.js';
import { YDnaPredictorV2 } from '../src/services/yDnaPredictorV2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- RUNNING PHASE 3 ACCURACY & CALIBRATION TEST SUITE ---');

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

// 1. Chip Noise Database Tests
assert(isPlatformNoisyLocus('M130', 'rs9786184', 'GSA') === true, 'M130 identified as GSA noisy locus');
assert(isPlatformNoisyLocus('P25', 'rs2032666', 'Affymetrix') === true, 'P25 identified as Affymetrix noisy locus');
assert(isPlatformNoisyLocus('CTS10834', 'rs17250787', 'GSA') === true, 'CTS10834 identified as GSA noisy locus');
assert(isPlatformNoisyLocus('M269') === false, 'M269 is not a noisy chip locus');
assert(isPlatformNoisyLocus('L21') === false, 'L21 is not a noisy chip locus');

const p25Noise = getPlatformNoiseRecord('P25');
assert(p25Noise !== null && p25Noise.platforms.includes('GSA'), 'P25 noise record contains GSA platform');

// 2. HaploGrep 3 Path Consistency & Back-Mutation Scoring Tests
const consistentBranch = [
  {
    branchName: 'H1',
    mutations: ['G263A', 'A7028G', 'C16519T']
  }
];

// Mock 1: 100% consistent (all derived)
const userAllDerived = {
  263: 'A',
  7028: 'G',
  16519: 'T'
};
const score1 = matchPhyloTreeBuild17(userAllDerived, consistentBranch);
assert(score1.length > 0 && score1[0].pathConsistencyPct === 100, 'Pure derived profile achieves 100% path consistency');

// Mock 2: 1 derived, 2 ancestral clashes
const userWithClashes = {
  263: 'A',
  7028: 'A', // ancestral clash
  16519: 'C' // ancestral clash
};
const score2 = matchPhyloTreeBuild17(userWithClashes, consistentBranch);
assert(score2.length > 0 && score2[0].pathConsistencyPct < 40, 'Contradictory ancestral clashes reduce path consistency (<40%, actual: ' + score2[0]?.pathConsistencyPct + '%)');

// 3. Full ISOGG Y-DNA Tree Traversal with Chip Noise Filtering
const treePath = path.resolve(__dirname, '../public/data/y_phylotree.json');
if (fs.existsSync(treePath)) {
  const treeData = JSON.parse(fs.readFileSync(treePath, 'utf8'));
  const predictor = new YDnaPredictorV2(treeData);

  const result = predictor.predict({
    snpByRsid: {
      'm207': 'G',
      'm173': 'C',
      'm343': 'A',
      'm269': 'C'
    },
    snpByPosition: {},
    platform: 'Illumina GSA'
  });

  assert(result.terminalHaplogroup.startsWith('R1b'), 'R1b resolved under GSA platform mode: ' + result.terminalHaplogroup);
  assert(result.derivedSnpCount >= 3, 'Derived count >= 3');
  assert(result.derivedMarkers.some(m => typeof m.isChipNoiseProne === 'boolean'), 'derivedMarkers include isChipNoiseProne flag');
  console.log(`[INFO] Terminal: ${result.terminalHaplogroup}, Derived Markers: ${result.derivedMarkers.length}`);
} else {
  console.warn('[WARN] y_phylotree.json not found');
}

console.log(`\nResults: ${passed} / ${total} Phase 3 tests passed.`);
if (passed === total) {
  console.log('ALL PHASE 3 ACCURACY & CALIBRATION TESTS PASSED!');
} else {
  console.error('SOME PHASE 3 TESTS FAILED.');
  process.exit(1);
}
