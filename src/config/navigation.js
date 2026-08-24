import {
  LayoutDashboard, Mountain, ClipboardCheck, Search as SearchIcon,
  AlertTriangle, ShieldCheck, Leaf, HardHat, BrainCircuit,
  Bell, FileText, BarChart3, ScrollText, Users, Settings,
  Pickaxe, Shield,
} from 'lucide-react';
import { ROLES } from './roles';

const ALL = [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.MINE_OPERATOR, ROLES.AUDITOR];
const ADMIN_AUDITOR = [ROLES.ADMIN, ROLES.AUDITOR];

export const NAVIGATION = [
  // ── Overview
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ALL,
    section: 'OVERVIEW',
  },
  {
    id: 'mines',
    label: 'Mines',
    path: '/mines',
    icon: Pickaxe,
    roles: ALL,
    section: 'OVERVIEW',
  },

  // ── Governance
  {
    id: 'compliance',
    label: 'Compliance',
    path: '/compliance',
    icon: ClipboardCheck,
    roles: ALL,
    section: 'GOVERNANCE',
  },
  {
    id: 'inspections',
    label: 'Inspections',
    path: '/inspections',
    icon: SearchIcon,
    roles: ALL,
    section: 'GOVERNANCE',
  },
  {
    id: 'violations',
    label: 'Violations',
    path: '/violations',
    icon: AlertTriangle,
    roles: ALL,
    section: 'GOVERNANCE',
  },
  {
    id: 'corrective-actions',
    label: 'Corrective Actions',
    path: '/corrective-actions',
    icon: ShieldCheck,
    roles: ALL,
    section: 'GOVERNANCE',
  },

  // ── Monitoring
  {
    id: 'environment',
    label: 'Environment',
    path: '/environment',
    icon: Leaf,
    roles: ALL,
    section: 'MONITORING',
  },
  {
    id: 'safety',
    label: 'Safety',
    path: '/safety',
    icon: HardHat,
    roles: ALL,
    section: 'MONITORING',
  },
  {
    id: 'alerts',
    label: 'Alerts',
    path: '/alerts',
    icon: Bell,
    roles: ALL,
    section: 'MONITORING',
  },

  // ── Intelligence
  {
    id: 'ai-insights',
    label: 'AI Insights',
    path: '/ai-insights',
    icon: BrainCircuit,
    roles: ALL,
    section: 'INTELLIGENCE',
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: FileText,
    roles: ALL,
    section: 'INTELLIGENCE',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
    roles: ADMIN_AUDITOR,
    section: 'INTELLIGENCE',
  },

  // ── Administration
  {
    id: 'audit-logs',
    label: 'Audit Logs',
    path: '/audit-logs',
    icon: ScrollText,
    roles: ADMIN_AUDITOR,
    section: 'ADMIN',
  },
  {
    id: 'users',
    label: 'Users',
    path: '/users',
    icon: Users,
    roles: [ROLES.ADMIN],
    section: 'ADMIN',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    roles: [ROLES.ADMIN],
    section: 'ADMIN',
  },
];

export function getNavigationForRole(role) {
  return NAVIGATION.filter(item => item.roles.includes(role));
}
