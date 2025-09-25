import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPropertyById } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Bath, SquareGanttChart, Building2, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InquiryForm from '@/components/inquiry-form';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  const { title, price, address, bedrooms, bathrooms, sqft, type, description, images } = property;

  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Carousel className="w-full overflow-hidden rounded-lg shadow-lg">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full">
                    <Image
                      src={image.url}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.hint}
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl text-primary">${price.toLocaleString()}</CardTitle>
              <div className="flex items-center gap-2 pt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 rounded-md bg-secondary p-3">
                    <BedDouble className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">{bedrooms}</p>
                        <p className="text-muted-foreground">Bedrooms</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary p-3">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">{bathrooms}</p>
                        <p className="text-muted-foreground">Bathrooms</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary p-3">
                    <SquareGanttChart className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">{sqft.toLocaleString()}</p>
                        <p className="text-muted-foreground">sqft</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-secondary p-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-bold">{type}</p>
                        <p className="text-muted-foreground">Type</p>
                    </div>
                </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Inquire About This Property</CardTitle>
            </CardHeader>
            <CardContent>
              <InquiryForm propertyId={property.id} propertyTitle={property.title} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
