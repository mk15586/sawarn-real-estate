"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

export default function HomepageProperties() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [projectCount, setProjectCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate main image
          if (mainImageRef.current) {
            mainImageRef.current.style.opacity = "1";
            mainImageRef.current.style.transform = "translateY(0) scale(1)";
          }

          // Animate text box with delay
          setTimeout(() => {
            if (textBoxRef.current) {
              textBoxRef.current.style.opacity = "1";
              textBoxRef.current.style.transform = "translateY(0)";
            }
          }, 300);

          // Animate bottom image with more delay
          setTimeout(() => {
            if (bottomImageRef.current) {
              bottomImageRef.current.style.opacity = "1";
              bottomImageRef.current.style.transform = "translateY(0)";
            }
          }, 600);

          // Start counting animations for statistics
          startCountingAnimations();

          // Animate statistics containers with staggered delay
          statsRefs.current.forEach((stat, index) => {
            if (stat) {
              setTimeout(() => {
                stat.style.opacity = "1";
                stat.style.transform = "translateY(0)";
              }, 800 + (index * 200));
            }
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startCountingAnimations = () => {
    // Project count animation (50+)
    animateCount(0, 50, 1800, setProjectCount, 0);
    
    // Client count animation (50+) with slight delay
    setTimeout(() => {
      animateCount(0, 50, 1800, setClientCount, 100);
    }, 150);
    
    // Experience count animation (50+) with more delay
    setTimeout(() => {
      animateCount(0, 50, 1800, setExperienceCount, 200);
    }, 300);
  };

  const animateCount = (start: number, end: number, duration: number, setCount: (value: number) => void, delay: number = 0) => {
    setTimeout(() => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function for smoother animation
        const easeOutBack = (x: number): number => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        };
        
        const easeOutElastic = (x: number): number => {
          const c4 = (2 * Math.PI) / 3;
          return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        };

        // Use elastic easing for the first 80%, then smooth out
        let easedProgress;
        if (progress < 0.8) {
          easedProgress = easeOutElastic(progress * 1.25); // Scale to get full elastic effect in 80% of time
        } else {
          // Smooth transition for the last 20%
          const remainingProgress = (progress - 0.8) / 0.2;
          easedProgress = 0.95 + (remainingProgress * 0.05); // Start from 95% and smoothly go to 100%
        }

        const currentValue = Math.floor(start + easedProgress * (end - start));
        
        // Ensure we reach the final value exactly
        const finalValue = progress === 1 ? end : currentValue;
        
        setCount(finalValue);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Final check to ensure we display the exact end value
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }, delay);
  };

  const addToStatsRefs = (el: HTMLDivElement | null) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-background py-12 md:py-16"
    >
      <div className="container">
        {/* Images Grid with Text Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Large Image */}
          <div className="lg:col-span-2 relative">
            <div 
              ref={mainImageRef}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden transition-all duration-700 ease-out opacity-0 transform translate-y-8 scale-105"
              style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            >
              <Image
                src="/homepage-images/homepage-2.jpg"
                alt="Luxury bedroom with modern design"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column with Text Box and Image */}
          <div className="flex flex-col gap-4">
            {/* Text Content Box */}
            <div 
              ref={textBoxRef}
              className="bg-[#d1c4b6] rounded-3xl p-8 h-[240px] md:h-[240px] flex flex-col justify-center shadow-sm overflow-hidden transition-all duration-700 ease-out opacity-0 transform translate-y-8"
              style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            >
              <div className="inline-block rounded-full bg-transparent px-4 py-2 text-sm text-black mb-4 w-fit border-2 border-black">
                Aesthetic
              </div>
              <p className="text-black/80 mb-3 text-sm">
                Your journey to exceptional living starts here.
              </p>
              <h2 className="font-bold text-3xl md:text-4xl leading-tight text-black">
                Into a gallery<br />
                of elegance
              </h2>
            </div>

            {/* Bottom Image with Arrow */}
            <div 
              ref={bottomImageRef}
              className="relative h-[156px] md:h-[252px] rounded-3xl overflow-hidden bg-gray-200 transition-all duration-700 ease-out opacity-0 transform translate-y-8"
              style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
            >
              <Image
                src="/homepage-images/homepage-3.jpg"
                alt="Modern living room"
                fill
                className="object-cover"
              />
              {/* Arrow Button Overlay */}
              <div className="absolute bottom-4 right-4">
                <button className="bg-black hover:bg-gray-900 rounded-full p-4 transition-all duration-300 shadow-lg group overflow-hidden relative">
                  <svg
                    className="w-7 h-7 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out m-auto block origin-center"
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 md:mt-20">
          <div 
            ref={addToStatsRefs}
            className="transition-all duration-700 ease-out opacity-0 transform translate-y-8"
            style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300">
              <span className="inline-block transform transition-transform duration-200 hover:scale-110">
                {projectCount}
              </span>+
            </div>
            <div className="text-muted-foreground">Projects</div>
          </div>
          <div 
            ref={addToStatsRefs}
            className="transition-all duration-700 ease-out opacity-0 transform translate-y-8"
            style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300">
              <span className="inline-block transform transition-transform duration-200 hover:scale-110">
                {clientCount}
              </span>+
            </div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div 
            ref={addToStatsRefs}
            className="transition-all duration-700 ease-out opacity-0 transform translate-y-8"
            style={{ transition: "opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          >
            <div className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300">
              <span className="inline-block transform transition-transform duration-200 hover:scale-110">
                {experienceCount}
              </span>+
            </div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}