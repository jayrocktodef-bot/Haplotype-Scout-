package com.example.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.widget.Toast
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material.icons.filled.FilterList
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.ScrollableTabRow
import androidx.compose.material3.Surface
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.model.LineageType
import com.example.data.model.MarkerStatus
import com.example.ui.components.LineageSummaryCard
import com.example.ui.components.MarkerInspectionItem
import com.example.ui.components.MigrationTimelineView
import com.example.ui.components.PhylogenyTreeVisualizer
import com.example.ui.components.PrivacyBadgeCard
import com.example.ui.theme.ElectricCyan
import com.example.ui.theme.EmeraldPositive
import com.example.ui.theme.RadiantCoral
import com.example.viewmodel.AppNavDestination
import com.example.viewmodel.HaplogroupViewModel

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AnalysisResultScreen(
    viewModel: HaplogroupViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val analysis = uiState.currentAnalysis
    val context = LocalContext.current

    if (analysis == null) {
        Box(
            modifier = modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text("No active DNA analysis found.")
                Spacer(modifier = Modifier.height(12.dp))
                Button(onClick = { viewModel.navigateTo(AppNavDestination.HOME) }) {
                    Text("Return to Home")
                }
            }
        }
        return
    }

    var selectedTab by remember { mutableIntStateOf(0) }
    var notesText by remember { mutableStateOf("") }
    val tabTitles = listOf("Overview", "Paternal (Y-DNA)", "Maternal (mtDNA)", "Marker Inspector", "Export & Save")

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp)
            .testTag("analysis_result_content"),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        // Top Navigation Header
        item {
            Spacer(modifier = Modifier.height(4.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(
                    onClick = { viewModel.navigateTo(AppNavDestination.HOME) },
                    modifier = Modifier.testTag("back_to_home_btn")
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = MaterialTheme.colorScheme.onSurface
                    )
                }
                Spacer(modifier = Modifier.width(6.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = analysis.kitName,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "${analysis.rawFileFormat} • ${if (analysis.isMaleSample) "Male" else "Female / Undetermined"}",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
        }

        // Quick Stats Strip
        item {
            ElevatedCard(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(14.dp),
                colors = CardDefaults.elevatedCardColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 14.dp, vertical = 10.dp),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Column {
                        Text("Total Analyzed", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text("${analysis.totalSnpsParsed} SNPs", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold))
                    }
                    Column {
                        Text("Y-DNA Markers", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text("${analysis.paternalLineage?.positiveCount ?: 0} Positives", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = ElectricCyan))
                    }
                    Column {
                        Text("mtDNA Markers", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text("${analysis.maternalLineage?.positiveCount ?: 0} Positives", style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold, color = RadiantCoral))
                    }
                }
            }
        }

        // Segmented Tabs
        item {
            ScrollableTabRow(
                selectedTabIndex = selectedTab,
                edgePadding = 0.dp,
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
            ) {
                tabTitles.forEachIndexed { index, title ->
                    Tab(
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        text = {
                            Text(
                                text = title,
                                style = MaterialTheme.typography.labelMedium.copy(
                                    fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal
                                )
                            )
                        },
                        modifier = Modifier.testTag("tab_$index")
                    )
                }
            }
        }

        // Tab Content
        when (selectedTab) {
            0 -> {
                // Overview Tab
                if (analysis.paternalLineage != null) {
                    item {
                        LineageSummaryCard(
                            analysis = analysis.paternalLineage,
                            onClick = { selectedTab = 1 }
                        )
                    }
                    item {
                        PhylogenyTreeVisualizer(
                            path = analysis.paternalLineage.lineageTreePath,
                            lineageType = LineageType.PATERNAL_YDNA
                        )
                    }
                }

                if (analysis.maternalLineage != null) {
                    item {
                        LineageSummaryCard(
                            analysis = analysis.maternalLineage,
                            onClick = { selectedTab = 2 }
                        )
                    }
                    item {
                        PhylogenyTreeVisualizer(
                            path = analysis.maternalLineage.lineageTreePath,
                            lineageType = LineageType.MATERNAL_MTDNA
                        )
                    }
                }
            }

            1 -> {
                // Paternal Y-DNA Tab
                if (analysis.paternalLineage != null) {
                    val p = analysis.paternalLineage
                    item {
                        LineageSummaryCard(analysis = p)
                    }
                    item {
                        PhylogenyTreeVisualizer(
                            path = p.lineageTreePath,
                            lineageType = LineageType.PATERNAL_YDNA
                        )
                    }
                    item {
                        Text(
                            text = "Ancient Migration & Historical Context",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                    item {
                        MigrationTimelineView(steps = p.terminalHaplogroup.migrationPath)
                    }
                    item {
                        Text(
                            text = "Modern High-Frequency Geographic Distribution",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            p.terminalHaplogroup.highFrequencyModern.forEach { region ->
                                Surface(
                                    shape = RoundedCornerShape(8.dp),
                                    color = MaterialTheme.colorScheme.surfaceVariant
                                ) {
                                    Text(
                                        text = "📍 $region",
                                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold),
                                        color = MaterialTheme.colorScheme.onSurface,
                                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                    )
                                }
                            }
                        }
                    }
                } else {
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text("No Y-Chromosome Markers Detected", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold))
                                Spacer(modifier = Modifier.height(6.dp))
                                Text("This sample appears to be female (XX) or the raw DNA kit does not contain Y-chromosome SNP coverage.", style = MaterialTheme.typography.bodySmall)
                            }
                        }
                    }
                }
            }

            2 -> {
                // Maternal mtDNA Tab
                if (analysis.maternalLineage != null) {
                    val m = analysis.maternalLineage
                    item {
                        LineageSummaryCard(analysis = m)
                    }
                    item {
                        PhylogenyTreeVisualizer(
                            path = m.lineageTreePath,
                            lineageType = LineageType.MATERNAL_MTDNA
                        )
                    }
                    item {
                        Text(
                            text = "Maternal Clan Migration Route",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                    }
                    item {
                        MigrationTimelineView(steps = m.terminalHaplogroup.migrationPath)
                    }
                    item {
                        Text(
                            text = "Modern Geographic Presence",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                            color = MaterialTheme.colorScheme.onSurface
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(6.dp)
                        ) {
                            m.terminalHaplogroup.highFrequencyModern.forEach { region ->
                                Surface(
                                    shape = RoundedCornerShape(8.dp),
                                    color = MaterialTheme.colorScheme.surfaceVariant
                                ) {
                                    Text(
                                        text = "📍 $region",
                                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold),
                                        color = MaterialTheme.colorScheme.onSurface,
                                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            3 -> {
                // Marker Inspector Tab
                val allMarkers = (analysis.paternalLineage?.evaluatedMarkers.orEmpty() +
                        analysis.maternalLineage?.evaluatedMarkers.orEmpty()).distinctBy { it.snp.rsid }

                item {
                    Column {
                        OutlinedTextField(
                            value = uiState.markerSearchQuery,
                            onValueChange = { viewModel.setMarkerSearchQuery(it) },
                            modifier = Modifier
                                .fillMaxWidth()
                                .testTag("marker_search_field"),
                            placeholder = { Text("Search RSID (e.g. rs9786184) or SNP (e.g. M269, 7028C)...") },
                            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
                            singleLine = true,
                            shape = RoundedCornerShape(12.dp)
                        )
                        Spacer(modifier = Modifier.height(8.dp))

                        // Filter Chips
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(6.dp),
                            verticalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            FilterChip(
                                selected = uiState.markerFilter == null,
                                onClick = { viewModel.setMarkerFilter(null) },
                                label = { Text("All (${allMarkers.size})") }
                            )
                            FilterChip(
                                selected = uiState.markerFilter == MarkerStatus.POSITIVE_DERIVED,
                                onClick = { viewModel.setMarkerFilter(MarkerStatus.POSITIVE_DERIVED) },
                                label = { Text("Positive Derived (${allMarkers.count { it.status == MarkerStatus.POSITIVE_DERIVED }})") }
                            )
                            FilterChip(
                                selected = uiState.markerFilter == MarkerStatus.NEGATIVE_ANCESTRAL,
                                onClick = { viewModel.setMarkerFilter(MarkerStatus.NEGATIVE_ANCESTRAL) },
                                label = { Text("Ancestral (${allMarkers.count { it.status == MarkerStatus.NEGATIVE_ANCESTRAL }})") }
                            )
                            FilterChip(
                                selected = uiState.markerFilter == MarkerStatus.NO_CALL,
                                onClick = { viewModel.setMarkerFilter(MarkerStatus.NO_CALL) },
                                label = { Text("No Call") }
                            )
                        }
                    }
                }

                val filteredMarkers = allMarkers.filter { m ->
                    val matchesFilter = uiState.markerFilter == null || m.status == uiState.markerFilter
                    val matchesQuery = uiState.markerSearchQuery.isBlank() ||
                            m.snp.name.contains(uiState.markerSearchQuery, ignoreCase = true) ||
                            m.snp.rsid.contains(uiState.markerSearchQuery, ignoreCase = true) ||
                            m.snp.haplogroup.contains(uiState.markerSearchQuery, ignoreCase = true)
                    matchesFilter && matchesQuery
                }

                if (filteredMarkers.isEmpty()) {
                    item {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                        ) {
                            Box(modifier = Modifier.padding(24.dp), contentAlignment = Alignment.Center) {
                                Text("No markers match the current filter.", color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                        }
                    }
                } else {
                    items(filteredMarkers) { marker ->
                        MarkerInspectionItem(evaluatedMarker = marker)
                    }
                }
            }

            4 -> {
                // Export & Save Tab
                item {
                    ElevatedCard(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.elevatedCardColors(
                            containerColor = MaterialTheme.colorScheme.surface
                        )
                    ) {
                        Column(modifier = Modifier.padding(18.dp)) {
                            Text(
                                text = "Save Kit to Local Room Database",
                                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = "Save this kit to your on-device database for instant offline access and comparative analysis.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Spacer(modifier = Modifier.height(12.dp))
                            OutlinedTextField(
                                value = notesText,
                                onValueChange = { notesText = it },
                                label = { Text("Kit Notes (e.g. Father, Mother, Ancient Sample)") },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .testTag("save_notes_field")
                            )
                            Spacer(modifier = Modifier.height(14.dp))
                            Button(
                                onClick = {
                                    viewModel.saveCurrentKit(notesText)
                                    Toast.makeText(context, "Saved to local database!", Toast.LENGTH_SHORT).show()
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(48.dp)
                                    .testTag("save_kit_db_btn"),
                                shape = RoundedCornerShape(10.dp)
                            ) {
                                Icon(Icons.Default.Bookmark, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("Save Analysis Result")
                            }
                        }
                    }
                }

                item {
                    ElevatedCard(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.elevatedCardColors(
                            containerColor = MaterialTheme.colorScheme.surface
                        )
                    ) {
                        Column(modifier = Modifier.padding(18.dp)) {
                            Text(
                                text = "Copy Summary Report",
                                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(modifier = Modifier.height(12.dp))
                            OutlinedButton(
                                onClick = {
                                    val summary = buildString {
                                        appendLine("=== GENOTYPE SCOUT: HAPLOGROUP REPORT ===")
                                        appendLine("Kit Name: ${analysis.kitName}")
                                        appendLine("Raw Format: ${analysis.rawFileFormat}")
                                        appendLine("SNPs Parsed: ${analysis.totalSnpsParsed}")
                                        if (analysis.paternalLineage != null) {
                                            appendLine("\n--- PATERNAL LINEAGE (Y-DNA) ---")
                                            appendLine("Terminal Haplogroup: ${analysis.paternalLineage.terminalHaplogroup.code}")
                                            appendLine("Clade: ${analysis.paternalLineage.terminalHaplogroup.shortName}")
                                            appendLine("Confidence: ${analysis.paternalLineage.confidenceScore}%")
                                            appendLine("Estimated Era: ${analysis.paternalLineage.terminalHaplogroup.ageYearsBp}")
                                            appendLine("Origin: ${analysis.paternalLineage.terminalHaplogroup.originRegion}")
                                        }
                                        if (analysis.maternalLineage != null) {
                                            appendLine("\n--- MATERNAL LINEAGE (mtDNA) ---")
                                            appendLine("Terminal Haplogroup: ${analysis.maternalLineage.terminalHaplogroup.code}")
                                            appendLine("Clade: ${analysis.maternalLineage.terminalHaplogroup.shortName}")
                                            appendLine("Confidence: ${analysis.maternalLineage.confidenceScore}%")
                                            appendLine("Estimated Era: ${analysis.maternalLineage.terminalHaplogroup.ageYearsBp}")
                                            appendLine("Origin: ${analysis.maternalLineage.terminalHaplogroup.originRegion}")
                                        }
                                        appendLine("\nCompanion app to Genotype Scout (https://scout.writteninthegenome.blog)")
                                    }

                                    val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                                    clipboard.setPrimaryClip(ClipData.newPlainText("Haplogroup Analysis", summary))
                                    Toast.makeText(context, "Report copied to clipboard!", Toast.LENGTH_SHORT).show()
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(48.dp)
                                    .testTag("copy_report_btn"),
                                shape = RoundedCornerShape(10.dp)
                            ) {
                                Icon(Icons.Default.ContentCopy, contentDescription = null)
                                Spacer(modifier = Modifier.width(8.dp))
                                Text("Copy Text Summary")
                            }
                        }
                    }
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}
