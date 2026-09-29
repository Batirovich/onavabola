import { CheckCircle2, ImageIcon, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { MVP_STATUS, type MvpStatusLevel } from '@/data/jury';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

const STATUS_STYLE: Record<MvpStatusLevel, { icon: typeof CheckCircle2; className: string }> = {
  working: { icon: CheckCircle2, className: 'border-turquoise-200 bg-turquoise-50 text-turquoise-800' },
  mockup: { icon: ImageIcon, className: 'border-apricot-200 bg-apricot-50 text-apricot-800' },
  roadmap: { icon: Map, className: 'border-lapis-200 bg-lapis-50 text-lapis-800' },
};

export function MvpStatus({ id }: { id?: string } = {}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section id={id}>
      <SectionHeading title={t('jury.mvpStatus.title')} subtitle={t('jury.mvpStatus.subtitle')} />

      <div className="mt-10 space-y-3">
        {MVP_STATUS.map((item) => {
          const { icon: Icon, className } = STATUS_STYLE[item.status];
          return (
            <div key={item.id} className={cn('flex items-start gap-3 rounded-2xl border p-4', className)}>
              <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">{t(`jury.mvpStatus.levels.${item.status}`)}</p>
                <p className="mt-0.5 text-sm leading-relaxed">{item.label[lng]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
