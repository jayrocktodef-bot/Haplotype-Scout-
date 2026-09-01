/**
 * Ancient Archaeological Sample Catalog (Uniparental Y-DNA & mtDNA)
 * 
 * Sequenced ancient individuals from published paleogenomics studies
 * (Max Planck EVA, David Reich Lab, Willerslev GeoGenetics).
 */

export interface AncientSampleSpecimen {
  id: string;
  name: string;
  excavationSite: string;
  country: string;
  ageYearsBp: string;
  calibratedBceDate: string;
  archaeologicalCulture: string;
  paternalYdna: string;
  maternalMtdna: string;
  yDnaCladeName?: string;
  mtDnaCladeName?: string;
  studyCitation: string;
  summaryDescription: string;
  notableFindings: string;
  lat: number;
  lng: number;
}

export const ANCIENT_ARCHAEOLOGICAL_SPECIMENS: AncientSampleSpecimen[] = [
  {
    id: 'otzi_iceman',
    name: 'Ötzi the Iceman',
    excavationSite: 'Hauslabjoch, Ötztal Alps',
    country: 'Italy / Austria Border',
    ageYearsBp: '~5,300 BP',
    calibratedBceDate: '~3300 BCE (Copper Age / Chalcolithic)',
    archaeologicalCulture: 'Alpine Early Chalcolithic / Tamins Horizon',
    paternalYdna: 'G2a2a1a-L91',
    maternalMtdna: 'K1f',
    yDnaCladeName: 'G2a-L91',
    mtDnaCladeName: 'K1f (Extinct Alpine Matriline)',
    studyCitation: 'Keller et al. 2012 / Wang et al. 2023 (Cell Genomics)',
    summaryDescription: 'Exceptionally preserved natural glacier mummy possessing Early European Farmer (EEF) ancestry with high Mediterranean / Sardinian genetic affinity.',
    notableFindings: 'Carried brown eyes, dark skin alleles, lactose intolerance, and early agriculturalist cardiovascular predisposition SNPs.',
    lat: 46.7794,
    lng: 10.8397
  },
  {
    id: 'cheddar_man',
    name: 'Cheddar Man',
    excavationSite: 'Gough\'s Cave, Cheddar Gorge, Somerset',
    country: 'United Kingdom',
    ageYearsBp: '~10,000 BP',
    calibratedBceDate: '~8000 BCE (Mesolithic Britain)',
    archaeologicalCulture: 'Western Hunter-Gatherer (WHG) / Federmesser Horizon',
    paternalYdna: 'I2a2-M223',
    maternalMtdna: 'U5b1b1',
    yDnaCladeName: 'I2a-M223',
    mtDnaCladeName: 'U5b1b1',
    studyCitation: 'Brace et al. 2019 (Nature Ecology & Evolution)',
    summaryDescription: 'Complete Mesolithic Briton skeleton showing the standard European indigenous hunter-gatherer genomic profile prior to the arrival of Anatolian farmers.',
    notableFindings: 'Exhibited genetic alleles for blue/green eyes, dark to black skin pigmentation, and dark curly hair characteristic of Western Hunter-Gatherers.',
    lat: 51.2825,
    lng: -2.7661
  },
  {
    id: 'yamnaya_samara',
    name: 'Yamnaya Steppe Pastoralist',
    excavationSite: 'Sok River Kurgan, Samara Oblast',
    country: 'Russia (Pontic-Caspian Steppe)',
    ageYearsBp: '~4,800 BP',
    calibratedBceDate: '~2800 BCE (Early Bronze Age)',
    archaeologicalCulture: 'Yamnaya Pit-Grave Steppe Horizon',
    paternalYdna: 'R1b1a1a2-Z2103',
    maternalMtdna: 'U4a1',
    yDnaCladeName: 'R1b-Z2103 (Eastern Steppe R1b)',
    mtDnaCladeName: 'U4a1 (Steppe Hunter-Gatherer)',
    studyCitation: 'Haak et al. 2015 / Allentoft et al. 2015 (Nature)',
    summaryDescription: 'Nomadic pastoralist from the Eurasian steppe representing the Eastern Hunter-Gatherer (EHG) and Caucasus Hunter-Gatherer (CHG) genetic fusion that expanded into Europe.',
    notableFindings: 'Key vector for the dissemination of Proto-Indo-European languages, horse domestication, pastoralism, and massive genetic turnover in Bronze Age Europe.',
    lat: 53.2001,
    lng: 50.1500
  },
  {
    id: 'viking_sigtuna',
    name: 'Viking Age Sigtuna 844',
    excavationSite: 'Kvarteret Trädgårdsmästaren, Sigtuna',
    country: 'Sweden',
    ageYearsBp: '~1,050 BP',
    calibratedBceDate: '~950 CE (Middle Viking Age)',
    archaeologicalCulture: 'Scandinavian Viking Urban Horizon',
    paternalYdna: 'I1a-M253',
    maternalMtdna: 'H1a',
    yDnaCladeName: 'I1-M253 (Ultra-Norse Founder)',
    mtDnaCladeName: 'H1a (Western Atlantic Matriarch)',
    studyCitation: 'Margaryan et al. 2020 (Nature - Population Genomics of the Viking World)',
    summaryDescription: 'High-status Norse male excavated with iron weaponry in early medieval Sigtuna, bearing classic Scandinavian founder lineages.',
    notableFindings: 'Exhibited typical Scandinavian tall stature alleles, lactase persistence, and high genetic continuity with modern Swedish and Norwegian populations.',
    lat: 59.6173,
    lng: 17.7236
  },
  {
    id: 'anzick_clovis',
    name: 'Anzick-1 (Clovis Child)',
    excavationSite: 'Wilsall, Park County, Montana',
    country: 'United States',
    ageYearsBp: '~12,600 BP',
    calibratedBceDate: '~10600 BCE (Terminal Pleistocene Clovis)',
    archaeologicalCulture: 'Clovis Complex (Paleo-Indian)',
    paternalYdna: 'Q1a2-L54',
    maternalMtdna: 'D4h3a',
    yDnaCladeName: 'Q-L54 (Pan-American Founder)',
    mtDnaCladeName: 'D4h3a (Pacific Coastal Migration)',
    studyCitation: 'Rasmussen et al. 2014 (Nature)',
    summaryDescription: 'Only known human burial directly associated with Clovis stone and bone tool artifacts, showing direct ancestry to indigenous populations of the Americas.',
    notableFindings: 'Confirmed the direct ancestor-descendant relationship between ancient Clovis peoples and modern Native American tribes.',
    lat: 45.9922,
    lng: -110.6622
  },
  {
    id: 'taforalt_morocco',
    name: 'Taforalt Iberomaurusian 6',
    excavationSite: 'Grotte des Pigeons, Taforalt',
    country: 'Morocco',
    ageYearsBp: '~15,100 BP',
    calibratedBceDate: '~13100 BCE (Late Epipaleolithic)',
    archaeologicalCulture: 'Iberomaurusian Culture',
    paternalYdna: 'E1b1b1a1-M78',
    maternalMtdna: 'U6a7b',
    yDnaCladeName: 'E-M78 (North / East African Patriarch)',
    mtDnaCladeName: 'U6a7b (North African Maghreb Founder)',
    studyCitation: 'van de Loosdrecht et al. 2018 (Science)',
    summaryDescription: 'Oldest ancient DNA from North Africa, showing a genetic profile roughly two-thirds Near Eastern (Natufian-like) and one-third Sub-Saharan African.',
    notableFindings: 'Demonstrated deep prehistoric trans-Saharan gene flow and connections between the Maghreb and the Epipaleolithic Levant long before the Holocene.',
    lat: 34.8142,
    lng: -2.4042
  },
  {
    id: 'tianyuan_china',
    name: 'Tianyuan Man',
    excavationSite: 'Tianyuan Cave, Zhoukoudian, Beijing',
    country: 'China',
    ageYearsBp: '~40,000 BP',
    calibratedBceDate: '~38000 BCE (Early Upper Paleolithic)',
    archaeologicalCulture: 'Early Upper Paleolithic East Asia',
    paternalYdna: 'K2b-P331',
    maternalMtdna: 'B4\'5',
    yDnaCladeName: 'K2b-P331 (Root Ancestor to P/R/Q)',
    mtDnaCladeName: 'B4\'5 (East Asian / Pacific Root)',
    studyCitation: 'Fu et al. 2013 (PNAS) / Yang et al. 2017 (Current Biology)',
    summaryDescription: 'Ancient individual showing that early modern humans in East Asia had already diverged from the ancestral line leading to ancient Europeans by 40,000 years ago.',
    notableFindings: 'Carried equal proportions of Neanderthal ancestry to contemporaneous Europeans, but ancestral to East Asians and Indigenous Americans.',
    lat: 39.7333,
    lng: 115.9333
  },
  {
    id: 'vindija_neanderthal',
    name: 'Vindija 33.19 Neanderthal',
    excavationSite: 'Vindija Cave, Donja Voća',
    country: 'Croatia',
    ageYearsBp: '~52,000 BP',
    calibratedBceDate: '~50000 BCE (Middle Paleolithic)',
    archaeologicalCulture: 'Mousterian Complex',
    paternalYdna: 'Archaic Hominin Stem',
    maternalMtdna: 'Neanderthal mtDNA Lineage',
    yDnaCladeName: 'Archaic Non-Modern Stem',
    mtDnaCladeName: 'Archaic Neanderthal Clade',
    studyCitation: 'Prüfer et al. 2017 (Science)',
    summaryDescription: 'High-coverage (30x) female Neanderthal genome providing the foundational reference for modern human non-African archaic introgression mapping.',
    notableFindings: 'Identified the exact introgressed genomic segments that modern non-African humans inherited through ancient interbreeding ~55,000 years ago.',
    lat: 46.2994,
    lng: 16.0717
  }
];
