import { useState } from 'react';
import { CheckCircle2, ChevronDown, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/app/Card';
import { AnimalSoundsGame } from '@/components/app/games/AnimalSoundsGame';
import { FindWordGame } from '@/components/app/games/FindWordGame';
import { RepeatSoundGame } from '@/components/app/games/RepeatSoundGame';
import { VoiceRecorder } from '@/components/app/VoiceRecorder';
import { DILNOZA, MADINA } from '@/data/profiles';
import { MILESTONE_GROUPS, RECORDING_HISTORY, SPEECH_THERAPIST } from '@/data/speech';
import type { SupportedLanguage } from '@/i18n';
import { formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

const CURRENT_GROUP_ID = '2-3y';
const GROUP_ORDER = MILESTONE_GROUPS.map((g) => g.id);
const CURRENT_INDEX = GROUP_ORDER.indexOf(CURRENT_GROUP_ID);

const GAMES = [
  { id: 'repeatSound', Component: RepeatSoundGame },
  { id: 'animalSounds', Component: AnimalSoundsGame },
  { id: 'findWord', Component: FindWordGame },
] as const;

const PROGRESS_COLOR: Record<string, string> = {
  onTrack: 'text-turquoise-600',
  watch: 'text-apricot-600',
  improving: 'text-lapis-600',
};

export function SpeechTab() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [openGame, setOpenGame] = useState<string | null>(null);

  return (
    <div className="space-y-5 px-4 py-5">
      <div className="rounded-2xl border border-apricot-200 bg-apricot-50 p-3 text-xs leading-relaxed text-apricot-800">
        {lng === 'uz'
          ? `Bu boshqa demo profil — ${DILNOZA.name}, ${MADINA.name} (3 yosh) onasi.`
          : `This is a different demo profile — ${DILNOZA.name}, mother of ${MADINA.name} (3 years old).`}
      </div>

      <Card title={t('app.speech.milestonesTitle')}>
        <div className="space-y-3">
          {MILESTONE_GROUPS.map((group, i) => (
            <div key={group.id}>
              <p className={cn('text-xs font-semibold uppercase tracking-wide', i <= CURRENT_INDEX ? 'text-lapis-700' : 'text-ink-500/60')}>
                {group.ageRange[lng]}
              </p>
              <ul className="mt-1 space-y-1">
                {group.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2 text-sm">
                    {i < CURRENT_INDEX ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-600" aria-hidden="true" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-ink-500/30" aria-hidden="true" />
                    )}
                    <span className={i <= CURRENT_INDEX ? 'text-ink-800' : 'text-ink-500/70'}>{item.text[lng]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title={t('app.speech.gamesTitle')}>
        <div className="space-y-2.5">
          {GAMES.map(({ id, Component }) => {
            const open = openGame === id;
            return (
              <div key={id} className="overflow-hidden rounded-xl border border-linen-300">
                <button
                  type="button"
                  onClick={() => setOpenGame(open ? null : id)}
                  className="flex w-full items-center justify-between px-3.5 py-3 text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{t(`app.speech.${id}Title`)}</p>
                    <p className="text-xs text-ink-500">{t(`app.speech.${id}Body`)}</p>
                  </div>
                  <ChevronDown className={cn('h-4 w-4 shrink-0 text-ink-500 transition-transform', open && 'rotate-180')} aria-hidden="true" />
                </button>
                {open && (
                  <div className="border-t border-linen-200 p-3">
                    <Component />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card title={t('app.speech.recordingsTitle')}>
        <VoiceRecorder />
        <ul className="mt-3 space-y-2.5">
          {RECORDING_HISTORY.map((rec) => (
            <li key={rec.id} className="flex items-start justify-between gap-2 border-b border-linen-200 pb-2.5 text-sm last:border-0">
              <div>
                <p className="font-medium text-ink-900">{rec.monthLabel[lng]}</p>
                <p className="text-xs text-ink-500">{rec.therapistNote[lng]}</p>
              </div>
              <span className={cn('shrink-0 text-xs font-semibold', PROGRESS_COLOR[rec.progress])}>
                {rec.progress === 'onTrack' ? '●' : rec.progress === 'improving' ? '↗' : '◐'}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title={t('app.speech.therapistTitle')}>
        <p className="text-sm font-semibold text-ink-900">{SPEECH_THERAPIST.name}</p>
        <p className="text-xs text-ink-500">{SPEECH_THERAPIST.title[lng]}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink-500">{t('app.speech.assignedExercises')}</p>
        <ul className="mt-1 space-y-1">
          {SPEECH_THERAPIST.assignedExercises.map((ex) => (
            <li key={ex.uz} className="text-sm text-ink-700">
              · {ex[lng]}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-linen-100 p-2.5 text-sm italic text-ink-700">“{SPEECH_THERAPIST.lastComment[lng]}”</p>
        <p className="mt-2 text-right text-[11px] text-ink-500">{formatDate(new Date(RECORDING_HISTORY.at(-1)!.date), lng)}</p>
      </Card>
    </div>
  );
}
