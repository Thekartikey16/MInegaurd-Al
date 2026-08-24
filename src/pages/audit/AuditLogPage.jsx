import { mockAuditLogs } from '../../data/mockAuditLogs';
import { PageHeader } from '../../components/common/UIComponents';
import DataTable from '../../components/common/DataTable';
import { formatDateTime } from '../../utils/formatters';
import { ScrollText, Shield } from 'lucide-react';

const ROLE_COLORS = { admin: '#1E3A5F', inspector: '#2C5282', mine_operator: '#E8A838', auditor: '#805AD5' };

export default function AuditLogPage() {
  const sorted = [...mockAuditLogs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const columns = [
    { id: 'time', header: 'Timestamp', accessor: 'createdAt', width: '160px',
      cell: r => <span className="text-mono text-xs">{formatDateTime(r.createdAt)}</span>
    },
    { id: 'user', header: 'User', cell: r => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: ROLE_COLORS[r.role] }}>
          {r.userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{r.userName}</p>
          <p className="text-[10px] text-gray-400 capitalize">{r.role.replace('_', ' ')}</p>
        </div>
      </div>
    )},
    { id: 'action', header: 'Action', accessor: 'action', cell: r => <span className="text-sm font-medium">{r.action}</span> },
    { id: 'module', header: 'Module', accessor: 'module', width: '130px',
      cell: r => <span className="text-xs px-2 py-0.5 bg-gray-100 rounded font-medium">{r.module}</span>
    },
    { id: 'record', header: 'Record ID', width: '100px',
      cell: r => r.recordId ? <span className="text-mono text-xs text-blue-600">{r.recordId}</span> : <span className="text-gray-300">—</span>
    },
    { id: 'change', header: 'Change', cell: r => (
      <div className="text-xs">
        {r.previousValue && <span className="text-red-500 line-through mr-2">{r.previousValue}</span>}
        {r.newValue && <span className="text-green-600">{r.newValue}</span>}
      </div>
    )},
    { id: 'ip', header: 'IP', accessor: 'ipAddress', width: '110px',
      cell: r => <span className="text-mono text-xs text-gray-400">{r.ipAddress}</span>
    },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Audit Logs" subtitle="Immutable record of all system activities">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
          <Shield className="w-3 h-3" />
          Read-only — Logs cannot be modified
        </div>
      </PageHeader>
      <div className="card-flat overflow-hidden">
        <DataTable columns={columns} data={sorted} searchable searchPlaceholder="Search audit logs..." pageSize={15} />
      </div>
    </div>
  );
}
