package com.example.data.database

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "dna_kits")
data class DnaKitEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val kitName: String,
    val sourceFormat: String,
    val timestamp: Long = System.currentTimeMillis(),
    val isMale: Boolean,
    val paternalHaplogroup: String,
    val paternalCladeName: String,
    val paternalConfidence: Int,
    val maternalHaplogroup: String,
    val maternalCladeName: String,
    val maternalConfidence: Int,
    val totalSnpsParsed: Int,
    val yDnaSnpsCount: Int,
    val mtDnaSnpsCount: Int,
    val notes: String = "",
    val analysisJson: String = "" // Serialized full details for fast reload
)
