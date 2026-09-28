import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Wordmark } from '@/components/brand/Wordmark';
import { TileMotif } from '@/components/brand/TileMotif';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';

const PRODUCT_LINKS = [
  { to: '/monitor', key: 'monitor' as const },
  { to: '/app', key: 'app' as const },
  { to: '/community', key: 'community' as const },
  { to: '/clinic', key: 'clinic' as const },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-(--border) bg-lapis-900 text-white">
      <TileMotif className="absolute inset-0 h-full w-full" color="#ffffff" opacity={0.05} size={72} />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark className="[&_span:last-child]:text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-lapis-200">{t('footer.tagline')}</p>
            <div className="mt-6">
              <LanguageSwitch className="border-white/15 bg-white/5" />
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white">{t('footer.sections.product')}</h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-sm text-lapis-200 transition-colors hover:text-white">
                    {t(`nav.${link.key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white">{t('footer.sections.resources')}</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-lapis-200">{t('footer.demoNotice')}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-lapis-300">{t('footer.rights')}</div>
      </div>
    </footer>
  );
}
