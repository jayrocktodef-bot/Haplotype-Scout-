package com.example.data.db

import com.example.data.model.SampleDnaKit

object SampleDnaKitsData {

    val SAMPLES: List<SampleDnaKit> = listOf(
        SampleDnaKit(
            id = "celtic_sample",
            title = "Western European (Celtic)",
            subtitle = "Y-DNA: R1b-L21 (Insular Celtic) • mtDNA: U5b (Hunter-Gatherer)",
            description = "High Atlantic Celtic paternal profile typical of Ireland/Scotland, combined with ancient indigenous European hunter-gatherer maternal lineage.",
            paternalHaplo = "R1b-L21",
            maternalHaplo = "U5b",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs9786481	Y	14896238	G
rs2032608	Y	14094000	A
rs2032624	Y	18500000	A
rs9786184	Y	18512340	C
rs13303975	Y	18515000	A
rs13303980	Y	18517000	T
rs34276300	Y	18700000	A
rs11799226	Y	18750000	A
rs12338	Y	18800000	C
rs16980479	Y	18850000	C
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853510	MT	12308	G
rs2853511	MT	12372	A
rs2853512	MT	7768	G
rs2853513	MT	16270	T
rs2853499	MT	2706	A
rs28358280	MT	7028	T
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "alpine_sample",
            title = "Central European / Alpine",
            subtitle = "Y-DNA: R1b-U152 (Italo-Celtic) • mtDNA: H1 (Western Matriarch)",
            description = "Typical profile of North Italian, Swiss, or French Alpine heritage, featuring the Roman/Celtic U152 clade and the post-glacial H1 maternal founder.",
            paternalHaplo = "R1b-U152",
            maternalHaplo = "H1",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs2032624	Y	18500000	A
rs9786184	Y	18512340	C
rs13303975	Y	18515000	A
rs13303980	Y	18517000	T
rs34276300	Y	18700000	A
rs12338	Y	18800000	T
rs11799226	Y	18750000	G
rs16980479	Y	18850000	C
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853499	MT	2706	G
rs28358280	MT	7028	C
rs28358281	MT	3010	A
rs2853515	MT	16189	C
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "nordic_sample",
            title = "Nordic / Scandinavian",
            subtitle = "Y-DNA: I1-M253 (Viking Y-DNA) • mtDNA: J1c (Neolithic Agronomist)",
            description = "Iconic Scandinavian paternal lineage common across Sweden and Norway paired with the early agricultural maternal line J1c.",
            paternalHaplo = "I1-M253",
            maternalHaplo = "J1c",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs2032608	Y	14094000	C
rs9341278	Y	15026934	T
rs17315758	Y	14436000	A
rs9786184	Y	18512340	T
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853501	MT	14798	C
rs2853516	MT	16069	T
rs28358280	MT	7028	T
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "slavic_sample",
            title = "Eastern European / Steppe",
            subtitle = "Y-DNA: R1a-M417 (Corded Ware) • mtDNA: T2 (Steppe Pastoralist)",
            description = "Steppe pastoralist paternal and maternal lineages prominent across Poland, Ukraine, and Eastern Europe.",
            paternalHaplo = "R1a-M417",
            maternalHaplo = "T2",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs17315756	Y	18100000	A
rs17315757	Y	18102000	G
rs78931205	Y	18105000	T
rs9786184	Y	18512340	T
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853503	MT	8697	A
rs2853517	MT	16126	C
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "mediterranean_sample",
            title = "Balkan / Mediterranean",
            subtitle = "Y-DNA: E-V13 (Balkan Bronze Age) • mtDNA: K1a (Otzi/Cardial)",
            description = "Southeast European paternal expansion with Mediterranean Neolithic farmer maternal lineage.",
            paternalHaplo = "E-V13",
            maternalHaplo = "K1a",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs9786481	Y	14896238	C
rs9306847	Y	14096000	C
rs9306848	Y	14097100	T
rs9786184	Y	18512340	T
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853502	MT	9055	A
rs2853518	MT	10550	G
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "east_asian_sample",
            title = "East Asian (Han / Sino-Tibetan)",
            subtitle = "Y-DNA: O-M175 (O2-M122) • mtDNA: D4 (East Asian / Siberian)",
            description = "Major paternal lineage associated with Yellow River agricultural expansion and Northern East Asian maternal founder.",
            paternalHaplo = "O-M175",
            maternalHaplo = "D4",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs2032651	Y	16550000	del
rs2032652	Y	16552000	C
rs9786184	Y	18512340	T
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853497	MT	489	C
rs2853498	MT	10400	T
rs2853504	MT	8414	T
rs2853519	MT	14668	T
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "african_sample",
            title = "West African (Niger-Congo)",
            subtitle = "Y-DNA: E1b1a-M2 (Bantu Expansion) • mtDNA: L2 (Sub-Saharan)",
            description = "Predominant paternal and maternal lineages of West and Central Africa and the African Diaspora.",
            paternalHaplo = "E1b1a",
            maternalHaplo = "L2",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs9786481	Y	14896238	C
rs2032597	Y	14095400	G
rs9786184	Y	18512340	T
rs2853496	MT	16278	T
            """.trimIndent()
        ),
        SampleDnaKit(
            id = "indigenous_american_sample",
            title = "Indigenous American (Beringian)",
            subtitle = "Y-DNA: Q-M242 (Q-M3 Clovis/Maya) • mtDNA: A2 (Founder Lineage)",
            description = "Ancient founding lineages that crossed the Bering land bridge into the Americas.",
            paternalHaplo = "Q-M242",
            maternalHaplo = "A2",
            rawSnippetContent = """
# rsid	chromosome	position	genotype
rs9306841	Y	13533801	T
rs3894	Y	17045000	T
rs3895	Y	17047000	T
rs9786184	Y	18512340	T
rs2853493	MT	769	A
rs2853494	MT	1018	A
rs2853495	MT	3594	T
rs2853491	MT	8701	G
rs2853492	MT	10398	G
rs2853505	MT	663	G
rs2853520	MT	8794	T
            """.trimIndent()
        )
    )
}
