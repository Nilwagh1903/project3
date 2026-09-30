import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Sparkles, MapPin } from 'lucide-react';
import { useSettleIn } from '../context/SettleInContext';

export default function Onboarding() {
  const { colleges, changeCollege, studentProfile, setStudentProfile } = useSettleIn();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form State
  const [selectedCity, setSelectedCity] = useState(studentProfile?.city || "Pune");
  const [selectedCollegeId, setSelectedCollegeId] = useState(studentProfile?.collegeId || "vit-pune");
  const [lookingFor, setLookingFor] = useState(studentProfile?.lookingFor || ["Housing", "Food"]);
  const [budget, setBudget] = useState(studentProfile?.budget || "₹5,000–₹8,000");
  const [distance, setDistance] = useState(studentProfile?.preferredDistance || "Within 1 km");

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete Onboarding
      changeCollege(selectedCollegeId);
      setStudentProfile(prev => ({
        ...prev,
        city: selectedCity,
        collegeId: selectedCollegeId,
        lookingFor,
        budget,
        preferredDistance: distance,
        isOnboarded: true
      }));
      navigate('/explore');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleNeed = (need) => {
    setLookingFor(prev =>
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center max-w-xl mx-auto px-4 py-12">
      
      {/* Progress Indicator: 1 — 2 — 3 — 4 — 5 */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-teal-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card">
        
        {/* STEP 1: Select City */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">Step 1</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Which city are you moving to?</h2>
              <p className="text-xs text-slate-500 mt-1">We currently feature comprehensive student zones for Maharashtra's education hub.</p>
            </div>

            <div className="space-y-2 pt-2">
              {[
                { city: "Pune", state: "Maharashtra", active: true, tag: "Fully Covered" },
                { city: "Bengaluru", state: "Karnataka", active: false, tag: "Coming Next" },
                { city: "Hyderabad", state: "Telangana", active: false, tag: "Coming Next" }
              ].map((c) => (
                <div
                  key={c.city}
                  onClick={() => c.active && setSelectedCity(c.city)}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    selectedCity === c.city
                      ? 'border-teal-500 bg-teal-50/40 text-slate-900 font-semibold'
                      : c.active ? 'border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-700' : 'opacity-50 border-dashed border-slate-200 cursor-not-allowed text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${selectedCity === c.city ? 'text-teal-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-semibold">{c.city}</div>
                      <div className="text-[11px] text-slate-400">{c.state}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    c.active ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {c.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Select College */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">Step 2</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Where are you studying?</h2>
              <p className="text-xs text-slate-500 mt-1">Select your college campus to calculate exact walking distances.</p>
            </div>

            <div className="space-y-2 pt-2">
              {colleges.map((col) => (
                <div
                  key={col.id}
                  onClick={() => setSelectedCollegeId(col.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedCollegeId === col.id
                      ? 'border-teal-500 bg-teal-50/40 text-slate-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{col.name}</div>
                    <div className="text-xs text-slate-500">{col.fullName} • {col.locality}</div>
                  </div>
                  {selectedCollegeId === col.id && (
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: What are you looking for? */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">Step 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">What do you need for your first week?</h2>
              <p className="text-xs text-slate-500 mt-1">Select everything you want sorted before classes start.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { name: "Housing", icon: "🏠", desc: "PG or student hostel" },
                { name: "Food", icon: "🍱", desc: "Monthly mess / dabba" },
                { name: "Transport", icon: "🚌", desc: "Bus route & auto stand" }
              ].map((item) => {
                const selected = lookingFor.includes(item.name);
                return (
                  <div
                    key={item.name}
                    onClick={() => toggleNeed(item.name)}
                    className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                      selected
                        ? 'border-teal-500 bg-teal-50/40 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                    {selected && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700">
                        <Check className="w-3 h-3" /> Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Budget */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">Step 4</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">What is your monthly room budget?</h2>
              <p className="text-xs text-slate-500 mt-1">This helps us filter out options outside your preferred band.</p>
            </div>

            <div className="space-y-2 pt-2">
              {[
                { band: "₹0–₹5,000", desc: "Economic sharing (3-4 beds), basic facilities" },
                { band: "₹5,000–₹8,000", desc: "Most popular for students (2-3 sharing, Wi-Fi, food)" },
                { band: "₹8,000–₹12,000", desc: "Comfort double sharing with attached washroom & AC options" },
                { band: "₹12,000+", desc: "Premium single rooms / serviced student studio" }
              ].map((b) => (
                <div
                  key={b.band}
                  onClick={() => setBudget(b.band)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    budget === b.band
                      ? 'border-teal-500 bg-teal-50/40 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{b.band} / month</div>
                    <div className="text-xs text-slate-500">{b.desc}</div>
                  </div>
                  {budget === b.band && (
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Distance & Confirmation */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-teal-700">Step 5</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">How far are you willing to stay?</h2>
              <p className="text-xs text-slate-500 mt-1">Closer places let you walk; slightly further options offer lower rents.</p>
            </div>

            <div className="space-y-2 pt-2">
              {[
                { dist: "Within 1 km", note: "Walking distance (under 12 mins), close to college gates" },
                { dist: "Within 3 km", note: "Short bicycle or shared auto ride, quieter neighborhoods" },
                { dist: "Any distance with bus connectivity", note: "Best for maximum budget savings" }
              ].map((d) => (
                <div
                  key={d.dist}
                  onClick={() => setDistance(d.dist)}
                  className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    distance === d.dist
                      ? 'border-teal-500 bg-teal-50/40 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{d.dist}</div>
                    <div className="text-xs text-slate-500">{d.note}</div>
                  </div>
                  {distance === d.dist && (
                    <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your custom SettleIn workspace is prepared! Click Finish to explore.</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors ml-auto"
          >
            <span>{step === totalSteps ? "Finish & Explore Campus" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
