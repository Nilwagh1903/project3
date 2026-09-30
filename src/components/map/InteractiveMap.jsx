import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Plus, Minus, RotateCcw, Home, Utensils, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function InteractiveMap({
  housingItems = [],
  foodItems = [],
  _transportItems = [],
  selectedItemId = null,
  onSelectItem = null,
  className = ""
}) {
  const { currentCollege } = useSettleIn();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all"); // all, housing, food, transport
  const [activePreview, setActivePreview] = useState(null);

  // Normalize coordinates around current college center
  // Default college center is roughly (50, 50)
  const collegeX = currentCollege?.mapCenter?.x || 50;
  const collegeY = currentCollege?.mapCenter?.y || 50;

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 0.8), 1.6));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setActivePreview(null);
  };

  const handlePinClick = (item, type) => {
    setActivePreview({ ...item, itemType: type });
    if (onSelectItem) {
      onSelectItem(item.id);
    }
  };

  return (
    <div className={`relative bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-inner flex flex-col ${className}`}>
      
      {/* Top Map Controls Header */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Layer Filters */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-slate-200/90 shadow-sm text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === "all" ? 'bg-slate-800 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("housing")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === "housing" ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Home className="w-3 h-3" />
            <span>Stay ({housingItems.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter("food")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
              activeFilter === "food" ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>Eat ({foodItems.length})</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="pointer-events-auto flex flex-col gap-1 bg-white/90 backdrop-blur-md p-1 rounded-lg border border-slate-200/90 shadow-sm">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
            title="Zoom In"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-slate-100 rounded text-slate-700 transition-colors border-t border-slate-100"
            title="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Vector Map Canvas */}
      <div className="w-full h-full min-h-[420px] flex-1 overflow-hidden relative select-none">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Background Land Parcels */}
          <rect width="100" height="100" fill="#f8fafc" />

          {/* Urban blocks & greenery */}
          <rect x="5" y="10" width="30" height="25" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.3" />
          <rect x="65" y="8" width="28" height="30" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.3" />
          <rect x="8" y="60" width="32" height="32" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.3" />
          <rect x="62" y="65" width="30" height="28" rx="2" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.3" />

          {/* Botanical / Lake Park Garden */}
          <path
            d="M 12 70 Q 25 65 32 75 Q 35 88 20 85 Z"
            fill="#e2f5ea"
            stroke="#bbf7d0"
            strokeWidth="0.4"
          />
          <text x="18" y="77" fontSize="2" fill="#15803d" fontWeight="500">Lake Town Park</text>

          {/* Road Network */}
          {/* Main Arterial Road (Satara Rd / FC Rd / Paud Rd style) */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#ffffff" strokeWidth="2.2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="0.3" strokeDasharray="1 1" />
          
          {/* North-South Connector Road */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="2.8" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#ffffff" strokeWidth="2" />
          
          {/* Diagonal College Access Lane */}
          <line x1="20" y1="15" x2="80" y2="85" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="20" y1="85" x2="80" y2="15" stroke="#e2e8f0" strokeWidth="1.8" />

          {/* Street Name Labels */}
          <text x="4" y="48.5" fontSize="1.8" fill="#64748b" fontWeight="600">MAIN CAMPUS ARTERY</text>
          <text x="52" y="12" fontSize="1.6" fill="#64748b" fontWeight="500">STATION LINK ROAD</text>
          <text x="75" y="82" fontSize="1.6" fill="#64748b" fontWeight="500">DEPOT CORRIDOR</text>

          {/* College Campus Boundary Polygon */}
          <polygon
            points={`${collegeX - 12},${collegeY - 10} ${collegeX + 14},${collegeY - 8} ${collegeX + 11},${collegeY + 11} ${collegeX - 13},${collegeY + 9}`}
            fill="#ecfdf5"
            stroke="#10b981"
            strokeWidth="0.8"
            strokeDasharray="1.5 0.8"
          />

          {/* College Main Quadrangle */}
          <rect
            x={collegeX - 7}
            y={collegeY - 5}
            width="14"
            height="10"
            rx="1"
            fill="#0f766e"
            stroke="#115e59"
            strokeWidth="0.4"
          />
          <text
            x={collegeX}
            y={collegeY - 0.5}
            fontSize="2.4"
            fill="#ffffff"
            textAnchor="middle"
            fontWeight="bold"
          >
            {currentCollege?.name || "CAMPUS"}
          </text>
          <text
            x={collegeX}
            y={collegeY + 2.5}
            fontSize="1.6"
            fill="#99f6e4"
            textAnchor="middle"
          >
            Main Academic Block
          </text>

          {/* Gate Marker */}
          <circle cx={collegeX - 9} cy={collegeY + 8} r="1.5" fill="#047857" />
          <text x={collegeX - 9} y={collegeY + 11.5} fontSize="1.7" fill="#065f46" fontWeight="bold" textAnchor="middle">
            Gate 1
          </text>

          {/* Bus Stand Stop */}
          <circle cx={collegeX + 18} cy={collegeY + 12} r="1.6" fill="#2563eb" />
          <text x={collegeX + 18} y={collegeY + 15.5} fontSize="1.6" fill="#1e40af" fontWeight="600" textAnchor="middle">
            Bus Terminal
          </text>

          {/* Housing Pins */}
          {(activeFilter === "all" || activeFilter === "housing") && housingItems.map((item) => {
            const x = item.mapCoords?.x || (collegeX + (Math.sin(item.distanceKm * 4) * 22));
            const y = item.mapCoords?.y || (collegeY + (Math.cos(item.distanceKm * 4) * 20));
            const isSelected = selectedItemId === item.id || activePreview?.id === item.id;

            return (
              <g
                key={item.id}
                className="cursor-pointer transition-transform duration-150 hover:scale-125"
                onClick={() => handlePinClick(item, "housing")}
              >
                {/* Pin Shadow */}
                <ellipse cx={x} cy={y + 0.8} rx="2" ry="0.8" fill="rgba(15, 23, 42, 0.2)" />
                {/* Pin Bubble */}
                <circle
                  cx={x}
                  cy={y - 2.5}
                  r={isSelected ? "3.2" : "2.5"}
                  fill={isSelected ? "#0f766e" : "#0d9488"}
                  stroke="#ffffff"
                  strokeWidth="0.6"
                />
                <text
                  x={x}
                  y={y - 1.5}
                  fontSize="1.6"
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  ₹{(item.price / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}

          {/* Food Pins */}
          {(activeFilter === "all" || activeFilter === "food") && foodItems.map((item, idx) => {
            const angle = (idx / foodItems.length) * 2 * Math.PI;
            const dist = 12 + (item.distanceKm * 10);
            const x = collegeX + Math.cos(angle) * dist;
            const y = collegeY + Math.sin(angle) * dist;
            const isSelected = activePreview?.id === item.id;

            return (
              <g
                key={item.id}
                className="cursor-pointer transition-transform duration-150 hover:scale-125"
                onClick={() => handlePinClick(item, "food")}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? "2.6" : "2"}
                  fill="#d97706"
                  stroke="#ffffff"
                  strokeWidth="0.5"
                />
                <text
                  x={x}
                  y={y + 0.6}
                  fontSize="1.5"
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  🍱
                </text>
              </g>
            );
          })}

        </svg>
      </div>

      {/* Selected Pin Mini Drawer / Popover */}
      {activePreview && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200/90 p-3.5 z-30 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  activePreview.itemType === 'food' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                }`}>
                  {activePreview.type || activePreview.category || "Listing"}
                </span>
                {activePreview.verified && (
                  <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                  </span>
                )}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-0.5 leading-snug line-clamp-1">
                {activePreview.name}
              </h4>
            </div>
            <button
              onClick={() => setActivePreview(null)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 mb-3 bg-slate-50 p-2 rounded-lg">
            <div>
              <span className="text-[11px] text-slate-400 block">Monthly Price</span>
              <span className="font-bold text-slate-900 text-sm">
                ₹{activePreview.price?.toLocaleString() || activePreview.monthlyPrice?.toLocaleString()}/mo
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Distance</span>
              <span className="font-semibold text-slate-700">
                {activePreview.distanceKm} km from campus
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={activePreview.itemType === 'food' ? `/food` : `/property/${activePreview.id}`}
              className="flex-1 text-center py-2 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Map Footer Note */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Navigation className="w-3 h-3 text-teal-600" />
          <span>Interactive Campus Vector Map • Center: {currentCollege?.locality}</span>
        </span>
        <span className="hidden sm:inline text-slate-400">Click pins to preview</span>
      </div>

    </div>
  );
}
