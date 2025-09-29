"use client";

import { getProperties, getPropertyTypes } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  const [properties, setProperties] = useState(() => 
    getProperties({
      type: searchParams.type,
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      beds: searchParams.beds ? Number(searchParams.beds) : undefined,
      baths: searchParams.baths ? Number(searchParams.baths) : undefined,
    })
  );
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const propertyTypes = getPropertyTypes();
  
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const propertyRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setProperties(
      getProperties({
        type: searchParams.type,
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
        beds: searchParams.beds ? Number(searchParams.beds) : undefined,
        baths: searchParams.baths ? Number(searchParams.baths) : undefined,
      })
    );
  }, [searchParams]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const elementsToObserve = [
      heroRef.current,
      filtersRef.current,
      ...propertyRefs.current.filter(Boolean)
    ];

    elementsToObserve.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [properties]);

  const addToPropertyRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      propertyRefs.current[index] = el;
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Professional Hero Section */}
      <section 
        ref={heroRef}
        className="relative overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Properties</span>
            </nav>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Premium Property Collection
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-black leading-[0.9] text-slate-900 mb-6">
                  Discover Your
                  <span className="block bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                    Perfect Space
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
                  Curated collection of exceptional properties where architectural excellence meets 
                  luxury living. Each space represents the pinnacle of design and craftsmanship.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Refine Search
                  </button>
                  
                  <div className="flex items-center bg-white rounded-2xl shadow-xl border border-slate-200">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-l-2xl transition-colors ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-r-2xl transition-colors ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image 
                    src="/homepage-images/homepage-1.jpg" 
                    alt="Luxury Property Showcase" 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating Stats */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-black text-slate-900">{properties.length}+</div>
                          <div className="text-sm text-slate-600">Properties</div>
                        </div>
                        <div className="border-x border-slate-200">
                          <div className="text-2xl font-black text-slate-900">15+</div>
                          <div className="text-sm text-slate-600">Locations</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black text-slate-900">98%</div>
                          <div className="text-sm text-slate-600">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">Advanced Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form method="get" className="p-6 space-y-6 overflow-y-auto h-full pb-32">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Property Type</label>
              <select 
                name="type" 
                defaultValue={searchParams.type || ""}
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
              >
                <option value="">All Types</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Price Range</label>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  name="minPrice" 
                  type="number" 
                  placeholder="Min Price"
                  defaultValue={searchParams.minPrice || ""}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none" 
                />
                <input 
                  name="maxPrice" 
                  type="number" 
                  placeholder="Max Price"
                  defaultValue={searchParams.maxPrice || ""}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Bedrooms</label>
              <select 
                name="beds" 
                defaultValue={searchParams.beds || ""}
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
              >
                <option value="">Any Bedrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+ Bedrooms</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">Bathrooms</label>
              <select 
                name="baths" 
                defaultValue={searchParams.baths || ""}
                className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition-all duration-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
              >
                <option value="">Any Bathrooms</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}+ Bathrooms</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-6">
              <button 
                type="submit" 
                className="flex-1 bg-slate-900 text-white rounded-2xl px-6 py-4 font-semibold shadow-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-xl"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </button>
              <Link 
                href="/properties" 
                className="flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-300"
                onClick={() => setIsFilterOpen(false)}
              >
                Reset
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Results Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">
                Exceptional Properties
              </h2>
              <p className="text-slate-600">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} available
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Property Grid */}
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">No Properties Found</h3>
              <p className="text-slate-600 text-xl max-w-md mx-auto mb-8">
                We couldn't find any properties matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-white font-semibold shadow-lg hover:bg-slate-800 transition-all duration-300 hover:shadow-xl"
              >
                Adjust Filters
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  ref={(el) => addToPropertyRefs(el, index)}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link href={`/properties/${property.id}`} className="group block">
                    {viewMode === 'grid' ? (
                      // Grid View Card
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image 
                            src={property.images[0].url} 
                            alt={property.images[0].description} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          
                          {/* Overlay Elements */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                          
                          {/* Property Type Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg">
                              {property.type}
                            </span>
                          </div>
                          
                          {/* Price Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center rounded-2xl bg-slate-900/90 backdrop-blur-sm px-4 py-2 text-lg font-black text-white shadow-lg">
                              ${property.price.toLocaleString()}
                            </span>
                          </div>

                          {/* Hover Action */}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                              <div className="flex items-center justify-center gap-2 text-slate-900 font-semibold">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-1 group-hover:text-slate-600 transition-colors">
                            {property.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-1 flex items-center">
                            <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {property.address}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                            <div className="flex items-center gap-1 text-slate-600">
                              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-xs">🛏️</span>
                              </div>
                              <span className="font-medium">{property.bedrooms}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-xs">🛁</span>
                              </div>
                              <span className="font-medium">{property.bathrooms}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-600">
                              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                <span className="text-xs">📐</span>
                              </div>
                              <span className="font-medium">{property.sqft.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // List View Card
                      <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                        <div className="flex flex-col lg:flex-row">
                          <div className="lg:w-1/3 aspect-[4/3] lg:aspect-[3/2] relative overflow-hidden">
                            <Image 
                              src={property.images[0].url} 
                              alt={property.images[0].description} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg">
                                {property.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">
                                    {property.title}
                                  </h3>
                                  <p className="text-slate-600 flex items-center mb-4">
                                    <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {property.address}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-3xl font-black text-slate-900">${property.price.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-slate-600">
                                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    🛏️
                                  </div>
                                  <span className="font-semibold">{property.bedrooms} Beds</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    🛁
                                  </div>
                                  <span className="font-semibold">{property.bathrooms} Baths</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    📐
                                  </div>
                                  <span className="font-semibold">{property.sqft.toLocaleString()} sqft</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-slate-900 font-semibold group-hover:text-slate-600 transition-colors">
                                View Details
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Sticky Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-white font-semibold shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Contact Us
        </Link>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
