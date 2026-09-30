import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Map as MapIcon, List, Search, RotateCcw, ShieldCheck } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import HousingCard from '../components/housing/HousingCard';
import FoodCard from '../components/food/FoodCard';
import RouteCard from '../components/transport/RouteCard';
import InteractiveMap from '../components/map/InteractiveMap';

export default function Explore() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || "";

  const {
    currentCollege,
    getFilteredHousing,
    getFilteredFood,
    getFilteredTransport
  } = useSettleIn();

  // Filters State
  const [activeTab, setActiveTab] = useState("all"); // all, housing, food, transport
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [housingType, setHousingType] = useState("all"); // all, PG, Hostel
  const [genderFilter, setGenderFilter] = useState("all"); // all, Girls, Boys, Co-ed
  const [budgetFilter, setBudgetFilter] = useState("all"); // all, 0-5000, 5000-8000, 8000-12000, 12000+
  const [distanceFilter, setDistanceFilter] = useState("all"); // all, 1, 3, 5
  const [ratingFilter, setRatingFilter] = useState("all"); // all, 4, 4.5
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [foodTypeFilter, setFoodTypeFilter] = useState("all"); // all, Pure Veg, Veg & Non-Veg
  const [sortBy, setSortBy] = useState("recommended"); // recommended, priceAsc, distanceAsc, ratingDesc

  // Map Synchronization State
  const [selectedPinId, setSelectedPinId] = useState(null);
  const [mobileView, setMobileView] = useState("split"); // 'list' or 'map' on mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Reset Filters
  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setHousingType("all");
    setGenderFilter("all");
    setBudgetFilter("all");
    setDistanceFilter("all");
    setRatingFilter("all");
    setVerifiedOnly(false);
    setFoodTypeFilter("all");
    setSortBy("recommended");
  };

  // Filtered Datasets
  const housingResults = useMemo(() => {
    let list = getFilteredHousing({
      type: housingType,
      gender: genderFilter,
      budget: budgetFilter,
      distance: distanceFilter,
      rating: ratingFilter,
      verifiedOnly,
      searchQuery
    });

    if (sortBy === "priceAsc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "distanceAsc") list.sort((a, b) => a.distanceKm - b.distanceKm);
    if (sortBy === "ratingDesc") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [getFilteredHousing, housingType, genderFilter, budgetFilter, distanceFilter, ratingFilter, verifiedOnly, searchQuery, sortBy]);

  const foodResults = useMemo(() => {
    return getFilteredFood({
      foodType: foodTypeFilter,
      minRating: ratingFilter !== "all" ? parseFloat(ratingFilter) : null,
      searchQuery
    });
  }, [getFilteredFood, foodTypeFilter, ratingFilter, searchQuery]);

  const transportResults = useMemo(() => {
    return getFilteredTransport({ searchQuery });
  }, [getFilteredTransport, searchQuery]);

  const totalResults =
    (activeTab === "all" ? housingResults.length + foodResults.length + transportResults.length :
     activeTab === "housing" ? housingResults.length :
     activeTab === "food" ? foodResults.length : transportResults.length);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Bar: Campus Header & Search & Mobile Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Campus Navigator
            </span>
            <span className="text-xs text-slate-500">• {currentCollege?.locality}, Pune</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Explore places around {currentCollege?.name}
          </h1>
        </div>

        {/* Global Keyword Search */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PG, mess, street or bus stop..."
              className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Mobile Filter & Map View Toggle Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-700 flex items-center gap-1.5"
            >
              <Filter className="w-4 h-4 text-slate-600" />
              <span>Filters</span>
            </button>
            <button
              onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
              className="p-2 bg-teal-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5"
            >
              {mobileView === "list" ? <MapIcon className="w-4 h-4" /> : <List className="w-4 h-4" />}
              <span>{mobileView === "list" ? "Map" : "List"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Layout: Filters | Listings | Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* PANE 1: FILTERS (Col 3 on desktop) */}
        <aside className={`lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-6 ${
          showMobileFilters ? 'block' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Category</label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-colors ${
                  activeTab === "all" ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Options
              </button>
              <button
                onClick={() => setActiveTab("housing")}
                className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-colors ${
                  activeTab === "housing" ? 'bg-teal-700 text-white border-teal-700' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🏠 Housing
              </button>
              <button
                onClick={() => setActiveTab("food")}
                className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-colors ${
                  activeTab === "food" ? 'bg-amber-600 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🍱 Food / Mess
              </button>
              <button
                onClick={() => setActiveTab("transport")}
                className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-colors ${
                  activeTab === "transport" ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🚌 Transport
              </button>
            </div>
          </div>

          {/* Student Verification Switch */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-900">Verified Only</span>
              </div>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
            <p className="text-[10px] text-emerald-700 mt-1">
              Shows only listings verified on-site by student reps.
            </p>
          </div>

          {/* Housing Specific Filters */}
          {(activeTab === "all" || activeTab === "housing") && (
            <>
              {/* Type Filter */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Housing Type</label>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["all", "PG", "Hostel"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setHousingType(t)}
                      className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                        housingType === t
                          ? 'bg-teal-50 border-teal-300 text-teal-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t === "all" ? "All Types" : t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Preference */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Gender / Wing</label>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["all", "Girls", "Boys"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGenderFilter(g)}
                      className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                        genderFilter === g
                          ? 'bg-teal-50 border-teal-300 text-teal-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {g === "all" ? "Any" : `${g} PG`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Monthly Budget</label>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {[
                    { label: "Any Budget", val: "all" },
                    { label: "₹0 – ₹5,000 / month", val: "0-5000" },
                    { label: "₹5,000 – ₹8,000 / month", val: "5000-8000" },
                    { label: "₹8,000 – ₹12,000 / month", val: "8000-12000" },
                    { label: "₹12,000+ / month", val: "12000+" }
                  ].map((b) => (
                    <label key={b.val} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                      <input
                        type="radio"
                        name="budget"
                        checked={budgetFilter === b.val}
                        onChange={() => setBudgetFilter(b.val)}
                        className="accent-teal-600"
                      />
                      <span>{b.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance from Campus */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Distance from Campus</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { label: "All", val: "all" },
                    { label: "≤ 1 km", val: "1" },
                    { label: "≤ 3 km", val: "3" }
                  ].map((d) => (
                    <button
                      key={d.val}
                      onClick={() => setDistanceFilter(d.val)}
                      className={`py-1 rounded-lg border font-medium transition-colors ${
                        distanceFilter === d.val
                          ? 'bg-teal-50 border-teal-300 text-teal-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Food Specific Filters */}
          {(activeTab === "all" || activeTab === "food") && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Dietary Preference</label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["all", "Pure Veg", "Veg & Non-Veg"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFoodTypeFilter(f)}
                    className={`px-3 py-1 rounded-lg border font-medium transition-colors ${
                      foodTypeFilter === f
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {f === "all" ? "All Food" : f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Minimum Rating */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">Student Rating</label>
            <div className="flex items-center gap-1.5 text-xs">
              {[
                { label: "Any", val: "all" },
                { label: "4.0+ ★", val: "4" },
                { label: "4.5+ ★", val: "4.5" }
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => setRatingFilter(r.val)}
                  className={`flex-1 py-1 rounded-lg border font-medium transition-colors ${
                    ratingFilter === r.val
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PANE 2: LISTINGS (Col 5 on desktop) */}
        <section className={`lg:col-span-5 space-y-4 ${
          mobileView === "map" ? 'hidden lg:block' : 'block'
        }`}>
          {/* Subheader: Results count & Sort */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <span className="font-semibold text-slate-800">
              Showing {totalResults} {totalResults === 1 ? 'place' : 'places'} around {currentCollege?.name}
            </span>

            <div className="flex items-center gap-1.5">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-700 outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="distanceAsc">Distance: Nearest</option>
                <option value="ratingDesc">Top Student Rated</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {totalResults === 0 && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <h3 className="font-bold text-slate-900 text-base">No places found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Adjust your budget, distance, or category filters to see more student options around {currentCollege?.name}.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Housing Cards */}
          {(activeTab === "all" || activeTab === "housing") && housingResults.map((p) => (
            <HousingCard
              key={p.id}
              property={p}
              onHover={(id) => setSelectedPinId(id)}
            />
          ))}

          {/* Food Cards */}
          {(activeTab === "all" || activeTab === "food") && foodResults.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}

          {/* Transport Routes */}
          {(activeTab === "all" || activeTab === "transport") && transportResults.map((t) => (
            <RouteCard key={t.id} route={t} />
          ))}

        </section>

        {/* PANE 3: INTERACTIVE MAP (Col 4 on desktop, sticky) */}
        <section className={`lg:col-span-4 sticky top-20 ${
          mobileView === "list" ? 'hidden lg:block' : 'block'
        }`}>
          <div className="space-y-2">
            <InteractiveMap
              housingItems={housingResults}
              foodItems={foodResults}
              selectedItemId={selectedPinId}
              onSelectItem={(id) => setSelectedPinId(id)}
              className="h-[600px]"
            />
          </div>
        </section>

      </div>

    </div>
  );
}
