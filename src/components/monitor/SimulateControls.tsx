import { Baby, FastForward, Sun, Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Panel } from '@/components/monitor/Panel';
import { cn } from '@/lib/utils';

function ControlButton({
  icon,
  label,
  onClick,
  disabled,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-1 min-w-[150px] flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        accent
          ? 'border-apricot-400/40 bg-apricot-500/10 text-apricot-200 hover:bg-apricot-500/20'
          : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export function SimulateControls({
  onCry,
  onWaking,
  onFeeding,
  onFastForward,
  cryDisabled,
  fastForwardDisabled,
}: {
  onCry: () => void;
  onWaking: () => void;
  onFeeding: () => void;
  onFastForward: () => void;
  cryDisabled: boolean;
  fastForwardDisabled: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Panel title={t('monitor.simulate.title')} subtitle={t('monitor.simulate.subtitle')} className="no-print">
      <div className="flex flex-wrap gap-3">
        <ControlButton icon={<Baby className="h-5 w-5" aria-hidden="true" />} label={t('monitor.simulate.cry')} onClick={onCry} disabled={cryDisabled} accent />
        <ControlButton icon={<Sun className="h-5 w-5" aria-hidden="true" />} label={t('monitor.simulate.waking')} onClick={onWaking} />
        <ControlButton icon={<Utensils className="h-5 w-5" aria-hidden="true" />} label={t('monitor.simulate.feeding')} onClick={onFeeding} />
        <ControlButton
          icon={<FastForward className="h-5 w-5" aria-hidden="true" />}
          label={t('monitor.simulate.fastForward')}
          onClick={onFastForward}
          disabled={fastForwardDisabled}
        />
      </div>
    </Panel>
  );
}
