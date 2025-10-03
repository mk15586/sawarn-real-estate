"use client";

import React, { useState, useRef } from 'react';
import { getPropertyById } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

type PageProps = { params: Promise<{ id: string }> };

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 }}
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
};

export default function PropertyDetailPage({ params }: PageProps) {
  // `params` can be a Promise in newer Next.js versions when this is a client component.
  // Unwrap it synchronously with React.use() before accessing properties.
  const resolvedParams = React.use(params as any) as { id: string };
  const property = getPropertyById(resolvedParams.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!property) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-8 text-center">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: "backOut" }} className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-4xl font-black text-slate-900 mb-4">Property Not Found</motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-slate-600 text-lg mb-8">The property you're looking for doesn't exist or may have been removed.</motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
            <Link href="/properties" className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Properties
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const propertyFacts = [
    { label: 'Type', value: property.type, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Bedrooms', value: property.bedrooms, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { label: 'Bathrooms', value: property.bathrooms, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { label: 'Sq Ft', value: property.sqft.toLocaleString(), icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg> },
    { label: 'Price/Sq Ft', value: `$${Math.round(property.price / property.sqft)}`, icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { label: 'Year Built', value: '2020', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { label: 'Lot Size', value: '0.25 ac', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    { label: 'Status', value: 'Available', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'location', label: 'Location' },
    { id: 'features', label: 'Features' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
  <motion.section style={{ y: heroY }} className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image src={property.images[0].url} alt={property.images[0].description} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

  <motion.nav initial={{ y: -32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute top-0 left-0 right-0 z-20 py-4 px-4 sm:p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-white/90 font-medium">
              <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
              <span className="text-white/50">/</span>
              <span className="text-white truncate max-w-64">{property.title}</span>
            </div>
            <div className="flex items-center gap-4">
              {[
                { d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
                { d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" }
              ].map((icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon.d} />
                  </svg>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.nav>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center text-white">
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-semibold mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              {property.type} • Available Now
            </motion.div>
            <motion.h1 initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight">{property.title}</motion.h1>
            <motion.div initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex items-center justify-center gap-3 text-sm sm:text-base mb-8 text-white/90">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.address}
            </motion.div>
            <motion.div initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 tracking-tight">${property.price.toLocaleString()}</motion.div>
            <motion.div initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsContactFormOpen(true)} className="px-6 sm:px-10 py-3 sm:py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">Schedule Tour</motion.button>
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsImageModalOpen(true)} className="px-6 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300">View Gallery ({property.images.length})</motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 backdrop-blur-sm">
            <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      <main className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-8">
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-slate-900">Property Gallery</h2>
                  <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} onClick={() => setIsImageModalOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View All {property.images.length}
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {property.images.slice(0, 8).map((image, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02, y: -2 }} className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300" onClick={() => { setSelectedImageIndex(index); setIsImageModalOpen(true); }}>
                      <Image src={image.url} alt={image.description} fill className="object-cover" />
                      {index === 0 && <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">Featured</div>}
                      {index === 7 && property.images.length > 8 && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"><span className="text-white font-bold text-xl">+{property.images.length - 8}</span></div>}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section variants={fadeInUp} className="mb-16">
                <div className="border-b border-slate-200 mb-8">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative py-4 px-2 font-semibold text-sm transition-all duration-300 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                        {tab.label}
                        {activeTab === tab.id && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full" transition={{ type: "spring", duration: 0.5 }} />}
                      </button>
                    ))}
                  </nav>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8">
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 mb-6">Property Overview</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                            {[
                              { label: 'Bedrooms', value: property.bedrooms, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                              { label: 'Bathrooms', value: property.bathrooms, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                              { label: 'Square Feet', value: property.sqft.toLocaleString(), icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg> },
                              { label: 'Property Type', value: property.type, icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> }
                            ].map((stat, index) => (
                              <div key={index} className="text-center p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl">
                                <div className="text-slate-600 mb-3 flex justify-center">{stat.icon}</div>
                                <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-600 font-semibold">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="prose prose-slate prose-lg max-w-none">
                          <p className="text-slate-700 leading-relaxed text-lg font-medium">{property.description}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'details' && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 mb-6">Property Specifications</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                          {[
                            { title: 'Interior Features', items: ['Premium Hardwood Floors', 'Granite Countertops', 'Stainless Steel Appliances', 'Walk-in Closets', 'Central Air & Heating', 'Smart Home Technology'] },
                            { title: 'Exterior Features', items: ['Private Landscaped Yard', 'Two-Car Garage', 'Security System', 'Covered Patio', 'Sprinkler System', 'Energy Efficient Windows'] }
                          ].map((section, idx) => (
                            <div key={idx} className="space-y-6">
                              <h4 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">{section.title}</h4>
                              <div className="space-y-4">
                                {section.items.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-3 py-2">
                                    <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'location' && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900">Location & Neighborhood</h3>
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-12 text-center">
                          <svg className="w-16 h-16 mx-auto mb-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">Interactive Map</h4>
                          <p className="text-slate-600 font-medium">Coming Soon</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { title: 'Schools', items: ['Elementary: 0.3 mi', 'Middle School: 0.8 mi', 'High School: 1.2 mi'] },
                            { title: 'Shopping', items: ['Grocery Store: 0.5 mi', 'Shopping Center: 1.1 mi', 'Mall: 2.3 mi'] },
                            { title: 'Transport', items: ['Bus Stop: 0.2 mi', 'Train Station: 1.5 mi', 'Airport: 12 mi'] }
                          ].map((category, index) => (
                            <div key={index} className="bg-slate-50 rounded-2xl p-6">
                              <h5 className="font-bold text-slate-900 mb-4">{category.title}</h5>
                              <div className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                  <div key={itemIndex} className="text-sm text-slate-600 font-medium">{item}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900">Premium Features</h3>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white">
                          <svg className="w-16 h-16 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <h4 className="text-2xl font-bold mb-4">3D Virtual Tour</h4>
                          <p className="text-white/80 mb-8 text-lg">Experience every detail of this property from anywhere</p>
                          <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg">Launch Virtual Tour</button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.section>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                
                <motion.div variants={scaleIn} className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Ready to Visit?</h3>
                    <p className="text-slate-600 font-medium text-sm">Connect with our property specialist</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Call (555) 123-4567', bg: 'bg-slate-900 hover:bg-slate-800' },
                      { label: 'Request Info', bg: 'bg-slate-100 hover:bg-slate-200 text-slate-900' },
                      { label: 'Schedule Tour', bg: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600' }
                    ].map((btn, i) => (
                      <motion.button key={i} whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} onClick={i === 1 ? () => setIsContactFormOpen(true) : undefined} className={`w-full ${btn.bg} text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}>{btn.label}</motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={scaleIn} className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
                    <h3 className="text-lg font-black text-white">Property Facts</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {propertyFacts.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-slate-600 mb-2">{item.icon}</div>
                          <div className="text-sm font-bold text-slate-900 mb-0.5">{item.value}</div>
                          <div className="text-xs text-slate-600 font-medium">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setIsImageModalOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative max-w-6xl w-full aspect-video" onClick={(e) => e.stopPropagation()}>
              <Image src={property.images[selectedImageIndex].url} alt={property.images[selectedImageIndex].description} fill className="object-contain rounded-3xl" />
              
              {['M15 19l-7-7 7-7', 'M9 5l7 7-7 7'].map((path, i) => (
                <button key={i} onClick={() => setSelectedImageIndex(i === 0 ? Math.max(0, selectedImageIndex - 1) : Math.min(property.images.length - 1, selectedImageIndex + 1))} disabled={i === 0 ? selectedImageIndex === 0 : selectedImageIndex === property.images.length - 1} className={`absolute ${i === 0 ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm text-white rounded-2xl hover:bg-black/70 transition-all duration-300 disabled:opacity-30`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                  </svg>
                </button>
              ))}

              <button onClick={() => setIsImageModalOpen(false)} className="absolute top-4 right-4 p-4 bg-black/50 backdrop-blur-sm text-white rounded-2xl hover:bg-black/70 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-bold">{selectedImageIndex + 1} of {property.images.length}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8" onClick={() => setIsContactFormOpen(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900">Contact Us</h3>
                <button onClick={() => setIsContactFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {['First Name', 'Last Name'].map((label, i) => (
                    <input key={i} type="text" placeholder={label} className="px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold" />
                  ))}
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold" />
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 resize-none font-semibold" />
                <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl">Send Message</motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
