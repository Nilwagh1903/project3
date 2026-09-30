import React from 'react';
import { Star, UserCheck } from 'lucide-react';

export default function ReviewList({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
        No student reviews yet for this listing. Be the first to review!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((rev) => (
        <div key={rev.id} className="p-4 sm:p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-3">
          
          {/* Reviewer Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                {rev.studentName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 text-sm">{rev.studentName}</h4>
                  {rev.verifiedStudent && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      <UserCheck className="w-3 h-3 text-emerald-600" /> Verified Student
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{rev.studentCourse} • {rev.stayDuration || "Resident"}</p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-900 border border-amber-200 text-xs font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{rev.rating}</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5">{rev.date}</span>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            "{rev.comment}"
          </p>

          {/* Sub-ratings pills */}
          {rev.scores && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Cleanliness: <b className="text-slate-800">{rev.scores.cleanliness}/5</b></span>
              <span>•</span>
              <span>Food: <b className="text-slate-800">{rev.scores.food}/5</b></span>
              <span>•</span>
              <span>Safety: <b className="text-slate-800">{rev.scores.safety}/5</b></span>
              <span>•</span>
              <span>Location: <b className="text-slate-800">{rev.scores.location}/5</b></span>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
