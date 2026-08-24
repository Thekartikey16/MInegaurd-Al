import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getNavigationForRole } from '../../config/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { Shield, X, LogOut, ChevronLeft } from 'lucide-react';
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
  const sections = useMemo(() => {
    const grouped = [];
    let lastSection = null;
    navItems.forEach(item => {
      if (item.section !== lastSection) {
        grouped.push({ type: 'section', label: SECTION_LABELS[item.section] || item.section });
        lastSection = item.section;
      }
      grouped.push({ type: 'item', ...item });
    });
    return grouped;
  }, [navItems]);

  const roleColor = ROLE_COLORS[role] || '#1E3A5F';

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* ── Logo Header (Tap to collapse back into logo) ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onClose}
            title="Tap logo to collapse sidebar"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-extrabold text-white leading-tight tracking-tight">MineGuard AI</h1>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-500/30">
                  Open
                </span>
              </div>
              <p className="text-[10px] font-medium text-amber-400/70 leading-tight tracking-wider uppercase mt-0.5">Smart Governance</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Collapse sidebar ([ or Esc])"
            aria-label="Collapse sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto sidebar-scrollable">
          <div className="space-y-0.5">
            {sections.map((entry, i) => {
              if (entry.type === 'section') {
                return (
                  <div key={`section-${entry.label}`} className={`${i > 0 ? 'mt-5' : 'mt-1'} mb-2`}>
                    <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.12em] select-none">
                      {entry.label}
                    </p>
                  </div>
                );
              }

              const Icon = entry.icon;
              const isActive = entry.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(entry.path);

              return (
                <NavLink
                  key={entry.id}
                  to={entry.path}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13px] font-medium transition-all duration-150 relative
                    ${isActive
                      ? 'bg-gradient-to-r from-white/[0.12] to-white/[0.04] text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-r-full bg-amber-400" />
                  )}

                  <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />

                  <span className="flex-1 truncate">{entry.label}</span>

                  {entry.id === 'ai-insights' && (
                    <span className="text-[9px] font-bold tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 text-white px-1.5 py-0.5 rounded leading-none flex-shrink-0">
                      AI
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ── Collapse Bar Button ── */}
        <div className="px-4 py-2 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/[0.04]"
            title="Collapse sidebar into yellow logo ([ or Esc])"
          >
            <span className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <span>Collapse into Logo</span>
            </span>
            <kbd className="text-[10px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded font-mono font-medium">[</kbd>
          </button>
        </div>

        {/* ── User Panel ── */}
        {user && (
          <div className="border-t border-white/[0.06]">
            <div className="px-4 py-3.5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}BB)` }}
                >
                  {getInitials(user.fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white truncate leading-tight">{user.fullName}</p>
                  <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">{ROLE_LABELS[user.role]}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium text-slate-400 hover:text-red-400 bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.06] hover:border-red-500/20 transition-all duration-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
