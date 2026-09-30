import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Sparkles } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import RouteCard from '../components/transport/RouteCard';
import { AUTO_FARE_GUIDE, STUDENT_TRANSIT_TIPS } from '../data/transportRoutes';

export default function Transport() {
  const { currentCollege, getFilteredTransport } = useSettleIn();
  const [destinationQuery, setDestinationQuery] = useState("");

  const popularDestinations = [
    "Pune Railway Station",
    "Swargate Bus Stand & Metro",
    "Katraj Snake Park / Bus Depot",
    "Shivajinagar Railway & Bus Stand",
    "Deccan Gymkhana & FC Road"
  ];

  const routes = useMemo(() => {
    return getFilteredTransport({ searchQuery: destinationQuery });
  }, [getFilteredTransport, destinationQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs uppercase tracking-wider text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Campus Transit Finder
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
          Getting around {currentCollege?.name}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Bus routes, shared auto rates, metro connections, and student transit safety guides.
        </p>
      </div>

      {/* "Where are you going?" Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        <label className="block text-sm font-bold text-slate-800">
          Where do you need to go from campus?
        </label>
        
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            placeholder="Type a station, mall or area (e.g. Railway Station, Swargate, Phoenix Mall)..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition-all"
          />
          {destinationQuery && (
            <button
              onClick={() => setDestinationQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Destination Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 font-medium">Common student routes:</span>
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setDestinationQuery(dest)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1 rounded-full transition-colors"
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Routes Feed on Left, Transit Cheat Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Routes (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Found <b>{routes.length}</b> verified routes from {currentCollege?.name}</span>
          </div>

          {routes.length > 0 ? (
            <div className="space-y-4">
              {routes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="text-3xl">🚌</div>
              <h3 className="font-bold text-slate-900 text-base">Route not found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No direct preset route saved for "{destinationQuery}". Try searching for major hubs like Swargate or Railway Station.
              </p>
              <button
                onClick={() => setDestinationQuery("")}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Show all routes
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Local Pune Auto & Bus Fare Cheat Sheet */}
        <div className="space-y-6">
          
          {/* Fare Guide Table */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>Pune Auto Rickshaw Fare Chart</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Official RTO Pune tariff benchmarks for students.
            </p>
            <div className="space-y-2 border-t border-slate-100 pt-3">
              {AUTO_FARE_GUIDE.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                  <span className="text-slate-600">{item.item}</span>
                  <span className="font-bold text-slate-900 shrink-0">{item.fare}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Concession & Transit Tips */}
          <div className="bg-slate-900 text-white p-5 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-sm">First-Week Transit Hacks</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              {STUDENT_TRANSIT_TIPS.map((tip, idx) => (
                <div key={idx} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-teal-300">{tip.title}</h4>
                    <span className="text-[10px] bg-teal-950 text-teal-200 px-1.5 py-0.5 rounded border border-teal-800">
                      {tip.badge}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency / Safety helpline */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Campus Transit Safety</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-normal">
              Pune Police student helpline: <b>1091 / 112</b>. Always check shared autos have authorized commercial yellow plates.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
