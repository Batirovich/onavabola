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

const UZ_MONTHS_LONG = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
];
const UZ_MONTHS_SHORT = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const UZ_WEEKDAYS_LONG = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

/**
 * Uzbek month/weekday names are formatted by hand rather than via
 * `Intl.DateTimeFormat('uz', ...)`. Node and full-ICU browsers handle that
 * locale fine, but some minimal-ICU Chromium builds (notably headless-shell,
 * used by automated testing) silently fall back to garbled output like
 * "M09 28, Mon" — not a risk worth taking for a live jury demo.
 */
export function formatDate(date: Date, lng: SupportedLanguage, opts?: Intl.DateTimeFormatOptions): string {
  if (lng !== 'uz') {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', ...opts }).format(date);
  }

  const day = date.getDate();
  const month = opts?.month === 'short' ? UZ_MONTHS_SHORT[date.getMonth()] : UZ_MONTHS_LONG[date.getMonth()];
  const weekday = opts?.weekday ? UZ_WEEKDAYS_LONG[date.getDay()] : null;
  const datePart = opts?.month === 'short' ? `${day} ${month}` : `${day}-${month}`;
  return weekday ? `${weekday}, ${datePart}` : datePart;
}

export function formatNumber(value: number, lng: SupportedLanguage): string {
  if (lng !== 'uz') return new Intl.NumberFormat('en-GB').format(value);
  // Uzbek convention: space-grouped thousands, comma decimal — hand-rolled
  // for the same reason as formatDate (see comment above).
  const [intPart, decPart] = Math.abs(value).toFixed(2).replace(/\.00$/, '').split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sign = value < 0 ? '-' : '';
  return decPart ? `${sign}${grouped},${decPart}` : `${sign}${grouped}`;
}
