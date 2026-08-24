import { RISK_LEVELS } from '../../config/constants';

export function RiskBadge({ level, showLabel = true, size = 'md' }) {
  const config = RISK_LEVELS[level?.toUpperCase()] || RISK_LEVELS.LOW;
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-xs px-2.5 py-1';
  return (
    <span
      className={`badge ${sizeClasses} ${level === 'critical' ? 'pulse-critical' : ''}`}
      style={{ background: config.bg, color: config.color, fontWeight: 700 }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.color }} />
      {showLabel && config.label}
    </span>
  );
}

export function StatusBadge({ status, statusConfig, size = 'md' }) {
  let config = statusConfig?.[status?.toUpperCase()] || statusConfig?.[status];
  if (!config) {
    config = { label: status || 'Unknown', color: '#718096', bg: '#F7FAFC' };
  }
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span
      className={`badge ${sizeClasses}`}
      style={{
        background: `${config.color}15`,
        color: config.color,
        fontWeight: 600,
      }}
    >
      {config.label}
    </span>
  );
}

export function ScoreBadge({ score, label }) {
  const getColor = (s) => {
    if (s >= 80) return '#38A169';
    if (s >= 60) return '#ED8936';
    if (s >= 40) return '#E53E3E';
    return '#9B2C2C';
  };
  const color = getColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
        style={{ background: color }}>
        {Math.round(score)}
      </div>
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </div>
  );
}

export function AIBadge({ small = false }) {
  return (
    <span className={`ai-badge ${small ? 'text-[9px] px-1.5 py-0.5' : ''}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      AI
    </span>
  );
}

export function ConfidenceScore({ value, size = 'md' }) {
  const percentage = Math.round(value * 100);
  const color = percentage >= 80 ? '#38A169' : percentage >= 60 ? '#ED8936' : '#E53E3E';
  if (size === 'sm') {
    return (
      <span className="text-xs font-semibold" style={{ color }}>
        {percentage}%
      </span>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden" style={{ maxWidth: '80px' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${percentage}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{percentage}%</span>
    </div>
  );
}
