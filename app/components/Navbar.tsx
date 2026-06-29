"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NavLink {
  label: string;
  id: string;
}

interface NavbarProps {
  onOpenEnquiry: (projectName?: string) => void;
  customLinks?: NavLink[];
}

export default function Navbar({ onOpenEnquiry, customLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const scrollSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleHomeClick = () => {
    setIsOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleScrollOrCreateLink = (sectionId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      scrollSection(sectionId);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleCustomLinkClick = (id: string) => {
    setIsOpen(false);
    scrollSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#111e2f]/90 md:bg-black/35 backdrop-blur-md border-b border-white/10 px-6 md:px-12 py-3.5 flex items-center justify-between">
      {/* Left: Brand Logo / Back Button */}
      {customLinks ? (
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:text-accent-gold transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-accent-gold group-hover:translate-x-[-2px] transition-transform" />
          <span className="text-xs font-extrabold tracking-wider font-serif uppercase">Back to Home</span>
        </Link>
      ) : (
        <div className="flex items-center space-x-3 text-white cursor-pointer" onClick={handleHomeClick}>
          <div className="bg-white/95 p-1.5 rounded flex items-center justify-center shadow-sm">
            <img
              src="/godrej_logo_final.jpeg"
              alt="Godrej Properties Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

        </div>
      )}

      {/* Center: Desktop Navigation links */}
      <div className="hidden md:flex items-center space-x-8">
        {customLinks ? (
          <>
            {customLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleCustomLinkClick(link.id)}
                className="text-xs font-bold uppercase tracking-wider text-white/90 hover:text-accent-gold transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={handleHomeClick}
              className="text-xs font-bold uppercase tracking-wider text-white/95 hover:text-accent-gold transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollOrCreateLink("projects-section")}
              className="text-xs font-bold uppercase tracking-wider text-white/95 hover:text-accent-gold transition-colors cursor-pointer"
            >
              Our Projects
            </button>
            <button
              onClick={() => handleScrollOrCreateLink("about-section")}
              className="text-xs font-bold uppercase tracking-wider text-white/95 hover:text-accent-gold transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </>
        )}
      </div>

      {/* Right: Phone & Action Button */}
      <div className="hidden lg:flex items-center space-x-6">
        <a
          href="tel:+919665205957"
          className="flex items-center space-x-2 text-white hover:text-accent-gold transition-colors cursor-pointer group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-extrabold tracking-wider font-sans group-hover:text-accent-gold">+91 96652 05957</span>
        </a>
        <button
          onClick={() => onOpenEnquiry("Brochure Request")}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
        >
          Download Brochure
        </button>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center space-x-3">
        <a
          href="tel:+919665205957"
          className="flex items-center justify-center bg-white/10 rounded-full w-8.5 h-8.5 text-white transition-all"
          aria-label="Call channel partner"
        >
          <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full text-white/90 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#111e2f] border-b border-white/10 p-6 shadow-xl flex flex-col space-y-4 md:hidden animate-fade-in">
          {customLinks ? (
            <>
              {customLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleCustomLinkClick(link.id)}
                  className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white/80 hover:text-accent-gold border-b border-white/5 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={handleHomeClick}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white/80 hover:text-accent-gold border-b border-white/5 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollOrCreateLink("projects-section")}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white/80 hover:text-accent-gold border-b border-white/5 cursor-pointer"
              >
                Our Projects
              </button>
              <button
                onClick={() => handleScrollOrCreateLink("about-section")}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-white/80 hover:text-accent-gold border-b border-white/5 cursor-pointer"
              >
                Contact Us
              </button>
            </>
          )}
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="tel:+919665205957"
              className="flex items-center space-x-2 text-white font-bold text-xs uppercase tracking-wider"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>+91 96652 05957</span>
            </a>
            <button
              onClick={() => { setIsOpen(false); onOpenEnquiry("Brochure Request"); }}
              className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md cursor-pointer"
            >
              Download Brochure
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
