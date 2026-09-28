import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DemoBadge } from '@/components/layout/DemoBadge';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Clinic } from '@/routes/Clinic';
import { Community } from '@/routes/Community';
import { Landing } from '@/routes/Landing';
import { Monitor } from '@/routes/Monitor';
import { MotherApp } from '@/routes/MotherApp';
import { NotFound } from '@/routes/NotFound';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Landing />} />
            <Route path="app" element={<MotherApp />} />
            <Route path="community" element={<Community />} />
            <Route path="clinic" element={<Clinic />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="monitor" element={<Monitor />} />
        </Routes>
      </BrowserRouter>
      <DemoBadge />
    </ThemeProvider>
  );
}

export default App;
