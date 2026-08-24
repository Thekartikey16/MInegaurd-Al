// Environmental readings for each mine — simulated sensor data
const generateReadings = (mineId, mineName, baseValues) => {
  const months = ['2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];
  const readings = [];
  months.forEach((month, i) => {
    Object.entries(baseValues).forEach(([param, base]) => {
      const variance = (Math.random() - 0.5) * base * 0.3;
      const value = Math.round((base + variance + (i * base * 0.02)) * 10) / 10;
      readings.push({
        id: `ER-${mineId}-${param}-${i}`,
        mineId,
        mineName,
        parameter: param,
        value,
        month,
        isSimulated: true,
      });
    });
  });
  return readings;
};

export const mockEnvironment = [
  ...generateReadings('MINE-001', 'Rajmahal Opencast Mine', {
    air_quality: 135, dust_level: 95, water_ph: 7.2, noise_level: 72, co_emission: 18, so2_level: 35,
  }),
  ...generateReadings('MINE-002', 'Gevra Mega Opencast Mine', {
    air_quality: 110, dust_level: 78, water_ph: 7.0, noise_level: 68, co_emission: 12, so2_level: 28,
  }),
  ...generateReadings('MINE-003', 'Talcher Underground Mine', {
    air_quality: 185, dust_level: 140, water_ph: 5.8, noise_level: 82, co_emission: 38, so2_level: 65,
  }),
  ...generateReadings('MINE-004', 'Sonepur Bazari Opencast Mine', {
    air_quality: 165, dust_level: 165, water_ph: 7.4, noise_level: 78, co_emission: 22, so2_level: 48,
  }),
  ...generateReadings('MINE-005', 'Singrauli Coal Mine', {
    air_quality: 120, dust_level: 85, water_ph: 7.1, noise_level: 70, co_emission: 15, so2_level: 32,
  }),
  ...generateReadings('MINE-006', 'Jharia Underground Mine', {
    air_quality: 220, dust_level: 180, water_ph: 5.2, noise_level: 88, co_emission: 55, so2_level: 82,
  }),
  ...generateReadings('MINE-007', 'Singareni Opencast Mine', {
    air_quality: 115, dust_level: 80, water_ph: 7.3, noise_level: 65, co_emission: 14, so2_level: 30,
  }),
  ...generateReadings('MINE-008', 'Kusmunda Super OC Mine', {
    air_quality: 95, dust_level: 65, water_ph: 7.0, noise_level: 62, co_emission: 10, so2_level: 22,
  }),
  ...generateReadings('MINE-009', 'Wani Underground Mine', {
    air_quality: 170, dust_level: 125, water_ph: 6.3, noise_level: 80, co_emission: 32, so2_level: 55,
  }),
  ...generateReadings('MINE-010', 'Basundhara Opencast Mine', {
    air_quality: 140, dust_level: 100, water_ph: 7.1, noise_level: 74, co_emission: 20, so2_level: 40,
  }),
];

export const PARAMETER_CONFIG = {
  air_quality: { label: 'Air Quality Index', unit: 'AQI', threshold: 200, thresholdLabel: 'CPCB Limit' },
  dust_level: { label: 'Dust Level (PM10)', unit: 'µg/m³', threshold: 150, thresholdLabel: 'CPCB Limit' },
  water_ph: { label: 'Water pH', unit: 'pH', threshold: 8.5, thresholdLow: 6.5, thresholdLabel: 'Safe Range' },
  noise_level: { label: 'Noise Level', unit: 'dB', threshold: 85, thresholdLabel: 'OSHA Limit' },
  co_emission: { label: 'CO Emission', unit: 'ppm', threshold: 50, thresholdLabel: 'DGMS Limit' },
  so2_level: { label: 'SO₂ Level', unit: 'µg/m³', threshold: 80, thresholdLabel: 'NAAQS Limit' },
};

export function getLatestReadings(mineId) {
  const mineReadings = mockEnvironment.filter(r => r.mineId === mineId);
  const latest = {};
  mineReadings.forEach(r => {
    if (!latest[r.parameter] || r.month > latest[r.parameter].month) {
      latest[r.parameter] = r;
    }
  });
  return Object.values(latest);
}

export function getReadingTrend(mineId, parameter) {
  return mockEnvironment
    .filter(r => r.mineId === mineId && r.parameter === parameter)
    .sort((a, b) => a.month.localeCompare(b.month));
}
