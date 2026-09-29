import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { BabyTabIcon, ClinicIcon, CommunityIcon, MonitorPillarIcon } from '@/components/icons/BrandIcons';
import { Wordmark } from '@/components/brand/Wordmark';
import { DemoBadge } from '@/components/layout/DemoBadge';
import { DemosMenu } from '@/components/layout/DemosMenu';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';

const MOBILE_DEMOS = [
  { to: '/monitor', metaKey: 'monitor', icon: MonitorPillarIcon },
  { to: '/app', metaKey: 'app', icon: BabyTabIcon },
  { to: '/community', metaKey: 'community', icon: CommunityIcon },
  { to: '/clinic', metaKey: 'clinic', icon: ClinicIcon },
] as const;

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
    isActive ? 'bg-lapis-700 text-white' : 'text-(--fg-muted) hover:bg-(--bg-elevated) hover:text-(--fg)',
  );

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/85 backdrop-blur no-print">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="shrink-0" aria-label={t('nav.story')}>
          <Wordmark />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t('nav.menu')}>
          <NavLink to="/" end className={linkClass}>
            {t('nav.story')}
          </NavLink>
          <DemosMenu />
          <NavLink to="/jury" className={linkClass}>
            {t('nav.jury')}
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <DemoBadge />
          <LanguageSwitch />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-(--border) text-(--fg) lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.menu')}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-(--border) lg:hidden"
            aria-label={t('nav.menu')}
          >
            <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              <NavLink to="/" end onClick={() => setMenuOpen(false)} className={linkClass}>
                {t('nav.story')}
              </NavLink>

              <p className="mt-2 px-3.5 text-xs font-semibold uppercase tracking-wide text-(--fg-muted)/70">
                {t('nav.demos')}
              </p>
              {MOBILE_DEMOS.map(({ to, metaKey, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-base font-semibold text-(--fg-muted) transition-colors hover:bg-(--bg-elevated) hover:text-(--fg)"
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                  {t(`meta.${metaKey}.title`)}
                </NavLink>
              ))}

              <NavLink to="/jury" onClick={() => setMenuOpen(false)} className={({ isActive }) => cn(linkClass({ isActive }), 'mt-2')}>
                {t('nav.jury')}
              </NavLink>

              <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-(--border) pt-3">
                <LanguageSwitch />
                <ThemeToggle />
                <DemoBadge />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
