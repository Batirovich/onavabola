import { useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SessionRecording {
  id: string;
  url: string;
  createdAt: Date;
}

export function VoiceRecorder() {
  const { t, i18n } = useTranslation();
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionRecordings, setSessionRecordings] = useState<SessionRecording[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setSessionRecordings((prev) => [{ id: crypto.randomUUID(), url, createdAt: new Date() }, ...prev]);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
    } catch {
      setError(t('app.speech.micPermissionDenied'));
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="rounded-2xl bg-linen-100 p-4">
      <button
        type="button"
        onClick={recording ? stopRecording : startRecording}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold text-white shadow-[0_6px_16px_-6px_rgba(18,23,42,0.35)] transition-transform active:scale-[0.98] ${
          recording ? 'bg-rose-500' : 'bg-apricot-500'
        }`}
      >
        {recording ? <Square className="h-4 w-4" aria-hidden="true" /> : <Mic className="h-4 w-4" aria-hidden="true" />}
        {recording ? t('app.speech.recording') : t('app.speech.recordNew')}
      </button>
      {error && <p className="mt-2 text-xs text-rose-600">{error}</p>}

      {sessionRecordings.length > 0 && (
        <ul className="mt-3 space-y-2">
          {sessionRecordings.map((rec) => (
            <li key={rec.id} className="rounded-lg bg-white p-2.5">
              <p className="text-xs text-ink-500">
                {t('app.speech.recordingSaved')} · {rec.createdAt.toLocaleTimeString(i18n.resolvedLanguage === 'uz' ? 'uz-Latn' : 'en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio controls src={rec.url} className="mt-1.5 h-8 w-full" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
