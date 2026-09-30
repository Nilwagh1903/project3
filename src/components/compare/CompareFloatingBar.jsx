import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Layers } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';
import { HOUSING_LISTINGS } from '../../data/listings';

export default function CompareFloatingBar() {
  const { compareList, toggleCompare, clearCompare } = useSettleIn();
  const location = useLocation();

  // Don't show tray on the compare page itself
  if (location.pathname === '/compare' || compareList.length === 0) {
    return null;
  }

  const selectedProperties = HOUSING_LISTINGS.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed bottom-14 md:bottom-6 left-4 right-4 max-w-2xl mx-auto z-40 animate-in slide-in-from-bottom-4 duration-200">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-4">
        
        {/* Left: Selected previews */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-teal-400">
            <Layers className="w-4 h-4" />
            <span>Comparing ({compareList.length}/3)</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-0.5">
            {selectedProperties.map(p => (
              <div key={p.id} className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg shrink-0">
                <img src={p.images[0]} alt={p.name} className="w-6 h-6 rounded object-cover" />
                <span className="text-xs font-medium max-w-[100px] truncate text-slate-200">{p.name}</span>
                <button
                  onClick={() => toggleCompare(p.id)}
                  className="text-slate-400 hover:text-white ml-0.5"
                  title="Remove from comparison"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>

          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
