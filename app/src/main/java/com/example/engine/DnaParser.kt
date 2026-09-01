package com.example.engine

import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

data class ParsedDnaData(
    val format: String,
    val totalSnps: Int,
    val yDnaSnps: Int,
    val mtDnaSnps: Int,
    val snpByRsid: Map<String, String>, // rsid (lowercase) -> genotype
    val snpByPosition: Map<String, String> // "chr:pos" -> genotype
)

object DnaParser {

    suspend fun parseFromStream(
        inputStream: InputStream,
        onProgress: (linesProcessed: Int) -> Unit = {}
    ): ParsedDnaData = withContext(Dispatchers.Default) {
        val reader = BufferedReader(InputStreamReader(inputStream), 32768)
        val snpByRsid = HashMap<String, String>(5000)
        val snpByPos = HashMap<String, String>(5000)

        var totalLines = 0
        var yCount = 0
        var mtCount = 0
        var detectedFormat = "Generic / 23andMe Format"

        reader.useLines { lines ->
            for (rawLine in lines) {
                totalLines++
                if (totalLines % 20000 == 0) {
                    onProgress(totalLines)
                }

                val line = rawLine.trim()
                if (line.isEmpty()) continue

                // Check header lines to determine vendor
                if (line.startsWith("#")) {
                    when {
                        line.contains("23andMe", ignoreCase = true) -> detectedFormat = "23andMe Raw Data"
                        line.contains("AncestryDNA", ignoreCase = true) -> detectedFormat = "AncestryDNA Raw Data"
                        line.contains("MyHeritage", ignoreCase = true) -> detectedFormat = "MyHeritage Raw Data"
                        line.contains("FTDNA", ignoreCase = true) || line.contains("Family Tree DNA", ignoreCase = true) -> detectedFormat = "FamilyTreeDNA"
                    }
                    continue
                }

                // Check if CSV or TSV
                val tokens: List<String> = if (line.contains(",")) {
                    // CSV format (e.g. MyHeritage / FTDNA)
                    line.split(",").map { it.replace("\"", "").trim() }
                } else {
                    // Tab or whitespace delimited
                    line.split(Regex("\\s+"))
                }

                if (tokens.size < 4) continue

                // Header row check (e.g., rsid, chromosome, position, ...)
                if (tokens[0].equals("rsid", ignoreCase = true) || tokens[0].equals("RSID", ignoreCase = true)) {
                    if (tokens.size >= 5 && (tokens[3].equals("allele1", ignoreCase = true) || tokens[4].equals("allele2", ignoreCase = true))) {
                        detectedFormat = "AncestryDNA Format"
                    }
                    continue
                }

                val rsid = tokens[0].lowercase()
                val chromosome = normalizeChromosome(tokens[1])
                val position = tokens[2]

                val genotype = if (tokens.size >= 5 && detectedFormat.contains("Ancestry")) {
                    // Ancestry format has allele1 and allele2 in cols 3 and 4
                    val a1 = tokens[3].trim()
                    val a2 = tokens[4].trim()
                    cleanGenotype(a1 + a2)
                } else {
                    // Standard 4th column genotype
                    cleanGenotype(tokens[3])
                }

                if (chromosome == "Y") {
                    yCount++
                    snpByRsid[rsid] = genotype
                    snpByPos["y:$position"] = genotype
                } else if (chromosome == "MT" || chromosome == "M") {
                    mtCount++
                    snpByRsid[rsid] = genotype
                    snpByPos["mt:$position"] = genotype
                } else {
                    // Keep a sample of autosomal or check rsids if needed
                    if (rsid.startsWith("rs")) {
                        snpByRsid[rsid] = genotype
                    }
                }
            }
        }

        ParsedDnaData(
            format = detectedFormat,
            totalSnps = totalLines,
            yDnaSnps = yCount,
            mtDnaSnps = mtCount,
            snpByRsid = snpByRsid,
            snpByPosition = snpByPos
        )
    }

    suspend fun parseFromText(content: String): ParsedDnaData = withContext(Dispatchers.Default) {
        val inputStream = content.byteInputStream()
        parseFromStream(inputStream)
    }

    private fun normalizeChromosome(rawChr: String): String {
        val clean = rawChr.replace("chr", "", ignoreCase = true).trim().uppercase()
        return when (clean) {
            "23", "X" -> "X"
            "24", "Y" -> "Y"
            "25", "26", "MT", "M" -> "MT"
            else -> clean
        }
    }

    private fun cleanGenotype(raw: String): String {
        val trimmed = raw.trim().uppercase()
        if (trimmed == "--" || trimmed == "00" || trimmed == "?" || trimmed == "NC" || trimmed == "NN") {
            return "--"
        }
        return trimmed
    }
}
