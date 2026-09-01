import { SampleDnaKit } from '../types/haplogroup';

export const SAMPLE_DNA_KITS: SampleDnaKit[] = [
  {
    id: "celtic_sample",
    title: "Western European (Celtic)",
    subtitle: "Y-DNA: R1b-L21 (Insular Celtic) • mtDNA: U5b (Hunter-Gatherer)",
    description: "High Atlantic Celtic paternal profile typical of Ireland/Scotland, combined with ancient indigenous European hunter-gatherer maternal lineage.",
    paternalHaplo: "R1b-L21",
    maternalHaplo: "U5b",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs9786481\tY\t14896238\tG
rs2032608\tY\t14094000\tA
rs2032624\tY\t18500000\tA
rs9786184\tY\t18512340\tC
rs13303975\tY\t18515000\tA
rs13303980\tY\t18517000\tT
rs34276300\tY\t18700000\tA
rs11799226\tY\t18750000\tA
rs12338\tY\t18800000\tC
rs16980479\tY\t18850000\tC
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853510\tMT\t12308\tG
rs2853511\tMT\t12372\tA
rs2853512\tMT\t7768\tG
rs2853513\tMT\t16270\tT
rs2853499\tMT\t2706\tA
rs28358280\tMT\t7028\tT`
  },
  {
    id: "alpine_sample",
    title: "Central European / Alpine",
    subtitle: "Y-DNA: R1b-U152 (Italo-Celtic) • mtDNA: H1 (Western Matriarch)",
    description: "Typical profile of North Italian, Swiss, or French Alpine heritage, featuring the Roman/Celtic U152 clade and the post-glacial H1 maternal founder.",
    paternalHaplo: "R1b-U152",
    maternalHaplo: "H1",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs2032624\tY\t18500000\tA
rs9786184\tY\t18512340\tC
rs13303975\tY\t18515000\tA
rs13303980\tY\t18517000\tT
rs34276300\tY\t18700000\tA
rs12338\tY\t18800000\tT
rs11799226\tY\t18750000\tG
rs16980479\tY\t18850000\tC
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853499\tMT\t2706\tG
rs28358280\tMT\t7028\tC
rs28358281\tMT\t3010\tA
rs2853515\tMT\t16189\tC`
  },
  {
    id: "nordic_sample",
    title: "Nordic / Scandinavian",
    subtitle: "Y-DNA: I1-M253 (Viking Y-DNA) • mtDNA: J1c (Neolithic Agronomist)",
    description: "Iconic Scandinavian paternal lineage common across Sweden and Norway paired with the early agricultural maternal line J1c.",
    paternalHaplo: "I1-M253",
    maternalHaplo: "J1c",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs2032608\tY\t14094000\tC
rs9341278\tY\t15026934\tT
rs17315758\tY\t14436000\tA
rs9786184\tY\t18512340\tT
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853501\tMT\t14798\tC
rs2853516\tMT\t16069\tT
rs28358280\tMT\t7028\tT`
  },
  {
    id: "slavic_sample",
    title: "Eastern European / Steppe",
    subtitle: "Y-DNA: R1a-M417 (Corded Ware) • mtDNA: T2 (Steppe Pastoralist)",
    description: "Steppe pastoralist paternal and maternal lineages prominent across Poland, Ukraine, and Eastern Europe.",
    paternalHaplo: "R1a-M417",
    maternalHaplo: "T2",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs17315756\tY\t18100000\tA
rs17315757\tY\t18102000\tG
rs78931205\tY\t18105000\tT
rs9786184\tY\t18512340\tT
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853503\tMT\t8697\tA
rs2853517\tMT\t16126\tC`
  },
  {
    id: "mediterranean_sample",
    title: "Balkan / Mediterranean",
    subtitle: "Y-DNA: E-V13 (Balkan Bronze Age) • mtDNA: K1a (Ötzi/Cardial)",
    description: "Southeast European paternal expansion with Mediterranean Neolithic farmer maternal lineage.",
    paternalHaplo: "E-V13",
    maternalHaplo: "K1a",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs9786481\tY\t14896238\tC
rs9306847\tY\t14096000\tC
rs9306848\tY\t14097100\tT
rs9786184\tY\t18512340\tT
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853502\tMT\t9055\tA
rs2853518\tMT\t10550\tG`
  },
  {
    id: "east_asian_sample",
    title: "East Asian (Han / Sino-Tibetan)",
    subtitle: "Y-DNA: O-M175 (O2-M122) • mtDNA: D4 (East Asian / Siberian)",
    description: "Major paternal lineage associated with Yellow River agricultural expansion and Northern East Asian maternal founder.",
    paternalHaplo: "O-M175",
    maternalHaplo: "D4",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs2032651\tY\t16550000\tdel
rs2032652\tY\t16552000\tC
rs9786184\tY\t18512340\tT
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853497\tMT\t489\tC
rs2853498\tMT\t10400\tT
rs2853504\tMT\t8414\tT
rs2853519\tMT\t14668\tT`
  },
  {
    id: "african_sample",
    title: "West African (Niger-Congo)",
    subtitle: "Y-DNA: E1b1a-M2 (Bantu Expansion) • mtDNA: L2 (Sub-Saharan)",
    description: "Predominant paternal and maternal lineages of West and Central Africa and the African Diaspora.",
    paternalHaplo: "E1b1a",
    maternalHaplo: "L2",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs9786481\tY\t14896238\tC
rs2032597\tY\t14095400\tG
rs9786184\tY\t18512340\tT
rs2853496\tMT\t16278\tT`
  },
  {
    id: "indigenous_american_sample",
    title: "Indigenous American (Beringian)",
    subtitle: "Y-DNA: Q-M242 (Q-M3 Clovis/Maya) • mtDNA: A2 (Founder Lineage)",
    description: "Ancient founding lineages that crossed the Bering land bridge into the Americas.",
    paternalHaplo: "Q-M242",
    maternalHaplo: "A2",
    rawSnippetContent: `# rsid\tchromosome\tposition\tgenotype
rs9306841\tY\t13533801\tT
rs3894\tY\t17045000\tT
rs3895\tY\t17047000\tT
rs9786184\tY\t18512340\tT
rs2853493\tMT\t769\tA
rs2853494\tMT\t1018\tA
rs2853495\tMT\t3594\tT
rs2853491\tMT\t8701\tG
rs2853492\tMT\t10398\tG
rs2853505\tMT\t663\tG
rs2853520\tMT\t8794\tT`
  }
];
