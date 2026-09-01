export interface ParsedDnaData {
  format: string;
  totalSnps: number;
  yDnaSnps: number;
  mtDnaSnps: number;
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
  let mtCount = 0;
  let detectedFormat = "Generic / 23andMe Format";

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
    if (tokens.length >= 5 && detectedFormat.includes("Ancestry")) {
      const a1 = tokens[3]?.trim() || "";
      const a2 = tokens[4]?.trim() || "";
      genotype = cleanGenotype(a1 + a2);
    } else {
      genotype = cleanGenotype(tokens[3] || "");
    }

    if (chromosome === "Y") {
      yCount++;
      snpByRsid[rsid] = genotype;
      snpByPos[`y:${position}`] = genotype;
    } else if (chromosome === "MT" || chromosome === "M") {
      mtCount++;
      snpByRsid[rsid] = genotype;
      snpByPos[`mt:${position}`] = genotype;
    } else if (rsid.startsWith("rs")) {
      snpByRsid[rsid] = genotype;
    }
  }

  return {
    format: detectedFormat,
    totalSnps: totalLines,
    yDnaSnps: yCount,
    mtDnaSnps: mtCount,
    snpByRsid,
    snpByPosition: snpByPos
  };
}

function normalizeChromosome(rawChr: string): string {
  const clean = rawChr.replace(/chr/i, "").trim().toUpperCase();
  switch (clean) {
    case "23":
    case "X":
      return "X";
    case "24":
    case "Y":
      return "Y";
    case "25":
    case "26":
    case "MT":
    case "M":
      return "MT";
    default:
      return clean;
  }
}

function cleanGenotype(raw: string): string {
  const trimmed = raw.trim().toUpperCase();
  if (trimmed === "--" || trimmed === "00" || trimmed === "?" || trimmed === "NC" || trimmed === "NN") {
    return "--";
  }
  return trimmed;
}
