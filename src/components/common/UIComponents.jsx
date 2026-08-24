export function ChartCard({ title, subtitle, children, className = '', action }) {
  return (
    <div className={`chart-container ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="chart-title">{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, maxWidth = '640px' }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

export function TabNav({ tabs, activeTab, onChange }) {
  return (
    <div className="tab-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <tab.icon className="w-4 h-4 inline mr-1.5 -mt-0.5" />}
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function FilterBar({ children }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 p-4 bg-white border border-gray-200 rounded-xl">
      {children}
    </div>
  );
}

export function FilterSelect({ label, value, onChange, options, allLabel = 'All' }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-[11px] font-semibold text-gray-500 uppercase">{label}</label>}
      <select value={value} onChange={e => onChange(e.target.value)} className="form-select text-sm py-1.5 min-w-[140px]">
        <option value="">{allLabel}</option>
        {options.map(opt => (
          <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
