import { useState, useMemo } from 'react';
import { mockViolations, getViolationStats } from '../../data/mockViolations';
import { RiskBadge, StatusBadge, AIBadge, ConfidenceScore } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import DataTable from '../../components/common/DataTable';
import { formatDate } from '../../utils/formatters';
import { COMPLIANCE_CATEGORIES } from '../../config/constants';
import { AlertTriangle, XCircle, ShieldCheck, BrainCircuit, Eye } from 'lucide-react';

const STATUS_CONFIG = {
  open: { label: 'Open', color: '#E53E3E' },
  under_investigation: { label: 'Under Investigation', color: '#ED8936' },
  confirmed: { label: 'Confirmed', color: '#9B2C2C' },
  remediation: { label: 'Remediation', color: '#3182CE' },
  resolved: { label: 'Resolved', color: '#38A169' },
  closed: { label: 'Closed', color: '#718096' },
};

export default function ViolationListPage() {
  const stats = getViolationStats();
  const [statusFilter, setStatusFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filtered = useMemo(() => {
    return mockViolations.filter(v => {
      if (statusFilter && v.status !== statusFilter) return false;
      if (severityFilter && v.severity !== severityFilter) return false;
      if (categoryFilter && v.category !== categoryFilter) return false;
      return true;
    });
  }, [statusFilter, severityFilter, categoryFilter]);

  const columns = [
    { id: 'id', header: 'ID', width: '120px', cell: r => <span className="text-mono text-xs text-blue-600">{r.violationId}</span> },
    { id: 'desc', header: 'Description', cell: r => (
      <div>
        <p className="text-sm font-medium text-gray-900 truncate-2">{r.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{r.mineName}</span>
          {r.aiDetected && <AIBadge small />}
        </div>
      </div>
    )},
    { id: 'category', header: 'Category', accessor: 'category', width: '110px' },
    { id: 'severity', header: 'Severity', width: '100px', cell: r => <RiskBadge level={r.severity} size="sm" /> },
    { id: 'date', header: 'Detected', accessor: 'detectedDate', width: '100px', cell: r => formatDate(r.detectedDate) },
    { id: 'deadline', header: 'Deadline', accessor: 'resolutionDeadline', width: '100px',
      cell: r => <span className={r.status !== 'resolved' && new Date(r.resolutionDeadline) < new Date() ? 'text-red-600 font-semibold' : ''}>
        {formatDate(r.resolutionDeadline)}</span>
    },
    { id: 'status', header: 'Status', width: '150px', cell: r => <StatusBadge status={r.status} statusConfig={STATUS_CONFIG} /> },
    { id: 'ai', header: 'AI', width: '80px', sortable: false,
      cell: r => r.aiDetected ? <ConfidenceScore value={r.aiConfidence} size="sm" /> : <span className="text-gray-300">—</span>
    },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Violations" subtitle="Track and manage compliance violations across all mines" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Violations" value={stats.total} icon={AlertTriangle} color="#E53E3E" />
        <KPICard title="Open" value={stats.open} icon={XCircle} color="#ED8936" />
        <KPICard title="Critical" value={stats.critical} icon={AlertTriangle} color="#9B2C2C" />
        <KPICard title="AI Detected" value={stats.aiDetected} icon={BrainCircuit} color="#805AD5" subtitle={`${Math.round(stats.aiDetected / stats.total * 100)}% of total`} />
      </div>
      <FilterBar>
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={Object.entries(STATUS_CONFIG).map(([v, c]) => ({ value: v, label: c.label }))} />
        <FilterSelect label="Severity" value={severityFilter} onChange={setSeverityFilter}
          options={['low', 'medium', 'high', 'critical'].map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))} />
        <FilterSelect label="Category" value={categoryFilter} onChange={setCategoryFilter}
          options={COMPLIANCE_CATEGORIES} />
      </FilterBar>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={filtered} searchable searchPlaceholder="Search violations..." />
      </div>
    </div>
  );
}
