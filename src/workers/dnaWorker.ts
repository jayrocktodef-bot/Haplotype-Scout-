import { parseRawDnaText, ParsedDnaData } from '../services/dnaParser';
import { HaplogroupClassifier } from '../services/haplogroupClassifier';
import { unzipSync } from 'fflate';

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
      const name = (fileName || '').toLowerCase();

      if (name.endsWith('.zip')) {
        self.postMessage({ type: 'PROGRESS', progress: 10, message: 'Decompressing ZIP archive...' });
        const arrayBuffer = await file.arrayBuffer();
        const unzipped = unzipSync(new Uint8Array(arrayBuffer));
        
        let textCandidate = '';
        for (const [entryName, fileBytes] of Object.entries(unzipped)) {
          const lowerEntry = entryName.toLowerCase();
          if (lowerEntry.endsWith('.txt') || lowerEntry.endsWith('.csv') || lowerEntry.endsWith('.tsv') || lowerEntry.endsWith('.vcf')) {
            const decoder = new TextDecoder('utf-8');
            textCandidate = decoder.decode(fileBytes);
            break;
          }
        }

        if (!textCandidate) {
          throw new Error('No compatible DNA text file found inside the ZIP archive.');
        }
        rawText = textCandidate;
      } else {
        self.postMessage({ type: 'PROGRESS', progress: 15, message: 'Reading raw data stream...' });
        rawText = await file.text();
      }
    }

    self.postMessage({ type: 'PROGRESS', progress: 40, message: 'Parsing genomic loci & chromosomes...' });

    const parsedData: ParsedDnaData = parseRawDnaText(rawText, (linesProcessed) => {
      const progress = Math.min(85, Math.round(40 + (linesProcessed / 700000) * 45));
      self.postMessage({
        type: 'PROGRESS',
        progress,
        message: `Processed ${linesProcessed.toLocaleString()} lines...`
      });
    });

    self.postMessage({ type: 'PROGRESS', progress: 85, message: 'Evaluating Y-DNA & mtDNA phylogenies...' });

    const result = HaplogroupClassifier.analyze(kitName, parsedData);

    // 1. Deep mtDNA Evaluation via Van Oven PhyloTree Build 17
    try {
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

    // 2. Microhaplotype Deconvolution (if microhap kernel is present)
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

    // 3. Archaic DNA Introgression & Hominin Affinity Deconvolution
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
