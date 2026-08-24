export const mockCorrectiveActions = [
  {
    id: 'CA-001', actionId: 'CA-2026-001', violationId: 'VIO-001', mineId: 'MINE-006',
    mineName: 'Jharia Underground Mine', responsibleDepartment: 'Ventilation Engineering',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Repair and restore underground ventilation system in Sections B3 and B4. Install backup ventilation fans. Conduct air quality testing post-repair.',
    deadline: '2026-05-10', status: 'overdue',
    evidence: null, verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-04-11',
  },
  {
    id: 'CA-002', actionId: 'CA-2026-002', violationId: 'VIO-002', mineId: 'MINE-006',
    mineName: 'Jharia Underground Mine', responsibleDepartment: 'Environment Management',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Install water treatment plant at discharge point. Cease direct discharge into Damodar River. Submit water quality test results weekly.',
    deadline: '2026-06-10', status: 'in_progress',
    evidence: null, verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-04-11',
  },
  {
    id: 'CA-003', actionId: 'CA-2026-003', violationId: 'VIO-003', mineId: 'MINE-003',
    mineName: 'Talcher Underground Mine', responsibleDepartment: 'Safety Department',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Enforce mandatory PPE policy for all workers in active zones. Conduct PPE awareness training. Install PPE checkpoints at entry points.',
    deadline: '2026-07-20', status: 'submitted',
    evidence: '/evidence/ca-003-proof.pdf', verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-05-21',
  },
  {
    id: 'CA-004', actionId: 'CA-2026-004', violationId: 'VIO-004', mineId: 'MINE-003',
    mineName: 'Talcher Underground Mine', responsibleDepartment: 'Equipment Maintenance',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Install safety guards on all conveyor transfer points. Repair emergency stop mechanisms at point C2. Conduct safety inspection post-installation.',
    deadline: '2026-07-20', status: 'in_progress',
    evidence: null, verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-05-21',
  },
  {
    id: 'CA-005', actionId: 'CA-2026-005', violationId: 'VIO-006', mineId: 'MINE-004',
    mineName: 'Sonepur Bazari Opencast Mine', responsibleDepartment: 'Environment Control',
    responsiblePerson: 'USR-006', responsiblePersonName: 'Vikram Patel',
    requiredAction: 'Repair all dust suppression systems on haul roads. Install additional water sprinklers at crushing plant. Monitor PM10 levels daily.',
    deadline: '2026-08-30', status: 'in_progress',
    evidence: null, verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-07-01',
  },
  {
    id: 'CA-006', actionId: 'CA-2026-006', violationId: 'VIO-007', mineId: 'MINE-006',
    mineName: 'Jharia Underground Mine', responsibleDepartment: 'Emergency Response',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Clear all emergency evacuation routes. Replace all expired self-rescuers. Conduct emergency evacuation drill. Update emergency response plan.',
    deadline: '2026-04-25', status: 'overdue',
    evidence: null, verificationRemarks: null, verifiedBy: null, verifiedDate: null,
    createdAt: '2026-04-11',
  },
  {
    id: 'CA-007', actionId: 'CA-2026-007', violationId: 'VIO-008', mineId: 'MINE-001',
    mineName: 'Rajmahal Opencast Mine', responsibleDepartment: 'HR & Labor Compliance',
    responsiblePerson: 'USR-003', responsiblePersonName: 'Amit Singh Rathore',
    requiredAction: 'Revise shift schedules to comply with statutory working hour limits. Implement overtime tracking system. Submit corrected records.',
    deadline: '2026-08-15', status: 'completed',
    evidence: '/evidence/ca-007-proof.pdf', verificationRemarks: 'Records corrected. New shift schedules implemented.', verifiedBy: 'USR-002', verifiedDate: '2026-08-12',
    createdAt: '2026-07-16',
  },
  {
    id: 'CA-008', actionId: 'CA-2026-008', violationId: 'VIO-012', mineId: 'MINE-004',
    mineName: 'Sonepur Bazari Opencast Mine', responsibleDepartment: 'Safety Department',
    responsiblePerson: 'USR-006', responsiblePersonName: 'Vikram Patel',
    requiredAction: 'Replace all faded safety signage on haul roads. Install reflective signage at all 5 identified locations.',
    deadline: '2026-07-30', status: 'completed',
    evidence: '/evidence/ca-008-proof.pdf', verificationRemarks: 'All signage replaced and verified on site.', verifiedBy: 'USR-005', verifiedDate: '2026-07-22',
    createdAt: '2026-07-01',
  },
];

export function getCorrectiveActionsByMine(mineId) {
  return mockCorrectiveActions.filter(ca => ca.mineId === mineId);
}

export function getCorrectiveActionStats() {
  const total = mockCorrectiveActions.length;
  const open = mockCorrectiveActions.filter(ca => ca.status === 'open').length;
  const inProgress = mockCorrectiveActions.filter(ca => ca.status === 'in_progress').length;
  const completed = mockCorrectiveActions.filter(ca => ca.status === 'completed').length;
  const overdue = mockCorrectiveActions.filter(ca => ca.status === 'overdue').length;
  return { total, open, inProgress, completed, overdue };
}
