import React, { useState, useMemo, useRef } from 'react';
import { MigrationStep } from '../types/haplogroup';
import { 
  MapPin, Clock, Compass, Layers, ZoomIn, ZoomOut, RotateCcw, 
  Sparkles, Snowflake, ChevronRight, Eye, ShieldCheck, Mountain, Waves,
  Maximize2, Info
} from 'lucide-react';

interface PaleoMigrationMapProps {
  migrationSteps: MigrationStep[];
  cladeCode: string;
  lineageLabel: string;
}

export const PaleoMigrationMap: React.FC<PaleoMigrationMapProps> = ({
  migrationSteps,
  cladeCode,
  lineageLabel
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLgmIceSheets, setShowLgmIceSheets] = useState(true);
  const [showLandBridges, setShowLandBridges] = useState(true);
  const [showBathymetry, setShowBathymetry] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  // Robinson / Natural Earth Canvas Coordinates matching the (800 x 406) physical world map
  const mapWidth = 1000;
  const mapHeight = 507.5;

  // Calibrated Pseudocylindrical projection matching the physical relief map
  const projectCoords = (lat?: number, lng?: number) => {
    const finalLat = Math.max(-82, Math.min(82, lat ?? 35));
    const finalLng = Math.max(-180, Math.min(180, lng ?? 20));

    // Vertical latitude scale
    const yRatio = (90 - finalLat) / 180;
    const y = yRatio * mapHeight;

    // Horizontal longitude scale with slight Robinson polar curve adjustment
    const latRad = (finalLat * Math.PI) / 180;
    const polarFactor = 0.86 + 0.14 * Math.cos(latRad);
    const x = (mapWidth * 0.504) + ((finalLng / 180) * (mapWidth * 0.47) * polarFactor);

    return { x, y };
  };

  // Generate geographic steps with calibrated coordinates
  const projectedSteps = useMemo(() => {
    return migrationSteps.map((step, idx) => {
      let lat = step.lat;
      let lng = step.lng;

      if (lat === undefined || lng === undefined) {
        const lower = step.region.toLowerCase();
        if (lower.includes('rift') || lower.includes('east africa') || lower.includes('kenya') || lower.includes('tanzania')) { lat = -1.2; lng = 36.8; }
        else if (lower.includes('west africa') || lower.includes('nigeria') || lower.includes('cameroon') || lower.includes('bantu') || lower.includes('senegal')) { lat = 7.5; lng = 6.0; }
        else if (lower.includes('south africa') || lower.includes('khoisan') || lower.includes('kalahari')) { lat = -26.0; lng = 24.0; }
        else if (lower.includes('congo') || lower.includes('central africa')) { lat = -2.0; lng = 22.0; }
        else if (lower.includes('levant') || lower.includes('near east') || lower.includes('fertile crescent') || lower.includes('middle east')) { lat = 32.5; lng = 35.8; }
        else if (lower.includes('anatolia') || lower.includes('turkey')) { lat = 39.0; lng = 34.0; }
        else if (lower.includes('caucasus') || lower.includes('georgia') || lower.includes('armenia')) { lat = 42.0; lng = 44.0; }
        else if (lower.includes('steppe') || lower.includes('caspian') || lower.includes('samara') || lower.includes('yamnaya') || lower.includes('ukraine')) { lat = 51.5; lng = 48.0; }
        else if (lower.includes('alps') || lower.includes('central europe') || lower.includes('germany') || lower.includes('corded ware') || lower.includes('bell beaker')) { lat = 49.5; lng = 10.5; }
        else if (lower.includes('iberia') || lower.includes('spain') || lower.includes('portugal') || lower.includes('basque')) { lat = 40.4; lng = -3.7; }
        else if (lower.includes('britain') || lower.includes('ireland') || lower.includes('celtic') || lower.includes('scotland')) { lat = 54.5; lng = -3.5; }
        else if (lower.includes('scandinavia') || lower.includes('nordic') || lower.includes('sweden') || lower.includes('norway')) { lat = 60.5; lng = 15.0; }
        else if (lower.includes('yellow river') || lower.includes('china') || lower.includes('east asia') || lower.includes('yangshao')) { lat = 35.0; lng = 110.0; }
        else if (lower.includes('taiwan') || lower.includes('austronesian') || lower.includes('polynesia') || lower.includes('lapita')) { lat = 23.5; lng = 121.0; }
        else if (lower.includes('samoa') || lower.includes('pacific islands')) { lat = -13.8; lng = -172.0; }
        else if (lower.includes('india') || lower.includes('south asia') || lower.includes('indus')) { lat = 22.0; lng = 78.0; }
        else if (lower.includes('beringia') || lower.includes('bering strait') || lower.includes('siberia')) { lat = 64.5; lng = -170.0; }
        else if (lower.includes('clovis') || lower.includes('montana') || lower.includes('north america') || lower.includes('plains')) { lat = 46.5; lng = -110.0; }
        else if (lower.includes('mesoamerica') || lower.includes('maya') || lower.includes('mexico')) { lat = 18.0; lng = -95.0; }
        else if (lower.includes('andes') || lower.includes('peru') || lower.includes('inca') || lower.includes('south america')) { lat = -13.0; lng = -74.0; }
        else if (lower.includes('australia') || lower.includes('aboriginal') || lower.includes('sahul')) { lat = -24.0; lng = 134.0; }
        else { lat = 35 + (idx * 3); lng = 20 + (idx * 10); }
      }

      const { x, y } = projectCoords(lat, lng);
      return {
        ...step,
        projX: x,
        projY: y
      };
    });
  }, [migrationSteps]);

  // Construct smooth Bezier geodesic curve
  const trajectoryPath = useMemo(() => {
    if (projectedSteps.length === 0) return '';
    let d = `M ${projectedSteps[0].projX} ${projectedSteps[0].projY}`;

    for (let i = 1; i < projectedSteps.length; i++) {
      const prev = projectedSteps[i - 1];
      const curr = projectedSteps[i];
      const midX = (prev.projX + curr.projX) / 2;
      const midY = Math.min(prev.projY, curr.projY) - 20;
      d += ` Q ${midX} ${midY}, ${curr.projX} ${curr.projY}`;
    }

    return d;
  }, [projectedSteps]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
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

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveStepIndex(null);
  };

  return (
    <div className="bento-card p-4 sm:p-7 space-y-5 text-left relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header & Map Layer Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">
                Paleogeographic Epoch &amp; Migration Map
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                Physical Relief Earth
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Natural shaded-relief topography with Late Glacial Maximum (LGM ~20,000 BP) ice sheets and exposed land bridges.
            </p>
          </div>
        </div>

        {/* Layer Toggles & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLgmIceSheets(!showLgmIceSheets)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border active:scale-95 ${
              showLgmIceSheets
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-sm shadow-blue-500/10'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>Ice Sheets</span>
          </button>

          <button
            onClick={() => setShowLandBridges(!showLandBridges)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border active:scale-95 ${
              showLandBridges
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-500/10'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Mountain className="w-3.5 h-3.5" />
            <span>Land Bridges</span>
          </button>

          <button
            onClick={() => setShowBathymetry(!showBathymetry)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border active:scale-95 ${
              showBathymetry
                ? 'bg-teal-500/20 text-teal-300 border-teal-400/40 shadow-sm shadow-teal-500/10'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Ridges</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 ml-1">
            <button
              onClick={() => setZoom((z) => Math.min(3.5, z + 0.25))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 text-slate-400 hover:text-white transition-colors border-l border-slate-800 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Physical Relief Map Canvas */}
      <div
        className="relative w-full h-[480px] sm:h-[540px] rounded-2xl bg-[#081326] border border-slate-800/80 overflow-hidden cursor-grab active:cursor-grabbing select-none shadow-inner"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-full"
        >
          <g
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
            style={{ transformOrigin: 'center', transition: isDragging ? 'none' : 'transform 0.15s ease-out' }}
          >
            <defs>
              {/* Glowing Migration Line Gradient */}
              <linearGradient id="clanTrajectory" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              {/* Waypoint Glow Filter */}
              <filter id="physicalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 🌍 Real Physical World Map (Shaded Relief Topography & Bathymetry) */}
            <image
              href="/assets/physical_world_map.jpg"
              x="0"
              y="0"
              width={mapWidth}
              height={mapHeight}
              preserveAspectRatio="none"
              className="pointer-events-none"
            />

            {/* Coordinate Grid & Graticules */}
            <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.8">
              <line x1="20" y1={mapHeight * 0.25} x2={mapWidth - 20} y2={mapHeight * 0.25} strokeDasharray="3,6" />
              <line x1="10" y1={mapHeight * 0.50} x2={mapWidth - 10} y2={mapHeight * 0.50} strokeDasharray="2,4" strokeOpacity="0.15" />
              <line x1="20" y1={mapHeight * 0.75} x2={mapWidth - 20} y2={mapHeight * 0.75} strokeDasharray="3,6" />
              <line x1={mapWidth * 0.25} y1="10" x2={mapWidth * 0.25} y2={mapHeight - 10} strokeDasharray="3,6" />
              <line x1={mapWidth * 0.504} y1="10" x2={mapWidth * 0.504} y2={mapHeight - 10} strokeDasharray="2,4" strokeOpacity="0.2" />
              <line x1={mapWidth * 0.75} y1="10" x2={mapWidth * 0.75} y2={mapHeight - 10} strokeDasharray="3,6" />
            </g>

            {/* 🧊 Exposed LGM Land Bridges (~20,000 BP Sea Level -120m) */}
            {showLandBridges && (
              <g fill="#d97706" fillOpacity="0.38" stroke="#b45309" strokeWidth="1" strokeDasharray="2,3">
                {/* Beringia Land Bridge (Siberia <-> Alaska) */}
                <path d="M 195 62 Q 220 50, 255 60 Q 245 78, 225 80 Q 205 76, 195 62 Z" />
                {/* Sundaland (SE Asia Mainland to Sumatra, Java, Borneo) */}
                <path d="M 720 220 Q 755 230, 770 260 Q 750 280, 725 270 Q 715 245, 720 220 Z" />
                {/* Sahul Shelf (Australia <-> New Guinea & Tasmania) */}
                <path d="M 770 300 Q 820 295, 840 330 Q 820 380, 785 385 Q 765 340, 770 300 Z" />
                {/* Doggerland (British Isles <-> Mainland Europe) */}
                <path d="M 485 105 Q 505 100, 515 118 Q 495 125, 485 105 Z" />
              </g>
            )}

            {/* 🏔️ LGM Continental Ice Sheets (Laurentide & Fennoscandian) */}
            {showLgmIceSheets && (
              <g fill="#e0f2fe" fillOpacity="0.55" stroke="#7dd3fc" strokeWidth="1.2">
                {/* Laurentide & Cordilleran Ice Sheet (North America) */}
                <path d="M 180 40 Q 260 25, 330 45 Q 350 85, 305 115 Q 240 120, 185 85 Z" />
                {/* Fennoscandian Ice Sheet (Northern Europe & Scandinavia) */}
                <path d="M 470 60 Q 530 48, 570 70 Q 560 110, 510 115 Q 465 100, 470 60 Z" />
              </g>
            )}

            {/* 🌊 Oceanic Ridges & Tectonic Faults */}
            {showBathymetry && (
              <g stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.45" fill="none">
                <path d="M 430 80 Q 410 160, 400 240 T 425 340 T 405 440" strokeDasharray="4,6" />
                <path d="M 670 280 Q 695 340, 720 420" strokeDasharray="3,6" />
              </g>
            )}

            {/* ⚡ Migration Trajectory Geodesic Vector Path */}
            {trajectoryPath && (
              <>
                {/* Ambient Trajectory Glow */}
                <path
                  d={trajectoryPath}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="6"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                  filter="url(#physicalGlow)"
                />
                {/* Core Animated Trajectory Line */}
                <path
                  d={trajectoryPath}
                  fill="none"
                  stroke="url(#clanTrajectory)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6,8"
                  className="animate-pulse"
                />
              </>
            )}

            {/* 📍 Waypoint Pins and Interactive Milestone Markers */}
            {projectedSteps.map((step, index) => {
              const isFirst = index === 0;
              const isLast = index === projectedSteps.length - 1;
              const isSelected = activeStepIndex === index;

              return (
                <g
                  key={index}
                  transform={`translate(${step.projX}, ${step.projY})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStepIndex(index);
                  }}
                >
                  {/* Pulse Ring for Origin & Terminal Clade */}
                  {(isFirst || isLast) && (
                    <circle
                      r={isSelected ? 18 : 14}
                      fill="none"
                      stroke={isLast ? '#10b981' : '#06b6d4'}
                      strokeWidth="2"
                      strokeOpacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Waypoint Outer Circle */}
                  <circle
                    r={isSelected ? 12 : 9}
                    fill={isLast ? '#10b981' : isFirst ? '#06b6d4' : '#6366f1'}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    className="shadow-lg transition-all"
                  />

                  {/* Milestone Index Number */}
                  <text
                    textAnchor="middle"
                    dy="3.5"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="800"
                    fontFamily="monospace"
                  >
                    {index + 1}
                  </text>

                  {/* Waypoint Text Label Pin */}
                  <g transform="translate(0, -18)">
                    <rect
                      x={-45}
                      y={-14}
                      width={90}
                      height={18}
                      rx={5}
                      fill="rgba(8, 12, 20, 0.9)"
                      stroke={isLast ? '#10b981' : isFirst ? '#06b6d4' : '#6366f1'}
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dy="-1.5"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="700"
                      fontFamily="system-ui"
                    >
                      {step.timePeriod.split(' ')[0]}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Active Waypoint Inspector Card */}
        {activeStepIndex !== null && projectedSteps[activeStepIndex] && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-84 p-4 rounded-2xl bg-[#080c14]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl animate-fade-up z-10 text-left">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-mono font-extrabold flex items-center justify-center">
                  {activeStepIndex + 1}
                </span>
                <span className="text-xs font-bold text-white">
                  {projectedSteps[activeStepIndex].region}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30">
                {projectedSteps[activeStepIndex].timePeriod}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {projectedSteps[activeStepIndex].description}
            </p>
            <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
              <span>Milestone {activeStepIndex + 1} of {projectedSteps.length}</span>
              <button
                onClick={() => setActiveStepIndex(null)}
                className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Migration Milestones Timeline List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Chronological Lineage Epochs ({cladeCode})</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projectedSteps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                activeStepIndex === idx
                  ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/60 border-white/[0.04] hover:bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[9px] font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-white truncate max-w-[130px]">
                    {step.region}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold">
                  {step.timePeriod}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
