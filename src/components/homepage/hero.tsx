"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HomepageHero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate heading
          if (headingRef.current) {
            headingRef.current.style.opacity = "1";
            headingRef.current.style.transform = "translateY(0)";
          }
          
          // Animate left card with slight delay
          setTimeout(() => {
            if (leftCardRef.current) {
              leftCardRef.current.style.opacity = "1";
              leftCardRef.current.style.transform = "translateY(0)";
            }
          }, 300);
          
          // Animate right card with more delay
          setTimeout(() => {
            if (rightCardRef.current) {
              rightCardRef.current.style.opacity = "1";
              rightCardRef.current.style.transform = "translateY(0)";
            }
          }, 600);

          // Animate inner image with even more delay
          setTimeout(() => {
            if (imageRef.current) {
              imageRef.current.style.opacity = "1";
              imageRef.current.style.transform = "scale(1)";
            }
          }, 900);
        }
      });
    }, observerOptions);

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden mt-4 sm:mt-6 px-4 sm:px-6"
    >
      <div className="w-full h-full">
  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl max-w-full sm:max-w-[calc(100%-96px)] mx-auto">
          {/* Background Image */}
          <Image
            src="/homepage-images/homepage-1.jpg"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />

          {/* Dark Gloomy Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Top "Contemporary" Heading */}
          <div className="absolute top-24 md:top-32 lg:top-40 xl:top-48 left-0 right-0 flex items-start justify-center z-20">
            <h1 
              ref={headingRef}
              className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-2xl text-center transition-all duration-700 ease-out opacity-0 transform translate-y-8"
              style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
            >
              Contemporary
            </h1>
          </div>

          {/* Bottom Content Container - Side by Side Layout */}
          <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-4 md:left-8 right-4 md:right-12 flex flex-col md:flex-row gap-4 md:gap-8 z-10">
            {/* Left Content Card */}
            <div 
              ref={leftCardRef}
              className="flex-1 w-full max-w-md sm:max-w-md bg-white/15 backdrop-blur-md px-4 md:px-8 py-5 md:py-8 rounded-2xl border border-white/25 shadow-2xl transition-all duration-700 ease-out opacity-0 transform translate-y-10"
              style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
            >
              <p className="text-sm md:text-base text-white/95 leading-relaxed mb-4 md:mb-6">
                Discover premium properties with world-class amenities in prime
                locations. Your journey to exceptional living starts here.Your
                journey to exceptional living starts here.
              </p>
              <Button
                asChild
                className="w-full sm:w-auto bg-black hover:bg-black/90 text-white border-none px-5 md:px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base justify-center"
              >
                <Link href="/properties">
                  View More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right Thumbnail Card - Transparent Container */}
            <div 
              ref={rightCardRef}
              className="w-full md:w-80 lg:w-96 h-44 md:h-52 lg:h-56 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-3 md:p-6 transition-all duration-700 ease-out opacity-0 transform translate-y-10"
              style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
            >
              {/* center a smaller thumbnail inside the transparent card */}
              <div className="w-full h-full flex items-center justify-center">
                <div 
                  ref={imageRef}
                  className="relative w-48 md:w-64 lg:w-80 h-32 md:h-44 lg:h-52 bg-white/5 rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-out opacity-0 transform scale-95"
                  style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
                >
                  <Image
                    src="/homepage-images/homepage-2.jpg"
                    alt="Contemporary bedroom interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}