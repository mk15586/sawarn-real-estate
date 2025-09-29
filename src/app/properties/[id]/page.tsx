"use client";

import { getPropertyById } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

type PageProps = { 
  params: { id: string } 
};

// Perfect animation variants with consistent timing
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export default function PropertyDetailPage({ params }: PageProps) {
  const property = getPropertyById(params.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!property) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center"
      >
        <div className="max-w-md mx-auto px-8 text-center">
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-2xl"
          >
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-black text-slate-900 mb-4 leading-tight"
          >
            Property Not Found
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-600 text-lg mb-8 leading-relaxed"
          >
            The property you're looking for doesn't exist or may have been removed.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link 
              href="/properties" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
            >
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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Structured Hero Section */}
      <motion.section 
        style={{ y: heroY }}
        className="relative h-screen overflow-hidden"
      >
        {/* Background Image with Perfect Positioning */}
        <div className="absolute inset-0">
          <Image 
            src={property.images[0].url} 
            alt={property.images[0].description} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        {/* Perfectly Aligned Navigation */}
        <motion.nav 
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 right-0 z-20 p-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-white/90 font-medium">
              <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
              <span className="text-white/50">/</span>
              <span className="text-white truncate max-w-64">{property.title}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Perfectly Centered Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-4xl mx-auto px-8 text-center text-white">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-sm font-semibold mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              {property.type} • Available Now
            </motion.div>
            
            <motion.h1 
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tight"
            >
              {property.title}
            </motion.h1>
            
            <motion.div 
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-center gap-3 text-lg mb-8 text-white/90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.address}
            </motion.div>
            
            <motion.div 
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-4xl lg:text-6xl font-black mb-12 tracking-tight"
            >
              ${property.price.toLocaleString()}
            </motion.div>

            <motion.div 
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsContactFormOpen(true)}
                className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 min-w-48"
              >
                Schedule Tour
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsImageModalOpen(true)}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 min-w-48"
              >
                View Gallery ({property.images.length})
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Elegant Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-2 backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white/70 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Perfectly Structured Main Content */}
      <main className="relative z-10 bg-white">
        {/* Container with Perfect Grid System */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column - Main Content (8 columns) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-8"
            >
              {/* Perfectly Aligned Gallery Section */}
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-slate-900">Property Gallery</h2>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsImageModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View All {property.images.length}
                  </motion.button>
                </div>
                
                {/* Perfect 4-Column Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {property.images.slice(0, 8).map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setIsImageModalOpen(true);
                      }}
                    >
                      <Image
                        src={image.url}
                        alt={image.description}
                        fill
                        className="object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      {index === 7 && property.images.length > 8 && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-white font-bold text-xl">+{property.images.length - 8}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Structured Tab Navigation */}
              <motion.section variants={fadeInUp} className="mb-16">
                <div className="border-b border-slate-200 mb-8">
                  <nav className="flex space-x-8">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'details', label: 'Details' },
                      { id: 'location', label: 'Location' },
                      { id: 'features', label: 'Features' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative py-4 px-2 font-semibold text-sm transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'text-slate-900'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {tab.label}
                        {activeTab === tab.id && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full"
                            transition={{ type: "spring", duration: 0.5 }}
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Perfectly Aligned Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8"
                  >
                    {activeTab === 'overview' && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 mb-6">Property Overview</h3>
                          
                          {/* Perfect 4-Column Stats Grid */}
                          <div className="grid grid-cols-4 gap-6 mb-8">
                            {[
                              { label: 'Bedrooms', value: property.bedrooms, icon: '🛏️' },
                              { label: 'Bathrooms', value: property.bathrooms, icon: '🛁' },
                              { label: 'Square Feet', value: property.sqft.toLocaleString(), icon: '📐' },
                              { label: 'Property Type', value: property.type, icon: '🏠' }
                            ].map((stat, index) => (
                              <div key={index} className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-600 font-semibold">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="prose prose-slate prose-lg max-w-none">
                          <p className="text-slate-700 leading-relaxed text-lg font-medium">
                            {property.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'details' && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 mb-6">Property Specifications</h3>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Interior Features</h4>
                            <div className="space-y-4">
                              {[
                                'Premium Hardwood Floors',
                                'Granite Countertops',
                                'Stainless Steel Appliances',
                                'Walk-in Closets',
                                'Central Air & Heating',
                                'Smart Home Technology'
                              ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 py-2">
                                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                  <span className="text-slate-700 font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <h4 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">Exterior Features</h4>
                            <div className="space-y-4">
                              {[
                                'Private Landscaped Yard',
                                'Two-Car Garage',
                                'Security System',
                                'Covered Patio',
                                'Sprinkler System',
                                'Energy Efficient Windows'
                              ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 py-2">
                                  <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                                  <span className="text-slate-700 font-medium">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
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
                        
                        <div className="grid md:grid-cols-3 gap-6">
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
                          <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg">
                            Launch Virtual Tour
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.section>
            </motion.div>

            {/* Right Column - Sidebar (4 columns) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-4"
            >
              <div className="sticky top-8 space-y-8">
                
                {/* Perfect Contact Card */}
                <motion.div 
                  variants={scaleIn}
                  className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Ready to Visit?</h3>
                    <p className="text-slate-600 font-medium">Connect with our property specialist</p>
                  </div>

                  <div className="space-y-4">
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Call (555) 123-4567
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsContactFormOpen(true)}
                      className="w-full bg-slate-100 text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all duration-300"
                    >
                      Request Info
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold py-4 rounded-2xl hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                    >
                      Schedule Tour
                    </motion.button>
                  </div>
                </motion.div>

                {/* Perfect Mortgage Calculator */}
                <motion.div 
                  variants={scaleIn}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 p-8"
                >
                  <h3 className="text-xl font-black text-slate-900 mb-6">Mortgage Calculator</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Home Price</label>
                      <input 
                        type="text" 
                        value={`$${property.price.toLocaleString()}`}
                        readOnly
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-bold text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Down Payment</label>
                      <input 
                        type="number" 
                        placeholder="50,000"
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Interest Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1" 
                        placeholder="6.5"
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 font-semibold"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Calculate Payment
                    </motion.button>
                  </div>
                </motion.div>

                {/* Perfect Property Stats */}
                <motion.div 
                  variants={scaleIn}
                  className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-8"
                >
                  <h3 className="text-xl font-black text-slate-900 mb-6">Property Facts</h3>
                  <div className="space-y-1">
                    {[
                      { label: 'Property Type', value: property.type },
                      { label: 'Bedrooms', value: property.bedrooms },
                      { label: 'Bathrooms', value: property.bathrooms },
                      { label: 'Square Footage', value: `${property.sqft.toLocaleString()} sqft` },
                      { label: 'Price per sqft', value: `$${Math.round(property.price / property.sqft)}` },
                      { label: 'Year Built', value: '2020' },
                      { label: 'Lot Size', value: '0.25 acres' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0">
                        <span className="text-slate-600 font-semibold">{item.label}</span>
                        <span className="text-slate-900 font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Perfect Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-6xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={property.images[selectedImageIndex].url}
                alt={property.images[selectedImageIndex].description}
                fill
                className="object-contain rounded-3xl"
              />
              
              {/* Perfect Navigation */}
              <button
                onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm text-white rounded-2xl hover:bg-black/70 transition-all duration-300 disabled:opacity-30"
                disabled={selectedImageIndex === 0}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setSelectedImageIndex(Math.min(property.images.length - 1, selectedImageIndex + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-sm text-white rounded-2xl hover:bg-black/70 transition-all duration-300 disabled:opacity-30"
                disabled={selectedImageIndex === property.images.length - 1}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Perfect Close Button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 p-4 bg-black/50 backdrop-blur-sm text-white rounded-2xl hover:bg-black/70 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Perfect Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-bold">
                {selectedImageIndex + 1} of {property.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Perfect Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setIsContactFormOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900">Contact Us</h3>
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 font-semibold"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all duration-300 resize-none font-semibold"
                />
                
                <motion.button 
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
