import { useAuth } from '../../contexts/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { Menu, Bell, Search, LogOut, User, ChevronDown, Shield } from 'lucide-react';
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
        {/* Yellow Logo Button - Tap to open slidebar */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 shadow-sm transition-all duration-200 group active:scale-95 cursor-pointer"
          title={sidebarOpen ? "Close sidebar (Press [ or Esc)" : "Tap yellow logo to open sidebar (Press [)"}
          aria-label="Toggle navigation slidebar"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="text-left flex items-center gap-2">
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800 tracking-tight leading-none">MineGuard AI</span>
                <span className="text-[9px] font-semibold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded leading-none">
                  Menu
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Tap to open menu</p>
            </div>
            <Menu className="w-4 h-4 text-amber-700 sm:hidden" />
          </div>
        </button>

        {/* Search bar */}
        <div
          className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-64 lg:w-72 border border-gray-200 cursor-pointer hover:border-gray-300 transition-colors"
          onClick={onSearchOpen}
        >
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Search mines, violations, inspections...</span>
          <kbd className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Alert bell */}
        <button className="relative btn-ghost p-2 rounded-lg">
          <Bell className="w-5 h-5 text-gray-500" />
          {activeAlerts.length > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeAlerts.length > 9 ? '9+' : activeAlerts.length}
            </span>
          )}
        </button>

        {/* Role badge */}
        <div
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
          style={{
            background: `${ROLE_COLORS[user?.role]}15`,
            color: ROLE_COLORS[user?.role],
          }}
        >
          {ROLE_LABELS[user?.role]}
        </div>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${ROLE_COLORS[user?.role]}, ${ROLE_COLORS[user?.role]}CC)` }}
            >
              {getInitials(user?.fullName)}
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
