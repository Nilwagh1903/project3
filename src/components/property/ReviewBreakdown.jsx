import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export default function ReviewBreakdown({ rating = 4.5, totalReviews = 128, categories = null }) {
  // Realistic score breakdown for college living
  const cats = categories || {
    cleanliness: 4.6,
    food: 4.2,
    safety: 4.8,
    location: 4.9,
    value: 4.4
  };

  const starBars = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 21 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 0 }
  ];

  return (
    <div className="bg-slate-50 rounded-xl p-5 sm:p-6 border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Overall Rating Box */}
        <div className="flex flex-col justify-center items-center md:items-start md:border-r md:border-slate-200 md:pr-6">
          <span className="text-4xl font-extrabold text-slate-900">{Number(rating).toFixed(1)}</span>
          <div className="flex items-center gap-1 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.floor(rating) ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Based on {totalReviews} student reviews
          </span>
          <div className="mt-3 inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Verified College Students</span>
          </div>
        </div>

        {/* Star Distribution Bars */}
        <div className="space-y-1.5 justify-center flex flex-col md:border-r md:border-slate-200 md:pr-6">
          {starBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-6 shrink-0">{bar.stars} ★</span>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-slate-400 text-[11px]">{bar.pct}%</span>
            </div>
          ))}
        </div>

        {/* Category-Wise Criteria Scores */}
        <div className="space-y-2 justify-center flex flex-col">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
            Key Living Metrics
          </span>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Cleanliness & Hygiene</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(cats.cleanliness / 5) * 100}%` }} />
              </div>
              <span className="font-semibold text-slate-900 w-6 text-right">{cats.cleanliness}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Food Quality</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(cats.food / 5) * 100}%` }} />
              </div>
              <span className="font-semibold text-slate-900 w-6 text-right">{cats.food}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Campus Proximity</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(cats.location / 5) * 100}%` }} />
              </div>
              <span className="font-semibold text-slate-900 w-6 text-right">{cats.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Safety & Curfew Policy</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(cats.safety / 5) * 100}%` }} />
              </div>
              <span className="font-semibold text-slate-900 w-6 text-right">{cats.safety}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700">Value for Money</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(cats.value / 5) * 100}%` }} />
              </div>
              <span className="font-semibold text-slate-900 w-6 text-right">{cats.value}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
