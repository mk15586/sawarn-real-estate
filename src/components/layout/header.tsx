"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Home, Building2, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/properties', label: 'Properties', icon: Building2 },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 20);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = 'site-header-portal';
    let el = document.getElementById(id) as HTMLElement | null;
    let created = false;
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      (document.documentElement || document.body).appendChild(el);
      el.style.position = 'fixed';
      el.style.top = '0';
      el.style.left = '0';
      el.style.right = '0';
      el.style.width = '100vw';
      el.style.boxSizing = 'border-box';
      el.style.paddingTop = 'env(safe-area-inset-top)';
      el.style.zIndex = '9999';
      created = true;
    }
    setPortalEl(el);
    setMounted(true);
    return () => {
      if (created && el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  const headerContent = (
    <>
      {/* Top Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm"
            : "bg-white"
        )}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 md:h-20">
          {/* Logo - Left Side (Absolutely positioned for both mobile and desktop) */}
          <Link 
            href="/" 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex items-center"
          >
            <Image
              src="/Sawarn-Empire-logo.png"
              alt="Sawarn Empire"
              width={720}
              height={200}
              className={cn(
                "object-contain w-auto",
                // Mobile: larger logo
                "h-auto max-h-28",
                // Desktop: even larger
                "md:max-h-36"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
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
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:scale-x-0 after:bg-gradient-to-r after:from-primary after:to-primary/70 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100',
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
                  "hover:scale-105 hover:shadow-lg hover:-translate-y-0.5",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-gray-800 before:transition-transform before:duration-300 before:ease-out before:scale-x-0 before:origin-left hover:before:scale-x-100",
                  "hover:text-white hover:border-black",
                  "after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:translate-x-[-100%] after:transition-transform after:duration-700 hover:after:translate-x-[100%]"
                )}
                variant="outline"
              >
                <span className="relative z-10">Enquire Now</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Enquire Button - Top Right */}
          <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-50">
            <Link href="/contact">
              <Button
                size="sm"
                className={cn(
                  "relative rounded-full bg-black text-white font-semibold px-4 py-2 text-xs overflow-hidden",
                  "transition-all duration-200 ease-out",
                  "hover:bg-gray-800 active:scale-95",
                  "shadow-md"
                )}
              >
                Enquire
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav 
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50",
          "bg-white border-t border-gray-200",
          "shadow-[0_-2px_10px_rgba(0,0,0,0.08)]",
          "backdrop-blur-lg bg-white/95 supports-[backdrop-filter]:bg-white/90"
        )}
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom), 12px)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div className="flex items-center justify-around px-2 pt-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl min-w-[72px]",
                  "transition-all duration-300 ease-out",
                  "active:scale-95",
                  isActive 
                    ? "text-black" 
                    : "text-gray-500 hover:text-gray-700"
                )}
                style={{
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                {/* Icon Container with Animated Background */}
                <div className="relative flex items-center justify-center w-full">
                  {/* Animated pill background for active state */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-300 ease-out",
                      isActive 
                        ? "bg-gray-100 scale-100 opacity-100" 
                        : "bg-gray-50 scale-75 opacity-0"
                    )}
                  />
                  
                  {/* Icon with smooth transition */}
                  <div className={cn(
                    "relative z-10 p-2 transition-all duration-300",
                    isActive && "scale-110"
                  )}>
                    <Icon 
                      className={cn(
                        "w-6 h-6 transition-all duration-300",
                        isActive 
                          ? "stroke-[2.5]" 
                          : "stroke-[2]"
                      )}
                      fill={isActive ? "currentColor" : "none"}
                    />
                  </div>
                </div>

                {/* Label with smooth fade and slide */}
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isActive 
                      ? "font-semibold translate-y-0 opacity-100" 
                      : "translate-y-0.5 opacity-70"
                  )}
                >
                  {label}
                </span>

                {/* Active indicator dot */}
                <div
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black transition-all duration-300",
                    isActive 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-0"
                  )}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation Spacer - Prevents content from being hidden behind navbar */}
      <div 
        className="md:hidden h-20" 
        style={{
          height: 'calc(64px + env(safe-area-inset-bottom))'
        }}
      />
    </>
  );

  if (!mounted || !portalEl) return null;
  return createPortal(headerContent, portalEl);
}
