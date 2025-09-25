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
  { href: '/projects', label: 'Projects' },
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
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-muted-foreground'
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
        isScrolled
          ? "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
          : "bg-white"
      )}
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
                  'text-base font-semibold transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/contact">
            <Button
              className="rounded-full border-black text-black bg-transparent hover:bg-muted/5"
              variant="outline"
            >
              Enquire Now
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
            <SheetContent side="right">
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
                <NavLinks className="flex-col items-start space-y-4 text-lg" />
                <div className="mt-2">
                  <Link href="/contact">
                    <Button className="w-full" variant="outline">
                      Enquire Now
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