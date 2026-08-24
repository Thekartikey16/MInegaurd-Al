import { useState, useMemo } from 'react';
import { mockAlerts, getAlertStats } from '../../data/mockAlerts';
import { RiskBadge } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import { formatDateTime, formatRelativeTime } from '../../utils/formatters';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, Eye } from 'lucide-react';

const SEVERITY_ICONS = { critical: AlertTriangle, high: AlertCircle, medium: Info, low: Bell };
const SEVERITY_COLORS = { critical: '#9B2C2C', high: '#E53E3E', medium: '#ED8936', low: '#3182CE' };

export default function AlertsPage() {
  const stats = getAlertStats();
  const [severityFilter, setSeverityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return [...mockAlerts].filter(a => {
      if (severityFilter && a.severity !== severityFilter) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      return true;
    }).sort((a, b) => {
      const sevOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (a.status === 'resolved' && b.status !== 'resolved') return 1;
      if (b.status === 'resolved' && a.status !== 'resolved') return -1;
      return (sevOrder[a.severity] || 0) - (sevOrder[b.severity] || 0);
    });
  }, [severityFilter, statusFilter]);

  return (
    <div className="page-container">
      <PageHeader title="Alert Center" subtitle="Centralized notification and alert management" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Active Alerts" value={stats.active} icon={Bell} color="#ED8936" />
        <KPICard title="Critical" value={stats.critical} icon={AlertTriangle} color="#9B2C2C" />
        <KPICard title="High Priority" value={stats.high} icon={AlertCircle} color="#E53E3E" />
        <KPICard title="Total Alerts" value={stats.total} icon={Info} color="#3182CE" />
      </div>
      <FilterBar>
        <FilterSelect label="Severity" value={severityFilter} onChange={setSeverityFilter}
          options={['critical', 'high', 'medium', 'low'].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))} />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={['active', 'acknowledged', 'resolved'].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))} />
      </FilterBar>
      <div className="space-y-3">
        {filtered.map(alert => {
          const Icon = SEVERITY_ICONS[alert.severity];
          const color = SEVERITY_COLORS[alert.severity];
          const isResolved = alert.status === 'resolved';
          return (
            <div key={alert.id} className={`card-flat p-5 flex items-start gap-4 ${isResolved ? 'opacity-60' : ''} ${alert.severity === 'critical' && !isResolved ? 'border-red-200 bg-red-50/50' : ''}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <RiskBadge level={alert.severity} size="sm" />
                  <span className="text-xs text-gray-400">{alert.alertId}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${isResolved ? 'bg-green-100 text-green-700' : alert.status === 'acknowledged' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-sm text-gray-900 font-medium">{alert.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{alert.mineName}</span>
                  <span>•</span>
                  <span>Assigned: {alert.assignedToName}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(alert.createdAt)}</span>
                </div>
                {alert.actionTaken && (
                  <p className="text-xs text-blue-600 mt-2 bg-blue-50 px-2 py-1 rounded inline-block">
                    Action: {alert.actionTaken}
                  </p>
                )}
              </div>
              {!isResolved && (
                <button className="btn btn-sm btn-secondary flex-shrink-0">
                  <Eye className="w-3 h-3" /> Review
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
