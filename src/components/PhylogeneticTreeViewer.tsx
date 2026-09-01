import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Y_DNA_HAPLOGROUPS, MT_DNA_HAPLOGROUPS } from '../data/haplogroupTree';
import { HaplogroupDefinition, DnaAnalysisResult } from '../types/haplogroup';
import {
  Compass,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  MapPin,
  Clock,
  Dna,
  Share2,
  Search,
  ChevronRight,
  ShieldAlert,
  Target,
  X
} from 'lucide-react';

interface TreeNode {
  data: HaplogroupDefinition;
  children: TreeNode[];
  depth: number;
}

interface PhylogeneticTreeViewerProps {
  activeResult?: DnaAnalysisResult | null;
  initialLineage?: 'PATERNAL_YDNA' | 'MATERNAL_MTDNA';
}

export const PhylogeneticTreeViewer: React.FC<PhylogeneticTreeViewerProps> = ({
  activeResult,
  initialLineage = 'PATERNAL_YDNA'
}) => {
  const [activeLineage, setActiveLineage] = useState<'PATERNAL_YDNA' | 'MATERNAL_MTDNA'>(
    initialLineage
  );
  const [selectedNode, setSelectedNode] = useState<HaplogroupDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(0.85);
  const [pan, setPan] = useState({ x: 60, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchDistance, setTouchDistance] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // User's active haplogroup code from current analysis
  const userHaplogroupCode = useMemo(() => {
    if (!activeResult) return null;
    if (activeLineage === 'PATERNAL_YDNA') {
      return activeResult.paternalLineage?.terminalHaplogroup?.code || null;
    } else {
      return activeResult.maternalLineage?.terminalHaplogroup?.code || null;
    }
  }, [activeResult, activeLineage]);

  // Build the hierarchical tree structure (Supports multiple roots / full reachability)
  const { rootNodes, nodeMap, userPathCodes } = useMemo(() => {
    const rawList = activeLineage === 'PATERNAL_YDNA' ? Y_DNA_HAPLOGROUPS : MT_DNA_HAPLOGROUPS;
    const map = new Map<string, TreeNode>();

    // 1. Create TreeNodes
    for (const hg of rawList) {
      map.set(hg.code, { data: hg, children: [], depth: 0 });
    }

    const roots: TreeNode[] = [];

    // 2. Link Children & determine Roots
    for (const hg of rawList) {
      const node = map.get(hg.code)!;
      if (hg.parentClade && map.has(hg.parentClade)) {
        const parent = map.get(hg.parentClade)!;
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    // 3. Calculate Depths recursively
    const setDepth = (n: TreeNode, d: number) => {
      n.depth = d;
      for (const child of n.children) {
        setDepth(child, d + 1);
      }
    };
    for (const r of roots) {
      setDepth(r, 0);
    }

    // 4. Trace User Lineage Path from Terminal Clade up to Root
    const pathCodes = new Set<string>();
    if (userHaplogroupCode && map.has(userHaplogroupCode)) {
      let curr: HaplogroupDefinition | undefined = map.get(userHaplogroupCode)?.data;
      while (curr) {
        pathCodes.add(curr.code);
        if (curr.parentClade && map.has(curr.parentClade)) {
          curr = map.get(curr.parentClade)!.data;
        } else {
          break;
        }
      }
    }

    return { rootNodes: roots, nodeMap: map, userPathCodes: pathCodes };
  }, [activeLineage, userHaplogroupCode]);

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, .node-element')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Pan & Pinch Zoom Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    } else if (e.touches.length === 2 && touchDistance !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistance;
      setZoom((z) => Math.min(2.5, Math.max(0.25, z * factor)));
      setTouchDistance(dist);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchDistance(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(2.5, Math.max(0.25, prev * zoomFactor)));
  };

  const resetView = () => {
    setZoom(0.85);
    setPan({ x: 60, y: 120 });
  };

  // Layout node coordinates (Tree coordinates calculation)
  const renderTree = useMemo(() => {
    if (rootNodes.length === 0) return null;

    let currentY = 60;
    const X_SPACING = 240;
    const Y_SPACING = 65;

    const positions = new Map<string, { x: number; y: number }>();

    // Post-order traversal to calculate tree node (x, y)
    const computePositions = (node: TreeNode) => {
      if (node.children.length === 0) {
        positions.set(node.data.code, {
          x: node.depth * X_SPACING + 80,
          y: currentY
        });
        currentY += Y_SPACING;
      } else {
        for (const child of node.children) {
          computePositions(child);
        }
        const childYs = node.children.map((c) => positions.get(c.data.code)!.y);
        const avgY = (Math.min(...childYs) + Math.max(...childYs)) / 2;
        positions.set(node.data.code, {
          x: node.depth * X_SPACING + 80,
          y: avgY
        });
      }
    };

    for (const root of rootNodes) {
      computePositions(root);
      currentY += 40; // Spacing between multiple roots
    }

    // Filter nodes if search query is active
    const searchMatches = new Set<string>();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      for (const [code, node] of nodeMap.entries()) {
        if (
          code.toLowerCase().includes(q) ||
          node.data.shortName.toLowerCase().includes(q) ||
          node.data.cladeName.toLowerCase().includes(q) ||
          node.data.definingSnps.some((s) => s.toLowerCase().includes(q))
        ) {
          searchMatches.add(code);
        }
      }
    }

    // Generate SVG Lines
    const lines: React.ReactNode[] = [];
    const nodes: React.ReactNode[] = [];

    const drawSubtree = (node: TreeNode) => {
      const parentPos = positions.get(node.data.code)!;
      const isUserNode = userPathCodes.has(node.data.code);
      const isTerminal = node.data.code === userHaplogroupCode;
      const isMatch = searchMatches.has(node.data.code);
      const isSelected = selectedNode?.code === node.data.code;

      for (const child of node.children) {
        const childPos = positions.get(child.data.code)!;
        const isChildInUserPath = userPathCodes.has(child.data.code);

        // Orthogonal connecting bezier curve
        const pathD = `M ${parentPos.x} ${parentPos.y} C ${parentPos.x + 80} ${parentPos.y}, ${childPos.x - 80} ${childPos.y}, ${childPos.x} ${childPos.y}`;

        lines.push(
          <path
            key={`line-${node.data.code}-${child.data.code}`}
            d={pathD}
            fill="none"
            stroke={isChildInUserPath ? '#06b6d4' : '#334155'}
            strokeWidth={isChildInUserPath ? 3.5 : 1.5}
            className="transition-all duration-300"
            opacity={searchQuery && !searchMatches.has(child.data.code) && !isMatch ? 0.25 : 1}
          />
        );

        drawSubtree(child);
      }

      nodes.push(
        <g
          key={`node-${node.data.code}`}
          transform={`translate(${parentPos.x}, ${parentPos.y})`}
          className="cursor-pointer group node-element"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedNode(node.data);
          }}
        >
          {/* Glowing user path indicator */}
          {isUserNode && (
            <circle
              r="18"
              className="fill-cyan-500/20 stroke-cyan-400/50 animate-pulse"
              strokeWidth="2"
            />
          )}

          {/* Node Circle */}
          <circle
            r={isTerminal ? 12 : isUserNode ? 9 : 7}
            className={`transition-all duration-200 ${
              isTerminal
                ? 'fill-cyan-400 stroke-white stroke-2 shadow-lg shadow-cyan-500/50'
                : isUserNode
                ? 'fill-cyan-500 stroke-cyan-200 stroke-2'
                : isSelected
                ? 'fill-amber-400 stroke-amber-200 stroke-2'
                : isMatch
                ? 'fill-violet-400 stroke-violet-200 stroke-2'
                : 'fill-[#1e293b] stroke-[#475569] hover:fill-[#334155] hover:stroke-cyan-400'
            }`}
          />

          {/* Node Text Label */}
          <text
            x={16}
            y={4}
            className={`text-[13px] font-mono select-none transition-all ${
              isTerminal
                ? 'fill-cyan-300 font-extrabold text-[15px]'
                : isUserNode
                ? 'fill-cyan-100 font-bold'
                : isSelected
                ? 'fill-amber-300 font-bold'
                : isMatch
                ? 'fill-violet-300 font-bold'
                : 'fill-slate-400 group-hover:fill-slate-200'
            }`}
          >
            {node.data.code}
          </text>

          {/* Defining SNP text under label */}
          <text
            x={16}
            y={18}
            className="text-[10px] font-sans fill-slate-500 group-hover:fill-slate-300 select-none"
          >
            {node.data.cladeName.split('-')[1] || node.data.definingSnps[0] || ''}
          </text>
        </g>
      );
    };

    for (const root of rootNodes) {
      drawSubtree(root);
    }

    return { lines, nodes, positions, totalHeight: currentY };
  }, [rootNodes, nodeMap, userPathCodes, userHaplogroupCode, searchQuery, selectedNode]);

  // Center / Focus View on User's Terminal Clade
  const focusOnUserClade = useCallback(() => {
    if (!userHaplogroupCode || !renderTree?.positions) return;
    const pos = renderTree.positions.get(userHaplogroupCode);
    if (!pos || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const targetZoom = 1.1;
    setZoom(targetZoom);
    setPan({
      x: width / 2 - pos.x * targetZoom,
      y: height / 2 - pos.y * targetZoom
    });

    const node = nodeMap.get(userHaplogroupCode)?.data;
    if (node) setSelectedNode(node);
  }, [userHaplogroupCode, renderTree, nodeMap]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl bg-[#080c14] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 text-left ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[750px] max-h-[85vh]'
      }`}
    >
      {/* Studio Header Toolbar */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#0c1220]/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
        
        {/* Left Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>Interactive Phylogenetic Tree</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase font-mono hidden sm:inline">
                ISOGG v15 &amp; PhyloTree 17
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Complete {activeLineage === 'PATERNAL_YDNA' ? '55 Y-DNA' : '48 mtDNA'} clade hierarchy with root-to-terminal path highlighting.
            </p>
          </div>
        </div>

        {/* Center & Right Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Y-DNA vs mtDNA Toggle */}
          <div className="flex rounded-xl bg-slate-900/90 border border-white/[0.08] p-1">
            <button
              onClick={() => {
                setActiveLineage('PATERNAL_YDNA');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLineage === 'PATERNAL_YDNA'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Y-DNA (Paternal)
            </button>
            <button
              onClick={() => {
                setActiveLineage('MATERNAL_MTDNA');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeLineage === 'MATERNAL_MTDNA'
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              mtDNA (Maternal)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SNP or Clade..."
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-36 sm:w-44"
            />
          </div>

          {/* User Clade Focus Target Button */}
          {userHaplogroupCode && (
            <button
              onClick={focusOnUserClade}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
              title={`Center on your clade (${userHaplogroupCode})`}
            >
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Focus Clade</span>
            </button>
          )}

          {/* Zoom & View Controls */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-white/[0.08] p-1 rounded-xl">
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z * 1.2))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.25, z * 0.8))}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* SVG Interactive Canvas Area */}
      <div
        className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing bg-[#080c14] select-none touch-none overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Subtle Canvas Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* User Lineage Banner if active */}
        {userHaplogroupCode && (
          <div className="absolute top-4 left-4 z-10 p-3 rounded-xl bg-[#0c1220]/90 border border-cyan-500/30 backdrop-blur-md flex items-center gap-3 shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="text-[10px] text-cyan-300 uppercase tracking-wider font-bold">
                Your Assigned Lineage
              </div>
              <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <span>{userHaplogroupCode}</span>
                <span className="text-[10px] text-cyan-400/80 font-normal">
                  ({userPathCodes.size} steps from root)
                </span>
              </div>
            </div>
          </div>
        )}

        <svg
          className="w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
        >
          {renderTree && (
            <>
              <g>{renderTree.lines}</g>
              <g>{renderTree.nodes}</g>
            </>
          )}
        </svg>
      </div>

      {/* Node Details Flyout Panel / Drawer */}
      {selectedNode && (
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 rounded-2xl bg-[#0d1424]/95 border border-cyan-500/30 shadow-2xl p-5 backdrop-blur-xl z-30 animate-in fade-in slide-in-from-bottom-4 duration-200 max-h-[75vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white font-mono">{selectedNode.code}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                  {selectedNode.cladeName}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{selectedNode.shortName}</div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close Details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                Estimated Age: <strong className="text-white">{selectedNode.ageYearsBp}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>
                Origin: <strong className="text-white">{selectedNode.originRegion}</strong>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] text-slate-300 leading-relaxed text-[11px]">
              {selectedNode.historicalDescription}
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1.5">
                Defining Mutations ({selectedNode.definingSnps.length})
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {selectedNode.definingSnps.map((snp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]"
                  >
                    {snp}
                  </span>
                ))}
              </div>
            </div>

            {selectedNode.ancientCultures && selectedNode.ancientCultures.length > 0 && (
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                  Associated Ancient Cultures
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.ancientCultures.map((culture, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-500/30 text-violet-300 text-[10px]"
                    >
                      {culture}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
