import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isRecurrentSnp, getRecurrentSnpInfo } from '../src/utils/homoplasyDatabase.js';
import { parseRawDnaText } from '../src/services/dnaParser.js';
import { YDnaPredictorV2 } from '../src/services/yDnaPredictorV2.js';
import { deconvolveMicrohaplotypes } from '../src/services/microhapEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- RUNNING PHASE 2 ACCURACY & HOMOPLASY TEST SUITE ---');

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

// 1. Homoplasy Database Verification
assert(isRecurrentSnp('p25') === true, 'P25 identified as recurrent homoplasy');
assert(isRecurrentSnp('M130') === true, 'M130 identified as recurrent homoplasy');
assert(isRecurrentSnp('cts10834') === true, 'CTS10834 identified as recurrent homoplasy');
assert(isRecurrentSnp('m269') === false, 'M269 is a private/unique lineage marker');
assert(isRecurrentSnp('unknown_snp') === false, 'Unknown SNP is not marked as recurrent');

const p25Info = getRecurrentSnpInfo('P25');
assert(p25Info !== null && p25Info.clades.includes('R1b1'), 'P25 clades metadata includes R1b1');

// 2. Gene Dosage & Biological Sex Inferences
const makeSnippet = (yLociCount: number, yCallCount: number): string => {
  let lines = ['rsid\tchromosome\tposition\tgenotype'];
  // Add 30,001 autosomal rows
  for (let i = 1; i <= 30005; i++) {
    lines.push(`rs${i}\t1\t${i * 100}\tAA`);
  }
  // Add Y rows
  for (let y = 1; y <= yLociCount; y++) {
    const call = y <= yCallCount ? 'G' : '--';
    lines.push(`rsY${y}\tY\t${y * 1000}\t${call}`);
  }
  return lines.join('\n');
};

const femaleSnippet = makeSnippet(200, 5); // 5 calls out of 200 Y loci
const parsedFemale = parseRawDnaText(femaleSnippet);
assert(parsedFemale.inferredBiologicalSex === 'FEMALE', 'Female genomic profile detected (<30 Y calls)');
assert(parsedFemale.yDnaCalledSnps === 5, 'yDnaCalledSnps correctly tallied as 5');

const maleSnippet = makeSnippet(200, 180); // 180 calls out of 200 Y loci
const parsedMale = parseRawDnaText(maleSnippet);
assert(parsedMale.inferredBiologicalSex === 'MALE', 'Male genomic profile detected (>=50 Y calls)');
assert(parsedMale.yDnaCalledSnps === 180, 'yDnaCalledSnps correctly tallied as 180');

// 3. ISOGG Tree Phase 2 Engine with Homoplasy Guard & Recurrent Marker Tracking
const treePath = path.resolve(__dirname, '../public/data/y_phylotree.json');
if (fs.existsSync(treePath)) {
  const treeData = JSON.parse(fs.readFileSync(treePath, 'utf8'));
  const predictor = new YDnaPredictorV2(treeData);

  // Profile with derived markers: M207 (R) -> G, M173 (R1) -> C, M343 (R1b) -> A, M269 (R1b1a1b) -> C
  const result = predictor.predict({
    snpByRsid: {
      'm207': 'G',
      'm173': 'C',
      'm343': 'A',
      'm269': 'C'
    },
    snpByPosition: {}
  });

  assert(result.terminalHaplogroup.startsWith('R1b'), 'Terminal resolved to R1b: ' + result.terminalHaplogroup);
  assert(result.derivedSnpCount >= 3, 'Derived count >= 3');
  assert(typeof result.recurrentDerivedCount === 'number', 'recurrentDerivedCount is numeric');
  assert(typeof result.nonPalindromicDerivedCount === 'number', 'nonPalindromicDerivedCount is numeric');
  console.log(`[INFO] Derived SNPs: ${result.derivedSnpCount}, Non-palindromic: ${result.nonPalindromicDerivedCount}, Recurrent: ${result.recurrentDerivedCount}`);
} else {
  console.warn('[WARN] y_phylotree.json not found');
}

// 4. Expanded Microhaplotype Deconvolution Test
const kernelPath = path.resolve(__dirname, '../public/data/microhap_kernel.json');
if (fs.existsSync(kernelPath)) {
  const kernel = JSON.parse(fs.readFileSync(kernelPath, 'utf8'));
  assert(kernel.length >= 10, 'Microhaplotype kernel expanded to at least 10 loci (actual: ' + kernel.length + ')');

  // Test deconvolution with African-indicative alleles: mh01CP-007 (AGG), mh02PK-001 (TTA), mh06KK-002 (AAA)
  const userSnps = {
    // mh01CP-007
    'rs11542042': 'A',
    'rs11542041': 'G',
    'rs11542043': 'G',
    // mh02PK-001
    'rs10186105': 'T',
    'rs10166244': 'T',
    'rs10188941': 'A',
    // mh06KK-002
    'rs9272376': 'A',
    'rs9272377': 'A',
    'rs9272378': 'A'
  };

  const microhapResults = deconvolveMicrohaplotypes(userSnps, kernel);
  assert(microhapResults.length > 0, 'Microhaplotype deconvolution returned populations');
  const topPop = microhapResults[0];
  console.log(`[INFO] Top Microhaplotype Population: ${topPop.name} (${topPop.percentage}%)`);
  assert(topPop.popCode === 'AFR', 'Top inferred microhaplotype is African reference');
} else {
  console.warn('[WARN] microhap_kernel.json not found');
}

console.log(`\nResults: ${passed} / ${total} Phase 2 tests passed.`);
if (passed === total) {
  console.log('ALL PHASE 2 ACCURACY & HOMOPLASY TESTS PASSED!');
} else {
  console.error('SOME PHASE 2 TESTS FAILED.');
  process.exit(1);
}
