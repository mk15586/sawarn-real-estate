import HomepageHero from '@/components/homepage/hero';
import HomepageProperties from '@/components/homepage/properties';
import HomepageAbout from '@/components/homepage/about';
import HomepageGallery from '@/components/homepage/gallery';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HomepageHero />
      <HomepageProperties />
      <HomepageAbout />
      <HomepageGallery />
    </div>
  );
}
