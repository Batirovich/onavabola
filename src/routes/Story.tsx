import { HeroSection } from '@/components/story/HeroSection';
import { NightScene } from '@/components/story/NightScene';
import { usePageMeta } from '@/lib/usePageMeta';

export function Story() {
  usePageMeta('meta.home.title', 'meta.home.description');

  return (
    <div>
      <HeroSection />
      <NightScene />
    </div>
  );
}
