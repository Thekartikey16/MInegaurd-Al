import { useState } from 'react';
import { PageHeader } from '../../components/common/UIComponents';
import { FileText, Download, Eye, Printer, BarChart3, AlertTriangle, Leaf, ShieldCheck, Wrench, Users } from 'lucide-react';

const REPORTS = [
  { id: 'RPT-001', name: 'Monthly Compliance Report', desc: 'Comprehensive compliance status across all mines', icon: ShieldCheck, type: 'Compliance', lastGenerated: 'Aug 2026', color: '#38A169' },
  { id: 'RPT-002', name: 'Mine Inspection Summary', desc: 'Detailed inspection findings and compliance scores', icon: Eye, type: 'Inspection', lastGenerated: 'Aug 2026', color: '#3182CE' },
  { id: 'RPT-003', name: 'Violation Report', desc: 'All violations with severity, status, and timeline', icon: AlertTriangle, type: 'Violation', lastGenerated: 'Jul 2026', color: '#E53E3E' },
  { id: 'RPT-004', name: 'Environmental Compliance Report', desc: 'Environmental parameter readings and threshold analysis', icon: Leaf, type: 'Environment', lastGenerated: 'Aug 2026', color: '#ED8936' },
  { id: 'RPT-005', name: 'Risk Assessment Report', desc: 'AI-powered risk scores and contributing factors', icon: BarChart3, type: 'Risk', lastGenerated: 'Aug 2026', color: '#805AD5' },
  { id: 'RPT-006', name: 'Corrective Action Report', desc: 'Status of corrective actions and completion rates', icon: Wrench, type: 'Corrective Actions', lastGenerated: 'Jul 2026', color: '#DD6B20' },
  { id: 'RPT-007', name: 'Government Summary Report', desc: 'Executive summary for government authorities', icon: Users, type: 'Governance', lastGenerated: 'Aug 2026', color: '#1E3A5F' },
];

export default function ReportsPage() {
  const [generating, setGenerating] = useState(null);

  const handleGenerate = (id) => {
    setGenerating(id);
    setTimeout(() => setGenerating(null), 2000);
  };

  return (
    <div className="page-container">
      <PageHeader title="Reports" subtitle="Generate, view, and download compliance reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map(report => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="card-flat p-6 flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${report.color}12` }}>
                  <Icon className="w-5 h-5" style={{ color: report.color }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{report.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <span className="px-2 py-0.5 bg-gray-100 rounded">{report.type}</span>
                <span>Last: {report.lastGenerated}</span>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <button
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => handleGenerate(report.id)}
                  disabled={generating === report.id}
                >
                  {generating === report.id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FileText className="w-3 h-3" /> Generate
                    </>
                  )}
                </button>
                <button className="btn btn-secondary btn-sm">
                  <Download className="w-3 h-3" />
                </button>
                <button className="btn btn-secondary btn-sm">
                  <Printer className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
