import { useState, useMemo } from 'react';
import { mockCorrectiveActions, getCorrectiveActionStats } from '../../data/mockCorrectiveActions';
import { StatusBadge } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import DataTable from '../../components/common/DataTable';
import { formatDate } from '../../utils/formatters';
import { Wrench, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  open: { label: 'Open', color: '#E53E3E' },
  in_progress: { label: 'In Progress', color: '#ED8936' },
  submitted: { label: 'Submitted', color: '#3182CE' },
  under_verification: { label: 'Under Verification', color: '#805AD5' },
  completed: { label: 'Completed', color: '#38A169' },
  overdue: { label: 'Overdue', color: '#9B2C2C' },
};

export default function CorrectiveActionListPage() {
  const stats = getCorrectiveActionStats();
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => {
    return mockCorrectiveActions.filter(ca => {
      if (statusFilter && ca.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter]);

  const columns = [
    { id: 'id', header: 'ID', width: '120px', cell: r => <span className="text-mono text-xs text-blue-600">{r.actionId}</span> },
    { id: 'action', header: 'Required Action', cell: r => (
      <div><p className="text-sm font-medium text-gray-900 truncate-2">{r.requiredAction}</p>
        <p className="text-xs text-gray-500 mt-0.5">{r.mineName}</p></div>
    )},
    { id: 'violation', header: 'Violation', accessor: 'violationId', width: '120px', cell: r => <span className="text-mono text-xs">{r.violationId}</span> },
    { id: 'dept', header: 'Department', accessor: 'responsibleDepartment', width: '150px' },
    { id: 'deadline', header: 'Deadline', accessor: 'deadline', width: '110px',
      cell: r => <span className={`text-sm ${r.status === 'overdue' ? 'text-red-600 font-bold' : ''}`}>{formatDate(r.deadline)}</span>
    },
    { id: 'status', header: 'Status', width: '140px', cell: r => <StatusBadge status={r.status} statusConfig={STATUS_CONFIG} /> },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Corrective Actions" subtitle="Track remediation activities for confirmed violations" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPICard title="Total" value={stats.total} icon={Wrench} color="#1E3A5F" />
        <KPICard title="In Progress" value={stats.inProgress} icon={Clock} color="#ED8936" />
        <KPICard title="Completed" value={stats.completed} icon={CheckCircle} color="#38A169" />
        <KPICard title="Overdue" value={stats.overdue} icon={AlertTriangle} color="#9B2C2C" />
        <KPICard title="Open" value={stats.open} icon={XCircle} color="#E53E3E" />
      </div>
      <FilterBar>
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={Object.entries(STATUS_CONFIG).map(([v, c]) => ({ value: v, label: c.label }))} />
      </FilterBar>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={filtered} searchable />
      </div>
    </div>
  );
}
