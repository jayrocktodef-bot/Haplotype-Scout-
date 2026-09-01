package com.example.data.db

import com.example.data.model.HaplogroupDefinition
import com.example.data.model.LineageType
import com.example.data.model.MigrationStep

object HaplogroupTreeData {

    // ==========================================
    // Y-DNA PATERNAL HAPLOGROUPS TREE DEFINITION
    // ==========================================
    val Y_DNA_HAPLOGROUPS: List<HaplogroupDefinition> = listOf(
        // ROOT / EARLY CLADES
        HaplogroupDefinition(
            code = "Y-Adam",
            shortName = "A00 / Y-Adam",
            cladeName = "Y-Stem Root",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = null,
            definingSnps = listOf("PR2921", "AF3"),
            ageYearsBp = "~275,000 BP",
            originRegion = "West / Central Africa",
            historicalDescription = "The most recent common paternal ancestor from whom all living humans are patrilineally descended. Discovered in Cameroon and ancient Central African hunter-gatherer lines.",
            ancientCultures = listOf("Middle Stone Age Africa"),
            highFrequencyModern = listOf("Cameroon Mbo (rare, ~1%)", "Central Africa"),
            migrationPath = listOf(
                MigrationStep(1, "Central Africa", "275,000 BP", "Emergence of deepest modern human Y-chromosome lineage.")
            )
        ),
        HaplogroupDefinition(
            code = "A",
            shortName = "Haplogroup A",
            cladeName = "A-L1085",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "Y-Adam",
            definingSnps = listOf("L1085", "M91", "P97"),
            ageYearsBp = "~140,000 BP",
            originRegion = "Eastern and Southern Africa",
            historicalDescription = "One of the basal human paternal branches, primarily found in Khoisan hunter-gatherers of Southern Africa and Nilotic populations of East Africa.",
            ancientCultures = listOf("African Hunter-Gatherers"),
            highFrequencyModern = listOf("Khoisan (up to 50%)", "Dinka / Nilotic (40%)", "Ethiopia (15%)"),
            migrationPath = listOf(
                MigrationStep(1, "Rift Valley, East Africa", "140,000 BP", "Diversification across eastern and southern African hunting-gathering bands.")
            )
        ),
        HaplogroupDefinition(
            code = "BT",
            shortName = "BT Macroclade",
            cladeName = "BT-M9040",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "Y-Adam",
            definingSnps = listOf("M9040", "M8968"),
            ageYearsBp = "~130,000 BP",
            originRegion = "Sub-Saharan Africa",
            historicalDescription = "Parent clade to B and CT. Represents the broad expansion of anatomically modern humans across the African continent.",
            ancientCultures = listOf("Middle Paleolithic Africa"),
            highFrequencyModern = listOf("Found ancestral to all Non-A lineages"),
            migrationPath = listOf(
                MigrationStep(1, "East Africa", "130,000 BP", "Ancestral split leading to B and out-of-Africa CT clades.")
            )
        ),
        HaplogroupDefinition(
            code = "CT",
            shortName = "CT Macroclade (Out of Africa Root)",
            cladeName = "CT-M168",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "BT",
            definingSnps = listOf("M168", "M294", "P9.1", "rs9306841"),
            ageYearsBp = "~88,000 BP",
            originRegion = "Northeast Africa / Near East",
            historicalDescription = "The defining common paternal lineage of all non-African men and significant North/East African populations. Marks the great human migration out of Africa.",
            ancientCultures = listOf("Early Out-of-Africa Pioneers"),
            highFrequencyModern = listOf("Ancestral to C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, T"),
            migrationPath = listOf(
                MigrationStep(1, "Northeast Africa", "88,000 BP", "Crossing the Bab-el-Mandeb / Sinai peninsula into Eurasia.")
            )
        ),
        HaplogroupDefinition(
            code = "E",
            shortName = "Haplogroup E",
            cladeName = "E-M96",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M96", "P29", "P150", "rs9786481"),
            ageYearsBp = "~65,000 BP",
            originRegion = "Northeast Africa / Levant",
            historicalDescription = "Major African and Mediterranean lineage, splitting into E1a and dominant E1b clades.",
            ancientCultures = listOf("Late Paleolithic Levant / Nile Valley"),
            highFrequencyModern = listOf("North Africa", "Horn of Africa", "Sub-Saharan Africa", "Southern Europe"),
            migrationPath = listOf(
                MigrationStep(1, "Red Sea Corridor", "65,000 BP", "Spread throughout the Sahara, Mediterranean, and sub-Saharan zones.")
            )
        ),
        HaplogroupDefinition(
            code = "E1b1a",
            shortName = "E-M2 (E-V38)",
            cladeName = "E1b1a / E-M2",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "E",
            definingSnps = listOf("M2", "V38", "P1", "rs2032597"),
            ageYearsBp = "~40,000 BP",
            originRegion = "West Africa",
            historicalDescription = "The predominant paternal lineage among West African and Bantu-speaking populations, carried across Africa during the agricultural Bantu expansion.",
            ancientCultures = listOf("Nok Culture", "Bantu Agricultural Pioneers"),
            highFrequencyModern = listOf("Nigeria (Yoruba, Igbo ~80-90%)", "Ghana (75%)", "African Americans (~60-70%)", "Central/Southern Africa (60-80%)"),
            migrationPath = listOf(
                MigrationStep(1, "West Africa (Niger-Congo)", "40,000 BP", "Agricultural revolution and population explosion."),
                MigrationStep(2, "Sub-Saharan Africa", "3,000 BP", "Major Bantu migrations southward and eastward.")
            )
        ),
        HaplogroupDefinition(
            code = "E1b1b",
            shortName = "E-M35",
            cladeName = "E1b1b / E-M35",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "E",
            definingSnps = listOf("M35", "L117", "M215", "rs9306847"),
            ageYearsBp = "~35,000 BP",
            originRegion = "Horn of Africa / North Africa",
            historicalDescription = "Associated with the Afroasiatic language family and the early spread of pastoralism and Neolithic farming into Europe via the Mediterranean.",
            ancientCultures = listOf("Natufian", "Cardial Impressed Ware", "Capsian Culture"),
            highFrequencyModern = listOf("Berbers / North Africa (60-80%)", "Somalia (80%)", "Balkans (15-30%)", "Southern Europe (10-20%)"),
            migrationPath = listOf(
                MigrationStep(1, "Levant / Egypt", "25,000 BP", "Natufian hunter-gatherer expansion."),
                MigrationStep(2, "Balkans & Western Mediterranean", "8,000 BP", "Neolithic maritime farmers reaching Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "E-V13",
            shortName = "E-V13 (E1b1b1a1b1a)",
            cladeName = "E-V13 / E-L142",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "E1b1b",
            definingSnps = listOf("V13", "L142", "CTS1273", "rs9306848"),
            ageYearsBp = "~4,800 BP (Bronze Age)",
            originRegion = "Balkans / Southeast Europe",
            historicalDescription = "The primary European subclade of E1b1b, experiencing rapid Bronze Age demographic expansion in the Balkans and spreading with Greek, Thracian, Illyrian, and Roman populations.",
            ancientCultures = listOf("Balkan Bronze Age", "Mycenaean / Ancient Greek", "Roman Auxiliary troops"),
            highFrequencyModern = listOf("Kosovo Albanians (40-45%)", "Greeks (20-30%)", "Bulgarians (20%)", "Italy (10-15%)"),
            migrationPath = listOf(
                MigrationStep(1, "Balkans / Danube Valley", "4,800 BP", "Rapid Bronze Age expansion in Southeast Europe."),
                MigrationStep(2, "Central & Western Europe", "2,000 BP", "Roman military deployment and classical Mediterranean trade.")
            )
        ),
        HaplogroupDefinition(
            code = "G",
            shortName = "Haplogroup G",
            cladeName = "G-M201",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M201", "P257", "U2", "rs2032630"),
            ageYearsBp = "~48,000 BP",
            originRegion = "Caucasus / Anatolia / Middle East",
            historicalDescription = "The primary paternal lineage of early Neolithic European farmers (EEF), who brought agriculture from Anatolia across Europe. Ötzi the Iceman belonged to haplogroup G2a.",
            ancientCultures = listOf("Linear Pottery (LBK)", "Cardial Ware", "Cardium Pottery", "Ötzi the Iceman"),
            highFrequencyModern = listOf("Georgia / Ossetia (60-70%)", "Sardinia (15-20%)", "Crete (10%)", "Caucasus (30-60%)"),
            migrationPath = listOf(
                MigrationStep(1, "Fertile Crescent / Anatolia", "12,000 BP", "Early domestication of wheat and sheep."),
                MigrationStep(2, "Danube & Rhine Valleys", "7,500 BP", "Neolithic LBK expansion transforming prehistoric Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "I",
            shortName = "Haplogroup I",
            cladeName = "I-M170",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M170", "M258", "P19", "rs2032608"),
            ageYearsBp = "~30,000 BP (Upper Paleolithic)",
            originRegion = "Europe (Indigenous European hunter-gatherers)",
            historicalDescription = "The oldest major indigenous European paternal lineage, associated with Upper Paleolithic Gravettian and Epigravettian mammoth hunters and cave painters.",
            ancientCultures = listOf("Gravettian", "Magdalenian", "Western Hunter-Gatherers (WHG)"),
            highFrequencyModern = listOf("Scandinavia", "Balkans", "Sardinia"),
            migrationPath = listOf(
                MigrationStep(1, "Central Europe / Balkans", "30,000 BP", "Gravettian cave artists and hunter-gatherers during Last Glacial Maximum.")
            )
        ),
        HaplogroupDefinition(
            code = "I1-M253",
            shortName = "I1 (Nordic / Viking Y-DNA)",
            cladeName = "I1 / I-M253",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "I",
            definingSnps = listOf("M253", "M307", "P30", "rs9341278"),
            ageYearsBp = "~4,700 BP (Nordic Bronze Age)",
            originRegion = "Scandinavia / Jutland Peninsula",
            historicalDescription = "The classic Scandinavian/Nordic paternal lineage. Experienced extreme founder effect in the Nordic Bronze Age and expanded with Germanic tribes and Viking seafaring conquests.",
            ancientCultures = listOf("Nordic Bronze Age", "Jastorf Culture", "Vikings / Anglo-Saxons", "Goths / Normans"),
            highFrequencyModern = listOf("Sweden (35-40%)", "Norway (32-35%)", "Denmark (30%)", "Finland (28%)", "England / Scotland (15-20%)"),
            migrationPath = listOf(
                MigrationStep(1, "Southern Scandinavia", "4,500 BP", "Nordic Bronze Age metal trade and agricultural expansion."),
                MigrationStep(2, "British Isles, Normandy, Rus", "800 - 1050 CE", "Viking coastal raids and permanent settlements.")
            )
        ),
        HaplogroupDefinition(
            code = "I2-M438",
            shortName = "I2 (Dinaric & Sardinian)",
            cladeName = "I2 / I-M438 (I-L621)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "I",
            definingSnps = listOf("M438", "P215", "L621", "rs17315758"),
            ageYearsBp = "~22,000 BP",
            originRegion = "Balkans / Southwestern Europe",
            historicalDescription = "Associated with Mesolithic European hunter-gatherers and later Slavic medieval expansions (I2a-Dinaric) as well as ancient Sardinian founders.",
            ancientCultures = listOf("Cucuteni-Trypillia", "Mesolithic Iron Gates", "Nuragic Sardinia", "Slavic Migrations"),
            highFrequencyModern = listOf("Bosnia & Herzegovina (60-70%)", "Croatia (35-45%)", "Serbia (35%)", "Sardinia (40%)"),
            migrationPath = listOf(
                MigrationStep(1, "Balkans & Carpathians", "20,000 BP", "Glacial refuge during Ice Age."),
                MigrationStep(2, "Eastern & Southern Europe", "500 - 900 CE", "Medieval Slavic expansion across the Balkan peninsula.")
            )
        ),
        HaplogroupDefinition(
            code = "J1-M267",
            shortName = "J1 (Semitic / Arabian)",
            cladeName = "J1 / J-M267 (J-P58)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M267", "L136", "P58", "rs13447352"),
            ageYearsBp = "~20,000 BP",
            originRegion = "Caucasus / Taurus Mountains / Zagros",
            historicalDescription = "Prominent paternal lineage of Semitic-speaking populations of the Arabian Peninsula, Levant, and North Africa (Cohen Modal Haplotype marker).",
            ancientCultures = listOf("Natufian", "Bronze Age Levant", "Nabataeans", "Early Islamic Caliphate"),
            highFrequencyModern = listOf("Yemen (70%)", "Saudi Arabia (50-60%)", "Iraq / Jordan (40%)", "Dagestan (80%)", "Ashkenazi Jewish (15-20%)"),
            migrationPath = listOf(
                MigrationStep(1, "Fertile Crescent / Arabia", "10,000 BP", "Pastoralist spread across arid deserts."),
                MigrationStep(2, "North Africa & Iberia", "700 - 1200 CE", "Early Islamic expansion.")
            )
        ),
        HaplogroupDefinition(
            code = "J2-M172",
            shortName = "J2 (Greco-Roman & Anatolian)",
            cladeName = "J2 / J-M172 (J-M410, M67)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M172", "M410", "M67", "rs2032604"),
            ageYearsBp = "~28,000 BP",
            originRegion = "Anatolia / Mesopotamia / Caucasus",
            historicalDescription = "Associated with the development of wine production, copper/bronze metallurgy, and classical maritime civilizations (Minoans, Phoenicians, Greeks, Etruscans, Romans).",
            ancientCultures = listOf("Minoan Civilization", "Phoenicians", "Ancient Greece", "Etruscans / Rome"),
            highFrequencyModern = listOf("Turkey (30%)", "Greece (25-30%)", "Southern Italy & Sicily (25%)", "Lebanon (30%)", "Iran (20%)"),
            migrationPath = listOf(
                MigrationStep(1, "Anatolia & Levant", "10,000 BP", "Neolithic agricultural & metallurgy spread."),
                MigrationStep(2, "Aegean & Mediterranean Basin", "3,500 BP", "Minoan, Phoenician, and Greek maritime colonization.")
            )
        ),
        HaplogroupDefinition(
            code = "N-M231",
            shortName = "Haplogroup N (Uralic / Siberian)",
            cladeName = "N / N-M231 (N1c-Tat)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M231", "LLY22g", "M178", "Tat", "rs34442126"),
            ageYearsBp = "~22,000 BP",
            originRegion = "East Asia / Southern Siberia",
            historicalDescription = "Predominant paternal marker of Finno-Ugric and Uralic peoples, migrating from Siberia across Northern Eurasia into the Baltic and Fennoscandia.",
            ancientCultures = listOf("Comb Ceramic Culture", "Seima-Turbino Phenomenon", "Ancient Finnic Tribes"),
            highFrequencyModern = listOf("Finland (60%)", "Estonia (35%)", "Lithuania / Latvia (40%)", "Yakuts / Siberia (75-90%)", "Northern Russia (20-30%)"),
            migrationPath = listOf(
                MigrationStep(1, "Lake Baikal / Siberia", "15,000 BP", "Trans-Siberian taiga hunter-fisher adaptations."),
                MigrationStep(2, "Baltic Sea Region", "3,500 BP", "Bronze Age introduction of Finnic languages to northeastern Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "O-M175",
            shortName = "Haplogroup O (East Asian)",
            cladeName = "O / O-M175 (O2-M122)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M175", "M122", "M324", "rs2032651"),
            ageYearsBp = "~36,000 BP",
            originRegion = "Southeast / East Asia",
            historicalDescription = "The dominant paternal lineage of East and Southeast Asia, driving the expansion of rice agriculture (Yangtze) and millet farming (Yellow River).",
            ancientCultures = listOf("Yangshao Culture", "Longshan Culture", "Austronesian Expansion"),
            highFrequencyModern = listOf("Han Chinese (50-60%)", "Korea (45%)", "Vietnam (40%)", "Polynesia / Southeast Asia (30-50%)"),
            migrationPath = listOf(
                MigrationStep(1, "Yellow River & Yangtze Basins", "10,000 BP", "Neolithic agricultural intensification."),
                MigrationStep(2, "Pacific Islands & East Asian Rim", "4,000 BP", "Austronesian seafaring out of Taiwan.")
            )
        ),
        HaplogroupDefinition(
            code = "Q-M242",
            shortName = "Haplogroup Q (Indigenous American & Siberian)",
            cladeName = "Q / Q-M242 (Q-M3)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M242", "M3", "L54", "rs3894"),
            ageYearsBp = "~30,000 BP",
            originRegion = "Central Siberia / Altai Mountains",
            historicalDescription = "The founding paternal lineage of Indigenous Americans who crossed the Beringia land bridge during the Last Glacial Maximum, as well as native Siberian groups (Ket, Selkup).",
            ancientCultures = listOf("Clovis Culture", "Beringian Hunters", "Ancient Maya / Inca / Aztec Ancestors"),
            highFrequencyModern = listOf("Native South Americans (90-100%)", "Native North Americans (60-90%)", "Ket People of Siberia (90%)"),
            migrationPath = listOf(
                MigrationStep(1, "Bering Land Bridge", "16,000 BP", "Crossing from Siberia into North America."),
                MigrationStep(2, "Mesoamerica & Andes", "13,000 BP", "Rapid southward expansion throughout the Americas.")
            )
        ),
        HaplogroupDefinition(
            code = "R1a-M417",
            shortName = "R1a (Corded Ware / Balto-Slavic & Indo-Iranian)",
            cladeName = "R1a1a1 / R-M417 (Z282, Z93)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M420", "M17", "M417", "Z282", "Z93", "rs17315757"),
            ageYearsBp = "~5,500 BP (Late Copper / Early Bronze Age)",
            originRegion = "Pontic-Caspian Steppe / Eastern Europe",
            historicalDescription = "Associated with the spread of Proto-Indo-European languages, horse domestication, chariot warfare, and the Corded Ware archaeological culture.",
            ancientCultures = listOf("Corded Ware Culture", "Sintashta Charioteers", "Andronovo Culture", "Early Slavs"),
            highFrequencyModern = listOf("Poland (55-60%)", "Ukraine (45-50%)", "Russia (45%)", "Northern India (35-45%)", "Kyrgyzstan (60%)"),
            migrationPath = listOf(
                MigrationStep(1, "Pontic-Caspian Steppe", "5,500 BP", "Yamnaya / Corded Ware expansion into Central & Northern Europe."),
                MigrationStep(2, "Central Asia & Indus Valley", "3,800 BP", "Sintashta-Andronovo chariot horizon into Iran and Northern India.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-M269",
            shortName = "R1b (Western European Core)",
            cladeName = "R1b1a1b / R-M269",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "CT",
            definingSnps = listOf("M343", "M269", "L23", "L51", "rs9786184"),
            ageYearsBp = "~6,000 BP",
            originRegion = "Pontic-Caspian Steppe / East-Central Europe",
            historicalDescription = "The dominant paternal lineage in Western Europe. Propelled by the Yamnaya steppe pastoralist migrations and Bell Beaker metallurgical network.",
            ancientCultures = listOf("Yamnaya Culture", "Bell Beaker Phenomenon", "Unetice Culture"),
            highFrequencyModern = listOf("Ireland (80-85%)", "Basque Country (85%)", "Scotland / Wales (75-80%)", "France / Spain (60-70%)"),
            migrationPath = listOf(
                MigrationStep(1, "Eurasian Steppe", "5,000 BP", "Yamnaya pastoralists migrate into the Danube basin."),
                MigrationStep(2, "Rhine & Atlantic Facade", "4,400 BP", "Bell Beaker expansion replacing indigenous Neolithic male lineages.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-U106",
            shortName = "R-U106 (Proto-Germanic)",
            cladeName = "R1b1a1b1a1a1 / R-U106 (S21)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "R1b-M269",
            definingSnps = listOf("U106", "S21", "M405", "rs2032598"),
            ageYearsBp = "~4,500 BP",
            originRegion = "Central / Northern Europe (Rhine-Weser Basin)",
            historicalDescription = "The primary Germanic branch of R1b. Associated with the Unetice Bronze Age, Jastorf Iron Age, and Anglo-Saxon / Frankish / Dutch expansions.",
            ancientCultures = listOf("Unetice Culture", "Jastorf Culture", "Anglo-Saxons", "Franks / Saxons"),
            highFrequencyModern = listOf("Netherlands (35%)", "Northern Germany (30%)", "England (20-25%)", "Denmark (18%)", "Austria (20%)"),
            migrationPath = listOf(
                MigrationStep(1, "Rhine-Elbe Region", "4,000 BP", "Consolidation of Proto-Germanic communities."),
                MigrationStep(2, "North Sea & Britain", "450 - 600 CE", "Anglo-Saxon migrations across the English Channel.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-P312",
            shortName = "R-P312 (Italo-Celtic / Atlantic)",
            cladeName = "R1b1a1b1a1a2 / R-P312 (S116)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "R1b-M269",
            definingSnps = listOf("P312", "S116", "rs34276300"),
            ageYearsBp = "~4,500 BP",
            originRegion = "Central / Western Europe",
            historicalDescription = "Parent clade to major Western European lineages: Celtic (L21), Iberian (DF27), and Alpine/Italo-Celtic (U152). Carried by the Bell Beaker people.",
            ancientCultures = listOf("Bell Beaker", "Hallstatt Celts", "La Tène Culture"),
            highFrequencyModern = listOf("Ireland (75%)", "Scotland (70%)", "France (50%)", "Spain (55%)", "Northern Italy (40%)"),
            migrationPath = listOf(
                MigrationStep(1, "Central Europe / Rhine Valley", "4,500 BP", "Bell Beaker metallurgical network diversification.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-L21",
            shortName = "R-L21 (Insular Celtic / Atlantic)",
            cladeName = "R1b1a1b1a1a2c / R-L21 (M529)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "R1b-P312",
            definingSnps = listOf("L21", "M529", "S145", "rs11799226"),
            ageYearsBp = "~4,200 BP (Early Bronze Age)",
            originRegion = "British Isles / Brittany / Atlantic France",
            historicalDescription = "The defining paternal marker of Insular Celtic populations (Gaels, Britons, Picts). Found in extraordinary frequencies in Ireland, Scotland, and Wales.",
            ancientCultures = listOf("Atlantic Bronze Age", "Insular Celts", "Gaels / Scots / Picts", "Bretons"),
            highFrequencyModern = listOf("Western Ireland (75-80%)", "Scotland (50-60%)", "Wales (50%)", "Brittany (40%)", "Cornwall (35%)"),
            migrationPath = listOf(
                MigrationStep(1, "Atlantic Seaboard", "4,200 BP", "Bronze Age mining and maritime trade in tin and copper."),
                MigrationStep(2, "Ireland & Scottish Highlands", "3,000 BP", "Cultural flowering of Gaelic kingdoms.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-U152",
            shortName = "R-U152 (Italo-Celtic / Alpine / Roman)",
            cladeName = "R1b1a1b1a1a2b / R-U152 (S28)",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "R1b-P312",
            definingSnps = listOf("U152", "S28", "rs12338"),
            ageYearsBp = "~4,300 BP",
            originRegion = "Alps / Switzerland / Northern Italy",
            historicalDescription = "Strongly correlated with the Hallstatt and La Tène Celtic cultures, the Villanova culture, and early Italic tribes including the ancestors of the Romans.",
            ancientCultures = listOf("Hallstatt Culture", "La Tène Culture", "Villanovan Culture", "Ancient Romans & Latins"),
            highFrequencyModern = listOf("Northern Italy / Tuscany (30-40%)", "Switzerland (25-30%)", "Eastern France (20%)", "Corsica (25%)"),
            migrationPath = listOf(
                MigrationStep(1, "Alpine Valleys / Switzerland", "4,300 BP", "Early metallurgy in copper and bronze."),
                MigrationStep(2, "Po Valley & Italian Peninsula", "3,000 BP", "Villanovan and early Roman Republican consolidation.")
            )
        ),
        HaplogroupDefinition(
            code = "R1b-DF27",
            shortName = "R-DF27 (Iberian / Gascon)",
            cladeName = "R1b1a1b1a1a2a / R-DF27",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "R1b-P312",
            definingSnps = listOf("DF27", "S250", "rs16980479"),
            ageYearsBp = "~4,200 BP",
            originRegion = "Pyrenees / Iberian Peninsula / Southwest France",
            historicalDescription = "The predominant paternal lineage of the Iberian Peninsula, carried by ancient Iberians, Celtiberians, and Basque ancestors.",
            ancientCultures = listOf("El Argar Culture", "Celtiberians", "Ancient Iberians", "Basques"),
            highFrequencyModern = listOf("Basque Country (70%)", "Catalonia (45%)", "Spain / Portugal (40-50%)", "Gascony (40%)", "Latin America (via Spanish colonists)"),
            migrationPath = listOf(
                MigrationStep(1, "Pyrenees & Ebro Basin", "4,200 BP", "Bronze Age settlement across Iberia."),
                MigrationStep(2, "Americas", "1500 - 1800 CE", "Spanish and Portuguese transatlantic exploration.")
            )
        )
    )

    // ==========================================
    // MTDNA MATERNAL HAPLOGROUPS TREE DEFINITION
    // ==========================================
    val MT_DNA_HAPLOGROUPS: List<HaplogroupDefinition> = listOf(
        HaplogroupDefinition(
            code = "L0",
            shortName = "Haplogroup L0 (Mitochondrial Eve)",
            cladeName = "mtDNA-L0",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = null,
            definingSnps = listOf("mt146", "mt182", "mt4312", "mt10664"),
            ageYearsBp = "~150,000 - 200,000 BP",
            originRegion = "Southern / Eastern Africa",
            historicalDescription = "Root maternal lineage representing the matrilineal most recent common ancestor (Mitochondrial Eve). Retained at highest frequency in Khoisan hunter-gatherers.",
            ancientCultures = listOf("Early Anatomically Modern Humans"),
            highFrequencyModern = listOf("San / Khoisan (70-90%)", "Southern Africa", "East Africa"),
            migrationPath = listOf(
                MigrationStep(1, "Kalahari / Southern Africa", "150,000 BP", "Deepest human maternal divergence.")
            )
        ),
        HaplogroupDefinition(
            code = "L2",
            shortName = "Haplogroup L2 (West & Central African)",
            cladeName = "mtDNA-L2",
            lineageType = LineageType.PATERNAL_YDNA,
            parentClade = "L0",
            definingSnps = listOf("mt143", "mt789", "mt8701", "mt9540", "mt16278"),
            ageYearsBp = "~90,000 BP",
            originRegion = "West / Central Africa",
            historicalDescription = "The most widespread maternal haplogroup across sub-Saharan Africa, prominent in African Americans through the transatlantic period.",
            ancientCultures = listOf("Bantu Expansion", "West African Neolithic"),
            highFrequencyModern = listOf("West Africa (30-40%)", "Central Africa (35%)", "African Americans (~30%)"),
            migrationPath = listOf(
                MigrationStep(1, "West Africa", "90,000 BP", "Expansion across tropical and savannah zones.")
            )
        ),
        HaplogroupDefinition(
            code = "L3",
            shortName = "Haplogroup L3 (Out of Africa Maternal Ancestor)",
            cladeName = "mtDNA-L3",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "L0",
            definingSnps = listOf("mt769", "mt1018", "mt3594", "mt7256", "mt13650"),
            ageYearsBp = "~70,000 BP",
            originRegion = "East Africa (Horn of Africa)",
            historicalDescription = "The direct maternal ancestor to haplogroups M and N, which encompass every maternal lineage found outside of Africa.",
            ancientCultures = listOf("Out of Africa Migration Pioneers"),
            highFrequencyModern = listOf("Horn of Africa (Ethiopia, Somalia 30-40%)", "East Africa"),
            migrationPath = listOf(
                MigrationStep(1, "Horn of Africa", "70,000 BP", "Maternal lineage crossing into Eurasia giving rise to clades M and N.")
            )
        ),
        HaplogroupDefinition(
            code = "M",
            shortName = "Macrohaplogroup M (Eurasian / Asian / Indigenous American)",
            cladeName = "mtDNA-M",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "L3",
            definingSnps = listOf("mt489", "mt10400", "mt14783", "mt15043"),
            ageYearsBp = "~60,000 BP",
            originRegion = "South Asia / Coastal Eurasia",
            historicalDescription = "Major Eurasian founder clade. Dominant in South Asia and East Asia, giving rise to C, D, G, Z branches in Asia and the Americas.",
            ancientCultures = listOf("Southern Coastal Dispersal"),
            highFrequencyModern = listOf("India (60%)", "East Asia (50%)", "Indigenous Americans (C, D clades)"),
            migrationPath = listOf(
                MigrationStep(1, "Indian Ocean Rim", "60,000 BP", "Rapid coastal migration towards Sundaland and East Asia.")
            )
        ),
        HaplogroupDefinition(
            code = "N",
            shortName = "Macrohaplogroup N",
            cladeName = "mtDNA-N",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "L3",
            definingSnps = listOf("mt8701", "mt9540", "mt10398", "mt10873", "mt15301"),
            ageYearsBp = "~60,000 BP",
            originRegion = "Near East / South Asia",
            historicalDescription = "Parent to haplogroup R, which includes almost all European maternal lineages (H, V, J, T, U, K) as well as A, B, X.",
            ancientCultures = listOf("Early Eurasian Pioneers"),
            highFrequencyModern = listOf("Found across all non-African populations via daughter clades"),
            migrationPath = listOf(
                MigrationStep(1, "Near East / Anatolia", "60,000 BP", "Settlement of West Eurasia and diversification of haplogroup R.")
            )
        ),
        HaplogroupDefinition(
            code = "U",
            shortName = "Haplogroup U (Ancient Hunter-Gatherer)",
            cladeName = "mtDNA-U",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt11467", "mt12308", "mt12372", "mt1811"),
            ageYearsBp = "~45,000 BP (Upper Paleolithic)",
            originRegion = "Near East / Europe",
            historicalDescription = "One of the oldest maternal lineages in Europe. Subclade U5 was the dominant maternal lineage of Western European Mesolithic hunter-gatherers (WHG).",
            ancientCultures = listOf("Aurignacian", "Gravettian", "Western Hunter-Gatherers (WHG)", "Cheddar Man"),
            highFrequencyModern = listOf("Scandinavia (U5 in Saami ~50%)", "Baltic States (15-20%)", "Caucasus (U4/U7)", "India (U2/U7)"),
            migrationPath = listOf(
                MigrationStep(1, "Balkans & Western Europe", "45,000 BP", "Upper Paleolithic colonization of ice-age Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "U5b",
            shortName = "U5b (Mesolithic European Hunter-Gatherer)",
            cladeName = "mtDNA-U5b",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "U",
            definingSnps = listOf("mt7768", "mt14182", "mt16270", "mt150"),
            ageYearsBp = "~22,000 BP",
            originRegion = "Southwestern Europe (Franco-Cantabrian Ice Age Refuge)",
            historicalDescription = "The iconic maternal lineage of post-glacial European hunter-gatherers, found in Cheddar Man and ancient burials across France, Spain, and Britain.",
            ancientCultures = listOf("Magdalenian", "Azilian", "Mesolithic Britain / Cheddar Man"),
            highFrequencyModern = listOf("Saami of Lapland (50%)", "Basques (15%)", "Finns (10%)", "Northern & Western Europe (8-12%)"),
            migrationPath = listOf(
                MigrationStep(1, "Franco-Cantabrian Caves", "20,000 BP", "Survival through the Last Glacial Maximum."),
                MigrationStep(2, "Deglaciated Northern Europe", "11,000 BP", "Pioneering recolonization of Britain, Scandinavia, and the Baltic.")
            )
        ),
        HaplogroupDefinition(
            code = "H",
            shortName = "Haplogroup H (Helena - Queen of Europe)",
            cladeName = "mtDNA-H",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt2706", "mt7028", "rs2853499", "rs28358280"),
            ageYearsBp = "~25,000 BP",
            originRegion = "Near East / Caucasus / Southern Europe",
            historicalDescription = "The single most common maternal lineage in modern Europe (~40-50% of all Europeans). Expanded massively from Ice Age refuges and during the Neolithic/Bronze Age.",
            ancientCultures = listOf("Epigravettian", "Bell Beaker", "Unetice", "Cardial Farmers"),
            highFrequencyModern = listOf("Spain / Basque (45-50%)", "United Kingdom (45%)", "Scandinavia (42%)", "Germany (43%)", "France (45%)"),
            migrationPath = listOf(
                MigrationStep(1, "Near East & Anatolia", "25,000 BP", "Divergence from HV stem."),
                MigrationStep(2, "Iberian & Balkan Refuges", "18,000 BP", "Expansion across Western Europe after Ice Age retreat.")
            )
        ),
        HaplogroupDefinition(
            code = "H1",
            shortName = "H1 (Western European Matriarch)",
            cladeName = "mtDNA-H1",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "H",
            definingSnps = listOf("mt3010", "mt16189", "rs28358281"),
            ageYearsBp = "~13,000 BP",
            originRegion = "Franco-Cantabrian Refuge (Iberia / Southwest France)",
            historicalDescription = "The most frequent single subclade in Western Europe, expanding across the continent following the retreat of the glaciers.",
            ancientCultures = listOf("Magdalenian", "Megalithic Builders", "Celtic & Germanic Peoples"),
            highFrequencyModern = listOf("Basque Country (30%)", "Galicia & Portugal (25-30%)", "Norway (25%)", "British Isles (20-25%)"),
            migrationPath = listOf(
                MigrationStep(1, "Pyrenees & Bay of Biscay", "13,000 BP", "Rapid post-glacial demographic expansion."),
                MigrationStep(2, "Atlantic Seaboard & Scandinavia", "8,000 BP", "Integration into early European farming and megalithic communities.")
            )
        ),
        HaplogroupDefinition(
            code = "H2",
            shortName = "H2 (Eastern & Central European)",
            cladeName = "mtDNA-H2",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "H",
            definingSnps = listOf("mt1438", "mt4769", "rs2853500"),
            ageYearsBp = "~15,000 BP",
            originRegion = "Near East / Anatolia",
            historicalDescription = "Associated with early Neolithic farming expansions into Central Europe and the Mediterranean basin.",
            ancientCultures = listOf("Linear Pottery (LBK)", "Vinča Culture"),
            highFrequencyModern = listOf("Sardinia (8%)", "Central Europe (5-8%)", "Levant (4%)"),
            migrationPath = listOf(
                MigrationStep(1, "Anatolia to Balkans", "9,000 BP", "Neolithic agricultural dispersal.")
            )
        ),
        HaplogroupDefinition(
            code = "H3",
            shortName = "H3 (Atlantic / Iberian)",
            cladeName = "mtDNA-H3",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "H",
            definingSnps = listOf("mt6776", "rs28358282"),
            ageYearsBp = "~11,000 BP",
            originRegion = "Iberia / Western Mediterranean",
            historicalDescription = "Second most common H branch in Western Europe, especially enriched in the Basque Country and Sardinia.",
            ancientCultures = listOf("Cardial Pottery", "Nuragic Sardinia", "Atlantic Bronze Age"),
            highFrequencyModern = listOf("Sardinia (18%)", "Basques (14%)", "Portugal (12%)", "Ireland (10%)"),
            migrationPath = listOf(
                MigrationStep(1, "Iberia & Western Mediterranean", "11,000 BP", "Maritime and coastal foraging and early pastoralism.")
            )
        ),
        HaplogroupDefinition(
            code = "J1c",
            shortName = "J1c (Jasmine - Neolithic Farming Expansion)",
            cladeName = "mtDNA-J1c",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt185", "mt295", "mt462", "mt14798", "mt16069", "rs2853501"),
            ageYearsBp = "~15,000 BP",
            originRegion = "Near East / Fertile Crescent",
            historicalDescription = "Carried across Europe by early Neolithic farmers bringing agriculture, pottery, and animal husbandry into Central and Northern Europe.",
            ancientCultures = listOf("Linear Pottery (LBK)", "Starčevo–Körös", "Ancient Near Eastern Agronomists"),
            highFrequencyModern = listOf("Central Europe (8-12%)", "British Isles (8%)", "Scandinavia (7%)", "Near East (10%)"),
            migrationPath = listOf(
                MigrationStep(1, "Fertile Crescent", "12,000 BP", "Domestication of emmer wheat and goats."),
                MigrationStep(2, "Danube River Valley", "7,500 BP", "Rapid spread of LBK farming across Western and Northern Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "T2",
            shortName = "T2 (Tara - Steppe & Neolithic Agrarian)",
            cladeName = "mtDNA-T2",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt709", "mt1888", "mt8697", "mt10463", "mt16126", "rs2853503"),
            ageYearsBp = "~16,000 BP",
            originRegion = "Near East / Caucasus / Pontic Steppe",
            historicalDescription = "Associated with both the Neolithic agricultural diffusion and subsequent Bronze Age Yamnaya steppe pastoralist migrations.",
            ancientCultures = listOf("Yamnaya", "Corded Ware", "Neolithic Farmers"),
            highFrequencyModern = listOf("Eastern Europe (8-10%)", "Scandinavia (7%)", "Italy (6%)", "Iran / Levant (8%)"),
            migrationPath = listOf(
                MigrationStep(1, "Caucasus / Steppe", "10,000 BP", "Pastoralist adaptations."),
                MigrationStep(2, "Northern & Eastern Europe", "5,000 BP", "Steppe expansions associated with Indo-European languages.")
            )
        ),
        HaplogroupDefinition(
            code = "K1a",
            shortName = "K1a (Katrine - Otzi & Cardial Mediterranean)",
            cladeName = "mtDNA-K1a",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt497", "mt1189", "mt9055", "mt10550", "rs2853502"),
            ageYearsBp = "~16,000 BP",
            originRegion = "Near East / Anatolia / Mediterranean",
            historicalDescription = "Key marker of early European farmers and ancient Alpine populations. Ötzi the Iceman had an extinct subclade of K1 (K1f).",
            ancientCultures = listOf("Ötzi the Iceman", "Cardial Ware", "Levantine Early Farmers", "Ashkenazi Matriarchs"),
            highFrequencyModern = listOf("Ashkenazi Jewish (32%)", "Alps / Tyrol (8-10%)", "Cyprus (10%)", "Levant (8%)"),
            migrationPath = listOf(
                MigrationStep(1, "Levant & Anatolia", "15,000 BP", "Epipaleolithic origins."),
                MigrationStep(2, "Mediterranean Basin & Alps", "8,000 BP", "Neolithic maritime migration to Italy, Spain, and Central Europe.")
            )
        ),
        HaplogroupDefinition(
            code = "D4",
            shortName = "Haplogroup D4 (East Asian / Siberian)",
            cladeName = "mtDNA-D4",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "M",
            definingSnps = listOf("mt3010", "mt8414", "mt14668", "rs2853504"),
            ageYearsBp = "~28,000 BP",
            originRegion = "Northern East Asia / Southern Siberia",
            historicalDescription = "One of the most widespread maternal lineages in East Asia and Siberia. Subclades are also ancestral to Indigenous American haplogroup D lineages.",
            ancientCultures = listOf("Baikal Hunter-Gatherers", "Ancient Northern East Asians", "Jomon & Yayoi Japan"),
            highFrequencyModern = listOf("Northern Han Chinese (25-30%)", "Japanese (35%)", "Koreans (30%)", "Mongolians (25%)", "Siberians (30%)"),
            migrationPath = listOf(
                MigrationStep(1, "Northern China / Siberia", "28,000 BP", "Cold adaptation in Mammoth steppe environments."),
                MigrationStep(2, "Japanese Archipelago & Yellow River", "10,000 BP", "Yayoi agricultural diffusion and Yayoi-Jomon admixture.")
            )
        ),
        HaplogroupDefinition(
            code = "A2",
            shortName = "Haplogroup A2 (Indigenous American Founder)",
            cladeName = "mtDNA-A2",
            lineageType = LineageType.MATERNAL_MTDNA,
            parentClade = "N",
            definingSnps = listOf("mt663", "mt1736", "mt4248", "mt4824", "mt8794", "rs2853505"),
            ageYearsBp = "~16,000 BP",
            originRegion = "Beringia / Siberia",
            historicalDescription = "One of the five founding maternal lineages (A2, B2, C1, D1, X2a) of Indigenous American peoples.",
            ancientCultures = listOf("Clovis Culture", "Ancient Beringians", "Inuit / Thule", "Maya & Aztec Ancestors"),
            highFrequencyModern = listOf("Inuit / Saqqaq (90%)", "Navajo / Apache (60%)", "Central American Indigenous (50-70%)"),
            migrationPath = listOf(
                MigrationStep(1, "Bering Land Bridge", "16,000 BP", "Glacial standstill in Beringia before entering the Americas."),
                MigrationStep(2, "North & Central America", "14,000 BP", "Ice-free corridor and Pacific coastal route.")
            )
        )
    )

    fun findHaplogroupByCode(code: String, type: LineageType): HaplogroupDefinition? {
        val list = if (type == LineageType.PATERNAL_YDNA) Y_DNA_HAPLOGROUPS else MT_DNA_HAPLOGROUPS
        return list.firstOrNull { it.code.equals(code, ignoreCase = true) || it.shortName.contains(code, ignoreCase = true) }
    }
}
