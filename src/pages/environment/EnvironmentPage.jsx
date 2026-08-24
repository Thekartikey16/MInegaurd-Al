import { useState, useMemo } from 'react';
import { mockEnvironment, PARAMETER_CONFIG, getLatestReadings } from '../../data/mockEnvironment';
import { mockMines } from '../../data/mockMines';
import { PageHeader, FilterSelect, ChartCard } from '../../components/common/UIComponents';
import KPICard from '../../components/common/KPICard';
import { Leaf, Droplets, Wind, Volume2, AlertTriangle, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, BarChart, Bar, Cell } from 'recharts';

export default function EnvironmentPage() {
  const [selectedMine, setSelectedMine] = useState('MINE-006');
  const mine = mockMines.find(m => m.id === selectedMine);

  const readings = useMemo(() => getLatestReadings(selectedMine), [selectedMine]);
  const alertCount = readings.filter(r => {
    const cfg = PARAMETER_CONFIG[r.parameter];
    if (!cfg) return false;
    return r.value > cfg.threshold || (cfg.thresholdLow && r.value < cfg.thresholdLow);
  }).length;

  // Trend data for selected mine
  const trendData = useMemo(() => {
    const months = ['2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08'];
    return months.map(month => {
      const row = { month: month.split('-')[1] === '03' ? 'Mar' : month.split('-')[1] === '04' ? 'Apr' : month.split('-')[1] === '05' ? 'May' : month.split('-')[1] === '06' ? 'Jun' : month.split('-')[1] === '07' ? 'Jul' : 'Aug' };
      mockEnvironment.filter(r => r.mineId === selectedMine && r.month === month).forEach(r => {
        row[r.parameter] = r.value;
      });
      return row;
    });
  }, [selectedMine]);

  // Mine comparison for AQI
  const mineComparison = useMemo(() => {
    return mockMines.map(m => {
      const latest = getLatestReadings(m.id);
      const aqi = latest.find(r => r.parameter === 'air_quality');
      return { name: m.name.split(' ')[0], aqi: aqi?.value || 0, id: m.id };
    }).sort((a, b) => b.aqi - a.aqi);
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Environmental Monitoring" subtitle="Track environmental parameters across coal mines">
        <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
          ⚠ Demo / Simulated Data
        </span>
      </PageHeader>

      <div className="mb-6">
        <FilterSelect label="Select Mine" value={selectedMine} onChange={setSelectedMine}
          options={mockMines.map(m => ({ value: m.id, label: m.name }))} allLabel="Select a mine" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard title="Parameters Monitored" value={6} icon={Activity} color="#1E3A5F" />
        <KPICard title="Threshold Alerts" value={alertCount} icon={AlertTriangle} color={alertCount > 0 ? '#E53E3E' : '#38A169'} />
        <KPICard title="Air Quality" value={readings.find(r => r.parameter === 'air_quality')?.value || '—'} icon={Wind} color="#3182CE" subtitle="AQI" />
        <KPICard title="Dust Level" value={readings.find(r => r.parameter === 'dust_level')?.value || '—'} icon={Leaf} color="#ED8936" subtitle="µg/m³ PM10" />
      </div>

      {/* Current Readings */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {readings.map(reading => {
          const config = PARAMETER_CONFIG[reading.parameter];
          if (!config) return null;
          const isAbove = reading.value > config.threshold;
          const isBelowLow = config.thresholdLow && reading.value < config.thresholdLow;
          const isAlert = isAbove || isBelowLow;
          return (
            <div key={reading.id} className={`card-flat p-5 ${isAlert ? 'border-red-200 bg-red-50/50' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">{config.label}</p>
                {isAlert ? (
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">⚠ EXCEEDS LIMIT</span>
                ) : (
                  <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">✓ NORMAL</span>
                )}
              </div>
              <p className={`text-3xl font-bold ${isAlert ? 'text-red-600' : 'text-gray-900'}`}>
                {reading.value}
                <span className="text-sm font-normal text-gray-400 ml-1">{config.unit}</span>
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                  <span>0</span>
                  <span>{config.thresholdLabel}: {config.threshold}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${Math.min(100, (reading.value / config.threshold) * 100)}%`,
                    background: isAlert ? '#E53E3E' : reading.value / config.threshold > 0.8 ? '#ED8936' : '#38A169',
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Air Quality Trend" subtitle={`${mine?.name || 'Selected Mine'} — 6 month trend`}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <ReferenceLine y={200} stroke="#E53E3E" strokeDasharray="5 5" label={{ value: 'Limit', position: 'right', fontSize: 10 }} />
              <Line type="monotone" dataKey="air_quality" stroke="#3182CE" strokeWidth={2} dot={{ r: 3 }} name="AQI" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Mine Comparison — AQI" subtitle="Air quality across all mines (latest)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mineComparison} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" fontSize={12} />
              <YAxis type="category" dataKey="name" fontSize={11} width={80} />
              <Tooltip />
              <ReferenceLine x={200} stroke="#E53E3E" strokeDasharray="5 5" />
              <Bar dataKey="aqi" radius={[0, 6, 6, 0]} barSize={16}>
                {mineComparison.map((entry) => (
                  <Cell key={entry.id} fill={entry.aqi > 200 ? '#E53E3E' : entry.aqi > 150 ? '#ED8936' : '#38A169'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
