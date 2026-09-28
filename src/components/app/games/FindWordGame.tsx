import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameComplete } from '@/components/app/games/RepeatSoundGame';
import { createRng } from '@/data/seed';
import { FIND_WORD_GAME } from '@/data/speech';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

const rng = createRng(777);

export function FindWordGame() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const prompt = FIND_WORD_GAME[index];
  const choices = useMemo(() => rng.shuffle([prompt.correct, ...prompt.distractors]), [prompt]);

  function choose(id: string) {
    if (id === prompt.correct.id) {
      setFeedback('correct');
      window.setTimeout(() => {
        setFeedback(null);
        if (index + 1 >= FIND_WORD_GAME.length) setDone(true);
        else setIndex((i) => i + 1);
      }, 700);
    } else {
      setFeedback('wrong');
      window.setTimeout(() => setFeedback(null), 700);
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
      <p className="text-sm text-ink-600">{lng === 'uz' ? 'Qaysi biri shu harf bilan boshlanadi?' : 'Which one starts with this letter?'}</p>
      <p className="mt-1 font-display text-4xl font-bold text-lapis-700">{lng === 'uz' ? prompt.letterUz : prompt.letterEn}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => choose(choice.id)}
            className="flex flex-col items-center gap-1 rounded-lg border border-linen-300 bg-white px-2 py-3 hover:border-lapis-300"
          >
            <span className="text-2xl">{choice.emoji}</span>
            <span className="text-xs font-medium text-ink-700">{choice.label[lng]}</span>
          </button>
        ))}
      </div>
      {feedback && (
        <p className={cn('mt-3 text-sm font-semibold', feedback === 'correct' ? 'text-turquoise-600' : 'text-rose-500')}>
          {feedback === 'correct' ? t('app.speech.correct') : t('app.speech.tryAgain')}
        </p>
      )}
      <p className="mt-2 text-xs text-ink-500">{index + 1} / {FIND_WORD_GAME.length}</p>
    </div>
  );
}
