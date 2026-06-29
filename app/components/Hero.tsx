"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroProps {
  onOpenEnquiry: (projectName?: string) => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images: use custom hero images in public/hero
  const bgImages = [
    "/hero/hero_image_1.avif",
    "/hero/hero_image_2.avif",
    "/hero/hero_image_3.avif",
    "/hero/hero_image_4.avif",
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
    <section className="relative h-screen w-full flex items-center justify-start px-6 md:px-16 lg:px-24 overflow-hidden bg-primary">
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
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${index === currentBgIndex ? "opacity-75" : "opacity-0"
              }`}
          />
        ))}
        {/* Dark radial/horizontal overlay for readability (exact look as the screenshot) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 z-0" />
      </div>

      {/* Hero Content (left-aligned, clean, matching the screenshot layout) */}
      <div className="relative z-10 w-full max-w-4xl mt-16 text-left flex flex-col items-start space-y-5">

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-sans text-white max-w-3xl leading-tight">
          Discover Premium Luxury Residences in Pune
        </h1>

        <p className="text-white/80 text-sm md:text-lg max-w-2xl leading-relaxed">
          Explore premium 1, 2, 3 & 4 BHK apartments in Pune's most coveted locations starting from ₹ 75 Lacs*. Find your perfect home with world-class amenities and exclusive pre-launch offers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => onOpenEnquiry("Hero Main CTA")}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg cursor-pointer hover:scale-105"
          >
            Enquire Now
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("projects-section");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white font-extrabold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 cursor-pointer shadow-lg"
          >
            Browse Projects
          </button>
        </div>
      </div>
    </section>
  );
}
