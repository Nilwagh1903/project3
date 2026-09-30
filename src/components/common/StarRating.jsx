import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ rating, reviewsCount, showCount = true, size = "md" }) {
  const isSm = size === "sm";

  return (
    <div className="inline-flex items-center gap-1.5 font-medium">
      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded text-xs">
        <Star className={`${isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} fill-amber-400 text-amber-500`} />
        <span className="font-semibold">{Number(rating).toFixed(1)}</span>
      </div>
      {showCount && reviewsCount !== undefined && (
        <span className="text-slate-500 text-xs hover:text-slate-700">
          ({reviewsCount} reviews)
        </span>
      )}
    </div>
  );
}
