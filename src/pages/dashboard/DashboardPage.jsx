import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import KPICard from '../../components/common/KPICard';
import { RiskBadge, AIBadge } from '../../components/common/Badges';
import { ChartCard, PageHeader } from '../../components/common/UIComponents';
import { mockMines } from '../../data/mockMines';
import { mockViolations, getViolationStats } from '../../data/mockViolations';
import { mockInspections, getInspectionStats } from '../../data/mockInspections';
import { mockAlerts, getAlertStats } from '../../data/mockAlerts';
import { mockCompliance, getComplianceStats } from '../../data/mockCompliance';
import { mockAIInsights } from '../../data/mockAIInsights';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import {
  Pickaxe, ShieldCheck, AlertTriangle, ClipboardCheck,
  Bell, Search, TrendingUp, BrainCircuit, Eye,
  ArrowRight, Clock, ShieldAlert, Activity
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, Legend,
} from 'recharts';

const CHART_COLORS = ['#38A169', '#ED8936', '#E53E3E', '#9B2C2C'];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const violationStats = getViolationStats();
  const inspectionStats = getInspectionStats();
  const alertStats = getAlertStats();
  const complianceStats = getComplianceStats();

  const riskDistribution = useMemo(() => {
    const dist = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    mockMines.forEach(m => {
      if (m.riskScore <= 25) dist.Low++;
      else if (m.riskScore <= 50) dist.Medium++;
      else if (m.riskScore <= 75) dist.High++;
      else dist.Critical++;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  }, []);

  const complianceByStatus = useMemo(() => [
    { name: 'Compliant', value: complianceStats.compliant, color: '#38A169' },
    { name: 'Pending', value: complianceStats.pending, color: '#ED8936' },
    { name: 'Overdue', value: complianceStats.overdue, color: '#E53E3E' },
    { name: 'Non-Compliant', value: complianceStats.nonCompliant, color: '#9B2C2C' },
    { name: 'Under Review', value: complianceStats.underReview, color: '#3182CE' },
  ], [complianceStats]);

  const violationBySeverity = useMemo(() => {
    const sev = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    mockViolations.forEach(v => {
      const key = v.severity.charAt(0).toUpperCase() + v.severity.slice(1);
      sev[key] = (sev[key] || 0) + 1;
    });
    return Object.entries(sev).map(([name, count]) => ({ name, count }));
  }, []);

  const complianceTrend = [
    { month: 'Mar', rate: 72, violations: 8 },
    { month: 'Apr', rate: 68, violations: 12 },
    { month: 'May', rate: 70, violations: 10 },
    { month: 'Jun', rate: 74, violations: 9 },
    { month: 'Jul', rate: 78, violations: 7 },
    { month: 'Aug', rate: 76, violations: 8 },
  ];

  const highRiskMines = mockMines.filter(m => m.riskScore > 50).sort((a, b) => b.riskScore - a.riskScore);
  const recentAlerts = [...mockAlerts].filter(a => a.status !== 'resolved').slice(0, 5);
  const upcomingDeadlines = [...mockCompliance].filter(c => c.status === 'pending').sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 5);
  const recentInsights = mockAIInsights.filter(i => i.verificationStatus === 'pending').slice(0, 3);

  const compliantMines = mockMines.filter(m => m.complianceScore >= 80).length;
  const atRiskMines = mockMines.filter(m => m.riskScore > 50 && m.riskScore <= 75).length;
  const criticalMines = mockMines.filter(m => m.riskScore > 75).length;
  const overdueItems = complianceStats.overdue;

  return (
    <div className="page-container space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.fullName?.split(' ')[0]}`}
        subtitle="AI-Powered Coal Mine Governance & Compliance Monitoring Dashboard"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Mines" value={mockMines.length} icon={Pickaxe} color="#1E3A5F"
          subtitle={`${compliantMines} compliant`} trend="up" trendValue="+2 this quarter"
          onClick={() => navigate('/mines')} />
        <KPICard title="Open Violations" value={violationStats.open} icon={AlertTriangle} color="#E53E3E"
          subtitle={`${violationStats.critical} critical`} trend="down" trendValue="-3 from last month"
          onClick={() => navigate('/violations')} />
        <KPICard title="Pending Inspections" value={inspectionStats.scheduled} icon={Search} color="#3182CE"
          subtitle={`${inspectionStats.completed} completed`}
          onClick={() => navigate('/inspections')} />
        <KPICard title="Active Alerts" value={alertStats.active} icon={Bell} color="#ED8936"
          subtitle={`${alertStats.critical} critical alerts`}
          onClick={() => navigate('/alerts')} />
      </div>

      {/* Second row KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Compliant Mines" value={compliantMines} icon={ShieldCheck} color="#38A169"
          subtitle={`${Math.round(compliantMines / mockMines.length * 100)}% of total`} />
        <KPICard title="At-Risk Mines" value={atRiskMines} icon={ShieldAlert} color="#ED8936" />
        <KPICard title="Critical Mines" value={criticalMines} icon={Activity} color="#9B2C2C"
          subtitle="Immediate attention required" />
        <KPICard title="Overdue Compliance" value={overdueItems} icon={Clock} color="#E53E3E"
          subtitle="Action needed"
          onClick={() => navigate('/compliance')} />
      </div>

      {/* Risk Distribution + Compliance Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Risk Distribution" subtitle="Current risk level across all mines">
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie data={riskDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  paddingAngle={4} strokeWidth={0}>
                  {riskDistribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {riskDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: CHART_COLORS[i] }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Compliance Status" subtitle="Current compliance record distribution">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={complianceByStatus} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" fontSize={12} />
              <YAxis type="category" dataKey="name" fontSize={12} width={95} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                {complianceByStatus.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Compliance Trend + Violations by Severity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Compliance Rate Trend" subtitle="Monthly compliance rate & violation count">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={complianceTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="rate" name="Compliance %" stroke="#38A169" fill="#38A16920" strokeWidth={2} />
              <Area type="monotone" dataKey="violations" name="Violations" stroke="#E53E3E" fill="#E53E3E15" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Violations by Severity" subtitle="Distribution of all violation severities">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={violationBySeverity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                {violationBySeverity.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* High Risk Mines + Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Risk Mines */}
        <div className="card-flat p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">High-Risk Mines</h3>
              <p className="text-xs text-gray-500">Mines requiring immediate attention</p>
            </div>
            <button onClick={() => navigate('/mines')} className="btn btn-ghost btn-sm text-blue-600">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {highRiskMines.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No high-risk mines</p>
            ) : (
              highRiskMines.map(mine => (
                <div key={mine.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => navigate(`/mines/${mine.id}`)}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{mine.name}</p>
                    <p className="text-xs text-gray-500">{mine.state} • {mine.district}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{mine.riskScore}</p>
                      <p className="text-[10px] text-gray-400">Risk Score</p>
                    </div>
                    <RiskBadge level={mine.riskScore > 75 ? 'critical' : 'high'} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card-flat p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Recent Alerts</h3>
              <p className="text-xs text-gray-500">Active and unresolved notifications</p>
            </div>
            <button onClick={() => navigate('/alerts')} className="btn btn-ghost btn-sm text-blue-600">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map(alert => {
              const severityColors = { critical: '#9B2C2C', high: '#E53E3E', medium: '#ED8936', low: '#3182CE' };
              return (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background: severityColors[alert.severity] }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900 leading-snug">{alert.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-gray-400">{alert.mineName}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[11px] text-gray-400">{formatRelativeTime(alert.createdAt)}</span>
                    </div>
                  </div>
                  <span className="badge text-[10px]"
                    style={{ background: `${severityColors[alert.severity]}15`, color: severityColors[alert.severity] }}>
                    {alert.severity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="card-flat p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Upcoming Compliance Deadlines</h3>
              <p className="text-xs text-gray-500">Pending compliance submissions</p>
            </div>
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.description}</p>
                  <p className="text-xs text-gray-500">{item.mineName}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{formatDate(item.dueDate)}</p>
                  <p className="text-[10px] text-gray-400">Due Date</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card-flat p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-900">AI Insights</h3>
              <AIBadge small />
            </div>
            <button onClick={() => navigate('/ai-insights')} className="btn btn-ghost btn-sm text-blue-600">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentInsights.map(insight => (
              <div key={insight.id} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-lg">
                <div className="flex items-center gap-2 mb-1.5">
                  <BrainCircuit className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700">{insight.mineName}</span>
                  <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-snug">{insight.insightText.substring(0, 120)}...</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">
                    ⏳ Pending Verification
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
