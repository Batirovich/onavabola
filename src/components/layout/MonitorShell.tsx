import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Wordmark } from '@/components/brand/Wordmark';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';

/**
 * Standalone dark "night mode" chrome for /monitor — deliberately outside
 * SiteLayout so the showpiece page is fully immersive rather than boxed
 * inside the light-mode site header/footer. See DECISIONS.md.
 */
export function MonitorShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div data-theme="dark" className="min-h-screen bg-night-700 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-night-700/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-night-50 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('nav.home')}
          </Link>
          <Wordmark className="[&_span:last-child]:text-white" />
          <LanguageSwitch className="border-white/15 bg-white/5" />
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
