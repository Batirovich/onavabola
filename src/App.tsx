import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SiteLayout } from '@/components/layout/SiteLayout';

const Story = lazy(() => import('@/routes/Story').then((m) => ({ default: m.Story })));
const Monitor = lazy(() => import('@/routes/Monitor').then((m) => ({ default: m.Monitor })));
const MotherApp = lazy(() => import('@/routes/MotherApp').then((m) => ({ default: m.MotherApp })));
const Community = lazy(() => import('@/routes/Community').then((m) => ({ default: m.Community })));
const Clinic = lazy(() => import('@/routes/Clinic').then((m) => ({ default: m.Clinic })));
const NotFound = lazy(() => import('@/routes/NotFound').then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-sm text-(--fg-muted)">{t('common.loading')}</div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route index element={<Story />} />
                <Route path="app" element={<MotherApp />} />
                <Route path="community" element={<Community />} />
                <Route path="clinic" element={<Clinic />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="monitor" element={<Monitor />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
