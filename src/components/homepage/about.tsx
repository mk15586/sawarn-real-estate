import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HomepageAbout() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Section - Takes more space */}
          <div className="lg:col-span-3">
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
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
              <p className="text-sm font-medium text-gray-600 tracking-wider">
                Elegance · Timeless
              </p>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-black">
                Modern Style<br />
                Timeless Charm
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Discover premium properties with world-class amenities in prime locations. Your journey to exceptional living starts here.
              </p>
              
              <div className="pt-4">
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="rounded-full border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 font-medium transition-all duration-300"
                >
                  <Link href="/about" className="flex items-center gap-2">
                    About Us
                    <svg 
                      className="w-4 h-4 transition-transform group-hover:translate-x-1" 
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
