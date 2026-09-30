import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, RotateCcw, LayoutGrid, List } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import HousingCard from '../components/housing/HousingCard';

export default function Housing() {
  const { currentCollege, getFilteredHousing } = useSettleIn();

  const [typeFilter, setTypeFilter] = useState("all"); // all, PG, Hostel
  const [genderFilter, setGenderFilter] = useState("all"); // all, Girls, Boys
  const [budgetFilter, setBudgetFilter] = useState("all"); // all, 0-5000, 5000-8000, 8000-12000, 12000+
  const [distanceFilter, setDistanceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const listings = useMemo(() => {
    return getFilteredHousing({
      type: typeFilter,
      gender: genderFilter,
      budget: budgetFilter,
      distance: distanceFilter,
      rating: ratingFilter,
      verifiedOnly,
      searchQuery
    });
  }, [getFilteredHousing, typeFilter, genderFilter, budgetFilter, distanceFilter, ratingFilter, verifiedOnly, searchQuery]);

  const handleReset = () => {
    setTypeFilter("all");
    setGenderFilter("all");
    setBudgetFilter("all");
    setDistanceFilter("all");
    setRatingFilter("all");
    setVerifiedOnly(false);
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            Student Housing Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            PGs & Hostels near {currentCollege?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified living spaces with no broker commission. Direct landlord & warden contacts.
          </p>
        </div>

        {/* View Switcher & Search */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by PG name or area..."
              className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-slate-300 focus:border-teal-500 outline-none"
            />
          </div>

          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Filter Chips Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Housing Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium outline-none"
          >
            <option value="all">All Types (PG & Hostel)</option>
            <option value="PG">PGs only</option>
            <option value="Hostel">Hostels only</option>
          </select>

          {/* Gender */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium outline-none"
          >
            <option value="all">Any Gender</option>
            <option value="Girls">Girls PG / Hostels</option>
            <option value="Boys">Boys PG / Hostels</option>
          </select>

          {/* Budget */}
          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium outline-none"
          >
            <option value="all">All Budgets</option>
            <option value="0-5000">Under ₹5,000 / mo</option>
            <option value="5000-8000">₹5,000 – ₹8,000 / mo</option>
            <option value="8000-12000">₹8,000 – ₹12,000 / mo</option>
            <option value="12000+">₹12,000+ / mo</option>
          </select>

          {/* Distance */}
          <select
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium outline-none"
          >
            <option value="all">Any Distance</option>
            <option value="1">Within 1 km (Walking)</option>
            <option value="3">Within 3 km</option>
          </select>

          {/* Verified Toggle */}
          <label className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2.5 py-1.5 rounded-lg border border-emerald-200 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified only</span>
          </label>
        </div>

        <button
          onClick={handleReset}
          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium ml-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <b>{listings.length}</b> housing places around {currentCollege?.name}</span>
      </div>

      {/* Grid or List Layout */}
      {listings.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {listings.map((p) => (
            <HousingCard key={p.id} property={p} isCompact={viewMode === "list"} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
          <div className="text-3xl">🏠</div>
          <h3 className="font-bold text-slate-900 text-base">No housing matches found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try loosening the budget filter or extending the walking radius from {currentCollege?.name}.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
