import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white rounded-t-3xl overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Engage with Us in<br />
                Conversation.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
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
              <div className="rounded-3xl overflow-hidden shadow-2xl max-w-md w-full">
                <Image
                  src="/homepage-images/homepage-1.jpg"
                  alt="Modern bedroom interior"
                  width={600}
                  height={360}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Centered Social Icons */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <Instagram className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6 text-black" />
                </Link>

                <Link
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6 text-black" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-gray-100 text-black py-4 rounded-t-3xl">
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-medium">
            Copyright@2025 · Sawarn Empire
          </p>
        </div>
      </div>
    </footer>
  );
}
