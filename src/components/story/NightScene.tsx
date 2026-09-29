import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DeviceIllustration } from '@/components/brand/DeviceIllustration';
import { Waveform } from '@/components/monitor/Waveform';
import { CryPredictionPhone } from '@/components/story/CryPredictionPhone';
import { confidenceForDay, LEARNING_WINDOW_DAYS } from '@/data/monitor';
import { cn } from '@/lib/utils';

const NIGHT_CONTEXT = { timeSinceLastFeedMin: 205, sleptBeforeMin: 40, hour: 3 };
const EARLY_DAY = 3;
const STEP_COUNT = 4;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

function StepVisual({ step }: { step: number }) {
  const { t } = useTranslation();

  if (step === 0) {
    return <DeviceIllustration state="idle" className="h-40 w-auto sm:h-48" />;
  }

  if (step === 1) {
    return (
      <div className="flex flex-col items-center gap-4">
        <DeviceIllustration state="crying" className="h-40 w-auto sm:h-48" />
        <Waveform active color="#f0a161" />
      </div>
    );
  }

  if (step === 2) {
    const confidence = confidenceForDay(EARLY_DAY);
    return (
      <div className="w-full max-w-[280px] space-y-3">
        <DeviceIllustration state="crying" className="mx-auto h-28 w-auto" />
        <CryPredictionPhone confidence={confidence} context={NIGHT_CONTEXT} notification={t('story.hero.notification')} />
        <p className="text-center text-xs text-lapis-300">{t('story.night.dayConfidence', { day: EARLY_DAY, value: confidence })}</p>
      </div>
    );
  }

  const delta = confidenceForDay(LEARNING_WINDOW_DAYS) - confidenceForDay(EARLY_DAY);
  return (
    <div className="flex flex-col items-center gap-4">
      <DeviceIllustration state="idle" className="h-40 w-auto sm:h-48" />
      <div className="flex items-center gap-2 rounded-full bg-turquoise-500/15 px-4 py-2 text-sm font-semibold text-turquoise-200">
        <Check className="h-4 w-4" aria-hidden="true" />
        {t('story.night.confidenceUp', { value: delta })}
      </div>
    </div>
  );
}

function StillSteps({ steps }: { steps: { title: string; body: string }[] }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-apricot-400">{t('story.night.eyebrow')}</p>
      <div className="mt-10 space-y-16">
        {steps.map((s, i) => (
          <div key={s.title} className="grid gap-8 sm:grid-cols-2 sm:items-center">
            <div className={i % 2 === 1 ? 'sm:order-2' : ''}>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{s.title}</h2>
              <p className="mt-3 max-w-md text-lapis-100">{s.body}</p>
            </div>
            <div className="flex justify-center">
              <StepVisual step={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NightScene() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const useSticky = isDesktop && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(v * STEP_COUNT))));
  });

  const steps = Array.from({ length: STEP_COUNT }, (_, i) => ({
    title: t(`story.night.step${i + 1}Title`),
    body: t(`story.night.step${i + 1}Body`),
  }));

  if (!useSticky) {
    return (
      <section id="night-scene" className="bg-night-900 py-20 text-white">
        <StillSteps steps={steps} />
      </section>
    );
  }

  return (
    <section id="night-scene" ref={containerRef} className="relative bg-night-900 text-white" style={{ height: `${STEP_COUNT * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-apricot-400">{t('story.night.eyebrow')}</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{steps[active].title}</h2>
                <p className="mt-4 max-w-md text-lg text-lapis-100">{steps[active].body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 flex gap-2" role="presentation">
              {steps.map((s, i) => (
                <div key={s.title} className={cn('h-1.5 w-8 rounded-full transition-colors', i === active ? 'bg-apricot-400' : 'bg-white/15')} />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <StepVisual step={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
