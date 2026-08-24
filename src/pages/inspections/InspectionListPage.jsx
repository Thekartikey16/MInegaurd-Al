import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockInspections, getInspectionStats } from '../../data/mockInspections';
import { StatusBadge } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import DataTable from '../../components/common/DataTable';
import { formatDate } from '../../utils/formatters';
import { Search, CheckCircle, Calendar, Clock, Plus } from 'lucide-react';

const STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', color: '#3182CE' },
  in_progress: { label: 'In Progress', color: '#ED8936' },
  completed: { label: 'Completed', color: '#38A169' },
  under_review: { label: 'Under Review', color: '#805AD5' },
};

export default function InspectionListPage() {
  const navigate = useNavigate();
  const stats = getInspectionStats();
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = useMemo(() => {
    return mockInspections.filter(i => {
      if (statusFilter && i.status !== statusFilter) return false;
      if (typeFilter && i.inspectionType !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter]);

  const columns = [
    { id: 'id', header: 'ID', accessor: 'inspectionId', width: '130px', cell: r => <span className="text-mono text-xs text-blue-600">{r.inspectionId}</span> },
    { id: 'mine', header: 'Mine', cell: r => <span className="text-sm font-medium">{r.mineName}</span> },
    { id: 'inspector', header: 'Inspector', accessor: 'inspectorName' },
    { id: 'type', header: 'Type', accessor: 'inspectionType', width: '100px',
      cell: r => <span className={`text-xs font-semibold px-2 py-0.5 rounded ${r.inspectionType === 'Emergency' ? 'bg-red-100 text-red-700' : r.inspectionType === 'Special' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{r.inspectionType}</span>
    },
    { id: 'date', header: 'Date', accessor: 'scheduledDate', width: '110px', cell: r => formatDate(r.scheduledDate) },
    { id: 'score', header: 'Score', accessor: 'complianceScore', width: '80px',
      cell: r => r.complianceScore ? (
        <span className={`text-sm font-bold ${r.complianceScore >= 80 ? 'text-green-600' : r.complianceScore >= 60 ? 'text-orange-500' : 'text-red-600'}`}>{r.complianceScore}%</span>
      ) : <span className="text-gray-400">—</span>
    },
    { id: 'violations', header: 'Violations', accessor: 'violationsFound', width: '90px',
      cell: r => <span className={`font-semibold ${r.violationsFound > 0 ? 'text-red-600' : 'text-green-600'}`}>{r.violationsFound}</span>
    },
    { id: 'status', header: 'Status', width: '130px', cell: r => <StatusBadge status={r.status} statusConfig={STATUS_CONFIG} /> },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Inspections" subtitle="Manage mine inspections and findings">
        <button className="btn btn-primary"><Plus className="w-4 h-4" /> New Inspection</button>
      </PageHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total" value={stats.total} icon={Search} color="#1E3A5F" />
        <KPICard title="Completed" value={stats.completed} icon={CheckCircle} color="#38A169" />
        <KPICard title="Scheduled" value={stats.scheduled} icon={Calendar} color="#3182CE" />
        <KPICard title="In Progress" value={stats.inProgress} icon={Clock} color="#ED8936" />
      </div>
      <FilterBar>
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={Object.entries(STATUS_CONFIG).map(([v, c]) => ({ value: v, label: c.label }))} />
        <FilterSelect label="Type" value={typeFilter} onChange={setTypeFilter}
          options={['Routine', 'Special', 'Emergency', 'Follow-up']} />
      </FilterBar>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={filtered} searchable searchPlaceholder="Search inspections..." />
      </div>
    </div>
  );
}
