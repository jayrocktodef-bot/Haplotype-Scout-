import { parseRawDnaText, ParsedDnaData, decompressGenomicBuffer } from '../services/dnaParser';
import { HaplogroupClassifier } from '../services/haplogroupClassifier';

export interface WorkerMessageRequest {
  type: 'PARSE_FILE' | 'PARSE_TEXT';
  file?: File | Blob;
  fileName?: string;
  text?: string;
}

export interface WorkerMessageResponse {
  type: 'PROGRESS' | 'SUCCESS' | 'ERROR';
  progress?: number;
  message?: string;
  result?: any;
  error?: string;
}

self.onmessage = async (e: MessageEvent<WorkerMessageRequest>) => {
  const { type, file, fileName, text } = e.data;

  try {
    let rawText = '';
    const kitName = (fileName || 'Uploaded DNA Kit').replace(/\.[^/.]+$/, '');

    if (type === 'PARSE_TEXT' && text) {
      rawText = text;
    } else if (file) {
      self.postMessage({ type: 'PROGRESS', progress: 10, message: 'Decompressing & inspecting raw genomic buffer...' });
      const arrayBuffer = await file.arrayBuffer();
      const rawBytes = new Uint8Array(arrayBuffer);
      const decompressedBytes = decompressGenomicBuffer(rawBytes);
      const decoder = new TextDecoder('utf-8');
      rawText = decoder.decode(decompressedBytes);

      if (!rawText || rawText.trim().length === 0) {
        throw new Error('Decompressed genetic file is empty or unsupported.');
      }
    }

    self.postMessage({ type: 'PROGRESS', progress: 35, message: 'Parsing genomic loci & chromosomes...' });

    const parsedData: ParsedDnaData = parseRawDnaText(rawText, (linesProcessed) => {
      const progress = Math.min(75, Math.round(35 + (linesProcessed / 700000) * 40));
      self.postMessage({
        type: 'PROGRESS',
        progress,
        message: `Processed ${linesProcessed.toLocaleString()} lines...`
      });
    });

    self.postMessage({ type: 'PROGRESS', progress: 80, message: 'Evaluating Y-DNA & mtDNA phylogenies...' });

    const result = HaplogroupClassifier.analyze(kitName, parsedData);
    result.detectedBuild = parsedData.build;

    // 1. Phase 2 Deep Y-DNA ISOGG Tree Resolution
    if (result.paternalLineage && result.isMaleSample) {
      try {
        self.postMessage({ type: 'PROGRESS', progress: 85, message: 'Resolving deep ISOGG Y-DNA subclades (Phase 2)...' });
        const yResponse = await fetch('/data/y_phylotree.json');
        if (yResponse.ok) {
          const yPhyloDataset = await yResponse.json();
          const { YDnaPredictorV2 } = await import('../services/yDnaPredictorV2');
          const predictor = new YDnaPredictorV2(yPhyloDataset);
          const phase2 = predictor.predict({
            snpByRsid: parsedData.snpByRsid,
            snpByPosition: parsedData.snpByPosition
          });

          if (phase2.terminalHaplogroup && phase2.terminalHaplogroup !== 'N/A' && phase2.terminalHaplogroup !== 'A') {
            phase2.inferredBiologicalSex = parsedData.inferredBiologicalSex;
            result.paternalLineage.phase2Details = phase2;
            result.paternalLineage.confidenceScore = Math.max(result.paternalLineage.confidenceScore, Math.round(phase2.confidence));
            result.paternalLineage.coverage = phase2.coverage;
            result.paternalLineage.rejectedBranches = phase2.rejectedBranches;

            const currentCode = result.paternalLineage.terminalHaplogroup.code;
            const isSubclade = phase2.terminalHaplogroup.startsWith(currentCode) ||
                               phase2.terminalHaplogroup.length > currentCode.length ||
                               currentCode === 'A' || currentCode === 'CT';

            if (isSubclade && phase2.derivedSnpCount > 0) {
              const palindromicNote = phase2.isPalindromicAmbiguous
                ? ` [Flagged: Terminal branch supported solely by palindromic A/T or C/G probes]`
                : '';
              const apexNote = phase2.isProvisionalTerminal && phase2.apexAnchorClade
                ? ` [Sparse Array Density: Provisional sub-clade; verified anchor: ${phase2.apexAnchorClade}]`
                : '';
              const sexNote = parsedData.inferredBiologicalSex === 'FEMALE'
                ? ` [Genomic Sex Notice: Sample exhibits female profile with <30 Y-chromosome calls; trace Y markers may represent cross-hybridization]`
                : '';

              result.paternalLineage.terminalHaplogroup = {
                ...result.paternalLineage.terminalHaplogroup,
                code: phase2.terminalHaplogroup,
                shortName: `Y-${phase2.terminalHaplogroup}`,
                cladeName: `ISOGG-${phase2.terminalHaplogroup}`,
                historicalDescription: `Deep terminal subclade confirmed via ${phase2.derivedSnpCount} derived ISOGG defining markers (${phase2.confidence}% confidence, ${phase2.coverage}% coverage).${palindromicNote}${apexNote}${sexNote}`
              };
            }
          }
        }
      } catch (e) {
        console.warn('Deep Y-DNA Phase 2 resolution skipped:', e);
      }
    }

    // 2. Deep mtDNA Evaluation via Van Oven PhyloTree Build 17
    try {
      self.postMessage({ type: 'PROGRESS', progress: 90, message: 'Auditing maternal PhyloTree Build 17 spine...' });
      const mtResponse = await fetch('/data/master_mtdna.json');
      if (mtResponse.ok) {
        const mtData = await mtResponse.json();
        const { matchPhyloTreeBuild17, refineMtdnaWithBuild17 } = await import('../services/phylotreeMtdnaEngine');
        
        // Extract numeric mtDNA positions from parsedData
        const mtPosMap: Record<number, string> = {};
        for (const [key, val] of Object.entries(parsedData.snpByPosition)) {
          if (key.startsWith('mt:')) {
            const pos = parseInt(key.replace('mt:', ''), 10);
            if (!isNaN(pos)) mtPosMap[pos] = val;
          }
        }

        const deepMtMatches = matchPhyloTreeBuild17(mtPosMap, mtData.haplogroups);
        if (deepMtMatches.length > 0 && result.maternalLineage) {
          result.maternalLineage = refineMtdnaWithBuild17(result.maternalLineage, deepMtMatches);
        }

        // Run EMPOP Forensic QC & Indel Standardization
        const { runEmpopForensicQc } = await import('../services/empopForensicEngine');
        result.empopQcReport = runEmpopForensicQc(mtPosMap);
      }
    } catch (e) {
      console.warn('Deep mtDNA Build 17 resolution skipped:', e);
    }

    // 3. Microhaplotype Deconvolution (if microhap kernel is present)
    try {
      const response = await fetch('/data/microhap_kernel.json');
      if (response.ok) {
        const kernel = await response.json();
        const { deconvolveMicrohaplotypes } = await import('../services/microhapEngine');
        result.microhaplotypes = deconvolveMicrohaplotypes(parsedData.snpByRsid, kernel);
      }
    } catch (e) {
      console.warn('Microhaplotype resolution skipped:', e);
    }

    // 4. Archaic DNA Introgression & Hominin Affinity Deconvolution
    try {
      const { calculateArchaicAffinity } = await import('../services/archaicEngine');
      result.archaicAffinity = calculateArchaicAffinity(
        parsedData.snpByRsid,
        parsedData.snpByPosition
      );
    } catch (e) {
      console.warn('Archaic affinity calculation skipped:', e);
    }

    self.postMessage({
      type: 'SUCCESS',
      result
    });
  } catch (err: any) {
    self.postMessage({
      type: 'ERROR',
      error: err?.message || 'An unexpected error occurred during DNA processing.'
    });
  }
};
