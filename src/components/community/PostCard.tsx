import { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GeometricAvatar } from '@/components/community/GeometricAvatar';
import type { CommunityPost } from '@/data/community';
import { CHANNELS } from '@/data/community';
import { regionName } from '@/data/regions';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

function timeAgo(iso: string, lng: SupportedLanguage): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return lng === 'uz' ? 'bugun' : 'today';
  if (days === 1) return lng === 'uz' ? 'kecha' : 'yesterday';
  return lng === 'uz' ? `${days} kun oldin` : `${days}d ago`;
}

export function PostCard({ post }: { post: CommunityPost }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [expanded, setExpanded] = useState(false);
  const channel = CHANNELS.find((c) => c.id === post.channel);

  return (
    <article className="rounded-2xl border border-linen-300 bg-white p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <GeometricAvatar seed={post.author.avatarSeed} size={38} className="mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
            <span className="font-semibold text-ink-900">{post.author.pseudonym}</span>
            <span className="text-ink-500">· {post.author.contextLabel[lng]}</span>
            <span className="text-ink-400">· {regionName(post.author.region, lng)}</span>
            <span className="text-ink-400">· {timeAgo(post.createdAt, lng)}</span>
          </div>
          {channel && <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-turquoise-600">{channel.name[lng]}</p>}
          <p className="mt-2 font-display text-base font-bold text-ink-900">{post.title[lng]}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{post.body[lng]}</p>

          {post.replies.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 flex items-center gap-1 text-sm font-semibold text-lapis-700 hover:text-lapis-800"
            >
              {t('community.feed.repliesCount', { count: post.replies.length })}
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
            </button>
          )}

          {expanded && (
            <ul className="mt-3 space-y-3 border-t border-linen-200 pt-3">
              {post.replies.map((reply) => (
                <li key={reply.id} className="flex items-start gap-2.5">
                  <GeometricAvatar seed={reply.author.avatarSeed} size={28} className="mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-1.5 text-xs">
                      <span className="font-semibold text-ink-900">{reply.author.pseudonym}</span>
                      {reply.verifiedMidwife && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-turquoise-50 px-2 py-0.5 font-medium text-turquoise-700">
                          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                          {t('community.feed.verifiedMidwife')}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-ink-700">{reply.body[lng]}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
