import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home as HomeIcon, Utensils, Bus, ArrowRight, Sparkles } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import HousingCard from '../components/housing/HousingCard';
import FoodCard from '../components/food/FoodCard';
import RouteCard from '../components/transport/RouteCard';

export default function Home() {
  const { colleges, currentCollege, changeCollege, getFilteredHousing, getFilteredFood, getFilteredTransport } = useSettleIn();
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState("housing"); // housing, food, transport
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Check if matching a college name
    const match = colleges.find(c =>
      c.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
      c.locality.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (match) {
      changeCollege(match.id);
    }
    navigate(`/explore?search=${encodeURIComponent(searchInput)}`);
  };

  const handleCollegePill = (collegeId) => {
    changeCollege(collegeId);
    navigate(`/explore`);
  };

  // Featured listings for current college
  const featuredHousing = getFilteredHousing().slice(0, 3);
  const featuredFood = getFilteredFood().slice(0, 3);
  const featuredTransport = getFilteredTransport().slice(0, 2);

  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. Hero Search Section */}
      <section className="pt-8 sm:pt-14 pb-8 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-4 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>CuriousParc 2026 Innovation MVP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Find your place.<br />
          <span className="text-teal-700">Feel at home from day one.</span>
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Discover verified PGs, student hostels, daily messes, and transit routes around your college — based on real information from current students.
        </p>

        {/* College Search Box */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-2xl shadow-card border border-slate-300/80 p-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200 transition-all">
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search your college or locality (e.g. VIT Pune, Fergusson, Kothrud)"
              className="w-full bg-transparent py-2.5 text-sm outline-none text-slate-800 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shrink-0"
            >
              Explore Campus
            </button>
          </div>
        </form>

        {/* Popular Searches Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Popular campuses:</span>
          {colleges.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCollegePill(c.id)}
              className={`px-3 py-1 rounded-full border transition-all ${
                c.id === currentCollege?.id
                  ? 'bg-teal-50 border-teal-300 text-teal-800 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Quick Discovery: "Around your campus" counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Campus Zone</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>Around {currentCollege?.name}</span>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {currentCollege?.locality}, Pune
                </span>
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              <span>Open Interactive Campus Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Housing Stat */}
            <div
              onClick={() => { setActiveTab("housing"); }}
              className="cursor-pointer p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-teal-50/50 hover:border-teal-200 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl">
                🏠
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">{currentCollege?.stats?.housingCount || 38} places</div>
                <div className="text-xs text-slate-500 font-medium">PGs, Hostels & Rooms</div>
              </div>
            </div>

            {/* Food Stat */}
            <div
              onClick={() => { setActiveTab("food"); }}
              className="cursor-pointer p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-amber-50/50 hover:border-amber-200 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                🍱
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">{currentCollege?.stats?.messCount || 16} messes</div>
                <div className="text-xs text-slate-500 font-medium">Daily Dabbas & Canteens</div>
              </div>
            </div>

            {/* Transport Stat */}
            <div
              onClick={() => { setActiveTab("transport"); }}
              className="cursor-pointer p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-200 transition-all flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                🚌
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">{currentCollege?.stats?.transportRoutes || 9} routes</div>
                <div className="text-xs text-slate-500 font-medium">Buses, Metro & Auto stands</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Switcher Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular around campus</h2>
            <p className="text-xs text-slate-500 mt-0.5">Top-rated student essentials within 2 km of {currentCollege?.name}</p>
          </div>

          {/* Switcher Pills */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto text-xs">
            <button
              onClick={() => setActiveTab("housing")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "housing"
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>Stay</span>
            </button>
            <button
              onClick={() => setActiveTab("food")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "food"
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>Eat</span>
            </button>
            <button
              onClick={() => setActiveTab("transport")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === "transport"
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bus className="w-3.5 h-3.5 text-blue-600" />
              <span>Move</span>
            </button>
          </div>
        </div>

        {/* Dynamic Content based on active tab */}
        {activeTab === "housing" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHousing.map((p) => (
                <HousingCard key={p.id} property={p} />
              ))}
            </div>
            <div className="text-center pt-2">
              <Link
                to="/housing"
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 px-4 py-2 rounded-lg border border-teal-200"
              >
                <span>View all housing options ({currentCollege?.name})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === "food" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFood.map((f) => (
                <FoodCard key={f.id} food={f} />
              ))}
            </div>
            <div className="text-center pt-2">
              <Link
                to="/food"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200"
              >
                <span>View all messes & tiffin plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === "transport" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {featuredTransport.map((r) => (
                <RouteCard key={r.id} route={r} />
              ))}
            </div>
            <div className="text-center pt-2">
              <Link
                to="/transport"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-800 hover:text-blue-900 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200"
              >
                <span>Search campus transit finder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 4. Trust Features (Human, Developer-built concept) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">Why SettleIn Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              No brokers. Real student photos. Transparent pricing.
            </h2>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              When arriving in a new city for engineering or degree college, students are exploited by arbitrary deposits, middle-men commissions, and outdated photos. SettleIn is built around direct accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-slate-800">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h4 className="font-semibold text-white text-sm">Verified Student Reviews</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Only enrolled students at the specific college can review room conditions, curfew enforcement, and mess hygiene.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                ₹
              </div>
              <h4 className="font-semibold text-white text-sm">Transparent Deposits</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Exact security deposits, lock-in periods, and electricity billing slabs clearly listed before you visit.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                ☎
              </div>
              <h4 className="font-semibold text-white text-sm">Direct Owner Contact</h4>
              <p className="text-xs text-slate-400 leading-normal">
                One-tap phone calls and WhatsApp inquiries directly to the property warden or landlord. Zero middleman fees.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                📍
              </div>
              <h4 className="font-semibold text-white text-sm">True Walking Distances</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Door-to-gate walking times verified on foot by student campus representatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Step by Step</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">How SettleIn works</h2>
          <p className="text-xs text-slate-500 mt-1">Everything sorted before your first lecture begins.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs relative">
            <span className="text-2xl font-extrabold text-teal-600 block mb-2">01</span>
            <h4 className="font-bold text-slate-900 text-sm">Search Your College</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Select your college campus in Pune to instantly filter nearby student living clusters.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs relative">
            <span className="text-2xl font-extrabold text-teal-600 block mb-2">02</span>
            <h4 className="font-bold text-slate-900 text-sm">Explore Map & Directory</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Toggle between vector campus map and listing cards to see proximity to academic gates.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs relative">
            <span className="text-2xl font-extrabold text-teal-600 block mb-2">03</span>
            <h4 className="font-bold text-slate-900 text-sm">Filter & Compare</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Put 2-3 PGs side-by-side to compare food inclusion, Wi-Fi speed, curfews, and total costs.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs relative">
            <span className="text-2xl font-extrabold text-teal-600 block mb-2">04</span>
            <h4 className="font-bold text-slate-900 text-sm">Contact Owner Directly</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Message via WhatsApp or phone call without having to pay any brokerage or registration fee.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
