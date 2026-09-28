import { useTranslation } from 'react-i18next';
import { CHANNELS, type ChannelId } from '@/data/community';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function ChannelTabs({
  active,
  onChange,
}: {
  active: ChannelId | 'all';
  onChange: (channel: ChannelId | 'all') => void;
}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={cn(
          'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
          active === 'all' ? 'bg-lapis-700 text-white' : 'bg-white text-ink-600 hover:bg-linen-200',
        )}
      >
        {t('community.channels.all')}
      </button>
      {CHANNELS.map((ch) => (
        <button
          key={ch.id}
          type="button"
          onClick={() => onChange(ch.id)}
          className={cn(
            'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            active === ch.id ? 'bg-lapis-700 text-white' : 'bg-white text-ink-600 hover:bg-linen-200',
          )}
        >
          {ch.name[lng]}
        </button>
      ))}
    </div>
  );
}
