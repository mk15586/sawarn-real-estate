"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

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

          // Animate description with delay
          setTimeout(() => {
            if (descriptionRef.current) {
              descriptionRef.current.style.opacity = "1";
              descriptionRef.current.style.transform = "translateY(0)";
            }
          }, 300);

          // Animate image with more delay
          setTimeout(() => {
            if (imageRef.current) {
              imageRef.current.style.opacity = "1";
              imageRef.current.style.transform = "translateY(0) scale(1)";
            }
          }, 600);

          // Animate social icons with staggered delay
          setTimeout(() => {
            if (socialIconsRef.current) {
              socialIconsRef.current.style.opacity = "1";
              const icons = socialIconsRef.current.children;
              Array.from(icons).forEach((icon, index) => {
                setTimeout(() => {
                  (icon as HTMLElement).style.opacity = "1";
                  (icon as HTMLElement).style.transform = "translateY(0) scale(1)";
                }, index * 100);
              });
            }
          }, 900);

          // Animate copyright last
          setTimeout(() => {
            if (copyrightRef.current) {
              copyrightRef.current.style.opacity = "1";
              copyrightRef.current.style.transform = "translateY(0)";
            }
          }, 1500);
        }
      });
    }, observerOptions);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="bg-black text-white rounded-t-3xl overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 
                ref={headingRef}
                className="text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-800 ease-out opacity-0 transform translate-y-8"
                style={{ transition: "opacity 800ms ease-out, transform 800ms ease-out" }}
              >
                Engage with Us in<br />
                Conversation.
              </h2>
              <p 
                ref={descriptionRef}
                className="text-gray-400 text-lg leading-relaxed max-w-2xl transition-all duration-800 ease-out opacity-0 transform translate-y-8"
                style={{ transition: "opacity 800ms ease-out, transform 800ms ease-out" }}
              >
                We are dedicated to creating exceptional living experiences 
                through carefully curated properties, personalized service, 
                and unwavering commitment to quality. With years of 
                expertise in the real estate industry, we transform dreams 
                into reality.
              </p>
            </div>
          </div>

          {/* Right Content - Interior Image + social icons under image */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex flex-col items-center">
              <div 
                ref={imageRef}
                className="rounded-3xl overflow-hidden shadow-2xl max-w-md w-full transition-all duration-800 ease-out opacity-0 transform translate-y-8 scale-95"
                style={{ transition: "opacity 800ms ease-out, transform 800ms ease-out, scale 800ms ease-out" }}
              >
                <Image
                  src="/homepage-images/homepage-1.jpg"
                  alt="Modern bedroom interior"
                  width={600}
                  height={360}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Centered Social Icons */}
              <div 
                ref={socialIconsRef}
                className="mt-6 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-500 ease-out"
                style={{ transition: "opacity 500ms ease-out" }}
              >
                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 opacity-0 transform translate-y-4 scale-90 hover:scale-110"
                  style={{ transition: "opacity 400ms ease-out, transform 400ms ease-out, background-color 300ms ease-out" }}
                >
                  <Facebook className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 opacity-0 transform translate-y-4 scale-90 hover:scale-110"
                  style={{ transition: "opacity 400ms ease-out, transform 400ms ease-out, background-color 300ms ease-out" }}
                >
                  <Instagram className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 opacity-0 transform translate-y-4 scale-90 hover:scale-110"
                  style={{ transition: "opacity 400ms ease-out, transform 400ms ease-out, background-color 300ms ease-out" }}
                >
                  <Linkedin className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 opacity-0 transform translate-y-4 scale-90 hover:scale-110"
                  style={{ transition: "opacity 400ms ease-out, transform 400ms ease-out, background-color 300ms ease-out" }}
                >
                  <Twitter className="w-6 h-6 text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div 
        ref={copyrightRef}
        className="bg-gray-100 text-black py-4 rounded-t-3xl transition-all duration-700 ease-out opacity-0 transform translate-y-4"
        style={{ transition: "opacity 700ms ease-out, transform 700ms ease-out" }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-medium">
            Copyright@2025 · Sawarn Empire
          </p>
        </div>
      </div>
    </footer>
  );
}