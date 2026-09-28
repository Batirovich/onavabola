import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CryAlertOverlay } from '@/components/monitor/CryAlertOverlay';
import { CryHeatmap } from '@/components/monitor/CryHeatmap';
import { CryReasonsChart } from '@/components/monitor/CryReasonsChart';
import { DeviceStatusBar } from '@/components/monitor/DeviceStatusBar';
import { DoctorReport } from '@/components/monitor/DoctorReport';
import { FamilyAlerts } from '@/components/monitor/FamilyAlerts';
import { FeedsChart } from '@/components/monitor/FeedsChart';
import { InsightsList } from '@/components/monitor/InsightsList';
import { LearningProgress } from '@/components/monitor/LearningProgress';
import { LiveView } from '@/components/monitor/LiveView';
import { SimulateControls } from '@/components/monitor/SimulateControls';
import { SleepChart } from '@/components/monitor/SleepChart';
import { Timeline24h } from '@/components/monitor/Timeline24h';
import { LEARNING_WINDOW_DAYS } from '@/data/monitor';
import { useMonitorDemo } from '@/hooks/useMonitorDemo';
import { MonitorShell } from '@/components/layout/MonitorShell';
import { usePageMeta } from '@/lib/usePageMeta';

export function Monitor() {
  const { t } = useTranslation();
  usePageMeta('meta.monitor.title', 'meta.monitor.description');
  const { state, simulateCry, giveFeedback, dismissCry, simulateWaking, simulateFeeding, fastForward, toggleFamily } =
    useMonitorDemo();
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <MonitorShell>
      <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <DeviceStatusBar />
          <button
            type="button"
            onClick={() => setReportOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-apricot-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-apricot-600 no-print"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            {t('monitor.doctorReport.cta')}
          </button>
        </div>

        <LiveView babyState={state.babyState} stateSince={state.stateSince} />

        <SimulateControls
          onCry={simulateCry}
          onWaking={simulateWaking}
          onFeeding={simulateFeeding}
          onFastForward={fastForward}
          cryDisabled={!!state.activeCry}
          fastForwardDisabled={state.fastForwarding || state.learningDay >= LEARNING_WINDOW_DAYS}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <LearningProgress learningDay={state.learningDay} confidence={state.confidence} />
          <InsightsList />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-white">{t('monitor.stats.title')}</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <Timeline24h />
            <CryHeatmap />
            <SleepChart />
            <FeedsChart />
            <CryReasonsChart />
            <FamilyAlerts family={state.family} onToggle={toggleFamily} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {state.feedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-turquoise-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-turquoise no-print"
          >
            {t('monitor.simulate.feedLogged')}
          </motion.div>
        )}
      </AnimatePresence>

      {state.activeCry && <CryAlertOverlay cry={state.activeCry} onFeedback={giveFeedback} onDismiss={dismissCry} />}
      {reportOpen && <DoctorReport onClose={() => setReportOpen(false)} />}
    </MonitorShell>
  );
}
