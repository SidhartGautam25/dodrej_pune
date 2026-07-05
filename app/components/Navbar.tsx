"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 md:bg-white/40 backdrop-blur-md border-b border-slate-200/40 px-6 md:px-12 py-3 flex items-center justify-between shadow-sm">
      {/* Left: Brand Logo / Back Button */}
      {customLinks ? (
        <Link
          href="/"
          className="flex items-center space-x-2 text-slate-800 hover:text-accent-gold-dark transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-accent-gold-dark group-hover:translate-x-[-2px] transition-transform" />
          <span className="text-xs font-extrabold tracking-wider font-serif uppercase">Back to Home</span>
        </Link>
      ) : (
        <div className="flex items-center space-x-3 text-slate-800 cursor-pointer" onClick={handleHomeClick}>
          <div className="bg-white p-1 rounded flex items-center justify-center shadow-sm border border-slate-100">
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
                className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </>
        ) : (
          <>
            <button
              onClick={handleHomeClick}
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollOrCreateLink("projects-section")}
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark transition-colors cursor-pointer"
            >
              Our Projects
            </button>
            <button
              onClick={() => handleScrollOrCreateLink("about-section")}
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </>
        )}
      </div>

      {/* Right: Phone & WhatsApp Button */}
      <div className="hidden lg:flex items-center space-x-6">
        <a
          href="tel:+919665205957"
          className="flex items-center space-x-2 text-slate-800 hover:text-accent-gold-dark transition-colors cursor-pointer group"
        >
          <Phone className="w-4 h-4 text-accent-gold-dark" />
          <span className="text-xs font-extrabold tracking-wider font-sans group-hover:text-accent-gold-dark">+91 96652 05957</span>
        </a>
        <a
          href="https://wa.me/919665205957"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-extrabold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-1.5 cursor-pointer hover:scale-105"
        >
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.12 1.97 12.01 1.97c-5.442 0-9.87 4.372-9.874 9.802-.001 1.761.47 3.479 1.365 5.011L2.52 20.77l4.128-.976z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center space-x-3">
        <a
          href="tel:+919665205957"
          className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-full w-8.5 h-8.5 text-slate-700 transition-all shadow-sm"
          aria-label="Call channel partner"
        >
          <svg className="w-4 h-4 text-accent-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full text-slate-700 hover:text-slate-900 focus:outline-none"
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
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 p-6 shadow-xl flex flex-col space-y-4 md:hidden animate-fade-in">
          {customLinks ? (
            <>
              {customLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleCustomLinkClick(link.id)}
                  className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark border-b border-slate-100 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </>
          ) : (
            <>
              <button
                onClick={handleHomeClick}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark border-b border-slate-100 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleScrollOrCreateLink("projects-section")}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark border-b border-slate-100 cursor-pointer"
              >
                Our Projects
              </button>
              <button
                onClick={() => handleScrollOrCreateLink("about-section")}
                className="w-full py-2.5 text-left text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-accent-gold-dark border-b border-slate-100 cursor-pointer"
              >
                Contact Us
              </button>
            </>
          )}
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="tel:+919665205957"
              className="flex items-center space-x-2 text-slate-800 hover:text-accent-gold-dark font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer group"
            >
              <Phone className="w-4 h-4 text-accent-gold-dark" />
              <span>+91 96652 05957</span>
            </a>
            <a
              href="https://wa.me/919665205957"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.12 1.97 12.01 1.97c-5.442 0-9.87 4.372-9.874 9.802-.001 1.761.47 3.479 1.365 5.011L2.52 20.77l4.128-.976z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
