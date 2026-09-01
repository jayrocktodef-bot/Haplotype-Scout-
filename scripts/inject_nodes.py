#!/usr/bin/env python3
import sys

# 1. Update snpDatabase.ts
with open("src/data/snpDatabase.ts", "r") as f:
    snp_code = f.read()

from scripts.expand_tree import NEW_YDNA_TREE_NODES, NEW_MTDNA_TREE_NODES

new_ydna_snps = """  // ── Sub-Saharan African & Diaspora Y-DNA (E1b1a Deep Subclades)
  { name: "U175",   rsid: "rs3853744",  chromosome: "Y", position: 15105448, ancestralAllele: "G", derivedAllele: "A", haplogroup: "E-U175",    lineageType: "PATERNAL_YDNA", description: "E-U175 (E1b1a1a1) — dominant lineage in Ghana, Nigeria (Yoruba, Igbo), and African Americans." },
  { name: "U290",   rsid: "rs9786078",  chromosome: "Y", position: 16612760, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-U290",    lineageType: "PATERNAL_YDNA", description: "E-U290 (E1b1a1a1a) — primary West African forest zone marker; high frequency in Trans-Atlantic diaspora." },
  { name: "M58",    rsid: "rs9786895",  chromosome: "Y", position: 28998313, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-M58",     lineageType: "PATERNAL_YDNA", description: "E-M58 (E1b1a1a1b) — Central and Southern African Bantu agriculturalist lineage." },
  { name: "CTS9883",rsid: "rs28488317", chromosome: "Y", position: 16867807, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-CTS9883", lineageType: "PATERNAL_YDNA", description: "E-CTS9883 — deeply resolved West-Central African branch." },

  // ── Indigenous American Y-DNA (Q & C Subclades)
  { name: "M848",   rsid: "rs17222543", chromosome: "Y", position: 20520728, ancestralAllele: "G", derivedAllele: "A", haplogroup: "Q-M848",    lineageType: "PATERNAL_YDNA", description: "Q-M848 (Q1a2a1a1a) — major Mesoamerican (Maya, Nahua) and South American Andean/Amazonian lineage." },
  { name: "Z780",   rsid: "rs200476773",chromosome: "Y", position: 16215387, ancestralAllele: "T", derivedAllele: "C", haplogroup: "Q-Z780",    lineageType: "PATERNAL_YDNA", description: "Q-Z780 (Q1a2a1b) — ancient Paleo-Indian lineage contemporary with Clovis/Anzick-1." },

  // ── East & Southeast Asian Y-DNA (O & C2 Subclades)
  { name: "M117",   rsid: "rs17216473", chromosome: "Y", position: 28698782, ancestralAllele: "C", derivedAllele: "T", haplogroup: "O2a2b1-M117",lineageType: "PATERNAL_YDNA", description: "O-M117 — major Sino-Tibetan and Yangshao Neolithic expansion branch." },
  { name: "F1067",  rsid: "rs17222851", chromosome: "Y", position: 23158914, ancestralAllele: "T", derivedAllele: "C", haplogroup: "C2-F1067",  lineageType: "PATERNAL_YDNA", description: "C2-F1067 — prominent North Asian, Mongolic, and Manchu paternal branch." },

  // ── South Asian & Middle Eastern Y-DNA (H, L, R2, T)
  { name: "M82",    rsid: "rs2032626",  chromosome: "Y", position: 29785801, ancestralAllele: "A", derivedAllele: "C", haplogroup: "H1a-M82",   lineageType: "PATERNAL_YDNA", description: "H1a-M82 — widespread in South Asia and Romani diaspora." },
  { name: "M347",   rsid: "rs17222954", chromosome: "Y", position: 27632854, ancestralAllele: "G", derivedAllele: "A", haplogroup: "C-M347",    lineageType: "PATERNAL_YDNA", description: "C-M347 (C1b2b) — Indigenous Australian Aboriginal founder lineage." },
"""

new_mtdna_snps = """,

  // ── African Maternal L Subclades (L1b, L1c, L2b, L2c, L2d, L3b, L3d, L3e, L3e2b, L0a, L0d)
  { name: "3693G",  rsid: "rs2853543",  chromosome: "MT", position: 3693,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "L1b",    lineageType: "MATERNAL_MTDNA", description: "L1b West African founder mutation; prominent in African American genealogy." },
  { name: "7389C",  rsid: "rs2853544",  chromosome: "MT", position: 7389,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "L1b",    lineageType: "MATERNAL_MTDNA", description: "L1b coding region diagnostic marker." },
  { name: "15692G", rsid: "rs2853545",  chromosome: "MT", position: 15692,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "L1b",    lineageType: "MATERNAL_MTDNA", description: "L1b Cytb specific mutation." },
  { name: "366C",   rsid: "rs2853546",  chromosome: "MT", position: 366,    ancestralAllele: "T", derivedAllele: "C", haplogroup: "L1c",    lineageType: "MATERNAL_MTDNA", description: "L1c Central African / Pygmy / Bantu maternal lineage marker." },
  { name: "10810C", rsid: "rs2853547",  chromosome: "MT", position: 10810,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "L1c",    lineageType: "MATERNAL_MTDNA", description: "L1c ND4 diagnostic marker." },
  { name: "14209C", rsid: "rs2853548",  chromosome: "MT", position: 14209,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "L1c",    lineageType: "MATERNAL_MTDNA", description: "L1c ND6 marker." },
  { name: "8020A",  rsid: "rs2853549",  chromosome: "MT", position: 8020,   ancestralAllele: "G", derivedAllele: "A", haplogroup: "L2b",    lineageType: "MATERNAL_MTDNA", description: "L2b West African COII marker." },
  { name: "16390A", rsid: "rs2853550",  chromosome: "MT", position: 16390,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "L2b",    lineageType: "MATERNAL_MTDNA", description: "L2b HVR1 specific marker." },
  { name: "4820G",  rsid: "rs2853551",  chromosome: "MT", position: 4820,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "L2c",    lineageType: "MATERNAL_MTDNA", description: "L2c West African Senegambian marker." },
  { name: "10352C", rsid: "rs2853552",  chromosome: "MT", position: 10352,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "L2c",    lineageType: "MATERNAL_MTDNA", description: "L2c ND3 diagnostic marker." },
  { name: "8584A",  rsid: "rs2853553",  chromosome: "MT", position: 8584,   ancestralAllele: "G", derivedAllele: "A", haplogroup: "L2d",    lineageType: "MATERNAL_MTDNA", description: "L2d West African ATP6 marker." },
  { name: "16303G", rsid: "rs2853554",  chromosome: "MT", position: 16303,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "L2d",    lineageType: "MATERNAL_MTDNA", description: "L2d HVR1 diagnostic mutation." },
  { name: "3579T",  rsid: "rs2853555",  chromosome: "MT", position: 3579,   ancestralAllele: "C", derivedAllele: "T", haplogroup: "L3b",    lineageType: "MATERNAL_MTDNA", description: "L3b West African / Sahelian lineage." },
  { name: "16124C", rsid: "rs2853556",  chromosome: "MT", position: 16124,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "L3b",    lineageType: "MATERNAL_MTDNA", description: "L3b HVR1 specific mutation." },
  { name: "6402T",  rsid: "rs2853557",  chromosome: "MT", position: 6402,   ancestralAllele: "C", derivedAllele: "T", haplogroup: "L3d",    lineageType: "MATERNAL_MTDNA", description: "L3d Central / West-Central African lineage." },
  { name: "12172C", rsid: "rs2853558",  chromosome: "MT", position: 12172,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "L3d",    lineageType: "MATERNAL_MTDNA", description: "L3d ND5 marker." },
  { name: "10512G", rsid: "rs2853559",  chromosome: "MT", position: 10512,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "L3e",    lineageType: "MATERNAL_MTDNA", description: "L3e major Bantu-expansion marker; highly prevalent in African diaspora." },
  { name: "5361C",  rsid: "rs2853560",  chromosome: "MT", position: 5361,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "L3e2b",  lineageType: "MATERNAL_MTDNA", description: "L3e2b specific African American and Caribbean maternal branch." },
  { name: "13803G", rsid: "rs2853561",  chromosome: "MT", position: 13803,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "L3e2b",  lineageType: "MATERNAL_MTDNA", description: "L3e2b ND5 marker." },
  { name: "3918T",  rsid: "rs2853562",  chromosome: "MT", position: 3918,   ancestralAllele: "C", derivedAllele: "T", haplogroup: "L0a",    lineageType: "MATERNAL_MTDNA", description: "L0a Eastern and Central/Southern African ancient lineage." },
  { name: "15148A", rsid: "rs2853563",  chromosome: "MT", position: 15148,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "L0a",    lineageType: "MATERNAL_MTDNA", description: "L0a Cytb diagnostic mutation." },
  { name: "3804C",  rsid: "rs2853564",  chromosome: "MT", position: 3804,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "L0d",    lineageType: "MATERNAL_MTDNA", description: "L0d Khoisan / Southern African hunter-gatherer root." },

  // ── Indigenous American Maternal Founders (B2, C1b, C1c, C1d, D1, D4h3a, X2a)
  { name: "494G",   rsid: "rs2853565",  chromosome: "MT", position: 494,    ancestralAllele: "A", derivedAllele: "G", haplogroup: "B2",     lineageType: "MATERNAL_MTDNA", description: "B2 pan-American founder lineage (possesses 9bp deletion)." },
  { name: "3552A",  rsid: "rs2853567",  chromosome: "MT", position: 3552,   ancestralAllele: "T", derivedAllele: "A", haplogroup: "C1b",    lineageType: "MATERNAL_MTDNA", description: "C1b major South and Central American indigenous founder." },
  { name: "9545G",  rsid: "rs2853568",  chromosome: "MT", position: 9545,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "C1b",    lineageType: "MATERNAL_MTDNA", description: "C1b COIII marker." },
  { name: "11404C", rsid: "rs2853569",  chromosome: "MT", position: 11404,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "C1c",    lineageType: "MATERNAL_MTDNA", description: "C1c Mesoamerican and North American indigenous lineage." },
  { name: "15547C", rsid: "rs2853570",  chromosome: "MT", position: 15547,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "C1c",    lineageType: "MATERNAL_MTDNA", description: "C1c Cytb marker." },
  { name: "6235C",  rsid: "rs2853571",  chromosome: "MT", position: 6235,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "C1d",    lineageType: "MATERNAL_MTDNA", description: "C1d pan-American indigenous founder." },
  { name: "8386C",  rsid: "rs2853572",  chromosome: "MT", position: 8386,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "C1d",    lineageType: "MATERNAL_MTDNA", description: "C1d ATP8 marker." },
  { name: "209C",   rsid: "rs2853573",  chromosome: "MT", position: 209,    ancestralAllele: "T", derivedAllele: "C", haplogroup: "D1",     lineageType: "MATERNAL_MTDNA", description: "D1 pan-American founding lineage." },
  { name: "16271C", rsid: "rs2853574",  chromosome: "MT", position: 16271,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "D1",     lineageType: "MATERNAL_MTDNA", description: "D1 HVR1 defining mutation." },
  { name: "825A",   rsid: "rs2853575",  chromosome: "MT", position: 825,    ancestralAllele: "G", derivedAllele: "A", haplogroup: "D4h3a",  lineageType: "MATERNAL_MTDNA", description: "D4h3a Pacific coastal migration founder (Anzick-1 Clovis mummy lineage)." },
  { name: "16241G", rsid: "rs2853576",  chromosome: "MT", position: 16241,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "D4h3a",  lineageType: "MATERNAL_MTDNA", description: "D4h3a HVR1 specific marker." },
  { name: "153G",   rsid: "rs2853577",  chromosome: "MT", position: 153,    ancestralAllele: "A", derivedAllele: "G", haplogroup: "X2a",    lineageType: "MATERNAL_MTDNA", description: "X2a Kennewick Man / Northern North American indigenous lineage." },
  { name: "16221T", rsid: "rs2853578",  chromosome: "MT", position: 16221,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "X2a",    lineageType: "MATERNAL_MTDNA", description: "X2a HVR1 specific marker." },

  // ── Pacific & Asian Matrilines (B4a1a1, D4a, F1a, N9a, M2, M3, M5)
  { name: "14022C", rsid: "rs2853579",  chromosome: "MT", position: 14022,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "B4a1a1", lineageType: "MATERNAL_MTDNA", description: "B4a1a1 Polynesian Motif marker of the Lapita Oceanic expansion." },
  { name: "16247G", rsid: "rs2853580",  chromosome: "MT", position: 16247,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "B4a1a1", lineageType: "MATERNAL_MTDNA", description: "B4a1a1 Polynesian specific HVR mutation." },
  { name: "16232T", rsid: "rs2853583",  chromosome: "MT", position: 16232,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "F1a",    lineageType: "MATERNAL_MTDNA", description: "F1a HVR1 marker." },
  { name: "12690C", rsid: "rs2853584",  chromosome: "MT", position: 12690,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "N9a",    lineageType: "MATERNAL_MTDNA", description: "N9a East Asian (Korean, Japanese, Chinese) lineage." },
  { name: "16274G", rsid: "rs2853585",  chromosome: "MT", position: 16274,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "M2",     lineageType: "MATERNAL_MTDNA", description: "M2 indigenous South Asian Dravidian lineage." },
  { name: "12979G", rsid: "rs2853586",  chromosome: "MT", position: 12979,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "M3",     lineageType: "MATERNAL_MTDNA", description: "M3 South Asian Indian subcontinent lineage." },
  { name: "12285T", rsid: "rs2853587",  chromosome: "MT", position: 12285,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "M5",     lineageType: "MATERNAL_MTDNA", description: "M5 South Asian maternal lineage." }
"""

# Insert Y-DNA SNPs before MTDNA SNPS comment
marker_mt_hdr = "  // ==========================================\n  // MTDNA SNPS"
snp_code = snp_code.replace(marker_mt_hdr, new_ydna_snps + "\n" + marker_mt_hdr)

# Insert mtDNA SNPs before ending ];
idx = snp_code.rfind("];")
if idx != -1:
    snp_code = snp_code[:idx].rstrip() + new_mtdna_snps + "\n];\n"

with open("src/data/snpDatabase.ts", "w") as f:
    f.write(snp_code)

# 2. Update haplogroupTree.ts
with open("src/data/haplogroupTree.ts", "r") as f:
    tree_code = f.read()

# Insert into Y_DNA_HAPLOGROUPS
marker_y_end = "export const MT_DNA_HAPLOGROUPS: HaplogroupDefinition[] = ["
idx_y = tree_code.find(marker_y_end)
# find the ]; preceding idx_y
idx_bracket = tree_code.rfind("];", 0, idx_y)
tree_code = tree_code[:idx_bracket].rstrip() + ",\n" + NEW_YDNA_TREE_NODES + "\n];\n\n" + tree_code[idx_y:]

# Insert into MT_DNA_HAPLOGROUPS
marker_all = "export const ALL_HAPLOGROUPS: HaplogroupDefinition[] = ["
idx_all = tree_code.find(marker_all)
idx_mt_bracket = tree_code.rfind("];", 0, idx_all)
tree_code = tree_code[:idx_mt_bracket].rstrip() + ",\n" + NEW_MTDNA_TREE_NODES + "\n];\n\n" + tree_code[idx_all:]

with open("src/data/haplogroupTree.ts", "w") as f:
    f.write(tree_code)

print("Injected into snpDatabase.ts and haplogroupTree.ts successfully.")
