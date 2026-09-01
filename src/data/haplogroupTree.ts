import { HaplogroupDefinition } from '../types/haplogroup';

export const Y_DNA_HAPLOGROUPS: HaplogroupDefinition[] = [
  {
    code: "Y-Adam",
    shortName: "A00 / Y-Adam",
    cladeName: "Y-Stem Root",
    lineageType: "PATERNAL_YDNA",
    parentClade: null,
    definingSnps: ["PR2921", "AF3"],
    ageYearsBp: "~275,000 BP",
    originRegion: "West / Central Africa",
    historicalDescription: "The most recent common paternal ancestor from whom all living humans are patrilineally descended. Discovered in Cameroon and ancient Central African hunter-gatherer lines.",
    ancientCultures: ["Middle Stone Age Africa"],
    highFrequencyModern: ["Cameroon Mbo (rare, ~1%)", "Central Africa"],
    migrationPath: [
      { order: 1, region: "Central Africa", timePeriod: "275,000 BP", description: "Emergence of deepest modern human Y-chromosome lineage." }
    ]
  },
  {
    code: "A",
    shortName: "Haplogroup A",
    cladeName: "A-L1085",
    lineageType: "PATERNAL_YDNA",
    parentClade: "Y-Adam",
    definingSnps: ["L1085", "M91", "P97", "rs17306671"],
    ageYearsBp: "~140,000 BP",
    originRegion: "Eastern and Southern Africa",
    historicalDescription: "One of the basal human paternal branches, primarily found in Khoisan hunter-gatherers of Southern Africa and Nilotic populations of East Africa.",
    ancientCultures: ["African Hunter-Gatherers"],
    highFrequencyModern: ["Khoisan (up to 50%)", "Dinka / Nilotic (40%)", "Ethiopia (15%)"],
    migrationPath: [
      { order: 1, region: "Rift Valley, East Africa", timePeriod: "140,000 BP", description: "Diversification across eastern and southern African hunting-gathering bands." }
    ]
  },
  {
    code: "BT",
    shortName: "BT Macroclade",
    cladeName: "BT-M9040",
    lineageType: "PATERNAL_YDNA",
    parentClade: "Y-Adam",
    definingSnps: ["M9040", "M8968"],
    ageYearsBp: "~130,000 BP",
    originRegion: "Sub-Saharan Africa",
    historicalDescription: "Parent clade to B and CT. Represents the broad expansion of anatomically modern humans across the African continent.",
    ancientCultures: ["Middle Paleolithic Africa"],
    highFrequencyModern: ["Ancestral to all Non-A lineages"],
    migrationPath: [
      { order: 1, region: "East Africa", timePeriod: "130,000 BP", description: "Ancestral split leading to B and out-of-Africa CT clades." }
    ]
  },
  {
    code: "CT",
    shortName: "CT Macroclade (Out of Africa Root)",
    cladeName: "CT-M168",
    lineageType: "PATERNAL_YDNA",
    parentClade: "BT",
    definingSnps: ["M168", "M294", "P9.1", "rs9306841"],
    ageYearsBp: "~88,000 BP",
    originRegion: "Northeast Africa / Near East",
    historicalDescription: "The defining common paternal lineage of all non-African men and significant North/East African populations. Marks the great human migration out of Africa.",
    ancientCultures: ["Early Out-of-Africa Pioneers"],
    highFrequencyModern: ["Ancestral to C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, T"],
    migrationPath: [
      { order: 1, region: "Northeast Africa", timePeriod: "88,000 BP", description: "Crossing the Bab-el-Mandeb / Sinai peninsula into Eurasia." }
    ]
  },
  {
    code: "E",
    shortName: "Haplogroup E",
    cladeName: "E-M96",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M96", "P29", "P150", "rs9786481"],
    ageYearsBp: "~65,000 BP",
    originRegion: "Northeast Africa / Levant",
    historicalDescription: "Major African and Mediterranean lineage, splitting into E1a and dominant E1b clades.",
    ancientCultures: ["Late Paleolithic Levant / Nile Valley"],
    highFrequencyModern: ["North Africa", "Horn of Africa", "Sub-Saharan Africa", "Southern Europe"],
    migrationPath: [
      { order: 1, region: "Red Sea Corridor", timePeriod: "65,000 BP", description: "Spread throughout the Sahara, Mediterranean, and sub-Saharan zones." }
    ]
  },
  {
    code: "E1b1a",
    shortName: "E-M2 (E-V38)",
    cladeName: "E1b1a / E-M2",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E",
    definingSnps: ["M2", "V38", "P1", "rs2032597"],
    ageYearsBp: "~40,000 BP",
    originRegion: "West Africa",
    historicalDescription: "The predominant paternal lineage among West African and Bantu-speaking populations, carried across Africa during the agricultural Bantu expansion.",
    ancientCultures: ["Nok Culture", "Bantu Agricultural Pioneers"],
    highFrequencyModern: ["Nigeria (Yoruba, Igbo ~80-90%)", "Ghana (75%)", "African Americans (~60-70%)", "Central/Southern Africa (60-80%)"],
    migrationPath: [
      { order: 1, region: "West Africa (Niger-Congo)", timePeriod: "40,000 BP", description: "Agricultural revolution and population explosion." },
      { order: 2, region: "Sub-Saharan Africa", timePeriod: "3,000 BP", description: "Major Bantu migrations southward and eastward." }
    ]
  },
  {
    code: "E1b1b",
    shortName: "E-M35",
    cladeName: "E1b1b / E-M35",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E",
    definingSnps: ["M35", "L117", "M215", "rs9306847"],
    ageYearsBp: "~35,000 BP",
    originRegion: "Horn of Africa / North Africa",
    historicalDescription: "Associated with the Afroasiatic language family and the early spread of pastoralism and Neolithic farming into Europe via the Mediterranean.",
    ancientCultures: ["Natufian", "Cardial Impressed Ware", "Capsian Culture"],
    highFrequencyModern: ["Berbers / North Africa (60-80%)", "Somalia (80%)", "Balkans (15-30%)", "Southern Europe (10-20%)"],
    migrationPath: [
      { order: 1, region: "Levant / Egypt", timePeriod: "25,000 BP", description: "Natufian hunter-gatherer expansion." },
      { order: 2, region: "Balkans & Western Mediterranean", timePeriod: "8,000 BP", description: "Neolithic maritime farmers reaching Europe." }
    ]
  },
  {
    code: "E-V13",
    shortName: "E-V13 (E1b1b1a1b1a)",
    cladeName: "E-V13 / E-L142",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E1b1b",
    definingSnps: ["V13", "L142", "CTS1273", "rs9306848"],
    ageYearsBp: "~4,800 BP (Bronze Age)",
    originRegion: "Balkans / Southeast Europe",
    historicalDescription: "The primary European subclade of E1b1b, experiencing rapid Bronze Age demographic expansion in the Balkans and spreading with Greek, Thracian, Illyrian, and Roman populations.",
    ancientCultures: ["Balkan Bronze Age", "Mycenaean / Ancient Greek", "Roman Auxiliary troops"],
    highFrequencyModern: ["Kosovo Albanians (40-45%)", "Greeks (20-30%)", "Bulgarians (20%)", "Italy (10-15%)"],
    migrationPath: [
      { order: 1, region: "Balkans / Danube Valley", timePeriod: "4,800 BP", description: "Rapid Bronze Age expansion in Southeast Europe." },
      { order: 2, region: "Central & Western Europe", timePeriod: "2,000 BP", description: "Roman military deployment and classical Mediterranean trade." }
    ]
  },
  {
    code: "G",
    shortName: "Haplogroup G",
    cladeName: "G-M201",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M201", "P257", "U2", "rs2032630"],
    ageYearsBp: "~48,000 BP",
    originRegion: "Caucasus / Anatolia / Middle East",
    historicalDescription: "The primary paternal lineage of early Neolithic European farmers (EEF), who brought agriculture from Anatolia across Europe. Ötzi the Iceman belonged to haplogroup G2a.",
    ancientCultures: ["Linear Pottery (LBK)", "Cardial Ware", "Cardium Pottery", "Ötzi the Iceman"],
    highFrequencyModern: ["Georgia / Ossetia (60-70%)", "Sardinia (15-20%)", "Crete (10%)", "Caucasus (30-60%)"],
    migrationPath: [
      { order: 1, region: "Fertile Crescent / Anatolia", timePeriod: "12,000 BP", description: "Early domestication of wheat and sheep." },
      { order: 2, region: "Danube & Rhine Valleys", timePeriod: "7,500 BP", description: "Neolithic LBK expansion transforming prehistoric Europe." }
    ]
  },
  {
    code: "I",
    shortName: "Haplogroup I",
    cladeName: "I-M170",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M170", "M258", "P19", "rs2032608"],
    ageYearsBp: "~30,000 BP (Upper Paleolithic)",
    originRegion: "Europe (Indigenous European hunter-gatherers)",
    historicalDescription: "The oldest major indigenous European paternal lineage, associated with Upper Paleolithic Gravettian and Epigravettian mammoth hunters and cave painters.",
    ancientCultures: ["Gravettian", "Magdalenian", "Western Hunter-Gatherers (WHG)"],
    highFrequencyModern: ["Scandinavia", "Balkans", "Sardinia"],
    migrationPath: [
      { order: 1, region: "Central Europe / Balkans", timePeriod: "30,000 BP", description: "Gravettian cave artists and hunter-gatherers during Last Glacial Maximum." }
    ]
  },
  {
    code: "I1-M253",
    shortName: "I1 (Nordic / Viking Y-DNA)",
    cladeName: "I1 / I-M253",
    lineageType: "PATERNAL_YDNA",
    parentClade: "I",
    definingSnps: ["M253", "M307", "P30", "rs9341278"],
    ageYearsBp: "~4,700 BP (Nordic Bronze Age)",
    originRegion: "Scandinavia / Jutland Peninsula",
    historicalDescription: "The classic Scandinavian/Nordic paternal lineage. Experienced extreme founder effect in the Nordic Bronze Age and expanded with Germanic tribes and Viking seafaring conquests.",
    ancientCultures: ["Nordic Bronze Age", "Jastorf Culture", "Vikings / Anglo-Saxons", "Goths / Normans"],
    highFrequencyModern: ["Sweden (35-40%)", "Norway (32-35%)", "Denmark (30%)", "Finland (28%)", "England / Scotland (15-20%)"],
    migrationPath: [
      { order: 1, region: "Southern Scandinavia", timePeriod: "4,500 BP", description: "Nordic Bronze Age metal trade and agricultural expansion." },
      { order: 2, region: "British Isles, Normandy, Rus", timePeriod: "800 - 1050 CE", description: "Viking coastal raids and permanent settlements." }
    ]
  },
  {
    code: "I2-M438",
    shortName: "I2 (Dinaric & Sardinian)",
    cladeName: "I2 / I-M438 (I-L621)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "I",
    definingSnps: ["M438", "P215", "L621", "rs17315758"],
    ageYearsBp: "~22,000 BP",
    originRegion: "Balkans / Southwestern Europe",
    historicalDescription: "Associated with Mesolithic European hunter-gatherers and later Slavic medieval expansions (I2a-Dinaric) as well as ancient Sardinian founders.",
    ancientCultures: ["Cucuteni-Trypillia", "Mesolithic Iron Gates", "Nuragic Sardinia", "Slavic Migrations"],
    highFrequencyModern: ["Bosnia & Herzegovina (60-70%)", "Croatia (35-45%)", "Serbia (35%)", "Sardinia (40%)"],
    migrationPath: [
      { order: 1, region: "Balkans & Carpathians", timePeriod: "20,000 BP", description: "Glacial refuge during Ice Age." },
      { order: 2, region: "Eastern & Southern Europe", timePeriod: "500 - 900 CE", description: "Medieval Slavic expansion across the Balkan peninsula." }
    ]
  },
  {
    code: "J1-M267",
    shortName: "J1 (Semitic / Arabian)",
    cladeName: "J1 / J-M267 (J-P58)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M267", "L136", "P58", "rs13447352"],
    ageYearsBp: "~20,000 BP",
    originRegion: "Caucasus / Taurus Mountains / Zagros",
    historicalDescription: "Prominent paternal lineage of Semitic-speaking populations of the Arabian Peninsula, Levant, and North Africa (Cohen Modal Haplotype marker).",
    ancientCultures: ["Natufian", "Bronze Age Levant", "Nabataeans", "Early Islamic Caliphate"],
    highFrequencyModern: ["Yemen (70%)", "Saudi Arabia (50-60%)", "Iraq / Jordan (40%)", "Dagestan (80%)", "Ashkenazi Jewish (15-20%)"],
    migrationPath: [
      { order: 1, region: "Fertile Crescent / Arabia", timePeriod: "10,000 BP", description: "Pastoralist spread across arid deserts." },
      { order: 2, region: "North Africa & Iberia", timePeriod: "700 - 1200 CE", description: "Early Islamic expansion." }
    ]
  },
  {
    code: "J2-M172",
    shortName: "J2 (Greco-Roman & Anatolian)",
    cladeName: "J2 / J-M172 (J-M410, M67)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M172", "M410", "M67", "rs2032604"],
    ageYearsBp: "~28,000 BP",
    originRegion: "Anatolia / Mesopotamia / Caucasus",
    historicalDescription: "Associated with the development of wine production, copper/bronze metallurgy, and classical maritime civilizations (Minoans, Phoenicians, Greeks, Etruscans, Romans).",
    ancientCultures: ["Minoan Civilization", "Phoenicians", "Ancient Greece", "Etruscans / Rome"],
    highFrequencyModern: ["Turkey (30%)", "Greece (25-30%)", "Southern Italy & Sicily (25%)", "Lebanon (30%)", "Iran (20%)"],
    migrationPath: [
      { order: 1, region: "Anatolia & Levant", timePeriod: "10,000 BP", description: "Neolithic agricultural & metallurgy spread." },
      { order: 2, region: "Aegean & Mediterranean Basin", timePeriod: "3,500 BP", description: "Minoan, Phoenician, and Greek maritime colonization." }
    ]
  },
  {
    code: "N-M231",
    shortName: "Haplogroup N (Uralic / Siberian)",
    cladeName: "N / N-M231 (N1c-Tat)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M231", "LLY22g", "M178", "Tat", "rs34442126"],
    ageYearsBp: "~22,000 BP",
    originRegion: "East Asia / Southern Siberia",
    historicalDescription: "Predominant paternal marker of Finno-Ugric and Uralic peoples, migrating from Siberia across Northern Eurasia into the Baltic and Fennoscandia.",
    ancientCultures: ["Comb Ceramic Culture", "Seima-Turbino Phenomenon", "Ancient Finnic Tribes"],
    highFrequencyModern: ["Finland (60%)", "Estonia (35%)", "Lithuania / Latvia (40%)", "Yakuts / Siberia (75-90%)", "Northern Russia (20-30%)"],
    migrationPath: [
      { order: 1, region: "Lake Baikal / Siberia", timePeriod: "15,000 BP", description: "Trans-Siberian taiga hunter-fisher adaptations." },
      { order: 2, region: "Baltic Sea Region", timePeriod: "3,500 BP", description: "Bronze Age introduction of Finnic languages to northeastern Europe." }
    ]
  },
  {
    code: "O-M175",
    shortName: "Haplogroup O (East Asian)",
    cladeName: "O / O-M175 (O2-M122)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M175", "M122", "M324", "rs2032651"],
    ageYearsBp: "~36,000 BP",
    originRegion: "Southeast / East Asia",
    historicalDescription: "The dominant paternal lineage of East and Southeast Asia, driving the expansion of rice agriculture (Yangtze) and millet farming (Yellow River).",
    ancientCultures: ["Yangshao Culture", "Longshan Culture", "Austronesian Expansion"],
    highFrequencyModern: ["Han Chinese (50-60%)", "Korea (45%)", "Vietnam (40%)", "Polynesia / Southeast Asia (30-50%)"],
    migrationPath: [
      { order: 1, region: "Yellow River & Yangtze Basins", timePeriod: "10,000 BP", description: "Neolithic agricultural intensification." },
      { order: 2, region: "Pacific Islands & East Asian Rim", timePeriod: "4,000 BP", description: "Austronesian seafaring out of Taiwan." }
    ]
  },
  {
    code: "Q-M242",
    shortName: "Haplogroup Q (Indigenous American & Siberian)",
    cladeName: "Q / Q-M242 (Q-M3)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M242", "M3", "L54", "rs3894"],
    ageYearsBp: "~30,000 BP",
    originRegion: "Central Siberia / Altai Mountains",
    historicalDescription: "The founding paternal lineage of Indigenous Americans who crossed the Beringia land bridge during the Last Glacial Maximum, as well as native Siberian groups (Ket, Selkup).",
    ancientCultures: ["Clovis Culture", "Beringian Hunters", "Ancient Maya / Inca / Aztec Ancestors"],
    highFrequencyModern: ["Native South Americans (90-100%)", "Native North Americans (60-90%)", "Ket People of Siberia (90%)"],
    migrationPath: [
      { order: 1, region: "Bering Land Bridge", timePeriod: "16,000 BP", description: "Crossing from Siberia into North America." },
      { order: 2, region: "Mesoamerica & Andes", timePeriod: "13,000 BP", description: "Rapid southward expansion throughout the Americas." }
    ]
  },
  {
    code: "R1a-M417",
    shortName: "R1a (Corded Ware / Balto-Slavic & Indo-Iranian)",
    cladeName: "R1a1a1 / R-M417 (Z282, Z93)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M420", "M17", "M417", "Z282", "Z93", "rs17315757"],
    ageYearsBp: "~5,500 BP (Late Copper / Early Bronze Age)",
    originRegion: "Pontic-Caspian Steppe / Eastern Europe",
    historicalDescription: "Associated with the spread of Proto-Indo-European languages, horse domestication, chariot warfare, and the Corded Ware archaeological culture.",
    ancientCultures: ["Corded Ware Culture", "Sintashta Charioteers", "Andronovo Culture", "Early Slavs"],
    highFrequencyModern: ["Poland (55-60%)", "Ukraine (45-50%)", "Russia (45%)", "Northern India (35-45%)", "Kyrgyzstan (60%)"],
    migrationPath: [
      { order: 1, region: "Pontic-Caspian Steppe", timePeriod: "5,500 BP", description: "Yamnaya / Corded Ware expansion into Central & Northern Europe." },
      { order: 2, region: "Central Asia & Indus Valley", timePeriod: "3,800 BP", description: "Sintashta-Andronovo chariot horizon into Iran and Northern India." }
    ]
  },
  {
    code: "R1b-M269",
    shortName: "R1b (Western European Core)",
    cladeName: "R1b1a1b / R-M269",
    lineageType: "PATERNAL_YDNA",
    parentClade: "CT",
    definingSnps: ["M343", "M269", "L23", "L51", "rs9786184"],
    ageYearsBp: "~6,000 BP",
    originRegion: "Pontic-Caspian Steppe / East-Central Europe",
    historicalDescription: "The dominant paternal lineage in Western Europe. Propelled by the Yamnaya steppe pastoralist migrations and Bell Beaker metallurgical network.",
    ancientCultures: ["Yamnaya Culture", "Bell Beaker Phenomenon", "Unetice Culture"],
    highFrequencyModern: ["Ireland (80-85%)", "Basque Country (85%)", "Scotland / Wales (75-80%)", "France / Spain (60-70%)"],
    migrationPath: [
      { order: 1, region: "Eurasian Steppe", timePeriod: "5,000 BP", description: "Yamnaya pastoralists migrate into the Danube basin." },
      { order: 2, region: "Rhine & Atlantic Facade", timePeriod: "4,400 BP", description: "Bell Beaker expansion replacing indigenous Neolithic male lineages." }
    ]
  },
  {
    code: "R1b-U106",
    shortName: "R-U106 (Proto-Germanic)",
    cladeName: "R1b1a1b1a1a1 / R-U106 (S21)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-M269",
    definingSnps: ["U106", "S21", "M405", "rs2032598"],
    ageYearsBp: "~4,500 BP",
    originRegion: "Central / Northern Europe (Rhine-Weser Basin)",
    historicalDescription: "The primary Germanic branch of R1b. Associated with the Unetice Bronze Age, Jastorf Iron Age, and Anglo-Saxon / Frankish / Dutch expansions.",
    ancientCultures: ["Unetice Culture", "Jastorf Culture", "Anglo-Saxons", "Franks / Saxons"],
    highFrequencyModern: ["Netherlands (35%)", "Northern Germany (30%)", "England (20-25%)", "Denmark (18%)", "Austria (20%)"],
    migrationPath: [
      { order: 1, region: "Rhine-Elbe Region", timePeriod: "4,000 BP", description: "Consolidation of Proto-Germanic communities." },
      { order: 2, region: "North Sea & Britain", timePeriod: "450 - 600 CE", description: "Anglo-Saxon migrations across the English Channel." }
    ]
  },
  {
    code: "R1b-P312",
    shortName: "R-P312 (Italo-Celtic / Atlantic)",
    cladeName: "R1b1a1b1a1a2 / R-P312 (S116)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-M269",
    definingSnps: ["P312", "S116", "rs34276300"],
    ageYearsBp: "~4,500 BP",
    originRegion: "Central / Western Europe",
    historicalDescription: "Parent clade to major Western European lineages: Celtic (L21), Iberian (DF27), and Alpine/Italo-Celtic (U152). Carried by the Bell Beaker people.",
    ancientCultures: ["Bell Beaker", "Hallstatt Celts", "La Tène Culture"],
    highFrequencyModern: ["Ireland (75%)", "Scotland (70%)", "France (50%)", "Spain (55%)", "Northern Italy (40%)"],
    migrationPath: [
      { order: 1, region: "Central Europe / Rhine Valley", timePeriod: "4,500 BP", description: "Bell Beaker metallurgical network diversification." }
    ]
  },
  {
    code: "R1b-L21",
    shortName: "R-L21 (Insular Celtic / Atlantic)",
    cladeName: "R1b1a1b1a1a2c / R-L21 (M529)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-P312",
    definingSnps: ["L21", "M529", "S145", "rs11799226"],
    ageYearsBp: "~4,200 BP (Early Bronze Age)",
    originRegion: "British Isles / Brittany / Atlantic France",
    historicalDescription: "The defining paternal marker of Insular Celtic populations (Gaels, Britons, Picts). Found in extraordinary frequencies in Ireland, Scotland, and Wales.",
    ancientCultures: ["Atlantic Bronze Age", "Insular Celts", "Gaels / Scots / Picts", "Bretons"],
    highFrequencyModern: ["Western Ireland (75-80%)", "Scotland (50-60%)", "Wales (50%)", "Brittany (40%)", "Cornwall (35%)"],
    migrationPath: [
      { order: 1, region: "Atlantic Seaboard", timePeriod: "4,200 BP", description: "Bronze Age mining and maritime trade in tin and copper." },
      { order: 2, region: "Ireland & Scottish Highlands", timePeriod: "3,000 BP", description: "Cultural flowering of Gaelic kingdoms." }
    ]
  },
  {
    code: "R1b-U152",
    shortName: "R-U152 (Italo-Celtic / Alpine / Roman)",
    cladeName: "R1b1a1b1a1a2b / R-U152 (S28)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-P312",
    definingSnps: ["U152", "S28", "rs12338"],
    ageYearsBp: "~4,300 BP",
    originRegion: "Alps / Switzerland / Northern Italy",
    historicalDescription: "Strongly correlated with the Hallstatt and La Tène Celtic cultures, the Villanova culture, and early Italic tribes including the ancestors of the Romans.",
    ancientCultures: ["Hallstatt Culture", "La Tène Culture", "Villanovan Culture", "Ancient Romans & Latins"],
    highFrequencyModern: ["Northern Italy / Tuscany (30-40%)", "Switzerland (25-30%)", "Eastern France (20%)", "Corsica (25%)"],
    migrationPath: [
      { order: 1, region: "Alpine Valleys / Switzerland", timePeriod: "4,300 BP", description: "Early metallurgy in copper and bronze." },
      { order: 2, region: "Po Valley & Italian Peninsula", timePeriod: "3,000 BP", description: "Villanovan and early Roman Republican consolidation." }
    ]
  },
  {
    code: "R1b-DF27",
    shortName: "R-DF27 (Iberian / Gascon)",
    cladeName: "R1b1a1b1a1a2a / R-DF27",
    lineageType: "PATERNAL_YDNA",
    parentClade: "R1b-P312",
    definingSnps: ["DF27", "S250", "rs16980479"],
    ageYearsBp: "~4,200 BP",
    originRegion: "Pyrenees / Iberian Peninsula / Southwest France",
    historicalDescription: "The predominant paternal lineage of the Iberian Peninsula, carried by ancient Iberians, Celtiberians, and Basque ancestors.",
    ancientCultures: ["El Argar Culture", "Celtiberians", "Ancient Iberians", "Basques"],
    highFrequencyModern: ["Basque Country (70%)", "Catalonia (45%)", "Spain / Portugal (40-50%)", "Gascony (40%)", "Latin America (via Spanish colonists)"],
    migrationPath: [
      { order: 1, region: "Pyrenees & Ebro Basin", timePeriod: "4,200 BP", description: "Bronze Age settlement across Iberia." },
      { order: 2, region: "Americas", timePeriod: "1500 - 1800 CE", description: "Spanish and Portuguese transatlantic exploration." }
    ]
  }
];

export const MT_DNA_HAPLOGROUPS: HaplogroupDefinition[] = [
  {
    code: "L0",
    shortName: "Haplogroup L0 (Mitochondrial Eve)",
    cladeName: "mtDNA-L0",
    lineageType: "MATERNAL_MTDNA",
    parentClade: null,
    definingSnps: ["mt146", "mt182", "mt4312", "mt10664"],
    ageYearsBp: "~150,000 - 200,000 BP",
    originRegion: "Southern / Eastern Africa",
    historicalDescription: "Root maternal lineage representing the matrilineal most recent common ancestor (Mitochondrial Eve). Retained at highest frequency in Khoisan hunter-gatherers.",
    ancientCultures: ["Early Anatomically Modern Humans"],
    highFrequencyModern: ["San / Khoisan (70-90%)", "Southern Africa", "East Africa"],
    migrationPath: [
      { order: 1, region: "Kalahari / Southern Africa", timePeriod: "150,000 BP", description: "Deepest human maternal divergence." }
    ]
  },
  {
    code: "L2",
    shortName: "Haplogroup L2 (West & Central African)",
    cladeName: "mtDNA-L2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L0",
    definingSnps: ["mt143", "mt789", "mt8701", "mt9540", "mt16278", "rs2853496"],
    ageYearsBp: "~90,000 BP",
    originRegion: "West / Central Africa",
    historicalDescription: "The most widespread maternal haplogroup across sub-Saharan Africa, prominent in African Americans through the transatlantic period.",
    ancientCultures: ["Bantu Expansion", "West African Neolithic"],
    highFrequencyModern: ["West Africa (30-40%)", "Central Africa (35%)", "African Americans (~30%)"],
    migrationPath: [
      { order: 1, region: "West Africa", timePeriod: "90,000 BP", description: "Expansion across tropical and savannah zones." }
    ]
  },
  {
    code: "L3",
    shortName: "Haplogroup L3 (Out of Africa Maternal Ancestor)",
    cladeName: "mtDNA-L3",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L0",
    definingSnps: ["mt769", "mt1018", "mt3594", "mt7256", "mt13650", "rs2853493", "rs2853494", "rs2853495"],
    ageYearsBp: "~70,000 BP",
    originRegion: "East Africa (Horn of Africa)",
    historicalDescription: "The direct maternal ancestor to haplogroups M and N, which encompass every maternal lineage found outside of Africa.",
    ancientCultures: ["Out of Africa Migration Pioneers"],
    highFrequencyModern: ["Horn of Africa (Ethiopia, Somalia 30-40%)", "East Africa"],
    migrationPath: [
      { order: 1, region: "Horn of Africa", timePeriod: "70,000 BP", description: "Maternal lineage crossing into Eurasia giving rise to clades M and N." }
    ]
  },
  {
    code: "M",
    shortName: "Macrohaplogroup M (Eurasian / Asian / Indigenous American)",
    cladeName: "mtDNA-M",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3",
    definingSnps: ["mt489", "mt10400", "mt14783", "mt15043", "rs2853497", "rs2853498"],
    ageYearsBp: "~60,000 BP",
    originRegion: "South Asia / Coastal Eurasia",
    historicalDescription: "Major Eurasian founder clade. Dominant in South Asia and East Asia, giving rise to C, D, G, Z branches in Asia and the Americas.",
    ancientCultures: ["Southern Coastal Dispersal"],
    highFrequencyModern: ["India (60%)", "East Asia (50%)", "Indigenous Americans (C, D clades)"],
    migrationPath: [
      { order: 1, region: "Indian Ocean Rim", timePeriod: "60,000 BP", description: "Rapid coastal migration towards Sundaland and East Asia." }
    ]
  },
  {
    code: "N",
    shortName: "Macrohaplogroup N",
    cladeName: "mtDNA-N",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3",
    definingSnps: ["mt8701", "mt9540", "mt10398", "mt10873", "mt15301", "rs2853491", "rs2853492"],
    ageYearsBp: "~60,000 BP",
    originRegion: "Near East / South Asia",
    historicalDescription: "Parent to haplogroup R, which includes almost all European maternal lineages (H, V, J, T, U, K) as well as A, B, X.",
    ancientCultures: ["Early Eurasian Pioneers"],
    highFrequencyModern: ["Found across all non-African populations via daughter clades"],
    migrationPath: [
      { order: 1, region: "Near East / Anatolia", timePeriod: "60,000 BP", description: "Settlement of West Eurasia and diversification of haplogroup R." }
    ]
  },
  {
    code: "U",
    shortName: "Haplogroup U (Ancient Hunter-Gatherer)",
    cladeName: "mtDNA-U",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt11467", "mt12308", "mt12372", "mt1811", "rs2853510", "rs2853511"],
    ageYearsBp: "~45,000 BP (Upper Paleolithic)",
    originRegion: "Near East / Europe",
    historicalDescription: "One of the oldest maternal lineages in Europe. Subclade U5 was the dominant maternal lineage of Western European Mesolithic hunter-gatherers (WHG).",
    ancientCultures: ["Aurignacian", "Gravettian", "Western Hunter-Gatherers (WHG)", "Cheddar Man"],
    highFrequencyModern: ["Scandinavia (U5 in Saami ~50%)", "Baltic States (15-20%)", "Caucasus (U4/U7)", "India (U2/U7)"],
    migrationPath: [
      { order: 1, region: "Balkans & Western Europe", timePeriod: "45,000 BP", description: "Upper Paleolithic colonization of ice-age Europe." }
    ]
  },
  {
    code: "U5b",
    shortName: "U5b (Mesolithic European Hunter-Gatherer)",
    cladeName: "mtDNA-U5b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "U",
    definingSnps: ["mt7768", "mt14182", "mt16270", "mt150", "rs2853512", "rs2853513"],
    ageYearsBp: "~22,000 BP",
    originRegion: "Southwestern Europe (Franco-Cantabrian Ice Age Refuge)",
    historicalDescription: "The iconic maternal lineage of post-glacial European hunter-gatherers, found in Cheddar Man and ancient burials across France, Spain, and Britain.",
    ancientCultures: ["Magdalenian", "Azilian", "Mesolithic Britain / Cheddar Man"],
    highFrequencyModern: ["Saami of Lapland (50%)", "Basques (15%)", "Finns (10%)", "Northern & Western Europe (8-12%)"],
    migrationPath: [
      { order: 1, region: "Franco-Cantabrian Caves", timePeriod: "20,000 BP", description: "Survival through the Last Glacial Maximum." },
      { order: 2, region: "Deglaciated Northern Europe", timePeriod: "11,000 BP", description: "Pioneering recolonization of Britain, Scandinavia, and the Baltic." }
    ]
  },
  {
    code: "H",
    shortName: "Haplogroup H (Helena - Queen of Europe)",
    cladeName: "mtDNA-H",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt2706", "mt7028", "rs2853499", "rs28358280"],
    ageYearsBp: "~25,000 BP",
    originRegion: "Near East / Caucasus / Southern Europe",
    historicalDescription: "The single most common maternal lineage in modern Europe (~40-50% of all Europeans). Expanded massively from Ice Age refuges and during the Neolithic/Bronze Age.",
    ancientCultures: ["Epigravettian", "Bell Beaker", "Unetice", "Cardial Farmers"],
    highFrequencyModern: ["Spain / Basque (45-50%)", "United Kingdom (45%)", "Scandinavia (42%)", "Germany (43%)", "France (45%)"],
    migrationPath: [
      { order: 1, region: "Near East & Anatolia", timePeriod: "25,000 BP", description: "Divergence from HV stem." },
      { order: 2, region: "Iberian & Balkan Refuges", timePeriod: "18,000 BP", description: "Expansion across Western Europe after Ice Age retreat." }
    ]
  },
  {
    code: "H1",
    shortName: "H1 (Western European Matriarch)",
    cladeName: "mtDNA-H1",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H",
    definingSnps: ["mt3010", "mt16189", "rs28358281", "rs2853515"],
    ageYearsBp: "~13,000 BP",
    originRegion: "Franco-Cantabrian Refuge (Iberia / Southwest France)",
    historicalDescription: "The most frequent single subclade in Western Europe, expanding across the continent following the retreat of the glaciers.",
    ancientCultures: ["Magdalenian", "Megalithic Builders", "Celtic & Germanic Peoples"],
    highFrequencyModern: ["Basque Country (30%)", "Galicia & Portugal (25-30%)", "Norway (25%)", "British Isles (20-25%)"],
    migrationPath: [
      { order: 1, region: "Pyrenees & Bay of Biscay", timePeriod: "13,000 BP", description: "Rapid post-glacial demographic expansion." },
      { order: 2, region: "Atlantic Seaboard & Scandinavia", timePeriod: "8,000 BP", description: "Integration into early European farming and megalithic communities." }
    ]
  },
  {
    code: "H2",
    shortName: "H2 (Eastern & Central European)",
    cladeName: "mtDNA-H2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H",
    definingSnps: ["mt1438", "mt4769", "rs2853500"],
    ageYearsBp: "~15,000 BP",
    originRegion: "Near East / Anatolia",
    historicalDescription: "Associated with early Neolithic farming expansions into Central Europe and the Mediterranean basin.",
    ancientCultures: ["Linear Pottery (LBK)", "Vinča Culture"],
    highFrequencyModern: ["Sardinia (8%)", "Central Europe (5-8%)", "Levant (4%)"],
    migrationPath: [
      { order: 1, region: "Anatolia to Balkans", timePeriod: "9,000 BP", description: "Neolithic agricultural dispersal." }
    ]
  },
  {
    code: "H3",
    shortName: "H3 (Atlantic / Iberian)",
    cladeName: "mtDNA-H3",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "H",
    definingSnps: ["mt6776", "rs28358282"],
    ageYearsBp: "~11,000 BP",
    originRegion: "Iberia / Western Mediterranean",
    historicalDescription: "Second most common H branch in Western Europe, especially enriched in the Basque Country and Sardinia.",
    ancientCultures: ["Cardial Pottery", "Nuragic Sardinia", "Atlantic Bronze Age"],
    highFrequencyModern: ["Sardinia (18%)", "Basques (14%)", "Portugal (12%)", "Ireland (10%)"],
    migrationPath: [
      { order: 1, region: "Iberia & Western Mediterranean", timePeriod: "11,000 BP", description: "Maritime and coastal foraging and early pastoralism." }
    ]
  },
  {
    code: "J1c",
    shortName: "J1c (Jasmine - Neolithic Farming Expansion)",
    cladeName: "mtDNA-J1c",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt185", "mt295", "mt462", "mt14798", "mt16069", "rs2853501", "rs2853516"],
    ageYearsBp: "~15,000 BP",
    originRegion: "Near East / Fertile Crescent",
    historicalDescription: "Carried across Europe by early Neolithic farmers bringing agriculture, pottery, and animal husbandry into Central and Northern Europe.",
    ancientCultures: ["Linear Pottery (LBK)", "Starčevo–Körös", "Ancient Near Eastern Agronomists"],
    highFrequencyModern: ["Central Europe (8-12%)", "British Isles (8%)", "Scandinavia (7%)", "Near East (10%)"],
    migrationPath: [
      { order: 1, region: "Fertile Crescent", timePeriod: "12,000 BP", description: "Domestication of emmer wheat and goats." },
      { order: 2, region: "Danube River Valley", timePeriod: "7,500 BP", description: "Rapid spread of LBK farming across Western and Northern Europe." }
    ]
  },
  {
    code: "T2",
    shortName: "T2 (Tara - Steppe & Neolithic Agrarian)",
    cladeName: "mtDNA-T2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt709", "mt1888", "mt8697", "mt10463", "mt16126", "rs2853503", "rs2853517"],
    ageYearsBp: "~16,000 BP",
    originRegion: "Near East / Caucasus / Pontic Steppe",
    historicalDescription: "Associated with both the Neolithic agricultural diffusion and subsequent Bronze Age Yamnaya steppe pastoralist migrations.",
    ancientCultures: ["Yamnaya", "Corded Ware", "Neolithic Farmers"],
    highFrequencyModern: ["Eastern Europe (8-10%)", "Scandinavia (7%)", "Italy (6%)", "Iran / Levant (8%)"],
    migrationPath: [
      { order: 1, region: "Caucasus / Steppe", timePeriod: "10,000 BP", description: "Pastoralist adaptations." },
      { order: 2, region: "Northern & Eastern Europe", timePeriod: "5,000 BP", description: "Steppe expansions associated with Indo-European languages." }
    ]
  },
  {
    code: "K1a",
    shortName: "K1a (Katrine - Ötzi & Cardial Mediterranean)",
    cladeName: "mtDNA-K1a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt497", "mt1189", "mt9055", "mt10550", "rs2853502", "rs2853518"],
    ageYearsBp: "~16,000 BP",
    originRegion: "Near East / Anatolia / Mediterranean",
    historicalDescription: "Key marker of early European farmers and ancient Alpine populations. Ötzi the Iceman had an extinct subclade of K1 (K1f).",
    ancientCultures: ["Ötzi the Iceman", "Cardial Ware", "Levantine Early Farmers", "Ashkenazi Matriarchs"],
    highFrequencyModern: ["Ashkenazi Jewish (32%)", "Alps / Tyrol (8-10%)", "Cyprus (10%)", "Levant (8%)"],
    migrationPath: [
      { order: 1, region: "Levant & Anatolia", timePeriod: "15,000 BP", description: "Epipaleolithic origins." },
      { order: 2, region: "Mediterranean Basin & Alps", timePeriod: "8,000 BP", description: "Neolithic maritime migration to Italy, Spain, and Central Europe." }
    ]
  },
  {
    code: "D4",
    shortName: "Haplogroup D4 (East Asian / Siberian)",
    cladeName: "mtDNA-D4",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "M",
    definingSnps: ["mt3010", "mt8414", "mt14668", "rs2853504", "rs2853519"],
    ageYearsBp: "~28,000 BP",
    originRegion: "Northern East Asia / Southern Siberia",
    historicalDescription: "One of the most widespread maternal lineages in East Asia and Siberia. Subclades are also ancestral to Indigenous American haplogroup D lineages.",
    ancientCultures: ["Baikal Hunter-Gatherers", "Ancient Northern East Asians", "Jomon & Yayoi Japan"],
    highFrequencyModern: ["Northern Han Chinese (25-30%)", "Japanese (35%)", "Koreans (30%)", "Mongolians (25%)", "Siberians (30%)"],
    migrationPath: [
      { order: 1, region: "Northern China / Siberia", timePeriod: "28,000 BP", description: "Cold adaptation in Mammoth steppe environments." },
      { order: 2, region: "Japanese Archipelago & Yellow River", timePeriod: "10,000 BP", description: "Yayoi agricultural diffusion and Yayoi-Jomon admixture." }
    ]
  },
  {
    code: "A2",
    shortName: "Haplogroup A2 (Indigenous American Founder)",
    cladeName: "mtDNA-A2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["mt663", "mt1736", "mt4248", "mt4824", "mt8794", "rs2853505", "rs2853520"],
    ageYearsBp: "~16,000 BP",
    originRegion: "Beringia / Siberia",
    historicalDescription: "One of the five founding maternal lineages (A2, B2, C1, D1, X2a) of Indigenous American peoples.",
    ancientCultures: ["Clovis Culture", "Ancient Beringians", "Inuit / Thule", "Maya & Aztec Ancestors"],
    highFrequencyModern: ["Inuit / Saqqaq (90%)", "Navajo / Apache (60%)", "Central American Indigenous (50-70%)"],
    migrationPath: [
      { order: 1, region: "Bering Land Bridge", timePeriod: "16,000 BP", description: "Glacial standstill in Beringia before entering the Americas." },
      { order: 2, region: "North & Central America", timePeriod: "14,000 BP", description: "Ice-free corridor and Pacific coastal route." }
    ]
  }
];

export const ALL_HAPLOGROUPS: HaplogroupDefinition[] = [
  ...Y_DNA_HAPLOGROUPS,
  ...MT_DNA_HAPLOGROUPS
];
