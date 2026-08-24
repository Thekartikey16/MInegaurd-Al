import { useState } from 'react';
import { PageHeader, TabNav } from '../../components/common/UIComponents';
import { RISK_WEIGHTS } from '../../config/constants';
import { Settings as SettingsIcon, Shield, Bell, Palette, Sliders, Database } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [weights, setWeights] = useState({ ...RISK_WEIGHTS });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'risk-model', label: 'Risk Model', icon: Sliders },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="page-container">
      <PageHeader title="Settings" subtitle="Application configuration and preferences" />
      <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'general' && (
          <div className="card-flat p-6 max-w-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Application Name</label>
                <input className="form-input" defaultValue="MineGuard AI" />
              </div>
              <div>
                <label className="form-label">Organization</label>
                <input className="form-input" defaultValue="Directorate General of Mines Safety" />
              </div>
              <div>
                <label className="form-label">Default Language</label>
                <select className="form-select"><option>English</option><option>Hindi</option></select>
              </div>
              <div>
                <label className="form-label">Date Format</label>
                <select className="form-select"><option>DD MMM YYYY</option><option>YYYY-MM-DD</option><option>MM/DD/YYYY</option></select>
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === 'risk-model' && (
          <div className="card-flat p-6 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-gray-900">Risk Scoring Model Configuration</h3>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Configure the weights used in the AI risk scoring formula. Weights must sum to 100%.
              This is a configurable prototype model for decision-support purposes only.
            </p>
            <div className="space-y-4">
              {[
                { key: 'safety', label: 'Safety Risk', desc: 'Safety violations, incidents, PPE compliance' },
                { key: 'environmental', label: 'Environmental Risk', desc: 'Environmental violations, readings, thresholds' },
                { key: 'historical', label: 'Historical Violations', desc: 'Past violation count and resolution rate' },
                { key: 'complianceDelay', label: 'Compliance Delays', desc: 'Overdue and non-compliant items' },
                { key: 'inspectionFindings', label: 'Inspection Findings', desc: 'Latest inspection compliance score' },
                { key: 'correctiveActions', label: 'Corrective Action Performance', desc: 'Overdue corrective actions ratio' },
              ].map(item => (
                <div key={item.key} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 w-32">
                    <input
                      type="range" min="0" max="100"
                      value={weights[item.key] * 100}
                      onChange={e => setWeights({ ...weights, [item.key]: parseInt(e.target.value) / 100 })}
                      className="flex-1"
                    />
                    <span className="text-sm font-bold text-gray-900 w-10 text-right">
                      {Math.round(weights[item.key] * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700">
                Total weight: <strong>{Math.round(Object.values(weights).reduce((a, b) => a + b, 0) * 100)}%</strong>
                {Math.round(Object.values(weights).reduce((a, b) => a + b, 0) * 100) !== 100 && (
                  <span className="text-red-600 ml-2">⚠ Weights should sum to 100%</span>
                )}
              </p>
            </div>
            <button className="btn btn-primary mt-4">Save Risk Model</button>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="card-flat p-6 max-w-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Critical Alerts', desc: 'Receive immediate notifications for critical violations and emergencies', default: true },
                { label: 'Inspection Reminders', desc: 'Get reminded about upcoming and overdue inspections', default: true },
                { label: 'Compliance Deadlines', desc: 'Alerts for approaching compliance submission deadlines', default: true },
                { label: 'AI Insights', desc: 'Notifications when new AI insights are generated', default: false },
                { label: 'Corrective Action Updates', desc: 'Track corrective action status changes', default: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="card-flat p-6 max-w-2xl">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">✓ Password Hashing: bcrypt</p>
                <p className="text-xs text-green-600 mt-1">All passwords are hashed using bcrypt with salt rounds = 12</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">✓ JWT Authentication</p>
                <p className="text-xs text-green-600 mt-1">Tokens expire after 24 hours with secure httpOnly cookies</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">✓ Role-Based Access Control</p>
                <p className="text-xs text-green-600 mt-1">4 defined roles with granular permission matrix</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800">✓ Audit Logging</p>
                <p className="text-xs text-green-600 mt-1">All mutations tracked with user, timestamp, and change details</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800">ℹ Rate Limiting</p>
                <p className="text-xs text-blue-600 mt-1">API rate limiting configured: 100 requests/minute per user</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
