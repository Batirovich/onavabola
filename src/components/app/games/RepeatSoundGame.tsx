import { useState } from 'react';
import { Mic, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { REPEAT_SOUND_GAME } from '@/data/speech';
import type { SupportedLanguage } from '@/i18n';

export function RepeatSoundGame() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  const prompt = REPEAT_SOUND_GAME[index];

  function next() {
    if (index + 1 >= REPEAT_SOUND_GAME.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (done) {
    return (
      <GameComplete
        onRestart={() => {
          setIndex(0);
          setDone(false);
        }}
      />
    );
  }

  return (
    <div className="rounded-xl bg-linen-100 p-4 text-center">
      <div className="text-5xl">{prompt.card.emoji}</div>
      <p className="mt-2 font-display text-lg font-bold text-ink-900">{prompt.card.label[lng]}</p>
      <button
        type="button"
        onClick={next}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-lapis-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-lapis-600"
      >
        <Mic className="h-4 w-4" aria-hidden="true" />
        {t('app.speech.correct')}
      </button>
      <p className="mt-2 text-xs text-ink-500">{index + 1} / {REPEAT_SOUND_GAME.length}</p>
    </div>
  );
}

export function GameComplete({ onRestart }: { onRestart: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl bg-turquoise-50 p-6 text-center">
      <p className="text-3xl">🎉</p>
      <p className="mt-2 font-display text-base font-bold text-turquoise-700">{t('app.speech.correct')}</p>
      <button
        type="button"
        onClick={onRestart}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-turquoise-300 px-4 py-1.5 text-sm font-semibold text-turquoise-700 hover:bg-turquoise-100"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        {t('app.speech.playAgain')}
      </button>
    </div>
  );
}
