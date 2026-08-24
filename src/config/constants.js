export const APP_NAME = 'MineGuard AI';
export const APP_TAGLINE = 'Smart Governance & Compliance Monitoring for Coal Mines';

export const RISK_LEVELS = {
  LOW: { key: 'low', label: 'Low', color: '#38A169', bg: '#F0FFF4', min: 0, max: 25 },
  MEDIUM: { key: 'medium', label: 'Medium', color: '#ED8936', bg: '#FFFAF0', min: 26, max: 50 },
  HIGH: { key: 'high', label: 'High', color: '#E53E3E', bg: '#FFF5F5', min: 51, max: 75 },
  CRITICAL: { key: 'critical', label: 'Critical', color: '#9B2C2C', bg: '#FED7D7', min: 76, max: 100 },
};

export const COMPLIANCE_STATUSES = {
  COMPLIANT: { key: 'compliant', label: 'Compliant', color: '#38A169', bg: '#F0FFF4' },
  PENDING: { key: 'pending', label: 'Pending', color: '#ED8936', bg: '#FFFAF0' },
  OVERDUE: { key: 'overdue', label: 'Overdue', color: '#E53E3E', bg: '#FFF5F5' },
  NON_COMPLIANT: { key: 'non_compliant', label: 'Non-Compliant', color: '#9B2C2C', bg: '#FED7D7' },
  UNDER_REVIEW: { key: 'under_review', label: 'Under Review', color: '#3182CE', bg: '#EBF8FF' },
};

export const COMPLIANCE_CATEGORIES = [
  'Safety', 'Environment', 'Labor', 'Operations', 'Equipment', 'Documentation', 'Emergency Preparedness',
];

export const VIOLATION_SEVERITIES = {
  LOW: { key: 'low', label: 'Low', color: '#38A169', bg: '#F0FFF4' },
  MEDIUM: { key: 'medium', label: 'Medium', color: '#ED8936', bg: '#FFFAF0' },
  HIGH: { key: 'high', label: 'High', color: '#E53E3E', bg: '#FFF5F5' },
  CRITICAL: { key: 'critical', label: 'Critical', color: '#9B2C2C', bg: '#FED7D7' },
};

export const VIOLATION_STATUSES = {
  OPEN: { key: 'open', label: 'Open', color: '#E53E3E' },
  UNDER_INVESTIGATION: { key: 'under_investigation', label: 'Under Investigation', color: '#ED8936' },
  CONFIRMED: { key: 'confirmed', label: 'Confirmed', color: '#9B2C2C' },
  REMEDIATION: { key: 'remediation', label: 'Remediation In Progress', color: '#3182CE' },
  RESOLVED: { key: 'resolved', label: 'Resolved', color: '#38A169' },
  CLOSED: { key: 'closed', label: 'Closed', color: '#718096' },
};

export const INSPECTION_STATUSES = {
  SCHEDULED: { key: 'scheduled', label: 'Scheduled', color: '#3182CE', bg: '#EBF8FF' },
  IN_PROGRESS: { key: 'in_progress', label: 'In Progress', color: '#ED8936', bg: '#FFFAF0' },
  COMPLETED: { key: 'completed', label: 'Completed', color: '#38A169', bg: '#F0FFF4' },
  UNDER_REVIEW: { key: 'under_review', label: 'Under Review', color: '#805AD5', bg: '#FAF5FF' },
};

export const CORRECTIVE_ACTION_STATUSES = {
  OPEN: { key: 'open', label: 'Open', color: '#E53E3E' },
  IN_PROGRESS: { key: 'in_progress', label: 'In Progress', color: '#ED8936' },
  SUBMITTED: { key: 'submitted', label: 'Submitted', color: '#3182CE' },
  UNDER_VERIFICATION: { key: 'under_verification', label: 'Under Verification', color: '#805AD5' },
  COMPLETED: { key: 'completed', label: 'Completed', color: '#38A169' },
  OVERDUE: { key: 'overdue', label: 'Overdue', color: '#9B2C2C' },
};

export const ALERT_SEVERITIES = {
  CRITICAL: { key: 'critical', label: 'Critical', color: '#9B2C2C', bg: '#FED7D7', icon: 'AlertTriangle' },
  HIGH: { key: 'high', label: 'High', color: '#E53E3E', bg: '#FFF5F5', icon: 'AlertCircle' },
  MEDIUM: { key: 'medium', label: 'Medium', color: '#ED8936', bg: '#FFFAF0', icon: 'Info' },
  LOW: { key: 'low', label: 'Low', color: '#3182CE', bg: '#EBF8FF', icon: 'Bell' },
};

export const MINE_TYPES = ['Underground', 'Opencast', 'Mixed'];
export const MINE_STATUSES = ['Active', 'Inactive', 'Suspended', 'Under Review'];

export const INDIAN_STATES = [
  'Jharkhand', 'Chhattisgarh', 'Odisha', 'West Bengal', 'Madhya Pradesh',
  'Telangana', 'Maharashtra', 'Meghalaya', 'Assam', 'Rajasthan',
];

export const ENVIRONMENTAL_PARAMETERS = [
  { key: 'air_quality', label: 'Air Quality Index', unit: 'AQI', threshold: 200 },
  { key: 'dust_level', label: 'Dust Level (PM10)', unit: 'µg/m³', threshold: 150 },
  { key: 'water_ph', label: 'Water pH', unit: 'pH', threshold: 8.5, thresholdLow: 6.5 },
  { key: 'noise_level', label: 'Noise Level', unit: 'dB', threshold: 85 },
  { key: 'co_emission', label: 'CO Emission', unit: 'ppm', threshold: 50 },
  { key: 'so2_level', label: 'SO₂ Level', unit: 'µg/m³', threshold: 80 },
];

export const RISK_WEIGHTS = {
  safety: 0.30,
  environmental: 0.20,
  historical: 0.20,
  complianceDelay: 0.15,
  inspectionFindings: 0.10,
  correctiveActions: 0.05,
};

export const DOCUMENT_TYPES = [
  'Mining License', 'Environmental Clearance', 'Safety Certificate',
  'Pollution Control Certificate', 'Forest Clearance', 'Labor License',
  'Explosives License', 'Water Discharge Permit', 'Inspection Report',
  'Compliance Certificate',
];
