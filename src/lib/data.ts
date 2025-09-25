import { PlaceHolderImages } from './placeholder-images';

export type Property = {
  id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: 'Villa' | 'House' | 'Apartment' | 'Townhouse' | 'Cottage' | 'Penthouse';
  description: string;
  featured: boolean;
  images: { id: string; url: string; hint: string, description: string }[];
};

const getImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        // Fallback for safety, though this should not be reached if JSON is correct
        return { id: 'fallback', url: 'https://picsum.photos/seed/error/800/600', hint: 'image', description: 'Placeholder image' };
    }
    return { id: img.id, url: img.imageUrl, hint: img.imageHint, description: img.description };
};

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    price: 1200000,
    address: '123 Elegance Drive, Beverly Hills, CA',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 5500,
    type: 'Villa',
    description: 'A stunning example of modern architecture, this luxury villa offers unparalleled comfort and style. Featuring an open-plan living space, a gourmet kitchen, and breathtaking views, it\'s an oasis of tranquility.',
    featured: true,
    images: [
      getImage('prop1_main'),
      getImage('prop1_living'),
      getImage('prop1_kitchen'),
    ],
  },
  {
    id: '2',
    title: 'Cozy Suburban Family Home',
    price: 750000,
    address: '456 Serenity Lane, Suburbia, TX',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    type: 'House',
    description: 'The perfect family home nestled in a quiet, friendly neighborhood. With a spacious backyard, a newly renovated kitchen, and close proximity to top-rated schools, this house has it all.',
    featured: true,
    images: [
      getImage('prop2_main'),
      getImage('prop2_bedroom'),
    ],
  },
  {
    id: '3',
    title: 'Downtown High-Rise Apartment',
    price: 980000,
    address: '789 Central Ave, Metropolis, NY',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    type: 'Apartment',
    description: 'Experience city living at its finest in this sleek high-rise apartment. Floor-to-ceiling windows offer spectacular city views, and building amenities include a gym, pool, and 24-hour concierge.',
    featured: true,
    images: [
      getImage('prop3_main'),
      getImage('prop3_balcony'),
    ],
  },
  {
    id: '4',
    title: 'Charming Brick Townhouse',
    price: 820000,
    address: '101 Heritage Row, Old Town, VA',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    type: 'Townhouse',
    description: 'A beautifully maintained historic townhouse that blends classic charm with modern updates. Features original hardwood floors, a private patio, and a location that\'s steps away from shops and cafes.',
    featured: true,
    images: [
      getImage('prop4_main'),
    ],
  },
  {
    id: '5',
    title: 'Rustic Countryside Cottage',
    price: 450000,
    address: '222 Meadow Path, Countryside, VT',
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1500,
    type: 'Cottage',
    description: 'Escape the hustle and bustle in this charming countryside cottage. Surrounded by nature, it offers a peaceful retreat with a cozy fireplace and a large garden perfect for relaxation.',
    featured: false,
    images: [
      getImage('prop5_main'),
    ],
  },
  {
    id: '6',
    title: 'Sleek Urban Penthouse',
    price: 2500000,
    address: '99 Skyview Terrace, Penthouse 50, Urban Core, FL',
    bedrooms: 3,
    bathrooms: 4,
    sqft: 4000,
    type: 'Penthouse',
    description: 'The pinnacle of luxury living, this penthouse boasts panoramic city and ocean views from every room. With a private rooftop pool, state-of-the-art technology, and bespoke finishes, this is a truly one-of-a-kind residence.',
    featured: false,
    images: [
      getImage('prop6_main'),
    ],
  },
];

export const getProperties = (filters?: { featured?: boolean, type?: string, minPrice?: number, maxPrice?: number, beds?: number, baths?: number }) => {
  let filteredProperties = properties;

  if (filters) {
    if (filters.featured) {
      filteredProperties = filteredProperties.filter(p => p.featured);
    }
    if (filters.type) {
        filteredProperties = filteredProperties.filter(p => p.type === filters.type);
    }
  const minPrice = filters.minPrice;
  const maxPrice = filters.maxPrice;
  const beds = filters.beds;
  const baths = filters.baths;

  if (minPrice != null) {
    filteredProperties = filteredProperties.filter(p => p.price >= minPrice);
  }
  if (maxPrice != null) {
    filteredProperties = filteredProperties.filter(p => p.price <= maxPrice);
  }
  if (beds != null) {
    filteredProperties = filteredProperties.filter(p => p.bedrooms >= beds);
  }
  if (baths != null) {
    filteredProperties = filteredProperties.filter(p => p.bathrooms >= baths);
  }
  }

  return filteredProperties;
};

export const getPropertyById = (id: string) => {
  return properties.find(p => p.id === id);
};

export const getPropertyTypes = () => {
    return [...new Set(properties.map(p => p.type))];
}
