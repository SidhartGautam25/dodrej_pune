"use client";

import React from "react";

interface StickyWidgetsProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function StickyWidgets({ onOpenEnquiry }: StickyWidgetsProps) {
  return (
    <>
      {/* Desktop Sticky Vertical Button on Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={() => onOpenEnquiry("General Enquiry")}
          className="flex items-center space-x-2 bg-primary hover:bg-black text-white px-4 py-2.5 rounded-l-xl shadow-lg border border-r-0 border-white/10 hover:border-accent-gold/40 transition-all origin-right cursor-pointer"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span className="flex items-center justify-center p-1 rounded-full bg-accent-gold/20 mb-2 transform rotate-90 text-accent-gold">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase">
            Query Now
          </span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 flex md:hidden bg-primary/95 border-t border-white/10 backdrop-blur-md shadow-2xl p-2.5 gap-2.5">
        <a
          href="tel:+919225532615"
          className="flex-1 flex items-center justify-center space-x-2 bg-black border border-white/10 text-white rounded-xl py-3 text-xs font-bold uppercase tracking-wider"
        >
          <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>
        <button
          onClick={() => onOpenEnquiry("Mobile Sticky Widget")}
          className="flex-1 flex items-center justify-center space-x-2 gold-gradient hover:gold-gradient-hover text-primary rounded-xl py-3 text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Enquiry</span>
        </button>
      </div>
    </>
  );
}
