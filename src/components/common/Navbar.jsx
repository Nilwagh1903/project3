import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPin, Bookmark, Compass, Home, UtensilsCrossed, Bus, User, Menu, X, ChevronDown, Check, LogOut, LogIn } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function Navbar() {
  const {
    currentCollege,
    colleges,
    changeCollege,
    shortlist,
    studentProfile,
    openLoginModal,
    logoutStudent,
    hasSelectedCollege
  } = useSettleIn();

  const [isCollegeMenuOpen, setIsCollegeMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", to: "/explore", icon: Compass },
    { label: "Housing", to: "/housing", icon: Home },
    { label: "Food", to: "/food", icon: UtensilsCrossed },
    { label: "Transport", to: "/transport", icon: Bus },
  ];

  const studentInitial = studentProfile?.name ? studentProfile.name.charAt(0).toUpperCase() : "?";
  const firstName = studentProfile?.name ? studentProfile.name.split(" ")[0] : "Student";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand + College Switcher */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-teal-700 transition-colors">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                  SettleIn
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight mt-0.5 hidden sm:block">
                  Campus Navigator
                </span>
              </div>
            </Link>

            {/* College Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCollegeMenuOpen(!isCollegeMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  hasSelectedCollege
                    ? 'text-slate-800 bg-slate-100/80 hover:bg-slate-200/70 border-slate-200'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100/80 border-amber-200 font-bold animate-pulse'
                }`}
                title="Change Campus"
              >
                <span className={`w-2 h-2 rounded-full ${hasSelectedCollege ? 'bg-teal-500' : 'bg-amber-500'}`}></span>
                <span className="font-semibold text-slate-900">
                  {hasSelectedCollege ? currentCollege?.name : "Select Campus"}
                </span>
                {hasSelectedCollege && (
                  <span className="text-slate-400 text-[11px] hidden md:inline">({currentCollege?.city})</span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCollegeMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCollegeMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsCollegeMenuOpen(false)} />
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Choose Campus
                    </div>
                    {colleges.map((college) => {
                      const isSelected = college.id === currentCollege?.id;
                      return (
                        <button
                          key={college.id}
                          onClick={() => {
                            changeCollege(college.id);
                            setIsCollegeMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                            isSelected ? 'bg-teal-50 text-teal-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-slate-900">{college.name}</div>
                            <div className="text-[11px] text-slate-500">{college.locality}, {college.city}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-teal-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-teal-700 bg-teal-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Shortlist with count */}
            <NavLink
              to="/shortlist"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Shortlist</span>
              {shortlist.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Right: Profile, Login & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/compare"
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Compare
            </Link>

            {studentProfile?.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-colors"
                  title="Student Account"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {studentInitial}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[90px] truncate">
                    {firstName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900">{studentProfile.name}</p>
                        <p className="text-[11px] text-slate-500">{currentCollege?.name || studentProfile.city}</p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Student Profile</span>
                      </Link>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          openLoginModal();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>Edit College / City</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logoutStudent();
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out / Reset Demo</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/shortlist"
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <Bookmark className="w-5 h-5" />
              {shortlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {shortlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {studentProfile?.isLoggedIn ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-slate-900 text-xs">{studentProfile.name}</p>
                <p className="text-[11px] text-slate-500">{currentCollege?.name || studentProfile.city}</p>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  logoutStudent();
                }}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLoginModal();
              }}
              className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg mb-2 flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Student Login / Setup</span>
            </button>
          )}

          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <item.icon className="w-4 h-4 text-slate-500" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            to="/compare"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <span>Compare Properties</span>
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Student Profile</span>
          </Link>
        </div>
      )}
    </header>
  );
}
