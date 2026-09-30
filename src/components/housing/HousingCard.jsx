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
        className={`group bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 overflow-hidden flex ${
          isCompact ? 'flex-row h-36' : 'flex-col sm:flex-row'
        }`}
      >
        {/* Thumbnail Image */}
        <div className={`relative ${isCompact ? 'w-36 shrink-0' : 'sm:w-56 shrink-0 h-48 sm:h-auto'} bg-slate-100 overflow-hidden`}>
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Type / Gender Tag */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900/80 text-white backdrop-blur-xs">
              {property.type}
            </span>
          </div>

          {/* Shortlist Heart Button */}
          <button
            type="button"
            onClick={handleShortlistClick}
            aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
              shortlisted
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Distance Indicator Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-slate-900/70 backdrop-blur-xs px-2 py-1 rounded">
            <span className="truncate">{property.distanceKm} km from {currentCollege?.name || 'campus'}</span>
            <span className="shrink-0 text-slate-300">{property.walkingMins}m walk</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Header: Verification & Subheading */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">{property.gender}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-600">{property.sharingTypes?.slice(0, 2).join(", ")}</span>
              </div>
              {property.verified && (
                <VerificationBadge size="sm" text="Verified" verifiedDate={property.verifiedDate} />
              )}
            </div>

            {/* Property Title */}
            <Link to={`/property/${property.id}`} className="group-hover:text-teal-700 transition-colors">
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {property.name}
              </h3>
            </Link>

            {/* Ratings & Reviews */}
            <div className="mt-1.5 flex items-center gap-3">
              <StarRating rating={property.rating} reviewsCount={property.reviewsCount} />
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 truncate">{property.address.split(",")[1]?.trim() || property.address}</span>
            </div>

            {/* Tagline */}
            <p className="mt-2 text-xs text-slate-600 line-clamp-1">
              {property.tagline}
            </p>

            {/* Key Amenities */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {property.amenities.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-normal"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>

          {/* Footer: Price + Actions */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Starting at</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Compare Checkbox Button */}
              <button
                type="button"
                onClick={handleCompareClick}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors flex items-center gap-1 ${
                  compared
                    ? 'bg-teal-50 border-teal-300 text-teal-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title={compared ? "Selected for comparison" : "Add to comparison table"}
              >
                {compared ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                <span>{compared ? "Compared" : "Compare"}</span>
              </button>

              {/* Contact Button */}
              <button
                type="button"
                onClick={handleContactClick}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-colors flex items-center gap-1"
                title="Direct Owner Contact"
              >
                <Phone className="w-3 h-3 text-slate-500" />
                <span className="hidden sm:inline">Owner</span>
              </button>

              {/* View Details Button */}
              <Link
                to={`/property/${property.id}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center gap-1"
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
