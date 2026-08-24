import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMines } from '../../data/mockMines';
import { RiskBadge, StatusBadge } from '../../components/common/Badges';
import { PageHeader, FilterBar, FilterSelect } from '../../components/common/UIComponents';
import DataTable from '../../components/common/DataTable';
import { formatDate, formatScore, formatProduction } from '../../utils/formatters';
import { MINE_TYPES, MINE_STATUSES, INDIAN_STATES } from '../../config/constants';
import { Pickaxe, Plus, MapPin } from 'lucide-react';

const STATUS_CONFIG = {
  Active: { label: 'Active', color: '#38A169' },
  Inactive: { label: 'Inactive', color: '#718096' },
  Suspended: { label: 'Suspended', color: '#E53E3E' },
  'Under Review': { label: 'Under Review', color: '#ED8936' },
};

export default function MineListPage() {
  const navigate = useNavigate();
  const [stateFilter, setStateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  const filteredMines = useMemo(() => {
    return mockMines.filter(m => {
      if (stateFilter && m.state !== stateFilter) return false;
      if (typeFilter && m.mineType !== typeFilter) return false;
      if (statusFilter && m.status !== statusFilter) return false;
      if (riskFilter) {
        const r = m.riskScore;
        if (riskFilter === 'low' && r > 25) return false;
        if (riskFilter === 'medium' && (r <= 25 || r > 50)) return false;
        if (riskFilter === 'high' && (r <= 50 || r > 75)) return false;
        if (riskFilter === 'critical' && r <= 75) return false;
      }
      return true;
    });
  }, [stateFilter, typeFilter, statusFilter, riskFilter]);

  const columns = [
    {
      id: 'mineId', header: 'Mine ID', accessor: 'mineId', width: '110px',
      cell: (row) => <span className="text-mono text-blue-600 font-medium">{row.mineId}</span>,
    },
    {
      id: 'name', header: 'Mine Name', accessor: 'name',
      cell: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{row.state}, {row.district}</p>
        </div>
      ),
    },
    {
      id: 'type', header: 'Type', accessor: 'mineType', width: '100px',
    },
    {
      id: 'status', header: 'Status', width: '120px',
      cell: (row) => <StatusBadge status={row.status} statusConfig={STATUS_CONFIG} />,
    },
    {
      id: 'complianceScore', header: 'Compliance', accessor: 'complianceScore', width: '100px',
      cell: (row) => {
        const color = row.complianceScore >= 80 ? '#38A169' : row.complianceScore >= 60 ? '#ED8936' : '#E53E3E';
        return (
          <div className="flex items-center gap-2">
            <div className="w-full max-w-[60px] h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${row.complianceScore}%`, background: color }} />
            </div>
            <span className="text-sm font-semibold" style={{ color }}>{row.complianceScore}%</span>
          </div>
        );
      },
    },
    {
      id: 'riskScore', header: 'Risk', accessor: 'riskScore', width: '120px',
      cell: (row) => {
        const level = row.riskScore <= 25 ? 'low' : row.riskScore <= 50 ? 'medium' : row.riskScore <= 75 ? 'high' : 'critical';
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{row.riskScore}</span>
            <RiskBadge level={level} size="sm" />
          </div>
        );
      },
    },
    {
      id: 'violations', header: 'Violations', accessor: 'openViolations', width: '90px',
      cell: (row) => (
        <span className={`text-sm font-semibold ${row.openViolations > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {row.openViolations}
        </span>
      ),
    },
    {
      id: 'lastInspection', header: 'Last Inspection', accessor: 'lastInspection', width: '120px',
      cell: (row) => <span className="text-sm text-gray-600">{formatDate(row.lastInspection)}</span>,
    },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Mine Management" subtitle={`${mockMines.length} registered mines across India`}>
        <button className="btn btn-primary" onClick={() => navigate('/mines/register')}>
          <Plus className="w-4 h-4" /> Register Mine
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/analytics/map')}>
          <MapPin className="w-4 h-4" /> Map View
        </button>
      </PageHeader>

      <FilterBar>
        <FilterSelect label="State" value={stateFilter} onChange={setStateFilter}
          options={[...new Set(mockMines.map(m => m.state))]} />
        <FilterSelect label="Mine Type" value={typeFilter} onChange={setTypeFilter}
          options={MINE_TYPES} />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}
          options={MINE_STATUSES} />
        <FilterSelect label="Risk Level" value={riskFilter} onChange={setRiskFilter}
          options={[
            { value: 'low', label: 'Low (0-25)' },
            { value: 'medium', label: 'Medium (26-50)' },
            { value: 'high', label: 'High (51-75)' },
            { value: 'critical', label: 'Critical (76-100)' },
          ]} />
      </FilterBar>

      <div className="card-flat overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredMines}
          onRowClick={(row) => navigate(`/mines/${row.id}`)}
          searchable
          searchPlaceholder="Search by mine name, ID, or location..."
          emptyMessage="No mines match the selected filters"
        />
      </div>
    </div>
  );
}
