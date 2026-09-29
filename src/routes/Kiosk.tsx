import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { KIOSK_SLIDES } from '@/components/kiosk/slides';
import { usePageMeta } from '@/lib/usePageMeta';

const SLIDE_DURATION_MS = 10000;
const RESUME_AFTER_MS = 45000;
const CURSOR_IDLE_MS = 3000;

export function Kiosk() {
  const { t, i18n } = useTranslation();
  usePageMeta('meta.home.title', 'meta.home.description');
  const [searchParams] = useSearchParams();
  const alternate = searchParams.get('alternate') === '1';

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  const resumeTimer = useRef<number | null>(null);
  const cursorTimer = useRef<number | null>(null);

  const advance = useCallback(() => {
    setIndex((i) => {
      const next = (i + 1) % KIOSK_SLIDES.length;
      if (next === 0 && alternate) {
        i18n.changeLanguage(i18n.resolvedLanguage === 'uz' ? 'en' : 'uz');
      }
      return next;
    });
  }, [alternate, i18n]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(advance, SLIDE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [paused, advance]);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const handleInteraction = useCallback(() => {
    setPaused(true);
    scheduleResume();
  }, [scheduleResume]);

  useEffect(() => {
    if (!paused && resumeTimer.current) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, [paused]);

  useEffect(() => {
    function onPointer() {
      handleInteraction();
    }
    function onKey() {
      handleInteraction();
    }
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [handleInteraction]);

  useEffect(() => {
    function onMove() {
      setCursorHidden(false);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
      cursorTimer.current = window.setTimeout(() => setCursorHidden(true), CURSOR_IDLE_MS);
    }
    window.addEventListener('mousemove', onMove);
    onMove();
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (cursorTimer.current) window.clearTimeout(cursorTimer.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const Slide = KIOSK_SLIDES[index];

  return (
    <div className={cursorHidden && !paused ? 'h-screen w-screen overflow-hidden cursor-none' : 'h-screen w-screen overflow-hidden'}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full w-full"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      {paused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-900/85 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-8 text-center shadow-soft-night">
            <p className="font-display text-xl font-bold text-ink-900">{t('kiosk.pausedTitle')}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/monitor"
                className="rounded-full bg-apricot-500 px-6 py-3 text-sm font-bold text-white hover:bg-apricot-600"
              >
                {t('kiosk.tryItYourself')}
              </Link>
              <button
                type="button"
                onClick={() => setPaused(false)}
                className="rounded-full border border-ink-300 px-6 py-3 text-sm font-semibold text-ink-700 hover:bg-linen-100"
              >
                {t('kiosk.resume')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
