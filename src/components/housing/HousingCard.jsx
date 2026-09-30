import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check, Plus, Phone, ArrowUpRight } from 'lucide-react';
import StarRating from '../common/StarRating';
import VerificationBadge from '../common/VerificationBadge';
import ContactOwnerModal from '../common/ContactOwnerModal';
import { useSettleIn } from '../../context/SettleInContext';

export default function HousingCard({ property, onHover, isCompact = false }) {
  const { isShortlisted, toggleShortlist, isInCompare, toggleCompare, currentCollege } = useSettleIn();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const shortlisted = isShortlisted(property.id);
  const compared = isInCompare(property.id);

  const handleShortlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleShortlist(property.id, "housing");
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(property.id);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsContactOpen(true);
  };

  return (
    <>
      <div
        onMouseEnter={() => onHover && onHover(property.id)}
        className={`group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex ${
          isCompact ? 'flex-row min-h-[144px]' : 'flex-col h-full'
        }`}
      >
        {/* Thumbnail Image - Clicking opens property */}
        <div className={`relative ${isCompact ? 'w-36 sm:w-44 shrink-0' : 'w-full h-48 sm:h-52'} bg-slate-100 overflow-hidden`}>
          <Link
            to={`/property/${property.id}`}
            className="block w-full h-full cursor-pointer group/img"
            title={`View ${property.name}`}
          >
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover group-hover/img:scale-105 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>

          {/* Type / Gender Tag */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/85 text-white backdrop-blur-xs">
              {property.type}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/90 text-slate-800 backdrop-blur-xs">
              {property.gender}
            </span>
          </div>

          {/* Shortlist Heart Button */}
          <button
            type="button"
            onClick={handleShortlistClick}
            aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 z-10 ${
              shortlisted
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Distance Indicator Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-slate-900/75 backdrop-blur-xs px-2.5 py-1 rounded-md pointer-events-none">
            <span className="truncate">{property.distanceKm} km from {currentCollege?.name || 'campus'}</span>
            <span className="shrink-0 text-slate-300 font-medium">{property.walkingMins}m walk</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Header: Verified & Sharing Types */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs text-slate-500 font-medium truncate">
                {property.sharingTypes?.slice(0, 2).join(", ")}
              </span>
              {property.verified && (
                <VerificationBadge size="sm" text="Verified" verifiedDate={property.verifiedDate} />
              )}
            </div>

            {/* Property Title */}
            <Link to={`/property/${property.id}`} className="group-hover:text-teal-700 transition-colors block">
              <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                {property.name}
              </h3>
            </Link>

            {/* Ratings & Reviews - Clicking opens reviews */}
            <div className="mt-1.5 flex items-center gap-2">
              <Link
                to={`/property/${property.id}#reviews-section`}
                className="hover:opacity-80 transition-opacity shrink-0"
                title="Read student reviews"
              >
                <StarRating rating={property.rating} reviewsCount={property.reviewsCount} />
              </Link>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 truncate">{property.address.split(",")[1]?.trim() || property.address}</span>
            </div>

            {/* Tagline */}
            <p className="mt-2 text-xs text-slate-600 line-clamp-1">
              {property.tagline}
            </p>

            {/* Key Amenities */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-normal"
                >
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Footer: Price + Full-width Actions */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Starting at</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900">
                    ₹{property.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded">
                Deposit: ₹{property.deposit?.toLocaleString() || "1 mo"}
              </span>
            </div>

            {/* 3 Action Buttons - Always 100% visible on laptop and mobile */}
            <div className="grid grid-cols-3 gap-2">
              {/* Compare Button */}
              <button
                type="button"
                onClick={handleCompareClick}
                className={`text-xs py-2 px-1 rounded-lg border font-semibold transition-colors flex items-center justify-center gap-1 ${
                  compared
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title={compared ? "Selected for comparison" : "Add to comparison table"}
              >
                {compared ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                <span className="truncate">{compared ? "Added" : "Compare"}</span>
              </button>

              {/* Contact Button */}
              <button
                type="button"
                onClick={handleContactClick}
                className="text-xs py-2 px-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors flex items-center justify-center gap-1"
                title="Direct Owner Contact"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Owner</span>
              </button>

              {/* View Details Button - Solid Teal & Prominent */}
              <Link
                to={`/property/${property.id}`}
                className="text-xs py-2 px-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                title="View full details"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact Modal */}
      <ContactOwnerModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        property={property}
      />
    </>
  );
}
