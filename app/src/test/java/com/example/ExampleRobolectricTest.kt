package com.example

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import com.example.data.db.SampleDnaKitsData
import com.example.data.model.LineageType
import com.example.engine.DnaParser
import com.example.engine.HaplogroupClassifier
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [36])
class ExampleRobolectricTest {

    @Test
    fun `read string from context`() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        val appName = context.getString(R.string.app_name)
        assertEquals("Genotype Scout", appName)
    }

    @Test
    fun `test dna parser and haplogroup classifier`() = runBlocking {
        val sample = SampleDnaKitsData.SAMPLES.first { it.id == "celtic_sample" }
        val parsed = DnaParser.parseFromText(sample.rawSnippetContent)

        assertTrue(parsed.yDnaSnps > 0)
        assertTrue(parsed.mtDnaSnps > 0)

        val analysis = HaplogroupClassifier.analyze("Test Kit", parsed)
        assertNotNull(analysis.paternalLineage)
        assertNotNull(analysis.maternalLineage)

        assertEquals("R1b-L21", analysis.paternalLineage?.terminalHaplogroup?.code)
        assertEquals("U5b", analysis.maternalLineage?.terminalHaplogroup?.code)
        assertTrue(analysis.paternalLineage!!.confidenceScore >= 90)
    }
}
