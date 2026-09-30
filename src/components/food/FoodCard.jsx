import React, { useState } from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import StarRating from '../common/StarRating';
import { useSettleIn } from '../../context/SettleInContext';

export default function FoodCard({ food }) {
  const { isShortlisted, toggleShortlist, currentCollege } = useSettleIn();
  const [inquired, setInquired] = useState(false);

  const shortlisted = isShortlisted(food.id);

  const handleShortlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleShortlist(food.id, "food");
  };

  const handleInquire = () => {
    setInquired(true);
    setTimeout(() => setInquired(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Image + Badges */}
      <div>
        <div className="relative h-44 bg-slate-100 overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Category Tag */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
              {food.category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              food.foodType === "Pure Veg" ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {food.foodType}
            </span>
          </div>

          {/* Shortlist Heart Button */}
          <button
            type="button"
            onClick={handleShortlistClick}
            aria-label="Shortlist Food"
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
              shortlisted
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Distance Bar */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-slate-900/70 backdrop-blur-xs px-2 py-1 rounded">
            <span>{food.distanceKm} km from {currentCollege?.name}</span>
            <span>{food.walkingMins}m walk</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {food.name}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{food.address}</p>
            </div>
            {food.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Inspected
              </span>
            )}
          </div>

          {/* Ratings & Hygiene */}
          <div className="mt-2.5 flex items-center gap-3">
            <StarRating rating={food.rating} reviewsCount={food.reviewsCount} />
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
              Hygiene {food.hygieneScore}/5
            </span>
          </div>

          {/* Specialties / Meals */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {food.mealTypes.map((meal, idx) => (
                <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                  {meal}
                </span>
              ))}
            </div>
          </div>

          {/* Student Quote */}
          {food.studentComment && (
            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 italic">
              "{food.studentComment}"
            </div>
          )}
        </div>
      </div>

      {/* Footer Pricing & Actions */}
      <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 block font-medium">Monthly Thali</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-slate-900">₹{food.monthlyPrice.toLocaleString()}</span>
            <span className="text-xs text-slate-500">/ mo</span>
          </div>
          <span className="text-[10px] text-slate-400">or ₹{food.perMealPrice}/single thali</span>
        </div>

        <button
          onClick={handleInquire}
          className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all ${
            inquired
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {inquired ? "Phone: +91 98224 55019" : "Get Mess Details"}
        </button>
      </div>
    </div>
  );
}
