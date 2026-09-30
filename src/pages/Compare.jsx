import React from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight, ShieldCheck, Star, Plus } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import { HOUSING_LISTINGS } from '../data/listings';

export default function Compare() {
  const { compareList, toggleCompare, clearCompare, currentCollege } = useSettleIn();

  const properties = HOUSING_LISTINGS.filter(p => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase tracking-wider text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            Side-by-Side Comparison
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Compare Student Housing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare prices, food inclusions, curfews, and distance to {currentCollege?.name}.
          </p>
        </div>

        {properties.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-slate-500 hover:text-rose-600 px-3 py-1.5 font-medium"
            >
              Clear Comparison
            </button>
            <Link
              to="/housing"
              className="text-xs bg-slate-900 text-white font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add more properties</span>
            </Link>
          </div>
        )}
      </div>

      {/* Comparison Table or Empty Prompt */}
      {properties.length >= 2 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="p-4 w-48 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  Feature / Metric
                </th>
                {properties.map(p => (
                  <th key={p.id} className="p-4 min-w-[240px] align-top border-l border-slate-200">
                    <div className="space-y-2">
                      <div className="relative h-32 rounded-lg overflow-hidden bg-slate-100">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleCompare(p.id)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {p.type}
                        </span>
                        {p.verified && (
                          <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
                          </span>
                        )}
                      </div>
                      <Link to={`/property/${p.id}`} className="font-bold text-slate-900 text-sm hover:text-teal-700 block">
                        {p.name}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Monthly Price */}
              <tr>
                <td className="p-4 font-bold text-slate-700 bg-slate-50/30">Monthly Rent</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">₹{p.price.toLocaleString()}</span>
                    <span className="text-slate-400 text-[11px]"> / month</span>
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Security Deposit</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 font-medium text-slate-800">
                    ₹{p.deposit?.toLocaleString() || "1 month rent"}
                  </td>
                ))}
              </tr>

              {/* Distance from College */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Campus Distance</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">
                    <span className="font-bold text-teal-800">{p.distanceKm} km</span>
                    <span className="text-slate-500 block text-[11px]">({p.walkingMins} min walk)</span>
                  </td>
                ))}
              </tr>

              {/* Student Rating */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Student Rating</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">
                    <div className="flex items-center gap-1 text-amber-900 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{p.rating} / 5</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">({p.reviewsCount} reviews)</span>
                  </td>
                ))}
              </tr>

              {/* Sharing Options */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Room Occupancy</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 text-slate-700">
                    {p.sharingTypes?.join(", ")}
                  </td>
                ))}
              </tr>

              {/* Food Inclusion */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Food / Mess Plan</td>
                {properties.map(p => {
                  const foodAmenity = p.amenities.find(a => a.name.toLowerCase().includes("food") || a.icon === "Utensils");
                  const hasFood = foodAmenity ? foodAmenity.included : false;
                  return (
                    <td key={p.id} className="p-4 border-l border-slate-100">
                      {hasFood ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                          <Check className="w-3 h-3 text-emerald-600" /> Included
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          {foodAmenity?.note || "Separate mess optional"}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Wi-Fi & Electricity */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Wi-Fi & Backup</td>
                {properties.map(p => {
                  const wifi = p.amenities.find(a => a.name.toLowerCase().includes("wi-fi"));
                  return (
                    <td key={p.id} className="p-4 border-l border-slate-100 text-slate-700 font-medium">
                      {wifi?.name || "Standard Wi-Fi"}
                    </td>
                  );
                })}
              </tr>

              {/* Curfew Policy */}
              <tr>
                <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">Curfew & Gate Timings</td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100 text-slate-700">
                    {p.curfew || "10:30 PM"}
                  </td>
                ))}
              </tr>

              {/* Actions Row */}
              <tr>
                <td className="p-4 bg-slate-50/30"></td>
                {properties.map(p => (
                  <td key={p.id} className="p-4 border-l border-slate-100">
                    <Link
                      to={`/property/${p.id}`}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        /* Needs more items to compare */
        <div className="bg-white p-12 sm:p-16 rounded-2xl border border-slate-200 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            ⚖
          </div>
          <h3 className="font-bold text-slate-900 text-lg">Select at least 2 properties to compare</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            You currently have {properties.length} {properties.length === 1 ? 'property' : 'properties'} selected. Browse housing around {currentCollege?.name} and click "+ Compare" on any listing card.
          </p>
          <div className="pt-2">
            <Link
              to="/housing"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <span>Browse Housing Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
