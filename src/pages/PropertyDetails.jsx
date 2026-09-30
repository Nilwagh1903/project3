import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowLeft,
  Layers,
  ArrowUp
} from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import { HOUSING_LISTINGS } from '../data/listings';
import { REVIEWS } from '../data/reviews';
import ImageGallery from '../components/property/ImageGallery';
import ReviewBreakdown from '../components/property/ReviewBreakdown';
import ReviewList from '../components/property/ReviewList';
import StarRating from '../components/common/StarRating';
import VerificationBadge from '../components/common/VerificationBadge';
import ContactOwnerModal from '../components/common/ContactOwnerModal';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isShortlisted,
    toggleShortlist,
    isInCompare,
    toggleCompare,
    recordView,
    currentCollege
  } = useSettleIn();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find property
  const property = HOUSING_LISTINGS.find((p) => p.id === id) || HOUSING_LISTINGS[0];

  // Record viewed property once per property ID without resetting scroll position
  useEffect(() => {
    if (property?.id) {
      recordView(property.id);
      
      // If navigating directly to reviews hash, smooth scroll to it
      if (window.location.hash.includes('review')) {
        setTimeout(() => {
          const el = document.getElementById('reviews-section');
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [property?.id, recordView]);

  // Find reviews for this property
  const propertyReviews = REVIEWS.filter((r) => r.propertyId === property?.id);
  const displayReviews = propertyReviews.length > 0 ? propertyReviews : REVIEWS.slice(0, 3);

  const shortlisted = isShortlisted(property.id);
  const compared = isInCompare(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to listings</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copiedShare ? "Link Copied!" : "Share"}</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={() => toggleCompare(property.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              compared
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{compared ? "In Comparison" : "Compare"}</span>
          </button>

          {/* Shortlist Heart Button */}
          <button
            onClick={() => toggleShortlist(property.id, "housing")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              shortlisted
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{shortlisted ? "Saved in Shortlist" : "Save to Shortlist"}</span>
          </button>
        </div>
      </div>

      {/* Main Image Gallery */}
      <ImageGallery images={property.images} title={property.name} />

      {/* Property Heading & Key Details Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 text-white">
              {property.type}
            </span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              {property.gender}
            </span>
            {property.verified && (
              <VerificationBadge text="Verified Listing" verifiedDate={property.verifiedDate} />
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {property.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('reviews-section');
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="flex items-center gap-1 hover:text-teal-700 hover:underline cursor-pointer group transition-colors"
              title="Click to jump to student reviews"
            >
              <StarRating rating={property.rating} reviewsCount={property.reviewsCount} />
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{property.distanceKm} km from {currentCollege?.name} ({property.walkingMins} min walk)</span>
            </span>
            <span>•</span>
            <span className="text-slate-500">{property.address}</span>
          </div>
        </div>

        {/* Pricing CTA Box */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 lg:shrink-0">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Monthly Rent</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">
                ₹{property.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
            <span className="text-[11px] text-slate-500">Deposit: ₹{property.deposit?.toLocaleString() || "1 month"}</span>
          </div>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Owner</span>
          </button>
        </div>
      </div>

      {/* Main Content Split: Left (2 Cols) | Right Sticky Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* 1. About This Place */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">About this place</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {property.description}
            </p>
            {property.tagline && (
              <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 text-xs text-teal-900 font-medium">
                💡 <span className="font-semibold">Student Note:</span> {property.tagline}
              </div>
            )}
          </section>

          {/* 2. Room Options & Pricing Table */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Available Room Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {property.roomOptions?.map((room, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{room.type}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">
                      {room.availability}
                    </span>
                    <p className="text-xs text-slate-500 mt-2 leading-normal">{room.features}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{room.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-500"> / month</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Amenities Grid */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Living Amenities & Utilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 text-teal-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block leading-tight">{amenity.name}</span>
                    {amenity.note && <span className="text-[10px] text-slate-400 block">{amenity.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Curfew & Building Rules */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">House Rules & Curfew</h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Gate Curfew: </span>
                  <span>{property.curfew || "10:30 PM"}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Visitors: </span>
                  <span>Daytime visitors permitted in the common lounge until 7:30 PM. No overnight outside guests without warden permission.</span>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Student Reviews Breakdown & List */}
          <section id="reviews-section" className="space-y-6 pt-4 scroll-mt-20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Reviews & Ratings</h2>
                <p className="text-xs text-slate-500 mt-0.5">Real feedback from students currently or recently living here</p>
              </div>
            </div>

            <ReviewBreakdown
              rating={property.rating}
              totalReviews={property.reviewsCount}
            />

            <ReviewList reviews={displayReviews} />

            {/* Back to top helper */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                ↑ Back to top
              </button>
            </div>
          </section>

        </div>

        {/* Right Sticky Column: Owner Info & Nearby Walking Spots */}
        <div className="space-y-6 lg:sticky lg:top-20">
          
          {/* Owner Profile Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Property Manager</h3>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Direct Owner
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 font-bold text-lg flex items-center justify-center">
                {property.owner?.name?.charAt(0) || "P"}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{property.owner?.name}</h4>
                <p className="text-xs text-slate-500">{property.owner?.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{property.owner?.responseRate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Owner Directly</span>
              </button>
              
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{property.owner?.phone}</span>
              </button>
            </div>
          </div>

          {/* Nearby Campus Spots */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nearby Essentials</h3>
            <div className="space-y-2 text-xs">
              {property.nearbyPlaces?.map((place, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-700 font-medium">{place.name}</span>
                  <span className="text-slate-500 shrink-0">{place.distance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* No Brokerage Guarantee Banner */}
          <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Zero Brokerage Promise</span>
            </div>
            <p className="text-[11px] text-teal-800 leading-relaxed">
              SettleIn ensures you speak straight to the warden or building owner. No 15-day or 1-month brokerage demands.
            </p>
          </div>

        </div>

      </div>

      {/* Contact Owner Modal */}
      <ContactOwnerModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        property={property}
      />

      {/* Floating Scroll to Top button for phones and laptops */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 md:bottom-8 right-5 z-40 px-3.5 py-2.5 rounded-full bg-slate-900/90 text-white shadow-xl hover:bg-teal-600 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-bold border border-slate-700 backdrop-blur-xs animate-in fade-in"
          title="Scroll up to top"
        >
          <ArrowUp className="w-4 h-4 text-teal-400" />
          <span>Top</span>
        </button>
      )}

    </div>
  );
}
