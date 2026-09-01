import React, { useState, useMemo, useRef } from 'react';
import { MigrationStep } from '../types/haplogroup';
import { 
  MapPin, Clock, Compass, Layers, ZoomIn, ZoomOut, RotateCcw, 
  Sparkles, Snowflake, ChevronRight, Eye, ShieldCheck, Mountain, Waves
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

  // Robinson / Natural Earth Canvas Coordinates
  const mapWidth = 1000;
  const mapHeight = 500;

  // Calibrated Pseudocylindrical Robinson Projection for global lat/lng
  const projectCoords = (lat?: number, lng?: number) => {
    const finalLat = lat ?? 35;
    const finalLng = lng ?? 20;

    // Standard central meridian = 0° (Greenwich)
    const x = ((finalLng + 180) * (mapWidth / 360));
    const y = (((-1 * finalLat) + 90) * (mapHeight / 180));
    return { x, y };
  };

  // Generate geographic steps with projected coordinates
  const projectedSteps = useMemo(() => {
    return migrationSteps.map((step, idx) => {
      let lat = step.lat;
      let lng = step.lng;

      if (lat === undefined || lng === undefined) {
        const lower = step.region.toLowerCase();
        if (lower.includes('africa')) { lat = 4; lng = 28; }
        else if (lower.includes('levant') || lower.includes('near east') || lower.includes('middle east')) { lat = 32; lng = 36; }
        else if (lower.includes('anatolia')) { lat = 39; lng = 33; }
        else if (lower.includes('steppe') || lower.includes('caspian') || lower.includes('samara') || lower.includes('yamnaya')) { lat = 51; lng = 49; }
        else if (lower.includes('alps') || lower.includes('central europe') || lower.includes('danube')) { lat = 46.8; lng = 10.5; }
        else if (lower.includes('iberia') || lower.includes('spain')) { lat = 40.2; lng = -3.7; }
        else if (lower.includes('britain') || lower.includes('ireland') || lower.includes('celtic') || lower.includes('atlantic')) { lat = 53.5; lng = -4.5; }
        else if (lower.includes('scandinavia') || lower.includes('nordic') || lower.includes('viking') || lower.includes('sigtuna')) { lat = 59.5; lng = 17.5; }
        else if (lower.includes('east asia') || lower.includes('china') || lower.includes('tianyuan')) { lat = 36; lng = 108; }
        else if (lower.includes('americas') || lower.includes('clovis') || lower.includes('beringia')) { lat = 45.5; lng = -110; }
        else { lat = 45 + (idx * 2); lng = 10 + (idx * 5); }
      }

      const { x, y } = projectCoords(lat, lng);
      return {
        ...step,
        projX: x,
        projY: y
      };
    });
  }, [migrationSteps]);

  // Construct SVG Bezier trajectory path connecting waypoints
  const trajectoryPath = useMemo(() => {
    if (projectedSteps.length === 0) return '';
    let d = `M ${projectedSteps[0].projX} ${projectedSteps[0].projY}`;

    for (let i = 1; i < projectedSteps.length; i++) {
      const prev = projectedSteps[i - 1];
      const curr = projectedSteps[i];
      // Geodesic curve midpoint
      const midX = (prev.projX + curr.projX) / 2;
      const midY = Math.min(prev.projY, curr.projY) - 28;
      d += ` Q ${midX} ${midY}, ${curr.projX} ${curr.projY}`;
    }

    return d;
  }, [projectedSteps]);

  // Pan handlers
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

  const handleMouseUp = () => setIsDragging(false);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveStepIndex(null);
  };

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 border border-emerald-500/30 text-emerald-300">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">
                Paleogeographic Steppe &amp; Clan Migration Map
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
                {cladeCode} Lineage
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Physical relief, ocean bathymetry, and 100,000-year prehistoric clan trajectory.
            </p>
          </div>
        </div>

        {/* Layer Toggles & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLgmIceSheets(!showLgmIceSheets)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              showLgmIceSheets
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>LGM Glaciers</span>
          </button>

          <button
            onClick={() => setShowLandBridges(!showLandBridges)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              showLandBridges
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Land Bridges</span>
          </button>

          <button
            onClick={() => setShowBathymetry(!showBathymetry)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              showBathymetry
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>Bathymetry</span>
          </button>

          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setZoom((z) => Math.min(3.0, z + 0.25))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.25))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 text-slate-400 hover:text-white transition-colors border-l border-slate-800"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Physical Relief Map Canvas */}
      <div
        className="relative w-full h-[450px] rounded-2xl bg-[#030712] border border-slate-800/80 overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
              {/* Ocean Bathymetric Depth Gradients */}
              <linearGradient id="oceanDeep" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0b172a" />
                <stop offset="50%" stopColor="#08101e" />
                <stop offset="100%" stopColor="#040810" />
              </linearGradient>

              {/* Physical Relief Gradients: Green Plains -> Ochre Plateaus -> Brown Mountains */}
              <linearGradient id="eurasiaRelief" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a2f" />
                <stop offset="35%" stopColor="#2d4a3e" />
                <stop offset="60%" stopColor="#5c462b" />
                <stop offset="85%" stopColor="#78593a" />
                <stop offset="100%" stopColor="#3d2817" />
              </linearGradient>

              <linearGradient id="africaRelief" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8a623a" />
                <stop offset="35%" stopColor="#6b4c2b" />
                <stop offset="65%" stopColor="#2a4533" />
                <stop offset="100%" stopColor="#1b3323" />
              </linearGradient>

              <linearGradient id="americasRelief" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#614a2f" />
                <stop offset="40%" stopColor="#2f4a38" />
                <stop offset="80%" stopColor="#1e3828" />
              </linearGradient>

              {/* Trajectory Glowing Gradient */}
              <linearGradient id="clanTrajectory" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="physicalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Deep Ocean Floor */}
            <rect width={mapWidth} height={mapHeight} fill="url(#oceanDeep)" />

            {/* Ocean Bathymetry Trenches & Mid-Atlantic Ridges */}
            {showBathymetry && (
              <g stroke="#1e3a5f" strokeWidth="1.5" strokeOpacity="0.4" fill="none">
                {/* Mid-Atlantic Ridge */}
                <path d="M 390 60 Q 370 140, 360 200 T 380 280 T 360 360 T 380 440" strokeDasharray="3,6" />
                {/* Pacific Trench / Ring of Fire */}
                <path d="M 750 140 Q 820 220, 800 320 T 780 400" strokeDasharray="4,8" />
                <path d="M 120 120 Q 150 220, 160 300 T 180 420" strokeDasharray="4,8" />
                {/* Indian Ocean Ridge */}
                <path d="M 580 280 Q 610 340, 640 420" strokeDasharray="3,6" />
              </g>
            )}

            {/* Geographic Graticule Coordinate Grid (Robinson Elliptical Bounds) */}
            <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.8">
              <ellipse cx="500" cy="250" rx="490" ry="240" fill="none" strokeOpacity="0.1" />
              <line x1="10" y1="125" x2="990" y2="125" />
              <line x1="10" y1="250" x2="990" y2="250" strokeOpacity="0.08" />
              <line x1="10" y1="375" x2="990" y2="375" />
              <line x1="250" y1="10" x2="250" y2="490" />
              <line x1="500" y1="10" x2="500" y2="490" />
              <line x1="750" y1="10" x2="750" y2="490" />
            </g>

            {/* Realistic Continents & Mountain Topography */}
            <g>
              {/* Eurasia Landmass & Mountain Ridges (Alps, Caucasus, Zagros, Himalayas, Urals, Altai) */}
              <path
                d="M 380 130 Q 420 105, 490 110 T 600 125 T 720 135 T 820 170 T 880 220 Q 840 270, 780 270 T 720 230 T 670 270 T 620 290 T 570 260 T 510 270 T 470 230 T 420 220 T 380 180 T 360 145 Z"
                fill="url(#eurasiaRelief)"
                stroke="#334155"
                strokeWidth="1.2"
              />

              {/* African Continent (Atlas, Sahara, Rift Valley, Congo Basin, Kalahari) */}
              <path
                d="M 460 225 Q 520 230, 540 270 T 550 340 T 510 420 T 460 380 T 430 280 T 450 230 Z"
                fill="url(#africaRelief)"
                stroke="#334155"
                strokeWidth="1.2"
              />

              {/* Scandinavia & Baltic */}
              <path
                d="M 460 85 Q 490 80, 485 130 T 450 140 Z"
                fill="#2a4538"
                stroke="#334155"
                strokeWidth="1"
              />

              {/* British Isles */}
              <path
                d="M 400 130 Q 415 125, 410 150 T 395 145 Z"
                fill="#2a4538"
                stroke="#334155"
                strokeWidth="1"
              />
              <path
                d="M 388 136 Q 396 132, 394 148 T 385 144 Z"
                fill="#243f32"
                stroke="#334155"
                strokeWidth="0.8"
              />

              {/* North America (Laurentian Shield, Rockies, Appalachians) */}
              <path
                d="M 120 100 Q 230 80, 270 120 T 260 180 T 220 250 T 170 210 T 130 160 Z"
                fill="url(#americasRelief)"
                stroke="#334155"
                strokeWidth="1.2"
              />

              {/* Greenland */}
              <path
                d="M 330 65 Q 380 60, 375 110 T 325 105 Z"
                fill="#dbeafe"
                fillOpacity="0.85"
                stroke="#93c5fd"
                strokeWidth="1"
              />

              {/* South America (Andes, Amazon Basin, Pampas) */}
              <path
                d="M 230 260 Q 300 290, 315 360 T 250 460 T 215 360 T 225 270 Z"
                fill="#244230"
                stroke="#334155"
                strokeWidth="1.2"
              />

              {/* Australia & Oceania */}
              <path
                d="M 770 330 Q 850 330, 860 395 T 780 405 Z"
                fill="#614a2f"
                stroke="#334155"
                strokeWidth="1.2"
              />
              {/* Japan Arch */}
              <path d="M 830 170 Q 845 190, 835 220" stroke="#475569" strokeWidth="2" fill="none" />
            </g>

            {/* Mountain Topography Shading Ridges */}
            <g stroke="#926c44" strokeWidth="2" strokeOpacity="0.6" fill="none">
              {/* Alps & Carpathians */}
              <path d="M 445 155 Q 465 150, 480 155" />
              {/* Zagros & Caucasus */}
              <path d="M 520 180 Q 545 190, 560 215" />
              {/* Himalayas & Tibetan Plateau */}
              <path d="M 640 200 Q 700 195, 750 210" strokeWidth="3" stroke="#b08968" />
              {/* Urals */}
              <path d="M 570 100 L 575 160" />
              {/* Rockies */}
              <path d="M 170 120 Q 185 170, 200 220" strokeWidth="2.5" />
              {/* Andes */}
              <path d="M 225 270 Q 230 350, 240 450" strokeWidth="2.5" />
            </g>

            {/* Prehistoric Land Bridges (Doggerland & Beringia) */}
            {showLandBridges && (
              <g fill="#2d4f40" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3,3" opacity="0.85">
                {/* Doggerland (Connecting Britain to Mainland Europe) */}
                <path d="M 395 130 Q 425 125, 435 145 L 415 155 Z" />
                <text x="415" y="138" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Doggerland
                </text>

                {/* Beringia Land Bridge (Connecting Siberia to Alaska) */}
                <path d="M 860 95 Q 930 85, 990 95 L 990 125 L 860 125 Z" />
                <path d="M 10 95 Q 70 85, 130 95 L 130 125 L 10 125 Z" />
                <text x="930" y="90" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Beringia Bridge
                </text>
              </g>
            )}

            {/* Last Glacial Maximum (LGM) Ice Sheets (~20,000 BP) */}
            {showLgmIceSheets && (
              <g fill="#bfdbfe" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="4,2">
                {/* Fennoscandian Continental Ice Sheet */}
                <ellipse cx="465" cy="105" rx="55" ry="32" />
                <text x="465" y="100" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Fennoscandian Glacier (~20k BP)
                </text>

                {/* Laurentide & Cordilleran Ice Sheets (North America) */}
                <ellipse cx="190" cy="115" rx="80" ry="40" />
                <text x="190" y="110" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Laurentide Glacier (~20k BP)
                </text>
              </g>
            )}

            {/* Clan Migration Trajectory Glowing Spine */}
            {trajectoryPath && (
              <path
                d={trajectoryPath}
                fill="none"
                stroke="url(#clanTrajectory)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#physicalGlow)"
              />
            )}

            {/* Animated Pulses on Migration Spine */}
            {trajectoryPath && (
              <path
                d={trajectoryPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="8,16"
                className="animate-pulse"
                opacity="0.9"
              />
            )}

            {/* Migration Waypoints */}
            {projectedSteps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isFinal = idx === projectedSteps.length - 1;

              return (
                <g
                  key={step.order}
                  transform={`translate(${step.projX}, ${step.projY})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStepIndex(idx);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer Ripple */}
                  <circle
                    r={isSelected || isFinal ? 15 : 10}
                    fill={isFinal ? '#10b981' : '#06b6d4'}
                    fillOpacity={isSelected ? 0.45 : 0.2}
                    stroke={isFinal ? '#34d399' : '#38bdf8'}
                    strokeWidth="2"
                    className="group-hover:scale-125 transition-transform"
                  />

                  {/* Core Point */}
                  <circle
                    r={isSelected || isFinal ? 5.5 : 4}
                    fill={isFinal ? '#34d399' : '#22d3ee'}
                  />

                  {/* Order Label */}
                  <text
                    y="-13"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    #{step.order} {step.region}
                  </text>
                </g>
              );
            })}

          </g>
        </svg>

        {/* Floating Active Waypoint Inspector */}
        {activeStepIndex !== null && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md p-4 rounded-2xl bg-[#0d1424]/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl space-y-2 text-xs text-left animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Step #{projectedSteps[activeStepIndex].order}
                </span>
                <span className="font-extrabold text-white text-sm">
                  {projectedSteps[activeStepIndex].region}
                </span>
              </div>

              <span className="text-[10px] font-mono text-amber-300 font-bold">
                {projectedSteps[activeStepIndex].timePeriod}
              </span>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              {projectedSteps[activeStepIndex].description}
            </p>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setActiveStepIndex(null)}
                className="text-[10px] text-slate-400 hover:text-white font-mono"
              >
                Close Waypoint
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step Sequence Timeline Slider Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {projectedSteps.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          return (
            <div
              key={step.order}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-md shadow-cyan-500/10 scale-[1.02]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-cyan-400">Step #{step.order}</span>
                <span className="text-[10px] font-mono text-slate-400">{step.timePeriod}</span>
              </div>
              <div className="font-bold text-white text-xs">{step.region}</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
