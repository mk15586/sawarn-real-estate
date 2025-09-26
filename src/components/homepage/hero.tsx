import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomepageHero() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden mt-6 px-6">
      <div className="w-full h-full">
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl max-w-[calc(100%-96px)] mx-auto">
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

          {/* Top "Contemporary" Heading (moved from center to top to avoid overlapping bottom cards) */}
          <div className="absolute top-24 md:top-32 lg:top-40 xl:top-48 left-0 right-0 flex items-start justify-center z-20">
            <h1 className="font-headline text-5xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-2xl text-center">
              Contemporary
            </h1>
          </div>

          {/* Bottom Content Container - Side by Side Layout */}
          <div className="absolute bottom-6 md:bottom-8 lg:bottom-12 left-6 md:left-8 lg:left-12 right-6 md:right-8 lg:right-12 flex flex-col md:flex-row gap-6 md:gap-8 z-10">
            {/* Left Content Card */}
            <div className="flex-1 max-w-md bg-white/15 backdrop-blur-md px-6 md:px-8 py-6 md:py-8 rounded-2xl border border-white/25 shadow-2xl">
              <p className="text-sm md:text-base text-white/95 leading-relaxed mb-4 md:mb-6">
                Discover premium properties with world-class amenities in prime
                locations. Your journey to exceptional living starts here.Your
                journey to exceptional living starts here.
              </p>
              <Button
                asChild
                className="bg-black hover:bg-black/90 text-white border-none px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm md:text-base"
              >
                <Link href="/properties">
                  View More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right Thumbnail Card - Transparent Container */}
            <div className="w-full md:w-80 lg:w-96 h-48 md:h-52 lg:h-56 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-4 md:p-6">
              {/* center a smaller thumbnail inside the transparent card */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-64 md:w-80 lg:w-88 h-36 md:h-44 lg:h-52 bg-white/5 rounded-xl overflow-hidden shadow-lg">
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
