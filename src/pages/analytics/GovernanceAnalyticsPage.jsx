import { useMemo } from 'react';
import { mockMines } from '../../data/mockMines';
import { mockViolations } from '../../data/mockViolations';
import { mockInspections } from '../../data/mockInspections';
import { PageHeader, ChartCard } from '../../components/common/UIComponents';
import { RiskBadge } from '../../components/common/Badges';
import { BarChart3, TrendingUp, MapPin } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#38A169', '#ED8936', '#E53E3E', '#9B2C2C', '#3182CE', '#805AD5'];

export default function GovernanceAnalyticsPage() {
  const navigate = useNavigate();

  const stateWise = useMemo(() => {
    const states = {};
    mockMines.forEach(m => {
      if (!states[m.state]) states[m.state] = { mines: 0, avgCompliance: 0, totalViolations: 0, scores: [] };
      states[m.state].mines++;
      states[m.state].scores.push(m.complianceScore);
      states[m.state].totalViolations += m.openViolations;
    });
    return Object.entries(states).map(([state, data]) => ({
      state: state.substring(0, 12),
      fullState: state,
      mines: data.mines,
      compliance: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
      violations: data.totalViolations,
    })).sort((a, b) => b.compliance - a.compliance);
  }, []);

  const mineWise = useMemo(() => {
    return mockMines.map(m => ({
      name: m.name.split(' ').slice(0, 2).join(' '),
      compliance: m.complianceScore,
      risk: m.riskScore,
    })).sort((a, b) => a.compliance - b.compliance);
  }, []);

  const violationByCategory = useMemo(() => {
    const cats = {};
    mockViolations.forEach(v => { cats[v.category] = (cats[v.category] || 0) + 1; });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Governance Analytics" subtitle="Government-level compliance analytics across all mines">
        <button className="btn btn-secondary" onClick={() => navigate('/analytics/map')}>
          <MapPin className="w-4 h-4" /> Map View
        </button>
      </PageHeader>

      {/* State-wise compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="State-wise Compliance" subtitle="Average compliance score by state">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={stateWise}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" fontSize={11} />
              <YAxis fontSize={12} domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="compliance" name="Compliance %" radius={[6, 6, 0, 0]} barSize={35}>
                {stateWise.map((entry, i) => (
                  <Cell key={i} fill={entry.compliance >= 80 ? '#38A169' : entry.compliance >= 60 ? '#ED8936' : '#E53E3E'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Violations by Category" subtitle="Distribution across compliance categories">
          <div className="flex items-center">
            <ResponsiveContainer width="55%" height={280}>
              <PieChart>
                <Pie data={violationByCategory} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} strokeWidth={0}>
                  {violationByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {violationByCategory.map((item, i) => (
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

      {/* Mine-wise comparison */}
      <ChartCard title="Mine-wise Compliance vs Risk" subtitle="Compliance score and risk score for each mine" className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mineWise}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={10} angle={-20} textAnchor="end" height={60} />
            <YAxis fontSize={12} domain={[0, 100]} />
            <Tooltip />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="compliance" name="Compliance Score" fill="#38A169" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="risk" name="Risk Score" fill="#E53E3E" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Summary Table */}
      <div className="card-flat overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">State-wise Summary</h3>
        </div>
        <table className="data-table">
          <thead><tr><th>State</th><th>Mines</th><th>Avg Compliance</th><th>Open Violations</th></tr></thead>
          <tbody>
            {stateWise.map(s => (
              <tr key={s.fullState}>
                <td className="font-medium">{s.fullState}</td>
                <td>{s.mines}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.compliance}%`, background: s.compliance >= 80 ? '#38A169' : s.compliance >= 60 ? '#ED8936' : '#E53E3E' }} />
                    </div>
                    <span className="text-sm font-semibold">{s.compliance}%</span>
                  </div>
                </td>
                <td><span className={`font-semibold ${s.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>{s.violations}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
