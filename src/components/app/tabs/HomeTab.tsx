import { Bell, ChevronRight, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from '@/components/app/Card';
import type { AppTab } from '@/components/app/TabBar';
import { AZIZ, ageInMonths, MALIKA } from '@/data/profiles';
import { cryCountToday, sleepPerDay } from '@/data/monitorStats';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';

const REMINDER_KEYS = ['vaccination', 'feedingLog', 'epds'] as const;

export function HomeTab({ onNavigate }: { onNavigate: (tab: AppTab) => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const lastSleep = sleepPerDay().at(-1);
  const cryToday = cryCountToday();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-xl font-bold text-ink-900">{t('app.greeting', { name: MALIKA.name.split(' ')[0] })}</p>
          <p className="text-sm text-ink-500">{formatDate(new Date(), lng, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lapis-700 font-display text-lg font-bold text-white">
          {MALIKA.name.charAt(0)}
        </div>
      </div>

      <Card title={t('app.home.remindersTitle')}>
        <ul className="space-y-2.5">
          {REMINDER_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Bell className="mt-0.5 h-4 w-4 shrink-0 text-apricot-500" aria-hidden="true" />
              {t(`app.home.reminderItems.${key}`)}
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('app.home.babySnapshotTitle', { name: AZIZ.name })}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-turquoise-100 text-2xl">👶</div>
          <div className="flex-1 text-sm text-ink-700">
            <p>{ageInMonths(AZIZ.birthDate)} {lng === 'uz' ? 'oylik' : 'months old'}</p>
            {lastSleep && (
              <p className="mt-0.5 flex items-center gap-1 text-ink-500">
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                {Math.round(((lastSleep.nightMin + lastSleep.napMin) / 60) * 10) / 10}h · {cryToday} {lng === 'uz' ? 'ta yigʻi bugun' : 'cries today'}
              </p>
            )}
          </div>
        </div>
        <Link
          to="/monitor"
          className="mt-3 flex items-center justify-between rounded-xl bg-lapis-50 px-3.5 py-2.5 text-sm font-semibold text-lapis-700 hover:bg-lapis-100"
        >
          {t('app.home.viewMonitor')}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Card>

      <Card title={t('app.home.recoveryCheckinTitle')}>
        <p className="text-sm text-ink-600">{t('app.home.recoveryCheckinBody')}</p>
        <button
          type="button"
          onClick={() => onNavigate('recovery')}
          className="mt-3 rounded-full bg-turquoise-600 px-4 py-2 text-sm font-semibold text-white hover:bg-turquoise-700"
        >
          {t('app.home.recoveryCheckinCta')}
        </button>
      </Card>

      <Card title={t('app.home.nextCheckupTitle')}>
        <p className="text-sm text-ink-600">
          {formatDate(new Date(Date.now() + 9 * 86400000), lng, { day: 'numeric', month: 'long' })} — {lng === 'uz' ? 'rejalashtirilgan emlash' : 'scheduled vaccination'}
        </p>
      </Card>
    </div>
  );
}
