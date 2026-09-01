package com.example.engine

import com.example.data.db.HaplogroupTreeData
import com.example.data.db.SnpReferenceDatabase
import com.example.data.model.DnaAnalysisResult
import com.example.data.model.EvaluatedMarker
import com.example.data.model.HaplogroupDefinition
import com.example.data.model.LineageAnalysis
import com.example.data.model.LineageType
import com.example.data.model.MarkerStatus
import com.example.data.model.SnpMarker
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

object HaplogroupClassifier {

    suspend fun analyze(
        kitName: String,
        parsedData: ParsedDnaData
    ): DnaAnalysisResult = withContext(Dispatchers.Default) {
        // 1. Evaluate all known markers
        val evaluatedMarkers = evaluateMarkers(parsedData)

        // 2. Classify Paternal Lineage (Y-DNA)
        val yMarkers = evaluatedMarkers.filter { it.snp.lineageType == LineageType.PATERNAL_YDNA }
        val hasYData = parsedData.yDnaSnps > 0 || yMarkers.any { it.status != MarkerStatus.NO_CALL }
        val paternalLineage = if (hasYData) {
            classifyLineage(LineageType.PATERNAL_YDNA, yMarkers)
        } else {
            null
        }

        // 3. Classify Maternal Lineage (mtDNA)
        val mtMarkers = evaluatedMarkers.filter { it.snp.lineageType == LineageType.MATERNAL_MTDNA }
        val maternalLineage = classifyLineage(LineageType.MATERNAL_MTDNA, mtMarkers)

        DnaAnalysisResult(
            kitName = kitName,
            rawFileFormat = parsedData.format,
            totalSnpsParsed = parsedData.totalSnps,
            yDnaSnpsCount = parsedData.yDnaSnps,
            mtDnaSnpsCount = parsedData.mtDnaSnps,
            paternalLineage = paternalLineage,
            maternalLineage = maternalLineage,
            isMaleSample = paternalLineage != null && yMarkers.any { it.status == MarkerStatus.POSITIVE_DERIVED }
        )
    }

    private fun evaluateMarkers(parsedData: ParsedDnaData): List<EvaluatedMarker> {
        val result = mutableListOf<EvaluatedMarker>()

        for (snp in SnpReferenceDatabase.ALL_DEFINING_SNPS) {
            val rsidKey = snp.rsid.lowercase()
            val posKey = "${snp.chromosome.lowercase()}:${snp.position}"

            // Try to find genotype by rsid or by chr:pos
            val userGenotype = parsedData.snpByRsid[rsidKey]
                ?: parsedData.snpByPosition[posKey]
                ?: "--"

            val status = when {
                userGenotype == "--" || userGenotype.isEmpty() -> MarkerStatus.NO_CALL
                isGenotypeMatching(userGenotype, snp.derivedAllele) -> MarkerStatus.POSITIVE_DERIVED
                isGenotypeMatching(userGenotype, snp.ancestralAllele) -> MarkerStatus.NEGATIVE_ANCESTRAL
                else -> MarkerStatus.MISMATCH
            }

            val details = when (status) {
                MarkerStatus.POSITIVE_DERIVED -> "Derived mutation detected (${snp.derivedAllele}). Positive for ${snp.haplogroup}."
                MarkerStatus.NEGATIVE_ANCESTRAL -> "Ancestral allele observed (${snp.ancestralAllele}). Unmutated."
                MarkerStatus.NO_CALL -> "Marker uncalled or not covered in raw data."
                MarkerStatus.MISMATCH -> "Genotype '$userGenotype' differs from expected ancestral (${snp.ancestralAllele}) & derived (${snp.derivedAllele})."
            }

            result.add(EvaluatedMarker(snp, userGenotype, status, details))
        }

        return result
    }

    private fun isGenotypeMatching(userGenotype: String, targetAllele: String): Boolean {
        val u = userGenotype.uppercase()
        val t = targetAllele.uppercase()

        if (t == "INS" || t == "I") return u.contains("I") || u.contains("INS")
        if (t == "DEL" || t == "D") return u.contains("D") || u.contains("DEL")

        // For SNPs, user genotype can be single "A" or double "AA" or heterozygous "AG"
        return u.contains(t)
    }

    private fun classifyLineage(
        type: LineageType,
        markers: List<EvaluatedMarker>
    ): LineageAnalysis {
        val haplogroups = if (type == LineageType.PATERNAL_YDNA) {
            HaplogroupTreeData.Y_DNA_HAPLOGROUPS
        } else {
            HaplogroupTreeData.MT_DNA_HAPLOGROUPS
        }

        // Calculate scores for each candidate haplogroup
        val scoredHaplos = haplogroups.map { haplo ->
            val haploMarkers = markers.filter { m ->
                haplo.definingSnps.any { snpName ->
                    m.snp.name.equals(snpName, ignoreCase = true) ||
                    m.snp.rsid.equals(snpName, ignoreCase = true) ||
                    m.snp.haplogroup.equals(haplo.code, ignoreCase = true)
                }
            }

            val positives = haploMarkers.count { it.status == MarkerStatus.POSITIVE_DERIVED }
            val negatives = haploMarkers.count { it.status == MarkerStatus.NEGATIVE_ANCESTRAL }
            val total = haploMarkers.size

            HaploScore(
                haplogroup = haplo,
                positives = positives,
                negatives = negatives,
                totalMarkers = total,
                depth = calculateCladeDepth(haplo, haplogroups)
            )
        }

        // Find the best terminal haplogroup (highest positives and deepest clade)
        val bestCandidate = scoredHaplos
            .filter { it.positives > 0 }
            .sortedWith(
                compareByDescending<HaploScore> { it.positives }
                    .thenByDescending { it.depth }
                    .thenBy { it.negatives }
            )
            .firstOrNull()
            ?: scoredHaplos.firstOrNull()
            ?: HaploScore(haplogroups.first(), 0, 0, 0, 0)

        // Build tree path from Root to Terminal
        val treePath = buildLineagePath(bestCandidate.haplogroup, haplogroups)

        // Calculate confidence (higher if more defining SNPs positive, reduced by negative branch conflicts)
        val totalPos = markers.count { it.status == MarkerStatus.POSITIVE_DERIVED }
        val totalNeg = markers.count { it.status == MarkerStatus.NEGATIVE_ANCESTRAL }
        val confidence = if (bestCandidate.positives > 0) {
            val baseConfidence = when {
                bestCandidate.positives >= 3 -> 99
                bestCandidate.positives == 2 -> 96
                bestCandidate.positives == 1 -> 90
                else -> 75
            }
            (baseConfidence - (bestCandidate.negatives * 10)).coerceIn(50, 99)
        } else {
            30
        }

        return LineageAnalysis(
            lineageType = type,
            terminalHaplogroup = bestCandidate.haplogroup,
            confidenceScore = confidence,
            positiveCount = totalPos,
            negativeCount = totalNeg,
            totalTestedMarkers = markers.size,
            lineageTreePath = treePath,
            evaluatedMarkers = markers
        )
    }

    private fun calculateCladeDepth(
        haplo: HaplogroupDefinition,
        allHaplos: List<HaplogroupDefinition>
    ): Int {
        var depth = 1
        var current: HaplogroupDefinition? = haplo
        while (current?.parentClade != null) {
            depth++
            current = allHaplos.firstOrNull { it.code.equals(current?.parentClade, ignoreCase = true) }
        }
        return depth
    }

    private fun buildLineagePath(
        terminal: HaplogroupDefinition,
        allHaplos: List<HaplogroupDefinition>
    ): List<HaplogroupDefinition> {
        val path = mutableListOf<HaplogroupDefinition>()
        var current: HaplogroupDefinition? = terminal
        while (current != null) {
            path.add(0, current)
            val parentCode = current.parentClade
            current = if (parentCode != null) {
                allHaplos.firstOrNull { it.code.equals(parentCode, ignoreCase = true) }
            } else {
                null
            }
        }
        return path
    }

    private data class HaploScore(
        val haplogroup: HaplogroupDefinition,
        val positives: Int,
        val negatives: Int,
        val totalMarkers: Int,
        val depth: Int
    )
}
