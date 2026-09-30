import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Bookmark, History, MessageCircle, CheckCircle2, ArrowRight, User, LogOut, LogIn } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';
import { HOUSING_LISTINGS } from '../data/listings';

export default function Profile() {
  const { studentProfile, currentCollege, shortlist, recentlyViewed, contactInquiries, openLoginModal, logoutStudent } = useSettleIn();

  // If not logged in yet
  if (!studentProfile?.isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto text-2xl font-bold">
          <User className="w-8 h-8 text-teal-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Student Profile Not Set Up</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Please log in and select your college and city. SettleIn does not pre-select any student data by default.
        </p>
        <div className="pt-2">
          <button
            onClick={openLoginModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>Enter Name, City & College</span>
          </button>
        </div>
      </div>
    );
  }

  // Resolve recently viewed objects
  const recentListings = recentlyViewed.map(id => HOUSING_LISTINGS.find(h => h.id === id)).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-black text-2xl flex items-center justify-center shadow-sm">
            {studentProfile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{studentProfile.name}</h1>
              <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {studentProfile.academicYear || "Enrolled Student"}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                {currentCollege?.name || "College not set"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {currentCollege?.locality || studentProfile.city}, {studentProfile.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={openLoginModal}
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            Edit Info
          </button>
          <button
            onClick={logoutStudent}
            className="text-xs font-semibold px-3 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Preferences Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 font-medium">Looking For</span>
          <p className="font-bold text-slate-800">{studentProfile.lookingFor?.join(" & ") || "Housing, Food"}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 font-medium">City Hub</span>
          <p className="font-bold text-slate-800">{studentProfile.city}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 font-medium">Contact Phone</span>
          <p className="font-bold text-slate-800">{studentProfile.phone || "Not provided"}</p>
        </div>
      </div>

      {/* Contacted Owners / Inquiries Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-teal-600" />
            <h2 className="font-bold text-slate-900 text-sm">Direct Owner Inquiries ({contactInquiries.length})</h2>
          </div>
          <span className="text-[11px] text-slate-400">Recorded from Contact Owner modal</span>
        </div>

        {contactInquiries.length > 0 ? (
          <div className="space-y-3">
            {contactInquiries.map((inq) => (
              <div key={inq.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900">
                    {inq.propertyName} <span className="font-normal text-slate-500">({inq.ownerName})</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {inq.status}
                  </span>
                </div>
                <p className="text-slate-600 italic">"{inq.studentMessage}"</p>
                <div className="text-[10px] text-slate-400">{inq.timestamp}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            No owner inquiries sent yet. When you contact an owner from any property page, your sent messages appear here.
          </p>
        )}
      </div>

      {/* Recently Viewed Places */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-600" />
            <h2 className="font-bold text-slate-900 text-sm">Recently Viewed Properties ({recentListings.length})</h2>
          </div>
        </div>

        {recentListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {recentListings.map((p) => (
              <Link
                key={p.id}
                to={`/property/${p.id}`}
                className="group p-3 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all flex items-center gap-3"
              >
                <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-teal-700">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold">₹{p.price.toLocaleString()}/mo</p>
                  <p className="text-[10px] text-slate-400">{p.distanceKm} km away</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No recently viewed properties yet. Browse listings to track your history.</p>
        )}
      </div>

      {/* Saved Places Quick Link */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-rose-500" />
          <span className="font-bold text-slate-800">Saved Places in Shortlist:</span>
          <span className="text-slate-600">{shortlist.length} item(s)</span>
        </div>
        <Link to="/shortlist" className="font-bold text-teal-700 hover:underline flex items-center gap-1">
          <span>Open Shortlist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
