import { gunzipSync, unzipSync } from 'fflate';

/**
 * Automatically inspects magic bytes and decompresses GZIP (\x1f\x8b) or ZIP (PK\x03\x04) buffers.
 * Selects the primary genetic data file (.txt, .csv, .vcf, .tsv, .dat) case-insensitively.
 * Strips UTF-8 BOM (\xef\xbb\xbf) if present.
 */
export function decompressGenomicBuffer(buf: Uint8Array): Uint8Array {
  if (!buf || buf.length < 4) return buf;

  let result = buf;

  // 1. Check for GZIP magic bytes (\x1f\x8b)
  if (buf[0] === 0x1f && buf[1] === 0x8b) {
    try {
      result = gunzipSync(buf);
    } catch (e) {
      console.warn("fflate gunzipSync warning:", e);
      result = buf;
    }
  }
  // 2. Check for ZIP magic bytes (PK\x03\x04, PK\x05\x06, PK\x07\x08)
  else if (buf[0] === 0x50 && buf[1] === 0x4b && (buf[2] === 0x03 || buf[2] === 0x05 || buf[2] === 0x07)) {
    try {
      const unzipped = unzipSync(buf);
      const fileKeys = Object.keys(unzipped).filter(k => {
        const lower = k.toLowerCase();
        return !lower.startsWith('__macosx/') &&
               !lower.includes('.ds_store') &&
               !lower.endsWith('/') &&
               !lower.endsWith('.pdf') &&
               !lower.endsWith('.html') &&
               !lower.endsWith('.png') &&
               !lower.endsWith('.jpg');
      });

      if (fileKeys.length > 0) {
        fileKeys.sort((a, b) => {
          const score = (key: string) => {
            const l = key.toLowerCase();
            let s = 0;
            if (l.endsWith('.vcf') || l.endsWith('.vcf.gz')) s += 100;
            if (l.endsWith('.txt') || l.endsWith('.txt.gz')) s += 90;
            if (l.endsWith('.csv') || l.endsWith('.csv.gz')) s += 80;
            if (l.endsWith('.tsv') || l.endsWith('.tsv.gz')) s += 70;
            if (l.endsWith('.dat')) s += 60;
            if (l.includes('genome') || l.includes('dna') || l.includes('ancestry') || l.includes('23andme') || l.includes('myheritage') || l.includes('ftdna') || l.includes('livingdna')) s += 30;
            return s;
          };
          return score(b) - score(a);
        });

        let innerBuffer = unzipped[fileKeys[0]];
        if (innerBuffer.length >= 2 && innerBuffer[0] === 0x1f && innerBuffer[1] === 0x8b) {
          innerBuffer = gunzipSync(innerBuffer);
        }
        result = innerBuffer;
      }
    } catch (e) {
      console.warn("fflate unzipSync warning:", e);
      result = buf;
    }
  }

  // 3. Strip UTF-8 BOM (\xef\xbb\xbf)
  if (result.length >= 3 && result[0] === 0xef && result[1] === 0xbb && result[2] === 0xbf) {
    result = result.subarray(3);
  }

  return result;
}

export interface ParsedDnaData {
  format: string;
  build: 'GRCh37' | 'GRCh38' | 'UNKNOWN';
  totalSnps: number;
  yDnaSnps: number;
  yDnaCalledSnps: number;
  mtDnaSnps: number;
  inferredBiologicalSex: 'MALE' | 'FEMALE' | 'UNKNOWN';
  snpByRsid: Record<string, string>; // rsid (lowercase) -> genotype
  snpByPosition: Record<string, string>; // "chr:pos" -> genotype
}

export function parseRawDnaText(
  content: string,
  onProgress?: (lines: number) => void
): ParsedDnaData {
  const lines = content.split(/\r?\n/);
  const snpByRsid: Record<string, string> = {};
  const snpByPos: Record<string, string> = {};

  let totalLines = 0;
  let yCount = 0;
  let yCalledCount = 0;
  let mtCount = 0;
  let detectedFormat = "Generic / 23andMe Format";
  let detectedBuild: 'GRCh37' | 'GRCh38' | 'UNKNOWN' = 'UNKNOWN';

  let hg19AnchorMatches = 0;
  let hg38AnchorMatches = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    totalLines++;

    if (totalLines % 25000 === 0 && onProgress) {
      onProgress(totalLines);
    }

    const line = rawLine.trim();
    if (!line) continue;

    // Check header lines
    if (line.startsWith("#")) {
      const lower = line.toLowerCase();
      if (lower.includes("23andme")) detectedFormat = "23andMe Raw Data";
      else if (lower.includes("ancestrydna")) detectedFormat = "AncestryDNA Raw Data";
      else if (lower.includes("myheritage")) detectedFormat = "MyHeritage Raw Data";
      else if (lower.includes("ftdna") || lower.includes("family tree dna")) detectedFormat = "FamilyTreeDNA";

      if (lower.includes("build 37") || lower.includes("grch37") || lower.includes("hg19")) {
        detectedBuild = 'GRCh37';
      } else if (lower.includes("build 38") || lower.includes("grch38") || lower.includes("hg38")) {
        detectedBuild = 'GRCh38';
      }
      continue;
    }

    // Split CSV or whitespace
    let tokens: string[];
    if (line.includes(",")) {
      tokens = line.split(",").map(t => t.replace(/"/g, "").trim());
    } else {
      tokens = line.split(/\s+/);
    }

    if (tokens.length < 4) continue;

    // Skip table header
    const firstCol = tokens[0].toLowerCase();
    if (firstCol === "rsid" || firstCol === "dbsnp") {
      if (tokens.length >= 5 && (tokens[3]?.toLowerCase() === "allele1" || tokens[4]?.toLowerCase() === "allele2")) {
        detectedFormat = "AncestryDNA Format";
      }
      continue;
    }

    const rsid = firstCol;
    const chromosome = normalizeChromosome(tokens[1]);
    const position = tokens[2];

    let genotype = "--";
    // Robust 5-column detection (e.g. AncestryDNA rsid, chr, pos, allele1, allele2)
    if (tokens.length >= 5 && (detectedFormat.includes("Ancestry") || (tokens[3].length <= 2 && tokens[4].length <= 2))) {
      const a1 = tokens[3]?.trim() || "";
      const a2 = tokens[4]?.trim() || "";
      genotype = cleanGenotype(a1 + a2);
    } else {
      genotype = cleanGenotype(tokens[3] || "");
    }

    // Quality control: Chr Y and Chr MT are strictly haploid.
    // Heterozygous calls on haploid loci are microarray probe crosstalk / hybridization noise.
    if (chromosome === "Y" || chromosome === "MT") {
      if (genotype === "--") {
        // keep as --
      } else if (genotype.length === 2 && genotype[0] !== genotype[1]) {
        genotype = "--"; // Reject probe crosstalk
      } else if (genotype.length === 2 && genotype[0] === genotype[1]) {
        genotype = genotype[0]; // Normalize AA -> A
      }
    }

    if (chromosome === "Y") {
      yCount++;
      if (genotype !== "--") yCalledCount++;
      snpByRsid[rsid] = genotype;
      snpByPos[`y:${position}`] = genotype;

      // Coordinate anchor detection
      const numPos = parseInt(position, 10);
      if (numPos === 13533801 || numPos === 14896238 || numPos === 15026934) hg19AnchorMatches++;
      if (numPos === 11438067 || numPos === 12800504 || numPos === 12931200) hg38AnchorMatches++;
    } else if (chromosome === "MT") {
      mtCount++;
      snpByRsid[rsid] = genotype;
      snpByPos[`mt:${position}`] = genotype;
    } else {
      // Autosomal & X loci
      snpByRsid[rsid] = genotype;
      snpByPos[`${chromosome.toLowerCase()}:${position}`] = genotype;
    }
  }

  if (detectedBuild === 'UNKNOWN') {
    if (hg38AnchorMatches > hg19AnchorMatches) detectedBuild = 'GRCh38';
    else if (hg19AnchorMatches > 0) detectedBuild = 'GRCh37';
    else detectedBuild = 'GRCh37'; // Default for most legacy commercial DTC chips
  }

  let inferredSex: 'MALE' | 'FEMALE' | 'UNKNOWN' = 'UNKNOWN';
  if (totalLines > 30000) {
    if (yCalledCount < 30) {
      inferredSex = 'FEMALE';
    } else if (yCalledCount >= 50) {
      inferredSex = 'MALE';
    }
  }

  return {
    format: detectedFormat,
    build: detectedBuild,
    totalSnps: totalLines,
    yDnaSnps: yCount,
    yDnaCalledSnps: yCalledCount,
    mtDnaSnps: mtCount,
    inferredBiologicalSex: inferredSex,
    snpByRsid,
    snpByPosition: snpByPos
  };
}

export function normalizeChromosome(rawChr: string): string {
  const clean = rawChr.replace(/^chr/i, "").trim().toUpperCase();
  switch (clean) {
    case "23":
    case "X":
      return "X";
    case "24":
    case "Y":
      return "Y";
    case "25":
    case "PAR":
    case "XY":
      // AncestryDNA uses '25' for Pseudoautosomal Region (PAR) on X
      return "X";
    case "26":
    case "MT":
    case "M":
    case "MITO":
    case "MITOCHONDRIAL":
      return "MT";
    default:
      return clean;
  }
}

export function cleanGenotype(raw: string): string {
  const trimmed = raw.trim().toUpperCase();
  if (
    trimmed === "--" ||
    trimmed === "00" ||
    trimmed === "?" ||
    trimmed === "NC" ||
    trimmed === "NN" ||
    trimmed === "./." ||
    trimmed === ".|." ||
    trimmed === "."
  ) {
    return "--";
  }
  return trimmed;
}
