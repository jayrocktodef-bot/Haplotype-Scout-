package com.example.data.repository

import android.content.Context
import android.net.Uri
import com.example.data.database.AppDatabase
import com.example.data.database.DnaKitDao
import com.example.data.database.DnaKitEntity
import com.example.data.db.HaplogroupTreeData
import com.example.data.db.SampleDnaKitsData
import com.example.data.model.DnaAnalysisResult
import com.example.data.model.LineageType
import com.example.data.model.SampleDnaKit
import com.example.engine.DnaParser
import com.example.engine.HaplogroupClassifier
import java.io.InputStream
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.withContext

class DnaAnalysisRepository(
    private val dnaKitDao: DnaKitDao,
    private val context: Context
) {

    val savedKits: Flow<List<DnaKitEntity>> = dnaKitDao.getAllKits()

    val sampleKits: List<SampleDnaKit> = SampleDnaKitsData.SAMPLES

    suspend fun analyzeSampleKit(sample: SampleDnaKit): DnaAnalysisResult {
        val parsed = DnaParser.parseFromText(sample.rawSnippetContent)
        return HaplogroupClassifier.analyze(
            kitName = sample.title,
            parsedData = parsed
        )
    }

    suspend fun analyzeFromUri(
        uri: Uri,
        kitName: String,
        onProgress: (lines: Int) -> Unit = {}
    ): DnaAnalysisResult = withContext(Dispatchers.IO) {
        val stream: InputStream = context.contentResolver.openInputStream(uri)
            ?: throw IllegalArgumentException("Cannot open DNA file stream.")

        stream.use { nonNullStream ->
            val parsed = DnaParser.parseFromStream(nonNullStream, onProgress)
            HaplogroupClassifier.analyze(
                kitName = kitName.ifBlank { "Analyzed DNA Kit" },
                parsedData = parsed
            )
        }
    }

    suspend fun analyzeFromRawText(rawText: String, kitName: String): DnaAnalysisResult {
        val parsed = DnaParser.parseFromText(rawText)
        return HaplogroupClassifier.analyze(
            kitName = kitName.ifBlank { "Pasted DNA Data" },
            parsedData = parsed
        )
    }

    suspend fun saveAnalysisKit(
        analysis: DnaAnalysisResult,
        notes: String = ""
    ): Long = withContext(Dispatchers.IO) {
        val entity = DnaKitEntity(
            kitName = analysis.kitName,
            sourceFormat = analysis.rawFileFormat,
            isMale = analysis.isMaleSample,
            paternalHaplogroup = analysis.paternalLineage?.terminalHaplogroup?.code ?: "N/A",
            paternalCladeName = analysis.paternalLineage?.terminalHaplogroup?.shortName ?: "None",
            paternalConfidence = analysis.paternalLineage?.confidenceScore ?: 0,
            maternalHaplogroup = analysis.maternalLineage?.terminalHaplogroup?.code ?: "N/A",
            maternalCladeName = analysis.maternalLineage?.terminalHaplogroup?.shortName ?: "None",
            maternalConfidence = analysis.maternalLineage?.confidenceScore ?: 0,
            totalSnpsParsed = analysis.totalSnpsParsed,
            yDnaSnpsCount = analysis.yDnaSnpsCount,
            mtDnaSnpsCount = analysis.mtDnaSnpsCount,
            notes = notes
        )
        dnaKitDao.insertKit(entity)
    }

    suspend fun deleteKit(id: Long) = withContext(Dispatchers.IO) {
        dnaKitDao.deleteKitById(id)
    }

    companion object {
        @Volatile
        private var INSTANCE: DnaAnalysisRepository? = null

        fun getInstance(context: Context): DnaAnalysisRepository {
            return INSTANCE ?: synchronized(this) {
                val db = AppDatabase.getDatabase(context)
                val instance = DnaAnalysisRepository(db.dnaKitDao(), context.applicationContext)
                INSTANCE = instance
                instance
            }
        }
    }
}
