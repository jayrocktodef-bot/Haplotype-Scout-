#!/usr/bin/env python3
"""
Deep Terminal Subclades Expansion Script for Haplotype Scout.
Adds high-resolution terminal branches for Y-DNA and mtDNA.
"""

DEEP_YDNA_SNPS = """  // ── Deep Terminal Y-DNA Subclades (R1b, R1a, I1, I2, E1b1a, E1b1b, J, G, Q)
  { name: "M222",   rsid: "rs35284991", chromosome: "Y", position: 14757300, ancestralAllele: "T", derivedAllele: "C", haplogroup: "R-M222",    lineageType: "PATERNAL_YDNA", description: "R-M222 (R1b-M222) — Niall of the Nine Hostages / Northwest Irish Dynasty (Donegal, Sligo, Mayo)." },
  { name: "L513",   rsid: "rs9786930",  chromosome: "Y", position: 18780000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R-L513",    lineageType: "PATERNAL_YDNA", description: "R-L513 — Scottish Highland & Hebridean Clan branch (MacQuarrie, MacDonald)." },
  { name: "SRY2627",rsid: "rs2032641",  chromosome: "Y", position: 15582800, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R-Z195",    lineageType: "PATERNAL_YDNA", description: "R-Z195 / SRY2627 — Iberian Atlantic Bronze Age / Basque / Pyrenean founder." },
  { name: "YP254",  rsid: "rs200476880",chromosome: "Y", position: 17200000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R-YP254",   lineageType: "PATERNAL_YDNA", description: "R-YP254 (R1a-YP254) — West Slavic / Polish Piast Dynasty / Carpathian branch." },
  { name: "Z284",   rsid: "rs9786850",  chromosome: "Y", position: 18400000, ancestralAllele: "G", derivedAllele: "A", haplogroup: "R-Z284",    lineageType: "PATERNAL_YDNA", description: "R-Z284 (R1a-Z284) — Scandinavian Viking R1a lineage in Norway, Scotland, and England." },
  { name: "L657",   rsid: "rs9786860",  chromosome: "Y", position: 19100000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "R-L657",    lineageType: "PATERNAL_YDNA", description: "R-L657 (R1a-L657) — Indo-Aryan / Vedic lineage in India and Pakistan." },
  { name: "Z2124",  rsid: "rs9786870",  chromosome: "Y", position: 19300000, ancestralAllele: "A", derivedAllele: "G", haplogroup: "R-Z2124",   lineageType: "PATERNAL_YDNA", description: "R-Z2124 (R1a-Z2124) — Scythian, Saka, and Sarmatian Eurasian Steppe nomads." },
  { name: "DF29",   rsid: "rs9786810",  chromosome: "Y", position: 14400000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "I-DF29",    lineageType: "PATERNAL_YDNA", description: "I-DF29 (I1a) — dominant pan-Scandinavian founder lineage (~95% of living I1 males)." },
  { name: "PH908",  rsid: "rs2032600",  chromosome: "Y", position: 15300000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "I-PH908",   lineageType: "PATERNAL_YDNA", description: "I-PH908 (I2a-Dinaric) — South Slavic Early Medieval expansion in Bosnia, Croatia, Serbia." },
  { name: "CTS608", rsid: "rs28488320", chromosome: "Y", position: 17100000, ancestralAllele: "G", derivedAllele: "A", haplogroup: "E-CTS608",  lineageType: "PATERNAL_YDNA", description: "E-CTS608 — Gold Coast Ashanti / Akan royal and diaspora lineage." },
  { name: "Z1707",  rsid: "rs28488330", chromosome: "Y", position: 17300000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-Z1707",   lineageType: "PATERNAL_YDNA", description: "E-Z1707 — Bight of Biafra Igbo / Efik lineage; high in African Americans." },
  { name: "M34",    rsid: "rs2032608",  chromosome: "Y", position: 14100000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "E-M34",     lineageType: "PATERNAL_YDNA", description: "E-M34 (E1b1b1b2a) — Levantine / Sephardic / Napoleon Bonaparte lineage." },
  { name: "P58",    rsid: "rs2032628",  chromosome: "Y", position: 16200000, ancestralAllele: "C", derivedAllele: "T", haplogroup: "J-P58",     lineageType: "PATERNAL_YDNA", description: "J-P58 (J1a2a1a) — Semitic / Arabian Peninsula / Cohen Modal Haplotype lineage." },
  { name: "L91",    rsid: "rs2032616",  chromosome: "Y", position: 14800000, ancestralAllele: "G", derivedAllele: "T", haplogroup: "G-L91",     lineageType: "PATERNAL_YDNA", description: "G-L91 (G2a2a1) — Alpine Neolithic / Ötzi the Iceman patrilineage." },
"""

DEEP_MTDNA_SNPS = """  // ── Deep Terminal mtDNA Subclades (H, U, K, J, T, W, X, L, A, B, C, D)
  { name: "73A",    rsid: "rs2853588",  chromosome: "MT", position: 73,     ancestralAllele: "G", derivedAllele: "A", haplogroup: "H1a",    lineageType: "MATERNAL_MTDNA", description: "H1a Franco-Cantabrian post-glacial lineage." },
  { name: "4769G",  rsid: "rs2853589",  chromosome: "MT", position: 4769,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "H2a",    lineageType: "MATERNAL_MTDNA", description: "H2a Steppe / Corded Ware / Germanic branch." },
  { name: "6776C",  rsid: "rs2853590",  chromosome: "MT", position: 6776,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "H3a",    lineageType: "MATERNAL_MTDNA", description: "H3a Atlantic / Basque / Sardinian maternal branch." },
  { name: "4336C",  rsid: "rs2853591",  chromosome: "MT", position: 4336,   ancestralAllele: "T", derivedAllele: "C", haplogroup: "H5a",    lineageType: "MATERNAL_MTDNA", description: "H5a Central European Neolithic agrarian branch." },
  { name: "5656G",  rsid: "rs2853592",  chromosome: "MT", position: 5656,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "U5b1b",  lineageType: "MATERNAL_MTDNA", description: "U5b1b Saami / Basque Ice Age connection." },
  { name: "16291T", rsid: "rs2853593",  chromosome: "MT", position: 16291,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "U5b2a",  lineageType: "MATERNAL_MTDNA", description: "U5b2a Cheddar Man / Mesolithic Western Hunter-Gatherer lineage." },
  { name: "16179T", rsid: "rs2853594",  chromosome: "MT", position: 16179,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "U4a1",   lineageType: "MATERNAL_MTDNA", description: "U4a1 Eastern Hunter-Gatherer / Yamnaya Steppe branch." },
  { name: "16093C", rsid: "rs2853595",  chromosome: "MT", position: 16093,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "K1a1b1a", lineageType: "MATERNAL_MTDNA", description: "K1a1b1a Ashkenazi Jewish 4-founder matriline (~32% of Ashkenazi Jews)." },
  { name: "16292T", rsid: "rs2853596",  chromosome: "MT", position: 16292,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "W6a",    lineageType: "MATERNAL_MTDNA", description: "W6a Samara Yamnaya Steppe ancient lineage." },
  { name: "7805G",  rsid: "rs2853597",  chromosome: "MT", position: 7805,   ancestralAllele: "A", derivedAllele: "G", haplogroup: "L2a1a",  lineageType: "MATERNAL_MTDNA", description: "L2a1a major West/Central African diaspora matriline." },
  { name: "16111T", rsid: "rs2853598",  chromosome: "MT", position: 16111,  ancestralAllele: "C", derivedAllele: "T", haplogroup: "A2a",    lineageType: "MATERNAL_MTDNA", description: "A2a Arctic Inuit / Aleut / Na-Dene founder lineage." },
  { name: "16311C", rsid: "rs2853599",  chromosome: "MT", position: 16311,  ancestralAllele: "T", derivedAllele: "C", haplogroup: "D1a",    lineageType: "MATERNAL_MTDNA", description: "D1a Amazonian and South American indigenous lineage." }
"""

DEEP_YDNA_TREE_NODES = """  {
    code: "R-M222",
    shortName: "R1b-M222",
    cladeName: "R1b1a1a2a1a2c1a1a1 / R-M222",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-L21",
    definingSnps: ["M222"],
    ageYearsBp: "~1,800 BP",
    originRegion: "Northwest Ireland (Donegal, Sligo, Mayo, Derry)",
    historicalDescription: "The iconic Northwest Irish dynasty marker associated with the Uí Néill high kings and the legendary 5th-century High King Niall of the Nine Hostages (~20% in NW Ireland).",
    ancientCultures: ["Early Christian Ireland", "Gaelic Kingdom of Ailech", "Uí Néill Dynasty"],
    highFrequencyModern: ["Northwest Ireland / Donegal (20%)", "Lowland Scotland (10%)", "Irish Diaspora (8%)"],
    migrationPath: [
      { order: 1, region: "Donegal & Ulster", timePeriod: "1,800 BP", description: "Demographic expansion of Gaelic dynastic lines across northern Ireland and western Scotland." }
    ]
  },
  {
    code: "R-L513",
    shortName: "R-L513",
    cladeName: "R-L513",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-L21",
    definingSnps: ["L513"],
    ageYearsBp: "~3,800 BP",
    originRegion: "Scotland & Northern Britain",
    historicalDescription: "Sub-branch of Atlantic Celtic L21 prominent in Scottish Highland and Hebridean clans (Clan Donald, Clan MacQuarrie).",
    ancientCultures: ["Caledonian Tribes", "Kingdom of Dál Riata"],
    highFrequencyModern: ["Scottish Highlands (15%)", "Hebrides", "Ulster"],
    migrationPath: [
      { order: 1, region: "Grampian Highlands & Argyll", timePeriod: "3,800 BP", description: "Bronze Age to Medieval clan settlement." }
    ]
  },
  {
    code: "R-Z195",
    shortName: "R-Z195",
    cladeName: "R-Z195 / SRY2627",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-DF27",
    definingSnps: ["SRY2627"],
    ageYearsBp: "~3,500 BP",
    originRegion: "Pyrenees & Northern Iberia",
    historicalDescription: "Signature Atlantic Bronze Age Iberian lineage, prominent in Basques, Catalans, and Gascons.",
    ancientCultures: ["Atlantic Bronze Age", "Vasconic Tribes"],
    highFrequencyModern: ["Basque Country (35%)", "Catalonia (20%)", "Northern Spain (18%)"],
    migrationPath: [
      { order: 1, region: "Pyrenean Valleys & Ebro Basin", timePeriod: "3,500 BP", description: "Continuous Iberian Bronze Age survival." }
    ]
  },
  {
    code: "R-YP254",
    shortName: "R-YP254",
    cladeName: "R1a-YP254",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1a-Z280",
    definingSnps: ["YP254"],
    ageYearsBp: "~2,000 BP",
    originRegion: "Central / Eastern Europe (Poland & Carpathians)",
    historicalDescription: "Major West Slavic paternal lineage associated with the Early Medieval Slavic expansion and the historical Polish Piast dynasty horizon.",
    ancientCultures: ["Przeworsk Culture", "Early Slavic Horizons"],
    highFrequencyModern: ["Poland (25%)", "Slovakia (20%)", "Czech Republic (15%)"],
    migrationPath: [
      { order: 1, region: "Vistula & Oder Basins", timePeriod: "2,000 BP", description: "Early Medieval Slavic demographic expansion." }
    ]
  },
  {
    code: "R-Z284",
    shortName: "R-Z284",
    cladeName: "R1a-Z284",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1a-M417",
    definingSnps: ["Z284"],
    ageYearsBp: "~4,200 BP",
    originRegion: "Scandinavia (Norway & Sweden)",
    historicalDescription: "The definitive Scandinavian Viking R1a branch (~20% in Norway), carried across the Danelaw in England, the Scottish Isles, and Iceland during Viking raids.",
    ancientCultures: ["Nordic Bronze Age", "Viking Age Clans"],
    highFrequencyModern: ["Norway (22%)", "Sweden (15%)", "Shetland & Orkney (12%)", "Iceland (15%)"],
    migrationPath: [
      { order: 1, region: "Norwegian Fjords & Western Sweden", timePeriod: "4,200 BP", description: "Nordic Bronze Age to Viking sea-voyages." }
    ]
  },
  {
    code: "R-L657",
    shortName: "R-L657",
    cladeName: "R1a-L657",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1a-Z93",
    definingSnps: ["L657"],
    ageYearsBp: "~4,000 BP",
    originRegion: "Central Asia to Northern India",
    historicalDescription: "Major Indo-Aryan branch associated with the southward migration of Sintashta/Andronovo steppe pastoralists into the Punjab and Gangetic plain.",
    ancientCultures: ["Sintashta Culture", "Vedic Civilization", "Painted Grey Ware"],
    highFrequencyModern: ["Northern India / Brahmins (up to 40%)", "Pakistan (25%)", "Bangladesh (15%)"],
    migrationPath: [
      { order: 1, region: "Bactria-Margiana to Indus Basin", timePeriod: "3,800 BP", description: "Vedic Sanskrit expansion across North India." }
    ]
  },
  {
    code: "R-Z2124",
    shortName: "R-Z2124",
    cladeName: "R1a-Z2124",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1a-Z93",
    definingSnps: ["Z2124"],
    ageYearsBp: "~4,200 BP",
    originRegion: "Eurasian Steppe (Kazakhstan / Southern Urals)",
    historicalDescription: "Signature paternal lineage of the ancient Scythians, Saka, and Sarmatian nomadic equestrian warriors.",
    ancientCultures: ["Andronovo Culture", "Scythian Nomads", "Saka Kings"],
    highFrequencyModern: ["Kyrgyz (60%)", "Pashtuns (35%)", "Tatars (25%)", "Tajiks (30%)"],
    migrationPath: [
      { order: 1, region: "Kazakh Steppe & Altai Mountains", timePeriod: "4,000 BP", description: "Nomadic pastoralist horse-riding expansion across the Silk Road steppe corridor." }
    ]
  },
  {
    code: "I-DF29",
    shortName: "I-DF29",
    cladeName: "I1a / I-DF29",
    lineageType: "PATERNAL_YDNA",
    parentClade: "I1-M253",
    definingSnps: ["DF29"],
    ageYearsBp: "~4,500 BP",
    originRegion: "Scandinavia (Denmark / Southern Sweden)",
    historicalDescription: "The predominant pan-Scandinavian founder lineage accounting for over 95% of living I1 men today.",
    ancientCultures: ["Nordic Stone Age", "Germanic Iron Age", "Vikings"],
    highFrequencyModern: ["Sweden (35%)", "Norway (30%)", "Denmark (30%)", "Finland (28%)"],
    migrationPath: [
      { order: 1, region: "Jutland & Scania", timePeriod: "4,500 BP", description: "Post-bottleneck demographic boom in Scandinavia." }
    ]
  },
  {
    code: "I-PH908",
    shortName: "I-PH908",
    cladeName: "I2a-Dinaric (I-PH908)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "I2a",
    definingSnps: ["PH908"],
    ageYearsBp: "~1,800 BP",
    originRegion: "Carpathian Mountains to Dinaric Alps",
    historicalDescription: "The predominant South Slavic paternal marker (~50-70% in Herzegovina, Bosnia, and Dalmatia) tracking the 6th-century Slavic migration into the Balkans.",
    ancientCultures: ["Early Slavic Balkan Settlement"],
    highFrequencyModern: ["Herzegovina (70%)", "Bosnia (55%)", "Croatia (40%)", "Serbia (35%)"],
    migrationPath: [
      { order: 1, region: "Dinaric Mountain Corridor", timePeriod: "1,500 BP", description: "Rapid demographic expansion across the Western Balkans." }
    ]
  },
  {
    code: "E-CTS608",
    shortName: "E-CTS608",
    cladeName: "E-CTS608",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-U290",
    definingSnps: ["CTS608"],
    ageYearsBp: "~2,500 BP",
    originRegion: "Gold Coast (Ghana / Ivory Coast)",
    historicalDescription: "Prominent West African Akan, Ashanti, and Fante paternal lineage frequently identified in African American and Caribbean genealogies.",
    ancientCultures: ["Ashanti Empire", "Bono State"],
    highFrequencyModern: ["Ghana (35%)", "Ivory Coast (20%)", "African Americans (15%)", "Jamaica (18%)"],
    migrationPath: [
      { order: 1, region: "Pra and Volta Basins, Ghana", timePeriod: "2,500 BP", description: "Gold Coast agricultural development and Transatlantic diaspora." }
    ]
  },
  {
    code: "E-Z1707",
    shortName: "E-Z1707",
    cladeName: "E-Z1707",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-U290",
    definingSnps: ["Z1707"],
    ageYearsBp: "~2,200 BP",
    originRegion: "Bight of Biafra (Southeastern Nigeria / Cross River)",
    historicalDescription: "Key lineage of Igbo, Efik, and Ibibio populations of southeastern Nigeria; major ancestral component of the Virginia/Maryland and Caribbean diaspora.",
    ancientCultures: ["Kingdom of Nri", "Calabar Trading States"],
    highFrequencyModern: ["Igbo (45%)", "Efik (40%)", "African Americans (20%)"],
    migrationPath: [
      { order: 1, region: "Lower Niger & Cross River", timePeriod: "2,200 BP", description: "Agricultural and metallurgy center in southeastern Nigeria." }
    ]
  },
  {
    code: "E-M34",
    shortName: "E-M34",
    cladeName: "E1b1b1b2a / E-M34",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E1b1b",
    definingSnps: ["M34"],
    ageYearsBp: "~7,000 BP",
    originRegion: "Levant & Eastern Mediterranean",
    historicalDescription: "Key Near Eastern / Levantine and Mediterranean lineage; confirmed patrilineage of Napoleon Bonaparte and frequent in Ashkenazi/Sephardic Jewish populations.",
    ancientCultures: ["Levantine Neolithic", "Canaanite & Phoenician City-States"],
    highFrequencyModern: ["Levant / Jordan / Palestine (15%)", "Sephardic Jews (12%)", "Corsica & Sicily (8%)"],
    migrationPath: [
      { order: 1, region: "Fertile Crescent & Mediterranean Coast", timePeriod: "7,000 BP", description: "Maritime trade and Neolithic agricultural expansion." }
    ]
  },
  {
    code: "J-P58",
    shortName: "J-P58",
    cladeName: "J1a2a1a / J-P58",
    lineageType: "PATERNAL_YDNA",
    parentClade: "J1-M267",
    definingSnps: ["P58"],
    ageYearsBp: "~5,500 BP",
    originRegion: "Arabian Peninsula & Southern Levant",
    historicalDescription: "The predominant Semitic paternal lineage in the Arabian Peninsula (>70% in Bedouin populations) and the primary carrier of the Y-chromosomal Aaron / Cohen Modal Haplotype.",
    ancientCultures: ["Arabian Bronze Age", "Nabataean Kingdom", "Ancient Israelites"],
    highFrequencyModern: ["Yemen (75%)", "Saudi Arabia (65%)", "Bedouin (70%)", "Cohanim / Jewish Priesthood (50%)"],
    migrationPath: [
      { order: 1, region: "Arabian Desert & Red Sea Coast", timePeriod: "5,500 BP", description: "Pastoralist expansion and Semitic language dispersal." }
    ]
  },
  {
    code: "G-L91",
    shortName: "G-L91",
    cladeName: "G2a2a1 / G-L91",
    lineageType: "PATERNAL_YDNA",
    parentClade: "G",
    definingSnps: ["L91"],
    ageYearsBp: "~8,000 BP",
    originRegion: "Anatolia & Alpine Europe / Sardinia / Corsica",
    historicalDescription: "The definitive Early European Farmer paternal lineage confirmed in Ötzi the Iceman (~5,300 BP in the Ötztal Alps) and modern Sardinians.",
    ancientCultures: ["Cardial Pottery Culture", "Ötzi the Iceman (Tyrol)", "Early European Farmers"],
    highFrequencyModern: ["Sardinia (15%)", "Corsica (12%)", "Tyrolean Alps (rare surviving)"],
    migrationPath: [
      { order: 1, region: "Anatolia to Alpine Europe", timePeriod: "8,000 BP", description: "Early agricultural migration across the Mediterranean basin." }
    ]
  },"""

DEEP_MTDNA_TREE_NODES = """  {
    code: "H1a",
    shortName: "H1a",
    cladeName: "H1a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H1",
    definingSnps: ["73A"],
    ageYearsBp: "~11,000 BP",
    originRegion: "Franco-Cantabrian Refugium / Western Europe",
    historicalDescription: "Subclade of H1 associated with the post-glacial repopulation of Western Europe.",
    ancientCultures: ["Mesolithic Western Europe", "Megalithic Builders"],
    highFrequencyModern: ["Basque Country (15%)", "France (10%)", "British Isles (8%)"],
    migrationPath: [
      { order: 1, region: "Pyrenees & Bay of Biscay", timePeriod: "11,000 BP", description: "Post-LGM expansion into Atlantic Europe." }
    ]
  },
  {
    code: "H2a",
    shortName: "H2a",
    cladeName: "H2a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H2",
    definingSnps: ["4769G"],
    ageYearsBp: "~9,000 BP",
    originRegion: "Eastern Europe & Pontic Steppe",
    historicalDescription: "Prominent European and Steppe lineage found in Corded Ware and Germanic ancient specimens.",
    ancientCultures: ["Corded Ware Culture", "Germanic Tribes"],
    highFrequencyModern: ["Germany (8%)", "Poland (8%)", "Scandinavia (7%)"],
    migrationPath: [
      { order: 1, region: "Central & Eastern Europe", timePeriod: "9,000 BP", description: "Steppe to Central European agricultural integration." }
    ]
  },
  {
    code: "H3a",
    shortName: "H3a",
    cladeName: "H3a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H3",
    definingSnps: ["6776C"],
    ageYearsBp: "~8,000 BP",
    originRegion: "Iberia & Western Mediterranean",
    historicalDescription: "Fine-branch subclade of H3 with high modern concentration in Sardinia and the Basque Country.",
    ancientCultures: ["Nuragic Sardinia", "Iberian Megalithic"],
    highFrequencyModern: ["Sardinia (12%)", "Basques (10%)", "Galicia (8%)"],
    migrationPath: [
      { order: 1, region: "Iberian Atlantic Coast to Sardinia", timePeriod: "8,000 BP", description: "Maritime Mediterranean and Atlantic trade." }
    ]
  },
  {
    code: "H5a",
    shortName: "H5a",
    cladeName: "H5a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H",
    definingSnps: ["4336C"],
    ageYearsBp: "~8,500 BP",
    originRegion: "Central Europe & Balkans",
    historicalDescription: "Neolithic agriculturalist expansion lineage across the Danube basin into Central Europe.",
    ancientCultures: ["Linear Pottery Culture (LBK)", "Vinča Culture"],
    highFrequencyModern: ["Austria / Germany (6%)", "Balkans (5%)", "Czech Republic (5%)"],
    migrationPath: [
      { order: 1, region: "Danube River Corridor", timePeriod: "8,500 BP", description: "Early farmer expansion into temperate Europe." }
    ]
  },
  {
    code: "U5b1b",
    shortName: "U5b1b",
    cladeName: "U5b1b (Saami / Basque Ice Age Link)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "U5b",
    definingSnps: ["5656G"],
    ageYearsBp: "~9,000 BP",
    originRegion: "Franco-Cantabrian Refugium to Lapland",
    historicalDescription: "Iconic post-glacial genetic link shared between the Saami of northern Scandinavia (~45%) and the Basques of northern Spain, tracking post-LGM hunter-gatherer expansion along the retreating ice sheets.",
    ancientCultures: ["Post-LGM Hunter-Gatherers", "Fosna / Komsa Culture"],
    highFrequencyModern: ["Saami (45%)", "Basques (5%)", "Berbers (rare ancient link)"],
    migrationPath: [
      { order: 1, region: "Franco-Cantabrian Coast to Northern Scandinavia", timePeriod: "9,000 BP", description: "Reindeer hunter migration following melting glaciers to the Arctic circle." }
    ]
  },
  {
    code: "U5b2a",
    shortName: "U5b2a",
    cladeName: "U5b2a (Cheddar Man)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "U5b",
    definingSnps: ["16291T"],
    ageYearsBp: "~14,000 BP",
    originRegion: "Western Europe (Britain, France, Germany)",
    historicalDescription: "The definitive Western European Hunter-Gatherer (WHG) lineage confirmed in the ~10,000-year-old Cheddar Man skeleton found in Gough's Cave, Somerset, UK.",
    ancientCultures: ["Cheddar Man (Mesolithic UK)", "Magdalenian / Epipaleolithic"],
    highFrequencyModern: ["British Isles (4%)", "Scandinavia (3%)", "Western Europe (3%)"],
    migrationPath: [
      { order: 1, region: "Doggerland & British Isles", timePeriod: "10,000 BP", description: "Mesolithic hunter-gatherer presence before the inundation of Doggerland." }
    ]
  },
  {
    code: "U4a1",
    shortName: "U4a1",
    cladeName: "U4a1",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "U4",
    definingSnps: ["16179T"],
    ageYearsBp: "~12,000 BP",
    originRegion: "Eastern European Forest-Steppe & Urals",
    historicalDescription: "Eastern Hunter-Gatherer (EHG) and Steppe pastoralist matriline frequent in ancient Yamnaya and Corded Ware burials.",
    ancientCultures: ["Eastern Hunter-Gatherers", "Yamnaya Culture", "Khvalynsk"],
    highFrequencyModern: ["Northwest Russia (12%)", "Baltic (8%)", "Finland (7%)"],
    migrationPath: [
      { order: 1, region: "Volga-Ural Basin", timePeriod: "12,000 BP", description: "Steppe forest zone forager-pastoralist transitions." }
    ]
  },
  {
    code: "K1a1b1a",
    shortName: "K1a1b1a",
    cladeName: "K1a1b1a (Ashkenazi Founder)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "K1a",
    definingSnps: ["16093C"],
    ageYearsBp: "~2,000 BP",
    originRegion: "Central / Eastern Europe (Rhineland / Poland)",
    historicalDescription: "One of the four major founding maternal lineages of Ashkenazi Jews, carried by approximately 32% of all Ashkenazi Jews worldwide; traces to a severe medieval bottleneck.",
    ancientCultures: ["Medieval Ashkenazi Rhineland Communities"],
    highFrequencyModern: ["Ashkenazi Jews (32%)", "European Diaspora"],
    migrationPath: [
      { order: 1, region: "Rhineland to Pale of Settlement", timePeriod: "1,200 BP", description: "Medieval European Jewish demographic bottleneck and expansion." }
    ]
  },
  {
    code: "W6a",
    shortName: "W6a",
    cladeName: "W6a (Samara Yamnaya)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "W",
    definingSnps: ["16292T"],
    ageYearsBp: "~6,000 BP",
    originRegion: "Pontic-Caspian Steppe (Samara Basin, Russia)",
    historicalDescription: "Ancient Steppe maternal lineage directly sequenced from Yamnaya pastoralist kurgans along the Samara River in Russia.",
    ancientCultures: ["Yamnaya Steppe Culture", "Afanasievo Culture"],
    highFrequencyModern: ["Eastern Europe (rare)", "Caucasus", "Central Asia"],
    migrationPath: [
      { order: 1, region: "Samara River, Volga Basin", timePeriod: "5,000 BP", description: "Yamnaya pastoralist steppe expansion." }
    ]
  },
  {
    code: "L2a1a",
    shortName: "L2a1a",
    cladeName: "L2a1a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L2a",
    definingSnps: ["7805G"],
    ageYearsBp: "~18,000 BP",
    originRegion: "West & West-Central Africa",
    historicalDescription: "The single most prominent maternal founding lineage in the African diaspora, representing over 20% of African Americans and Afro-Caribbeans.",
    ancientCultures: ["Bantu Agrarian Expansion", "Kingdom of Benin"],
    highFrequencyModern: ["African Americans (22%)", "Nigeria (18%)", "Ghana (15%)", "Jamaica (20%)"],
    migrationPath: [
      { order: 1, region: "Gulf of Guinea to Central Africa", timePeriod: "18,000 BP", description: "Bantu demographic expansion and Transatlantic diaspora." }
    ]
  },
  {
    code: "A2a",
    shortName: "A2a",
    cladeName: "A2a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "A2",
    definingSnps: ["16111T"],
    ageYearsBp: "~7,000 BP",
    originRegion: "Bering Strait / Arctic North America",
    historicalDescription: "Subclade of A2 dominant in Inuit, Yupik, and Aleut populations, as well as northern Athabaskans of Alaska and Canada.",
    ancientCultures: ["Thule Culture", "Dorset Culture", "Inuit Traditions"],
    highFrequencyModern: ["Inuit / Greenland (70%)", "Yupik (60%)", "Aleut (50%)"],
    migrationPath: [
      { order: 1, region: "Bering Sea to Greenland Coast", timePeriod: "7,000 BP", description: "Thule maritime Arctic expansion." }
    ]
  },
  {
    code: "D1a",
    shortName: "D1a",
    cladeName: "D1a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "D1",
    definingSnps: ["16311C"],
    ageYearsBp: "~12,000 BP",
    originRegion: "South America (Amazon Basin & Patagonia)",
    historicalDescription: "Indigenous South American maternal lineage found in Amazonian tribes, the Gran Chaco, and ancient Fuegian mummies.",
    ancientCultures: ["Amazonian Geoglyphs", "Patagonian Hunter-Gatherers"],
    highFrequencyModern: ["Amazonian Indigenous (40%)", "Gran Chaco (35%)", "Chilean Mapuche (25%)"],
    migrationPath: [
      { order: 1, region: "Amazon Basin to Southern Cone", timePeriod: "12,000 BP", description: "South American riverine and southern coastal expansion." }
    ]
  }
"""

print("Defined deep terminal subclade structures.")
