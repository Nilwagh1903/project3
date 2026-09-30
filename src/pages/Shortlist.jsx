import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowUpRight, Compass } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import { HOUSING_LISTINGS } from '../data/listings';
import { FOOD_LISTINGS } from '../data/foodListings';
import { TRANSPORT_ROUTES } from '../data/transportRoutes';

export default function Shortlist() {
  const { shortlist, removeFromShortlist } = useSettleIn();
  const [activeTab, setActiveTab] = useState("all"); // all, housing, food, transport

  // Resolve items
  const savedItems = shortlist.map(item => {
    if (item.type === "housing") {
      const match = HOUSING_LISTINGS.find(h => h.id === item.id);
      return match ? { ...match, itemType: "housing", addedAt: item.addedAt } : null;
    }
    if (item.type === "food") {
      const match = FOOD_LISTINGS.find(f => f.id === item.id);
      return match ? { ...match, itemType: "food", addedAt: item.addedAt } : null;
    }
    if (item.type === "transport") {
      const match = TRANSPORT_ROUTES.find(t => t.id === item.id);
      return match ? { ...match, itemType: "transport", addedAt: item.addedAt } : null;
    }
    return null;
  }).filter(Boolean);

  const filteredItems = savedItems.filter(item => {
    if (activeTab === "all") return true;
    return item.itemType === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Saved Places
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Your Shortlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Keep track of places to visit before college starts. Saved in your local browser.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          {[
            { id: "all", label: `All (${savedItems.length})` },
            { id: "housing", label: `Housing (${savedItems.filter(i => i.itemType === 'housing').length})` },
            { id: "food", label: `Food (${savedItems.filter(i => i.itemType === 'food').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shortlist Content */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between group">
              <div>
                <div className="relative h-44 bg-slate-100">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white">
                      {item.type || item.category || "Place"}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromShortlist(item.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-rose-600 hover:bg-rose-50 transition-colors shadow-xs"
                    title="Remove from shortlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.address}</p>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      ₹{(item.price || item.monthlyPrice)?.toLocaleString()} / month
                    </span>
                    <span className="text-slate-500 font-medium">
                      {item.distanceKm} km away
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => removeFromShortlist(item.id)}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors"
                >
                  Remove
                </button>

                <Link
                  to={item.itemType === 'food' ? '/food' : `/property/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200 transition-colors"
                >
                  <span>Open Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 sm:p-16 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            <Bookmark className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">No saved places yet</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            As you browse PGs, student hostels, and messes around your college, tap the heart button to bookmark them here.
          </p>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Start exploring campus places</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
