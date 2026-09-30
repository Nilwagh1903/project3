import React from "react";
import { ArrowRight, MapPin, Building2, UtensilsCrossed, Bus, Star, Shield, Sparkles, ChevronRight, Users, BadgeCheck } from "lucide-react";

const STATS = [
  { value: "5+", label: "Colleges in Pune" },
  { value: "500+", label: "Verified Listings" },
  { value: "1200+", label: "Students Helped" },
  { value: "4.7", label: "Average Rating" },
];

const FEATURES = [
  { icon: Building2, color: "teal", title: "PG & Hostels", desc: "Find verified paying-guest accommodations and hostels near your campus with student reviews." },
  { icon: UtensilsCrossed, color: "orange", title: "Mess & Food", desc: "Discover affordable student messes, dabbawalas, and canteens that suit your diet and budget." },
  { icon: Bus, color: "blue", title: "Transport Routes", desc: "Know the best bus, auto, and bike-share routes from your campus to key city spots." },
  { icon: BadgeCheck, color: "violet", title: "Verified Only", desc: "Every listing is manually verified by our student community - no fake contacts, ever." },
];

const TESTIMONIALS = [
  { name: "Priya M.", college: "VIT Pune", text: "Found my PG within 2 days of joining college. Saved me a week of broker hunting!", rating: 5 },
  { name: "Arjun S.", college: "COEP Tech", text: "The mess listings are a lifesaver. Found a great pure-veg dabba service 5 mins from campus.", rating: 5 },
  { name: "Sneha K.", college: "MIT-WPU", text: "Transport routes section helped me plan my commute before I even landed in Pune.", rating: 5 },
];

const colorMap = {
  teal:   { bg: "bg-teal-50",   icon: "text-teal-600",   border: "border-teal-100" },
  orange: { bg: "bg-orange-50", icon: "text-orange-500", border: "border-orange-100" },
  blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   border: "border-blue-100" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100" },
};

export default function Welcome({ onLogin, onSignUp, onGuest }) {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-teal-400" />
            </div>
            <span className="font-black text-slate-900 tracking-tight text-lg">Settle<span className="text-teal-500">In</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onGuest} className="hidden sm:inline-flex text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Explore Demo</button>
            <button onClick={onLogin} className="text-xs font-bold text-slate-700 border border-slate-200 px-4 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Log In</button>
            <button onClick={onSignUp} className="text-xs font-bold bg-slate-900 text-white px-4 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-bold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Now live in Pune - 5 campuses covered</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Your first week on<br />
            <span className="text-teal-400">campus, sorted.</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
            SettleIn helps first-year and out-of-state students find verified PGs, student messes,
            and transport routes around their college - all in one place. No brokers. No random Google searches.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-teal-500/20">
              Get Started - It's Free <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onLogin} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-sm transition-all">
              Already have an account? Log In
            </button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-[11px] text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Everything a new student needs</h2>
          <p className="mt-2 text-sm text-slate-500">Stop wasting time searching. Start finding.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f) => {
            const c = colorMap[f.color];
            return (
              <div key={f.title} className={`p-5 rounded-2xl border ${c.bg} ${c.border} flex flex-col gap-3`}>
                <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <f.icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-12">Up and running in 3 steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create your profile", desc: "Tell us your name, city, and college campus." },
              { step: "02", title: "Browse listings", desc: "Filter PGs, food spots, and routes by budget, distance, and rating." },
              { step: "03", title: "Shortlist & contact", desc: "Save your favourites and message owners directly through the platform." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-black text-sm flex items-center justify-center">{item.step}</div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Students love SettleIn</h2>
          <p className="mt-2 text-sm text-slate-500">Real feedback from our early community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-teal-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.college}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to settle in?</h2>
          <p className="mt-3 text-slate-400 text-sm">Join thousands of students who found their campus home with SettleIn.</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onSignUp} className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl text-sm transition-all">
              Sign Up - Free <ChevronRight className="w-4 h-4" />
            </button>
            <button onClick={onGuest} className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-white/10 hover:bg-white/5 text-white font-semibold rounded-xl text-sm transition-all">
              <Shield className="w-3.5 h-3.5 opacity-60" /> Explore Demo First
            </button>
          </div>
          <p className="mt-5 text-[11px] text-slate-600">Frontend-only prototype - No personal data stored on any server</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-600 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            <span className="text-xs font-bold text-slate-400">Settle<span className="text-teal-500">In</span></span>
            <span className="text-xs">- Your first week on campus, sorted.</span>
          </div>
          <span className="text-xs">2026 SettleIn - Built for CuriousParc 2026</span>
        </div>
      </footer>
    </div>
  );
}
