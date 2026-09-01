#!/usr/bin/env python3

# 1. Update hmitoGeoEngine.ts
with open("src/services/hmitoGeoEngine.ts", "r") as f:
    hmito_code = f.read()

new_hmito_entries = """  // African L Lineages
  'L1B': {
    haplogroup: 'L1b',
    macroClade: 'L1',
    continentalHomeland: 'West Africa (Senegal / Guinea / Mali)',
    subRegionalBiogeography: 'Senegambia to Niger River Basin',
    historicalMigrationEpoch: 'Upper Paleolithic (~35,000 BP)',
    primaryHistoricalPopulations: ['Senegambian Foragers', 'West African Agronomists'],
    modernDistributionHotspots: ['Senegal (30%)', 'Mali', 'African Americans (18%)'],
    paleoclimaticContext: 'Savanna expansion during Late Pleistocene climatic fluctuations.',
    archeologicalCorrelation: 'Senegambian megalithic monuments and Ounjougou cultural complex.'
  },
  'L1C': {
    haplogroup: 'L1c',
    macroClade: 'L1',
    continentalHomeland: 'Central African Rainforest (Congo Basin / Cameroon)',
    subRegionalBiogeography: 'Equatorial Central African Rainforest Belt',
    historicalMigrationEpoch: 'Late Stone Age (~40,000 BP)',
    primaryHistoricalPopulations: ['BaAka & Biaka Rainforest Foragers', 'Bantu Early Adopters'],
    modernDistributionHotspots: ['Biaka Pygmies (95%)', 'Gabon (25%)', 'Cameroon (20%)', 'African Americans (7%)'],
    paleoclimaticContext: 'Continuous Pleistocene equatorial rainforest arboreal adaptations.',
    archeologicalCorrelation: 'Shum Laka rock shelter and ancient rainforest microlithic toolkits.'
  },
  'L3E': {
    haplogroup: 'L3e',
    macroClade: 'L3',
    continentalHomeland: 'Central / East Africa to Gulf of Guinea',
    subRegionalBiogeography: 'Sub-Saharan Bantu Agrarian Corridor',
    historicalMigrationEpoch: 'Late Pleistocene to Iron Age (~35,000 – 3,000 BP)',
    primaryHistoricalPopulations: ['Proto-Bantu Metallurgists', 'Niger-Congo Agrarian Pioneer Communities'],
    modernDistributionHotspots: ['Nigeria (25%)', 'Mozambique (35%)', 'African Americans (25%)', 'Caribbean (30%)'],
    paleoclimaticContext: 'Holocene Green Sahara drying driving southward migration.',
    archeologicalCorrelation: 'Nok culture terracotta and Early Iron Age smelting furnaces.'
  },
  'L3E2B': {
    haplogroup: 'L3e2b',
    macroClade: 'L3e',
    continentalHomeland: 'West-Central Africa (Angola / Congo / Bight of Benin)',
    subRegionalBiogeography: 'Atlantic West-Central African Coastal Horizon',
    historicalMigrationEpoch: 'Holocene (~12,000 – 400 BP)',
    primaryHistoricalPopulations: ['Kingdom of Kongo', 'Angolan & Mbundu Peoples'],
    modernDistributionHotspots: ['African Americans (15%)', 'Jamaica (18%)', 'Brazil (16%)', 'Angola (15%)'],
    paleoclimaticContext: 'Atlantic coastal maritime and forest agriculture.',
    archeologicalCorrelation: 'Mbanza Kongo royal capital excavations.'
  },
  'L0D': {
    haplogroup: 'L0d',
    macroClade: 'L0',
    continentalHomeland: 'Southern Africa (Kalahari / Cape Basin)',
    subRegionalBiogeography: 'Southern African Hunter-Gatherer Refugium',
    historicalMigrationEpoch: 'Middle Stone Age (~100,000 BP)',
    primaryHistoricalPopulations: ['San / Bushmen Click-Speaking Foragers'],
    modernDistributionHotspots: ['Kalahari San (70%)', 'Nama (50%)', 'South Africa'],
    paleoclimaticContext: 'Deepest modern human demographic continuity.',
    archeologicalCorrelation: 'Blombos Cave ochre engravings and Klasies River Caves.'
  },
  'B2': {
    haplogroup: 'B2',
    macroClade: 'B4',
    continentalHomeland: 'Beringia to American Southwest & Andes',
    subRegionalBiogeography: 'Pan-American Indigenous Founder Lineage',
    historicalMigrationEpoch: 'Terminal Pleistocene (~16,000 BP)',
    primaryHistoricalPopulations: ['Paleo-Indians', 'Anasazi / Pueblo', 'Maya', 'Inca'],
    modernDistributionHotspots: ['Pueblo / Hopi (70%)', 'Maya (40%)', 'Quechua / Aymara (30%)'],
    paleoclimaticContext: 'Deglaciation of the North American cordillera.',
    archeologicalCorrelation: 'Chaco Canyon Pueblo ruins and Andean mummy complexes.'
  },
  'D4H3A': {
    haplogroup: 'D4h3a',
    macroClade: 'D4',
    continentalHomeland: 'Pacific Coastal North America (Kelp Highway)',
    subRegionalBiogeography: 'Paleo-Indian Pacific Maritime Coastal Corridor',
    historicalMigrationEpoch: 'Late Glacial (~15,000 BP)',
    primaryHistoricalPopulations: ['Clovis Culture (Anzick-1)', 'Pacific Coastal Maritime Foragers'],
    modernDistributionHotspots: ['Fuegians / Yamana', 'Northwest Coast Native Americans', 'Mexican Indigenous (rare)'],
    paleoclimaticContext: 'Pacific kelp highway coastal foraging route south of the Cordilleran ice sheet.',
    archeologicalCorrelation: 'Anzick-1 Clovis child burial (Montana) and Shuká Káa (On Your Knees Cave, Alaska).'
  },
  'B4A1A1': {
    haplogroup: 'B4a1a1',
    macroClade: 'B4',
    continentalHomeland: 'Island Southeast Asia / Taiwan to Remote Oceania',
    subRegionalBiogeography: 'Lapita Maritime Oceanic Expansion ("Polynesian Motif")',
    historicalMigrationEpoch: 'Late Holocene (~3,500 – 1,000 BP)',
    primaryHistoricalPopulations: ['Lapita Maritime Navigators', 'Polynesian & Māori Voyagers'],
    modernDistributionHotspots: ['Samoa (95%)', 'Tonga (90%)', 'Māori / New Zealand (85%)', 'Hawaii (80%)'],
    paleoclimaticContext: 'ENSO trade wind voyaging across the open Pacific.',
    archeologicalCorrelation: 'Dentate-stamped Lapita pottery across the Bismarck Archipelago and Polynesia.'
  },
"""

idx_x2a = hmito_code.find("'X2A': {")
if idx_x2a != -1:
    hmito_code = hmito_code[:idx_x2a] + new_hmito_entries + hmito_code[idx_x2a:]

with open("src/services/hmitoGeoEngine.ts", "w") as f:
    f.write(hmito_code)

print("Updated hmitoGeoEngine.ts.")
