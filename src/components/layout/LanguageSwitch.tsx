import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitch({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div
      role="group"
      aria-label={t('common.language.switcherLabel')}
      className={cn(
        'inline-flex items-center rounded-full border border-(--border) bg-(--bg-elevated) p-0.5 text-sm',
        className,
      )}
    >
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          aria-pressed={current === lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={cn(
            'rounded-full px-2.5 py-1 font-semibold uppercase tracking-wide transition-colors',
            current === lng
              ? 'bg-lapis-700 text-white'
              : 'text-(--fg-muted) hover:text-(--fg)',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
