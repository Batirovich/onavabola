import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GameComplete } from '@/components/app/games/RepeatSoundGame';
import { createRng } from '@/data/seed';
import { ANIMAL_SOUND_GAME } from '@/data/speech';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

const rng = createRng(555);

export function AnimalSoundsGame() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const prompt = ANIMAL_SOUND_GAME[index];

  const choices = useMemo(() => {
    const distractors = rng.pickMany(
      ANIMAL_SOUND_GAME.filter((a) => a.id !== prompt.id),
      2,
    );
    return rng.shuffle([prompt, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt.id]);

  function choose(id: string) {
    if (id === prompt.id) {
      setFeedback('correct');
      window.setTimeout(() => {
        setFeedback(null);
        if (index + 1 >= ANIMAL_SOUND_GAME.length) setDone(true);
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
      <div className="text-5xl">{prompt.emoji}</div>
      <p className="mt-2 text-sm text-ink-600">{lng === 'uz' ? 'Bu qanday ovoz chiqaradi?' : 'What sound does this make?'}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => choose(choice.id)}
            className="rounded-lg border border-linen-300 bg-white px-2 py-2 text-sm font-medium text-ink-800 hover:border-lapis-300"
          >
            {lng === 'uz' ? choice.soundUz : choice.soundEn}
          </button>
        ))}
      </div>
      {feedback && (
        <p className={cn('mt-3 text-sm font-semibold', feedback === 'correct' ? 'text-turquoise-600' : 'text-rose-500')}>
          {feedback === 'correct' ? t('app.speech.correct') : t('app.speech.tryAgain')}
        </p>
      )}
      <p className="mt-2 text-xs text-ink-500">{index + 1} / {ANIMAL_SOUND_GAME.length}</p>
    </div>
  );
}
