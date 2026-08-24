import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getNavigationForRole } from '../../config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { Shield, X, LogOut, ChevronLeft, Sparkles } from 'lucide-react';
import { getInitials } from '../../utils/formatters';
import { useMemo } from 'react';

const SECTION_LABELS = {
  OVERVIEW: 'Overview',
  GOVERNANCE: 'Governance',
  MONITORING: 'Monitoring',
  INTELLIGENCE: 'Intelligence',
  ADMIN: 'Administration',
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
      label: SECTION_LABELS[section] || section,
      items,
    }));
  }, [navItems]);

  const roleColor = ROLE_COLORS[role] || '#1E3A5F';

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* ── Brand Header ── */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.08] bg-slate-950/40">
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={onClose}
            title="Collapse sidebar ([ or Esc])"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-white leading-none tracking-tight">MineGuard AI</span>
                <span className="text-[9px] font-bold bg-amber-500/15 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wide">
                  Open
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                Smart Governance
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Collapse sidebar (Press [ or Esc)"
            aria-label="Collapse sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Navigation List ── */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto sidebar-scrollable space-y-5">
          {sectionGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <div className="px-2 mb-1 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400/80 uppercase tracking-widest select-none">
                  {group.label}
                </span>
              </div>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 relative select-none
                      ${isActive
                        ? 'bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30 shadow-xs shadow-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                      }
                    `}
                  >
                    {/* Active indicator line */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-amber-400 shadow-sm shadow-amber-400/60" />
                    )}

                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors duration-150
                        ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}
                      `}
                    />

                    <span className="flex-1 truncate tracking-tight">{item.label}</span>

                    {item.id === 'ai-insights' && (
                      <span className="flex items-center gap-1 text-[9px] font-extrabold bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white px-1.5 py-0.5 rounded-md flex-shrink-0 shadow-xs uppercase tracking-wider">
                        <Sparkles className="w-2.5 h-2.5" />
                        AI
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Collapse Bar Button ── */}
        <div className="px-3 py-2 border-t border-white/[0.08] bg-slate-950/20">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/[0.04] cursor-pointer"
            title="Collapse sidebar into logo button"
          >
            <span className="flex items-center gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Collapse Menu</span>
            </span>
            <kbd className="text-[9px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded font-mono">[</kbd>
          </button>
        </div>

        {/* ── Compact User Profile Footer ── */}
        {user && (
          <div className="p-3 border-t border-white/[0.08] bg-slate-950/50">
            <div className="flex items-center justify-between gap-2 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] rounded-xl p-2 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}DD)` }}
                >
                  {getInitials(user.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-white truncate leading-tight">{user.fullName}</p>
                  <p className="text-[10px] font-medium text-amber-400/90 truncate leading-tight mt-0.5">
                    {ROLE_LABELS[user.role] || user.role}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 transition-all duration-200 flex-shrink-0 cursor-pointer"
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
