import { mockUsers } from '../../data/mockUsers';
import { PageHeader } from '../../components/common/UIComponents';
import DataTable from '../../components/common/DataTable';
import { ROLE_LABELS, ROLE_COLORS } from '../../config/roles';
import { formatDateTime, getInitials } from '../../utils/formatters';
import { Users, Plus, Shield, CheckCircle, XCircle } from 'lucide-react';
import KPICard from '../../components/common/KPICard';

export default function UserManagementPage() {
  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessor: 'fullName',
      cell: r => (
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${ROLE_COLORS[r.role]}, ${ROLE_COLORS[r.role]}BB)` }}
          >
            {getInitials(r.fullName)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">{r.fullName}</p>
            <p className="text-xs text-gray-500">{r.email}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      width: '180px',
      cell: r => (
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded"
          style={{ background: `${ROLE_COLORS[r.role]}15`, color: ROLE_COLORS[r.role] }}
        >
          {ROLE_LABELS[r.role]}
        </span>
      ),
    },
    {
      id: 'dept',
      header: 'Department',
      accessor: 'department',
    },
    {
      id: 'designation',
      header: 'Designation',
      accessor: 'designation',
    },
    {
      id: 'phone',
      header: 'Phone',
      accessor: 'phone',
      width: '140px',
      cell: r => <span className="text-sm text-gray-600">{r.phone}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      width: '90px',
      cell: r => (
        <span className={`flex items-center gap-1 text-xs font-semibold ${r.isActive ? 'text-green-600' : 'text-gray-400'}`}>
          {r.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {r.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'lastLogin',
      header: 'Last Login',
      width: '150px',
      cell: r => <span className="text-xs text-gray-500">{formatDateTime(r.lastLogin)}</span>,
    },
  ];

  return (
    <div className="page-container">
      <PageHeader title="User Management" subtitle="Manage system users and access control">
        <button className="btn btn-primary"><Plus className="w-4 h-4" /> Add User</button>
      </PageHeader>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Users" value={mockUsers.length} icon={Users} color="#1E3A5F" />
        <KPICard title="Active" value={mockUsers.filter(u => u.isActive).length} icon={CheckCircle} color="#38A169" />
        <KPICard title="Admins" value={mockUsers.filter(u => u.role === 'admin').length} icon={Shield} color="#805AD5" />
        <KPICard title="Inspectors" value={mockUsers.filter(u => u.role === 'inspector').length} icon={Users} color="#2C5282" />
      </div>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={mockUsers} searchable searchPlaceholder="Search users by name, email, or department..." />
      </div>
    </div>
  );
}
