import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { TileMotif } from '@/components/brand/TileMotif';
import { Wordmark } from '@/components/brand/Wordmark';
import { Waveform } from '@/components/monitor/Waveform';

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

export function Hero() {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const timer = useRef<number | null>(null);

  function trigger() {
    if (playing) return;
    setPlaying(true);
    if (!muted) playChime();
    timer.current = window.setTimeout(() => setPlaying(false), 3200);
  }

  return (
    <section className="relative overflow-hidden bg-lapis-900 text-white">
      <TileMotif className="absolute inset-0 h-full w-full" color="#ffffff" opacity={0.05} size={80} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{t('landing.hero.title')}</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-lapis-100">{t('landing.hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/monitor" className="rounded-full bg-apricot-500 px-6 py-3 text-sm font-semibold text-white hover:bg-apricot-600">
              {t('landing.hero.ctaMonitor')}
            </Link>
            <Link to="/app" className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15">
              {t('landing.hero.ctaApp')}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <DeviceIllustration state={playing ? 'crying' : 'idle'} className="h-48 w-auto" />

          <div className="w-full max-w-[280px] rounded-[2rem] border border-white/15 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <Wordmark className="scale-75 [&_span:last-child]:text-white" />
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={t('landing.hero.muteToggle')}
                className="rounded-full p-1.5 text-lapis-200 hover:bg-white/10 hover:text-white"
              >
                {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>

            {playing && (
              <div className="mt-3 rounded-xl border border-apricot-300/40 bg-apricot-500/15 p-3">
                <p className="text-sm font-semibold text-apricot-200">{t('landing.hero.notification')}</p>
                <div className="mt-2">
                  <Waveform active color="#f0a161" />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={trigger}
              disabled={playing}
              className="mt-3 w-full rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-lapis-800 transition-opacity hover:bg-lapis-50 disabled:opacity-60"
            >
              {t('landing.hero.playCry')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
