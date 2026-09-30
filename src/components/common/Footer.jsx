import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function Footer() {
  const { colleges, changeCollege } = useSettleIn();

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pt-12 pb-16 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">SettleIn</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              "Your first week on campus, sorted." Built for first-year and out-of-state students arriving in Pune colleges.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct owner listings · No broker fee</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">Discover</h4>
            <ul className="space-y-2">
              <li><Link to="/explore" className="hover:text-teal-700 transition-colors">Campus Map & Directory</Link></li>
              <li><Link to="/housing" className="hover:text-teal-700 transition-colors">PGs & Student Hostels</Link></li>
              <li><Link to="/food" className="hover:text-teal-700 transition-colors">Student Messes & Dabbas</Link></li>
              <li><Link to="/transport" className="hover:text-teal-700 transition-colors">Bus Routes & Auto Stands</Link></li>
              <li><Link to="/compare" className="hover:text-teal-700 transition-colors">Compare Properties</Link></li>
            </ul>
          </div>

          {/* College Hubs */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">Campuses Supported</h4>
            <ul className="space-y-1.5">
              {colleges.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => changeCollege(c.id)}
                    className="hover:text-teal-700 text-left transition-colors"
                  >
                    {c.name} <span className="text-slate-400">({c.locality})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">Project Details</h4>
            <p className="text-slate-500 leading-relaxed">
              Designed as a developer MVP pair-programmed for the college innovation competition showcase.
            </p>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-medium text-slate-800 block text-xs">CuriousParc 2026</span>
              <span className="text-[11px] text-slate-500">Frontend-Only Prototype • React + Vite</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-2">
          <p>© 2026 SettleIn. Frontend Demo — CuriousParc 2026.</p>
          <p className="flex items-center gap-1">
            Built with practical student empathy & local Pune campus knowledge
          </p>
        </div>
      </div>
    </footer>
  );
}
