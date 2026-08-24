export const mockDocuments = [
  { id: 'DOC-001', documentType: 'Mining License', title: 'Mining Lease — Rajmahal OC', mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine', uploadedBy: 'USR-003', fileUrl: '/docs/mining-license-001.pdf', fileType: 'PDF', expiryDate: '2028-03-15', status: 'valid', createdAt: '2026-01-15' },
  { id: 'DOC-002', documentType: 'Environmental Clearance', title: 'EC Certificate — Rajmahal OC', mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine', uploadedBy: 'USR-003', fileUrl: '/docs/ec-001.pdf', fileType: 'PDF', expiryDate: '2026-09-30', status: 'expiring_soon', createdAt: '2021-09-30' },
  { id: 'DOC-003', documentType: 'Safety Certificate', title: 'Annual Safety Certificate — Gevra', mineId: 'MINE-002', mineName: 'Gevra Mega Opencast Mine', uploadedBy: 'USR-006', fileUrl: '/docs/safety-cert-002.pdf', fileType: 'PDF', expiryDate: '2027-01-01', status: 'valid', createdAt: '2026-01-01' },
  { id: 'DOC-004', documentType: 'Pollution Control Certificate', title: 'CPCB Consent — Talcher UG', mineId: 'MINE-003', mineName: 'Talcher Underground Mine', uploadedBy: 'USR-003', fileUrl: '/docs/pollution-003.pdf', fileType: 'PDF', expiryDate: '2026-06-30', status: 'expired', createdAt: '2024-06-30' },
  { id: 'DOC-005', documentType: 'Inspection Report', title: 'Emergency Inspection Report — Jharia', mineId: 'MINE-006', mineName: 'Jharia Underground Mine', uploadedBy: 'USR-002', fileUrl: '/docs/inspection-005.pdf', fileType: 'PDF', expiryDate: null, status: 'valid', createdAt: '2026-04-10' },
  { id: 'DOC-006', documentType: 'Mining License', title: 'Mining Lease — Jharia UG', mineId: 'MINE-006', mineName: 'Jharia Underground Mine', uploadedBy: 'USR-003', fileUrl: '/docs/mining-license-006.pdf', fileType: 'PDF', expiryDate: '2027-05-25', status: 'valid', createdAt: '2022-05-25' },
  { id: 'DOC-007', documentType: 'Explosives License', title: 'Explosives License — Sonepur Bazari', mineId: 'MINE-004', mineName: 'Sonepur Bazari Opencast Mine', uploadedBy: 'USR-003', fileUrl: '/docs/explosives-004.pdf', fileType: 'PDF', expiryDate: '2026-12-31', status: 'valid', createdAt: '2025-12-31' },
  { id: 'DOC-008', documentType: 'Environmental Clearance', title: 'EC Certificate — Singrauli', mineId: 'MINE-005', mineName: 'Singrauli Coal Mine', uploadedBy: 'USR-006', fileUrl: '/docs/ec-005.pdf', fileType: 'PDF', expiryDate: '2029-01-01', status: 'valid', createdAt: '2024-01-01' },
  { id: 'DOC-009', documentType: 'Water Discharge Permit', title: 'Water Discharge Permit — Jharia', mineId: 'MINE-006', mineName: 'Jharia Underground Mine', uploadedBy: 'USR-003', fileUrl: '/docs/water-006.pdf', fileType: 'PDF', expiryDate: '2026-03-31', status: 'expired', createdAt: '2024-03-31' },
  { id: 'DOC-010', documentType: 'Safety Certificate', title: 'Annual Safety Certificate — Kusmunda', mineId: 'MINE-008', mineName: 'Kusmunda Super OC Mine', uploadedBy: 'USR-006', fileUrl: '/docs/safety-cert-008.pdf', fileType: 'PDF', expiryDate: '2027-06-30', status: 'valid', createdAt: '2026-06-30' },
];

export function getDocumentsByMine(mineId) {
  return mockDocuments.filter(d => d.mineId === mineId);
}

export function getDocumentStats() {
  const total = mockDocuments.length;
  const valid = mockDocuments.filter(d => d.status === 'valid').length;
  const expired = mockDocuments.filter(d => d.status === 'expired').length;
  const expiringSoon = mockDocuments.filter(d => d.status === 'expiring_soon').length;
  return { total, valid, expired, expiringSoon };
}
