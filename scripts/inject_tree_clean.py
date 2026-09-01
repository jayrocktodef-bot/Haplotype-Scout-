#!/usr/bin/env python3
import sys

from expand_tree import NEW_YDNA_TREE_NODES, NEW_MTDNA_TREE_NODES

with open("src/data/haplogroupTree.ts", "r") as f:
    tree_code = f.read()

# 1. Insert into Y_DNA_HAPLOGROUPS (before export const MT_DNA_HAPLOGROUPS)
mt_marker = "export const MT_DNA_HAPLOGROUPS: HaplogroupDefinition[] = ["
idx_mt = tree_code.find(mt_marker)
idx_y_close = tree_code.rfind("];", 0, idx_mt)

# Replace the closing "];" with ",\n" + NEW_YDNA_TREE_NODES.rstrip(",") + "\n];"
tree_code = tree_code[:idx_y_close].rstrip() + ",\n" + NEW_YDNA_TREE_NODES.rstrip().rstrip(",") + "\n];\n\n" + tree_code[idx_mt:]

# 2. Insert into MT_DNA_HAPLOGROUPS (before export const ALL_HAPLOGROUPS)
all_marker = "export const ALL_HAPLOGROUPS: HaplogroupDefinition[] = ["
idx_all = tree_code.find(all_marker)
idx_mt_close = tree_code.rfind("];", 0, idx_all)

tree_code = tree_code[:idx_mt_close].rstrip() + ",\n" + NEW_MTDNA_TREE_NODES.rstrip().rstrip(",") + "\n];\n\n" + tree_code[idx_all:]

with open("src/data/haplogroupTree.ts", "w") as f:
    f.write(tree_code)

print("Injected tree nodes inside array boundaries.")
