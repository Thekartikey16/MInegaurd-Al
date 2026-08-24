import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockMines, getMineById } from '../../data/mockMines';
import { getViolationsByMine } from '../../data/mockViolations';
import { getComplianceByMine } from '../../data/mockCompliance';
import { getInspectionsByMine } from '../../data/mockInspections';
import { getCorrectiveActionsByMine } from '../../data/mockCorrectiveActions';
import { getDocumentsByMine } from '../../data/mockDocuments';
import { getSafetyByMine } from '../../data/mockSafety';
import { getLatestReadings } from '../../data/mockEnvironment';
import { PARAMETER_CONFIG } from '../../data/mockEnvironment';
import { calculateRiskScore, generateRecommendations } from '../../ai/riskEngine';
import { RiskBadge, StatusBadge, AIBadge, ConfidenceScore } from '../../components/common/Badges';
import { PageHeader, TabNav, EmptyState } from '../../components/common/UIComponents';
import { formatDate, formatProduction, formatNumber } from '../../utils/formatters';
import {
  ArrowLeft, MapPin, Users, Factory, Calendar, ShieldCheck,
  AlertTriangle, Leaf, FileText, Wrench, BrainCircuit, Activity,
  TrendingUp, Clock, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const COMPLIANCE_STATUS_CONFIG = {
  compliant: { label: 'Compliant', color: '#38A169' },
  pending: { label: 'Pending', color: '#ED8936' },
  overdue: { label: 'Overdue', color: '#E53E3E' },
  non_compliant: { label: 'Non-Compliant', color: '#9B2C2C' },
  under_review: { label: 'Under Review', color: '#3182CE' },
};

const VIOLATION_STATUS_CONFIG = {
  open: { label: 'Open', color: '#E53E3E' },
  under_investigation: { label: 'Under Investigation', color: '#ED8936' },
  confirmed: { label: 'Confirmed', color: '#9B2C2C' },
  remediation: { label: 'Remediation', color: '#3182CE' },
  resolved: { label: 'Resolved', color: '#38A169' },
  closed: { label: 'Closed', color: '#718096' },
};

export default function MineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const mine = getMineById(id);
  if (!mine) return <EmptyState title="Mine Not Found" description="The requested mine could not be found." />;

  const violations = getViolationsByMine(mine.id);
  const compliance = getComplianceByMine(mine.id);
  const inspections = getInspectionsByMine(mine.id);
  const correctiveActions = getCorrectiveActionsByMine(mine.id);
  const documents = getDocumentsByMine(mine.id);
  const safetyIncidents = getSafetyByMine(mine.id);
  const envReadings = getLatestReadings(mine.id);
  const riskData = calculateRiskScore(mine.id);
  const recommendations = generateRecommendations(mine.id);

  const riskLevel = mine.riskScore <= 25 ? 'low' : mine.riskScore <= 50 ? 'medium' : mine.riskScore <= 75 ? 'high' : 'critical';

  const radarData = [
    { subject: 'Safety', value: 100 - riskData.components.safety.score },
    { subject: 'Environment', value: 100 - riskData.components.environmental.score },
    { subject: 'Compliance', value: 100 - riskData.components.complianceDelay.score },
    { subject: 'Historical', value: 100 - riskData.components.historical.score },
    { subject: 'Inspections', value: 100 - riskData.components.inspectionFindings.score },
    { subject: 'Corrective', value: 100 - riskData.components.correctiveActions.score },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck, count: compliance.length },
    { id: 'safety', label: 'Safety', icon: AlertTriangle, count: safetyIncidents.length },
    { id: 'environment', label: 'Environment', icon: Leaf },
    { id: 'documents', label: 'Documents', icon: FileText, count: documents.length },
    { id: 'actions', label: 'Corrective Actions', icon: Wrench, count: correctiveActions.length },
    { id: 'ai', label: 'AI Analysis', icon: BrainCircuit },
  ];

  return (
    <div className="page-container">
      <button onClick={() => navigate('/mines')} className="btn btn-ghost btn-sm mb-4 text-gray-500">
        <ArrowLeft className="w-4 h-4" /> Back to Mines
      </button>

      {/* Mine Header */}
      <div className="card-flat p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{mine.name}</h1>
              <RiskBadge level={riskLevel} size="lg" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{mine.location}, {mine.district}, {mine.state}</span>
              <span className="flex items-center gap-1"><Factory className="w-4 h-4" />{mine.mineType}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{formatNumber(mine.workerCount)} workers</span>
              <span className="text-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{mine.mineId}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: mine.complianceScore >= 80 ? '#38A169' : mine.complianceScore >= 60 ? '#ED8936' : '#E53E3E' }}>
                {mine.complianceScore}
              </div>
              <div className="text-xs text-gray-500">Compliance</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: mine.riskScore <= 25 ? '#38A169' : mine.riskScore <= 50 ? '#ED8936' : mine.riskScore <= 75 ? '#E53E3E' : '#9B2C2C' }}>
                {mine.riskScore}
              </div>
              <div className="text-xs text-gray-500">Risk Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mine Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-flat p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Mine Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Operator', value: mine.operatorName },
                    { label: 'Mine Type', value: mine.mineType },
                    { label: 'Status', value: mine.status },
                    { label: 'Production Capacity', value: formatProduction(mine.productionCapacity) },
                    { label: 'Current Production', value: formatProduction(mine.currentProduction) },
                    { label: 'Workers', value: formatNumber(mine.workerCount) },
                    { label: 'Last Inspection', value: formatDate(mine.lastInspection) },
                    { label: 'Next Inspection', value: formatDate(mine.nextInspection) },
                    { label: 'Open Violations', value: mine.openViolations },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card-flat p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{compliance.filter(c => c.status === 'compliant').length}</p>
                  <p className="text-xs text-gray-500">Compliant</p>
                </div>
                <div className="card-flat p-4 text-center">
                  <p className="text-2xl font-bold text-orange-500">{compliance.filter(c => c.status === 'pending').length}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="card-flat p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{violations.filter(v => !['resolved','closed'].includes(v.status)).length}</p>
                  <p className="text-xs text-gray-500">Open Violations</p>
                </div>
                <div className="card-flat p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{inspections.length}</p>
                  <p className="text-xs text-gray-500">Inspections</p>
                </div>
              </div>
            </div>

            {/* Risk Radar */}
            <div className="card-flat p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-gray-900">Risk Assessment</h3>
                <AIBadge small />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" fontSize={10} />
                  <Radar dataKey="value" stroke="#1E3A5F" fill="#1E3A5F" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                AI-Generated Risk Profile • {riskData.modelVersion}
              </p>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-[11px] text-amber-700">
                  <strong>Disclaimer:</strong> {riskData.disclaimer}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div className="card-flat overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Compliance Records ({compliance.length})</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Category</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {compliance.map(c => (
                  <tr key={c.id}>
                    <td>
                      <p className="text-sm font-medium text-gray-900">{c.description}</p>
                      <p className="text-xs text-gray-500">{c.regulationName}</p>
                    </td>
                    <td><span className="text-sm">{c.category}</span></td>
                    <td><span className="text-sm">{formatDate(c.dueDate)}</span></td>
                    <td><StatusBadge status={c.status} statusConfig={COMPLIANCE_STATUS_CONFIG} /></td>
                    <td><RiskBadge level={c.riskLevel} size="sm" /></td>
                  </tr>
                ))}
                {compliance.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-400">No compliance records</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* SAFETY TAB */}
        {activeTab === 'safety' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card-flat p-4 text-center">
                <p className="text-2xl font-bold text-red-600">{safetyIncidents.length}</p>
                <p className="text-xs text-gray-500">Total Incidents</p>
              </div>
              <div className="card-flat p-4 text-center">
                <p className="text-2xl font-bold text-orange-500">{safetyIncidents.filter(s => s.severity === 'critical').length}</p>
                <p className="text-xs text-gray-500">Critical</p>
              </div>
              <div className="card-flat p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{safetyIncidents.reduce((sum, s) => sum + s.affectedWorkers, 0)}</p>
                <p className="text-xs text-gray-500">Affected Workers</p>
              </div>
              <div className="card-flat p-4 text-center">
                <p className="text-2xl font-bold text-green-600">{safetyIncidents.filter(s => s.status === 'resolved').length}</p>
                <p className="text-xs text-gray-500">Resolved</p>
              </div>
            </div>
            <div className="card-flat overflow-hidden">
              <table className="data-table">
                <thead><tr><th>Type</th><th>Severity</th><th>Date</th><th>Affected</th><th>Status</th><th>Description</th></tr></thead>
                <tbody>
                  {safetyIncidents.map(s => (
                    <tr key={s.id}>
                      <td className="font-medium">{s.incidentType}</td>
                      <td><RiskBadge level={s.severity} size="sm" /></td>
                      <td>{formatDate(s.incidentDate)}</td>
                      <td>{s.affectedWorkers}</td>
                      <td><StatusBadge status={s.status} statusConfig={{ resolved: { label: 'Resolved', color: '#38A169' }, under_investigation: { label: 'Under Investigation', color: '#ED8936' } }} /></td>
                      <td className="max-w-xs truncate">{s.description}</td>
                    </tr>
                  ))}
                  {safetyIncidents.length === 0 && <tr><td colSpan={6} className="text-center py-8 text-gray-400">No safety incidents</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENVIRONMENT TAB */}
        {activeTab === 'environment' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">⚠ Demo / Simulated Data</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {envReadings.map(reading => {
                const config = PARAMETER_CONFIG[reading.parameter];
                if (!config) return null;
                const isAbove = reading.value > config.threshold;
                const isBelowLow = config.thresholdLow && reading.value < config.thresholdLow;
                const isAlert = isAbove || isBelowLow;
                return (
                  <div key={reading.id} className={`card-flat p-4 ${isAlert ? 'border-red-200 bg-red-50' : ''}`}>
                    <p className="text-xs text-gray-500 font-medium">{config.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${isAlert ? 'text-red-600' : 'text-gray-900'}`}>
                      {reading.value} <span className="text-sm font-normal text-gray-400">{config.unit}</span>
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-gray-400">{config.thresholdLabel}: {config.thresholdLow ? `${config.thresholdLow}–${config.threshold}` : `< ${config.threshold}`}</span>
                      {isAlert ? (
                        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">EXCEEDS</span>
                      ) : (
                        <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">NORMAL</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="card-flat overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Document</th><th>Type</th><th>Expiry</th><th>Status</th></tr></thead>
              <tbody>
                {documents.map(d => (
                  <tr key={d.id}>
                    <td className="font-medium">{d.title}</td>
                    <td>{d.documentType}</td>
                    <td>{d.expiryDate ? formatDate(d.expiryDate) : 'N/A'}</td>
                    <td><StatusBadge status={d.status} statusConfig={{
                      valid: { label: 'Valid', color: '#38A169' },
                      expired: { label: 'Expired', color: '#E53E3E' },
                      expiring_soon: { label: 'Expiring Soon', color: '#ED8936' },
                    }} /></td>
                  </tr>
                ))}
                {documents.length === 0 && <tr><td colSpan={4} className="text-center py-8 text-gray-400">No documents</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* CORRECTIVE ACTIONS TAB */}
        {activeTab === 'actions' && (
          <div className="card-flat overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Action</th><th>Violation</th><th>Deadline</th><th>Status</th><th>Department</th></tr></thead>
              <tbody>
                {correctiveActions.map(ca => (
                  <tr key={ca.id} className={ca.status === 'overdue' ? 'bg-red-50' : ''}>
                    <td className="max-w-xs"><p className="text-sm truncate-2">{ca.requiredAction}</p></td>
                    <td><span className="text-mono text-xs">{ca.violationId}</span></td>
                    <td className={ca.status === 'overdue' ? 'text-red-600 font-semibold' : ''}>{formatDate(ca.deadline)}</td>
                    <td><StatusBadge status={ca.status} statusConfig={{
                      open: { label: 'Open', color: '#E53E3E' },
                      in_progress: { label: 'In Progress', color: '#ED8936' },
                      submitted: { label: 'Submitted', color: '#3182CE' },
                      completed: { label: 'Completed', color: '#38A169' },
                      overdue: { label: 'Overdue', color: '#9B2C2C' },
                    }} /></td>
                    <td className="text-sm">{ca.responsibleDepartment}</td>
                  </tr>
                ))}
                {correctiveActions.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-400">No corrective actions</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* AI ANALYSIS TAB */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            {/* Risk Breakdown */}
            <div className="card-flat p-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-base font-semibold text-gray-900">AI Risk Score Breakdown</h3>
                <AIBadge small />
                <ConfidenceScore value={riskData.confidence} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {Object.entries(riskData.components).map(([key, comp]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold text-gray-900">{comp.score}</span>
                      <span className="text-xs text-gray-400">× {(comp.weight * 100).toFixed(0)}% = {comp.weighted}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${comp.score}%`,
                        background: comp.score <= 25 ? '#38A169' : comp.score <= 50 ? '#ED8936' : '#E53E3E',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 italic">{riskData.disclaimer}</p>
            </div>

            {/* Recommendations */}
            <div className="card-flat p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                {recommendations.map(rec => (
                  <div key={rec.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700 uppercase">{rec.category}</span>
                      <RiskBadge level={rec.priority} size="sm" />
                      <span className="ml-auto text-[10px] text-gray-400">{Math.round(rec.confidence * 100)}% confidence</span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">Risk: {rec.risk}</p>
                    <p className="text-sm text-gray-600">{rec.recommendation}</p>
                    <p className="text-[10px] text-gray-400 mt-2">⚠ AI-Assisted Detection — Requires human verification</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
