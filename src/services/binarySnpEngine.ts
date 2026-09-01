/**
 * Packed Binary SNP Engine for Haplotype Scout
 * 
 * Provides zero-copy, sub-millisecond O(log N) binary search over
 * coordinate-sorted packed TypedArray buffers for hundreds of thousands of SNPs.
 * 
 * Struct Layout per Variant Record (10 Bytes):
 * [0..3]  pos:        Uint32 (GRCh37 coordinate: 1 - 250,000,000)
 * [4]     alleleMask: Uint8  (High 4 bits = Ancestral, Low 4 bits = Derived: 1=A, 2=C, 3=G, 4=T, 5=Ins, 6=Del)
 * [5..8]  nodeId:     Uint32 (Index into string dictionary of haplogroup names)
 * [9]     flags:      Uint8  (Bitmask: 0x1=Transversion, 0x2=Y-DNA, 0x4=mtDNA, 0x8=Microhap, 0x10=Archaic)
 */

export const ALLELE_TO_CODE: Record<string, number> = {
  'A': 1, 'C': 2, 'G': 3, 'T': 4, 'I': 5, 'D': 6, '-': 6,
  'a': 1, 'c': 2, 'g': 3, 't': 4, 'i': 5, 'd': 6
};

export const CODE_TO_ALLELE: Record<number, string> = {
  1: 'A', 2: 'C', 3: 'G', 4: 'T', 5: 'INS', 6: 'DEL'
};

export const FLAG_TRANSVERSION = 0x01;
export const FLAG_YDNA = 0x02;
export const FLAG_MTDNA = 0x04;
export const FLAG_MICROHAP = 0x08;
export const FLAG_ARCHAIC = 0x10;

export interface BinarySnpRecord {
  pos: number;
  ancestral: string;
  derived: string;
  haplogroup: string;
  isTransversion: boolean;
  type: 'Y' | 'MT' | 'MICROHAP' | 'ARCHAIC';
}

export interface PackedSnpPackage {
  buffer: ArrayBuffer;
  recordCount: number;
  dictionary: string[];
}

const RECORD_BYTE_SIZE = 10;

/**
 * Packs raw SNP definitions into an ArrayBuffer and string dictionary
 */
export function packSnpRecords(
  records: BinarySnpRecord[]
): PackedSnpPackage {
  // Sort records strictly by coordinate position for O(log N) binary search
  const sorted = [...records].sort((a, b) => a.pos - b.pos);
  
  const dictMap = new Map<string, number>();
  const dictionary: string[] = [];

  const getDictIndex = (name: string): number => {
    if (dictMap.has(name)) return dictMap.get(name)!;
    const idx = dictionary.length;
    dictionary.push(name);
    dictMap.set(name, idx);
    return idx;
  };

  const buffer = new ArrayBuffer(sorted.length * RECORD_BYTE_SIZE);
  const view = new DataView(buffer);

  for (let i = 0; i < sorted.length; i++) {
    const r = sorted[i];
    const offset = i * RECORD_BYTE_SIZE;

    // 1. Position (Uint32, 4 bytes)
    view.setUint32(offset, r.pos, true);

    // 2. Allele Mask (Uint8, 1 byte)
    const ancCode = ALLELE_TO_CODE[r.ancestral] || 0;
    const derCode = ALLELE_TO_CODE[r.derived] || 0;
    const alleleMask = ((ancCode & 0x0F) << 4) | (derCode & 0x0F);
    view.setUint8(offset + 4, alleleMask);

    // 3. Node ID (Uint32, 4 bytes)
    const nodeIndex = getDictIndex(r.haplogroup);
    view.setUint32(offset + 5, nodeIndex, true);

    // 4. Flags (Uint8, 1 byte)
    let flags = 0;
    if (r.isTransversion) flags |= FLAG_TRANSVERSION;
    if (r.type === 'Y') flags |= FLAG_YDNA;
    else if (r.type === 'MT') flags |= FLAG_MTDNA;
    else if (r.type === 'MICROHAP') flags |= FLAG_MICROHAP;
    else if (r.type === 'ARCHAIC') flags |= FLAG_ARCHAIC;
    view.setUint8(offset + 9, flags);
  }

  return {
    buffer,
    recordCount: sorted.length,
    dictionary
  };
}

/**
 * Fast O(log N) binary search on a packed ArrayBuffer
 */
export function binarySearchSnp(
  pkg: PackedSnpPackage,
  targetPos: number
): BinarySnpRecord | null {
  const { buffer, recordCount, dictionary } = pkg;
  const view = new DataView(buffer);

  let low = 0;
  let high = recordCount - 1;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    const offset = mid * RECORD_BYTE_SIZE;
    const midPos = view.getUint32(offset, true);

    if (midPos === targetPos) {
      const alleleMask = view.getUint8(offset + 4);
      const ancCode = (alleleMask >> 4) & 0x0F;
      const derCode = alleleMask & 0x0F;
      const nodeIndex = view.getUint32(offset + 5, true);
      const flags = view.getUint8(offset + 9);

      let type: 'Y' | 'MT' | 'MICROHAP' | 'ARCHAIC' = 'Y';
      if (flags & FLAG_MTDNA) type = 'MT';
      else if (flags & FLAG_MICROHAP) type = 'MICROHAP';
      else if (flags & FLAG_ARCHAIC) type = 'ARCHAIC';

      return {
        pos: midPos,
        ancestral: CODE_TO_ALLELE[ancCode] || 'N',
        derived: CODE_TO_ALLELE[derCode] || 'N',
        haplogroup: dictionary[nodeIndex] || 'Unknown',
        isTransversion: (flags & FLAG_TRANSVERSION) !== 0,
        type
      };
    } else if (midPos < targetPos) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null;
}

/**
 * Batch match an array or set of positions in O(M log N) time
 */
export function batchMatchPositions(
  pkg: PackedSnpPackage,
  observedPositions: number[]
): BinarySnpRecord[] {
  const matches: BinarySnpRecord[] = [];
  for (let i = 0; i < observedPositions.length; i++) {
    const record = binarySearchSnp(pkg, observedPositions[i]);
    if (record) {
      matches.push(record);
    }
  }
  return matches;
}
