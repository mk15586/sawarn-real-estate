import Link from 'next/link';
import { Building } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center justify-center md:mb-0 md:justify-start">
            <Building className="mr-2 h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">Sawarn Empire</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Sawarn Empire. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 md:mt-0">
            <Link href="/properties" className="text-sm text-muted-foreground hover:text-primary">
              Properties
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
