import { Bell, ChevronRight, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card } from '@/components/app/Card';
import { ListGroup, ListRow } from '@/components/app/ListRow';
import type { AppTab } from '@/components/app/TabBar';
import { AZIZ, ageInMonths, MALIKA, TODAY } from '@/data/profiles';
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
    <div className="space-y-5 px-4 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-ink-900">{t('app.greeting', { name: MALIKA.name.split(' ')[0] })}</p>
          <p className="text-sm text-ink-500">{formatDate(TODAY, lng, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lapis-700 font-display text-lg font-bold text-white shadow-[0_4px_10px_-2px_rgba(21,43,84,0.4)]">
          {MALIKA.name.charAt(0)}
        </div>
      </div>

      <Card title={t('app.home.remindersTitle')}>
        <ListGroup className="-mx-1 bg-transparent divide-linen-200">
          {REMINDER_KEYS.map((key) => (
            <ListRow key={key} icon={<Bell className="h-4 w-4" aria-hidden="true" />} iconTone="apricot" title={t(`app.home.reminderItems.${key}`)} />
          ))}
        </ListGroup>
      </Card>

      <Card title={t('app.home.babySnapshotTitle', { name: AZIZ.name })}>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-turquoise-100 text-3xl">👶</div>
          <div className="flex-1 text-sm text-ink-700">
            <p className="font-medium">{ageInMonths(AZIZ.birthDate)} {lng === 'uz' ? 'oylik' : 'months old'}</p>
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
          className="mt-4 flex items-center justify-between rounded-2xl bg-lapis-700 px-4 py-3.5 text-sm font-bold text-white shadow-[0_6px_16px_-6px_rgba(21,43,84,0.5)] transition-transform active:scale-[0.98]"
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
          className="mt-4 w-full rounded-2xl bg-turquoise-600 py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(31,138,130,0.5)] transition-transform active:scale-[0.98]"
        >
          {t('app.home.recoveryCheckinCta')}
        </button>
      </Card>

      <Card title={t('app.home.nextCheckupTitle')}>
        <p className="text-sm text-ink-600">
          {formatDate(new Date(TODAY.getTime() + 9 * 86400000), lng, { day: 'numeric', month: 'long' })} — {lng === 'uz' ? 'rejalashtirilgan emlash' : 'scheduled vaccination'}
        </p>
      </Card>
    </div>
  );
}
