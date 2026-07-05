"use client";

import React from "react";
import { Phone } from "lucide-react";

interface StickyWidgetsProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function StickyWidgets({ onOpenEnquiry }: StickyWidgetsProps) {
  return (
    <>
      {/* Desktop Sticky Vertical Button on Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={() => onOpenEnquiry("Schedule a Visit")}
          className="flex items-center bg-[#f3f4f6]/95 hover:bg-white text-gray-800 px-3 py-6 rounded-l-2xl shadow-xl border border-r-0 border-gray-300 hover:text-primary transition-all duration-300 cursor-pointer group"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          {/* Rotated icon to show correctly when vertical */}
          <span className="mb-2.5 transform rotate-90 text-gray-500 group-hover:text-accent-gold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <span className="text-[11px] font-bold tracking-wider text-gray-700 font-sans">
            Schedule a visit
          </span>
        </button>
      </div>

      {/* Desktop Floating Action Button (FAB) at Bottom Left - Phone Call */}
      <div className="fixed left-6 bottom-6 z-40 hidden md:block">
        <a
          href="tel:+919665205957"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group relative animate-bounce"
          aria-label="Call Now"
        >
          {/* Ripple animation effect */}
          <span className="absolute inset-0 rounded-full bg-blue-600/40 animate-ping opacity-75"></span>
          <Phone className="w-6 h-6 z-10 relative" />
        </a>
      </div>

      {/* Desktop Floating Action Button (FAB) at Bottom Right - WhatsApp */}
      <div className="fixed right-6 bottom-6 z-40 hidden md:block">
        <a
          href="https://wa.me/919665205957"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group relative"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple animation effect */}
          <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping opacity-75"></span>
          <svg className="w-7 h-7 fill-white z-10 relative" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.12 1.97 12.01 1.97c-5.442 0-9.87 4.372-9.874 9.802-.001 1.761.47 3.479 1.365 5.011L2.52 20.77l4.128-.976z" />
          </svg>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex md:hidden bg-primary/95 border-t border-white/10 backdrop-blur-md shadow-2xl p-2.5 gap-2.5">
        <a
          href="tel:+919665205957"
          className="flex-1 flex items-center justify-center space-x-2 bg-black border border-white/10 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider"
        >
          <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>
        <a
          href="https://wa.me/919665205957"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.98 14.12 1.97 12.01 1.97c-5.442 0-9.87 4.372-9.874 9.802-.001 1.761.47 3.479 1.365 5.011L2.52 20.77l4.128-.976z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
