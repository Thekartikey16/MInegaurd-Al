import { useState, useMemo } from 'react';
import { mockCompliance, getComplianceStats } from '../../data/mockCompliance';
import { RiskBadge, StatusBadge } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import DataTable from '../../components/common/DataTable';
import { formatDate } from '../../utils/formatters';
import { COMPLIANCE_CATEGORIES } from '../../config/constants';
import { ClipboardCheck, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  compliant: { label: 'Compliant', color: '#38A169' },
  pending: { label: 'Pending', color: '#ED8936' },
  overdue: { label: 'Overdue', color: '#E53E3E' },
  non_compliant: { label: 'Non-Compliant', color: '#9B2C2C' },
  under_review: { label: 'Under Review', color: '#3182CE' },
};

export default function ComplianceListPage() {
  const stats = getComplianceStats();
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filtered = useMemo(() => {
    return mockCompliance.filter(c => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (categoryFilter && c.category !== categoryFilter) return false;
      return true;
    });
  }, [statusFilter, categoryFilter]);

  const columns = [
    { id: 'id', header: 'ID', accessor: 'id', width: '80px', cell: r => <span className="text-mono text-xs">{r.id}</span> },
    { id: 'desc', header: 'Requirement', cell: r => (
      <div><p className="text-sm font-medium text-gray-900">{r.description}</p><p className="text-xs text-gray-500">{r.regulationName}</p></div>
    )},
    { id: 'mine', header: 'Mine', accessor: 'mineName', cell: r => <span className="text-sm">{r.mineName}</span> },
    { id: 'category', header: 'Category', accessor: 'category', width: '120px' },
    { id: 'due', header: 'Due Date', accessor: 'dueDate', width: '110px', cell: r => <span className={`text-sm ${r.status === 'overdue' ? 'text-red-600 font-semibold' : ''}`}>{formatDate(r.dueDate)}</span> },
    { id: 'status', header: 'Status', width: '130px', cell: r => <StatusBadge status={r.status} statusConfig={STATUS_CONFIG} /> },
    { id: 'risk', header: 'Risk', width: '100px', cell: r => <RiskBadge level={r.riskLevel} size="sm" /> },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Compliance Management" subtitle="Track and manage regulatory compliance requirements" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPICard title="Total" value={stats.total} icon={ClipboardCheck} color="#1E3A5F" />
        <KPICard title="Compliant" value={stats.compliant} icon={CheckCircle} color="#38A169" />
        <KPICard title="Pending" value={stats.pending} icon={Clock} color="#ED8936" />
        <KPICard title="Overdue" value={stats.overdue} icon={AlertTriangle} color="#E53E3E" />
        <KPICard title="Non-Compliant" value={stats.nonCompliant} icon={XCircle} color="#9B2C2C" />
      </div>
      <FilterBar>
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={Object.entries(STATUS_CONFIG).map(([v, c]) => ({ value: v, label: c.label }))} />
        <FilterSelect label="Category" value={categoryFilter} onChange={setCategoryFilter}
          options={COMPLIANCE_CATEGORIES} />
      </FilterBar>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={filtered} searchable searchPlaceholder="Search compliance requirements..." />
      </div>
    </div>
  );
}
