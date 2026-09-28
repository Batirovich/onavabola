import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('common.themeToggle.switchToLight') : t('common.themeToggle.switchToDark')}
      title={isDark ? t('common.themeToggle.switchToLight') : t('common.themeToggle.switchToDark')}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--border) bg-(--bg-elevated) text-(--fg-muted) transition-colors hover:text-(--fg)',
        className,
      )}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
