import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getNavigationForRole } from '../../config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { Shield, X, LogOut, ChevronLeft, Sparkles, Activity, ShieldCheck } from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import { useMemo } from 'react';

const SECTION_LABELS = {
  OVERVIEW: 'Overview',
  GOVERNANCE: 'Governance & Compliance',
  MONITORING: 'Real-time Monitoring',
  INTELLIGENCE: 'AI Intelligence',
  ADMIN: 'System Administration',
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navItems = getNavigationForRole(role);

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
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* ── Glowing Brand Header ── */}
        <div className="px-5 py-4 border-b border-amber-500/20 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 relative overflow-hidden">
          {/* Subtle background ambient glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div
              className="flex items-center gap-3.5 cursor-pointer group select-none"
              onClick={onClose}
              title="MineGuard AI - Tap to collapse ([ or Esc])"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-all duration-300 border border-amber-300/40">
                <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-black text-white leading-none tracking-tight font-sans">
                    MineGuard<span className="text-amber-400">.AI</span>
                  </span>
                  <span className="text-[9px] font-extrabold bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 uppercase tracking-wider shadow-xs">
                    Live
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-400/90 tracking-widest uppercase mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Smart Governance
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
              title="Collapse sidebar (Press [ or Esc)"
              aria-label="Collapse sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Scrollable Full-Height Content ── */}
        <div className="flex-1 px-3.5 py-4 overflow-y-auto sidebar-scrollable space-y-5">
          {sectionGroups.map((group) => (
            <div
              key={group.key}
              className="bg-slate-900/40 border border-white/[0.06] rounded-2xl p-2.5 shadow-lg backdrop-blur-xs space-y-1 hover:border-white/[0.12] transition-colors"
            >
              {/* Section Header */}
              <div className="px-2 py-1 flex items-center justify-between">
                <span className="text-[10.5px] font-extrabold text-amber-400/90 uppercase tracking-widest select-none flex items-center gap-1.5">
                  <span className="w-1 h-3 rounded-full bg-amber-500/60" />
                  {group.label}
                </span>
                <span className="text-[9px] font-bold bg-white/[0.06] text-slate-400 px-1.5 py-0.2 rounded-md font-mono">
                  {group.items.length}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1 pt-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.path === '/dashboard'
                    ? location.pathname === '/dashboard'
                    : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 relative select-none
                        ${isActive
                          ? 'bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent text-amber-200 font-bold border border-amber-500/40 shadow-[0_2px_12px_rgba(245,158,11,0.18)]'
                          : 'text-slate-300 hover:text-white hover:bg-white/[0.07] border border-transparent'
                        }
                      `}
                    >
                      {/* Glowing Active Bar */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-r-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                      )}

                      <div className={`p-1 rounded-lg transition-colors duration-200 ${isActive ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 group-hover:text-amber-300 group-hover:bg-white/5'}`}>
                        <Icon className="w-4 h-4 flex-shrink-0" />
                      </div>

                      <span className="flex-1 truncate tracking-tight">{item.label}</span>

                      {item.id === 'ai-insights' && (
                        <span className="flex items-center gap-1 text-[9.5px] font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white px-2 py-0.5 rounded-full shadow-md shadow-indigo-500/30 uppercase tracking-wider animate-pulse">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          AI
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Unique AI Sentinel System Card (Fills space beautifully) ── */}
          <div className="bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-slate-950 border border-amber-500/20 rounded-2xl p-3.5 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-white leading-none">DGMS AI Sentinel</h4>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5">Automated Risk Shield</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold uppercase">
                <Activity className="w-2.5 h-2.5 animate-spin" />
                98.6%
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Real-time Coal Mine Safety Monitoring & Automated Incident Prevention Active.
            </p>
          </div>
        </div>

        {/* ── Collapse Bar Button ── */}
        <div className="px-3.5 py-2.5 border-t border-white/[0.08] bg-slate-950/40">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 text-[11.5px] font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/[0.08] hover:border-amber-500/30 cursor-pointer shadow-xs"
            title="Collapse sidebar"
          >
            <span className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-amber-400" />
              <span>Collapse Navigation</span>
            </span>
            <kbd className="text-[10px] bg-white/10 text-amber-300 px-1.5 py-0.5 rounded-md font-mono border border-white/10">[</kbd>
          </button>
        </div>

        {/* ── Modern User Profile Footer ── */}
        {user && (
          <div className="p-3.5 border-t border-amber-500/20 bg-slate-950/80">
            <div className="flex items-center justify-between gap-2.5 bg-gradient-to-r from-slate-900/90 to-slate-900/50 hover:from-slate-900 hover:to-slate-850 border border-white/[0.08] hover:border-amber-500/30 rounded-2xl p-2.5 transition-all shadow-md">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0 shadow-md border border-white/20"
                  style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}EE)` }}
                >
                  {getInitials(user.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-bold text-white truncate leading-tight tracking-tight">{user.fullName}</p>
                  <p className="text-[10.5px] font-semibold text-amber-400 truncate leading-tight mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {ROLE_LABELS[user.role] || user.role}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30 transition-all duration-200 flex-shrink-0 cursor-pointer"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
