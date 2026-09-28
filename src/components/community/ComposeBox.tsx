import { useState } from 'react';
import { AlertTriangle, Check, ChevronDown, HeartHandshake, Send, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CommunityProfile } from '@/components/community/VerificationFlow';
import { EXAMPLE_MESSAGES } from '@/data/moderation';
import { moderateText, MODERATION_CATEGORY_LABELS, MODERATION_EXPLANATIONS, type ModerationResult } from '@/lib/moderation';
import type { SupportedLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

export function ComposeBox({
  profile,
  onPost,
  onLog,
}: {
  profile: CommunityProfile;
  onPost: (text: string) => void;
  onLog: (text: string, result: ModerationResult) => void;
}) {
  const { t, i18n } = useTranslation();
  const lng = i18n.resolvedLanguage as SupportedLanguage;
  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [posted, setPosted] = useState(false);
  const [exampleMenuOpen, setExampleMenuOpen] = useState(false);

  function submit() {
    if (!text.trim() || checking) return;
    setChecking(true);
    setResult(null);
    window.setTimeout(() => {
      const r = moderateText(text);
      setChecking(false);
      setResult(r);
      onLog(text, r);
      if (r.action === 'allowed') {
        onPost(text);
        setText('');
        setPosted(true);
        window.setTimeout(() => setPosted(false), 2000);
      }
    }, 700);
  }

  return (
    <div className="rounded-2xl border border-linen-300 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink-900">{profile.pseudonym}</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setExampleMenuOpen((v) => !v)}
            className="flex items-center gap-1 rounded-full border border-linen-300 px-3 py-1 text-xs font-semibold text-ink-600 hover:bg-linen-100"
          >
            {t('community.feed.tryExample')}
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          </button>
          {exampleMenuOpen && (
            <div className="absolute right-0 z-10 mt-1 w-64 rounded-xl border border-linen-300 bg-white py-1 shadow-soft-lapis">
              {EXAMPLE_MESSAGES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    setText(ex.text[lng]);
                    setResult(null);
                    setExampleMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-xs text-ink-700 hover:bg-linen-100"
                >
                  <span className="font-semibold text-lapis-700">{MODERATION_CATEGORY_LABELS[ex.category][lng]}</span>
                  <span className="mt-0.5 block truncate text-ink-500">{ex.text[lng]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setResult(null);
        }}
        placeholder={t('community.feed.composePlaceholder')}
        rows={3}
        className="mt-2 w-full resize-none rounded-xl border border-linen-300 px-3.5 py-2.5 text-sm focus:border-lapis-500 focus:outline-none"
      />

      <div className="mt-2 flex items-center justify-between">
        {posted ? (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-turquoise-600">
            <Check className="h-4 w-4" aria-hidden="true" />
            {t('community.feed.posted')}
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim() || checking}
          className="inline-flex items-center gap-2 rounded-full bg-lapis-700 px-4 py-2 text-sm font-semibold text-white hover:bg-lapis-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          {checking ? t('community.feed.checking') : t('community.feed.post')}
        </button>
      </div>

      {result && result.action !== 'allowed' && (
        <div
          className={cn(
            'mt-3 flex items-start gap-2.5 rounded-xl border p-3 text-sm',
            result.category === 'crisis'
              ? 'border-turquoise-200 bg-turquoise-50 text-turquoise-800'
              : result.action === 'held'
                ? 'border-apricot-200 bg-apricot-50 text-apricot-800'
                : 'border-rose-200 bg-rose-50 text-rose-700',
          )}
        >
          {result.category === 'crisis' ? (
            <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : result.action === 'held' ? (
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <div>
            <p className="font-semibold">
              {result.category === 'crisis'
                ? t('community.moderation.crisisTitle')
                : result.action === 'held'
                  ? t('community.moderation.heldTitle')
                  : t('community.moderation.blockedTitle')}
            </p>
            <p className="mt-0.5">{MODERATION_EXPLANATIONS[result.category as Exclude<typeof result.category, 'ok'>][lng]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
