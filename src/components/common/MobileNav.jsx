import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Bookmark, User } from 'lucide-react';
import { useSettleIn } from '../../context/SettleInContext';

export default function MobileNav() {
  const { shortlist } = useSettleIn();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/shortlist", label: "Saved", icon: Bookmark, badge: shortlist.length },
    { to: "/profile", label: "Profile", icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-3 text-[11px] font-medium transition-colors relative ${
                isActive ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="relative">
              <link.icon className="w-5 h-5 mb-0.5" />
              {link.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-teal-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {link.badge}
                </span>
              )}
            </div>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
