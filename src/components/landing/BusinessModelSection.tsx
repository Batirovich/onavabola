import { Building2, Landmark, Smartphone, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, SectionHeading } from '@/components/landing/Section';
import { BUSINESS_MODEL } from '@/data/landing';
import type { SupportedLanguage } from '@/i18n';

const ICONS: Record<string, typeof Wallet> = {
  freemium: Wallet,
  device: Smartphone,
  b2g: Landmark,
  b2b: Building2,
};

export function BusinessModelSection() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Section className="bg-(--bg-elevated)">
      <SectionHeading title={t('landing.business.title')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BUSINESS_MODEL.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <div key={item.id} className="rounded-2xl border border-linen-300 bg-white p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lapis-50 text-lapis-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 font-display text-base font-bold text-(--fg)">{item.title[lng]}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-(--fg-muted)">{item.body[lng]}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
