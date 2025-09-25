import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, SquareGanttChart } from 'lucide-react';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const { id, title, price, address, bedrooms, bathrooms, sqft, type, images } = property;
  const mainImage = images[0];

  return (
    <Link href={`/properties/${id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:shadow-xl">
        <CardHeader className="relative p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
             <Image
                src={mainImage.url}
                alt={mainImage.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={mainImage.hint}
              />
          </div>
          <Badge variant="secondary" className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm">
            {type}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 font-headline text-xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{address}</p>
          <p className="mt-4 font-headline text-2xl font-bold text-primary">
            ${price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="flex justify-around bg-secondary/50 p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <SquareGanttChart className="h-4 w-4" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
