import React, { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import FoodCard from '../components/food/FoodCard';

export default function Food() {
  const { currentCollege, getFilteredFood } = useSettleIn();

  const [categoryFilter, setCategoryFilter] = useState("all"); // all, Mess, Tiffin, Canteen
  const [dietFilter, setDietFilter] = useState("all"); // all, Pure Veg, Veg & Non-Veg
  const [maxPrice, setMaxPrice] = useState(4000);
  const [minRating, setMinRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const foodListings = useMemo(() => {
    return getFilteredFood({
      category: categoryFilter,
      foodType: dietFilter,
      maxPrice,
      minRating: minRating !== "all" ? parseFloat(minRating) : null,
      searchQuery
    });
  }, [getFilteredFood, categoryFilter, dietFilter, maxPrice, minRating, searchQuery]);

  const handleReset = () => {
    setCategoryFilter("all");
    setDietFilter("all");
    setMaxPrice(4000);
    setMinRating("all");
    setSearchQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Student Mess & Tiffin Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Student Messes & Food Hubs near {currentCollege?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Unlimited thalis, PG doorstep dabba deliveries, and student-verified hygiene ratings.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mess name or dish..."
            className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-slate-300 focus:border-amber-500 outline-none"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {["all", "Mess", "Tiffin", "Canteen"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  categoryFilter === cat ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === "all" ? "All Formats" : cat}
              </button>
            ))}
          </div>

          {/* Diet Preference */}
          <div className="flex items-center gap-1.5">
            {["all", "Pure Veg", "Veg & Non-Veg"].map((d) => (
              <button
                key={d}
                onClick={() => setDietFilter(d)}
                className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  dietFilter === d ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {d === "all" ? "Any Diet" : d}
              </button>
            ))}
          </div>

          {/* Max Price Slider */}
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500">Max / mo:</span>
            <span className="font-bold text-slate-900">₹{maxPrice.toLocaleString()}</span>
            <input
              type="range"
              min="2000"
              max="4000"
              step="200"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-amber-600 cursor-pointer"
            />
          </div>

        </div>

        <button
          onClick={handleReset}
          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium ml-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Trust Banner for Student Messes */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🍱</span>
          <div>
            <span className="font-bold">Student Advice on Messes:</span> Most messes in {currentCollege?.locality} offer a 1-day free or ₹60 trial thali before committing to a monthly coupon book. Always request low-spice options if adapting to Pune food.
          </div>
        </div>
      </div>

      {/* Results Feed */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Showing <b>{foodListings.length}</b> messes and tiffins around {currentCollege?.name}</span>
      </div>

      {foodListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodListings.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
          <div className="text-3xl">🍱</div>
          <h3 className="font-bold text-slate-900 text-base">No food options found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your budget limit or diet filter.
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
