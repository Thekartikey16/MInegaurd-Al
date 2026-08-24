import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getNavigationForRole } from '../../config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import {
  Shield, X, LogOut, ChevronLeft, Sparkles, Activity, ShieldCheck,
  Radio, Layers
} from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import { useMemo } from 'react';
import { getActiveAlerts } from '../../data/mockAlerts';

const SECTION_LABELS = {
  OVERVIEW: 'Core Overview',
  GOVERNANCE: 'Governance & Compliance',
  MONITORING: 'Real-time Telemetry',
  INTELLIGENCE: 'AI Intelligence',
  ADMIN: 'System Admin',
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navItems = getNavigationForRole(role);
  const activeAlerts = getActiveAlerts();

  // Group nav items by section
  const sectionGroups = useMemo(() => {
    const map = new Map();
    navItems.forEach(item => {
      const sectionKey = item.section || 'OTHER';
      if (!map.has(sectionKey)) {
        map.set(sectionKey, []);
      }
      map.get(sectionKey).push(item);
    });
    return Array.from(map.entries()).map(([section, items]) => ({
      key: section,
      label: SECTION_LABELS[section] || section,
      items,
    }));
  }, [navItems]);

  const roleColor = ROLE_COLORS[role] || '#1E3A5F';

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Inset Floating Dock Sidebar (Vercel / Linear Enterprise Style) ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[300px] p-3 transition-transform duration-250 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Enterprise Navigation Dock"
      >
        <div className="h-full flex flex-col justify-between bg-slate-950/95 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">
          
          {/* ── TOP CONTAINER: Brand Header & Grouped Navigation Items ── */}
          <div className="flex flex-col min-h-0 flex-1">
            {/* Top Brand Header */}
            <div className="p-3.5 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-transparent flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 border border-amber-300/30 flex-shrink-0">
                    <Shield className="w-4.5 h-4.5 stroke-[2.3]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white tracking-tight font-sans">
                        MineGuard<span className="text-amber-400">AI</span>
                      </span>
                      <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        CMR-2017 Live
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                      Enterprise Mining Safety Portal
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-colors cursor-pointer"
                  title="Collapse sidebar (Press [ or Esc)"
                  aria-label="Collapse sidebar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Navigation Area */}
            <nav className="flex-1 px-3 py-3 overflow-y-auto sidebar-scrollable space-y-4">
              {sectionGroups.map((group) => (
                <div key={group.key} className="space-y-1">
                  {/* Section Title Header */}
                  <div className="px-2 pb-0.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                      {group.label}
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                      {group.items.length}
                    </span>
                  </div>

                  {/* Nav Item Rows */}
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.path === '/dashboard'
                        ? location.pathname === '/dashboard'
                        : location.pathname.startsWith(item.path);

                      return (
                        <NavLink
                          key={item.id}
                          to={item.path}
                          className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 relative select-none
                            ${isActive
                              ? 'bg-slate-900 text-white font-semibold shadow-xs border border-slate-800/90'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                            }
                          `}
                        >
                          {/* Left Accent Bar on Active */}
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                          )}

                          <div className={`transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-300'}`}>
                            <Icon className="w-4 h-4 flex-shrink-0" />
                          </div>

                          <span className="flex-1 truncate tracking-tight">{item.label}</span>

                          {/* Translucent AI Badge */}
                          {item.id === 'ai-insights' && (
                            <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.2 rounded-full uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              AI
                            </span>
                          )}

                          {/* Translucent Alerts Badge */}
                          {item.id === 'alerts' && activeAlerts.length > 0 && (
                            <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                              {activeAlerts.length}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* ── BOTTOM CONTAINER: Pinned Compliance, Telemetry & User Card ── */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 space-y-2.5 flex-shrink-0">
            {/* 1. Anchored DGMS Compliance Card */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-3 space-y-2 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[11.5px] font-bold text-slate-200 leading-none">DGMS Compliance</h4>
                    <p className="text-[9.5px] text-slate-400 mt-0.5">MMR 1961 & CMR 2017</p>
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
                  98.6% SAFE
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full w-[98.6%]" />
              </div>
            </div>

            {/* 2. System Status Summary / Quick Telemetry Bar */}
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/40 border border-slate-800/60 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Telemetry Active</span>
              </span>
              <span className="font-mono text-slate-400">
                Latency: <strong className="text-slate-300 font-semibold">18ms</strong>
              </span>
            </div>

            {/* 3. User Profile Card with Integrated Collapse Action */}
            {user && (
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-xs border border-white/10"
                    style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}DD)` }}
                    title={user.fullName}
                  >
                    {getInitials(user.fullName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-slate-200 truncate leading-tight">
                      {user.fullName}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
                      {user.designation || ROLE_LABELS[user.role] || user.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
                    title="Sign Out"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                    title="Collapse Sidebar ([)"
                    aria-label="Collapse Sidebar"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}


