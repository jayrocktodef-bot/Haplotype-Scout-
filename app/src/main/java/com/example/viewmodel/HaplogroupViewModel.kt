package com.example.viewmodel

import android.app.Application
import android.net.Uri
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.data.database.DnaKitEntity
import com.example.data.db.HaplogroupTreeData
import com.example.data.db.SampleDnaKitsData
import com.example.data.db.SnpReferenceDatabase
import com.example.data.model.DnaAnalysisResult
import com.example.data.model.HaplogroupDefinition
import com.example.data.model.LineageType
import com.example.data.model.MarkerStatus
import com.example.data.model.SampleDnaKit
import com.example.data.model.SnpMarker
import com.example.data.repository.DnaAnalysisRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class AppNavDestination {
    HOME,
    ANALYSIS_DETAIL,
    ENCYCLOPEDIA,
    COMPARISON,
    ABOUT_COMPANION
}

data class UiState(
    val currentDestination: AppNavDestination = AppNavDestination.HOME,
    val currentAnalysis: DnaAnalysisResult? = null,
    val isAnalyzing: Boolean = false,
    val analysisProgressLines: Int = 0,
    val errorMessage: String? = null,
    val successMessage: String? = null,
    val selectedLineageTab: LineageType = LineageType.PATERNAL_YDNA,
    val markerFilter: MarkerStatus? = null,
    val markerSearchQuery: String = "",
    val encyclopediaQuery: String = "",
    val encyclopediaLineageFilter: LineageType? = null,
    val selectedEncyclopediaHaplo: HaplogroupDefinition? = null,
    val compareKitA: DnaKitEntity? = null,
    val compareKitB: DnaKitEntity? = null
)

class HaplogroupViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = DnaAnalysisRepository.getInstance(application)

    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    val savedKits: StateFlow<List<DnaKitEntity>> = repository.savedKits
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5000),
            initialValue = emptyList()
        )

    val sampleKits: List<SampleDnaKit> = repository.sampleKits

    init {
        // Pre-load default encyclopedia selection
        _uiState.value = _uiState.value.copy(
            selectedEncyclopediaHaplo = HaplogroupTreeData.Y_DNA_HAPLOGROUPS.find { it.code == "R1b-U152" }
        )
    }

    fun navigateTo(dest: AppNavDestination) {
        _uiState.value = _uiState.value.copy(currentDestination = dest)
    }

    fun setLineageTab(type: LineageType) {
        _uiState.value = _uiState.value.copy(selectedLineageTab = type)
    }

    fun setMarkerFilter(status: MarkerStatus?) {
        _uiState.value = _uiState.value.copy(markerFilter = status)
    }

    fun setMarkerSearchQuery(query: String) {
        _uiState.value = _uiState.value.copy(markerSearchQuery = query)
    }

    fun setEncyclopediaQuery(query: String) {
        _uiState.value = _uiState.value.copy(encyclopediaQuery = query)
    }

    fun setEncyclopediaFilter(type: LineageType?) {
        _uiState.value = _uiState.value.copy(encyclopediaLineageFilter = type)
    }

    fun selectEncyclopediaHaplo(haplo: HaplogroupDefinition?) {
        _uiState.value = _uiState.value.copy(selectedEncyclopediaHaplo = haplo)
    }

    fun loadSample(sample: SampleDnaKit) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                isAnalyzing = true,
                errorMessage = null,
                analysisProgressLines = 0
            )
            try {
                val result = repository.analyzeSampleKit(sample)
                _uiState.value = _uiState.value.copy(
                    currentAnalysis = result,
                    isAnalyzing = false,
                    currentDestination = AppNavDestination.ANALYSIS_DETAIL,
                    successMessage = "Analyzed ${sample.title} successfully!"
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isAnalyzing = false,
                    errorMessage = "Analysis error: ${e.localizedMessage ?: "Unknown error"}"
                )
            }
        }
    }

    fun analyzeFileUri(uri: Uri, displayName: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                isAnalyzing = true,
                errorMessage = null,
                analysisProgressLines = 0
            )
            try {
                val result = repository.analyzeFromUri(
                    uri = uri,
                    kitName = displayName,
                    onProgress = { lines ->
                        _uiState.value = _uiState.value.copy(analysisProgressLines = lines)
                    }
                )
                _uiState.value = _uiState.value.copy(
                    currentAnalysis = result,
                    isAnalyzing = false,
                    currentDestination = AppNavDestination.ANALYSIS_DETAIL,
                    successMessage = "Successfully parsed ${result.totalSnpsParsed} SNPs!"
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isAnalyzing = false,
                    errorMessage = "Failed to parse file: ${e.localizedMessage ?: "Invalid DNA format"}"
                )
            }
        }
    }

    fun analyzeRawSnippet(rawText: String, title: String) {
        if (rawText.isBlank()) {
            _uiState.value = _uiState.value.copy(errorMessage = "Please paste raw DNA snippet or upload a file.")
            return
        }

        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isAnalyzing = true, errorMessage = null)
            try {
                val result = repository.analyzeFromRawText(rawText, title.ifBlank { "Custom DNA Analysis" })
                _uiState.value = _uiState.value.copy(
                    currentAnalysis = result,
                    isAnalyzing = false,
                    currentDestination = AppNavDestination.ANALYSIS_DETAIL,
                    successMessage = "Analysis completed!"
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isAnalyzing = false,
                    errorMessage = "Error parsing text: ${e.localizedMessage}"
                )
            }
        }
    }

    fun saveCurrentKit(notes: String = "") {
        val current = _uiState.value.currentAnalysis ?: return
        viewModelScope.launch {
            try {
                repository.saveAnalysisKit(current, notes)
                _uiState.value = _uiState.value.copy(successMessage = "Saved kit to local database!")
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(errorMessage = "Failed to save kit: ${e.message}")
            }
        }
    }

    fun deleteKit(id: Long) {
        viewModelScope.launch {
            repository.deleteKit(id)
            if (_uiState.value.compareKitA?.id == id) {
                _uiState.value = _uiState.value.copy(compareKitA = null)
            }
            if (_uiState.value.compareKitB?.id == id) {
                _uiState.value = _uiState.value.copy(compareKitB = null)
            }
        }
    }

    fun setCompareKitA(kit: DnaKitEntity?) {
        _uiState.value = _uiState.value.copy(compareKitA = kit)
    }

    fun setCompareKitB(kit: DnaKitEntity?) {
        _uiState.value = _uiState.value.copy(compareKitB = kit)
    }

    fun clearMessages() {
        _uiState.value = _uiState.value.copy(errorMessage = null, successMessage = null)
    }
}
