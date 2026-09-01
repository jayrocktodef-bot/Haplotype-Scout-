package com.example.data.model

enum class LineageType {
    PATERNAL_YDNA,
    MATERNAL_MTDNA
}

enum class MarkerStatus {
    POSITIVE_DERIVED,  // Matches defining mutation (Derived)
    NEGATIVE_ANCESTRAL, // Matches ancestral base (Not mutated)
    NO_CALL,            // Missing, uncalled (--), or low quality
    MISMATCH            // Call differs from both ancestral & expected derived
}

data class SnpMarker(
    val name: String,             // e.g. "M269", "U152", "7028C", "H1-defining"
    val rsid: String,             // e.g. "rs9786184", "rs2853499"
    val chromosome: String,       // "Y" or "MT" / "M"
    val position: Long,           // Genomic coordinate
    val ancestralAllele: String,  // e.g. "C"
    val derivedAllele: String,    // e.g. "T"
    val haplogroup: String,       // Associated clade, e.g. "R1b1a1b1a1a2" / "R-U152"
    val lineageType: LineageType,
    val description: String = ""
)

data class EvaluatedMarker(
    val snp: SnpMarker,
    val userGenotype: String,     // e.g. "T", "TT", "AG", "--"
    val status: MarkerStatus,
    val details: String = ""
)

data class HaplogroupDefinition(
    val code: String,             // e.g. "R1b-U152", "H1", "I1-M253", "J1c"
    val shortName: String,        // e.g. "R-U152", "H1"
    val cladeName: String,        // e.g. "R1b1a1b1a1a2", "H1"
    val lineageType: LineageType,
    val parentClade: String?,     // e.g. "R1b-P312", "H", "Root"
    val definingSnps: List<String>, // List of SNP names / RSIDs
    val ageYearsBp: String,       // e.g. "~4,500 BP (Early Bronze Age)"
    val originRegion: String,     // e.g. "Alps / Central Europe", "Franco-Cantabrian refuge"
    val historicalDescription: String,
    val ancientCultures: List<String>, // e.g. ["Bell Beaker", "Hallstatt", "Italo-Celtic"]
    val highFrequencyModern: List<String>, // e.g. ["Northern Italy (35%)", "Switzerland (28%)", "France (20%)"]
    val migrationPath: List<MigrationStep>
)

data class MigrationStep(
    val order: Int,
    val region: String,
    val timePeriod: String,
    val description: String,
    val lat: Double = 0.0,
    val lng: Double = 0.0
)

data class LineageAnalysis(
    val lineageType: LineageType,
    val terminalHaplogroup: HaplogroupDefinition,
    val confidenceScore: Int,      // 0 - 100%
    val positiveCount: Int,
    val negativeCount: Int,
    val totalTestedMarkers: Int,
    val lineageTreePath: List<HaplogroupDefinition>, // From root down to terminal
    val evaluatedMarkers: List<EvaluatedMarker>,
    val novelOrUntestedMarkers: List<String> = emptyList()
)

data class DnaAnalysisResult(
    val kitName: String,
    val timestamp: Long = System.currentTimeMillis(),
    val rawFileFormat: String,
    val totalSnpsParsed: Int,
    val yDnaSnpsCount: Int,
    val mtDnaSnpsCount: Int,
    val paternalLineage: LineageAnalysis?,
    val maternalLineage: LineageAnalysis?,
    val isMaleSample: Boolean
)

data class SampleDnaKit(
    val id: String,
    val title: String,
    val subtitle: String,
    val description: String,
    val paternalHaplo: String,
    val maternalHaplo: String,
    val rawSnippetContent: String
)
