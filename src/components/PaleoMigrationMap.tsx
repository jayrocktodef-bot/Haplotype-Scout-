import React, { useState, useMemo, useRef } from 'react';
import { MigrationStep } from '../types/haplogroup';
import { 
  MapPin, Clock, Compass, Layers, ZoomIn, ZoomOut, RotateCcw, 
  Sparkles, Snowflake, Play, Pause, ChevronRight, Info
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
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  // SVG coordinate projection bounds (Equirectangular base)
  const mapWidth = 900;
  const mapHeight = 500;

  // Convert lat/lng to SVG x,y coordinates
  const projectCoords = (lat?: number, lng?: number) => {
    const fallbackLat = 35;
    const fallbackLng = 20;
    const finalLat = lat ?? fallbackLat;
    const finalLng = lng ?? fallbackLng;

    const x = ((finalLng + 180) * (mapWidth / 360));
    const y = (((-1 * finalLat) + 90) * (mapHeight / 180));
    return { x, y };
  };

  // Generate geographic steps with projected coordinates
  const projectedSteps = useMemo(() => {
    return migrationSteps.map((step, idx) => {
      // If coordinates are missing, supply geographic approximations based on region names
      let lat = step.lat;
      let lng = step.lng;

      if (lat === undefined || lng === undefined) {
        const lower = step.region.toLowerCase();
        if (lower.includes('africa')) { lat = 5; lng = 25; }
        else if (lower.includes('levant') || lower.includes('near east') || lower.includes('middle east')) { lat = 32; lng = 36; }
        else if (lower.includes('anatolia')) { lat = 39; lng = 33; }
        else if (lower.includes('steppe') || lower.includes('caspian') || lower.includes('samara') || lower.includes('yamnaya')) { lat = 50; lng = 48; }
        else if (lower.includes('alps') || lower.includes('central europe') || lower.includes('danube')) { lat = 47; lng = 11; }
        else if (lower.includes('iberia') || lower.includes('spain')) { lat = 40; lng = -3; }
        else if (lower.includes('britain') || lower.includes('ireland') || lower.includes('celtic') || lower.includes('atlantic')) { lat = 54; lng = -4; }
        else if (lower.includes('scandinavia') || lower.includes('nordic') || lower.includes('viking')) { lat = 59; lng = 15; }
        else if (lower.includes('east asia') || lower.includes('china')) { lat = 35; lng = 105; }
        else if (lower.includes('americas') || lower.includes('clovis') || lower.includes('beringia')) { lat = 45; lng = -110; }
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
      // Smooth curve with midpoint control
      const midX = (prev.projX + curr.projX) / 2;
      const midY = Math.min(prev.projY, curr.projY) - 25;
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
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 text-cyan-300">
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
              100,000-year spatial-temporal journey across prehistoric continents, ice sheets, and land bridges.
            </p>
          </div>
        </div>

        {/* Controls & Layer Toggles */}
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
            <span>LGM Ice Sheets</span>
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

          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
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

      {/* Interactive Map Canvas */}
      <div
        className="relative w-full h-[420px] rounded-2xl bg-[#060a12] border border-slate-800/80 overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
              <linearGradient id="paleoOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#080e1a" />
                <stop offset="100%" stopColor="#04070d" />
              </linearGradient>

              <linearGradient id="paleoTrajectoryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              <filter id="paleoGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ocean Basin */}
            <rect width={mapWidth} height={mapHeight} fill="url(#paleoOceanGrad)" />

            {/* Lat/Long Gridlines */}
            <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" strokeDasharray="3,3">
              <line x1="0" y1="125" x2={mapWidth} y2="125" />
              <line x1="0" y1="250" x2={mapWidth} y2="250" />
              <line x1="0" y1="375" x2={mapWidth} y2="375" />
              <line x1="225" y1="0" x2="225" y2={mapHeight} />
              <line x1="450" y1="0" x2="450" y2={mapHeight} />
              <line x1="675" y1="0" x2="675" y2={mapHeight} />
            </g>

            {/* Simplified Global Continental Outlines */}
            <g fill="#0e1726" stroke="#1e293b" strokeWidth="1">
              {/* Eurasia / Africa */}
              <path d="M 400 130 Q 450 110, 520 120 T 620 140 T 700 190 T 750 270 Q 720 320, 650 320 T 560 260 T 480 270 T 420 220 T 360 160 Z" />
              <path d="M 420 230 Q 480 230, 500 270 T 520 350 T 470 430 T 420 380 T 390 280 Z" />
              {/* Europe */}
              <path d="M 370 120 Q 440 100, 480 140 T 450 190 T 380 200 T 360 150 Z" />
              {/* British Isles */}
              <path d="M 360 130 Q 375 125, 370 145 T 355 140 Z" />
              {/* Americas */}
              <path d="M 120 110 Q 220 90, 240 180 T 200 250 T 150 200 Z" />
              <path d="M 210 260 Q 280 290, 290 360 T 230 460 T 200 360 Z" />
              {/* Australia */}
              <path d="M 720 330 Q 800 330, 810 390 T 730 400 Z" />
            </g>

            {/* Prehistoric Land Bridges (Doggerland, Beringia, Sundaland) */}
            {showLandBridges && (
              <g fill="#1a2e35" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.8">
                {/* Doggerland (North Sea) */}
                <ellipse cx="380" cy="140" rx="20" ry="12" />
                <text x="380" y="132" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">Doggerland</text>

                {/* Beringia Land Bridge (Siberia - Alaska) */}
                <path d="M 780 100 Q 840 90, 890 100 L 900 130 L 780 130 Z" />
                <path d="M 0 100 Q 40 90, 90 100 L 90 130 L 0 130 Z" />
                <text x="840" y="95" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">Beringia Bridge</text>
              </g>
            )}

            {/* Last Glacial Maximum (LGM) Ice Sheets (~20,000 BP) */}
            {showLgmIceSheets && (
              <g fill="#93c5fd" fillOpacity="0.22" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,2">
                {/* Fennoscandian Ice Sheet */}
                <ellipse cx="440" cy="105" rx="55" ry="30" />
                <text x="440" y="100" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Fennoscandian Ice Cap
                </text>

                {/* Laurentide & Cordilleran Ice Sheets (North America) */}
                <ellipse cx="170" cy="115" rx="75" ry="35" />
                <text x="170" y="110" fill="#93c5fd" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Laurentide Ice Sheet
                </text>
              </g>
            )}

            {/* Migration Trajectory Curved Spine */}
            {trajectoryPath && (
              <path
                d={trajectoryPath}
                fill="none"
                stroke="url(#paleoTrajectoryGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#paleoGlow)"
              />
            )}

            {/* Animated Pulses on Migration Spine */}
            {trajectoryPath && (
              <path
                d={trajectoryPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="8,16"
                className="animate-pulse"
                opacity="0.8"
              />
            )}

            {/* Migration Waypoint Markers */}
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
                    r={isSelected || isFinal ? 14 : 9}
                    fill={isFinal ? '#10b981' : '#06b6d4'}
                    fillOpacity={isSelected ? 0.35 : 0.15}
                    stroke={isFinal ? '#34d399' : '#38bdf8'}
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform"
                  />

                  {/* Inner Core Point */}
                  <circle
                    r={isSelected || isFinal ? 5 : 3.5}
                    fill={isFinal ? '#34d399' : '#22d3ee'}
                  />

                  {/* Order Number Badge */}
                  <text
                    y="-12"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none drop-shadow-md"
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
              <p className="text-[11px] text-slate-400 line-clamp-2">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
