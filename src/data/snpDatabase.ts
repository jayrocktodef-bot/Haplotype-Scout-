import { SnpMarker } from '../types/haplogroup';

export const ALL_DEFINING_SNPS: SnpMarker[] = [
  // ==========================================
  // Y-DNA SNPS (Chr Y)
  // ==========================================
  // Root / Basal
  { name: "M91", rsid: "rs17306671", chromosome: "Y", position: 21743110, ancestralAllele: "C", derivedAllele: "T", haplogroup: "A", lineageType: "PATERNAL_YDNA", description: "Deep African basal marker A" },
  { name: "M168", rsid: "rs9306841", chromosome: "Y", position: 13533801, ancestralAllele: "C", derivedAllele: "T", haplogroup: "CT", lineageType: "PATERNAL_YDNA", description: "Out of Africa macro-marker" },
  { name: "M96", rsid: "rs9786481", chromosome: "Y", position: 14896238, ancestralAllele: "G", derivedAllele: "C", haplogroup: "E", lineageType: "PATERNAL_YDNA", description: "Haplogroup E root marker" },
  { name: "M2", rsid: "rs2032597", chromosome: "Y", position: 14095400, ancestralAllele: "A", derivedAllele: "G", haplogroup: "E1b1a", lineageType: "PATERNAL_YDNA", description: "Sub-Saharan Bantu expansion marker" },
  { name: "M35", rsid: "rs9306847", chromosome: "Y", position: 14096000, ancestralAllele: "G", derivedAllele: "C", haplogroup: "E1b1b", lineageType: "PATERNAL_YDNA", description: "North African / Mediterranean marker" },
  { name: "V13", rsid: "rs9306848", chromosome: "Y", position: 14097100, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-V13", lineageType: "PATERNAL_YDNA", description: "Balkan Bronze Age expansion marker" },

  // Haplogroup G
  { name: "M201", rsid: "rs2032630", chromosome: "Y", position: 14088000, ancestralAllele: "G", derivedAllele: "T", haplogroup: "G", lineageType: "PATERNAL_YDNA", description: "Neolithic Farmer marker (EEF)" },
  { name: "P15", rsid: "rs9786520", chromosome: "Y", position: 14089200, ancestralAllele: "C", derivedAllele: "T", haplogroup: "G2a", lineageType: "PATERNAL_YDNA", description: "Ötzi / LBK European early farmer marker" },

  // Haplogroup I
  { name: "M170", rsid: "rs2032608", chromosome: "Y", position: 14094000, ancestralAllele: "A", derivedAllele: "C", haplogroup: "I", lineageType: "PATERNAL_YDNA", description: "Indigenous European Upper Paleolithic marker" },
  { name: "M253", rsid: "rs9341278", chromosome: "Y", position: 15026934, ancestralAllele: "C", derivedAllele: "T", haplogroup: "I1-M253", lineageType: "PATERNAL_YDNA", description: "Classic Nordic / Viking paternal marker" },
  { name: "M438", rsid: "rs17315758", chromosome: "Y", position: 14436000, ancestralAllele: "A", derivedAllele: "G", haplogroup: "I2-M438", lineageType: "PATERNAL_YDNA", description: "Dinaric / Balkan & Sardinian marker" },
  { name: "L621", rsid: "rs78931201", chromosome: "Y", position: 14439000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "I2-M438", lineageType: "PATERNAL_YDNA", description: "Slavic expansion marker" },

  // Haplogroup J
  { name: "M267", rsid: "rs13447352", chromosome: "Y", position: 14938000, ancestralAllele: "T", derivedAllele: "G", haplogroup: "J1-M267", lineageType: "PATERNAL_YDNA", description: "Semitic / Arabian lineage marker" },
  { name: "P58", rsid: "rs13447390", chromosome: "Y", position: 14940000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "J1-M267", lineageType: "PATERNAL_YDNA", description: "Cohen Modal Haplotype marker" },
  { name: "M172", rsid: "rs2032604", chromosome: "Y", position: 14972000, ancestralAllele: "T", derivedAllele: "G", haplogroup: "J2-M172", lineageType: "PATERNAL_YDNA", description: "Greco-Roman / Anatolian maritime marker" },
  { name: "M410", rsid: "rs2032605", chromosome: "Y", position: 14973500, ancestralAllele: "G", derivedAllele: "A", haplogroup: "J2-M172", lineageType: "PATERNAL_YDNA", description: "Minoan / Aegean civilization marker" },

  // Haplogroup N & O
  { name: "M231", rsid: "rs34442126", chromosome: "Y", position: 16020000, ancestralAllele: "C", derivedAllele: "G", haplogroup: "N-M231", lineageType: "PATERNAL_YDNA", description: "Uralic / Siberian marker" },
  { name: "M175", rsid: "rs2032651", chromosome: "Y", position: 16550000, ancestralAllele: "INS", derivedAllele: "DEL", haplogroup: "O-M175", lineageType: "PATERNAL_YDNA", description: "East Asian root marker" },
  { name: "M122", rsid: "rs2032652", chromosome: "Y", position: 16552000, ancestralAllele: "T", derivedAllele: "C", haplogroup: "O-M175", lineageType: "PATERNAL_YDNA", description: "Han Chinese / Sino-Tibetan marker" },

  // Haplogroup Q
  { name: "M242", rsid: "rs3894", chromosome: "Y", position: 17045000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "Q-M242", lineageType: "PATERNAL_YDNA", description: "Siberian / Native American founder" },
  { name: "M3", rsid: "rs3895", chromosome: "Y", position: 17047000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "Q-M242", lineageType: "PATERNAL_YDNA", description: "Indigenous American Clovis / Maya marker" },

  // Haplogroup R1a
  { name: "M420", rsid: "rs17315756", chromosome: "Y", position: 18100000, ancestralAllele: "T", derivedAllele: "A", haplogroup: "R1a-M417", lineageType: "PATERNAL_YDNA", description: "R1a basal marker" },
  { name: "M417", rsid: "rs17315757", chromosome: "Y", position: 18102000, ancestralAllele: "C", derivedAllele: "G", haplogroup: "R1a-M417", lineageType: "PATERNAL_YDNA", description: "Corded Ware / Balto-Slavic & Indo-Aryan marker" },
  { name: "Z282", rsid: "rs78931205", chromosome: "Y", position: 18105000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R1a-M417", lineageType: "PATERNAL_YDNA", description: "European branch of R1a" },
  { name: "Z93", rsid: "rs78931206", chromosome: "Y", position: 18107000, ancestralAllele: "G", derivedAllele: "A", haplogroup: "R1a-M417", lineageType: "PATERNAL_YDNA", description: "Asian / Indo-Iranian branch of R1a" },

  // Haplogroup R1b
  { name: "M343", rsid: "rs2032624", chromosome: "Y", position: 18500000, ancestralAllele: "C", derivedAllele: "A", haplogroup: "R1b-M269", lineageType: "PATERNAL_YDNA", description: "R1b root marker" },
  { name: "M269", rsid: "rs9786184", chromosome: "Y", position: 18512340, ancestralAllele: "T", derivedAllele: "C", haplogroup: "R1b-M269", lineageType: "PATERNAL_YDNA", description: "Yamnaya Steppe & Western European founder marker" },
  { name: "L23", rsid: "rs13303975", chromosome: "Y", position: 18515000, ancestralAllele: "G", derivedAllele: "A", haplogroup: "R1b-M269", lineageType: "PATERNAL_YDNA", description: "Eastern European steppe branch" },
  { name: "L51", rsid: "rs13303980", chromosome: "Y", position: 18517000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R1b-M269", lineageType: "PATERNAL_YDNA", description: "Western European Bell Beaker stem" },
  { name: "U106", rsid: "rs2032598", chromosome: "Y", position: 18600000, ancestralAllele: "C", derivedAllele: "A", haplogroup: "R1b-U106", lineageType: "PATERNAL_YDNA", description: "Proto-Germanic / Anglo-Saxon marker" },
  { name: "P312", rsid: "rs34276300", chromosome: "Y", position: 18700000, ancestralAllele: "C", derivedAllele: "A", haplogroup: "R1b-P312", lineageType: "PATERNAL_YDNA", description: "Bell Beaker / Italo-Celtic parent marker" },
  { name: "L21", rsid: "rs11799226", chromosome: "Y", position: 18750000, ancestralAllele: "G", derivedAllele: "A", haplogroup: "R1b-L21", lineageType: "PATERNAL_YDNA", description: "Insular Celtic (Gaelic, Irish, Scottish) marker" },
  { name: "U152", rsid: "rs12338", chromosome: "Y", position: 18800000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R1b-U152", lineageType: "PATERNAL_YDNA", description: "Italo-Celtic / Alpine / Roman marker" },
  { name: "DF27", rsid: "rs16980479", chromosome: "Y", position: 18850000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R1b-DF27", lineageType: "PATERNAL_YDNA", description: "Iberian / Celtiberian / Basque marker" },

  // ── Sub-Saharan African & Diaspora Y-DNA (E1b1a Deep Subclades)
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

  // ==========================================
  // MTDNA SNPS (Mitochondrial Genome — PhyloTree Build 17 / rCRS)
  // ==========================================

  // ── L0: Deepest Root (Khoisan / Mitochondrial Eve)
  { name: "146C",   rsid: "rs41349744", chromosome: "MT", position: 146,   ancestralAllele: "A", derivedAllele: "C", haplogroup: "L0",   lineageType: "MATERNAL_MTDNA", description: "Basal L0 marker — distinguishes L0 from L1/L2/L3/L4/L5/L6. Khoisan hunter-gatherer lineage." },
  { name: "16129A", rsid: "rs28358575", chromosome: "MT", position: 16129, ancestralAllele: "G", derivedAllele: "A", haplogroup: "L0",   lineageType: "MATERNAL_MTDNA", description: "Secondary L0 HVR diagnostic. Key in L0a and L0k subclades." },

  // ── L1: Central / West African basal clade
  { name: "3666A",  rsid: "rs28358178", chromosome: "MT", position: 3666,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "L1",   lineageType: "MATERNAL_MTDNA", description: "Defines L1 (L1b, L1c, L1d, L1k). Differentiates from L0 and L2/L3." },
  { name: "7055A",  rsid: "rs28358179", chromosome: "MT", position: 7055,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "L1",   lineageType: "MATERNAL_MTDNA", description: "Coding-region confirmation marker for L1." },

  // ── L2 / L2a / L2a1: West African & African-American dominant maternal lines
  { name: "13590A", rsid: "rs28358196", chromosome: "MT", position: 13590, ancestralAllele: "G", derivedAllele: "A", haplogroup: "L2",   lineageType: "MATERNAL_MTDNA", description: "Basal L2 coding-region marker. Use with 16278T to confirm L2." },
  { name: "15950G", rsid: "rs28358197", chromosome: "MT", position: 15950, ancestralAllele: "A", derivedAllele: "G", haplogroup: "L2a",  lineageType: "MATERNAL_MTDNA", description: "Defines L2a — the most common L2 subclade in West Africa and African Americans." },
  // NOTE: 3594T was previously (incorrectly) assigned to L3. Per PhyloTree Build 17, it defines L2a1.
  { name: "3594T",  rsid: "rs2853495",  chromosome: "MT", position: 3594,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "L2a1", lineageType: "MATERNAL_MTDNA", description: "Defines L2a1 (a major L2a subclade prevalent in West Africa). Previously mislabelled L3 — corrected." },
  { name: "16278T", rsid: "rs2853496",  chromosome: "MT", position: 16278, ancestralAllele: "C", derivedAllele: "T", haplogroup: "L2",   lineageType: "MATERNAL_MTDNA", description: "HVR West African L2 hint marker. Always pair with coding-region 13590A to confirm." },

  // ── L3: Out of Africa maternal ancestor
  { name: "769A",   rsid: "rs2853493",  chromosome: "MT", position: 769,   ancestralAllele: "G", derivedAllele: "A", haplogroup: "L3",   lineageType: "MATERNAL_MTDNA", description: "Mitochondrial Out of Africa marker — L3 basal." },
  { name: "1018A",  rsid: "rs2853494",  chromosome: "MT", position: 1018,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "L3",   lineageType: "MATERNAL_MTDNA", description: "L3 defining coding-region marker." },

  // ── Macrohaplogroup M: South & East Asian + Indigenous American ancestor
  { name: "489C",   rsid: "rs2853497",  chromosome: "MT", position: 489,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "M",    lineageType: "MATERNAL_MTDNA", description: "Macrohaplogroup M primary founder marker." },
  { name: "10400T", rsid: "rs2853498",  chromosome: "MT", position: 10400, ancestralAllele: "C", derivedAllele: "T", haplogroup: "M",    lineageType: "MATERNAL_MTDNA", description: "Asian / South Asian M coding-region marker." },
  { name: "16311C", rsid: "rs28358312", chromosome: "MT", position: 16311, ancestralAllele: "T", derivedAllele: "C", haplogroup: "M",    lineageType: "MATERNAL_MTDNA", description: "Common M HVR marker — highly recurrent. Only valid when paired with 489C + 10400T." },

  // ── M7: Japan / East Asia subclade
  { name: "4312C",  rsid: "rs28358313", chromosome: "MT", position: 4312,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "M7",   lineageType: "MATERNAL_MTDNA", description: "Defines M7 (prevalent in Japan and East Asia). Discriminates from D/C/Z." },

  // ── M8: Ancestor of C and Z (Siberia / Americas)
  { name: "9824C",  rsid: "rs28358314", chromosome: "MT", position: 9824,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "M8",   lineageType: "MATERNAL_MTDNA", description: "Defines M8 — direct ancestor of haplogroups C and Z. Critical for C/Z separation." },

  // ── M9: Ancestor of E and haplogroup Q
  { name: "4715C",  rsid: "rs28358315", chromosome: "MT", position: 4715,  ancestralAllele: "A", derivedAllele: "C", haplogroup: "M9",   lineageType: "MATERNAL_MTDNA", description: "Defines M9 — ancestor to haplogroup E and Q-branch subclades." },

  // ── Haplogroup C: Siberian / Native American founding lineage
  { name: "13263G", rsid: "rs28358316", chromosome: "MT", position: 13263, ancestralAllele: "A", derivedAllele: "G", haplogroup: "C",    lineageType: "MATERNAL_MTDNA", description: "Primary C defining marker. Always use with M8 marker 9824C for confirmation." },
  { name: "11969A", rsid: "rs28358317", chromosome: "MT", position: 11969, ancestralAllele: "G", derivedAllele: "A", haplogroup: "C",    lineageType: "MATERNAL_MTDNA", description: "Secondary C marker (C1 subclade)." },

  // ── Haplogroup Z: Siberian / Manchu / NE Asia
  { name: "15784C", rsid: "rs28358318", chromosome: "MT", position: 15784, ancestralAllele: "T", derivedAllele: "C", haplogroup: "Z",    lineageType: "MATERNAL_MTDNA", description: "Defines Z — distinguishes from sibling clade C. Use with M8 marker 9824C." },

  // ── Haplogroup D (basal): Siberian / East Asian root of D4 and D5
  { name: "2092C",  rsid: "rs28358319", chromosome: "MT", position: 2092,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "D",    lineageType: "MATERNAL_MTDNA", description: "Basal D root marker. Necessary to classify D* and D5 — your D4 markers alone miss these branches." },
  { name: "4883T",  rsid: "rs28358320", chromosome: "MT", position: 4883,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "D",    lineageType: "MATERNAL_MTDNA", description: "Second basal D marker to confirm D-root classification." },

  // ── D4: East Asian / Siberian subclade (existing + retained)
  { name: "8414T",  rsid: "rs2853504",  chromosome: "MT", position: 8414,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "D4",   lineageType: "MATERNAL_MTDNA", description: "D4 subclade marker — Jomon Japan, Northern Han Chinese, Mongolians." },
  { name: "14668T", rsid: "rs2853519",  chromosome: "MT", position: 14668, ancestralAllele: "C", derivedAllele: "T", haplogroup: "D4",   lineageType: "MATERNAL_MTDNA", description: "D4 coding-region diagnostic base — Northern East Asian." },

  // ── Macrohaplogroup N: Eurasian root
  { name: "8701G",  rsid: "rs2853491",  chromosome: "MT", position: 8701,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "N",    lineageType: "MATERNAL_MTDNA", description: "Macrohaplogroup N Eurasian founder marker." },
  { name: "10398G", rsid: "rs2853492",  chromosome: "MT", position: 10398, ancestralAllele: "A", derivedAllele: "G", haplogroup: "N",    lineageType: "MATERNAL_MTDNA", description: "N division marker — unstable, always pair with 8701G; back-mutation risk." },
  { name: "150C",   rsid: "rs28358321", chromosome: "MT", position: 150,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "N",    lineageType: "MATERNAL_MTDNA", description: "Basal N HVR marker — recurrent, use only in context with coding-region N markers." },
  { name: "10238C", rsid: "rs28358322", chromosome: "MT", position: 10238, ancestralAllele: "T", derivedAllele: "C", haplogroup: "N",    lineageType: "MATERNAL_MTDNA", description: "Basal N coding-region marker — more robust than 150C for N classification." },

  // ── Haplogroup X: Native American X2a + European relic
  { name: "6371T",  rsid: "rs28358323", chromosome: "MT", position: 6371,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "X",    lineageType: "MATERNAL_MTDNA", description: "Primary X defining marker. X is often mislabelled as U or N* without this." },
  { name: "14470C", rsid: "rs28358324", chromosome: "MT", position: 14470, ancestralAllele: "T", derivedAllele: "C", haplogroup: "X",    lineageType: "MATERNAL_MTDNA", description: "Secondary X confirmation marker." },

  // ── HV: Ancestral clade to H and V (critical missing link)
  { name: "14766C", rsid: "rs28358325", chromosome: "MT", position: 14766, ancestralAllele: "T", derivedAllele: "C", haplogroup: "HV",   lineageType: "MATERNAL_MTDNA", description: "Defines HV — basal ancestor of both H and V. Critical root node for correct H/V classification." },

  // ── Haplogroup H (Helena) and Subclades
  { name: "2706G",  rsid: "rs2853499",  chromosome: "MT", position: 2706,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "H",    lineageType: "MATERNAL_MTDNA", description: "H defining marker (Helena) — most common European maternal lineage." },
  { name: "7028C",  rsid: "rs28358280", chromosome: "MT", position: 7028,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "H",    lineageType: "MATERNAL_MTDNA", description: "Primary diagnostic for Haplogroup H — H-specific derived state." },
  { name: "3010A",  rsid: "rs28358281", chromosome: "MT", position: 3010,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "H1",   lineageType: "MATERNAL_MTDNA", description: "H1 primary marker — Western European Franco-Cantabrian expansion." },
  { name: "16189C", rsid: "rs2853515",  chromosome: "MT", position: 16189, ancestralAllele: "T", derivedAllele: "C", haplogroup: "H1",   lineageType: "MATERNAL_MTDNA", description: "H1 HVR marker — poly-C hotspot; unreliable alone. Always use with coding marker 3010A." },
  { name: "1438A",  rsid: "rs2853500",  chromosome: "MT", position: 1438,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "H2",   lineageType: "MATERNAL_MTDNA", description: "H2 Central European Neolithic marker." },
  { name: "6776C",  rsid: "rs28358282", chromosome: "MT", position: 6776,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "H3",   lineageType: "MATERNAL_MTDNA", description: "H3 marker — Iberian & Sardinian Atlantic lineage." },

  // ── Haplogroup V: Post-LGM Iberian / Scandinavian
  { name: "4580A",  rsid: "rs28358326", chromosome: "MT", position: 4580,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "V",    lineageType: "MATERNAL_MTDNA", description: "Primary V defining marker — critical to separate V from H post-LGM Iberian expansion." },
  { name: "15904T", rsid: "rs28358327", chromosome: "MT", position: 15904, ancestralAllele: "C", derivedAllele: "T", haplogroup: "V",    lineageType: "MATERNAL_MTDNA", description: "Secondary V confirmation marker." },

  // ── Haplogroup W: South Asian / European N subclade
  { name: "8994A",  rsid: "rs28358328", chromosome: "MT", position: 8994,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "W",    lineageType: "MATERNAL_MTDNA", description: "Primary W defining marker — separates W from I and N*. Found in South Asia and NE Europe." },
  { name: "7472T",  rsid: "rs28358329", chromosome: "MT", position: 7472,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "W",    lineageType: "MATERNAL_MTDNA", description: "Secondary W coding-region confirmation marker." },

  // ── Haplogroup I: Northern European / Saami-associated N subclade
  { name: "10034C", rsid: "rs28358330", chromosome: "MT", position: 10034, ancestralAllele: "T", derivedAllele: "C", haplogroup: "I",    lineageType: "MATERNAL_MTDNA", description: "Primary I defining marker — often confused with W due to shared ancestry. Saami / Northern European." },

  // ── Haplogroup U: Upper Paleolithic European hunter-gatherers
  { name: "12308G", rsid: "rs2853510",  chromosome: "MT", position: 12308, ancestralAllele: "A", derivedAllele: "G", haplogroup: "U",    lineageType: "MATERNAL_MTDNA", description: "U root marker — Upper Paleolithic European hunter-gatherer." },
  { name: "12372A", rsid: "rs2853511",  chromosome: "MT", position: 12372, ancestralAllele: "G", derivedAllele: "A", haplogroup: "U",    lineageType: "MATERNAL_MTDNA", description: "Secondary U defining marker." },

  // ── U5 intermediate (needed before U5b)
  { name: "3197C",  rsid: "rs28358331", chromosome: "MT", position: 3197,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "U5",   lineageType: "MATERNAL_MTDNA", description: "U5 intermediate marker — required before declaring U5b. Ancestral to WHG Mesolithic lineages." },

  // ── U5b: Cheddar Man / Western Hunter-Gatherer
  { name: "7768G",  rsid: "rs2853512",  chromosome: "MT", position: 7768,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "U5b",  lineageType: "MATERNAL_MTDNA", description: "U5b derived marker — Cheddar Man / WHG Mesolithic Europe." },
  { name: "16270T", rsid: "rs2853513",  chromosome: "MT", position: 16270, ancestralAllele: "C", derivedAllele: "T", haplogroup: "U5b",  lineageType: "MATERNAL_MTDNA", description: "U5b HVR marker — Cheddar Man / WHG." },

  // ── U2: South Asian subclade
  { name: "1811G",  rsid: "rs28358332", chromosome: "MT", position: 1811,  ancestralAllele: "A", derivedAllele: "G", haplogroup: "U2",   lineageType: "MATERNAL_MTDNA", description: "Defines U2 — prominent in South Asia (India ~5-10%). Absent in most commercial kits." },

  // ── U3: Middle East / Caucasus subclade
  { name: "14577C", rsid: "rs28358333", chromosome: "MT", position: 14577, ancestralAllele: "A", derivedAllele: "C", haplogroup: "U3",   lineageType: "MATERNAL_MTDNA", description: "Defines U3 — Middle East, Caucasus, Eastern Mediterranean." },

  // ── U4: Northeast European / Central Asian subclade
  { name: "4646C",  rsid: "rs28358334", chromosome: "MT", position: 4646,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "U4",   lineageType: "MATERNAL_MTDNA", description: "Defines U4 — Northeast Europe and Central Asia. Found in Bronze Age steppe populations." },

  // ── U7: Iran / Arabian Peninsula / South Asian subclade
  { name: "5999C",  rsid: "rs28358335", chromosome: "MT", position: 5999,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "U7",   lineageType: "MATERNAL_MTDNA", description: "Defines U7 — Iran, Arabian Peninsula, and Indian subcontinent." },

  // ── J1c: Neolithic Farming Expansion (Jasmine)
  { name: "14798C", rsid: "rs2853501",  chromosome: "MT", position: 14798, ancestralAllele: "T", derivedAllele: "C", haplogroup: "J1c",  lineageType: "MATERNAL_MTDNA", description: "J1c Neolithic Farmer primary marker." },
  { name: "16069T", rsid: "rs2853516",  chromosome: "MT", position: 16069, ancestralAllele: "C", derivedAllele: "T", haplogroup: "J1c",  lineageType: "MATERNAL_MTDNA", description: "J1c Early Agronomist maternal HVR marker." },

  // ── T2: Yamnaya & Neolithic Steppe / Agrarian (Tara)
  { name: "8697A",  rsid: "rs2853503",  chromosome: "MT", position: 8697,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "T2",   lineageType: "MATERNAL_MTDNA", description: "T2 primary coding-region marker — Yamnaya steppe & Neolithic agrarian." },
  { name: "16126C", rsid: "rs2853517",  chromosome: "MT", position: 16126, ancestralAllele: "T", derivedAllele: "C", haplogroup: "T2",   lineageType: "MATERNAL_MTDNA", description: "T2 HVR Tara clade marker." },

  // ── K1a: Ötzi / Cardial Mediterranean / Ashkenazi (Katrine)
  { name: "9055A",  rsid: "rs2853502",  chromosome: "MT", position: 9055,  ancestralAllele: "G", derivedAllele: "A", haplogroup: "K1a",  lineageType: "MATERNAL_MTDNA", description: "K1a primary marker — Ötzi the Iceman / Alpine Cardial Mediterranean." },
  { name: "10550G", rsid: "rs2853518",  chromosome: "MT", position: 10550, ancestralAllele: "A", derivedAllele: "G", haplogroup: "K1a",  lineageType: "MATERNAL_MTDNA", description: "K1a secondary coding-region marker." },

  // ── A2: Indigenous American Founder (Beringia / Clovis)
  { name: "663G",   rsid: "rs2853505",  chromosome: "MT", position: 663,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "A2",   lineageType: "MATERNAL_MTDNA", description: "A2 primary marker — Indigenous American Beringian founder. Walk N→A→A2 hierarchically." },
  { name: "8794T",  rsid: "rs2853520",  chromosome: "MT", position: 8794,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "A2",   lineageType: "MATERNAL_MTDNA", description: "A2 Beringian expansion confirmation marker." },

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

];
