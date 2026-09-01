package com.example.data.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface DnaKitDao {
    @Query("SELECT * FROM dna_kits ORDER BY timestamp DESC")
    fun getAllKits(): Flow<List<DnaKitEntity>>

    @Query("SELECT * FROM dna_kits WHERE id = :id LIMIT 1")
    suspend fun getKitById(id: Long): DnaKitEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertKit(kit: DnaKitEntity): Long

    @Update
    suspend fun updateKit(kit: DnaKitEntity)

    @Query("DELETE FROM dna_kits WHERE id = :id")
    suspend fun deleteKitById(id: Long)

    @Query("DELETE FROM dna_kits")
    suspend fun deleteAllKits()
}
