import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Wordmark } from '@/components/brand/Wordmark';
import { DemoBadge } from '@/components/layout/DemoBadge';
import { LanguageSwitch } from '@/components/layout/LanguageSwitch';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { to: '/', key: 'home' as const, end: true },
  { to: '/monitor', key: 'monitor' as const, end: false },
  { to: '/app', key: 'app' as const, end: false },
  { to: '/community', key: 'community' as const, end: false },
  { to: '/clinic', key: 'clinic' as const, end: false },
];

export function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--bg)/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="shrink-0" aria-label={t('nav.home')}>
          <Wordmark />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t('nav.menu')}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-lapis-700 text-white' : 'text-(--fg-muted) hover:bg-(--bg-elevated) hover:text-(--fg)',
                )
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
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
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2.5 text-base font-semibold transition-colors',
                      isActive ? 'bg-lapis-700 text-white' : 'text-(--fg-muted) hover:bg-(--bg-elevated) hover:text-(--fg)',
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                </NavLink>
              ))}
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
