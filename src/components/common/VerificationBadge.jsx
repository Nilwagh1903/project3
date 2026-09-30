import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function VerificationBadge({ size = "md", text = "Verified Listing", verifiedDate }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const isSmall = size === "sm";

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => { e.stopPropagation(); setShowTooltip(!showTooltip); }}
    >
      <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium ${
        isSmall ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } cursor-help transition-colors hover:bg-emerald-100`}>
        <ShieldCheck className={`${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-600`} />
        <span>{text}</span>
      </span>

      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-2.5 bg-slate-900 text-slate-100 text-xs rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 pointer-events-none">
          <p className="font-semibold text-emerald-400 flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 inline" /> Student Verified Listing
          </p>
          <p className="text-slate-300 leading-relaxed">
            {verifiedDate || "Photos, room prices, amenities, and lease terms verified on-site by enrolled student ambassadors."}
          </p>
          <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}
