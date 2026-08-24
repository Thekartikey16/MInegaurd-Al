import { mockSafety, mockSafetyStats } from '../../data/mockSafety';
import { mockViolations } from '../../data/mockViolations';
import { PageHeader, ChartCard } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import { RiskBadge, StatusBadge } from '../../components/common/Badges';
import { formatDate } from '../../utils/formatters';
import { HardHat, AlertTriangle, Users, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#E53E3E', '#ED8936', '#38A169', '#3182CE'];

export default function SafetyPage() {
  const stats = mockSafetyStats;
  const safetyViolations = mockViolations.filter(v => v.category === 'Safety');

  const incidentsByType = Object.entries(
    mockSafety.reduce((acc, s) => { acc[s.incidentType] = (acc[s.incidentType] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const severityDist = Object.entries(
    mockSafety.reduce((acc, s) => { acc[s.severity] = (acc[s.severity] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  return (
    <div className="page-container">
      <PageHeader title="Safety Monitoring" subtitle="Track safety incidents, violations, and preparedness" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Incidents" value={stats.totalIncidents} icon={AlertTriangle} color="#E53E3E" />
        <KPICard title="Critical Incidents" value={stats.criticalIncidents} icon={HeartPulse} color="#9B2C2C" />
        <KPICard title="Affected Workers" value={stats.totalAffectedWorkers} icon={Users} color="#ED8936" />
        <KPICard title="PPE Compliance" value={`${stats.ppeComplianceRate}%`} icon={HardHat} color={stats.ppeComplianceRate >= 90 ? '#38A169' : '#ED8936'} />
      </div>

      {/* Extra Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card-flat p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.safetyTrainingCompletion}%</p>
          <p className="text-xs text-gray-500">Training Completion</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${stats.safetyTrainingCompletion}%` }} />
          </div>
        </div>
        <div className="card-flat p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.resolvedIncidents}/{stats.totalIncidents}</p>
          <p className="text-xs text-gray-500">Resolved Incidents</p>
        </div>
        <div className="card-flat p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{stats.emergencyDrillsCompleted}/{stats.emergencyDrillsRequired}</p>
          <p className="text-xs text-gray-500">Emergency Drills</p>
        </div>
        <div className="card-flat p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{safetyViolations.length}</p>
          <p className="text-xs text-gray-500">Safety Violations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Incidents by Type" subtitle="Distribution of incident categories">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={incidentsByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#E53E3E" radius={[6, 6, 0, 0]} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Incident Severity" subtitle="Severity distribution of all incidents">
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie data={severityDist} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} strokeWidth={0}>
                  {severityDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {severityDist.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Incident List */}
      <div className="card-flat overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">Recent Safety Incidents</h3>
        </div>
        <table className="data-table">
          <thead><tr><th>Type</th><th>Mine</th><th>Severity</th><th>Date</th><th>Workers Affected</th><th>Status</th></tr></thead>
          <tbody>
            {mockSafety.map(s => (
              <tr key={s.id}>
                <td className="font-medium">{s.incidentType}</td>
                <td>{s.mineName}</td>
                <td><RiskBadge level={s.severity} size="sm" /></td>
                <td>{formatDate(s.incidentDate)}</td>
                <td>{s.affectedWorkers}</td>
                <td><StatusBadge status={s.status} statusConfig={{
                  resolved: { label: 'Resolved', color: '#38A169' },
                  under_investigation: { label: 'Under Investigation', color: '#ED8936' },
                }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
