import { Suspense } from 'react';
import PropertyCard from '@/components/property-card';
import PropertyFilters from '@/components/property-filters';
import { getProperties, getPropertyTypes } from '@/lib/data';

type PropertiesPageProps = {
  searchParams: {
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    beds?: string;
    baths?: string;
  };
};

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const properties = getProperties({
    type: searchParams.type,
  minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
  maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  beds: searchParams.beds ? Number(searchParams.beds) : undefined,
  baths: searchParams.baths ? Number(searchParams.baths) : undefined,
  });
  const propertyTypes = getPropertyTypes();

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Properties</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find your next home from our exclusive collection.</p>
      </div>
      <Suspense>
        <PropertyFilters propertyTypes={propertyTypes} />
      </Suspense>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.length > 0 ? (
          properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-center text-muted-foreground md:col-span-2 lg:col-span-3">No properties match your criteria.</p>
        )}
      </div>
    </div>
  );
}
