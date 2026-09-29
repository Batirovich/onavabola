import { Day21Section } from '@/components/story/Day21Section';
import { HeroSection } from '@/components/story/HeroSection';
import { JourneyStops } from '@/components/story/JourneyStops';
import { NightScene } from '@/components/story/NightScene';
import { usePageMeta } from '@/lib/usePageMeta';

export function Story() {
  usePageMeta('meta.home.title', 'meta.home.description');

  return (
    <div>
      <HeroSection />
      <NightScene />
      <Day21Section />
      <JourneyStops />
    </div>
  );
}
