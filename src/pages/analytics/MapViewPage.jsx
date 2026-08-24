import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMines } from '../../data/mockMines';
import { PageHeader } from '../../components/common/UIComponents';
import { MapPin, ArrowLeft } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

export default function MapViewPage() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      const map = L.map(mapRef.current).setView([22.5, 83.0], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      mockMines.forEach(mine => {
        const riskLevel = mine.riskScore <= 25 ? 'low' : mine.riskScore <= 50 ? 'medium' : mine.riskScore <= 75 ? 'high' : 'critical';
        const colors = { low: '#38A169', medium: '#ED8936', high: '#E53E3E', critical: '#9B2C2C' };
        const color = colors[riskLevel];

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
            <span style="color:white;font-size:10px;font-weight:bold;">${mine.riskScore}</span>
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([mine.latitude, mine.longitude], { icon }).addTo(map);

        const popup = `
          <div style="font-family:Inter,sans-serif;min-width:200px;">
            <h3 style="font-size:14px;font-weight:700;margin:0 0 4px;">${mine.name}</h3>
            <p style="font-size:11px;color:#718096;margin:0 0 8px;">${mine.location}, ${mine.district}, ${mine.state}</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
              <div style="background:#F7FAFC;padding:6px;border-radius:6px;text-align:center;">
                <p style="font-size:18px;font-weight:700;color:${color};margin:0;">${mine.riskScore}</p>
                <p style="font-size:9px;color:#718096;margin:0;">Risk Score</p>
              </div>
              <div style="background:#F7FAFC;padding:6px;border-radius:6px;text-align:center;">
                <p style="font-size:18px;font-weight:700;color:${mine.complianceScore >= 80 ? '#38A169' : '#ED8936'};margin:0;">${mine.complianceScore}%</p>
                <p style="font-size:9px;color:#718096;margin:0;">Compliance</p>
              </div>
            </div>
            <div style="margin-top:8px;font-size:11px;color:#4A5568;">
              <p style="margin:2px 0;">Violations: <strong style="color:#E53E3E">${mine.openViolations}</strong></p>
              <p style="margin:2px 0;">Last Inspection: <strong>${mine.lastInspection}</strong></p>
            </div>
          </div>
        `;
        marker.bindPopup(popup, { maxWidth: 250 });
      });

      // Legend
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-legend');
        div.style.cssText = 'background:white;padding:12px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);font-family:Inter,sans-serif;';
        div.innerHTML = `
          <p style="font-size:11px;font-weight:700;margin:0 0 6px;color:#1A202C;">Risk Level</p>
          ${[{ label: 'Low (0-25)', color: '#38A169' }, { label: 'Medium (26-50)', color: '#ED8936' }, { label: 'High (51-75)', color: '#E53E3E' }, { label: 'Critical (76-100)', color: '#9B2C2C' }]
            .map(l => `<div style="display:flex;align-items:center;gap:6px;margin:3px 0;"><div style="width:10px;height:10px;border-radius:50%;background:${l.color};"></div><span style="font-size:10px;color:#4A5568;">${l.label}</span></div>`).join('')}
        `;
        return div;
      };
      legend.addTo(map);

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="page-container">
      <PageHeader title="Mine Location Map" subtitle="Interactive map showing all registered mines with risk indicators">
        <button className="btn btn-secondary" onClick={() => navigate('/analytics')}>
          <ArrowLeft className="w-4 h-4" /> Analytics
        </button>
      </PageHeader>

      {/* Legend summary */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {[
          { label: 'Low Risk', color: '#38A169', count: mockMines.filter(m => m.riskScore <= 25).length },
          { label: 'Medium Risk', color: '#ED8936', count: mockMines.filter(m => m.riskScore > 25 && m.riskScore <= 50).length },
          { label: 'High Risk', color: '#E53E3E', count: mockMines.filter(m => m.riskScore > 50 && m.riskScore <= 75).length },
          { label: 'Critical', color: '#9B2C2C', count: mockMines.filter(m => m.riskScore > 75).length },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded-full" style={{ background: l.color }} />
            <span className="text-gray-600">{l.label}</span>
            <span className="font-bold text-gray-900">({l.count})</span>
          </div>
        ))}
      </div>

      <div className="card-flat overflow-hidden" style={{ height: '600px' }}>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
}
