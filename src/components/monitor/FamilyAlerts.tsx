import { useTranslation } from 'react-i18next';
import type { FamilyAlertMember } from '@/data/monitor';
import { Panel } from '@/components/monitor/Panel';
import type { SupportedLanguage } from '@/i18n';

export function FamilyAlerts({ family, onToggle }: { family: FamilyAlertMember[]; onToggle: (id: string) => void }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <Panel title={t('monitor.family.title')} subtitle={t('monitor.family.subtitle')} className="no-print">
      <ul className="space-y-2">
        {family.map((member) => (
          <li key={member.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">{member.name}</p>
              <p className="text-xs text-night-50">{member.role[lng]}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={member.enabled}
              aria-label={member.name}
              onClick={() => onToggle(member.id)}
              className={`relative h-6 w-11 rounded-full transition-colors ${member.enabled ? 'bg-turquoise-500' : 'bg-white/15'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${member.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
