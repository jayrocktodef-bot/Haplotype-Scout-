#!/usr/bin/env python3
import re

NEW_YDNA_TREE_NODES = """  {
    code: "E-M180",
    shortName: "E1b1a1a / E-M180",
    cladeName: "E-M180 (P279)",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E1b1a",
    definingSnps: ["M180"],
    ageYearsBp: "~4,500 BP",
    originRegion: "West / Central Africa (Nigeria / Cameroon Grassfields)",
    historicalDescription: "Primary driver of the Sub-Saharan Bantu agricultural expansion and the ancestral lineage of the majority of African-descended males across the Americas.",
    ancientCultures: ["Bantu Agrarian Expansion", "Nok Culture"],
    highFrequencyModern: ["Yoruba (70%)", "Igbo (75%)", "African Americans (60%)", "Bantu populations (65%)"],
    migrationPath: [
      { order: 1, region: "Benue-Cross River Basin, Nigeria", timePeriod: "4,500 BP", description: "Invention of yam/oil palm agriculture and iron metallurgy triggering rapid demographic expansion." },
      { order: 2, region: "Congo Basin & Trans-Atlantic Ports", timePeriod: "3,000–400 BP", description: "Migration across Central/Southern Africa and dispersion during the Transatlantic slave trade." }
    ]
  },
  {
    code: "E-U175",
    shortName: "E1b1a1a1 / E-U175",
    cladeName: "E-U175",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-M180",
    definingSnps: ["U175"],
    ageYearsBp: "~3,500 BP",
    originRegion: "West Africa (Gulf of Guinea)",
    historicalDescription: "Major West African rainforest subclade with high concentration in modern Ghana (Akan, Ga), Benin, and Nigeria.",
    ancientCultures: ["West African Iron Age", "Kintampo Complex"],
    highFrequencyModern: ["Ghana (60%)", "Nigeria (55%)", "African Americans (35%)"],
    migrationPath: [
      { order: 1, region: "Gulf of Guinea Forest Zone", timePeriod: "3,500 BP", description: "Diversification into agricultural kingdoms across the West African coast." }
    ]
  },
  {
    code: "E-U290",
    shortName: "E1b1a1a1a / E-U290",
    cladeName: "E-U290",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-U175",
    definingSnps: ["U290"],
    ageYearsBp: "~3,000 BP",
    originRegion: "Bight of Benin & Bight of Biafra",
    historicalDescription: "Core ancestral marker for African Americans, Afro-Caribbeans, and Afro-Brazilians traced to historical Gold Coast and Slave Coast ports.",
    ancientCultures: ["Oyo Empire", "Kingdom of Benin", "Igbo-Ukwu"],
    highFrequencyModern: ["Yoruba (50%)", "Igbo (50%)", "African Americans (30%)", "Jamaica / Caribbean (35%)"],
    migrationPath: [
      { order: 1, region: "Lower Niger Basin", timePeriod: "3,000 BP", description: "Demographic explosion associated with bronze casting and centralized urban states." }
    ]
  },
  {
    code: "E-M58",
    shortName: "E1b1a1a1b / E-M58",
    cladeName: "E-M58",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-U175",
    definingSnps: ["M58"],
    ageYearsBp: "~2,800 BP",
    originRegion: "Central & Southern Africa",
    historicalDescription: "Diagnostic marker tracking the southern stream of the Bantu migration down into Angola, Mozambique, and South Africa.",
    ancientCultures: ["Southern Bantu Expansion", "Great Zimbabwe"],
    highFrequencyModern: ["Kongo (25%)", "Ovambo (20%)", "Zulu / Xhosa (15%)"],
    migrationPath: [
      { order: 1, region: "Congo Rainforest & Zambezi Basin", timePeriod: "2,500 BP", description: "Pioneering southward migration introducing cattle pastoralism and iron-working." }
    ]
  },
  {
    code: "E-CTS9883",
    shortName: "E-CTS9883",
    cladeName: "E-CTS9883",
    lineageType: "PATERNAL_YDNA",
    parentClade: "E-U290",
    definingSnps: ["CTS9883"],
    ageYearsBp: "~2,200 BP",
    originRegion: "West Africa",
    historicalDescription: "Fine-resolution terminal subclade within the West African U290 branch.",
    ancientCultures: ["West African Coastal Kingdoms"],
    highFrequencyModern: ["Nigeria", "Ghana", "African Americans"],
    migrationPath: [
      { order: 1, region: "West African Coastline", timePeriod: "2,000 BP", description: "Coastal settlement and trade expansion." }
    ]
  },
  {
    code: "Q-M3",
    shortName: "Q1a2a1a1 / Q-M3",
    cladeName: "Q-M3",
    lineageType: "PATERNAL_YDNA",
    parentClade: "Q-M242",
    definingSnps: ["M3"],
    ageYearsBp: "~15,000 BP",
    originRegion: "Beringia / North America",
    historicalDescription: "The predominant indigenous founding paternal lineage of the Americas, carried by over 80% of Native American men from the Arctic to Patagonia.",
    ancientCultures: ["Paleo-Indian", "Clovis", "Maya", "Inca", "Aztec", "Mississippian"],
    highFrequencyModern: ["Indigenous South Americans (up to 95%)", "Mesoamerican Maya/Nahua (80%)", "Native North Americans (60%)"],
    migrationPath: [
      { order: 1, region: "Bering Land Bridge", timePeriod: "15,000 BP", description: "Mutation occurred in the founding Paleo-Indian population during Beringian standstill." },
      { order: 2, region: "Pacific Coast & Great Plains", timePeriod: "14,000–12,000 BP", description: "Rapid southward dispersal along the ice-free corridor and coastal routes into South America." }
    ]
  },
  {
    code: "Q-M848",
    shortName: "Q-M848",
    cladeName: "Q-M848",
    lineageType: "PATERNAL_YDNA",
    parentClade: "Q-M3",
    definingSnps: ["M848"],
    ageYearsBp: "~12,000 BP",
    originRegion: "Mesoamerica & South America",
    historicalDescription: "The massive pan-Mesoamerican and South American expansion subclade associated with the rise of complex agricultural civilizations (Maya, Zapotec, Moche, Tiwanaku, Inca).",
    ancientCultures: ["Maya Civilization", "Andean Civilizations", "Amazonian Earthworks"],
    highFrequencyModern: ["Guatemala Maya (90%)", "Peruvian Quechua/Aymara (85%)", "Amazonian tribes (90%)"],
    migrationPath: [
      { order: 1, region: "Central America & Isthmus of Panama", timePeriod: "12,000 BP", description: "Entry and rapid diversification across the Andes and Amazon basin." }
    ]
  },
  {
    code: "Q-Z780",
    shortName: "Q-Z780",
    cladeName: "Q-Z780",
    lineageType: "PATERNAL_YDNA",
    parentClade: "Q-M242",
    definingSnps: ["Z780"],
    ageYearsBp: "~14,500 BP",
    originRegion: "North America (Montana / Western US)",
    historicalDescription: "Ancient Paleo-Indian lineage contemporary with Clovis culture, confirmed in the 12,600-year-old Anzick-1 child burial in Montana.",
    ancientCultures: ["Clovis Culture", "Western Stemmed Tradition"],
    highFrequencyModern: ["Native North Americans (rare surviving branches, ~5%)", "Central America"],
    migrationPath: [
      { order: 1, region: "Beringia to North American Plains", timePeriod: "14,500 BP", description: "Associated with megafauna hunting and Clovis fluted point technology." }
    ]
  },
  {
    code: "C-P39",
    shortName: "C-P39 / C2a1a1",
    cladeName: "C-P39",
    lineageType: "PATERNAL_YDNA",
    parentClade: "C",
    definingSnps: ["P39"],
    ageYearsBp: "~12,000 BP",
    originRegion: "North America (Subarctic / Great Plains)",
    historicalDescription: "Indigenous North American Y-DNA C lineage specific to Na-Dene (Athabaskan, Navajo, Apache) and Algonquian-speaking peoples (Cheyenne, Blackfoot, Ojibwe).",
    ancientCultures: ["Na-Dene Expansion", "Plains Indigenous Cultures"],
    highFrequencyModern: ["Navajo (up to 50%)", "Apache (45%)", "Cheyenne (25%)", "Chipewyan (40%)"],
    migrationPath: [
      { order: 1, region: "Alaska & Yukon", timePeriod: "12,000 BP", description: "Second wave of Beringian migration expanding into the American Southwest and Plains." }
    ]
  },
  {
    code: "O2a2b1-M117",
    shortName: "O-M117",
    cladeName: "O2a2b1-M117",
    lineageType: "PATERNAL_YDNA",
    parentClade: "O2",
    definingSnps: ["M117"],
    ageYearsBp: "~6,000 BP",
    originRegion: "Yellow River Valley, China",
    historicalDescription: "Primary founding lineage of Sino-Tibetan populations, linked to the Yangshao and Majiayao Neolithic millet-farming cultures.",
    ancientCultures: ["Yangshao Culture", "Majiayao Culture"],
    highFrequencyModern: ["Northern Han Chinese (20%)", "Tibetans (35%)", "Qiang (40%)", "Burmese (15%)"],
    migrationPath: [
      { order: 1, region: "Yellow River Basin", timePeriod: "6,000 BP", description: "Agricultural expansion southward into Han populations and westward onto the Tibetan Plateau." }
    ]
  },
  {
    code: "C2-F1067",
    shortName: "C2-F1067",
    cladeName: "C2-F1067",
    lineageType: "PATERNAL_YDNA",
    parentClade: "C",
    definingSnps: ["F1067"],
    ageYearsBp: "~8,000 BP",
    originRegion: "Northeast Asia / Manchuria / Mongolia",
    historicalDescription: "Major North Asian and Northeast Asian paternal branch prominent in Mongolic, Tungusic, Manchu, and Korean populations.",
    ancientCultures: ["Hongshan Culture", "Xiongnu Empire", "Mongol Empire"],
    highFrequencyModern: ["Mongolians (25%)", "Manchu (20%)", "Koreans (10%)", "Northern Han (10%)"],
    migrationPath: [
      { order: 1, region: "Liao River & Amur Basin", timePeriod: "8,000 BP", description: "Pastoralist and hunting adaptations across the Eurasian Steppe." }
    ]
  },
  {
    code: "H1a-M82",
    shortName: "H1a-M82",
    cladeName: "H1a-M82",
    lineageType: "PATERNAL_YDNA",
    parentClade: "H",
    definingSnps: ["M82"],
    ageYearsBp: "~9,000 BP",
    originRegion: "Northwest India / Indus Valley",
    historicalDescription: "Dominant South Asian lineage and the signature paternal founder marker of the Romani diaspora across Europe (~50% in European Romani).",
    ancientCultures: ["Indus Valley Civilization", "Medieval Romani Migration"],
    highFrequencyModern: ["Romani / Roma Gypsies (50%)", "Northwest India / Rajasthan (25%)", "Pakistan (15%)"],
    migrationPath: [
      { order: 1, region: "Rajasthan & Punjab", timePeriod: "9,000 BP", description: "Indigenous South Asian development." },
      { order: 2, region: "Middle East to Byzantine Balkans", timePeriod: "1,000 BP", description: "Romani migration into Southeast and Central Europe." }
    ]
  },
  {
    code: "C-M347",
    shortName: "C-M347",
    cladeName: "C1b2b / C-M347",
    lineageType: "PATERNAL_YDNA",
    parentClade: "C",
    definingSnps: ["M347"],
    ageYearsBp: "~45,000 BP",
    originRegion: "Sahul / Ancient Australia",
    historicalDescription: "The predominant indigenous founding paternal lineage of Aboriginal Australians, present continuously in Australia since the initial colonization of Sahul.",
    ancientCultures: ["Aboriginal Australian Dreamtime Cultures"],
    highFrequencyModern: ["Indigenous Aboriginal Australians (60-70%)"],
    migrationPath: [
      { order: 1, region: "Sundaland to Sahul", timePeriod: "50,000 BP", description: "Maritime crossing of Wallacea into ancient Pleistocene Australia." }
    ]
  },"""

NEW_MTDNA_TREE_NODES = """  {
    code: "L1b",
    shortName: "L1b",
    cladeName: "L1b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L1",
    definingSnps: ["3693G", "7389C", "15692G"],
    ageYearsBp: "~35,000 BP",
    originRegion: "West Africa (Senegal / Guinea / Mali)",
    historicalDescription: "Primary West African maternal founding lineage. Highly represented in African Americans (~15-20% of maternal lineages in the African diaspora).",
    ancientCultures: ["West African Upper Paleolithic", "Senegambian Megaliths"],
    highFrequencyModern: ["Senegal (Wolof, Mandinka, 30%)", "Nigeria (15%)", "African Americans (18%)"],
    migrationPath: [
      { order: 1, region: "Senegambia & Niger River Bend", timePeriod: "35,000 BP", description: "West African coastal and savanna diversification." }
    ]
  },
  {
    code: "L1c",
    shortName: "L1c",
    cladeName: "L1c",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L1",
    definingSnps: ["366C", "10810C", "14209C"],
    ageYearsBp: "~40,000 BP",
    originRegion: "Central African Rainforest (Congo / Gabon / Cameroon)",
    historicalDescription: "Ancient indigenous Central African maternal lineage, exceptionally frequent among BaAka, Mbuti, and Biaka rainforest foragers and neighboring Bantu groups.",
    ancientCultures: ["Central African Forager Traditions"],
    highFrequencyModern: ["Biaka Pygmies (95%)", "Bakola (90%)", "Gabon (25%)", "Cameroon (20%)", "African Americans (7%)"],
    migrationPath: [
      { order: 1, region: "Congo Basin", timePeriod: "40,000 BP", description: "Continuous habitation of the equatorial rainforest belt." }
    ]
  },
  {
    code: "L2b",
    shortName: "L2b",
    cladeName: "L2b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L2",
    definingSnps: ["8020A", "16390A"],
    ageYearsBp: "~25,000 BP",
    originRegion: "West Africa",
    historicalDescription: "Prominent West African maternal lineage common in Sierra Leone, Liberia, and Ghana.",
    ancientCultures: ["West African Coastal Traditions"],
    highFrequencyModern: ["Sierra Leone (15%)", "Ghana (12%)", "African Americans (8%)"],
    migrationPath: [
      { order: 1, region: "Upper Guinea Coast", timePeriod: "25,000 BP", description: "Coastal rainforest and savanna development." }
    ]
  },
  {
    code: "L2c",
    shortName: "L2c",
    cladeName: "L2c",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L2",
    definingSnps: ["4820G", "10352C"],
    ageYearsBp: "~22,000 BP",
    originRegion: "Senegambia & Cabo Verde",
    historicalDescription: "Distinctive Senegambian maternal lineage frequent in modern Senegal, The Gambia, and Cabo Verde.",
    ancientCultures: ["Senegambian Shell Middens"],
    highFrequencyModern: ["Senegal (18%)", "Cabo Verde (20%)", "African Americans (6%)"],
    migrationPath: [
      { order: 1, region: "Senegal River Basin", timePeriod: "22,000 BP", description: "Coastal fishing and agricultural communities." }
    ]
  },
  {
    code: "L2d",
    shortName: "L2d",
    cladeName: "L2d",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L2",
    definingSnps: ["8584A", "16303G"],
    ageYearsBp: "~20,000 BP",
    originRegion: "West-Central Africa",
    historicalDescription: "West and Central African maternal lineage distributed along the Gulf of Guinea.",
    ancientCultures: ["West African Late Stone Age"],
    highFrequencyModern: ["Nigeria", "Cameroon", "African Diaspora"],
    migrationPath: [
      { order: 1, region: "Gulf of Guinea", timePeriod: "20,000 BP", description: "Settlement across the West African forest belt." }
    ]
  },
  {
    code: "L3b",
    shortName: "L3b",
    cladeName: "L3b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3",
    definingSnps: ["3579T", "16124C"],
    ageYearsBp: "~30,000 BP",
    originRegion: "Sahel / Lake Chad Basin / West Africa",
    historicalDescription: "Widespread Sahelian and West African lineage common in Chadic and Niger-Congo speaking populations.",
    ancientCultures: ["Gajiganna Culture", "Sahelian Pastoralists"],
    highFrequencyModern: ["Chad (15%)", "Nigeria (12%)", "Mali (14%)", "African Americans (8%)"],
    migrationPath: [
      { order: 1, region: "Lake Chad Basin", timePeriod: "30,000 BP", description: "Pastoralist migrations across the Green Sahara and Sahel." }
    ]
  },
  {
    code: "L3d",
    shortName: "L3d",
    cladeName: "L3d",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3",
    definingSnps: ["6402T", "12172C"],
    ageYearsBp: "~28,000 BP",
    originRegion: "Central & West-Central Africa (Angola / Congo / Nigeria)",
    historicalDescription: "Key maternal lineage associated with the southern Bantu migration; strongly represented in African American and Afro-Brazilian populations.",
    ancientCultures: ["Bantu Agrarian Expansion"],
    highFrequencyModern: ["Angola (20%)", "DR Congo (18%)", "Nigeria (10%)", "African Americans (12%)", "Brazil (15%)"],
    migrationPath: [
      { order: 1, region: "Lower Congo & Angola", timePeriod: "28,000 BP", description: "Bantu expansion across South-Central Africa and maritime departure ports." }
    ]
  },
  {
    code: "L3e",
    shortName: "L3e",
    cladeName: "L3e",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3",
    definingSnps: ["10512G"],
    ageYearsBp: "~35,000 BP",
    originRegion: "Central / East Africa",
    historicalDescription: "The most widespread maternal lineage of the Bantu expansion and the single most common mtDNA haplogroup in African Americans (~25-30%).",
    ancientCultures: ["Bantu Metallurgical Expansion"],
    highFrequencyModern: ["Nigeria (25%)", "Mozambique (35%)", "African Americans (25%)", "Caribbean (30%)"],
    migrationPath: [
      { order: 1, region: "Cameroon-Nigeria Borderlands", timePeriod: "35,000 BP", description: "Massive demographic explosion carrying farming and iron-working across Africa." }
    ]
  },
  {
    code: "L3e2b",
    shortName: "L3e2b",
    cladeName: "L3e2b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L3e",
    definingSnps: ["5361C", "13803G"],
    ageYearsBp: "~12,000 BP",
    originRegion: "West-Central Africa (Gulf of Guinea / Angola)",
    historicalDescription: "Specific fine-branch subclade of L3e highly enriched in the Trans-Atlantic African diaspora.",
    ancientCultures: ["Kingdom of Kongo", "Angolan Diaspora"],
    highFrequencyModern: ["African Americans (15%)", "Jamaica (18%)", "Brazil (16%)", "Angola (15%)"],
    migrationPath: [
      { order: 1, region: "Angola & Bight of Benin", timePeriod: "12,000 BP", description: "Coastal settlement and diaspora dispersion." }
    ]
  },
  {
    code: "L0a",
    shortName: "L0a",
    cladeName: "L0a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L0",
    definingSnps: ["3918T", "15148A"],
    ageYearsBp: "~40,000 BP",
    originRegion: "East Africa (Great Lakes & Horn of Africa)",
    historicalDescription: "Ancient Eastern and South-Central African maternal lineage with deep roots in Mozambique, Kenya, Tanzania, and Yemen.",
    ancientCultures: ["East African Late Stone Age"],
    highFrequencyModern: ["Mozambique (25%)", "Rwanda (20%)", "Ethiopia / Yemen (15%)"],
    migrationPath: [
      { order: 1, region: "East African Rift", timePeriod: "40,000 BP", description: "Diversification along the East African corridor." }
    ]
  },
  {
    code: "L0d",
    shortName: "L0d",
    cladeName: "L0d",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "L0",
    definingSnps: ["3804C"],
    ageYearsBp: "~100,000 BP",
    originRegion: "Southern Africa (Kalahari / Cape Basin)",
    historicalDescription: "One of the most ancient surviving maternal branches of Homo sapiens, concentrated in Khoisan (!Kung, San, Nama) click-speaking hunter-gatherers.",
    ancientCultures: ["Southern African Middle Stone Age", "Klasies River Caves"],
    highFrequencyModern: ["San / Bushmen (up to 70%)", "Nama (50%)", "South Africa"],
    migrationPath: [
      { order: 1, region: "Kalahari Basin & Cape Coast", timePeriod: "100,000 BP", description: "Deepest maternal continuity in modern human evolutionary history." }
    ]
  },
  {
    code: "B2",
    shortName: "B2",
    cladeName: "B2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "B4",
    definingSnps: ["494G"],
    ageYearsBp: "~16,000 BP",
    originRegion: "Beringia / North & South America",
    historicalDescription: "One of the five primary founding maternal lineages of Indigenous Americans. Characterized by the 9-base-pair deletion in COII/tRNA-Lys.",
    ancientCultures: ["Anasazi", "Pueblo", "Maya", "Inca", "Taíno"],
    highFrequencyModern: ["Pueblo & Hopi (up to 70%)", "Maya (40%)", "Andean Quechua/Aymara (30%)", "Puerto Rican maternal lines (15%)"],
    migrationPath: [
      { order: 1, region: "Beringia to American Southwest & Andes", timePeriod: "16,000 BP", description: "Pacific coastal and inland expansion down through Mesoamerica and South America." }
    ]
  },
  {
    code: "C1b",
    shortName: "C1b",
    cladeName: "C1b",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "C",
    definingSnps: ["3552A", "9545G"],
    ageYearsBp: "~15,000 BP",
    originRegion: "South & Central America",
    historicalDescription: "Major indigenous founder matriline dominant in South America, particularly in the Andes, Amazon basin, and Gran Chaco.",
    ancientCultures: ["Chinchorro Mummies", "Inca Empire", "Mapuche"],
    highFrequencyModern: ["Chile / Mapuche (50%)", "Bolivia / Peru (40%)", "Argentina / Brazil Indigenous"],
    migrationPath: [
      { order: 1, region: "Pacific Coast to Patagonia", timePeriod: "15,000 BP", description: "Rapid southward expansion reaching Monte Verde in southern Chile." }
    ]
  },
  {
    code: "C1c",
    shortName: "C1c",
    cladeName: "C1c",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "C",
    definingSnps: ["11404C", "15547C"],
    ageYearsBp: "~14,000 BP",
    originRegion: "Mesoamerica & North America",
    historicalDescription: "Indigenous American founding lineage found in Mexico (Nahua, Mixtec), the American Southwest, and Canadian First Nations.",
    ancientCultures: ["Aztec Empire", "Teotihuacan", "Chupícuaro"],
    highFrequencyModern: ["Central Mexico (25%)", "Northern Mexico / Southwest US (20%)"],
    migrationPath: [
      { order: 1, region: "Mesoamerican Highlands", timePeriod: "14,000 BP", description: "Settlement of highland valleys and agricultural development." }
    ]
  },
  {
    code: "C1d",
    shortName: "C1d",
    cladeName: "C1d",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "C",
    definingSnps: ["6235C", "8386C"],
    ageYearsBp: "~14,000 BP",
    originRegion: "Pan-American (North, Central & South America)",
    historicalDescription: "Widespread indigenous founding lineage distributed from Canada to Tierra del Fuego.",
    ancientCultures: ["Pan-American Indigenous Cultures"],
    highFrequencyModern: ["Uruguay (Charrua descendants)", "Colombia", "North American Indigenous"],
    migrationPath: [
      { order: 1, region: "North to South America", timePeriod: "14,000 BP", description: "Continuous continental dispersal." }
    ]
  },
  {
    code: "D1",
    shortName: "D1",
    cladeName: "D1",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "D",
    definingSnps: ["209C", "16271C"],
    ageYearsBp: "~16,000 BP",
    originRegion: "Beringia / Pan-American",
    historicalDescription: "Foundational pan-American indigenous maternal lineage, accounting for over 25% of all Indigenous American maternal genomes.",
    ancientCultures: ["Inuit", "Athabaskan", "Mississippian", "Andean Mummies"],
    highFrequencyModern: ["Patagonia / Yamana (up to 80%)", "Aleut (40%)", "Native North Americans (30%)", "Andeans (30%)"],
    migrationPath: [
      { order: 1, region: "Beringia to Tierra del Fuego", timePeriod: "16,000 BP", description: "Early coastal and interior migration spanning the entire length of the Western Hemisphere." }
    ]
  },
  {
    code: "D4h3a",
    shortName: "D4h3a",
    cladeName: "D4h3a (Clovis / Anzick)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "D4",
    definingSnps: ["825A", "16241G"],
    ageYearsBp: "~15,000 BP",
    originRegion: "Pacific Coastal North America / Montana",
    historicalDescription: "Rare, iconic Pacific coastal founder lineage confirmed in the 12,600-year-old Anzick-1 Clovis child and ancient Alaskan coastal specimens (Shuká Káa).",
    ancientCultures: ["Clovis Culture (Anzick-1)", "On Your Knees Cave (Shuká Káa)"],
    highFrequencyModern: ["Southern Chile / Fuegians (rare)", "Mexican Indigenous (1-2%)", "Northwest Coast Native Americans (2-3%)"],
    migrationPath: [
      { order: 1, region: "Pacific Coast Kelp Highway", timePeriod: "15,000 BP", description: "Maritime coastal expansion south of the glacial ice sheets." }
    ]
  },
  {
    code: "X2a",
    shortName: "X2a",
    cladeName: "X2a (Kennewick / Ancient One)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "X",
    definingSnps: ["153G", "16221T"],
    ageYearsBp: "~14,000 BP",
    originRegion: "Northern North America (Great Lakes / Columbia River)",
    historicalDescription: "Indigenous North American founder lineage confirmed in the ~9,000-year-old Kennewick Man ('The Ancient One') and prevalent among Algonquian and Siouan peoples.",
    ancientCultures: ["Kennewick Man (Ancient One)", "Old Copper Complex", "Hopewell"],
    highFrequencyModern: ["Ojibwe / Chippewa (up to 25%)", "Sioux / Lakota (15%)", "Yakama / Colville (Kennewick descendants)"],
    migrationPath: [
      { order: 1, region: "Pacific Northwest to Great Lakes", timePeriod: "14,000 BP", description: "Unique northern trans-continental distribution across North American woodlands." }
    ]
  },
  {
    code: "B4a1a1",
    shortName: "B4a1a1",
    cladeName: "B4a1a1 (Polynesian Motif)",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "B4",
    definingSnps: ["14022C", "16247G"],
    ageYearsBp: "~3,500 BP",
    originRegion: "Taiwan / Island Southeast Asia to Polynesia",
    historicalDescription: "The world-famous 'Polynesian Motif' that drove the Lapita oceanic colonization of Samoa, Tonga, Hawaii, Tahiti, Easter Island, and New Zealand (Māori).",
    ancientCultures: ["Lapita Maritime Culture", "Polynesian Voyagers"],
    highFrequencyModern: ["Polynesians / Māori / Samoans (up to 95%)", "Micronesians (75%)", "Madagascar (25%)"],
    migrationPath: [
      { order: 1, region: "Taiwan to Bismarck Archipelago", timePeriod: "3,500 BP", description: "Lapita maritime voyaging using double-hulled outrigger canoes." },
      { order: 2, region: "Remote Oceania (Hawaii, Rapa Nui, Aotearoa)", timePeriod: "1,500–800 BP", description: "Long-distance open ocean navigation across the Polynesian Triangle." }
    ]
  },
  {
    code: "F1a",
    shortName: "F1a",
    cladeName: "F1a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "F",
    definingSnps: ["16232T"],
    ageYearsBp: "~18,000 BP",
    originRegion: "Southeast Asia (Vietnam / South China)",
    historicalDescription: "Dominant maternal lineage across Mainland and Island Southeast Asia, associated with Austroasiatic and Austronesian agricultural expansion.",
    ancientCultures: ["Đông Sơn Culture", "Maritime Southeast Asian Neolithic"],
    highFrequencyModern: ["Vietnam (25%)", "Thailand / Laos (20%)", "Indonesia / Philippines (15%)", "Southern China (12%)"],
    migrationPath: [
      { order: 1, region: "Red River Delta & Mekong Basin", timePeriod: "18,000 BP", description: "Rice agricultural expansion across Southeast Asia and the Sunda Islands." }
    ]
  },
  {
    code: "N9a",
    shortName: "N9a",
    cladeName: "N9a",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "N",
    definingSnps: ["12690C"],
    ageYearsBp: "~20,000 BP",
    originRegion: "East Asia (Yellow River / Korean Peninsula / Japan)",
    historicalDescription: "East Asian maternal lineage common in Korea, Japan (Yayoi agricultural expansion), and Northern Han Chinese.",
    ancientCultures: ["Yayoi Culture", "Mumun Pottery Period", "Longshan Culture"],
    highFrequencyModern: ["Korea (8%)", "Japan (7%)", "Northern China (6%)"],
    migrationPath: [
      { order: 1, region: "Shandong Peninsula & Korea to Japanese Archipelago", timePeriod: "20,000 BP", description: "Neolithic wet-rice farming expansion into Japan." }
    ]
  },
  {
    code: "M2",
    shortName: "M2",
    cladeName: "M2",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "M",
    definingSnps: ["16274G"],
    ageYearsBp: "~50,000 BP",
    originRegion: "South Asia (Indian Subcontinent)",
    historicalDescription: "Deep indigenous Indian maternal founder lineage, highest in Dravidian-speaking tribal populations of Southern and Central India.",
    ancientCultures: ["South Asian Paleolithic"],
    highFrequencyModern: ["Indian Dravidian / Tribal groups (up to 30%)", "South India (15%)", "Sri Lanka (10%)"],
    migrationPath: [
      { order: 1, region: "Deccan Plateau & Western Ghats", timePeriod: "50,000 BP", description: "Continuous indigenous presence since the Initial Out-of-Africa coastal migration." }
    ]
  },
  {
    code: "M3",
    shortName: "M3",
    cladeName: "M3",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "M",
    definingSnps: ["12979G"],
    ageYearsBp: "~45,000 BP",
    originRegion: "South Asia (Western & Northern India)",
    historicalDescription: "Ancient autochthonous South Asian maternal lineage frequent across Gujarat, Rajasthan, and the Gangetic plain.",
    ancientCultures: ["Indus Valley Agrarian Transitions"],
    highFrequencyModern: ["Western India / Gujarat (12%)", "North India (10%)"],
    migrationPath: [
      { order: 1, region: "Indus-Sarasvati River Basins", timePeriod: "45,000 BP", description: "Indigenous South Asian Pleistocene development." }
    ]
  },
  {
    code: "M5",
    shortName: "M5",
    cladeName: "M5",
    lineageType: "MATERNAL_MTDNA",
    parentClade: "M",
    definingSnps: ["12285T"],
    ageYearsBp: "~40,000 BP",
    originRegion: "South Asia & Eastern India",
    historicalDescription: "Autochthonous Indian maternal lineage with wide distribution across caste and tribal communities in India and Bangladesh.",
    ancientCultures: ["Eastern Indian Neolithic"],
    highFrequencyModern: ["East India / Bengal / Odisha (15%)", "Central India (10%)"],
    migrationPath: [
      { order: 1, region: "Ganges Delta & Chota Nagpur Plateau", timePeriod: "40,000 BP", description: "Early hunter-gatherer and riverine adaptations." }
    ]
  },"""

# 2. Update haplogroupTree.ts
with open("src/data/haplogroupTree.ts") as f:
    tree_code = f.read()

# Insert Y-DNA tree nodes before MT_DNA_HAPLOGROUPS
marker_tree_mt = "export const MT_DNA_HAPLOGROUPS: HaplogroupDefinition[] = ["
if marker_tree_mt in tree_code:
    tree_code = tree_code.replace(marker_tree_mt, NEW_YDNA_TREE_NODES + "\n];\n\n" + marker_tree_mt)
else:
    print("Warning: marker_tree_mt not found in haplogroupTree.ts")

# Insert mtDNA tree nodes before ending ALL_HAPLOGROUPS
marker_all_tree = "export const ALL_HAPLOGROUPS: HaplogroupDefinition[] = ["
if marker_all_tree in tree_code:
    tree_code = tree_code.replace(marker_all_tree, NEW_MTDNA_TREE_NODES + "\n];\n\n" + marker_all_tree)
else:
    print("Warning: marker_all_tree not found in haplogroupTree.ts")

with open("src/data/haplogroupTree.ts", "w") as f:
    f.write(tree_code)

print("Updated src/data/haplogroupTree.ts successfully.")
