import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TileMotif } from '@/components/brand/TileMotif';

export function ClosingSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-lapis-900 py-24 text-center text-white">
      <TileMotif className="absolute inset-0 h-full w-full" color="#ffffff" opacity={0.05} size={80} />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">{t('story.closing.line')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <Link
            to="/monitor"
            className="rounded-full bg-apricot-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(226,146,76,0.6)] hover:bg-apricot-600"
          >
            {t('story.closing.seeMonitor')}
          </Link>
          <Link
            to="/jury"
            className="text-sm font-semibold text-lapis-200 underline decoration-lapis-400 underline-offset-4 hover:text-white"
          >
            {t('story.closing.forJury')}
          </Link>
        </div>
      </div>
    </section>
  );
}
