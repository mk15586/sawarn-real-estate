import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/property-card';
import { getProperties } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProperties = getProperties({ featured: true });

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[60vh] items-center justify-center bg-secondary text-center">
        <div className="z-10 p-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Into a gallery of elegance
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Your journey to exceptional living starts here. Discover curated properties that define luxury and comfort.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/properties">
                Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/80">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Featured Properties</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked selections from our exclusive portfolio.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
