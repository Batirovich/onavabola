import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PostCard } from '@/components/community/PostCard';
import { Section, SectionHeading } from '@/components/landing/Section';
import { COMMUNITY_POSTS } from '@/data/community';
import { EXAMPLE_MESSAGES } from '@/data/moderation';
import { moderateText, MODERATION_EXPLANATIONS, type ModerationCategory } from '@/lib/moderation';
import type { SupportedLanguage } from '@/i18n';

const FEATURED_POSTS = COMMUNITY_POSTS.filter((p) => p.replies.some((r) => r.verifiedMidwife)).reduce<typeof COMMUNITY_POSTS>((picked, post) => {
  if (picked.length < 2 && !picked.some((p) => p.author.pseudonym === post.author.pseudonym)) picked.push(post);
  return picked;
}, []);
const MODERATION_EXAMPLE = EXAMPLE_MESSAGES.find((e) => e.id === 'ex-misinfo')!;

function ModerationExample() {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);
  const result = moderateText(MODERATION_EXAMPLE.text[lng]);

  function check() {
    if (checking || checked) return;
    setChecking(true);
    window.setTimeout(() => {
      setChecking(false);
      setChecked(true);
    }, 700);
  }

  return (
    <div className="flex flex-col rounded-3xl border border-linen-300 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-lapis-500">{t('story.community.moderation.eyebrow')}</p>
      <p className="mt-1 font-display text-lg font-bold text-ink-900">{t('story.community.moderation.title')}</p>
      <div className="mt-4 flex-1 rounded-2xl bg-linen-50 p-4">
        <p className="text-sm italic text-ink-700">“{MODERATION_EXAMPLE.text[lng]}”</p>

        {!checked ? (
          <button
            type="button"
            onClick={check}
            disabled={checking}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-lapis-700 px-4 py-2 text-sm font-semibold text-white hover:bg-lapis-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            {checking ? t('community.feed.checking') : t('story.community.moderation.cta')}
          </button>
        ) : (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-apricot-200 bg-apricot-50 p-3 text-sm text-apricot-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{result.action === 'held' ? t('community.moderation.heldTitle') : t('community.moderation.blockedTitle')}</p>
              <p className="mt-0.5">{MODERATION_EXPLANATIONS[result.category as Exclude<ModerationCategory, 'ok'>][lng]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CommunityGlimpse() {
  const { t } = useTranslation();

  return (
    <Section id="community" className="bg-linen-50">
      <SectionHeading title={t('story.community.title')} subtitle={t('story.community.subtitle')} />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {FEATURED_POSTS.map((post) => (
          <PostCard key={post.id} post={post} defaultExpanded />
        ))}
        <ModerationExample />
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/community"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-lapis-700 underline decoration-lapis-300 underline-offset-4 hover:text-lapis-900"
        >
          {t('story.community.cta')}
        </Link>
      </div>
    </Section>
  );
}
