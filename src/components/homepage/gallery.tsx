"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HomepageGallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Atlantis Residence",
      description: "Luxury waterfront living",
      image: "/homepage-images/homepage-2.jpg",
      category: "Bedroom",
      size: "wide"
    },
    {
      id: 2,
      title: "Ocean View Suite",
      description: "Panoramic sea views",
      image: "/homepage-images/homepage-3.jpg",
      category: "Living Room",
      size: "tall"
    },
    {
      id: 3,
      title: "Executive Penthouse",
      description: "Premium city living",
      image: "/homepage-images/homepage-1.jpg",
      category: "Master Suite",
      size: "large"
    },
    {
      id: 4,
      title: "Skyline Apartments",
      description: "Modern urban design",
      image: "/homepage-images/homepage-2.jpg",
      category: "Dining Area",
      size: "standard"
    },
    {
      id: 5,
      title: "Garden Villas",
      description: "Tranquil green spaces",
      image: "/homepage-images/homepage-3.jpg",
      category: "Outdoor",
      size: "standard"
    },
    {
      id: 6,
      title: "Heritage Collection",
      description: "Timeless architecture",
      image: "/homepage-images/homepage-1.jpg",
      category: "Library",
      size: "wide"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate header elements
          if (headerRef.current) {
            headerRef.current.style.opacity = "1";
            headerRef.current.style.transform = "translateY(0)";
          }

          // Animate title with delay
          setTimeout(() => {
            if (titleRef.current) {
              titleRef.current.style.opacity = "1";
              titleRef.current.style.transform = "translateY(0)";
            }
          }, 300);

          // Animate description with more delay
          setTimeout(() => {
            if (descriptionRef.current) {
              descriptionRef.current.style.opacity = "1";
              descriptionRef.current.style.transform = "translateY(0)";
            }
          }, 500);

          // Animate button with even more delay
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.style.opacity = "1";
              buttonRef.current.style.transform = "translateY(0)";
            }
          }, 700);

          // Animate gallery cards with staggered delay
          cardRefs.current.forEach((card, index) => {
            if (card) {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
              }, 900 + (index * 150));
            }
          });

          // Animate CTA section last
          setTimeout(() => {
            if (ctaRef.current) {
              ctaRef.current.style.opacity = "1";
              ctaRef.current.style.transform = "translateY(0)";
            }
          }, 1800);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const addToCardRefs = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-28 bg-white"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enhanced Header Section */}
        <div 
          ref={headerRef}
          className="flex flex-col lg:flex-row items-start justify-between mb-16 lg:mb-20 transition-all duration-700 ease-out opacity-0 transform translate-y-8"
          style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
        >
          <div className="max-w-2xl mb-8 lg:mb-0">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 block">
              Premium Collection
            </span>
            <h2 
              ref={titleRef}
              className="text-5xl md:text-6xl font-bold leading-tight text-black mb-6 transition-all duration-700 ease-out opacity-0 transform translate-y-8"
              style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
            >
              Discover Our <span className="text-gray-400">Signature</span> Properties
            </h2>
            <p 
              ref={descriptionRef}
              className="text-lg text-gray-600 leading-relaxed transition-all duration-700 ease-out opacity-0 transform translate-y-8"
              style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
            >
              Curated selection of exceptional properties where luxury meets functionality. 
              Each space tells a unique story of craftsmanship and design excellence.
            </p>
          </div>
          
          <div 
            ref={buttonRef}
            className="text-right flex flex-col items-end transition-all duration-700 ease-out opacity-0 transform translate-y-8"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
          >
            <button className="bg-black hover:bg-gray-800 border-2 border-black rounded-full px-10 py-4 font-medium transition-all duration-300 group mb-4 shadow-lg hover:shadow-xl">
              <Link href="/properties" className="flex items-center gap-3 text-white group-hover:text-white">
                Explore Collection
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:scale-110" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </Link>
            </button>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Handpicked properties showcasing architectural brilliance and sophisticated living spaces
            </p>
          </div>
        </div>

        {/* Enhanced Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          {/* Feature Card - Large */}
          <div 
            ref={addToCardRefs}
            className="md:col-span-8 relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 opacity-0 transform translate-y-12 scale-95"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out, scale 700ms ease-out" }}
          >
            <Image 
              src="/homepage-images/homepage-1.jpg" 
              alt="Atlantis Residence" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2 block">
                Featured Property
              </span>
              <h3 className="text-3xl font-bold text-white mb-2">Atlantis Residence</h3>
              <p className="text-white/90 text-lg mb-4">Ultimate waterfront luxury experience</p>
              <div className="flex items-center gap-4">
                <button className="bg-white text-black rounded-full px-6 py-2 font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2">
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="text-white/70 text-sm">5,200 sq.ft.</span>
              </div>
            </div>
          </div>

          {/* Secondary Feature Card */}
          <div 
            ref={addToCardRefs}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 opacity-0 transform translate-y-12 scale-95"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out, scale 700ms ease-out" }}
          >
            <Image 
              src="/homepage-images/homepage-2.jpg" 
              alt="Ocean View Suite" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/30 opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                Ocean Front
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ocean View</h3>
              <p className="text-white/80 text-sm mb-3">Panoramic sea views</p>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all duration-300 group/btn">
                <svg className="w-5 h-5 text-white group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Third Card */}
          <div 
            ref={addToCardRefs}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 opacity-0 transform translate-y-12 scale-95"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out, scale 700ms ease-out" }}
          >
            <Image 
              src="/homepage-images/homepage-3.jpg" 
              alt="Executive Penthouse" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-bold text-white mb-1">Executive</h3>
              <p className="text-white/80 text-sm mb-3">Premium city living</p>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-xs">Downtown</span>
                <button className="bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Fourth Card */}
          <div 
            ref={addToCardRefs}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 opacity-0 transform translate-y-12 scale-95"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out, scale 700ms ease-out" }}
          >
            <Image 
              src="/homepage-images/homepage-1.jpg" 
              alt="Garden Villas" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-emerald-900/30 opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute top-6 left-6">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                Garden
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <h3 className="text-xl font-bold text-white mb-1">Garden Villas</h3>
              <p className="text-white/80 text-sm">Tranquil green spaces</p>
            </div>
          </div>

          {/* Fifth Card */}
          <div 
            ref={addToCardRefs}
            className="md:col-span-4 relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 opacity-0 transform translate-y-12 scale-95"
            style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out, scale 700ms ease-out" }}
          >
            <Image 
              src="/homepage-images/homepage-2.jpg" 
              alt="Heritage Collection" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-amber-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-bold text-white mb-1">Heritage</h3>
              <p className="text-white/80 text-sm mb-3">Timeless architecture</p>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-xs">Est. 1998</span>
                <button className="bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          ref={ctaRef}
          className="text-center mt-16 transition-all duration-700 ease-out opacity-0 transform translate-y-8"
          style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
        >
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
            <div className="w-20 h-px bg-gray-300"></div>
            Explore More Properties
            <div className="w-20 h-px bg-gray-300"></div>
          </div>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our complete portfolio of luxury properties, each designed with exceptional 
            attention to detail and uncompromising quality standards.
          </p>
        </div>
      </div>
    </section>
  );
}