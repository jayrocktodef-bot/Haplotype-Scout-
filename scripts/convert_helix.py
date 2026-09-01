#!/usr/bin/env python3
"""
Convert HelixMTdb_20200327.tsv into an optimized, ultra-fast JSON database for Haplotype Scout.
"""

import csv
import json
import os
import sys

tsv_path = "/home/jequan/Downloads/HelixMTdb_20200327.tsv"
output_json = "/home/jequan/Desktop/Antigravity Projects/Haplotype-Scout/public/data/helix_mtdna_freqs.json"

if not os.path.exists(tsv_path):
    print(f"Error: {tsv_path} not found.")
    sys.exit(1)

os.makedirs(os.path.dirname(output_json), exist_ok=True)

helix_db = {}
total_records = 0

with open(tsv_path, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f, delimiter="\t")
    for row in reader:
        locus = row.get("locus", "") # chrM:16
        if not locus.startswith("chrM:"):
            continue
        try:
            pos = int(locus.replace("chrM:", ""))
        except ValueError:
            continue
        
        alleles_raw = row.get("alleles", "[]")
        try:
            alleles = json.loads(alleles_raw)
            ref, alt = alleles[0], alleles[1]
        except Exception:
            continue

        counts_hom = int(row.get("counts_hom", 0) or 0)
        af_hom = float(row.get("AF_hom", 0) or 0.0)
        counts_het = int(row.get("counts_het", 0) or 0)
        af_het = float(row.get("AF_het", 0) or 0.0)
        gene = row.get("gene", "")
        feature = row.get("feature", "")

        haplos_raw = row.get("haplogroups_for_homoplasmic_variants", "[]")
        top_haplos = []
        try:
            haplo_list = json.loads(haplos_raw)
            # take top 3 haplogroups by frequency
            top_haplos = haplo_list[:3]
        except Exception:
            pass

        key = f"{pos}_{ref}>{alt}"
        helix_db[key] = {
            "pos": pos,
            "ref": ref,
            "alt": alt,
            "gene": gene,
            "feature": feature,
            "hom": counts_hom,
            "afHom": round(af_hom, 6),
            "het": counts_het,
            "afHet": round(af_het, 6),
            "topHaplos": top_haplos
        }
        total_records += 1

print(f"Parsed {total_records} variant records from HelixMTdb.")

with open(output_json, "w", encoding="utf-8") as f:
    json.dump(helix_db, f, separators=(',', ':'))

size_kb = os.path.getsize(output_json) / 1024
print(f"Saved optimized database to {output_json} ({size_kb:.1f} KB).")
