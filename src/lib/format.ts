import type { SupportedLanguage } from '@/i18n';

export function formatDuration(totalMinutes: number, lng: SupportedLanguage): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (lng === 'uz') {
    return h > 0 ? `${h} soat ${m} daq` : `${m} daq`;
  }
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${m}m`;
}

export function formatClock(date: Date, lng: SupportedLanguage): string {
  return new Intl.DateTimeFormat(lng === 'uz' ? 'uz-Latn' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

export function formatDate(date: Date, lng: SupportedLanguage, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(lng === 'uz' ? 'uz-Latn' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    ...opts,
  }).format(date);
}

export function formatNumber(value: number, lng: SupportedLanguage): string {
  return new Intl.NumberFormat(lng === 'uz' ? 'uz-Latn' : 'en-GB').format(value);
}
