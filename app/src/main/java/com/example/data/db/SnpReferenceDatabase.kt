package com.example.data.db

import com.example.data.model.LineageType
import com.example.data.model.SnpMarker

object SnpReferenceDatabase {

    val ALL_DEFINING_SNPS: List<SnpMarker> = listOf(
        // ==========================================
        // Y-DNA SNPS (Chr Y)
        // ==========================================
        // Root / Basal
        SnpMarker("M91", "rs17306671", "Y", 21743110, "C", "T", "A", LineageType.PATERNAL_YDNA, "Deep African basal marker A"),
        SnpMarker("M168", "rs9306841", "Y", 13533801, "C", "T", "CT", LineageType.PATERNAL_YDNA, "Out of Africa macro-marker"),
        SnpMarker("M96", "rs9786481", "Y", 14896238, "G", "C", "E", LineageType.PATERNAL_YDNA, "Haplogroup E root marker"),
        SnpMarker("M2", "rs2032597", "Y", 14095400, "A", "G", "E1b1a", LineageType.PATERNAL_YDNA, "Sub-Saharan Bantu expansion marker"),
        SnpMarker("M35", "rs9306847", "Y", 14096000, "G", "C", "E1b1b", LineageType.PATERNAL_YDNA, "North African / Mediterranean marker"),
        SnpMarker("V13", "rs9306848", "Y", 14097100, "C", "T", "E-V13", LineageType.PATERNAL_YDNA, "Balkan Bronze Age expansion marker"),

        // Haplogroup G
        SnpMarker("M201", "rs2032630", "Y", 14088000, "G", "T", "G", LineageType.PATERNAL_YDNA, "Neolithic Farmer marker (EEF)"),
        SnpMarker("P15", "rs9786520", "Y", 14089200, "C", "T", "G2a", LineageType.PATERNAL_YDNA, "Otzi / LBK European early farmer marker"),

        // Haplogroup I
        SnpMarker("M170", "rs2032608", "Y", 14094000, "A", "C", "I", LineageType.PATERNAL_YDNA, "Indigenous European Upper Paleolithic marker"),
        SnpMarker("M253", "rs9341278", "Y", 15026934, "C", "T", "I1-M253", LineageType.PATERNAL_YDNA, "Classic Nordic / Viking paternal marker"),
        SnpMarker("M438", "rs17315758", "Y", 14436000, "A", "G", "I2-M438", LineageType.PATERNAL_YDNA, "Dinaric / Balkan & Sardinian marker"),
        SnpMarker("L621", "rs78931201", "Y", 14439000, "C", "T", "I2-M438", LineageType.PATERNAL_YDNA, "Slavic expansion marker"),

        // Haplogroup J
        SnpMarker("M267", "rs13447352", "Y", 14938000, "T", "G", "J1-M267", LineageType.PATERNAL_YDNA, "Semitic / Arabian lineage marker"),
        SnpMarker("P58", "rs13447390", "Y", 14940000, "C", "T", "J1-M267", LineageType.PATERNAL_YDNA, "Cohen Modal Haplotype marker"),
        SnpMarker("M172", "rs2032604", "Y", 14972000, "T", "G", "J2-M172", LineageType.PATERNAL_YDNA, "Greco-Roman / Anatolian maritime marker"),
        SnpMarker("M410", "rs2032605", "Y", 14973500, "G", "A", "J2-M172", LineageType.PATERNAL_YDNA, "Minoan / Aegean civilization marker"),

        // Haplogroup N & O
        SnpMarker("M231", "rs34442126", "Y", 16020000, "C", "G", "N-M231", LineageType.PATERNAL_YDNA, "Uralic / Siberian marker"),
        SnpMarker("M175", "rs2032651", "Y", 16550000, "ins", "del", "O-M175", LineageType.PATERNAL_YDNA, "East Asian root marker"),
        SnpMarker("M122", "rs2032652", "Y", 16552000, "T", "C", "O-M175", LineageType.PATERNAL_YDNA, "Han Chinese / Sino-Tibetan marker"),

        // Haplogroup Q
        SnpMarker("M242", "rs3894", "Y", 17045000, "C", "T", "Q-M242", LineageType.PATERNAL_YDNA, "Siberian / Native American founder"),
        SnpMarker("M3", "rs3895", "Y", 17047000, "C", "T", "Q-M242", LineageType.PATERNAL_YDNA, "Indigenous American Clovis / Maya marker"),

        // Haplogroup R1a
        SnpMarker("M420", "rs17315756", "Y", 18100000, "T", "A", "R1a-M417", LineageType.PATERNAL_YDNA, "R1a basal marker"),
        SnpMarker("M417", "rs17315757", "Y", 18102000, "C", "G", "R1a-M417", LineageType.PATERNAL_YDNA, "Corded Ware / Balto-Slavic & Indo-Aryan marker"),
        SnpMarker("Z282", "rs78931205", "Y", 18105000, "C", "T", "R1a-M417", LineageType.PATERNAL_YDNA, "European branch of R1a"),
        SnpMarker("Z93", "rs78931206", "Y", 18107000, "G", "A", "R1a-M417", LineageType.PATERNAL_YDNA, "Asian / Indo-Iranian branch of R1a"),

        // Haplogroup R1b
        SnpMarker("M343", "rs2032624", "Y", 18500000, "C", "A", "R1b-M269", LineageType.PATERNAL_YDNA, "R1b root marker"),
        SnpMarker("M269", "rs9786184", "Y", 18512340, "T", "C", "R1b-M269", LineageType.PATERNAL_YDNA, "Yamnaya Steppe & Western European founder marker"),
        SnpMarker("L23", "rs13303975", "Y", 18515000, "G", "A", "R1b-M269", LineageType.PATERNAL_YDNA, "Eastern European steppe branch"),
        SnpMarker("L51", "rs13303980", "Y", 18517000, "C", "T", "R1b-M269", LineageType.PATERNAL_YDNA, "Western European Bell Beaker stem"),
        SnpMarker("U106", "rs2032598", "Y", 18600000, "C", "A", "R1b-U106", LineageType.PATERNAL_YDNA, "Proto-Germanic / Anglo-Saxon marker"),
        SnpMarker("P312", "rs34276300", "Y", 18700000, "C", "A", "R1b-P312", LineageType.PATERNAL_YDNA, "Bell Beaker / Italo-Celtic parent marker"),
        SnpMarker("L21", "rs11799226", "Y", 18750000, "G", "A", "R1b-L21", LineageType.PATERNAL_YDNA, "Insular Celtic (Gaelic, Irish, Scottish) marker"),
        SnpMarker("U152", "rs12338", "Y", 18800000, "C", "T", "R1b-U152", LineageType.PATERNAL_YDNA, "Italo-Celtic / Alpine / Roman marker"),
        SnpMarker("DF27", "rs16980479", "Y", 18850000, "C", "T", "R1b-DF27", LineageType.PATERNAL_YDNA, "Iberian / Celtiberian / Basque marker"),

        // ==========================================
        // MTDNA SNPS (Mitochondrial Genome)
        // ==========================================
        // Root / L clades
        SnpMarker("769A", "rs2853493", "MT", 769, "G", "A", "L3", LineageType.MATERNAL_MTDNA, "Mitochondrial Out of Africa marker"),
        SnpMarker("1018A", "rs2853494", "MT", 1018, "G", "A", "L3", LineageType.MATERNAL_MTDNA, "L3 defining marker"),
        SnpMarker("3594T", "rs2853495", "MT", 3594, "C", "T", "L3", LineageType.MATERNAL_MTDNA, "Maternal Out of Africa stem"),
        SnpMarker("16278T", "rs2853496", "MT", 16278, "C", "T", "L2", LineageType.MATERNAL_MTDNA, "West African L2 marker"),

        // Macrohaplogroup M & N
        SnpMarker("489C", "rs2853497", "MT", 489, "T", "C", "M", LineageType.MATERNAL_MTDNA, "Macrohaplogroup M founder marker"),
        SnpMarker("10400T", "rs2853498", "MT", 10400, "C", "T", "M", LineageType.MATERNAL_MTDNA, "Asian / South Asian M marker"),
        SnpMarker("8701G", "rs2853491", "MT", 8701, "A", "G", "N", LineageType.MATERNAL_MTDNA, "Macrohaplogroup N Eurasian founder"),
        SnpMarker("10398G", "rs2853492", "MT", 10398, "A", "G", "N", LineageType.MATERNAL_MTDNA, "Major Eurasian division marker"),

        // Haplogroup U & U5b
        SnpMarker("12308G", "rs2853510", "MT", 12308, "A", "G", "U", LineageType.MATERNAL_MTDNA, "Haplogroup U Upper Paleolithic marker"),
        SnpMarker("12372A", "rs2853511", "MT", 12372, "G", "A", "U", LineageType.MATERNAL_MTDNA, "U clade defining marker"),
        SnpMarker("7768G", "rs2853512", "MT", 7768, "A", "G", "U5b", LineageType.MATERNAL_MTDNA, "European Mesolithic Hunter-Gatherer U5b marker"),
        SnpMarker("16270T", "rs2853513", "MT", 16270, "C", "T", "U5b", LineageType.MATERNAL_MTDNA, "Cheddar Man / WHG marker"),

        // Haplogroup H (Helena) and Subclades
        SnpMarker("2706G", "rs2853499", "MT", 2706, "A", "G", "H", LineageType.MATERNAL_MTDNA, "Haplogroup H defining base (Helena)"),
        SnpMarker("7028C", "rs28358280", "MT", 7028, "T", "C", "H", LineageType.MATERNAL_MTDNA, "Primary diagnostic marker for Haplogroup H"),
        SnpMarker("3010A", "rs28358281", "MT", 3010, "G", "A", "H1", LineageType.MATERNAL_MTDNA, "Western European Franco-Cantabrian H1 marker"),
        SnpMarker("16189C", "rs2853515", "MT", 16189, "T", "C", "H1", LineageType.MATERNAL_MTDNA, "H1 post-glacial expansion marker"),
        SnpMarker("1438A", "rs2853500", "MT", 1438, "G", "A", "H2", LineageType.MATERNAL_MTDNA, "Central European Neolithic H2 marker"),
        SnpMarker("6776C", "rs28358282", "MT", 6776, "T", "C", "H3", LineageType.MATERNAL_MTDNA, "Iberian & Sardinian H3 marker"),

        // Haplogroup J1c
        SnpMarker("14798C", "rs2853501", "MT", 14798, "T", "C", "J1c", LineageType.MATERNAL_MTDNA, "Neolithic Farmer J1c marker"),
        SnpMarker("16069T", "rs2853516", "MT", 16069, "C", "T", "J1c", LineageType.MATERNAL_MTDNA, "Early Agronomist maternal line"),

        // Haplogroup T2
        SnpMarker("8697A", "rs2853503", "MT", 8697, "G", "A", "T2", LineageType.MATERNAL_MTDNA, "Yamnaya & Neolithic T2 marker"),
        SnpMarker("16126C", "rs2853517", "MT", 16126, "T", "C", "T2", LineageType.MATERNAL_MTDNA, "Tara maternal clade marker"),

        // Haplogroup K1a
        SnpMarker("9055A", "rs2853502", "MT", 9055, "G", "A", "K1a", LineageType.MATERNAL_MTDNA, "Alpine / Cardial Mediterranean Otzi marker"),
        SnpMarker("10550G", "rs2853518", "MT", 10550, "A", "G", "K1a", LineageType.MATERNAL_MTDNA, "Ashkenazi & Mediterranean K1a marker"),

        // Haplogroup D4 (East Asian)
        SnpMarker("8414T", "rs2853504", "MT", 8414, "C", "T", "D4", LineageType.MATERNAL_MTDNA, "East Asian / Siberian D4 marker"),
        SnpMarker("14668T", "rs2853519", "MT", 14668, "C", "T", "D4", LineageType.MATERNAL_MTDNA, "Northern Han & Japanese marker"),

        // Haplogroup A2 (Indigenous American)
        SnpMarker("663G", "rs2853505", "MT", 663, "A", "G", "A2", LineageType.MATERNAL_MTDNA, "Indigenous American / Beringian A2 marker"),
        SnpMarker("8794T", "rs2853520", "MT", 8794, "C", "T", "A2", LineageType.MATERNAL_MTDNA, "Beringian Clovis & Maya maternal founder")
    )

    // Lookup maps for fast access
    val BY_RSID: Map<String, List<SnpMarker>> = ALL_DEFINING_SNPS.groupBy { it.rsid.lowercase() }
    val BY_NAME: Map<String, List<SnpMarker>> = ALL_DEFINING_SNPS.groupBy { it.name.lowercase() }
    val BY_POSITION_Y: Map<Long, SnpMarker> = ALL_DEFINING_SNPS.filter { it.chromosome == "Y" }.associateBy { it.position }
    val BY_POSITION_MT: Map<Long, SnpMarker> = ALL_DEFINING_SNPS.filter { it.chromosome in listOf("MT", "M") }.associateBy { it.position }
}
