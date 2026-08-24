import { useAuth } from '../../contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { Menu, Bell, Search, LogOut, User, ChevronDown, Shield, ShieldAlert } from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import { useState, useRef, useEffect } from 'react';
import { getActiveAlerts } from '../../data/mockAlerts';

export default function Header({ sidebarOpen, onToggleSidebar, onSearchOpen }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const activeAlerts = getActiveAlerts();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="top-header">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Government Portal Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-xs transition-all duration-150 cursor-pointer active:scale-95"
          title={sidebarOpen ? "Collapse sidebar (Press [ or Esc)" : "Open sidebar (Press [)"}
          aria-label="Toggle navigation slidebar"
        >
          <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold flex-shrink-0">
            <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="text-left hidden sm:flex items-center gap-2">
            <span className="text-xs font-bold tracking-tight">Navigation</span>
            <kbd className="text-[10px] bg-slate-800 text-amber-300 px-1 py-0.2 rounded font-mono border border-slate-700">[</kbd>
          </div>
          <Menu className="w-4 h-4 text-slate-300 sm:hidden" />
        </button>

        {/* Global Search bar */}
        <div
          className="hidden md:flex items-center gap-2 bg-slate-50 hover:bg-white rounded-lg px-3 py-1.5 w-64 lg:w-80 border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer shadow-2xs"
          onClick={onSearchOpen}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 select-none">Search mines, violations, records...</span>
          <kbd className="ml-auto text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Alert notification bell */}
        <button
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Active Government Alerts"
          aria-label="Active Government Alerts"
        >
          <Bell className="w-4.5 h-4.5" />
          {activeAlerts.length > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[9.5px] font-extrabold rounded-full flex items-center justify-center font-mono animate-pulse">
              {activeAlerts.length > 9 ? '9+' : activeAlerts.length}
            </span>
          )}
        </button>

        {/* Official Role badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border border-slate-200/80"
          style={{
            background: `${ROLE_COLORS[user?.role] || '#1E3A5F'}10`,
            color: ROLE_COLORS[user?.role] || '#1E3A5F',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: ROLE_COLORS[user?.role] || '#1E3A5F' }} />
          {ROLE_LABELS[user?.role]}
        </div>

        {/* User profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="User profile menu"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-xs border border-slate-200"
              style={{ background: `linear-gradient(135deg, ${ROLE_COLORS[user?.role]}, ${ROLE_COLORS[user?.role]}EE)` }}
            >
              {getInitials(user?.fullName)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 leading-tight">{user?.fullName}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                <p className="text-[10px] text-amber-700 font-semibold mt-1 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200">
                  {user?.designation || ROLE_LABELS[user?.role]}
                </p>
              </div>
              <button
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Officer Profile
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                onClick={logout}
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                Sign Out Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

