#!/usr/bin/env python3

NEW_SPECIMENS = """  {
    id: 'rathlin_1',
    name: 'Rathlin 1 (Bronze Age Ireland)',
    excavationSite: 'Rathlin Island, County Antrim',
    country: 'Northern Ireland, UK',
    ageYearsBp: '~3,700 BP',
    calibratedBceDate: '~1700 BCE (Early Bronze Age)',
    archaeologicalCulture: 'Irish Bronze Age Cist Burial',
    paternalYdna: 'R1b1a2a1a2b-L21',
    maternalMtdna: 'K1a2a',
    yDnaCladeName: 'R1b-L21',
    mtDnaCladeName: 'K1a2a',
    studyCitation: 'Cassidy et al. 2016 (PNAS)',
    summaryDescription: 'Early Bronze Age individual marking the massive steppe-derived genomic turnover in Ireland (~90% population replacement of Neolithic farmers).',
    notableFindings: 'First direct ancient genomic proof of the European lactase persistence allele (LCT-13910*T) becoming established; derived light skin (SLC24A5) and blue eyes (HERC2).',
    lat: 55.2974,
    lng: -6.2081
  },
  {
    id: 'villabruna_1',
    name: 'Villabruna 1 (Ripari Villabruna)',
    excavationSite: 'Sovramonte, Cismon Valley, Dolomites',
    country: 'Italy (Alps)',
    ageYearsBp: '~14,000 BP',
    calibratedBceDate: '~12000 BCE (Late Epigravettian)',
    archaeologicalCulture: 'Epigravettian Late Upper Paleolithic',
    paternalYdna: 'R1b1a',
    maternalMtdna: 'U5b2b',
    yDnaCladeName: 'R1b1a',
    mtDnaCladeName: 'U5b2b',
    studyCitation: 'Fu et al. 2016 (Nature)',
    summaryDescription: 'Epigravettian hunter-gatherer from the Italian Alps representing the foundational source of Western European Hunter-Gatherers (WHG) following the Last Glacial Maximum.',
    notableFindings: 'Earliest known specimen carrying the light skin pigmentation allele (SLC24A5 A111T) in Western Eurasia; brown eyes; oldest known evidence of intentional dental intervention.',
    lat: 46.0667,
    lng: 11.8000
  },
  {
    id: 'spirit_cave_mummy',
    name: 'Spirit Cave Mummy',
    excavationSite: 'Spirit Cave, Lahontan Basin, Nevada',
    country: 'United States',
    ageYearsBp: '~10,600 BP',
    calibratedBceDate: '~8600 BCE (Paleo-Indian)',
    archaeologicalCulture: 'Great Basin Early Archaic Culture',
    paternalYdna: 'Q1a3a-M3',
    maternalMtdna: 'A2',
    yDnaCladeName: 'Q-M3',
    mtDnaCladeName: 'A2',
    studyCitation: 'Moreno-Mayar et al. 2018 (Science)',
    summaryDescription: 'The oldest known human mummy in North America, naturally preserved in a Great Basin rock shelter with woven tule matting and rabbit-skin textiles.',
    notableFindings: 'Genomically demonstrates close ancestral affinity to contemporary Native Americans and Mesoamerican/South American populations, proving continuous deep Indigenous continuity.',
    lat: 39.4667,
    lng: -118.6000
  },
  {
    id: 'mota_cave',
    name: 'Mota Man (Horn of Africa)',
    excavationSite: 'Mota Cave, Gamo Highlands',
    country: 'Ethiopia (East Africa)',
    ageYearsBp: '~4,500 BP',
    calibratedBceDate: '~2500 BCE (Late Stone Age)',
    archaeologicalCulture: 'Ethiopian Highland Forager',
    paternalYdna: 'E1b1a-M180',
    maternalMtdna: 'L3e',
    yDnaCladeName: 'E-M180',
    mtDnaCladeName: 'L3e',
    studyCitation: 'Gallego Llorente et al. 2015 (Science)',
    summaryDescription: 'First ancient human genome sequenced from Sub-Saharan Africa, serving as the definitive reference genome for unadmixed African populations prior to subsequent migrations.',
    notableFindings: 'Carried unadmixed Sub-Saharan African alleles, lactose non-persistence, and traditional African hunter-gatherer metabolic traits.',
    lat: 6.2000,
    lng: 37.5000
  },
  {
    id: 'peqi_in_cave',
    name: 'Peqi’in Cave Chalcolithic Priest',
    excavationSite: 'Peqi’in Ossuary Cave, Upper Galilee',
    country: 'Israel (Levant)',
    ageYearsBp: '~6,200 BP',
    calibratedBceDate: '~4200 BCE (Ghassulian Chalcolithic)',
    archaeologicalCulture: 'Ghassulian Chalcolithic Culture',
    paternalYdna: 'J2a-M410',
    maternalMtdna: 'T1a',
    yDnaCladeName: 'J2a',
    mtDnaCladeName: 'T1a',
    studyCitation: 'Harney et al. 2018 (Nature Communications)',
    summaryDescription: 'Individual from a monumental burial cave containing over 600 secondary burials and decorated ossuaries in the Upper Galilee.',
    notableFindings: 'Revealed a ~57% Levantine / ~26% Anatolian / ~17% Iranian genetic fusion that transformed the Near East during the Chalcolithic and Early Bronze Age.',
    lat: 32.9750,
    lng: 35.3333
  },"""

with open("src/data/ancientDnaDatabase.ts", "r") as f:
    code = f.read()

idx_end = code.rfind("];")
if idx_end != -1:
    code = code[:idx_end] + ",\n" + NEW_SPECIMENS.strip() + "\n" + code[idx_end:]

with open("src/data/ancientDnaDatabase.ts", "w") as f:
    f.write(code)

print("Updated ancientDnaDatabase.ts with new specimens.")
