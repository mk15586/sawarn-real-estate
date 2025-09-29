"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HomepageAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate image first
          if (imageRef.current) {
            imageRef.current.style.opacity = "1";
            imageRef.current.style.transform = "translateX(0)";
          }

          // Animate subtitle with delay
          setTimeout(() => {
            if (subtitleRef.current) {
              subtitleRef.current.style.opacity = "1";
              subtitleRef.current.style.transform = "translateY(0)";
            }
          }, 300);

          // Animate title with more delay
          setTimeout(() => {
            if (titleRef.current) {
              titleRef.current.style.opacity = "1";
              titleRef.current.style.transform = "translateY(0)";
            }
          }, 500);

          // Animate description with even more delay
          setTimeout(() => {
            if (descriptionRef.current) {
              descriptionRef.current.style.opacity = "1";
              descriptionRef.current.style.transform = "translateY(0)";
            }
          }, 700);

          // Animate button last
          setTimeout(() => {
            if (buttonRef.current) {
              buttonRef.current.style.opacity = "1";
              buttonRef.current.style.transform = "translateY(0)";
            }
          }, 900);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-20 bg-gray-50"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Section - Takes more space */}
          <div className="lg:col-span-3">
            <div 
              ref={imageRef}
              className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden transition-all duration-800 ease-out opacity-0 transform -translate-x-8"
              style={{ transition: "opacity 800ms ease-out, transform 800ms ease-out" }}
            >
              <Image 
                src="/homepage-images/homepage-3.jpg" 
                alt="Modern living room with elegant furniture" 
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 lg:pl-8">
            <div className="space-y-6">
              <p 
                ref={subtitleRef}
                className="text-sm font-medium text-gray-600 tracking-wider transition-all duration-700 ease-out opacity-0 transform translate-y-4"
                style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
              >
                Elegance · Timeless
              </p>
              
              <h2 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold leading-tight text-black transition-all duration-700 ease-out opacity-0 transform translate-y-4"
                style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
              >
                Modern Style<br />
                Timeless Charm
              </h2>
              
              <p 
                ref={descriptionRef}
                className="text-gray-600 text-lg leading-relaxed max-w-md transition-all duration-700 ease-out opacity-0 transform translate-y-4"
                style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
              >
                Discover premium properties with world-class amenities in prime locations. Your journey to exceptional living starts here.
              </p>
              
              <div 
                ref={buttonRef}
                className="pt-4 transition-all duration-700 ease-out opacity-0 transform translate-y-4"
                style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
              >
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="rounded-full border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 font-medium transition-all duration-300 group"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    About Us
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M7 17l9.2-9.2M17 17V7H7" 
                      />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}