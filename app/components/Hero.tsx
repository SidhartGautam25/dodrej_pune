"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ShieldCheck, Tag, Calendar, FileText, Download, Phone } from "lucide-react";

interface HeroProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const desktopImages = [
    "/hero/desktop/hero_image_1.png",
    "/hero/desktop/hero_image_2.png",
    "/hero/desktop/hero_image_3.png",
    "/hero/desktop/hero_image_4.png",
    "/hero/desktop/hero_image_5.png",
  ];

  const phoneImages = [
    "/hero/phone/hero_image_1.png",
    "/hero/phone/hero_image_2.png",
    "/hero/phone/hero_image_3.png",
    "/hero/phone/hero_image_4.png",
    "/hero/phone/hero_image_5.png",
  ];

  useEffect(() => {
    if (desktopImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % desktopImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-start px-6 md:px-16 lg:px-24 overflow-hidden bg-primary">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Slideshow */}
        <div className="hidden md:block absolute inset-0">
          {desktopImages.map((src, index) => (
            <Image
              key={"desktop-" + src}
              src={src}
              alt="Godrej Pune Projects Desktop"
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Mobile/Phone Slideshow */}
        <div className="block md:hidden absolute inset-0">
          {phoneImages.map((src, index) => (
            <Image
              key={"phone-" + src}
              src={src}
              alt="Godrej Pune Projects Mobile"
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Only a subtle left-side gradient for text readability */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.22) 18%, rgba(0,0,0,0.08) 32%, rgba(0,0,0,0) 55%)",
          }}
        />

        {/* Very light vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/15 via-transparent to-black/10" />
      </div>

      {/* Hero Content (left-aligned, clean, matching the screenshot layout) */}
      <div className="relative z-20 w-full max-w-4xl mt-20 text-left flex flex-col items-start space-y-6">
        
        {/* Tagline */}
        <span className="text-accent-gold font-extrabold text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          THOUGHTFULLY DESIGNED. PRECISELY CRAFTED.
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight font-sans text-white max-w-3xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.75)]">
          Luxury Living by Godrej in Pune
        </h1>

        {/* Subtitle */}
        <p className="text-white/95 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Premium 1, 2, 3 & 4 BHK residences in prime locations with world-class amenities and exclusive offers.
        </p>

        {/* Feature Badges - Horizontal layout matching inspiration */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-1 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-accent-gold" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase">Prime Locations</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase">World-Class Amenities</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-accent-gold" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase">Trusted Brand</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-accent-gold" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase">Exclusive Offers</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3.5 pt-2">
          <button
            onClick={() => onOpenEnquiry("Book Free Site Visit")}
            className="px-5 py-3 bg-accent-gold hover:bg-accent-gold/90 text-primary font-extrabold text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md flex items-center space-x-2 cursor-pointer hover:scale-105"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Free Site Visit</span>
          </button>
          
          <button
            onClick={() => onOpenEnquiry("Get Price Sheet")}
            className="px-5 py-3 bg-transparent hover:bg-white/5 text-white border border-white/30 hover:border-white font-extrabold text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-accent-gold" />
            <span>Get Price Sheet</span>
          </button>
          
          <button
            onClick={() => onOpenEnquiry("Download Brochure")}
            className="px-5 py-3 bg-transparent hover:bg-white/5 text-white border border-white/30 hover:border-white font-extrabold text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-105"
          >
            <Download className="w-3.5 h-3.5 text-accent-gold" />
            <span>Download Brochure</span>
          </button>
        </div>

        {/* Explore Locations Bar - Dark Translucent panel */}
        <div className="bg-black/35 border border-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 w-full max-w-3xl mt-6 shadow-lg">
          <span className="block text-[9px] font-extrabold tracking-widest text-accent-gold uppercase mb-2">
            Explore Projects in Pune&apos;s Top Locations
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold text-white/90">
            <button className="flex items-center space-x-1 hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onOpenEnquiry("Kharadi Location Enquiry")}>
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Kharadi</span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button className="flex items-center space-x-1 hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onOpenEnquiry("Hinjewadi Location Enquiry")}>
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Hinjewadi</span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button className="flex items-center space-x-1 hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onOpenEnquiry("Mahalunge Location Enquiry")}>
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Mahalunge</span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button className="flex items-center space-x-1 hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onOpenEnquiry("Pimpri Location Enquiry")}>
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Pimpri</span>
            </button>
            <span className="text-white/20 hidden sm:inline">|</span>
            <button className="flex items-center space-x-1 hover:text-accent-gold transition-colors cursor-pointer" onClick={() => onOpenEnquiry("Baner Location Enquiry")}>
              <MapPin className="w-3 h-3 text-accent-gold" />
              <span>Baner</span>
            </button>
          </div>
        </div>
      </div>

      {/* RERA Registered badge */}
      <div className="absolute right-8 bottom-12 z-20 hidden lg:flex items-center space-x-2 bg-white/95 border border-slate-200/80 rounded-xl p-3 shadow-md">
        <div className="w-8.5 h-8.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600">
          <ShieldCheck className="w-4.5 h-4.5 fill-green-600/10" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] font-extrabold tracking-wider text-green-600 uppercase">
            RERA Registered
          </span>
          <span className="text-[8px] font-semibold text-text-muted">
            Projects
          </span>
        </div>
      </div>
    </section>
  );
}