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

  // ==========================================
  // MTDNA SNPS (Mitochondrial Genome)
  // ==========================================
  // Root / L clades
  { name: "769A", rsid: "rs2853493", chromosome: "MT", position: 769, ancestralAllele: "G", derivedAllele: "A", haplogroup: "L3", lineageType: "MATERNAL_MTDNA", description: "Mitochondrial Out of Africa marker" },
  { name: "1018A", rsid: "rs2853494", chromosome: "MT", position: 1018, ancestralAllele: "G", derivedAllele: "A", haplogroup: "L3", lineageType: "MATERNAL_MTDNA", description: "L3 defining marker" },
  { name: "3594T", rsid: "rs2853495", chromosome: "MT", position: 3594, ancestralAllele: "C", derivedAllele: "T", haplogroup: "L3", lineageType: "MATERNAL_MTDNA", description: "Maternal Out of Africa stem" },
  { name: "16278T", rsid: "rs2853496", chromosome: "MT", position: 16278, ancestralAllele: "C", derivedAllele: "T", haplogroup: "L2", lineageType: "MATERNAL_MTDNA", description: "West African L2 marker" },

  // Macrohaplogroup M & N
  { name: "489C", rsid: "rs2853497", chromosome: "MT", position: 489, ancestralAllele: "T", derivedAllele: "C", haplogroup: "M", lineageType: "MATERNAL_MTDNA", description: "Macrohaplogroup M founder marker" },
  { name: "10400T", rsid: "rs2853498", chromosome: "MT", position: 10400, ancestralAllele: "C", derivedAllele: "T", haplogroup: "M", lineageType: "MATERNAL_MTDNA", description: "Asian / South Asian M marker" },
  { name: "8701G", rsid: "rs2853491", chromosome: "MT", position: 8701, ancestralAllele: "A", derivedAllele: "G", haplogroup: "N", lineageType: "MATERNAL_MTDNA", description: "Macrohaplogroup N Eurasian founder" },
  { name: "10398G", rsid: "rs2853492", chromosome: "MT", position: 10398, ancestralAllele: "A", derivedAllele: "G", haplogroup: "N", lineageType: "MATERNAL_MTDNA", description: "Major Eurasian division marker" },

  // Haplogroup U & U5b
  { name: "12308G", rsid: "rs2853510", chromosome: "MT", position: 12308, ancestralAllele: "A", derivedAllele: "G", haplogroup: "U", lineageType: "MATERNAL_MTDNA", description: "Haplogroup U Upper Paleolithic marker" },
  { name: "12372A", rsid: "rs2853511", chromosome: "MT", position: 12372, ancestralAllele: "G", derivedAllele: "A", haplogroup: "U", lineageType: "MATERNAL_MTDNA", description: "U clade defining marker" },
  { name: "7768G", rsid: "rs2853512", chromosome: "MT", position: 7768, ancestralAllele: "A", derivedAllele: "G", haplogroup: "U5b", lineageType: "MATERNAL_MTDNA", description: "European Mesolithic Hunter-Gatherer U5b marker" },
  { name: "16270T", rsid: "rs2853513", chromosome: "MT", position: 16270, ancestralAllele: "C", derivedAllele: "T", haplogroup: "U5b", lineageType: "MATERNAL_MTDNA", description: "Cheddar Man / WHG marker" },

  // Haplogroup H (Helena) and Subclades
  { name: "2706G", rsid: "rs2853499", chromosome: "MT", position: 2706, ancestralAllele: "A", derivedAllele: "G", haplogroup: "H", lineageType: "MATERNAL_MTDNA", description: "Haplogroup H defining base (Helena)" },
  { name: "7028C", rsid: "rs28358280", chromosome: "MT", position: 7028, ancestralAllele: "T", derivedAllele: "C", haplogroup: "H", lineageType: "MATERNAL_MTDNA", description: "Primary diagnostic marker for Haplogroup H" },
  { name: "3010A", rsid: "rs28358281", chromosome: "MT", position: 3010, ancestralAllele: "G", derivedAllele: "A", haplogroup: "H1", lineageType: "MATERNAL_MTDNA", description: "Western European Franco-Cantabrian H1 marker" },
  { name: "16189C", rsid: "rs2853515", chromosome: "MT", position: 16189, ancestralAllele: "T", derivedAllele: "C", haplogroup: "H1", lineageType: "MATERNAL_MTDNA", description: "H1 post-glacial expansion marker" },
  { name: "1438A", rsid: "rs2853500", chromosome: "MT", position: 1438, ancestralAllele: "G", derivedAllele: "A", haplogroup: "H2", lineageType: "MATERNAL_MTDNA", description: "Central European Neolithic H2 marker" },
  { name: "6776C", rsid: "rs28358282", chromosome: "MT", position: 6776, ancestralAllele: "T", derivedAllele: "C", haplogroup: "H3", lineageType: "MATERNAL_MTDNA", description: "Iberian & Sardinian H3 marker" },

  // Haplogroup J1c
  { name: "14798C", rsid: "rs2853501", chromosome: "MT", position: 14798, ancestralAllele: "T", derivedAllele: "C", haplogroup: "J1c", lineageType: "MATERNAL_MTDNA", description: "Neolithic Farmer J1c marker" },
  { name: "16069T", rsid: "rs2853516", chromosome: "MT", position: 16069, ancestralAllele: "C", derivedAllele: "T", haplogroup: "J1c", lineageType: "MATERNAL_MTDNA", description: "Early Agronomist maternal line" },

  // Haplogroup T2
  { name: "8697A", rsid: "rs2853503", chromosome: "MT", position: 8697, ancestralAllele: "G", derivedAllele: "A", haplogroup: "T2", lineageType: "MATERNAL_MTDNA", description: "Yamnaya & Neolithic T2 marker" },
  { name: "16126C", rsid: "rs2853517", chromosome: "MT", position: 16126, ancestralAllele: "T", derivedAllele: "C", haplogroup: "T2", lineageType: "MATERNAL_MTDNA", description: "Tara maternal clade marker" },

  // Haplogroup K1a
  { name: "9055A", rsid: "rs2853502", chromosome: "MT", position: 9055, ancestralAllele: "G", derivedAllele: "A", haplogroup: "K1a", lineageType: "MATERNAL_MTDNA", description: "Alpine / Cardial Mediterranean Ötzi marker" },
  { name: "10550G", rsid: "rs2853518", chromosome: "MT", position: 10550, ancestralAllele: "A", derivedAllele: "G", haplogroup: "K1a", lineageType: "MATERNAL_MTDNA", description: "Katrine subclade marker" },

  // Haplogroup D4
  { name: "8414T", rsid: "rs2853504", chromosome: "MT", position: 8414, ancestralAllele: "C", derivedAllele: "T", haplogroup: "D4", lineageType: "MATERNAL_MTDNA", description: "East Asian / Siberian D4 marker" },
  { name: "14668T", rsid: "rs2853519", chromosome: "MT", position: 14668, ancestralAllele: "C", derivedAllele: "T", haplogroup: "D4", lineageType: "MATERNAL_MTDNA", description: "Northern East Asian diagnostic base" },

  // Haplogroup A2
  { name: "663G", rsid: "rs2853505", chromosome: "MT", position: 663, ancestralAllele: "A", derivedAllele: "G", haplogroup: "A2", lineageType: "MATERNAL_MTDNA", description: "Indigenous American A2 founder marker" },
  { name: "8794T", rsid: "rs2853520", chromosome: "MT", position: 8794, ancestralAllele: "C", derivedAllele: "T", haplogroup: "A2", lineageType: "MATERNAL_MTDNA", description: "Beringian expansion marker" }
];
