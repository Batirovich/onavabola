import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { BabyTabIcon, ClinicIcon, CommunityIcon, MonitorPillarIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/lib/utils';

const DEMOS = [
  { to: '/monitor', metaKey: 'monitor', icon: MonitorPillarIcon },
  { to: '/app', metaKey: 'app', icon: BabyTabIcon },
  { to: '/community', metaKey: 'community', icon: CommunityIcon },
  { to: '/clinic', metaKey: 'clinic', icon: ClinicIcon },
] as const;

/** Header dropdown listing the four demo pages, each with its bespoke icon and one-line description reused from `meta.*.description`. */
export function DemosMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors',
          open ? 'bg-lapis-700 text-white' : 'text-(--fg-muted) hover:bg-(--bg-elevated) hover:text-(--fg)',
        )}
      >
        {t('nav.demos')}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 rounded-2xl border border-(--border) bg-(--bg-elevated) p-2 shadow-soft-lapis"
          >
            {DEMOS.map(({ to, metaKey, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-(--bg)"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lapis-700 text-white">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-(--fg)">{t(`meta.${metaKey}.title`)}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-(--fg-muted)">
                    {t(`meta.${metaKey}.description`)}
                  </span>
                </span>
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
