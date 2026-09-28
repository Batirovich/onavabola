import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/app/Card';
import { AZIZ, ageInMonths, MALIKA } from '@/data/profiles';
import { regionName } from '@/data/regions';
import type { SupportedLanguage } from '@/i18n';

export function ProfileTab() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="space-y-5 px-4 py-5">
      <div className="flex flex-col items-center py-2 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lapis-700 font-display text-2xl font-bold text-white">
          {MALIKA.pseudonym.charAt(0)}
        </div>
        <p className="mt-2 font-display text-lg font-bold text-ink-900">{MALIKA.pseudonym}</p>
        <p className="text-xs text-ink-500">{t('app.profile.title')}</p>
      </div>

      <Card
        title={t('app.profile.visibleTitle')}
        action={<Eye className="h-4 w-4 text-turquoise-600" aria-hidden="true" />}
      >
        <dl className="space-y-2 text-sm">
          <Row label={t('app.profile.pseudonym')} value={MALIKA.pseudonym} />
          <Row label={t('app.profile.region')} value={regionName(MALIKA.region, lng)} />
          <Row label={t('app.profile.childAge')} value={`${ageInMonths(AZIZ.birthDate)} ${lng === 'uz' ? 'oy' : 'mo'}`} />
        </dl>
      </Card>

      <Card
        title={t('app.profile.privateTitle')}
        action={<EyeOff className="h-4 w-4 text-ink-500" aria-hidden="true" />}
      >
        <dl className="space-y-2 text-sm">
          <Row label={t('app.profile.realName')} value={MALIKA.name} />
          <Row label={t('app.profile.phone')} value="+998 9• ••• •• 12" />
          <Row label={t('app.profile.medicalHistory')} value={lng === 'uz' ? 'Faqat shifokoringizga koʻrinadi' : 'Visible to your doctor only'} />
        </dl>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-linen-200 pb-2 last:border-0">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-medium text-ink-900">{value}</dd>
    </div>
  );
}
