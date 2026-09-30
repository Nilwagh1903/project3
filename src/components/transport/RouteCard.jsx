import React, { useState } from 'react';
import { Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export default function RouteCard({ route }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all p-5 space-y-4">
      
      {/* Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <span className="font-semibold text-slate-800 text-sm">{route.from}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-slate-900 text-base">{route.to}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>{route.distanceKm} km transit</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Approx. {route.estimatedTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-medium">
            {route.options.length} travel modes
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-teal-700 font-semibold hover:underline"
          >
            {expanded ? "Hide Stops" : "Show Route Stops"}
          </button>
        </div>
      </div>

      {/* Travel Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {route.options.map((opt, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-xs text-slate-900">{opt.mode}</span>
                <span className="font-bold text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {opt.fare}
                </span>
              </div>

              {opt.routeNumber && (
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  {opt.routeNumber}
                </p>
              )}

              {opt.boardingPoint && (
                <p className="text-[11px] text-slate-500 mt-1">
                  Board at: <span className="text-slate-700 font-medium">{opt.boardingPoint}</span>
                </p>
              )}

              {opt.frequency && (
                <p className="text-[11px] text-slate-500">
                  Frequency: {opt.frequency}
                </p>
              )}
            </div>

            {opt.studentTip && (
              <div className="mt-2.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600 italic">
                💡 {opt.studentTip}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expanded Stops Timeline */}
      {expanded && (
        <div className="p-3.5 bg-teal-50/50 rounded-lg border border-teal-100 text-xs animate-in fade-in">
          <h4 className="font-semibold text-teal-900 mb-2">Transit Stops Breakdown</h4>
          <div className="flex flex-wrap items-center gap-1.5 text-slate-700 font-medium">
            {route.stops.map((stop, idx) => (
              <React.Fragment key={idx}>
                <span className="bg-white border border-slate-200 px-2 py-1 rounded shadow-xs">
                  {stop}
                </span>
                {idx < route.stops.length - 1 && (
                  <span className="text-teal-600 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice */}
      {route.safetyNote && (
        <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p><span className="font-semibold text-slate-800">Student Safety Note:</span> {route.safetyNote}</p>
        </div>
      )}

    </div>
  );
}
