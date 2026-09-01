package com.example

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Biotech
import androidx.compose.material.icons.filled.CompareArrows
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.MenuBook
import androidx.compose.material.icons.outlined.Biotech
import androidx.compose.material.icons.outlined.CompareArrows
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material.icons.outlined.MenuBook
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.ui.screens.AboutCompanionScreen
import com.example.ui.screens.AnalysisResultScreen
import com.example.ui.screens.ComparisonScreen
import com.example.ui.screens.EncyclopediaScreen
import com.example.ui.screens.HomeScreen
import com.example.ui.theme.MyApplicationTheme
import com.example.viewmodel.AppNavDestination
import com.example.viewmodel.HaplogroupViewModel

import androidx.compose.foundation.border
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.ui.unit.dp
import com.example.ui.theme.ElectricCyan
import com.example.ui.theme.Indigo500
import com.example.ui.theme.Indigo900
import com.example.ui.theme.Slate400
import com.example.ui.theme.Slate500
import com.example.ui.theme.Slate700
import com.example.ui.theme.Slate800
import com.example.ui.theme.Slate950

class MainActivity : ComponentActivity() {
    private val viewModel: HaplogroupViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                MainApp(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun MainApp(
    viewModel: HaplogroupViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val snackbarHostState = remember { SnackbarHostState() }

    LaunchedEffect(uiState.errorMessage) {
        uiState.errorMessage?.let { msg ->
            snackbarHostState.showSnackbar(msg)
            viewModel.clearMessages()
        }
    }

    LaunchedEffect(uiState.successMessage) {
        uiState.successMessage?.let { msg ->
            snackbarHostState.showSnackbar(msg)
            viewModel.clearMessages()
        }
    }

    Scaffold(
        modifier = modifier.fillMaxSize(),
        containerColor = MaterialTheme.colorScheme.background,
        snackbarHost = { SnackbarHost(snackbarHostState) },
        bottomBar = {
            NavigationBar(
                modifier = Modifier
                    .testTag("main_bottom_nav"),
                containerColor = Slate950,
                tonalElevation = 0.dp
            ) {
                val navItemColors = NavigationBarItemDefaults.colors(
                    selectedIconColor = ElectricCyan,
                    selectedTextColor = ElectricCyan,
                    indicatorColor = Color(0x3322D3EE),
                    unselectedIconColor = Slate500,
                    unselectedTextColor = Slate500
                )

                NavigationBarItem(
                    selected = uiState.currentDestination == AppNavDestination.HOME ||
                            uiState.currentDestination == AppNavDestination.ANALYSIS_DETAIL,
                    onClick = { viewModel.navigateTo(AppNavDestination.HOME) },
                    colors = navItemColors,
                    icon = {
                        Icon(
                            imageVector = if (uiState.currentDestination == AppNavDestination.HOME || uiState.currentDestination == AppNavDestination.ANALYSIS_DETAIL) Icons.Filled.Biotech else Icons.Outlined.Biotech,
                            contentDescription = "Analysis"
                        )
                    },
                    label = { Text("Analyze", fontWeight = FontWeight.SemiBold) },
                    modifier = Modifier.testTag("nav_item_home")
                )

                NavigationBarItem(
                    selected = uiState.currentDestination == AppNavDestination.ENCYCLOPEDIA,
                    onClick = { viewModel.navigateTo(AppNavDestination.ENCYCLOPEDIA) },
                    colors = navItemColors,
                    icon = {
                        Icon(
                            imageVector = if (uiState.currentDestination == AppNavDestination.ENCYCLOPEDIA) Icons.Filled.MenuBook else Icons.Outlined.MenuBook,
                            contentDescription = "Database"
                        )
                    },
                    label = { Text("Haplogroups", fontWeight = FontWeight.SemiBold) },
                    modifier = Modifier.testTag("nav_item_encyclopedia")
                )

                NavigationBarItem(
                    selected = uiState.currentDestination == AppNavDestination.COMPARISON,
                    onClick = { viewModel.navigateTo(AppNavDestination.COMPARISON) },
                    colors = navItemColors,
                    icon = {
                        Icon(
                            imageVector = if (uiState.currentDestination == AppNavDestination.COMPARISON) Icons.Filled.CompareArrows else Icons.Outlined.CompareArrows,
                            contentDescription = "Compare"
                        )
                    },
                    label = { Text("Compare", fontWeight = FontWeight.SemiBold) },
                    modifier = Modifier.testTag("nav_item_comparison")
                )

                NavigationBarItem(
                    selected = uiState.currentDestination == AppNavDestination.ABOUT_COMPANION,
                    onClick = { viewModel.navigateTo(AppNavDestination.ABOUT_COMPANION) },
                    colors = navItemColors,
                    icon = {
                        Icon(
                            imageVector = if (uiState.currentDestination == AppNavDestination.ABOUT_COMPANION) Icons.Filled.Info else Icons.Outlined.Info,
                            contentDescription = "About"
                        )
                    },
                    label = { Text("Companion", fontWeight = FontWeight.SemiBold) },
                    modifier = Modifier.testTag("nav_item_about")
                )
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (uiState.currentDestination) {
                AppNavDestination.HOME -> HomeScreen(viewModel = viewModel)
                AppNavDestination.ANALYSIS_DETAIL -> AnalysisResultScreen(viewModel = viewModel)
                AppNavDestination.ENCYCLOPEDIA -> EncyclopediaScreen(viewModel = viewModel)
                AppNavDestination.COMPARISON -> ComparisonScreen(viewModel = viewModel)
                AppNavDestination.ABOUT_COMPANION -> AboutCompanionScreen(viewModel = viewModel)
            }
        }
    }
}
