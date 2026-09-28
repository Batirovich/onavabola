import { useMemo, useState } from 'react';
import { ShieldCheck, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChannelTabs } from '@/components/community/ChannelTabs';
import { ComposeBox } from '@/components/community/ComposeBox';
import { GeometricAvatar } from '@/components/community/GeometricAvatar';
import { ModerationLog } from '@/components/community/ModerationLog';
import { PostCard } from '@/components/community/PostCard';
import { VerificationFlow, type CommunityProfile } from '@/components/community/VerificationFlow';
import { CHANNELS, COMMUNITY_POSTS, type ChannelId, type CommunityPost } from '@/data/community';
import { SEEDED_MODERATION_LOG, type ModerationLogEntry } from '@/data/moderation';
import type { ModerationResult } from '@/lib/moderation';
import { usePageMeta } from '@/lib/usePageMeta';

function makeSnippet(text: string): string {
  const trimmed = text.trim();
  return trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;
}

export function Community() {
  const { t } = useTranslation();
  usePageMeta('meta.community.title', 'meta.community.description');

  const [verifyOpen, setVerifyOpen] = useState(false);
  const [profile, setProfile] = useState<CommunityProfile | null>(null);
  const [channel, setChannel] = useState<ChannelId | 'all'>('all');
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [log, setLog] = useState<ModerationLogEntry[]>(SEEDED_MODERATION_LOG);

  const posts = useMemo(() => {
    const all = [...userPosts, ...COMMUNITY_POSTS];
    return channel === 'all' ? all : all.filter((p) => p.channel === channel);
  }, [userPosts, channel]);

  function handlePost(text: string) {
    if (!profile) return;
    const snippetTitle = makeSnippet(text);
    const newPost: CommunityPost = {
      id: `user-post-${Date.now()}`,
      channel: channel === 'all' ? CHANNELS[0].id : channel,
      author: {
        pseudonym: profile.pseudonym,
        region: 'tashkent-city',
        contextLabel: { uz: 'Hamjamiyat aʼzosi', en: 'Community member' },
        avatarSeed: profile.avatarSeed,
      },
      title: { uz: snippetTitle, en: snippetTitle },
      body: { uz: text, en: text },
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setUserPosts((prev) => [newPost, ...prev]);
  }

  function handleLog(text: string, result: ModerationResult) {
    if (result.action === 'allowed') return;
    setLog((prev) => [
      {
        id: `log-${Date.now()}`,
        snippet: makeSnippet(text),
        category: result.category,
        action: result.action,
        reviewedByHuman: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-(--fg) sm:text-4xl">{t('meta.community.title')}</h1>
        <p className="mt-3 text-(--fg-muted)">{t('meta.community.description')}</p>
        <p className="mx-auto mt-2 flex max-w-md items-center justify-center gap-1.5 text-xs text-(--fg-muted)">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-turquoise-600" aria-hidden="true" />
          {t('community.eligibility')}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-(--border) bg-(--bg-elevated) p-4 sm:flex-row sm:items-center sm:justify-between">
        {profile ? (
          <div className="flex items-center gap-3">
            <GeometricAvatar seed={profile.avatarSeed} size={36} />
            <p className="text-sm font-semibold text-(--fg)">{profile.pseudonym}</p>
          </div>
        ) : (
          <p className="text-sm text-(--fg-muted)">{t('community.joinBanner')}</p>
        )}
        {!profile && (
          <button
            type="button"
            onClick={() => setVerifyOpen(true)}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-lapis-700 px-4 py-2 text-sm font-semibold text-white hover:bg-lapis-600 sm:w-auto"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            {t('community.joinCta')}
          </button>
        )}
      </div>

      <div className="mt-6">
        <ChannelTabs active={channel} onChange={setChannel} />
      </div>

      {profile && (
        <div className="mt-4">
          <ComposeBox profile={profile} onPost={handlePost} onLog={handleLog} />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-(--border) p-8 text-center text-sm text-(--fg-muted)">
            {t('community.feed.empty')}
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      <div className="mt-10">
        <ModerationLog entries={log} />
      </div>

      {verifyOpen && (
        <VerificationFlow
          onClose={() => setVerifyOpen(false)}
          onComplete={(p) => {
            setProfile(p);
            setVerifyOpen(false);
          }}
        />
      )}
    </div>
  );
}
