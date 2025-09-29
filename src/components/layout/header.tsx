"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-6', className)}>
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'relative text-sm font-medium transition-colors duration-300 group',
            pathname === href 
              ? 'text-primary after:scale-x-100' 
              : 'text-muted-foreground hover:text-foreground',
            // Modern sliding underline effect
            'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-150",
        // Added curved bottom corners
        "rounded-b-3xl",
        isScrolled
          ? "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
          : "bg-white"
      )}
      style={{
        // Custom curved corners for more dramatic effect
        borderBottomLeftRadius: '2rem',
        borderBottomRightRadius: '2rem',
      }}
    >
      <div className="container flex h-20 items-center">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 flex-1 md:flex-none">
          <Image
            src="/Sawarn-Empire-logo.png"
            alt="Sawarn Empire"
            width={180}
            height={48}
            className="object-contain"
          />
        </Link>

        {/* Nav + actions grouped to the right on desktop */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-4">
          <nav className="flex items-center gap-10">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'relative text-base font-semibold transition-all duration-300 ease-out group px-1 py-2',
                  pathname === href 
                    ? 'text-primary after:scale-x-100' 
                    : 'text-muted-foreground hover:text-foreground hover:-translate-y-0.5',
                  // Enhanced sliding underline with gradient
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-primary after:to-primary/70 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100',
                  // Subtle glow effect on hover
                  'hover:drop-shadow-sm'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/contact">
            <Button
              className={cn(
                "relative rounded-full border-2 border-black text-black bg-transparent font-semibold px-6 py-2 overflow-hidden group",
                "transition-all duration-300 ease-out",
                // Multi-layered hover effects
                "hover:scale-105 hover:shadow-lg hover:-translate-y-0.5",
                // Background slide effect
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-gray-800 before:transition-transform before:duration-300 before:ease-out before:scale-x-0 before:origin-left hover:before:scale-x-100",
                // Text color change
                "hover:text-white hover:border-black",
                // Shine effect
                "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] after:transition-transform after:duration-700 hover:after:translate-x-[100%]"
              )}
              variant="outline"
            >
              <span className="relative z-10">Enquire Now</span>
            </Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right"
              className="rounded-bl-3xl"
              style={{
                borderBottomLeftRadius: '2rem',
              }}
            >
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="mb-2 flex items-center">
                  <Image
                    src="/Sawarn-Empire-logo.png"
                    alt="Sawarn Empire"
                    width={160}
                    height={40}
                    className="object-contain"
                  />
                </Link>
                
                {/* Mobile Navigation Links with Enhanced Hover */}
                <nav className="flex flex-col items-start space-y-4">
                  {navItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'relative text-lg font-medium transition-all duration-300 group px-2 py-1 w-full',
                        pathname === href 
                          ? 'text-primary after:scale-x-100' 
                          : 'text-muted-foreground hover:text-foreground hover:translate-x-2',
                        // Mobile sliding underline
                        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100'
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
                
                <div className="mt-2">
                  <Link href="/contact">
                    <Button 
                      className={cn(
                        "w-full relative overflow-hidden group border-2 border-black",
                        "transition-all duration-300 ease-out",
                        "hover:scale-105 hover:shadow-lg",
                        "before:absolute before:inset-0 before:bg-black before:transition-transform before:duration-300 before:ease-out before:scale-x-0 before:origin-left hover:before:scale-x-100",
                        "hover:text-white"
                      )} 
                      variant="outline"
                    >
                      <span className="relative z-10">Enquire Now</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
