import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TileMotif } from '@/components/brand/TileMotif';

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-24 text-center">
      <TileMotif className="absolute inset-0 h-full w-full text-lapis-700" opacity={0.06} />
      <div className="relative">
        <p className="font-display text-sm font-bold text-turquoise-600">{t('notFound.eyebrow')}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-(--fg)">{t('notFound.title')}</h1>
        <p className="mx-auto mt-3 max-w-md text-(--fg-muted)">{t('notFound.body')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-lapis-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lapis-600"
        >
          {t('notFound.cta')}
        </Link>
      </div>
    </div>
  );
}
