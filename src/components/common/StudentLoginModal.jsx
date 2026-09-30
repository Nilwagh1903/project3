import React, { useState } from 'react';
import { MapPin, Building, User, GraduationCap, Check, ArrowRight, Sparkles, Phone, Utensils } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function StudentLoginModal({ isOpen, onClose, canDismiss = false }) {
  const { colleges, loginStudent } = useSettleIn();

  // Form State - strictly NO default values selected
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [primaryNeeds, setPrimaryNeeds] = useState([]);
  const [dietaryPref, setDietaryPref] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const cities = [
    { name: "Pune", state: "Maharashtra", available: true },
    { name: "Bengaluru", state: "Karnataka", available: false },
    { name: "Delhi NCR", state: "Delhi", available: false },
    { name: "Mumbai", state: "Maharashtra", available: false }
  ];

  const yearOptions = [
    "First Year (FE) - Undergrad",
    "Second Year (SE)",
    "Third Year (TE)",
    "Final Year (BE/B.Tech)",
    "Postgraduate (M.Tech / MBA / M.Sc)"
  ];

  const needOptions = [
    { id: "Housing", label: "🏠 PG / Hostel Stay" },
    { id: "Food", label: "🍱 Student Mess & Dabba" },
    { id: "Transport", label: "🚌 Campus Transit & Bus" }
  ];

  const toggleNeed = (needId) => {
    setPrimaryNeeds(prev =>
      prev.includes(needId) ? prev.filter(id => id !== needId) : [...prev, needId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!selectedCity) {
      setErrorMsg("Please select your college city.");
      return;
    }
    if (!selectedCollege) {
      setErrorMsg("Please select your college campus.");
      return;
    }

    // Submit to context
    loginStudent({
      name: fullName.trim(),
      phone: phone.trim() || "+91 98765 43210",
      city: selectedCity,
      collegeId: selectedCollege,
      academicYear: academicYear || "First Year Undergrad",
      lookingFor: primaryNeeds.length > 0 ? primaryNeeds : ["Housing", "Food"],
      dietaryPref: dietaryPref || "No Preference",
      isLoggedIn: true
    });

    if (onClose) onClose();
  };

  const availableColleges = selectedCity === "Pune" ? colleges : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 pt-8 pb-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Student Entry & Campus Setup</span>
            </div>

            {canDismiss && (
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 p-1"
              >
                ✕ Cancel
              </button>
            )}
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-3">
            Welcome to SettleIn
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            "Your first week on campus, sorted." Please set up your student details to customize your campus directory.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-800 animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {/* 1. Full Name & Phone in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Full Name <span className="text-rose-500">*</span></span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setErrorMsg(""); }}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                <span>Student Phone Number</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98220 12345"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none text-slate-900 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>

          {/* 2. City Selection - No default */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>College City <span className="text-rose-500">*</span></span>
            </label>
            <select
              required
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedCollege("");
                setErrorMsg("");
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none text-slate-900 bg-white"
            >
              <option value="">-- Choose City --</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name} disabled={!c.available}>
                  {c.name} ({c.state}) {c.available ? "— Active Hub" : "— Coming Soon"}
                </option>
              ))}
            </select>
          </div>

          {/* 3. College Selection - No default */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-teal-600" />
              <span>College Campus <span className="text-rose-500">*</span></span>
            </label>
            <select
              required
              disabled={!selectedCity}
              value={selectedCollege}
              onChange={(e) => { setSelectedCollege(e.target.value); setErrorMsg(""); }}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none bg-white ${
                !selectedCity
                  ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                  : 'border-slate-300 text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-200'
              }`}
            >
              <option value="">
                {selectedCity ? "-- Choose College Campus --" : "First select a city above"}
              </option>
              {availableColleges.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name} — {col.locality} ({col.fullName})
                </option>
              ))}
            </select>
          </div>

          {/* 4. Academic Year & Dietary in grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <span>Academic Year / Stream</span>
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none text-slate-900 bg-white"
              >
                <option value="">-- Select Year / Level --</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-teal-600" />
                <span>Mess / Food Preference</span>
              </label>
              <select
                value={dietaryPref}
                onChange={(e) => setDietaryPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-200 outline-none text-slate-900 bg-white"
              >
                <option value="">-- Select Dietary Choice --</option>
                <option value="Pure Veg">Pure Veg Only</option>
                <option value="Veg & Non-Veg">Both Veg & Non-Veg</option>
                <option value="Jain Food">Jain Food (No root veg)</option>
              </select>
            </div>
          </div>

          {/* 5. What are you looking for? (None selected by default) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-slate-800">
              What do you need sorted first?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {needOptions.map((item) => {
                const isSelected = primaryNeeds.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleNeed(item.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Login & Enter SettleIn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2.5">
              Frontend demo authentication • No backend server required
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
