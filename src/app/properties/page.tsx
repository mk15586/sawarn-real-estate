"use client";

import React, { useEffect, useState } from 'react';
import { getProperties, getPropertyTypes } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type PropertiesPageProps = {
  searchParams: Promise<{ type?: string; minPrice?: string; maxPrice?: string; beds?: string; baths?: string; }>;
};

const spring = { type: "spring", stiffness: 60, damping: 20, mass: 0.8 };
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { ...spring, duration: 0.8 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { ...spring, duration: 0.6 } } };

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  // unwrap the potentially async searchParams in client components
  const resolvedSearchParams = React.use(searchParams as any) as { type?: string; minPrice?: string; maxPrice?: string; beds?: string; baths?: string };

  const [properties, setProperties] = useState(() => getProperties({
    type: resolvedSearchParams.type,
    minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    beds: resolvedSearchParams.beds ? Number(resolvedSearchParams.beds) : undefined,
    baths: resolvedSearchParams.baths ? Number(resolvedSearchParams.baths) : undefined,
  }));
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const propertyTypes = getPropertyTypes();

  useEffect(() => {
    setProperties(getProperties({
      type: resolvedSearchParams.type,
      minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
      maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
      beds: resolvedSearchParams.beds ? Number(resolvedSearchParams.beds) : undefined,
      baths: resolvedSearchParams.baths ? Number(resolvedSearchParams.baths) : undefined,
    }));
  }, [resolvedSearchParams]);

  const FilterInput = ({ field }: any) => (
    <motion.div variants={scaleIn}>
      <label className="block text-sm font-semibold text-slate-900 mb-3">{field.label}</label>
          {field.type === 'select' ? (
        <motion.select 
          name={field.name}
          defaultValue={resolvedSearchParams[field.name as keyof typeof resolvedSearchParams] || ""}
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {field.options?.map((opt: string, i: number) => (
            <option key={opt} value={i === 0 ? "" : opt.split('+')[0].trim()}>{opt}</option>
          ))}
        </motion.select>
      ) : (
        <motion.input 
          name={field.name}
          type="number"
          placeholder={field.placeholder}
          defaultValue={resolvedSearchParams[field.name as keyof typeof resolvedSearchParams] || ""}
          className="w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        <motion.div className="absolute top-20 right-20 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500" variants={fadeInUp} initial="hidden" animate="visible">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Properties</span>
            </motion.nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="mb-6" variants={scaleIn}>
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Premium Property Collection
                  </span>
                </motion.div>

                <motion.h1 className="text-5xl lg:text-7xl font-black leading-[0.9] text-slate-900 mb-6" variants={fadeInUp}>
                  Discover Your
                  <span className="block bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">Perfect Space</span>
                </motion.h1>
                
                <motion.p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl" variants={fadeInUp}>
                  Curated collection of exceptional properties where architectural excellence meets luxury living.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                  <motion.button onClick={() => setIsFilterOpen(true)} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-2xl" whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.4 }}>
                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Refine Search
                  </motion.button>
                  
                  <div className="flex items-center bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    {['grid', 'list'].map((mode) => (
                      <motion.button key={mode} onClick={() => setViewMode(mode as 'grid' | 'list')} className={`p-3 ${viewMode === mode ? 'bg-slate-900 text-white' : 'text-slate-600'}`} whileHover={{ scale: viewMode !== mode ? 1.08 : 1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {mode === 'grid' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />}
                        </svg>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.5 }}>
                <motion.div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}>
                  <Image src="/homepage-images/homepage-1.jpg" alt="Luxury Property Showcase" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  <motion.div className="absolute bottom-6 left-6 right-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
                    <motion.div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl" whileHover={{ scale: 1.05, y: -5 }} transition={{ duration: 0.5 }}>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {[{ value: `${properties.length}+`, label: 'Properties' }, { value: '15+', label: 'Locations' }, { value: '98%', label: 'Satisfaction' }].map((stat, i) => (
                          <motion.div key={stat.label} whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                            <motion.div className="text-2xl font-black text-slate-900" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + i * 0.15, duration: 0.6 }}>{stat.value}</motion.div>
                            <div className="text-sm text-slate-600">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={() => setIsFilterOpen(false)} />
            <motion.div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 250, damping: 30 }}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Advanced Filters</h3>
                  <motion.button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-full hover:bg-gray-100" whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              <motion.form method="get" className="p-6 space-y-6 overflow-y-auto h-full pb-32" variants={staggerContainer} initial="hidden" animate="visible">
                {[
                  { name: 'type', label: 'Property Type', type: 'select', options: ['All Types', ...propertyTypes] },
                  { name: 'minPrice', label: 'Min Price', type: 'number', placeholder: 'Min Price' },
                  { name: 'maxPrice', label: 'Max Price', type: 'number', placeholder: 'Max Price' },
                  { name: 'beds', label: 'Bedrooms', type: 'select', options: ['Any Bedrooms', ...Array.from({length: 5}, (_, i) => `${i+1}+ Bedrooms`)] },
                  { name: 'baths', label: 'Bathrooms', type: 'select', options: ['Any Bathrooms', ...Array.from({length: 5}, (_, i) => `${i+1}+ Bathrooms`)] }
                ].map((field) => <FilterInput key={field.name} field={field} />)}

                <motion.div className="flex gap-3 pt-6" variants={scaleIn}>
                  <motion.button type="submit" className="flex-1 bg-slate-900 text-white rounded-2xl px-6 py-4 font-semibold shadow-lg" onClick={() => setIsFilterOpen(false)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>Apply Filters</motion.button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                    <Link href="/properties" className="flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 font-semibold text-slate-700" onClick={() => setIsFilterOpen(false)}>Reset</Link>
                  </motion.div>
                </motion.div>
              </motion.form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Exceptional Properties</h2>
              <p className="text-slate-600">{properties.length} {properties.length === 1 ? 'property' : 'properties'} available</p>
            </div>
            <motion.select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="mt-4 sm:mt-0 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-900 focus:outline-none" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </motion.select>
          </motion.div>

          {properties.length === 0 ? (
            <motion.div className="text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <motion.div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8" animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity }}>
                <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">No Properties Found</h3>
              <p className="text-slate-600 text-xl max-w-md mx-auto mb-8">We couldn't find any properties matching your criteria.</p>
              <motion.button onClick={() => setIsFilterOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-white font-semibold shadow-lg" whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.4 }}>Adjust Filters</motion.button>
            </motion.div>
          ) : (
            <motion.div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              {properties.map((property) => (
                <motion.div key={property.id} variants={scaleIn}>
                  <Link href={`/properties/${property.id}`}>
                    <motion.div className="bg-white rounded-3xl overflow-hidden shadow-xl group" whileHover={{ y: -12, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }} transition={{ duration: 0.5 }}>
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.8 }}>
                              <Image src={property.images[0].url} alt={property.images[0].description} fill className="object-cover" />
                            </motion.div>
                            
                            {/* Glassmorphic Gradient Overlay */}
                            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100" transition={{ duration: 0.5 }} />
                            
                            <div className="absolute top-4 left-4">
                              <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">{property.type}</span>
                            </div>
                            
                            <div className="absolute top-4 right-4">
                              <span className="inline-flex items-center rounded-2xl bg-slate-900/90 backdrop-blur-sm px-4 py-2 text-base font-black text-white shadow-lg">${property.price.toLocaleString()}</span>
                            </div>

                            {/* Ultra Modern Glassmorphic CTA Button */}
                            <motion.div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100" initial={{ y: 30 }} whileHover={{ y: 0 }} transition={{ duration: 0.5 }}>
                              <motion.div className="relative overflow-hidden rounded-3xl p-[2px] bg-gradient-to-r from-white/40 via-white/20 to-white/40" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                {/* Animated Shimmer Effect */}
                                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                                
                                {/* Glassmorphic Button Content */}
                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/20">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-white font-black text-lg tracking-tight">View Property</div>
                                      <div className="text-white/80 text-xs font-medium mt-0.5">Explore full details →</div>
                                    </div>
                                    
                                    {/* Magnetic Floating Icon */}
                                    <motion.div className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl" whileHover={{ scale: 1.15, rotate: 360 }} transition={{ duration: 0.6, type: "spring" }}>
                                      <motion.svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                      </motion.svg>
                                    </motion.div>
                                  </div>
                                </div>
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          <div className="p-6">
                            <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-1">{property.title}</h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-1 flex items-center">
                              <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              {property.address}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm border-t border-slate-100 pt-4">
                              {[{ icon: '🛏️', value: property.bedrooms }, { icon: '🛁', value: property.bathrooms }, { icon: '📐', value: property.sqft.toLocaleString() }].map((item, i) => (
                                <motion.div key={i} className="flex items-center gap-1 text-slate-600" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                    <span className="text-xs">{item.icon}</span>
                                  </div>
                                  <span className="font-medium">{item.value}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col lg:flex-row">
                          <div className="lg:w-1/3 aspect-[4/3] lg:aspect-[3/2] relative overflow-hidden">
                            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.8 }}>
                              <Image src={property.images[0].url} alt={property.images[0].description} fill className="object-cover" />
                            </motion.div>
                          </div>
                          
                          <div className="flex-1 p-6 lg:p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{property.title}</h3>
                                <p className="text-slate-600 flex items-center mb-4">
                                  <svg className="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  {property.address}
                                </p>
                              </div>
                              <div className="text-3xl font-black text-slate-900">${property.price.toLocaleString()}</div>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                              <div className="flex items-center gap-6">
                                {[{ icon: '🛏️', value: `${property.bedrooms} Beds` }, { icon: '🛁', value: `${property.bathrooms} Baths` }, { icon: '📐', value: `${property.sqft.toLocaleString()} sqft` }].map((item, i) => (
                                  <div key={i} className="flex items-center gap-2 text-slate-600">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">{item.icon}</div>
                                    <span className="font-semibold">{item.value}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <motion.div className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg" whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.3)" }} transition={{ duration: 0.3 }}>
                                <span>View Details</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>

      {/* Sticky Contact */}
      <motion.div className="fixed bottom-6 right-6 z-40" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.5 }}>
        <Link href="/contact">
          <motion.div className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-white font-semibold shadow-2xl" whileHover={{ scale: 1.1, y: -8 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.4 }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us
          </motion.div>
        </Link>
      </motion.div>

      <style jsx>{`
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
