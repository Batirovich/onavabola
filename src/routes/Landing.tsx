import { BusinessModelSection } from '@/components/landing/BusinessModelSection';
import { HealthSystemSection } from '@/components/landing/HealthSystemSection';
import { Hero } from '@/components/landing/Hero';
import { MonitorLearningSection } from '@/components/landing/MonitorLearningSection';
import { PillarsSection } from '@/components/landing/PillarsSection';
import { ProblemTimeline } from '@/components/landing/ProblemTimeline';
import { RoadmapSection } from '@/components/landing/RoadmapSection';
import { SafetySection } from '@/components/landing/SafetySection';
import { TeamSection } from '@/components/landing/TeamSection';
import { WhyDifferentSection } from '@/components/landing/WhyDifferentSection';
import { usePageMeta } from '@/lib/usePageMeta';

export function Landing() {
  usePageMeta('meta.home.title', 'meta.home.description');

  return (
    <div>
      <Hero />
      <ProblemTimeline />
      <PillarsSection />
      <MonitorLearningSection />
      <HealthSystemSection />
      <WhyDifferentSection />
      <BusinessModelSection />
      <RoadmapSection />
      <TeamSection />
      <SafetySection />
    </div>
  );
}
