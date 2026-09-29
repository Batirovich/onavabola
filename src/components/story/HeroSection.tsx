import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { TileMotif } from '@/components/brand/TileMotif';
import { Wordmark } from '@/components/brand/Wordmark';
import { Waveform } from '@/components/monitor/Waveform';
import { CryPredictionPhone } from '@/components/story/CryPredictionPhone';
import { confidenceForDay, LEARNING_WINDOW_DAYS } from '@/data/monitor';

function playChime() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.18 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.18);
      osc.stop(now + i * 0.18 + 0.4);
    });
    window.setTimeout(() => ctx.close(), 1000);
  } catch {
    // Web Audio unavailable — the visual simulation still plays.
  }
}

const HERO_CONTEXT = { timeSinceLastFeedMin: 190, sleptBeforeMin: 95, hour: 20 };

export function HeroSection() {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const timer = useRef<number | null>(null);

  function trigger() {
    if (playing) return;
    setPlaying(true);
    if (!muted) playChime();
    timer.current = window.setTimeout(() => setPlaying(false), 4200);
  }

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-lapis-900 text-white">
      <TileMotif className="absolute inset-0 h-full w-full" color="#ffffff" opacity={0.05} size={80} />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{t('story.hero.title')}</h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-lapis-100 lg:mx-0">{t('story.hero.subtitle')}</p>
          <div className="mt-9 flex flex-col items-center gap-4 lg:items-start">
            <button
              type="button"
              onClick={trigger}
              disabled={playing}
              className="rounded-full bg-apricot-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(226,146,76,0.6)] transition-transform hover:bg-apricot-600 active:scale-[0.98] disabled:opacity-70"
            >
              {t('story.hero.playCry')}
            </button>
            <a href="#night-scene" className="text-sm font-semibold text-lapis-200 underline decoration-lapis-400 underline-offset-4 hover:text-white">
              {t('story.hero.seeHow')}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <DeviceIllustration state={playing ? 'crying' : 'idle'} className="h-52 w-auto sm:h-60" />

          <div className="w-full max-w-[280px] rounded-[2rem] border border-white/15 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <Wordmark className="scale-75 [&_span:last-child]:text-white" />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={t('story.hero.muteToggle')}
                className="rounded-full p-1.5 text-lapis-200 hover:bg-white/10 hover:text-white"
              >
                {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            {playing ? (
              <div className="mt-3 space-y-3">
                <Waveform active color="#f0a161" />
                <CryPredictionPhone
                  confidence={confidenceForDay(LEARNING_WINDOW_DAYS)}
                  context={HERO_CONTEXT}
                  notification={t('story.hero.notification')}
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={trigger}
                className="mt-3 w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-lapis-800 transition-opacity hover:bg-lapis-50"
              >
                {t('story.hero.playCry')}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
