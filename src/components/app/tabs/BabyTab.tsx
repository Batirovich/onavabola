import { useState } from 'react';
import { CheckCircle2, ChevronRight, Circle, Moon, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/app/Card';
import { GROWTH_DATA, GROWTH_MILESTONES, VACCINATIONS } from '@/data/babyCare';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

export function BabyTab() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [logged, setLogged] = useState<string | null>(null);

  function log(kind: string) {
    setLogged(kind);
    window.setTimeout(() => setLogged(null), 1800);
  }

  return (
    <div className="space-y-4 p-4">
      <Card title={t('app.baby.quickLogTitle')}>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => log('feed')}
            className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-apricot-200 bg-apricot-50 py-3 text-sm font-semibold text-apricot-700 hover:bg-apricot-100"
          >
            <Utensils className="h-5 w-5" aria-hidden="true" />
            {t('app.baby.logFeed')}
          </button>
          <button
            type="button"
            onClick={() => log('sleep')}
            className="flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-lapis-200 bg-lapis-50 py-3 text-sm font-semibold text-lapis-700 hover:bg-lapis-100"
          >
            <Moon className="h-5 w-5" aria-hidden="true" />
            {t('app.baby.logSleep')}
          </button>
        </div>
        {logged && <p className="mt-2 text-center text-xs font-medium text-turquoise-600">{t('app.baby.logged')} ✓</p>}
        <Link to="/monitor" className="mt-3 flex items-center justify-between rounded-xl bg-linen-100 px-3.5 py-2.5 text-sm font-semibold text-ink-700 hover:bg-linen-200">
          {t('app.baby.viewMonitorStats')}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Card>

      <Card title={t('app.baby.vaccinationTitle')}>
        <ul className="space-y-2.5">
          {VACCINATIONS.map((v) => (
            <li key={v.id} className="flex items-center gap-3 text-sm">
              {v.status === 'done' ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-turquoise-600" aria-hidden="true" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-ink-500/40" aria-hidden="true" />
              )}
              <div className="flex-1">
                <p className="font-medium text-ink-900">{v.name[lng]}</p>
                <p className="text-xs text-ink-500">
                  {v.ageLabel[lng]} · {formatDate(new Date(v.date), lng, { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <span className={cn('text-xs font-semibold', v.status === 'done' ? 'text-turquoise-600' : 'text-ink-500')}>
                {v.status === 'done' ? t('app.baby.vaccinationDone') : t('app.baby.vaccinationUpcoming')}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('app.baby.growthTitle')}>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={GROWTH_DATA} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
              <XAxis dataKey="ageMonths" stroke="#8A8398" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#8A8398" fontSize={10} tickLine={false} axisLine={false} width={28} />
              <Line type="monotone" dataKey="weightKg" stroke="#1F8A82" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 space-y-1.5">
          {GROWTH_MILESTONES.map((m) => (
            <li key={m.uz} className="flex items-start gap-2 text-sm text-ink-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-600" aria-hidden="true" />
              {m[lng]}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
