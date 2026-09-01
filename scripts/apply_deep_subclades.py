#!/usr/bin/env python3
import re
from deep_subclades import (
    DEEP_YDNA_SNPS,
    DEEP_MTDNA_SNPS,
    DEEP_YDNA_TREE_NODES,
    DEEP_MTDNA_TREE_NODES
)

# 1. Update snpDatabase.ts
with open("src/data/snpDatabase.ts", "r") as f:
    snp_text = f.read()

# Add Y SNPs before the closing array bracket
idx_snp_end = snp_text.rfind("];")
if idx_snp_end != -1:
    snp_text = snp_text[:idx_snp_end] + ",\n" + DEEP_YDNA_SNPS.strip() + ",\n" + DEEP_MTDNA_SNPS.strip() + "\n" + snp_text[idx_snp_end:]

with open("src/data/snpDatabase.ts", "w") as f:
    f.write(snp_text)

print("Updated snpDatabase.ts with deep terminal SNPs.")

# 2. Update haplogroupTree.ts
with open("src/data/haplogroupTree.ts", "r") as f:
    tree_text = f.read()

# Inject Y-DNA nodes into Y_DNA_HAPLOGROUPS
idx_y_end = tree_text.find("export const MT_DNA_HAPLOGROUPS")
idx_y_close = tree_text.rfind("];", 0, idx_y_end)
if idx_y_close != -1:
    tree_text = tree_text[:idx_y_close] + ",\n" + DEEP_YDNA_TREE_NODES.strip() + "\n" + tree_text[idx_y_close:]

# Inject mtDNA nodes into MT_DNA_HAPLOGROUPS
idx_mt_end = tree_text.find("export const ALL_HAPLOGROUPS")
idx_mt_close = tree_text.rfind("];", 0, idx_mt_end)
if idx_mt_close != -1:
    tree_text = tree_text[:idx_mt_close] + ",\n" + DEEP_MTDNA_TREE_NODES.strip() + "\n" + tree_text[idx_mt_close:]

with open("src/data/haplogroupTree.ts", "w") as f:
    f.write(tree_text)

print("Updated haplogroupTree.ts with deep terminal clades.")
