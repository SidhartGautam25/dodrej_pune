"use client";

import React, { useState } from "react";

interface NavbarProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollSection = (id: string) => {
    setIsOpen(false);
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

  return (
    <nav className="fixed top-4 left-0 w-full z-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-primary/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-lg">
        
        {/* Left: Brand Logo */}
        <div className="flex flex-col text-white cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="flex items-center space-x-1">
            <span className="text-base font-extrabold tracking-wider font-serif">GODREJ</span>
            <span className="text-xs font-light tracking-widest text-accent-gold-light uppercase">PROPERTIES</span>
          </div>
          <span className="text-[8px] text-white/50 tracking-widest uppercase -mt-1">Authorized Channel Partner</span>
        </div>

        {/* Center: Desktop Navigation capsule */}
        <div className="hidden md:flex items-center space-x-1 bg-black/30 border border-white/5 rounded-full p-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-1.5 text-xs font-medium rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollSection("projects-section")}
            className="px-4 py-1.5 text-xs font-medium rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Our Projects
          </button>
          <button
            onClick={() => scrollSection("about-section")}
            className="px-4 py-1.5 text-xs font-medium rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            Contact Us
          </button>
          <button
            onClick={() => onOpenEnquiry("Brochure Request")}
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-accent-gold text-primary hover:bg-accent-gold-dark hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            Download Brochure
          </button>
        </div>

        {/* Right: Phone CTA pill */}
        <div className="hidden lg:flex items-center">
          <a
            href="tel:+919225532615"
            className="flex items-center space-x-2 bg-black/40 border border-accent-gold/20 hover:border-accent-gold rounded-full px-4 py-1.5 text-xs font-medium text-white transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <svg className="w-3.5 h-3.5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-semibold tracking-wider">+91-9225532615</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <a
            href="tel:+919225532615"
            className="flex items-center justify-center bg-black/40 border border-accent-gold/20 rounded-full w-9 h-9 text-white transition-all"
            aria-label="Call channel partner"
          >
            <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-primary border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col space-y-4 md:hidden animate-fade-in">
          <button
            onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="w-full py-2.5 text-left text-sm font-medium text-white/80 hover:text-accent-gold border-b border-white/5"
          >
            Home
          </button>
          <button
            onClick={() => scrollSection("projects-section")}
            className="w-full py-2.5 text-left text-sm font-medium text-white/80 hover:text-accent-gold border-b border-white/5"
          >
            Our Projects
          </button>
          <button
            onClick={() => scrollSection("about-section")}
            className="w-full py-2.5 text-left text-sm font-medium text-white/80 hover:text-accent-gold border-b border-white/5"
          >
            Contact Us
          </button>
          <button
            onClick={() => { setIsOpen(false); onOpenEnquiry("Brochure Request"); }}
            className="w-full py-3 text-center text-sm font-semibold rounded-lg bg-accent-gold text-primary hover:bg-accent-gold-dark transition-all shadow-md"
          >
            Download Brochure
          </button>
        </div>
      )}
    </nav>
  );
}
