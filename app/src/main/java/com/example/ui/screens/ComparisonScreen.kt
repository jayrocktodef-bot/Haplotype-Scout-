package com.example.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CompareArrows
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.database.DnaKitEntity
import com.example.data.db.HaplogroupTreeData
import com.example.data.model.LineageType
import com.example.ui.theme.ElectricCyan
import com.example.ui.theme.EmeraldPositive
import com.example.ui.theme.RadiantCoral
import com.example.viewmodel.AppNavDestination
import com.example.viewmodel.HaplogroupViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ComparisonScreen(
    viewModel: HaplogroupViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val savedKits by viewModel.savedKits.collectAsStateWithLifecycle()

    var expandedA by remember { mutableStateOf(false) }
    var expandedB by remember { mutableStateOf(false) }

    // If empty, auto-select first two if available
    val kitA = uiState.compareKitA ?: savedKits.firstOrNull()
    val kitB = uiState.compareKitB ?: savedKits.getOrNull(1) ?: savedKits.firstOrNull()

    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp)
            .testTag("comparison_screen_content"),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(4.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.CompareArrows,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.primary,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Column {
                    Text(
                        text = "Lineage Kit Comparator",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                        color = MaterialTheme.colorScheme.onSurface
                    )
                    Text(
                        text = "Side-by-side Y-DNA & mtDNA Clade Comparison",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.primary
                    )
                }
            }
        }

        if (savedKits.isEmpty()) {
            item {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
                ) {
                    Column(
                        modifier = Modifier.padding(24.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = "No saved DNA kits in database yet.",
                            style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = "Load demo kits or upload raw DNA on the Home tab and save them to compare lineages.",
                            style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(modifier = Modifier.height(14.dp))
                        Button(
                            onClick = {
                                // Load a couple demo kits to DB
                                viewModel.sampleKits.take(3).forEach { sample ->
                                    viewModel.loadSample(sample)
                                    viewModel.saveCurrentKit("Demo Sample")
                                }
                            }
                        ) {
                            Text("Populate Demo Kits into DB")
                        }
                    }
                }
            }
        } else {
            // Kit Selectors
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    // Selector A
                    ExposedDropdownMenuBox(
                        expanded = expandedA,
                        onExpandedChange = { expandedA = !expandedA },
                        modifier = Modifier.weight(1f)
                    ) {
                        OutlinedTextField(
                            value = kitA?.kitName ?: "Select Kit 1",
                            onValueChange = {},
                            readOnly = true,
                            label = { Text("Kit 1") },
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedA) },
                            modifier = Modifier
                                .menuAnchor()
                                .fillMaxWidth()
                        )
                        ExposedDropdownMenu(
                            expanded = expandedA,
                            onDismissRequest = { expandedA = false }
                        ) {
                            savedKits.forEach { kit ->
                                DropdownMenuItem(
                                    text = { Text(kit.kitName) },
                                    onClick = {
                                        viewModel.setCompareKitA(kit)
                                        expandedA = false
                                    }
                                )
                            }
                        }
                    }

                    // Selector B
                    ExposedDropdownMenuBox(
                        expanded = expandedB,
                        onExpandedChange = { expandedB = !expandedB },
                        modifier = Modifier.weight(1f)
                    ) {
                        OutlinedTextField(
                            value = kitB?.kitName ?: "Select Kit 2",
                            onValueChange = {},
                            readOnly = true,
                            label = { Text("Kit 2") },
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedB) },
                            modifier = Modifier
                                .menuAnchor()
                                .fillMaxWidth()
                        )
                        ExposedDropdownMenu(
                            expanded = expandedB,
                            onDismissRequest = { expandedB = false }
                        ) {
                            savedKits.forEach { kit ->
                                DropdownMenuItem(
                                    text = { Text(kit.kitName) },
                                    onClick = {
                                        viewModel.setCompareKitB(kit)
                                        expandedB = false
                                    }
                                )
                            }
                        }
                    }
                }
            }

            if (kitA != null && kitB != null) {
                // Paternal Comparison Card
                item {
                    ComparisonLineageCard(
                        title = "Paternal Lineage (Y-DNA)",
                        lineageType = LineageType.PATERNAL_YDNA,
                        kitAName = kitA.kitName,
                        kitAHaplo = kitA.paternalHaplogroup,
                        kitAClade = kitA.paternalCladeName,
                        kitBName = kitB.kitName,
                        kitBHaplo = kitB.paternalHaplogroup,
                        kitBClade = kitB.paternalCladeName
                    )
                }

                // Maternal Comparison Card
                item {
                    ComparisonLineageCard(
                        title = "Maternal Lineage (mtDNA)",
                        lineageType = LineageType.MATERNAL_MTDNA,
                        kitAName = kitA.kitName,
                        kitAHaplo = kitA.maternalHaplogroup,
                        kitAClade = kitA.maternalCladeName,
                        kitBName = kitB.kitName,
                        kitBHaplo = kitB.maternalHaplogroup,
                        kitBClade = kitB.maternalCladeName
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun ComparisonLineageCard(
    title: String,
    lineageType: LineageType,
    kitAName: String,
    kitAHaplo: String,
    kitAClade: String,
    kitBName: String,
    kitBHaplo: String,
    kitBClade: String,
    modifier: Modifier = Modifier
) {
    val accentColor = if (lineageType == LineageType.PATERNAL_YDNA) ElectricCyan else RadiantCoral
    val isIdentical = kitAHaplo.equals(kitBHaplo, ignoreCase = true)

    ElevatedCard(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onSurface
                )
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = if (isIdentical) EmeraldPositive.copy(alpha = 0.15f) else MaterialTheme.colorScheme.surfaceVariant
                ) {
                    Text(
                        text = if (isIdentical) "MATCHING CLADE" else "DIVERGENT CLADE",
                        style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
                        color = if (isIdentical) EmeraldPositive else MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(horizontal = 6.dp, vertical = 3.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.height(14.dp))

            Row(modifier = Modifier.fillMaxWidth()) {
                // Column A
                Column(modifier = Modifier.weight(1f)) {
                    Text(kitAName, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(kitAHaplo, style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black, fontSize = 20.sp))
                    Text(kitAClade, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                Box(
                    modifier = Modifier
                        .width(1.dp)
                        .height(60.dp)
                        .padding(horizontal = 4.dp)
                )

                // Column B
                Column(modifier = Modifier.weight(1f)) {
                    Text(kitBName, style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.secondary)
                    Spacer(modifier = Modifier.height(2.dp))
                    Text(kitBHaplo, style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Black, fontSize = 20.sp))
                    Text(kitBClade, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}
