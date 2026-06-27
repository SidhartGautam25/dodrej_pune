"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { projectsData } from "../data/projects";

interface HeroProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images: start with default cover, then add project images
  const bgImages = [
    "/assets/hero_bg.png",
    ...projectsData.map((p) => p.image).filter(Boolean),
  ];

  // Rotate background images every 5 seconds
  useEffect(() => {
    if (bgImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bgImages.length]);

  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-primary">
      {/* Background Image Slideshow with smooth fade transitions */}
      <div className="absolute inset-0 z-0">
        {bgImages.map((src, index) => (
          <Image
            key={src + index}
            src={src}
            alt="Godrej Pune Projects"
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? "opacity-70" : "opacity-0"
            }`}
          />
        ))}
        {/* Dark overlay for glassmorphism readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-black/45 to-primary/40 z-0" />
      </div>

      {/* Main Centered Glass Info Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex justify-center items-center mt-6">
        <div className="w-full rounded-3xl shadow-2xl glass-card p-6 md:p-12 border border-white/15 text-center flex flex-col items-center justify-center space-y-6">
          <span className="text-xs md:text-sm font-bold tracking-widest text-accent-gold uppercase mb-1 block">
            Pune
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight font-serif mb-2 leading-tight text-white">
            Godrej Projects
          </h1>

          <p className="text-white/80 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Experience ultimate luxury & serenity. Discover premium residences in Pune’s most coveted locations.
          </p>

          {/* List of Features */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 md:gap-8 my-3 text-white text-left max-w-md md:max-w-none">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/25 flex items-center justify-center border border-accent-gold/45">
                <svg className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider">Avail Pre-Launch Offers!</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/25 flex items-center justify-center border border-accent-gold/45">
                <svg className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.554-.589 1.448-.589 2.002 0l.207.22 1.213-.879a3.75 3.75 0 01.004 5.303l-2.002 2.002a3.75 3.75 0 01-5.304-5.303l1.213.88.207-.223zm3.134 5.164l-.207-.22-1.213.879a3.75 3.75 0 01-.004-5.303l2.002-2.002a3.75 3.75 0 015.304 5.303l-1.213-.88-.207.223z" />
                </svg>
              </div>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider">Special Payment plans</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-gold/25 flex items-center justify-center border border-accent-gold/45">
                <svg className="w-4 h-4 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h3a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="text-[11px] md:text-xs font-semibold uppercase tracking-wider">Fully Furnished Apartments</span>
            </div>
          </div>

          {/* Pricing capsules & Call-to-action */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center items-center">
            <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/25 text-white font-bold text-[10px] uppercase tracking-wider">
              1, 2, 3 & 4 BHK Apartments
            </div>
            <div className="px-5 py-2.5 rounded-full bg-accent-gold text-primary font-black text-[10px] uppercase tracking-wider shadow-lg">
              Starting Price : ₹ 75 Lacs*
            </div>
            <button
              onClick={() => onOpenEnquiry("Hero Centered Callbacks")}
              className="px-6 py-2.5 rounded-full bg-white text-primary hover:bg-accent-gold hover:text-primary transition-all duration-300 font-extrabold text-[10px] uppercase tracking-widest cursor-pointer shadow-lg hover:scale-105"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* Rotating Circle Text Badge at bottom center */}
      <div 
        onClick={() => onOpenEnquiry("Site Visit")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-28 h-28 cursor-pointer group hover:scale-105 transition-transform duration-300 hidden md:flex"
      >
        <div className="absolute inset-0 rounded-full bg-black/40 border border-white/10 backdrop-blur-md" />
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow text-white text-[9.5px] font-bold tracking-widest fill-current">
          <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text>
            <textPath href="#circlePath" startOffset="0%">
              • Book A Free Site Visit Now! • Book A Free Site Visit Now!
            </textPath>
          </text>
        </svg>
        <div className="absolute w-12 h-12 rounded-full bg-accent-gold text-primary flex items-center justify-center shadow-lg group-hover:bg-accent-gold-dark transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
