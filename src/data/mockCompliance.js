export const mockCompliance = [
  {
    id: 'CR-001', requirementId: 'REG-SAFETY-001', regulationName: 'Mines Act 1952 — Safety Standards',
    category: 'Safety', description: 'Annual safety audit and risk assessment report submission',
    mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine', dueDate: '2026-09-15',
    submissionDate: null, status: 'pending', riskLevel: 'medium',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-002', requirementId: 'REG-ENV-001', regulationName: 'Environment Protection Act 1986',
    category: 'Environment', description: 'Quarterly environmental monitoring and compliance report',
    mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine', dueDate: '2026-10-01',
    submissionDate: null, status: 'pending', riskLevel: 'low',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-003', requirementId: 'REG-SAFETY-002', regulationName: 'Coal Mines Regulations 2017',
    category: 'Safety', description: 'Worker safety training records and certification',
    mineId: 'MINE-002', mineName: 'Gevra Mega Opencast Mine', dueDate: '2026-08-30',
    submissionDate: '2026-08-15', status: 'compliant', riskLevel: 'low',
    evidence: '/docs/cr-003-evidence.pdf', reviewerId: 'USR-002', remarks: 'All certifications up to date',
  },
  {
    id: 'CR-004', requirementId: 'REG-ENV-002', regulationName: 'Water (Prevention and Control of Pollution) Act',
    category: 'Environment', description: 'Water quality monitoring at discharge points',
    mineId: 'MINE-003', mineName: 'Talcher Underground Mine', dueDate: '2026-07-31',
    submissionDate: null, status: 'overdue', riskLevel: 'high',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-005', requirementId: 'REG-LABOR-001', regulationName: 'Mines Act 1952 — Labor Provisions',
    category: 'Labor', description: 'Working hours compliance and overtime records',
    mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine', dueDate: '2026-08-15',
    submissionDate: '2026-08-10', status: 'compliant', riskLevel: 'low',
    evidence: '/docs/cr-005-evidence.pdf', reviewerId: 'USR-002', remarks: 'Corrected after violation VIO-008',
  },
  {
    id: 'CR-006', requirementId: 'REG-OPS-001', regulationName: 'Coal Mines Regulations 2017',
    category: 'Operations', description: 'Updated mining plan and geological survey submission',
    mineId: 'MINE-009', mineName: 'Wani Underground Mine', dueDate: '2026-06-30',
    submissionDate: null, status: 'non_compliant', riskLevel: 'high',
    evidence: null, reviewerId: null, remarks: 'Mining plan not updated after Section D expansion',
  },
  {
    id: 'CR-007', requirementId: 'REG-EQUIP-001', regulationName: 'Metalliferous Mines Regulations',
    category: 'Equipment', description: 'Heavy equipment safety inspection and certification',
    mineId: 'MINE-004', mineName: 'Sonepur Bazari Opencast Mine', dueDate: '2026-09-30',
    submissionDate: null, status: 'pending', riskLevel: 'medium',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-008', requirementId: 'REG-DOC-001', regulationName: 'Mines Act 1952',
    category: 'Documentation', description: 'Annual return of mine statistics and production data',
    mineId: 'MINE-005', mineName: 'Singrauli Coal Mine', dueDate: '2026-08-31',
    submissionDate: '2026-08-20', status: 'under_review', riskLevel: 'low',
    evidence: '/docs/cr-008-evidence.pdf', reviewerId: 'USR-002', remarks: null,
  },
  {
    id: 'CR-009', requirementId: 'REG-EMERG-001', regulationName: 'Coal Mines Regulations 2017',
    category: 'Emergency Preparedness', description: 'Emergency response plan update and mock drill report',
    mineId: 'MINE-006', mineName: 'Jharia Underground Mine', dueDate: '2026-05-30',
    submissionDate: null, status: 'overdue', riskLevel: 'critical',
    evidence: null, reviewerId: null, remarks: 'Critical — overdue by 3 months',
  },
  {
    id: 'CR-010', requirementId: 'REG-SAFETY-003', regulationName: 'DGMS Circular on Ventilation',
    category: 'Safety', description: 'Underground mine ventilation survey and compliance report',
    mineId: 'MINE-006', mineName: 'Jharia Underground Mine', dueDate: '2026-06-30',
    submissionDate: null, status: 'non_compliant', riskLevel: 'critical',
    evidence: null, reviewerId: null, remarks: 'Ventilation system found non-functional in inspection',
  },
  {
    id: 'CR-011', requirementId: 'REG-ENV-003', regulationName: 'Air (Prevention and Control of Pollution) Act',
    category: 'Environment', description: 'Air quality monitoring and dust suppression compliance',
    mineId: 'MINE-004', mineName: 'Sonepur Bazari Opencast Mine', dueDate: '2026-08-31',
    submissionDate: null, status: 'overdue', riskLevel: 'high',
    evidence: null, reviewerId: null, remarks: 'Dust suppression system non-operational',
  },
  {
    id: 'CR-012', requirementId: 'REG-SAFETY-001', regulationName: 'Mines Act 1952 — Safety Standards',
    category: 'Safety', description: 'Annual safety audit and risk assessment report',
    mineId: 'MINE-008', mineName: 'Kusmunda Super OC Mine', dueDate: '2026-11-30',
    submissionDate: null, status: 'pending', riskLevel: 'low',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-013', requirementId: 'REG-ENV-001', regulationName: 'Environment Protection Act 1986',
    category: 'Environment', description: 'Quarterly environmental monitoring report',
    mineId: 'MINE-007', mineName: 'Singareni Opencast Mine', dueDate: '2026-10-01',
    submissionDate: null, status: 'pending', riskLevel: 'low',
    evidence: null, reviewerId: null, remarks: null,
  },
  {
    id: 'CR-014', requirementId: 'REG-SAFETY-004', regulationName: 'Coal Mines Regulations 2017',
    category: 'Safety', description: 'Strata control and roof support compliance report',
    mineId: 'MINE-009', mineName: 'Wani Underground Mine', dueDate: '2026-07-15',
    submissionDate: null, status: 'non_compliant', riskLevel: 'high',
    evidence: null, reviewerId: null, remarks: 'Roof bolting deviation found in inspection',
  },
  {
    id: 'CR-015', requirementId: 'REG-ENV-002', regulationName: 'Water Act',
    category: 'Environment', description: 'Groundwater monitoring and testing report',
    mineId: 'MINE-003', mineName: 'Talcher Underground Mine', dueDate: '2026-06-30',
    submissionDate: null, status: 'overdue', riskLevel: 'high',
    evidence: null, reviewerId: null, remarks: 'No water quality testing data for 6 months',
  },
];

export function getComplianceByMine(mineId) {
  return mockCompliance.filter(c => c.mineId === mineId);
}

export function getComplianceStats() {
  const total = mockCompliance.length;
  const compliant = mockCompliance.filter(c => c.status === 'compliant').length;
  const pending = mockCompliance.filter(c => c.status === 'pending').length;
  const overdue = mockCompliance.filter(c => c.status === 'overdue').length;
  const nonCompliant = mockCompliance.filter(c => c.status === 'non_compliant').length;
  const underReview = mockCompliance.filter(c => c.status === 'under_review').length;
  return { total, compliant, pending, overdue, nonCompliant, underReview };
}
