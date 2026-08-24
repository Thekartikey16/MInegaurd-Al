export const mockSafety = [
  {
    id: 'SI-001', mineId: 'MINE-006', mineName: 'Jharia Underground Mine',
    incidentType: 'Fire', severity: 'critical',
    description: 'Underground fire detected in abandoned workings of Section A. Fire spread to adjacent active galleries. Emergency evacuation initiated.',
    incidentDate: '2026-04-08', affectedWorkers: 12, rootCause: 'Spontaneous combustion in sealed-off area with inadequate sealing',
    status: 'under_investigation', reportedBy: 'USR-003', reportedByName: 'Amit Singh Rathore',
  },
  {
    id: 'SI-002', mineId: 'MINE-003', mineName: 'Talcher Underground Mine',
    incidentType: 'Roof Fall', severity: 'high',
    description: 'Minor roof fall in development gallery D-3. Two workers received minor injuries. Gallery temporarily sealed.',
    incidentDate: '2026-05-12', affectedWorkers: 2, rootCause: 'Inadequate roof bolting in weak strata zone',
    status: 'resolved', reportedBy: 'USR-003', reportedByName: 'Amit Singh Rathore',
  },
  {
    id: 'SI-003', mineId: 'MINE-004', mineName: 'Sonepur Bazari Opencast Mine',
    incidentType: 'Equipment Accident', severity: 'medium',
    description: 'Haul truck brake failure on ramp road. No injuries. Truck safely stopped using emergency procedure.',
    incidentDate: '2026-06-18', affectedWorkers: 0, rootCause: 'Brake system overdue for maintenance',
    status: 'resolved', reportedBy: 'USR-006', reportedByName: 'Vikram Patel',
  },
  {
    id: 'SI-004', mineId: 'MINE-001', mineName: 'Rajmahal Opencast Mine',
    incidentType: 'Slip/Fall', severity: 'low',
    description: 'Worker slipped on wet surface near washing plant. Minor bruise. First aid administered on site.',
    incidentDate: '2026-07-22', affectedWorkers: 1, rootCause: 'Wet floor without warning signs',
    status: 'resolved', reportedBy: 'USR-003', reportedByName: 'Amit Singh Rathore',
  },
  {
    id: 'SI-005', mineId: 'MINE-006', mineName: 'Jharia Underground Mine',
    incidentType: 'Gas Exposure', severity: 'critical',
    description: 'CO gas buildup detected in Sections B3-B4 due to ventilation failure. 8 workers evacuated with gas exposure symptoms.',
    incidentDate: '2026-04-09', affectedWorkers: 8, rootCause: 'Ventilation fan motor failure. Backup system not operational.',
    status: 'under_investigation', reportedBy: 'USR-003', reportedByName: 'Amit Singh Rathore',
  },
  {
    id: 'SI-006', mineId: 'MINE-009', mineName: 'Wani Underground Mine',
    incidentType: 'Electrical', severity: 'medium',
    description: 'Short circuit in underground transformer room. No injuries. Power supply disrupted for 4 hours.',
    incidentDate: '2026-06-02', affectedWorkers: 0, rootCause: 'Cable insulation degradation due to moisture',
    status: 'resolved', reportedBy: 'USR-003', reportedByName: 'Amit Singh Rathore',
  },
  {
    id: 'SI-007', mineId: 'MINE-010', mineName: 'Basundhara Opencast Mine',
    incidentType: 'Blasting Incident', severity: 'medium',
    description: 'Fly rock from blasting operation exceeded designated safe zone by 15m. No injuries or property damage.',
    incidentDate: '2026-07-10', affectedWorkers: 0, rootCause: 'Incorrect stemming length in blast design',
    status: 'resolved', reportedBy: 'USR-006', reportedByName: 'Vikram Patel',
  },
];

export const mockSafetyStats = {
  totalIncidents: 7,
  criticalIncidents: 2,
  resolvedIncidents: 5,
  totalAffectedWorkers: 23,
  ppeComplianceRate: 78,
  safetyTrainingCompletion: 85,
  emergencyDrillsCompleted: 6,
  emergencyDrillsRequired: 10,
};

export function getSafetyByMine(mineId) {
  return mockSafety.filter(s => s.mineId === mineId);
}
