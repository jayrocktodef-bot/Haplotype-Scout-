package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountTree
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.db.HaplogroupTreeData
import com.example.data.db.SnpReferenceDatabase
import com.example.data.model.HaplogroupDefinition
import com.example.data.model.LineageType
import com.example.ui.components.MigrationTimelineView
import com.example.ui.theme.ElectricCyan
import com.example.ui.theme.RadiantCoral
import com.example.viewmodel.HaplogroupViewModel

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun EncyclopediaScreen(
    viewModel: HaplogroupViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val allHaplos = HaplogroupTreeData.Y_DNA_HAPLOGROUPS + HaplogroupTreeData.MT_DNA_HAPLOGROUPS

    val filteredList = allHaplos.filter { haplo ->
        val matchesType = uiState.encyclopediaLineageFilter == null || haplo.lineageType == uiState.encyclopediaLineageFilter
        val q = uiState.encyclopediaQuery.trim()
        val matchesQuery = q.isBlank() ||
                haplo.code.contains(q, ignoreCase = true) ||
                haplo.shortName.contains(q, ignoreCase = true) ||
                haplo.historicalDescription.contains(q, ignoreCase = true) ||
                haplo.originRegion.contains(q, ignoreCase = true) ||
                haplo.definingSnps.any { it.contains(q, ignoreCase = true) }
        matchesType && matchesQuery
    }

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp)
            .testTag("encyclopedia_screen_content"),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(4.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.MenuBook,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = "Haplogroup & Clade Database",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "Phylogenetic Reference & Defining SNP Markers",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
        }

        // Search Bar & Filter Chips
        item {
            OutlinedTextField(
                value = uiState.encyclopediaQuery,
                onValueChange = { viewModel.setEncyclopediaQuery(it) },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("encyclopedia_search_input"),
                placeholder = { Text("Search haplogroup (R1b, I1, H1, J1c), culture, or SNP...") },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = ElectricCyan) },
                trailingIcon = {
                    if (uiState.encyclopediaQuery.isNotBlank()) {
                        IconButton(onClick = { viewModel.setEncyclopediaQuery("") }) {
                            Icon(Icons.Default.Close, contentDescription = "Clear", tint = Color(0xFF94A3B8))
                        }
                    }
                },
                singleLine = true,
                shape = RoundedCornerShape(14.dp)
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                FilterChip(
                    selected = uiState.encyclopediaLineageFilter == null,
                    onClick = { viewModel.setEncyclopediaFilter(null) },
                    label = { Text("All (${allHaplos.size})") },
                    shape = RoundedCornerShape(10.dp)
                )
                FilterChip(
                    selected = uiState.encyclopediaLineageFilter == LineageType.PATERNAL_YDNA,
                    onClick = { viewModel.setEncyclopediaFilter(LineageType.PATERNAL_YDNA) },
                    label = { Text("Y-DNA Paternal (${HaplogroupTreeData.Y_DNA_HAPLOGROUPS.size})") },
                    shape = RoundedCornerShape(10.dp)
                )
                FilterChip(
                    selected = uiState.encyclopediaLineageFilter == LineageType.MATERNAL_MTDNA,
                    onClick = { viewModel.setEncyclopediaFilter(LineageType.MATERNAL_MTDNA) },
                    label = { Text("mtDNA Maternal (${HaplogroupTreeData.MT_DNA_HAPLOGROUPS.size})") },
                    shape = RoundedCornerShape(10.dp)
                )
            }
        }

        // Selected Detail View if expanded
        uiState.selectedEncyclopediaHaplo?.let { selected ->
            item {
                HaplogroupDetailCard(
                    haplo = selected,
                    onClose = { viewModel.selectEncyclopediaHaplo(null) }
                )
            }
        }

        // List of Haplogroups
        items(filteredList) { haplo ->
            val isPaternal = haplo.lineageType == LineageType.PATERNAL_YDNA
            val accentColor = if (isPaternal) ElectricCyan else RadiantCoral
            val isSelected = uiState.selectedEncyclopediaHaplo?.code == haplo.code

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .clickable { viewModel.selectEncyclopediaHaplo(haplo) }
                    .testTag("encyclopedia_item_${haplo.code}"),
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (isSelected) Color(0xFF1E293B) else Color(0xFF0F172A)
                ),
                border = BorderStroke(if (isSelected) 1.5.dp else 1.dp, if (isSelected) accentColor else Color(0xFF1E293B))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = accentColor.copy(alpha = 0.15f),
                            border = BorderStroke(1.dp, accentColor.copy(alpha = 0.3f))
                        ) {
                            Text(
                                text = if (isPaternal) "Y-DNA PATERNAL" else "mtDNA MATERNAL",
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.ExtraBold, letterSpacing = 0.5.sp),
                                color = accentColor,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                            )
                        }
                        Text(
                            text = haplo.ageYearsBp,
                            style = MaterialTheme.typography.labelSmall,
                            color = Color(0xFF94A3B8)
                        )
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    Text(
                        text = haplo.code,
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = Color(0xFFF8FAFC)
                    )
                    Text(
                        text = haplo.shortName,
                        style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.SemiBold),
                        color = accentColor
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = haplo.historicalDescription,
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF94A3B8),
                        maxLines = 2
                    )

                    if (haplo.definingSnps.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                text = "Defining SNPs: ",
                                style = MaterialTheme.typography.labelSmall,
                                color = Color(0xFF64748B)
                            )
                            Text(
                                text = haplo.definingSnps.take(4).joinToString(", "),
                                style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.SemiBold),
                                color = ElectricCyan
                            )
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

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun HaplogroupDetailCard(
    haplo: HaplogroupDefinition,
    onClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    val isPaternal = haplo.lineageType == LineageType.PATERNAL_YDNA
    val accentColor = if (isPaternal) ElectricCyan else RadiantCoral

    Card(
        modifier = modifier
            .fillMaxWidth()
            .testTag("haplogroup_detail_card"),
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = BorderStroke(1.5.dp, accentColor)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = accentColor.copy(alpha = 0.2f)
                ) {
                    Text(
                        text = if (isPaternal) "PATERNAL CLADE" else "MATERNAL CLADE",
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.ExtraBold),
                        color = accentColor,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
                    )
                }
                IconButton(onClick = onClose) {
                    Icon(Icons.Default.Close, contentDescription = "Close")
                }
            }

            Text(
                text = haplo.code,
                style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black),
                color = MaterialTheme.colorScheme.onSurface
            )
            Text(
                text = haplo.shortName,
                style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold),
                color = accentColor
            )

            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = haplo.historicalDescription,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )

            Spacer(modifier = Modifier.height(12.dp))
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Column {
                    Text("Time Depth", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                    Text(haplo.ageYearsBp, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold))
                }
                Column {
                    Text("Origin", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                    Text(haplo.originRegion, style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold))
                }
                Column {
                    Text("Parent Clade", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                    Text(haplo.parentClade ?: "Root", style = MaterialTheme.typography.bodySmall.copy(fontWeight = FontWeight.Bold))
                }
            }

            if (haplo.ancientCultures.isNotEmpty()) {
                Spacer(modifier = Modifier.height(10.dp))
                Text("Archaeological Horizons:", style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.outline)
                Spacer(modifier = Modifier.height(4.dp))
                FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    haplo.ancientCultures.forEach { culture ->
                        Surface(
                            shape = RoundedCornerShape(6.dp),
                            color = MaterialTheme.colorScheme.surfaceVariant
                        ) {
                            Text(
                                text = "🏺 $culture",
                                style = MaterialTheme.typography.labelSmall,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                    }
                }
            }

            if (haplo.migrationPath.isNotEmpty()) {
                Spacer(modifier = Modifier.height(14.dp))
                Text("Ancestral Migration Path:", style = MaterialTheme.typography.titleSmall.copy(fontWeight = FontWeight.Bold))
                Spacer(modifier = Modifier.height(6.dp))
                MigrationTimelineView(steps = haplo.migrationPath)
            }
        }
    }
}
