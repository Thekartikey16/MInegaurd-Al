import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return format(date, 'dd MMM yyyy');
  } catch {
    return '—';
  }
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return format(date, 'dd MMM yyyy, HH:mm');
  } catch {
    return '—';
  }
}

export function formatRelativeTime(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    if (!isValid(date)) return '—';
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return '—';
  }
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '—';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatScore(score) {
  if (score === null || score === undefined) return '—';
  return `${Math.round(score)}/100`;
}

export function formatPercentage(value) {
  if (value === null || value === undefined) return '—';
  return `${Math.round(value)}%`;
}

export function formatProduction(value) {
  if (value === null || value === undefined) return '—';
  return `${value} MT/year`;
}

export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
