import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HomepageProperties() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container">
        {/* Images Grid with Text Overlay */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Large Image */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
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
            <div className="bg-[#d1c4b6] rounded-3xl p-8 h-[240px] md:h-[240px] flex flex-col justify-center shadow-sm overflow-hidden">
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
            <div className="relative h-[156px] md:h-[252px] rounded-3xl overflow-hidden bg-gray-200">
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
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div className="text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div className="text-muted-foreground">Projects</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div className="text-muted-foreground">Projects</div>
          </div>
        </div>
      </div>
    </section>
  );
}
